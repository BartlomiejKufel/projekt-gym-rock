import "./Home.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

const Home = ({ userId }) => {
    const [activePasses, setActivePasses] = useState([]);

    const fetchActiveOffers = () => {
        fetch(`http://127.0.0.1:8000/api/purchases/${userId}/active`)
            .then((response) => response.json())
            .then((data) => {
                setActivePasses(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const passesLimitColors = (daysLeft) => {
        if (daysLeft >= 15) {
            return "text-green";
        } else if (daysLeft > 4 && daysLeft < 15) {
            return "text-yellow";
        } else {
            return "text-red";
        }
    };

    const formatDate = (date) => {
        const dayMonth = date.slice(8, 10) + '.' + date.slice(5, 7);
        return dayMonth;
    };

    useEffect(() => {
        fetchActiveOffers();
    }, []);

    return (
        <Container className="mb-5 pt-4 home-container">
            <Row className="mx-2 mb-3">
                <Col>
                    <h4 className="fw-bold text-dark-gray passes-title">Wejściówki</h4>
                </Col>
            </Row>

            <Row className="mx-2 flex-column align-items-center">
                {activePasses.length > 0 ? (
                    activePasses.map((pass) => (
                        <Col xs={12} md={8} lg={6} key={pass.id} className="mb-4 w-100 px-1">
                            <Card className="pass-card border-0 shadow-sm rounded-4">
                                <Card.Body className="p-4">
                                    <Row>
                                        <Col xs={8} className="d-flex flex-column align-items-start">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h4 className="fw-bold mb-0 pass-title">{pass.offer_name}</h4>
                                            </div>
                                            <div className="date-container text-center mb-4">
                                                <div className="date-text">{formatDate(pass.purchase_date)}</div>
                                                <div className="date-dash">-</div>
                                                <div className="date-text">{formatDate(pass.valid_until)}</div>
                                            </div>
                                            <div className="d-flex align-items-center mt-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="me-1 location-icon" viewBox="0 0 24 24">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                <small className="fw-medium text-dark-gray location-text">Rzeszów</small>
                                            </div>
                                        </Col>
                                        <Col xs={4} className="d-flex flex-column align-items-center justify-content-center">
                                            <span className={`pass-days-text ${passesLimitColors(pass.days_left)}`}>Pozostało</span>
                                            <div className={`fw-bold mb-0 pass-days-number ${passesLimitColors(pass.days_left)}`}>
                                                {pass.days_left}
                                            </div>
                                            <span className={`pass-days-text ${passesLimitColors(pass.days_left)}`}>dni</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col xs={12} className="text-center mt-5 mb-5">
                        <p className="text-muted fw-medium fs-5">Nie posiadasz obecnie żadnych aktywnych karnetów.</p>
                    </Col>
                )}
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Home;