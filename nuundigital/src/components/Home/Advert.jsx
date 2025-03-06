import { useState } from "react";
import { Modal, Button, Carousel, Card, Col } from "react-bootstrap";
import adverts1 from "../../assets/adverts.jpg";
import adverts2 from "../../assets/advert1.jpg";
import adverts3 from "../../assets/advert2.jpg";
import "./advertgallery.css"; 

function AdvertGallery() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const advertImages = [
    { src: adverts1, alt: "Advert 1", description: "Eye-catching banners and posters." },
    { src: adverts2, alt: "Advert 2", description: "Creative social media marketing ads." },
    { src: adverts3, alt: "Advert 3", description: "Professional billboard design." },
  ];

  return (
    <>
      {/* Advert Card */}
      <Col md={8} className="media-box">
        <Card className="media-card">
          <div className="image-container">
            <Card.Img variant="top" src={adverts1} alt="Advert" className="media-image" onClick={handleShow} />
            <div className="image-description" onClick={handleShow}>Click to View More</div>
          </div>
          <Card.Body className="advert-card-body">
            <Card.Title>Advert 📝</Card.Title>
            <Card.Text>
              - Always deliver more than expected.  
              - Passion meets professionalism.  
              - Capture, create, inspire.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Modal with Image Carousel */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Advert Gallery</Modal.Title>
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

export default AdvertGallery;
