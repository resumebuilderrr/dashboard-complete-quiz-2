import { Container, Button, Row, Col } from "react-bootstrap";
import robo from "../assets/robo.png";

function Home() {
  return (
    <div className="main-container">
      <Container className="inside-card home">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="fw-bold">AI-Powered Smart Resume Builder</h1>
            <p className="lead">
              Create professional resumes in minutes with AI-powered
              suggestions.
            </p>
            <Button
              variant="light"
              href="/templates"
              className="custom-btn-alt"
            >
              Build your Resume
            </Button>
          </Col>

          <Col md={6} className="text-center">
            <img
              src={robo}
              alt="Resume Builder Illustration"
              className="img-fluid hero-img"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
