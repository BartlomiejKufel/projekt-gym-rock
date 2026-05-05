import "./Home.css";
import { Container, Row } from "react-bootstrap";


const Home = () => {
    return (
        <Container className="mb-5">
            {/* Placeholder żeby MainNavbar dobrze się pokazywał na dole strony */}
            <Row style={{ height: "15vh" }}></Row>
        </Container>
    );
};

export default Home;