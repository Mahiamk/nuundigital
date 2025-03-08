import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Aboutcard from "./AboutCard";
import Map from "./Map";



function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row>
          <Col>
            <h1 style={{ fontSize: "2.1em"}}>
              Our Quality<strong className="purple"> Services</strong>
            </h1>
          </Col>
            <Aboutcard />
          <Map />
        </Row>
      </Container>
    </Container>
  );
}

export default About;