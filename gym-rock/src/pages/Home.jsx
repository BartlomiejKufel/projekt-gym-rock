import "./Home.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const passes = [
  {
    id: 1,
    title: "Standard",
    badge: "BOULDERS",
    startDate: "20.11",
    endDate: "20.12",
    daysLeft: 31,
    colorClass: "text-green",
    location: "Rzeszów"
  },
  {
    id: 2,
    title: "Extra",
    badge: "SAUNA",
    startDate: "20.11",
    endDate: "27.11",
    daysLeft: 7,
    colorClass: "text-brown",
    location: "Rzeszów"
  },
  {
    id: 3,
    title: "Extra",
    badge: "MOONBOARD",
    startDate: "20.11",
    endDate: "2.12",
    daysLeft: 13,
    colorClass: "text-yellow",
    location: "Rzeszów"
  }
];

const Home = () => {
    return (
        <Container className="mb-5 pt-4 home-container">
            <Row className="mx-2 mb-3">
                <Col>
                    <h4 className="fw-bold text-dark-gray passes-title">Passes</h4>
                </Col>
            </Row>

            <Row className="mx-2 flex-column align-items-center">
                {passes.map((pass) => (
                    <Col xs={12} md={8} lg={6} key={pass.id} className="mb-4 w-100 px-1">
                        <Card className="pass-card border-0 shadow-sm rounded-4">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold mb-0 pass-title">{pass.title}</h4>
                                    <span className="pass-badge bg-light-gray text-dark fw-bold rounded-pill px-3 py-1">
                                        {pass.badge}
                                    </span>
                                </div>
                                
                                <Row className="mt-2">
                                    <Col xs={6} className="d-flex flex-column align-items-start">
                                        <div className="date-container text-center mb-4">
                                            <div className="date-text">{pass.startDate}</div>
                                            <div className="date-dash">-</div>
                                            <div className="date-text">{pass.endDate}</div>
                                        </div>
                                        <div className="d-flex align-items-center mt-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="me-1 location-icon" viewBox="0 0 24 24">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            <small className="fw-medium text-dark-gray location-text">{pass.location}</small>
                                        </div>
                                    </Col>
                                    <Col xs={6} className="d-flex flex-column align-items-center justify-content-center">
                                        <div className={`fw-bold mb-0 pass-days-number ${pass.colorClass}`}>
                                            {pass.daysLeft}
                                        </div>
                                        <span className={`pass-days-text ${pass.colorClass}`}>days left</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Home;