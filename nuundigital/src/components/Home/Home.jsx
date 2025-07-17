import { Container, Row, Col } from "react-bootstrap"
import Particle from '../Particle'
import Home2 from "./Home2"
import './Homee.css'
import { useNavigate } from "react-router-dom";
import olympic1 from '../../assets/olympic/1740817143233.jpg';
import olympic2 from '../../assets/olympic/IMAGE 2025-07-17 17:37:54.jpg';
import olympic3 from '../../assets/olympic/IMAGE 2025-07-17 17:37:28.jpg';
import olympic4 from '../../assets/olympic/IMAGE 2025-07-17 17:37:19.jpg';
import olympic5 from '../../assets/olympic/IMAGE 2025-07-17 17:37:07.jpg';

function Homepage() {
  const navigate = useNavigate();
  const handleBookClick = () => navigate("/booking");
  return (
    <section>
      <div className="animated-gradient-bg">
        <Container fluid className="home-section" id="home" style={{ position: "relative", padding: 0, zIndex: 1 }}>
          <Particle />
          <Container className="home-content hero-center">
            <div className="hero-row-flex">
              <div className="hero-main-content">
                <Row>
                  <Col md={12} className="home-header">
                    <h1 className="heading">Welcome to NuunDigital</h1>
                    <div className="olympic-images-wrapper">
                      <div className="olympic-motto">
                        <span>Your one-stop solution for</span><br />
                        <span>professional photography services.</span>
                      </div>
                      <div className="hero-olympic-circles">
                        <img src={olympic1} alt="olympic1" className="hero-olympic-img" />
                        <img src={olympic2} alt="olympic2" className="hero-olympic-img" />
                        <img src={olympic3} alt="olympic3" className="hero-olympic-img" />
                        <img src={olympic4} alt="olympic4" className="hero-olympic-img" />
                        <img src={olympic5} alt="olympic5" className="hero-olympic-img" />
                      </div>
                      <button className="book-cta book-cta-olympic" onClick={handleBookClick}>Book Now</button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </Container>
      </div>
      <Home2 />
    </section>
  );
}

export default Homepage;