import "./Card.css";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";

const Card = ({ userId }) => {
    const [qrError, setQrError] = useState(false);

    return (
        <Container className="mb-5 text-center mt-5">
            <Row className="mx-5">
                <h1 className="fw-bold my-4 card-scan-title">
                    {qrError ? "Brak kodu QR" : "Zeskanuj mnie"}
                </h1>
            </Row>

            <Row className="justify-content-center mx-5 mt-2">
                {qrError ? (
                    <div className="no-qr-message p-4 bg-white shadow-sm rounded-4" style={{ maxWidth: '400px', border: '1px solid #f3f4f6' }}>
                        <div className="text-warning mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#eab308" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                            </svg>
                        </div>
                        <p className="text-muted fw-semibold mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Jeśli nie widzisz kodu QR, przyjdź do nas na recepcję żeby go wygenerować.
                        </p>
                    </div>
                ) : (
                    <div className="qr-wrapper bg-white shadow-sm">
                        <img
                            src={`http://127.0.0.1:8000/api/qrcards/user/${userId}`}
                            alt="Karta QR"
                            className="img-fluid qr-img"
                            onError={() => setQrError(true)}
                        />
                    </div>
                )}
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Card;
