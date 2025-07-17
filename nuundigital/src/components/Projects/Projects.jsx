import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCards";
import delivery from "../../assets/delivery.png";
import chatify from "../../assets/image.jpg";
import WeddingCollection from '../Projects/wedding';
import Banner from '../Projects/advert';
import Print from '../Projects/Print';
import print1 from '../../assets/print/print1.jpg';
import weeding from '../../assets/weeding.jpg';
import adverts from '../../assets/adverts.jpg';

function truncateText(text, limit) {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/projects/public');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data.projects);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vercel-portfolio-bg">
      <div className="vercel-portfolio-hero">
        <h1 className="vercel-portfolio-title">Our Portfolio</h1>
        <p className="vercel-portfolio-sub">A showcase of our best work in photography, video, and digital campaigns. Every project is a story brought to life with creativity and technology.</p>
      </div>
      <div className="vercel-portfolio-grid">
        {/* Static Project Cards with your assets */}
        <ProjectCard
          imgPath={weeding}
          images={[weeding, adverts, print1]}
          isBlog={false}
          title="Wedding Photography"
          description={truncateText("Capturing the most precious moments with elegance and style. Our wedding photography tells your love story in every frame.", 200)}
          demoLink="#"
        />
        <ProjectCard
          imgPath={adverts}
          images={[adverts, weeding, chatify]}
          isBlog={false}
          title="Advertising Campaign"
          description={truncateText("Professional advertising services for events, brands, and products. From concept to execution, we deliver campaigns that get noticed.", 200)}
          demoLink="#"
        />
        <ProjectCard
          imgPath={print1}
          images={[print1, delivery, chatify]}
          isBlog={false}
          title="Print Design"
          description={truncateText("Eye-catching banners, posters, and print materials that make your brand stand out. Creativity meets professionalism in every print.", 200)}
          demoLink="#"
        />
        <ProjectCard
          imgPath={delivery}
          images={[delivery, print1, chatify]}
          isBlog={false}
          title="Doorstep Delivery Platform"
          description={truncateText("A fully functional delivery platform streamlining the ordering process with a seamless user experience. Efficient, reliable, and scalable.", 200)}
          demoLink="#"
        />
        <ProjectCard
          imgPath={chatify}
          images={[chatify, weeding, adverts]}
          isBlog={false}
          title="Concert Design"
          description={truncateText("Professional advertising for concerts, graduations, and events. Engaging content and creative marketing for maximum impact.", 200)}
          demoLink="https://anwarkoji.tech/"
        />
        {/* Dynamic Projects from Backend */}
        {loading ? (
          <div className="vercel-portfolio-loading">Loading projects...</div>
        ) : (
          projects.map(project => (
            <ProjectCard
              key={project._id}
              imgPath={project.featuredImage ? `http://localhost:5001${project.featuredImage}` : chatify}
              images={project.images && project.images.length > 0 ? project.images.map(img => `http://localhost:5001${img.url}`) : [project.featuredImage ? `http://localhost:5001${project.featuredImage}` : chatify]}
              isBlog={false}
              title={project.title}
              description={truncateText(project.description, 200)}
              demoLink={project.projectUrl || "#"}
            />
          ))
        )}
        {/* Static Components Removed */}
      </div>
    </section>
  );
}

export default Projects;
