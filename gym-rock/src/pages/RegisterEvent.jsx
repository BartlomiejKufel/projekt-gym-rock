import "./RegisterEvent.css";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Standardowy, oficjalny klucz testowy Stripe do celów demonstracyjnych na froncie
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const RegisterEventContent = ({ userId }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // Załadowane szczegóły
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

  // Stany formularza
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [cardFocused, setCardFocused] = useState(false);

  // Stany walidacji Stripe
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardError, setCardError] = useState(null);

  // Stan interfejsu (UI)
  const [errorMsg, setErrorMsg] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Pobranie szczegółów wydarzenia i użytkownika
  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:8000/api/events/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
        });
    }

    if (userId) {
      fetch(`http://localhost:8000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [eventId, userId]);

  const formatEventDate = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr.replace(" ", "T"));
    return dateObj.toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEventTime = (startStr, endStr) => {
    if (!startStr || !endStr) return "";
    const startParts = startStr.split(" ");
    const endParts = endStr.split(" ");
    const startHour = startParts[1] ? startParts[1].substring(0, 5) : "";
    const endHour = endParts[1] ? endParts[1].substring(0, 5) : "";
    return `${startHour} - ${endHour}`;
  };

  const handleCardChange = (event) => {
    setIsCardComplete(event.complete);
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms || !confirmPayment) {
      setErrorMsg("Proszę zaznaczyć wszystkie wymagane zgody.");
      return;
    }

    if (!stripe || !elements) {
      setErrorMsg("Trwa inicjalizacja płatności. Spróbuj ponownie.");
      return;
    }

    // Walidacja Stripe Elements
    if (!isCardComplete) {
      setErrorMsg(cardError || "Proszę podać poprawne i pełne dane karty.");
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    // Symulacja płatności Stripe
    setTimeout(() => {
      fetch(`http://localhost:8000/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ participant_id: Number(userId) }),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            navigate(`/register-success/${eventId}`);
          } else {
            setErrorMsg(data.message || "Błąd podczas zapisu na wydarzenie.");
            setProcessing(false);
          }
        })
        .catch((error) => {
          console.error("Error registering to event:", error);
          setErrorMsg("Wystąpił błąd sieci. Spróbuj ponownie.");
          setProcessing(false);
        });
    }, 1500);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#2d3748",
        fontFamily: "Inter, sans-serif",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  return (
    <Container className="mb-5 pt-2 register-event-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {errorMsg && <Alert variant="danger" className="mx-2 rounded-4">{errorMsg}</Alert>}

          <Card className="border-0 shadow-sm rounded-4 mx-2 overflow-hidden">
            <Card.Body className="p-2 p-md-5">
              <Form onSubmit={handleSubmit}>
                <h4 className="fw-bold text-dark-gray mb-3 border-bottom pb-2">Szczegóły zajęć</h4>
                {event ? (
                  <div className="event-summary-box p-3 rounded-3 mb-4" style={{ backgroundColor: "#f8fafc", borderLeft: `5px solid ${event.event_color || '#4E49DE'}` }}>
                    <h6 className="fw-bold text-dark-gray mb-2">{event.name}</h6>
                    <div className="text-secondary small">
                      <div className="mb-1">
                        <strong>Data:</strong> <span className="text-capitalize">{formatEventDate(event.start_date)}</span>
                      </div>
                      <div className="mb-1">
                        <strong>Godzina:</strong> {getEventTime(event.start_date, event.end_date)}
                      </div>
                      <div className="mb-1">
                        <strong>Instruktor:</strong> {event.instructor ? `${event.instructor.name} ${event.instructor.surname}` : "Brak"}
                      </div>
                      <div className="mt-2 pt-2 border-top fw-bold text-dark-gray d-flex justify-content-between">
                        <span>Cena wejścia:</span>
                        <span className="text-purple">{event.offer ? `${event.offer.price} zł` : "0 zł"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 text-muted text-center small">Ładowanie szczegółów zajęć...</div>
                )}


                <h5 className="fw-bold text-dark-gray mb-3 border-bottom pb-2">Dane uczestnika</h5>
                {user ? (
                  <div className="mb-4">
                    <Row className="mb-3">
                      <Col xs={6}>
                        <Form.Label className="fw-bold text-secondary small">Imię</Form.Label>
                        <Form.Control type="text" className="add-input rounded-3" value={user.name || ""} readOnly disabled />
                      </Col>
                      <Col xs={6}>
                        <Form.Label className="fw-bold text-secondary small">Nazwisko</Form.Label>
                        <Form.Control type="text" className="add-input rounded-3" value={user.surname || ""} readOnly disabled />
                      </Col>
                    </Row>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-secondary small">Adres e-mail</Form.Label>
                      <Form.Control type="text" className="add-input rounded-3" value={user.email || ""} readOnly disabled />
                    </Form.Group>
                  </div>
                ) : (
                  <div className="py-3 text-muted text-center small">Ładowanie danych uczestnika...</div>
                )}

                {/* Dane karty Stripe */}
                <h5 className="fw-bold text-dark-gray mb-3 border-bottom pb-2">Dane karty płatniczej</h5>
                <Form.Group className="mb-4">
                  <div className={`stripe-card-wrapper p-3 rounded-3 mb-2 ${cardFocused ? 'focused' : ''}`}>
                    <CardElement
                      options={cardElementOptions}
                      onFocus={() => setCardFocused(true)}
                      onBlur={() => setCardFocused(false)}
                      onChange={handleCardChange}
                    />
                  </div>
                  <Form.Text className="text-muted small">
                    <i>Możesz użyć testowej karty Stripe, <b>4242 4242 4242 4242 12/30 123</b>.</i>
                  </Form.Text>
                </Form.Group>


                <h5 className="fw-bold text-dark-gray mb-3 border-bottom pb-2">Zgody i płatność</h5>
                <Form.Group className="mb-3" controlId="termsCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="*Akceptuję regulamin klubu Gym Rock oraz zasady uczestnictwa w zajęciach wspinaczkowych."
                    className="small text-muted fw-medium"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="paymentCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="*Potwierdzam chęć zapisu i zapłaty za jednorazowe wejście."
                    className="small text-muted fw-medium"
                    checked={confirmPayment}
                    onChange={(e) => setConfirmPayment(e.target.checked)}
                    required
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    variant="dark"
                    type="submit"
                    className="save-event-btn w-100 py-3 fw-bold rounded-pill shadow-sm"
                    disabled={processing}
                  >
                    {processing ? "Przetwarzanie płatności..." : "Potwierdź zapis i zapłać"}
                  </Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Odstęp dla paska nawigacji MainNavbar */}
      <Row style={{ height: "15vh" }}></Row>
    </Container>
  );
};

const RegisterEvent = ({ userId }) => {
  return (
    <Elements stripe={stripePromise}>
      <RegisterEventContent userId={userId} />
    </Elements>
  );
};

export default RegisterEvent;
