import "./Settings.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const settingsLinks = [
    { id: 1, title: "Purchase history" },
    { id: 2, title: "Change details" },
    { id: 3, title: "Documents" },
    { id: 4, title: "Terms and Conditions" },
];

const Settings = ({ userId }) => {
    const navigate = useNavigate();
    return (
        <Container className="mb-5 settings-container">
            <Row className="justify-content-center">
                <Col xs={12} className="text-center profile-section">
                    <div className="profile-img-wrapper shadow">
                        <img src="/img/adam.png" alt="Profile" className="profile-img" />
                    </div>
                    <h3 className="fw-bold mt-3 mb-0 text-dark-gray">Hi!</h3>
                    <h3 className="fw-bold text-dark-gray">Adam Ondra</h3>
                </Col>
            </Row>

            <Row className="justify-content-center mt-4 mx-1">
                <Col xs={12} md={8} lg={6}>
                    <div className="settings-links d-flex flex-column gap-3">
                        {settingsLinks.map((link) => (
                            <Card key={link.id} className="border-0 shadow-sm rounded-4 settings-link-card">
                                <Card.Body className="p-3 px-4 d-flex justify-content-between align-items-center">
                                    <span className="fw-bold text-dark-gray">{link.title}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#4a4d52" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5 mb-5">
                <Col xs="auto">
                    <Button variant="danger" className="logout-btn fw-bold px-5 py-2 shadow-sm border-0" onClick={() => navigate("/")}>
                        Log out
                    </Button>
                </Col>
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Settings;