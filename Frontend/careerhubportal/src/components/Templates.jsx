import TemplateCard from "../components/TemplateCard";
import { Container, Row, Col } from "react-bootstrap";

function Templates() {
  return (
    <div className="main-container">
      <Container className="hero text-center my-5 inside-card">
        <h2 className="mt-4 mb-4 fw-bold">Choose a Template</h2>

        <Row className="g-4">
          <Col md={4}>
            <TemplateCard
              title="Classic Professional"
              img="src/assets/template1.jpeg"
              templateName="ClassicProfessional"
            />
          </Col>
          <Col md={4}>
            <TemplateCard
              title="Modern Minimalist"
              img="src/assets/template2.jpeg"
              templateName="ModernMinimalist"
            />
          </Col>
          <Col md={4}>
            <TemplateCard
              title="Creative Visual"
              img="src/assets/template3.jpeg"
              templateName="CreativeVisual"
            />
          </Col>
        </Row>

        <Row className="g-4 mt-4">
          <Col md={4}>
            <TemplateCard
              title="ATS-Friendly Simple"
              img="src/assets/template4.jpeg"
              templateName="ATSSimple"
            />
          </Col>
          <Col md={4}>
            <TemplateCard
              title="Executive / Senior"
              img="src/assets/template5.jpeg"
              templateName="Executive"
            />
          </Col>
          <Col md={4}>
            <TemplateCard
              title="Student / Entry-Level"
              img="src/assets/template6.jpeg"
              templateName="StudentTemplate"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Templates;
