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

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by NuunDigital Solution</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} NDS</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://t.me/NuunDigital_Solution"
                style={{ color: "#26A5E4" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaTelegramPlane />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=100081470026836"
                style={{ color: "#DA1F2" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineFacebook />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/anwarkoji4u/"
                style={{ color: "#0077B5" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/mamaye"
                style={{ color: "#e4405f" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;