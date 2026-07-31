import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { homeContent } = useCMS();

  const partnerLogos = [
    { name: 'MICROSOFT', subtitle: 'ENTERPRISE PARTNER' },
    { name: 'AWS', subtitle: 'CLOUD SOLUTIONS' },
    { name: 'GOOGLE CLOUD', subtitle: 'AI & DATA PLATFORM' },
    { name: 'NODE.JS', subtitle: 'BACKEND ARCHITECTURE' },
    { name: 'REACT', subtitle: 'FRONTEND ECOSYSTEM' },
    { name: 'INNOVEITY', subtitle: 'TECH SOLUTIONS' },
  ];

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Image Container with Overlay */}
      <div className="hero-bg-container">
        <img 
          src="/hero-bg.png" 
          alt="Innoveity Tech Solution Modern Building Skyline" 
          className="hero-bg-image" 
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content-wrapper container">
        {/* Main Grid: Left Headline & Right Paragraph */}
        <div className="hero-main-grid">
          {/* Left Column: Title & Pill CTA */}
          <div className="hero-left-col">
            <span className="hero-kicker-tag">{homeContent.kicker}</span>
            <h1 className="hero-display-title">
              {homeContent.titleLine1}<br />
              {homeContent.titleLine2}
            </h1>

            <div className="hero-action-group">
              <button className="pill-btn-hero" onClick={handleGetStarted}>
                <span>GET STARTED NOW</span>
                <div className="hero-arrow-circle">
                  <FiArrowUpRight size={22} />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Paragraph with left border accent */}
          <div className="hero-right-col">
            <div className="hero-description-card">
              <p className="hero-body-text">
                {homeContent.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Partner / Tech Brand Logos */}
        <div className="hero-partners-footer">
          <div className="partners-flex-row">
            {partnerLogos.map((partner, index) => (
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
