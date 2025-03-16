import { useState } from "react";
import { Modal, Button, Carousel, Card, Col } from "react-bootstrap";
import adverts1 from "../../assets/adverts.jpg";
import adverts2 from "../../assets/advert1.jpg";
import adverts3 from "../../assets/advert2.jpg";
import image from "../../assets/wedding/image.png";
import image2 from "../../assets/wedding/image2.png";
import image3 from "../../assets/wedding/image3.png";
import image4 from "../../assets/wedding/image4.png";
import "./advertgallery.css"; 

function AdvertGallery() {
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [showDontModal, setShowDontModal] = useState(false);

  const handleShowAdvertModal = () => setShowAdvertModal(true);
  const handleCloseAdvertModal = () => setShowAdvertModal(false);

  const handleShowDontModal = () => setShowDontModal(true);
  const handleCloseDontModal = () => setShowDontModal(false);

  const advertImages = [
    { src: adverts1, alt: "Advert 1", description: "Eye-catching banners and posters." },
    { src: adverts2, alt: "Advert 2", description: "Creative social media marketing ads." },
    { src: adverts3, alt: "Advert 3", description: "Professional billboard design." },
  ];
  const dontImages = [
    { src: image, alt: "Wedding 1", description: "Beautiful wedding ceremony." },
    { src: image2, alt: "Wedding 2", description: "Elegant wedding reception." },
    { src: image3, alt: "Wedding 3", description: "Memorable wedding moments." },
    { src: image4, alt: "Wedding 4", description: "Stunning wedding decorations." },
  ];

  return (
    <>
      {/* Advert Card */}
      <Col md={8} className="media-box">
        <Card className="media-card">
          <div className="image-container">
            <Card.Img variant="top" src={adverts1} alt="Advert" className="media-image" onClick={handleShowAdvertModal} />
            <div className="image-description" onClick={handleShowAdvertModal}>Click to View More</div>
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
      <Col md={8} className="media-box">
        <Card className="media-card">
          <div className="image-container">
            <Card.Img variant="top" src={image} alt="Advert" className="media-image" onClick={handleShowDontModal} />
            <div className="image-description" onClick={handleShowDontModal}>Click to View More</div>
          </div>
          <Card.Body className="advert-card-body">
            <Card.Title>Wedding</Card.Title>
            <Card.Text>
              - Capturing moments that matter.  
              - Elegant and timeless wedding designs.  
              - Your special day, beautifully presented.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Advert Modal with Image Carousel */}
      <Modal show={showAdvertModal} onHide={handleCloseAdvertModal} centered size="lg">
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
          <Button className="closeButton" variant="secondary" onClick={handleCloseAdvertModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Dont Modal with Image Carousel */}
      <Modal show={showDontModal} onHide={handleCloseDontModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Wedding Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel interval={3000}>
            {dontImages.map((item, index) => (
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
          <Button className="closeButton" variant="secondary" onClick={handleCloseDontModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdvertGallery;