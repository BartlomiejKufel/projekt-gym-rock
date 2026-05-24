import "./ProfileEdit.css";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

const ProfileEdit = ({ userId }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImg, setPreviewImg] = useState(`http://localhost:8000/api/users/profile_picture/${userId}`);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/users/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name || "");
                setSurname(data.surname || "");
                setEmail(data.email || "");
                setDateOfBirth(data.date_of_birth || "");
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setErrorMsg("Błąd podczas ładowania danych użytkownika.");
            });
    }, [userId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
                setProfilePicture(reader.result); // zmiana na Base64 string do wysłania do bazy 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        setErrorMsg(null);

        const updateData = {
            name,
            surname,
            email,
            date_of_birth: dateOfBirth || null,
        };

        if (password) {
            updateData.password = password;
        }

        if (profilePicture) {
            updateData.profile_picture = profilePicture;
        }

        fetch(`http://localhost:8000/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updateData)
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    setMessage("Dane zostały pomyślnie zaktualizowane!");
                    setPassword("");
                    setSaving(false);
                } else {
                    setErrorMsg(data.message || "Błąd podczas zapisu danych.");
                    setSaving(false);
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                setErrorMsg("Wystąpił błąd sieci podczas zapisywania.");
                setSaving(false);
            });
    };



    return (
        <Container className="mb-5 pt-4 profile-edit-container">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    {message && <Alert variant="success" className="mx-2 rounded-4">{message}</Alert>}
                    {errorMsg && <Alert variant="danger" className="mx-2 rounded-4">{errorMsg}</Alert>}

                    <Card className="border-0 shadow-sm rounded-4 mx-2 overflow-hidden">
                        <Card.Body className="p-4 p-md-5">
                            <Form onSubmit={handleSave}>
                                <div className="text-center mb-5 position-relative">
                                    <div className="profile-edit-img-wrapper mx-auto shadow-sm">
                                        <img
                                            src={previewImg}
                                            alt="Profile Preview"
                                            className="profile-edit-img"
                                            onError={() => setPreviewImg("/img/default-profile-pic.png")}
                                        />
                                    </div>
                                    <Form.Group className="mt-3">
                                        <Form.Label htmlFor="profile-pic-upload" className="change-photo-label fw-bold">
                                            Zmień zdjęcie
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            id="profile-pic-upload"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="d-none"
                                        />
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-4" controlId="formName">
                                    <Form.Label className="fw-bold text-secondary small">Imię</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="edit-input rounded-3"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formSurname">
                                    <Form.Label className="fw-bold text-secondary small">Nazwisko</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="edit-input rounded-3"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label className="fw-bold text-secondary small">Adres E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        className="edit-input rounded-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formDob">
                                    <Form.Label className="fw-bold text-secondary small">Data Urodzenia</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className="edit-input rounded-3"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="formPassword">
                                    <Form.Label className="fw-bold text-secondary small">Nowe Hasło (opcjonalnie)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        className="edit-input rounded-3"
                                        placeholder="Wpisz nowe hasło..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="text-center">
                                    <Button
                                        variant="dark"
                                        type="submit"
                                        className="save-profile-btn px-5 py-3 fw-bold rounded-pill shadow-sm"
                                        disabled={saving}
                                    >
                                        Zapisz Zmiany
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default ProfileEdit;
