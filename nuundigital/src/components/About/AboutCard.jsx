import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import Type from "../Home/Type";
import Photo from "../../assets/weeding.jpg";
import adverts from "../../assets/adverts.jpg";
import Video from "../../assets/weedingvideo.mp4";
import "./AC.css"; // Import the updated CSS
import { useEffect, useState } from "react";

function AboutCard() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);
  return (
    <Container className="about-hero-bg">
      <div className="about-hero">
        <h1 className="about-hero-title">Welcome to NuunDigital Studio</h1>
        <p className="about-hero-sub">Where Creativity Meets Technology</p>
      </div>
      <Row className="about-cards-row justify-content-center">
        {/* Photography Card */}
        <Col md={6} lg={4} className="media-box">
          <Card className={`media-card about-anim-fadein${animate ? " about-anim-in" : ""}`}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=600&q=80" alt="Photography" className="media-image" />
            <Card.Body>
              <Card.Title>Photography</Card.Title>
              <Card.Text>High-quality professional shots that capture your story.</Card.Text>
              <a href="#gallery" className="about-card-btn">See Gallery</a>
            </Card.Body>
          </Card>
        </Col>
        {/* Video Editing Card */}
        <Col md={6} lg={4} className="media-box">
          <Card className={`media-card about-anim-fadein about-anim-delay1${animate ? " about-anim-in" : ""}`}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=600&q=80" alt="Video Editing" className="media-image" />
            <Card.Body>
              <Card.Title>Video Editing</Card.Title>
              <Card.Text>Creative, cinematic productions for every occasion.</Card.Text>
              <a href="#gallery" className="about-card-btn">See Gallery</a>
            </Card.Body>
          </Card>
        </Col>
        {/* Advertising Card */}
        <Col md={6} lg={4} className="media-box">
          <Card className={`media-card about-anim-fadein about-anim-delay2${animate ? " about-anim-in" : ""}`}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=600&q=80" alt="Advertising" className="media-image" />
            <Card.Body>
              <Card.Title>Advertising</Card.Title>
              <Card.Text>Passion meets professionalism. Capture, create, inspire.</Card.Text>
              <a href="#gallery" className="about-card-btn">See Gallery</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutCard;
