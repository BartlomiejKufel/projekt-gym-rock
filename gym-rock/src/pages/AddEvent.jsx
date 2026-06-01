import "./AddEvent.css";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ userId }) => {
  const navigate = useNavigate();

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Dane do formularza
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState(userId || "");
  const [offerId, setOfferId] = useState("");
  const [eventColor, setEventColor] = useState("#8B5CF6");
  const [participantsLimit, setParticipantsLimit] = useState(15);
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState(10);
  const [endHour, setEndHour] = useState(11);
  const [currentUser, setCurrentUser] = useState(null);
  const [offers, setOffers] = useState([]);

  const colorPresets = [
    { label: "Niebieski", value: "#0f1faa" },
    { label: "Zielony", value: "#10B981" },
    { label: "Żółty", value: "#F59E0B" },
    { label: "Czerwony", value: "#EF4444" },
    { label: "Fioletowy", value: "#8B5CF6" },
    { label: "Pomarańczowy", value: "#e1600f" },
  ];

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (userId) {
      setInstructorId(userId);
      fetch(`http://localhost:8000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
        });
    }

    fetch("http://localhost:8000/api/offers")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filtered = data.filter((offer) =>
            Number(offer.duration) === 0
          );
          setOffers(filtered);
          if (filtered.length > 0) {
            setOfferId(filtered[0].offer_id);
          }
        }
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (Number(endHour) <= Number(startHour)) {
      setErrorMsg("Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.");
      return;
    }

    // Pobranie istniejących wydarzeń z tego dnia w celu sprawdzenia nakładania się terminów
    fetch(`http://localhost:8000/api/events?date=${date}`)
      .then((response) => response.json())
      .then((existingEvents) => {
        if (Array.isArray(existingEvents)) {
          const hasOverlap = existingEvents.some((evt) => {
            const startParts = evt.start_date.split(' ');
            const endParts = evt.end_date.split(' ');
            const existingStart = startParts[1] ? parseInt(startParts[1].split(':')[0], 10) : 10;
            const existingEnd = endParts[1] ? parseInt(endParts[1].split(':')[0], 10) : 11;

            return startHour < existingEnd && endHour > existingStart;
          });

          if (hasOverlap) {
            setErrorMsg("W wybranym przedziale godzinowym istnieje już inne wydarzenie.");
            return;
          }
        }

        const padHour = (h) => String(h).padStart(2, "0");
        const formattedStartDate = `${date} ${padHour(startHour)}:00:00`;
        const formattedEndDate = `${date} ${padHour(endHour)}:00:00`;

        const event = {
          name,
          description,
          instructor_id: Number(instructorId),
          offer_id: Number(offerId),
          event_color: eventColor,
          participants_limit: Number(participantsLimit),
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        };

        fetch("http://localhost:8000/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(event),
        })
          .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
              navigate("/instructors");
            } else {
              setErrorMsg(data.message || "Błąd podczas dodawania wydarzenia.");
            }
          })
          .catch((error) => {
            console.error("Error creating event:", error);
            setErrorMsg("Błąd podczas dodawania wydarzenia.");
          });
      })
      .catch((error) => {
        console.error("Error checking overlapping events:", error);
        setErrorMsg("Błąd podczas sprawdzania dostępności terminu.");
      });
  };

  return (
    <Container className="mb-5 pt-2 add-event-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {errorMsg && <Alert variant="danger" className="mx-2 rounded-4">{errorMsg}</Alert>}

          <Card className="border-0 shadow-sm rounded-4 mx-2 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="eventName">
                  <Form.Label className="fw-bold text-secondary small">Nazwa zajęć / wydarzenia</Form.Label>
                  <Form.Control
                    type="text"
                    className="add-input rounded-3"
                    placeholder="np. Sekcja Wspinaczkowa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="eventDescription">
                  <Form.Label className="fw-bold text-secondary small">Opis wydarzenia</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="add-input rounded-3"
                    placeholder="Wpisz krótki opis zajęć"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="eventInstructor">
                  <Form.Label className="fw-bold text-secondary small">Instruktor prowadzący</Form.Label>
                  <Form.Control
                    type="text"
                    className="add-input rounded-3"
                    value={currentUser ? `${currentUser.name} ${currentUser.surname}` : "Ładowanie..."}
                    readOnly
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="eventOffer">
                  <Form.Label className="fw-bold text-secondary small">Wymagana oferta / karnet</Form.Label>
                  <Form.Select
                    className="add-input rounded-3"
                    value={offerId}
                    onChange={(e) => setOfferId(e.target.value)}
                    required
                  >
                    {offers.map((offer) => (
                      <option key={offer.offer_id} value={offer.offer_id}>
                        {offer.name} ({offer.price} zł)
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row className="mb-4">
                  <Col xs={6}>
                    <Form.Group controlId="eventLimit">
                      <Form.Label className="fw-bold text-secondary small">Limit osób</Form.Label>
                      <Form.Control
                        type="number"
                        min="5"
                        className="add-input rounded-3"
                        value={participantsLimit}
                        onChange={(e) => setParticipantsLimit(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="eventColor">
                      <Form.Label className="fw-bold text-secondary small">Kolor etykiety</Form.Label>
                      <div className="color-presets-container d-flex flex-wrap gap-2 pt-1">
                        {colorPresets.map((preset) => (
                          <div
                            key={preset.value}
                            className={`color-preset-circle ${eventColor === preset.value ? "selected" : ""}`}
                            style={{ backgroundColor: preset.value }}
                            onClick={() => setEventColor(preset.value)}
                            title={preset.label}
                          />
                        ))}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="eventDate">
                  <Form.Label className="fw-bold text-secondary small">Data wydarzenia</Form.Label>
                  <Form.Control
                    type="date"
                    className="add-input rounded-3"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTomorrowDateString()}
                    required
                  />
                </Form.Group>

                <Row className="mb-5">
                  <Col xs={6}>
                    <Form.Group controlId="eventStartHour">
                      <Form.Label className="fw-bold text-secondary small">Godzina rozpoczęcia</Form.Label>
                      <Form.Select
                        className="add-input rounded-3"
                        value={startHour}
                        onChange={(e) => setStartHour(Number(e.target.value))}
                        required
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}:00
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="eventEndHour">
                      <Form.Label className="fw-bold text-secondary small">Godzina zakończenia</Form.Label>
                      <Form.Select
                        className="add-input rounded-3"
                        value={endHour}
                        onChange={(e) => setEndHour(Number(e.target.value))}
                        required
                      >
                        {Array.from({ length: 13 }, (_, i) => i + 10).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}:00
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button
                    variant="dark"
                    type="submit"
                    className="save-event-btn px-5 py-3 fw-bold rounded-pill shadow-sm"
                  >
                    Dodaj Wydarzenie
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

export default AddEvent;
