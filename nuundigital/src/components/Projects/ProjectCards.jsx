import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import Modal from "../../admin/components/Modal";

function ProjectCards(props) {
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const images = props.images && props.images.length > 0 ? props.images : [props.imgPath];

  const openGallery = (idx = 0) => {
    setGalleryIndex(idx);
    setShowGallery(true);
  };
  const closeGallery = () => setShowGallery(false);
  const nextImage = () => {
    setGalleryIndex((galleryIndex + 1) % images.length);
  };
  const prevImage = () => {
    setGalleryIndex((galleryIndex - 1 + images.length) % images.length);
  };

  // Keyboard navigation for modal gallery
  useEffect(() => {
    if (!showGallery) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeGallery();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery, galleryIndex, images.length]);

  const image = (
    <Card.Img
      variant="top"
      src={props.imgPath}
      alt="card-img"
      style={{ cursor: "pointer" }}
      onClick={() => openGallery(0)}
    />
  );

  return (
    <>
      <Card className="modern-project-card project-card-view project-card-anim">
        {props.demoLink && props.demoLink !== "#" ? (
          <a href={props.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
            {image}
          </a>
        ) : (
          image
        )}
        <Card.Body style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify", flex: 1 }}>
            {props.description}
          </Card.Text>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              className="modern-project-btn"
              variant="primary"
              href={props.demoLink}
              target="_blank"
              style={{ marginLeft: "10px", marginTop: "2px" }}
            >
              <CgWebsite /> &nbsp;
              {"Demo"}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal isOpen={showGallery} onClose={closeGallery} title={props.title} size="large">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 350 }}>
          <img
            src={images[galleryIndex]}
            alt={`Gallery ${galleryIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: 350, borderRadius: 12, marginBottom: 16 }}
          />
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <Button variant="secondary" onClick={e => { e.stopPropagation(); prevImage(); }}>&lt; Prev</Button>
              <span style={{ alignSelf: 'center' }}>{galleryIndex + 1} / {images.length}</span>
              <Button variant="secondary" onClick={e => { e.stopPropagation(); nextImage(); }}>Next &gt;</Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
export default ProjectCards;
