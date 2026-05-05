import "./EventBlock.css";
import {Row,Col} from "react-bootstrap"

const EventBlock = ({event}) => {

  return (
    <Row className="main px-3 py-1 my-2" style={{background: event.color}}>
        <Row>
          <b className="px-0 h5 my-1">{event.title}</b> 
          {event.instructor}
          <br/>{event.start}:00 - {event.end}:00 
        </Row>
    </Row>
  );
};

export default EventBlock;