import "./Contact.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const Contact = () => {

    return (
        <Container className="mb-5 pt-4 contact-container">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="d-flex flex-column gap-4 mx-2">
                        <a href="tel:+48123456789" className="text-decoration-none">
                            <Card className="border-0 shadow-sm rounded-4 contact-card transition-card">
                                <Card.Body className="p-4 d-flex align-items-center">
                                    <div className="contact-icon-bg bg-blue-light me-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <small className="text-muted text-uppercase fw-semibold tracking-wider font-xs">Zadzwoń do nas</small>
                                        <h5 className="fw-bold text-dark-gray mb-0 mt-1">+48 123 456 789</h5>
                                    </div>
                                </Card.Body>
                            </Card>
                        </a>

                        <a href="mailto:recepcja@gymrock.pl" className="text-decoration-none">
                            <Card className="border-0 shadow-sm rounded-4 contact-card transition-card">
                                <Card.Body className="p-4 d-flex align-items-center">
                                    <div className="contact-icon-bg bg-purple-light me-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div>
                                        <small className="text-muted text-uppercase fw-semibold tracking-wider font-xs">Napisz e-mail</small>
                                        <h5 className="fw-bold text-dark-gray mb-0 mt-1">recepcja@gymrock.pl</h5>
                                    </div>
                                </Card.Body>
                            </Card>
                        </a>

                        <a href="https://maps.app.goo.gl/YCWBP7WRaUmvUn528" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <Card className="border-0 shadow-sm rounded-4 contact-card transition-card">
                                <Card.Body className="p-4 d-flex align-items-center">
                                    <div className="contact-icon-bg bg-red-light me-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div>
                                        <small className="text-muted text-uppercase fw-semibold tracking-wider font-xs">Adres</small>
                                        <h5 className="fw-bold text-dark-gray mb-0 mt-1">ul. Cicha 4a, Rzeszów</h5>
                                    </div>
                                </Card.Body>
                            </Card>
                        </a>

                        <Card className="border-0 shadow-sm rounded-4 contact-card">
                            <Card.Body className="p-4 d-flex align-items-start">
                                <div className="contact-icon-bg bg-green-light me-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div className="flex-grow-1">
                                    <small className="text-muted text-uppercase fw-semibold tracking-wider font-xs">Godziny otwarcia</small>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-dark-gray fw-medium">Poniedziałek - Piątek</span>
                                            <span className="text-dark-gray fw-bold">6:00 - 22:00</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-dark-gray fw-medium">Sobota</span>
                                            <span className="text-dark-gray fw-bold">8:00 - 20:00</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-dark-gray fw-medium">Niedziela</span>
                                            <span className="text-dark-gray fw-bold">9:00 - 18:00</span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Contact;
