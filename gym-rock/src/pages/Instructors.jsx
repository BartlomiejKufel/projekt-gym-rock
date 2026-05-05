import "./Instructors.css";
import Calendar from "../components/Calendar";
import EventBlock from "../components/EventBlock";
import ReminderBlock from "../components/ReminderBlock"
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useState } from "react";

const Instructors = () => {

  var gymHours = Array.from({ length: 13 }, (_, i) => i + 10);
  const [events, setEvents] = useState([
    { start: 10, end: 11, title: "Training Advance", instructor: "Magnus Midtbø", color: "#4E49DE" },
    { start: 18, end: 20, title: "BoulderMania Kids", instructor: "Janja Garnbret", color: "#DE496E" }
  ]);

  const [reminders, setReminder] = useState([
    events[0]
  ]);
  return (
    <Container className="mb-5">
      <Calendar />

      <Row className="mx-5">
        <h4 className="fw-bold text-center my-4">
          Schedule Today
        </h4>
        <ul>
          {gymHours.map((hour) => {
            const event = events.find(
              (e) => hour >= e.start && hour < e.end
            );

            if (event && hour > event.start) {
              return null;
            }

            return (
              <li key={hour}>
                <Row>
                  <Col className="col-1 my-1 text-center">{hour}:00</Col>
                  <Col className="px-5">
                    {event ? <EventBlock event={event} /> : <hr />}
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Row>

      <Row className="mx-5">
        <Row xs={12}>
          <h4 className="fw-bold text-center my-4">
            Reminders
          </h4>
        </Row>

        {reminders && reminders.length > 0 ? (
          reminders.map((event, index) => (
            <Row key={index} xs={12} className="d-flex justify-content-center mb-1">
              <ReminderBlock event={event} />
            </Row>
          ))
        ) : (
          <Row className="justify-content-center">
            <p className="text-center my-4">
              You have nothing planned!
            </p>
          </Row>
        )}
      </Row>
      {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
      <Row style={{ height: "15vh" }}></Row>
    </Container>
  );
};

export default Instructors;