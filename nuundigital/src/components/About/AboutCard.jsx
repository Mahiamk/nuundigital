import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import Type from "../Home/Type";
import Photo from "../../assets/weeding.jpg";
import adverts from "../../assets/adverts.jpg";
import Video from "../../assets/weedingvideo.mp4";
import "./AC.css"; // Import the updated CSS

function AboutCard() {
  return (
    <Container>
      <Type />
      <Container className="about-section">
        <Container>
          <p style={{textAlign: "justify", fontSize: "18px"}}>At NuunDigital Solution, we take pride in delivering high-quality digital solutions that meet the evolving needs of our clients. Founded in 2021 and <a href="https://maps.google.com/maps?q=8.54207,39.26934&z=14" target="_blank" rel="noopener noreferrer" className="location-link">located</a> on the first floor of the Soreti Building in Adama, our company is built on a commitment to excellence and customer satisfaction.
We believe in providing innovative and reliable digital products that help businesses grow and thrive in today’s competitive market. Our dedication to quality and personalized service has earned us a strong reputation among our clients. At NuunDigital Solution, your success is our priority, and we are always ready to go the extra mile to ensure you get the best solutions tailored to your needs.</p>
        </Container>
        <div className="ourservices">
         <h3>📸✨ Our Work & Inspiration 🎥📜</h3>

        </div>


        {/* 3-column grid layout for desktop, responsive to smaller screens */}
        <Row className="justify-content-center">
          {/* Photography Card */}
          <Col md={6} lg={4} className="media-box">
            <Card className="media-card">
              <Card.Img variant="top" src={Photo} alt="Photography" className="media-image" />
              <Card.Body>
                <Card.Title>Photography</Card.Title>
                <Card.Text>High-quality professional shots.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Video Editing Card */}
          <Col md={6} lg={4} className="media-box">
            <Card className="media-card">
              <video controls className="media-image">
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Card.Body>
                <Card.Title>Video Editing</Card.Title>
                <Card.Text>Creative and cinematic productions.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Advertising Card */}
          <Col md={6} lg={4} className="media-box">
            <Card className="media-card">
              <Card.Img variant="top" src={adverts} alt="Advertisement" className="media-image" />
              <Card.Body>
                <Card.Title>Advertisement 📝</Card.Title>
                <Card.Text>
                  - Always deliver more than expected.  
                  - Passion meets professionalism.  
                  - Capture, create, inspire.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="media-box">
            <Card className="media-card">
              <Card.Img variant="top" src={Photo} alt="Photography" className="media-image" />
              <Card.Body>
                <Card.Title>Photography</Card.Title>
                <Card.Text>High-quality professional shots.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default AboutCard;
