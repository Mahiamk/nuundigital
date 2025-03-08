import { Container, Row, Col, Button } from "react-bootstrap"
import homeLogo from "../../assets/back.mov"
import Particle from '../Particle'
import Home2 from "./Home2"
import './Homee.css'


function Homepage() {
  return (
    <section>
      <Container fluid className="home-section" id="home" style={{ position: "relative", padding: 0 }}>
        <Particle />
        <img
          src={homeLogo}
          alt="home background"
          className="img-fluid"
          style={{ width: "100vw", height: "100vh", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: -1, transition: "transform 0.3s ease, opacity 0.3s ease", }}
        />
        <Container fluid className="home-section" id="home">
          <Particle />
          <Container className="home-content">
            <Row>
              <Col md={7} className="home-header">
                <h1 style={{ paddingBottom: 15 }} className="heading">
                Welcome to NuunDigital{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </h1>


              </Col>
                <h1 className="heading-name">
                Your one-stop solution for professional photography services. 
                <br />
                  <strong className="main-name">NuunDigital Solution</strong>
                </h1>
            </Row>
          </Container>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Homepage;