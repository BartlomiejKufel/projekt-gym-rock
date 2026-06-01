import "./MainNavbar.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';

const MainNavbar = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <Navbar fixed="bottom" className="justify-content-center" >
      <Container className="justify-content-center mb-4">
        <Nav className="main-nav px-3 text-center">
          <Nav.Link
            as={Link}
            to="/home"
            className={activeTab === "/home" ? "active-link" : ""}
          >
            <img
              src={activeTab === "/home" ? "/icons/home-white.svg" : "/icons/home-gray.svg"}
              alt="Home"
              className="px-2"
            />
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/statistics"
            className={activeTab === "/statistics" ? "active-link" : ""}
          >
            <img
              src={activeTab === "/statistics" ? "/icons/statistics-white.svg" : "/icons/statistics-gray.svg"}
              alt="Statistics"
              className="px-2"
            />
            Statystyki
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/instructors"
            className={activeTab === "/instructors" ? "active-link" : ""}
          >
            <img
              src={activeTab === "/instructors" ? "/icons/instructors-white.svg" : "/icons/instructors-gray.svg"}
              alt="Instructors"
              className="px-2"
            />
            Wydarzenia
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/card"
            className={activeTab === "/card" ? "active-link" : ""}
          >
            <img
              src={activeTab === "/card" ? "/icons/card-white.svg" : "/icons/card-gray.svg"}
              alt="Card"
              className="px-2"
            />
            Karta
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;