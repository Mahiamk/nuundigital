import { Container, Row, Col } from "react-bootstrap";
import Photo from "../../assets/cam.jpg";
import Video from "../../assets/weedingvideo.mp4";
import Card from "react-bootstrap/Card";
import {
  AiOutlineYoutube,
  AiFillInstagram,
  AiFillTikTok,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import AdvertGallery from "./Advert";
import TestimonialSection from "./Testimonial";
import './home2.css'

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em", textAlign: "center" }}>
              WE ARE <span className="purple"> DIGITAL </span> BRIDGE
            </h1>
            <p className="home-about-body">
              At NuunDigital Solution, we connect innovation with success, transforming ideas into reality through cutting-edge digital solutions. As a dynamic and forward-thinking company, we specialize in creative design, advanced technology, and strategic marketing to help businesses thrive in the digital era.
              <br />
              <br />
              <span><span className="purple">Our mission is simple:</span> to bridge the gap between brands and their audiences by delivering high-quality digital experiences that inspire, engage, and drive growth.</span>
              <br />
              <br />
              We are experienced in
              <i>
                <b className="purple"> photography, decoration, banner design & printing, web developing and Advertising. </b>
              </i>
            </p>
          </Col>
        </Row>

        {/* Media Grid */}
        <Row className="justify-content-center g-4" style={{ marginTop: "20px" }}>
          <Col xs={12} md={4} className="media-box">
            <Card className="media-card">
              <Card.Img variant="top" src={Photo} alt="Sample Work" className="media-image" />
              <Card.Body>
                <Card.Title>Photography</Card.Title>
                <Card.Text>High-quality professional shots.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4} className="media-box">
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

          {/* <Col xs={12} md={4} className="media-box">
            <AdvertGallery />
          </Col> */}
          <AdvertGallery />
        </Row>

        <Row>
          <TestimonialSection />
          <Col md={12} className="home-about-social">
            <h1>FIND US ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with us
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://t.me/amkmahi"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  style={{ color: "blue" }}
                >
                  <FaTelegramPlane />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://youtube.com/mahikoTech"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  style={{ color: "red" }}
                >
                  <AiOutlineYoutube />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.tiktok.com/in/anwarkoji4u/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  style={{ color: "white" }}
                >
                  <AiFillTikTok />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/mammaye"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  style={{ color: "pink" }}
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;