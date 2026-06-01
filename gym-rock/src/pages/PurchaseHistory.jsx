import "./PurchaseHistory.css";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const PurchaseHistory = ({ userId }) => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/purchases/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setPurchaseHistory(data);
            })
            .catch((error) => {
                console.error("Error fetching purchase history:", error);
            });
    }, [userId]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString.replace(' ', 'T'));
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        } catch (e) {
            return dateString;
        }
    };

    const formatPrice = (price) => {
        return `${parseFloat(price).toFixed(2)} zł`;
    };

    return (
        <Container className="mb-5 pt-4 purchase-history-container">
            <Row className="mx-2">
                <Col xs={12} className="px-1">
                    {purchaseHistory.length > 0 ? (
                        <Card className="purchase-card border-0 shadow-sm rounded-4 overflow-hidden">
                            <Card.Body className="p-0">
                                <div className="table-responsive">
                                    <Table hover className="align-middle mb-0 custom-table">
                                        <thead className="table-light-header">
                                            <tr>
                                                <th className="px-4 py-3 text-uppercase text-secondary font-xs">Usługa / Karnet</th>
                                                <th className="px-4 py-3 text-uppercase text-secondary font-xs">Data Zakupu</th>
                                                <th className="px-4 py-3 text-uppercase text-secondary font-xs text-end">Cena</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseHistory.map((purchase) => (
                                                <tr key={purchase.purchase_id} className="purchase-row">
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="offer-icon-wrapper me-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#4E49DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark-gray">{purchase.offer?.name || "Karnet / Usługa"}</span>
                                                                {Number(purchase.offer.duration) !== 0 && (
                                                                    <div className="text-muted mini-text">{purchase.offer.duration} dni</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-muted">
                                                        {formatDate(purchase.purchase_date)}
                                                    </td>
                                                    <td className="px-4 py-3 text-end fw-bold text-dark-gray">
                                                        {formatPrice(purchase.price)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-sm rounded-4 py-5 text-center empty-state-card">
                            <Card.Body>
                                <div className="empty-cart-icon mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#a0aec0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                </div>
                                <h5 className="fw-bold text-dark-gray mb-1">Brak zakupów</h5>
                                <p className="text-muted mb-0">Nie masz jeszcze żadnych transakcji w historii.</p>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PurchaseHistory;