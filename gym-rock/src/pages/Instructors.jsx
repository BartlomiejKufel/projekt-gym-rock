import "./Instructors.css";
import Calendar from "../components/Calendar";
import EventBlock from "../components/EventBlock";
import ReminderBlock from "../components/ReminderBlock"
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

const Instructors = ({ userId }) => {

  var gymHours = Array.from({ length: 13 }, (_, i) => i + 10);
  const [events, setEvents] = useState([
    { start: 10, end: 11, title: "Training Advance", instructor: "Magnus Midtbø", color: "#4E49DE" },
    { start: 18, end: 20, title: "BoulderMania Kids", instructor: "Janja Garnbret", color: "#DE496E" }
  ]);

  const [reminders, setReminder] = useState([
    events[0]
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <Container className="mb-5 pt-4">
      <div className="mx-2 mb-4">
        <Calendar />
      </div>

      <Row className="mx-2 mb-4">
        <Col xs={12} className="px-1">
          <h4 className="fw-bold text-dark-gray mb-3">
            Schedule Today
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
            Reminders
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
              You have nothing planned!
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
                    src="/img/adam.png"
                    alt={selectedEvent.instructor}
                    className="event-instructor-img shadow-sm"
                  />
                </Col>
              </Row>

              <p className="event-desc mb-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>

              <div className="d-flex justify-content-center mb-4">
                <button
                  className="btn btn-light event-register-btn fw-bold px-5 py-3 shadow-sm border-0"
                  onClick={() => alert(`Registered for ${selectedEvent.title}`)}
                >
                  Register
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