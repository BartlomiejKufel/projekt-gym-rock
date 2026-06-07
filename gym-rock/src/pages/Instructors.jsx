import "./Instructors.css";
import Calendar from "../components/Calendar";
import EventBlock from "../components/EventBlock";
import ReminderBlock from "../components/ReminderBlock"
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Instructors = ({ userId }) => {
  const navigate = useNavigate();
  const getLocalDateString = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));

  var gymHours = Array.from({ length: 13 }, (_, i) => i + 10);
  const [events, setEvents] = useState([]);
  const [reminders, setReminder] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeEventDetails, setActiveEventDetails] = useState(null);
  const [showParticipantsList, setShowParticipantsList] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setActiveEventDetails(null);
    setShowParticipantsList(false);
    fetch(`http://localhost:8000/api/events/${event.event_id}`)
      .then((response) => response.json())
      .then((data) => {
        setActiveEventDetails(data);
      });
  };
  const handleUnregister = async () => {
    if (!selectedEvent) return;
    const response = await fetch(`http://localhost:8000/api/events/${selectedEvent.event_id}/unregister`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participant_id: userId })
    });
    if (response.ok) {
      handleEventClick(selectedEvent);
      fetchRegisteredEvents();
    } else {
      console.error("Błąd podczas wypisywania się z wydarzenia");
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    if (!window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/events/${selectedEvent.event_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        setSelectedEvent(null);
        setActiveEventDetails(null);
        setShowParticipantsList(false);
        fetchEvents();
      } else {
        console.error("Błąd podczas usuwania wydarzenia");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRegisteredEvents = () => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/users/${userId}/registered-events`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((event) => {
            const startParts = event.start_date.split(' ');
            const endParts = event.end_date.split(' ');
            const startHour = startParts[1] ? parseInt(startParts[1].split(':')[0], 10) : 10;
            const endHour = endParts[1] ? parseInt(endParts[1].split(':')[0], 10) : 11;

            const dateObj = new Date(event.start_date.replace(' ', 'T'));
            const formattedDate = dateObj.toLocaleDateString("pl-PL", {
              weekday: "short",
              day: "numeric",
              month: "long"
            });

            return {
              event_id: event.event_id,
              date: formattedDate,
              start: startHour,
              end: endHour,
              title: event.name,
              instructor: `${event.instructor.name} ${event.instructor.surname}`
            };
          });
          setReminder(mapped);
        }
      });
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, [userId]);

  const fetchEvents = () => {
    fetch(`http://localhost:8000/api/events?date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        const mapped = data.map((event) => {
          const startParts = event.start_date.split(' ');
          const endParts = event.end_date.split(' ');
          const startHour = startParts[1] ? parseInt(startParts[1].split(':')[0], 10) : 10;
          const endHour = endParts[1] ? parseInt(endParts[1].split(':')[0], 10) : 11;

          return {
            event_id: event.event_id,
            instructor_id: event.instructor_id,
            registration_limit: event.end_date,
            start: startHour,
            end: endHour,
            title: event.name,
            instructor: `${event.instructor.name} ${event.instructor.surname}`,
            color: event.event_color || "#4E49DE",
            description: event.description,
            instructor_img: event.instructor_id
              ? `http://localhost:8000/api/users/profile_picture/${event.instructor_id}`
              : "/img/default-profile-pic.png"
          };
        });
        setEvents(mapped);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const isPastLimit = (registration_limit) => {
    let limitDate = registration_limit.replace(' ', 'T')
    return new Date() > new Date(limitDate);
  }

  const isUserRegistered = () => {
    if (!activeEventDetails || !activeEventDetails.participants || !userId) return false;
    return activeEventDetails.participants.some(
      (participant) => Number(participant.user_id) === Number(userId)
    );
  };

  const isInstructor = selectedEvent && Number(userId) === Number(selectedEvent.instructor_id);

  return (
    <Container className="mb-5 pt-4">
      <div className="mx-2 mb-4">
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

      <Row className="mx-2 mb-4">
        <Col xs={12} className="px-1">
          <h4 className="fw-bold text-dark-gray mb-3">
            Aktualny rozkład zajęć
          </h4>
        </Col>
        <ul className="px-1">
          {gymHours.map((hour) => {
            const event = events.find(
              (e) => hour >= e.start && hour < e.end
            );

            if (event && hour > event.start) {
              return null;
            }

            return (
              <li key={hour} className="mb-2">
                <Row className="align-items-center">
                  <Col xs={2} sm={1} className="my-1 text-end fw-medium text-muted pe-2">{hour}:00</Col>
                  <Col xs={10} sm={11} className="ps-2 pe-1">
                    {event ? (
                      <div onClick={() => handleEventClick(event)} style={{ cursor: "pointer" }}>
                        <EventBlock event={event} />
                      </div>
                    ) : (
                      <hr className="my-2 text-muted opacity-25" />
                    )}
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Row>

      <Row className="mx-2 mb-4">
        <Col xs={12} className="px-1">
          <h4 className="fw-bold text-dark-gray mb-3">
            Przypomnienia
          </h4>
        </Col>

        {reminders && reminders.length > 0 ? (
          reminders.map((event, index) => (
            <Col xs={12} lg={12} key={index} className="px-1 mb-2">
              <ReminderBlock event={event} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="px-1 text-center">
            <p className="text-muted mb-4">
              Nie masz nic zaplanowane!
            </p>
          </Col>
        )}
      </Row>

      {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
      <Row style={{ height: "15vh" }}></Row>

      {selectedEvent && (
        <div className="event-modal-overlay">
          <div className="event-modal-backdrop" onClick={() => { setSelectedEvent(null); setActiveEventDetails(null); setShowParticipantsList(false); }}></div>
          <div
            className="event-modal-panel"
            style={{ backgroundColor: selectedEvent.color }}
          >
            <div className="d-flex justify-content-center pt-3 pb-2" onClick={() => { setSelectedEvent(null); setActiveEventDetails(null); setShowParticipantsList(false); }} style={{ cursor: "pointer" }}>
              <div className="event-modal-handle"></div>
            </div>
            <div className="px-4 pt-3 pb-5 text-white">
              <Row className="align-items-center mb-4">
                <Col xs={7}>
                  <h1 className="fw-bold lh-sm mb-0">{selectedEvent.title}</h1>
                </Col>
                <Col xs={5} className="text-end">
                  <img
                    src={selectedEvent.instructor_img}
                    alt={selectedEvent.instructor}
                    className="event-instructor-img shadow-sm"
                  />
                </Col>
              </Row>

              <p className="event-desc mb-2">
                {selectedEvent.description || "Brak opisu dla tego wydarzenia."}
              </p>

              <div className="mb-4 d-flex justify-content-start align-items-center">
                <div style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  display: "inline-block"
                }}>
                  {activeEventDetails ? (
                    `Zapisanych: ${activeEventDetails.participants?.length || 0} / ${activeEventDetails.participants_limit}`
                  ) : (
                    "Zapisanych: Ładowanie..."
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
                {isInstructor ? (
                  <>
                    <button
                      className="btn btn-light event-register-btn fw-bold px-4 py-3 shadow-sm border-0"
                      onClick={() => setShowParticipantsList(!showParticipantsList)}
                    >
                      {showParticipantsList ? "Ukryj szczegóły" : "Zobacz szczegóły"}
                    </button>
                    {activeEventDetails && activeEventDetails.participants && activeEventDetails.participants.length === 0 && (
                      <button
                        className="btn btn-danger event-register-btn fw-bold px-4 py-3 shadow-sm border-0"
                        onClick={handleDeleteEvent}
                      >
                        Usuń wydarzenie
                      </button>
                    )}
                  </>
                ) : isUserRegistered() ? (
                  <button
                    className="btn btn-danger event-register-btn fw-bold px-5 py-3 shadow-sm border-0"
                    onClick={handleUnregister}
                    disabled={isPastLimit(selectedEvent.registration_limit)}
                  >
                    Wypisz się
                  </button>
                ) : (
                  <button
                    className="btn btn-light event-register-btn fw-bold px-5 py-3 shadow-sm border-0"
                    onClick={() => {
                      setSelectedEvent(null);
                      setActiveEventDetails(null);
                      navigate(`/register-event/${selectedEvent.event_id}`);
                    }}
                    disabled={
                      isPastLimit(selectedEvent.registration_limit) ||
                      (activeEventDetails && activeEventDetails.participants?.length >= activeEventDetails.participants_limit)
                    }
                  >
                    {isPastLimit(selectedEvent.registration_limit)
                      ? "Zapisy zamknięte"
                      : activeEventDetails && activeEventDetails.participants?.length >= activeEventDetails.participants_limit
                        ? "Brak miejsc"
                        : "Zapisz mnie"}
                  </button>
                )}
              </div>

              {isInstructor && showParticipantsList && (
                <div className="mt-4 pt-3 border-top border-white-50">
                  <h5 className="fw-bold mb-3">Lista zapisanych uczestników:</h5>
                  {activeEventDetails ? (
                    activeEventDetails.participants && activeEventDetails.participants.length > 0 ? (
                      <ol className="ps-3 mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6", textAlign: "left" }}>
                        {activeEventDetails.participants.map((participant) => (
                          <li key={participant.user_id} className="mb-2">
                            <span className="fw-semibold">{participant.name} {participant.surname}</span>
                            {participant.pivot?.date_of_registration && (
                              <span className="text-white-50 small d-block">
                                Zapisano: {new Date(participant.pivot.date_of_registration.replace(' ', 'T')).toLocaleDateString("pl-PL")}
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-white-50 small mb-0 italic">Brak zapisanych uczestników na to wydarzenie.</p>
                    )
                  ) : (
                    <p className="text-white-50 small mb-0">Ładowanie uczestników...</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Instructors;