import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Promotion.css";

const Promotion = ({ setHeaderVisible, setMainNavbarVisible }) => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (setHeaderVisible) setHeaderVisible(false);
        if (setMainNavbarVisible) setMainNavbarVisible(false);

        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            navigate("/home");
        }

        // Fetch events
        fetch("http://localhost:8000/api/events")
            .then((response) => response.json())
            .then((data) => {
                const now = new Date();

                // Parse date utility
                const parseDate = (dateStr) => {
                    return new Date(dateStr.replace(' ', 'T'));
                };

                // Filter future events and sort by start_date ascending
                const upcoming = data
                    .filter(event => parseDate(event.start_date) >= now)
                    .sort((a, b) => parseDate(a.start_date) - parseDate(b.start_date))
                    .slice(0, 5);

                setEvents(upcoming);
            })

        return () => {
            if (setHeaderVisible) setHeaderVisible(true);
            if (setMainNavbarVisible) setMainNavbarVisible(true);
        };
    }, [setHeaderVisible, setMainNavbarVisible, navigate]);

    const formatEventDateTime = (startStr, endStr) => {
        try {
            const startDate = new Date(startStr.replace(' ', 'T'));
            const endDate = new Date(endStr.replace(' ', 'T'));

            const formattedDay = startDate.toLocaleDateString("pl-PL", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });
            const capitalizedDay = formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);

            const startTime = startDate.toLocaleTimeString("pl-PL", { hour: '2-digit', minute: '2-digit' });
            const endTime = endDate.toLocaleTimeString("pl-PL", { hour: '2-digit', minute: '2-digit' });

            return {
                day: capitalizedDay,
                time: `${startTime} - ${endTime}`
            };
        } catch (e) {
            return {
                day: startStr,
                time: ""
            };
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="promotion-page-wrapper">
            <Container className="promotion-container d-flex align-items-center justify-content-center min-vh-100 py-5">
                <Row className="w-100 gy-5 gx-md-5 align-items-center justify-content-center">
                    {/* Left Column: Brand & Login CTA */}
                    <Col xs={12} lg={5} className="d-flex flex-column align-items-center align-items-lg-start text-center text-lg-start branding-column">
                        <div className="promotion-logo-container mb-4">
                            <img src="/img/logo.png" alt="Rock Gym Logo" className="promotion-logo" />
                        </div>
                        <h2 className="promotion-title fw-bold text-white mb-5">
                            Przekraczaj własne granice
                        </h2>

                        <Button
                            variant="light"
                            className="promotion-cta-btn fw-bold px-5 py-3"
                            onClick={handleLoginRedirect}
                        >
                            Zaloguj się do panelu
                        </Button>
                    </Col>

                    {/* Right Column: Nearest Events list */}
                    <Col xs={12} lg={6} className="d-flex flex-column events-column">
                        <div className="promotion-events-card p-4 p-md-5">
                            <h3 className="events-card-title fw-bold text-dark-gray mb-4 d-flex align-items-center justify-content-between">
                                <span>Najbliższe Wydarzenia</span>
                            </h3>

                            {events.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-muted fs-5 mb-0">Aktualnie nie ma zaplanowanych nowych wydarzeń.</p>
                                </div>
                            ) : (
                                <div className="promotion-events-list d-flex flex-column gap-3">
                                    {events.map((event) => {
                                        const { day, time } = formatEventDateTime(event.start_date, event.end_date);
                                        const instructorImg = event.instructor_id
                                            ? `http://localhost:8000/api/users/profile_picture/${event.instructor_id}`
                                            : "/img/default-profile-pic.png";

                                        return (
                                            <Card
                                                key={event.event_id}
                                                className="promo-event-card border-0 rounded-4 overflow-hidden position-relative"
                                                onClick={handleLoginRedirect}
                                                style={{ backgroundColor: event.event_color && event.event_color !== '#e3e3e3' ? event.event_color : '#8B5CF6' }}
                                            >
                                                <Card.Body className="p-3 d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="promo-instructor-wrapper">
                                                            <img
                                                                src={instructorImg}
                                                                alt={event.instructor ? `${event.instructor.name} ${event.instructor.surname}` : "Instruktor"}
                                                                className="promo-instructor-img rounded-circle"
                                                                onError={(e) => {
                                                                    e.target.src = "/img/default-profile-pic.png";
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="promo-event-info">
                                                            <h5 className="promo-event-name fw-bold text-white mb-1">
                                                                {event.name}
                                                            </h5>
                                                            <p className="promo-event-date text-white-50 mb-0 small">
                                                                <strong>{day}</strong> • {time}
                                                            </p>
                                                            {event.instructor && (
                                                                <span className="promo-event-instructor text-white-50 small d-block">
                                                                    Prowadzący: {event.instructor.name} {event.instructor.surname}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-end d-flex flex-column align-items-end">
                                                        <span className="promo-event-spots badge bg-light text-dark fw-bold mb-2">
                                                            Miejsca: {event.participants_count || 0} / {event.participants_limit}
                                                        </span>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Promotion;
