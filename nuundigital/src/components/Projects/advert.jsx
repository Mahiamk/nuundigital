import { useState } from "react";
import { Modal, Button, Carousel, Card, Col } from "react-bootstrap";
import adverts1 from "../../assets/adverts.jpg";
import adverts2 from "../../assets/advert1.jpg";
import adverts3 from "../../assets/advert2.jpg";
import "../Home/advertgallery.css"; // Import CSS for styling
import { CgWebsite } from "react-icons/cg";



function banner() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const advertImages = [
    { src: adverts1, alt: "Advert 1", description: "Eye-catching banners and posters." },
    { src: adverts2, alt: "Advert 2", description: "Creative social media marketing ads." },
    { src: adverts3, alt: "Advert 3", description: "Professional billboard design." },
  ];
  function truncateText(text, limit) {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  }
  return (
    <>
      {/* Advert Card */}
        <Col md={4} className="project-card">
          <Card className="project-card-view">
            <div className="image-container">
              <Card.Img variant="top" src={adverts1} alt="Advert" onClick={handleShow}/>
              <div className="image-description" onClick={handleShow}>{">>"}Click</div>
            </div>
            <Card.Body className="advert-card-body">
              <Card.Title>Banner Design </Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
              {truncateText(
    "We have created eye-catching banners for our clients, ensuring their brand stands out. Our designs are tailored to meet the unique needs of each client, combining creativity and professionalism to deliver impactful visual communication.",
    200
  )}
              </Card.Text>
              {/* {!props.isBlog && props.demoLink && ( */}
                        <Button
                          variant="primary"
                          // href={props.demoLink}
                          target="_blank"
                          style={{ marginLeft: "10px", marginTop: "40px" }}
                        >
                          <CgWebsite /> &nbsp;
                          {"Demo"}
                        </Button>
                      {/* )} */}
            </Card.Body>
          </Card>
        </Col>
      {/* </Row> */}

        {/* Modal with Image Carousel */}
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title style={{fontFamily: "sans-serif"}}>Banners</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel interval={3000}>
              {advertImages.map((item, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-image-container">
                    <img className="carousel-image" src={item.src} alt={item.alt} />
                    <div className="carousel-description">{item.description}</div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button className="closeButton" variant="secondary" onClick={handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default banner;
