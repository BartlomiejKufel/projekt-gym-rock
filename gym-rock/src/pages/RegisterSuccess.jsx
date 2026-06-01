import "./RegisterSuccess.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegisterSuccess = ({ setMainNavbarVisible }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (setMainNavbarVisible) {
      setMainNavbarVisible(false);
      return () => {
        setMainNavbarVisible(true);
      };
    }
  }, [setMainNavbarVisible]);

  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:8000/api/events/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
        });
    }
  }, [eventId]);

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

  return (
    <Container className="mb-5 pt-5 register-success-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="border-0 shadow-sm rounded-4 mx-2 overflow-hidden text-center">
            <Card.Body className="p-5">
              <div className="success-icon-wrapper mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="success-icon-svg">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h2 className="fw-bold text-dark-gray mb-2">Zapisano Pomyślnie!</h2>
              <p className="text-muted mb-5">Zostałeś pomyślnie zarejestrowany na poniższe wydarzenie.</p>

              {event ? (
                <div className="event-details-card p-4 rounded-4 mb-5 text-start" style={{ borderLeft: `6px solid ${event.event_color || '#4E49DE'}` }}>
                  <h4 className="fw-bold text-dark-gray mb-3">{event.name}</h4>

                  <div className="d-flex flex-column gap-2 text-secondary">
                    <div className="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 text-muted" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="text-capitalize">{formatEventDate(event.start_date)}</span>
                    </div>

                    <div className="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 text-muted" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Godzina: {getEventTime(event.start_date, event.end_date)}</span>
                    </div>

                    <div className="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 text-muted" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>Prowadzący: {event.instructor ? `${event.instructor.name} ${event.instructor.surname}` : "Brak"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-5 text-muted">Ładowanie szczegółów wydarzenia...</div>
              )}

              <Button
                variant="dark"
                className="w-100 py-3 fw-bold rounded-pill shadow-sm back-to-schedule-btn"
                onClick={() => navigate("/instructors")}
              >
                Wróć do wydarzeń
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterSuccess;
