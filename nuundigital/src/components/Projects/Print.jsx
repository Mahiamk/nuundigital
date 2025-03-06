import { useState } from "react";
import { Modal, Button, Carousel, Card, Col } from "react-bootstrap";
import print1 from "../../assets/print/print1.jpg";
import "../Home/advertgallery.css"; // Import CSS for styling
import { CgWebsite } from "react-icons/cg";



function print() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const advertImages = [
    { src: print1, alt: "Advert 3", description: "Professional billboard design." },
  ];
  function truncateText(text, limit) {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  }
  return (
    <>
      {/* Advert Card */}
      {/* <Row md={8} className="home-about-description"> */}
        <Col md={4} className="project-card">
          <Card className="project-card-view">
            <div className="image-container">
              <Card.Img variant="top" src={print1} alt="Advert" onClick={handleShow}/>
              <div className="image-description" onClick={handleShow}>{">>"}Click</div>
            </div>
            <Card.Body className="advert-card-body">
              <Card.Title>Printing Service </Card.Title>
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
            <Modal.Title style={{fontFamily: "sans-serif"}}>Printed collections</Modal.Title>
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

export default print;
