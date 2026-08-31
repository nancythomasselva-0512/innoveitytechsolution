import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { homeContent } = useCMS();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 35 });
  const [isHovered, setIsHovered] = useState(false);

  const partnerLogos = [
    { name: 'MICROSOFT', subtitle: 'ENTERPRISE PARTNER' },
    { name: 'AWS', subtitle: 'CLOUD SOLUTIONS' },
    { name: 'GOOGLE CLOUD', subtitle: 'AI & DATA PLATFORM' },
    { name: 'NODE.JS', subtitle: 'BACKEND ARCHITECTURE' },
    { name: 'REACT', subtitle: 'FRONTEND ECOSYSTEM' },
    { name: 'INNOVEITY', subtitle: 'CREATIVE SOLUTIONS' },
  ];

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    if (!isHovered) setIsHovered(true);
  };

  return (
    <section 
      id="home" 
      className="hero-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Moving High-Tech Orange Grid Pattern & Mild Cursor Glow */}
      <div className="hero-bg-container">
        <div className="hero-grid-pattern"></div>
        <div 
          className="hero-cursor-mild-glow"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 107, 0, 0.12) 0%, rgba(255, 145, 0, 0.04) 45%, transparent 75%)`,
            opacity: isHovered ? 1 : 0
          }}
        ></div>
      </div>

      <div className="hero-content-wrapper container">
        {/* Top Header Block: Full-width Title & Tagline */}
        <div className="hero-top-header-block">
          <h1 className="hero-display-title">
            <img 
              src="/innoveity-wordmark.png" 
              alt="Innoveity" 
              className="hero-logo-wordmark-img" 
            />
            <span className="title-white-text">
              Tech <span className="title-gradient-accent">Solutions</span>
            </span>
          </h1>

          <div className="hero-brand-tagline-row">
            <span className="hero-tagline-bar"></span>
            <span className="hero-tagline-text">SMART TECHNOLOGY. CREATIVE SOLUTIONS.</span>
            <span className="hero-tagline-bar"></span>
          </div>

          {/* Description Text */}
          <p className="hero-body-text">
            {homeContent.description}
          </p>

          {/* Left-Aligned CTA Button */}
          <div className="hero-action-group">
            <button className="pill-btn-hero" onClick={handleGetStarted}>
              <span>GET STARTED NOW</span>
              <div className="hero-arrow-circle">
                <FiArrowUpRight size={17} />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Partner / Tech Brand Logos - Continuous Moving Marquee */}
        <div className="hero-partners-footer">
          <div className="partners-marquee-track">
            {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, index) => (
              <div key={index} className="partner-logo-item">
                <span className="partner-brand-name">{partner.name}</span>
                {partner.subtitle && (
                  <span className="partner-brand-sub">{partner.subtitle}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
