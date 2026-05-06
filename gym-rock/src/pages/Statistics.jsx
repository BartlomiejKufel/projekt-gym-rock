import "./Statistics.css";
import { Container, Row, Col, Dropdown, Card as BootstrapCard } from "react-bootstrap";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weekStats = [
  { name: 'Mon', time: 3, formattedTime: "3h 00min" },
  { name: 'Tue', time: 3.8, formattedTime: "3h 48min" },
  { name: 'Wed', time: 2.7, formattedTime: "2h 42min" },
  { name: 'Thu', time: 3.5, formattedTime: "3h 30min" },
  { name: 'Fri', time: 4.6, formattedTime: "4h 36min" },
  { name: 'Sat', time: 3.4, formattedTime: "3h 24min" },
  { name: 'Sun', time: 5.1, formattedTime: "5h 06min" },
];

const monthStats = [
  { name: 'W1', time: 14, formattedTime: "14h 00min" },
  { name: 'W2', time: 12, formattedTime: "12h 00min" },
  { name: 'W3', time: 16, formattedTime: "16h 00min" },
  { name: 'W4', time: 18, formattedTime: "18h 00min" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label mb-0">{payload[0].payload.formattedTime}</p>
      </div>
    );
  }
  return null;
};

const Statistics = () => {
    const [view, setView] = useState("Weekly");
    const data = view === "Weekly" ? weekStats : monthStats;

    return (
        <Container className="mb-5 stats-container pt-4">
            <Row className="mx-4 mb-4 d-flex justify-content-between align-items-center">
                <Col xs="auto">
                    <h3 className="fw-bold mb-0 text-dark-gray">Presence</h3>
                </Col>
                <Col xs="auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="stats-dropdown-toggle text-primary bg-white border-0 shadow-sm rounded-pill px-3 py-1">
                            {view}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setView("Weekly")}>Weekly</Dropdown.Item>
                            <Dropdown.Item onClick={() => setView("Monthly")}>Monthly</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Row className="mx-2 mb-4">
                <Col>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart
                                data={data}
                                margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(val) => `${val}h`} />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                <Area type="monotone" dataKey="time" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTime)" activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#3b82f6' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>

            <Row className="mx-3 justify-content-between">
                <Col xs={6} className="pe-2">
                    <BootstrapCard className="stats-card border-0 shadow-sm rounded-4 h-100">
                        <BootstrapCard.Body className="p-3 d-flex flex-column justify-content-between">
                            <div className="stats-icon-bg bg-blue-light mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3b82f6" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-0">16h 32min</h5>
                                <small className="text-muted">Total Time</small>
                            </div>
                        </BootstrapCard.Body>
                    </BootstrapCard>
                </Col>
                <Col xs={6} className="ps-2">
                    <BootstrapCard className="stats-card border-0 shadow-sm rounded-4 h-100">
                        <BootstrapCard.Body className="p-3 d-flex flex-column justify-content-between">
                            <div className="stats-icon-bg bg-red-light mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ef4444" viewBox="0 0 16 16">
                                    <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                                </svg>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-0">7</h5>
                                <small className="text-muted">Days Streak</small>
                            </div>
                        </BootstrapCard.Body>
                    </BootstrapCard>
                </Col>
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Statistics;