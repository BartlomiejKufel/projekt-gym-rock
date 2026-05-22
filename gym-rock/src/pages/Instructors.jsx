import "./Instructors.css";
import Calendar from "../components/Calendar";
import EventBlock from "../components/EventBlock";
import ReminderBlock from "../components/ReminderBlock"
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const Instructors = ({ userId }) => {
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

  useEffect(() => {
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
            start: startHour,
            end: endHour,
            title: event.name,
            instructor: `${event.instructor.name} ${event.instructor.surname}`,
            color: event.event_color || "#4E49DE",
            description: event.description,
            start_date: event.start_date,
            end_date: event.end_date,
            instructor_img: event.instructor_id
              ? `http://localhost:8000/api/users/profile_picture/${event.instructor_id}`
              : "/img/default-profile-pic.png"
          };
        });
        setEvents(mapped);

        if (mapped.length > 0) {
          setReminder([mapped[0]]);
        } else {
          setReminder([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [selectedDate]);
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
                      <div onClick={() => setSelectedEvent(event)} style={{ cursor: "pointer" }}>
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
          <div className="event-modal-backdrop" onClick={() => setSelectedEvent(null)}></div>
          <div
            className="event-modal-panel"
            style={{ backgroundColor: selectedEvent.color }}
          >
            <div className="d-flex justify-content-center pt-3 pb-2" onClick={() => setSelectedEvent(null)} style={{ cursor: "pointer" }}>
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

              <p className="event-desc mb-5">
                {selectedEvent.description || "Brak opisu dla tego wydarzenia."}
              </p>

              <div className="d-flex justify-content-center mb-4">
                <button
                  className="btn btn-light event-register-btn fw-bold px-5 py-3 shadow-sm border-0"
                  onClick={() => alert(`Registered for ${selectedEvent.title}`)}
                >
                  Zapisz mnie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Instructors;