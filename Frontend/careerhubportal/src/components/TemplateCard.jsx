import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TemplateCard({ title, img, templateName }) {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate("/resumeForm", { state: { templateName } });
  };

  return (
    <Card className="template-card">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary" onClick={handleSelect} className="custom-btn">
          Use Template
        </Button>
      </Card.Body>
    </Card>
  );
}
export default TemplateCard;
