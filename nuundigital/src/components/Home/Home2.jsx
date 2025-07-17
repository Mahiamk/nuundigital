import React from "react";
import Photo from "../../assets/cam.jpg";
import Video from "../../assets/weedingvideo.mp4";
import AdvertImage from "../../assets/advert1.jpg";
import TestimonialSection from "./Testimonial";
import { AiOutlineYoutube, AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import './home2.css';

function Home2() {
  return (
    <div className="home2-bg">
      <section className="home2-hero">
        <h1 className="home2-title">We Are Digital Bridge</h1>
        <p className="home2-sub">Bridging brands and audiences with <b>innovation</b>, <b>creativity</b>, and <b>technology</b>.<br/>
          <span className="home2-mission">Transforming ideas into reality through digital excellence.</span>
        </p>
      </section>
      <section className="home2-media-section">
        <div className="home2-media-grid">
          <div className="home2-media-card home2-glass-card home2-fade-in-up">
            <div className="home2-card-img-wrap">
              <img src={Photo} alt="Photography" className="home2-media-img" />
            </div>
            <div className="home2-media-info">
              <h3>Photography</h3>
              <p>High-quality professional shots.</p>
            </div>
          </div>
          <div className="home2-media-card home2-glass-card home2-fade-in-up" style={{ animationDelay: '0.12s' }}>
            <div className="home2-card-img-wrap">
              <video
                className="home2-media-img"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="home2-media-info">
              <h3>Video Editing</h3>
              <p>Creative and cinematic productions.</p>
            </div>
          </div>
          <div className="home2-media-card home2-glass-card home2-fade-in-up" style={{ animationDelay: '0.24s' }}>
            <div className="home2-card-img-wrap">
              <img src={AdvertImage} alt="Advertising" className="home2-media-img" />
            </div>
            <div className="home2-media-info">
              <h3>Advertising</h3>
              <p>Strategic marketing campaigns.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="home2-testimonial-section">
        <TestimonialSection />
      </section>
      <section className="home2-social-section">
        <h2>Find Us On</h2>
        <p>Feel free to <span className="home2-accent">connect</span> with us</p>
        <div className="home2-social-icons">
          <a href="https://t.me/NUUNDIGITAL" target="_blank" rel="noreferrer" className="home2-social-icon telegram"><FaTelegramPlane /></a>
          <a href="https://youtube.com/mahikoTech" target="_blank" rel="noreferrer" className="home2-social-icon youtube"><AiOutlineYoutube /></a>
          <a href="https://www.tiktok.com/in/anwarkoji4u/" target="_blank" rel="noreferrer" className="home2-social-icon tiktok"><AiFillTikTok /></a>
          <a href="https://www.instagram.com/mammaye" target="_blank" rel="noreferrer" className="home2-social-icon instagram"><AiFillInstagram /></a>
        </div>
      </section>
    </div>
  );
}
export default Home2;