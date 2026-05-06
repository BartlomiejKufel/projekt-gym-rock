import "./ReminderBlock.css";
import { Row, Col } from "react-bootstrap"

const ReminderBlock = ({ event }) => {

    return (
        <Row className="main px-1 py-2 my-2" >
            <Col className="col-2 d-flex justify-content-center">
                <div className="calendar-box p-1 text-center" style={{ width: "58px" }}>
                    <img src="./icons/calendar.svg" alt="calendar" />
                </div>
            </Col>
            <Col className="px-4 text-start">
                <p className="mb-0">
                    {event.title}
                </p>
                <div className="d-flex align-items-center gap-2">
                    <img src="./icons/clock.svg" alt="clock" style={{ width: "18px" }} />
                    {event.start}:00 - {event.end}:00
                </div>
            </Col>
        </Row>
    );
};

export default ReminderBlock;