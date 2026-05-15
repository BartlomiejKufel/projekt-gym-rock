import "./Card.css";
import { Container, Row } from "react-bootstrap";

const Card = ({ userId }) => {
    return (
        <Container className="mb-5 text-center mt-5">
            <Row className="mx-5">
                <h1 className="fw-bold my-4 card-scan-title">
                    Scan me
                </h1>
            </Row>

            <Row className="justify-content-center mx-5 mt-2">
                <div className="qr-wrapper bg-white shadow-sm">
                    <img src="/img/qr.png" alt="QR Code" className="img-fluid qr-img" />
                </div>
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Card;