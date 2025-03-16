import { Container, Row, Col } from "react-bootstrap"
import Particle from '../Particle'
import { useNavigate } from "react-router-dom"
import Home2 from "./Home2"
import './Homee.css'
import Booking from '../book/booking'


function Homepage() {
  const navigate = useNavigate();  
  const handleBookClick = () => {
    console.log("Book Now clicked!"); // Debug log
    navigate("/booking"); // Navigate to booking page
  };
  return (
    <section>
      <Container fluid className="home-section" id="home" style={{ position: "relative", padding: 0 }}>
        <Particle />
        <img
          src="https://dac.digital/wp-content/uploads/2023/09/bg-video-plus.mp4"
          alt="home background"
          className="img-fluid"
          style={{ width: "100%", height: "100vh", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: -1, transition: "transform 0.3s ease, opacity 0.3s ease", }}
        />
        <Container fluid className="home-section" id="home">
          <Particle />
          <Container className="home-content">
            <Row>
              <Col md={7} className="home-header">
                <h1 className="heading">
                Welcome to NuunDigital{" "}
                </h1>

              </Col>
              {/* <Col>
                <button className="book" onClick={handleBookClick}>Book Now</button>
              </Col> */}
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