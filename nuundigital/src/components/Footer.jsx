import { Container, Row, Col } from "react-bootstrap";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { 
  FaTelegramPlane,
  FaLinkedinIn
 } from "react-icons/fa";
import './Footer.css';

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="footer-glass">
      <Container fluid>
        <Row className="footer-top align-items-center">
          <Col md={6} className="footer-logo-col">
            <div className="footer-logo">
              <span className="footer-logo-blue">Nuun</span>
              <span className="footer-logo-gold">Digital</span>
              <span className="footer-logo-gray">Solution</span>
            </div>
          </Col>
          <Col md={6} className="footer-company-col">
            <div className="footer-company">Designed & Developed by <b>NuunDigital Solution</b></div>
          </Col>
        </Row>
        <Row className="footer-bottom align-items-center">
          <Col md={6} className="footer-copyright">
            <small>© {year} NuunDigital. All rights reserved.</small>
          </Col>
          <Col md={6} className="footer-social-col">
            <ul className="footer-social-icons">
              <li>
                <a
                  href="https://t.me/NuunDigital_Solution"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100081470026836"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <AiOutlineFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/anwarkoji4u/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mamaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;