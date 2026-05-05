import React, { useEffect } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setHeaderVisible, setMainNavbarVisible }) => {
    // Ukrywamy nawigację na ekranie logowania, jeśli zostały przekazane odpowiednie funkcje
    const navigate = useNavigate();
    useEffect(() => {

        if (setHeaderVisible) setHeaderVisible(false);
        if (setMainNavbarVisible) setMainNavbarVisible(false);

        return () => {
            if (setHeaderVisible) setHeaderVisible(true);
            if (setMainNavbarVisible) setMainNavbarVisible(true);
        };
    }, [setHeaderVisible, setMainNavbarVisible]);

    return (
        <div className="login-page-wrapper">
            <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="login-logo-container mb-5">
                    <img src="/img/logo.png" alt="Rock Gym Logo" className="login-logo" />
                </div>

                <div className="login-card p-4 p-md-5">
                    <Form>
                        <Form.Group className="mb-4" controlId="formBasicLogin">
                            <Form.Label className="login-label fw-bold">Login</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    className="login-input shadow-none"
                                />
                                <InputGroup.Text className="login-icon-bg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label className="login-label fw-bold">Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    className="login-input shadow-none"
                                />
                                <InputGroup.Text className="login-icon-bg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex justify-content-center align-items-center" controlId="formBasicCheckbox">
                            <Form.Label className="mb-0 me-2 login-remember-label">Remember me</Form.Label>
                            <Form.Check
                                type="checkbox"
                                className="login-checkbox shadow-none"
                            />
                        </Form.Group>

                        <div className="text-center mt-3">
                            <Button variant="dark" type="submit" className="login-submit-btn px-5 py-2 fw-bold" onClick={() => navigate("/home")}>
                                Log in
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default Login;