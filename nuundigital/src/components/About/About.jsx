import React from "react";
import './AC.css';
import { FaCameraRetro, FaFilm, FaBullhorn } from 'react-icons/fa';
import photoImg from '../../assets/weeding.jpg';
import videoImg from '../../assets/adverts.jpg';
import advertImg from '../../assets/adverts.jpg';
import videoFile from '../../assets/weedingvideo.mp4';

function About() {
  return (
    <section className="vercel-about-bg">
      <div className="vercel-hero">
        <div className="vercel-hero-left">
          <h1 className="vercel-hero-title">Turbocharged Creativity.<br />Enterprise Quality.</h1>
          <p className="vercel-hero-sub">NuunDigital Studio blends artistry and technology to deliver world-class photography, cinematic video, and digital campaigns for brands that demand the best.</p>
          <a href="#gallery" className="vercel-cta-btn">See Our Work</a>
        </div>
        <div className="vercel-hero-right">
          <img src={photoImg} alt="Studio Showcase" className="vercel-hero-img" />
        </div>
      </div>
      <div className="vercel-features">
        <div className="vercel-feature-card vercel-anim-fadein">
          <img src={photoImg} alt="Photography" className="vercel-feature-img" />
          <FaCameraRetro className="vercel-feature-icon" />
          <h2>Professional Photography</h2>
          <p>Studio, event, and commercial shoots with a creative edge. High-resolution imagery for every story.</p>
        </div>
        <div className="vercel-feature-card vercel-anim-fadein vercel-anim-delay1">
          <div className="vercel-feature-video-wrap">
            <video
              src={videoFile}
              className="vercel-feature-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              Sorry, your browser does not support embedded videos.
            </video>
          </div>
          <FaFilm className="vercel-feature-icon" />
          <h2>Cinematic Video</h2>
          <p>From concept to final cut, we produce compelling videos for brands, events, and campaigns—delivering your message with impact.</p>
        </div>
        <div className="vercel-feature-card vercel-anim-fadein vercel-anim-delay2">
          <img src={advertImg} alt="Campaigns" className="vercel-feature-img" />
          <FaBullhorn className="vercel-feature-icon" />
          <h2>Digital Campaigns</h2>
          <p>Strategic, visually stunning campaigns for web, social, and print. We help you stand out and connect with your audience.</p>
        </div>
      </div>
    </section>
  );
}

export default About;