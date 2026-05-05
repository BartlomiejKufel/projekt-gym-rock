import React, { useState} from "react";
import "./Calendar.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Calendar = () => {
  const today = new Date();
  // today.setDate(today.getDate() + 1);

  const [currentDate, setCurrentDate] = useState(() => {
    const passedDate = new Date(today); 
    return new Date(passedDate.getFullYear(), passedDate.getMonth(), 1);
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const weeks = [];
  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];

    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startDay) || currentDay > totalDays) {
        week.push(null);
      } else {
        week.push(currentDay);
        currentDay++;
      }
    }

    weeks.push(week);
    if (currentDay > totalDays) break;
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDate = (day) =>{
    console.log(day);
  }

  return (
    <Container className="mt-2 mb-3" style={{ maxWidth: 700 }}>
      <Card>
        <Card.Body>
          <Row className="align-items-center mb-3 gx-0">
            <Col xs="auto">
              <Button className="calendar-button" onClick={handlePrevMonth}>
                ←
              </Button>
            </Col>

            <Col className="text-center fw-bold">
              {firstDay.toLocaleString("en-US", { month: "long" })} {year}
            </Col>

            <Col xs="auto">
              <Button className="calendar-button" onClick={handleNextMonth}>
                →
              </Button>
            </Col>
          </Row>

          {/* Dni */}
          <Row className="text-center fw-bold mb-2 gx-0">
            {daysOfWeek.map((day) => (
              <Col key={day}>{day}</Col>
            ))}
          </Row>

          {weeks.map((week, i) => (
            <Row key={i} className="text-center mb-1 gx-0">
              {week.map((day, j) => {
                const isToday =
                  day &&
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();

                return (
                  <Col key={j}>
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #dee2e6",
                        borderRadius: 6,
                        boxSizing: "border-box",
                        backgroundColor: isToday ? "#fedcdc" : "transparent",
                        color: isToday ? "#DE496E" : "black",
                        fontWeight: isToday ? "bold" : "normal",
                      }}
                      onClick={handleSelectDate(day)}
                    >
                      {day || ""}
                    </div>
                  </Col>
                );
              })}
            </Row>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Calendar;