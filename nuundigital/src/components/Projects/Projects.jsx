import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import delivery from "../../assets/delivery.png";
import chatify from "../../assets/image.jpg";
import WeddingCollection from '../Projects/wedding'
import Banner from '../Projects/advert'
import Print from '../Projects/Print'


function truncateText(text, limit) {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}
function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Our Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a seemless projects we deliverd to our clients on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Concert Design"
              description={truncateText("We provide professional advertising services for events such as concerts, graduations, gatherings, and more. From promotional videos to social media campaigns, we create engaging content that maximizes reach and impact. Our team ensures your event gets the attention it deserves with creative and strategic marketing. Let us help you make your event a success!", 200)}
              demoLink="https://anwarkoji.tech/"
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pride}
              isBlog={false}
              title="wedding video production"
              description="We create wedding videos that capture beautiful moments with cinematic storytelling. We also design and set up stunning wedding decorations to enhance the atmosphere. Every video is carefully edited to preserve the magic of the day. Our work blends creativity and attention to detail for unforgettable weddings."
            />
          </Col> */}
          
          <WeddingCollection />
          

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={delivery}
              isBlog={false}
              title="Doorstep Delivery"
              description={truncateText("We built a fully functional delivery platform called Doorstep Delivery. It streamlines the ordering process with a seamless user experience. Our platform ensures efficient and reliable deliveries. Designed with scalability and performance in mind.", 200)}
            />
          </Col>
          <Banner />
          <Print />
          <Banner />
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
