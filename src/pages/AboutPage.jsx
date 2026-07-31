import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import './AboutPage.css';

// Hook: tracks scroll speed and converts it into a velocity skew angle
function useScrollVelocitySkew() {
  const [skew, setSkew] = useState(0);
  const lastY = useRef(0);
  const lastT = useRef(Date.now());
  const resetTimer = useRef(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = Date.now();

    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastT.current, 1);
      const velocity = (y - lastY.current) / dt; // px per ms
      const clampedSkew = Math.max(-14, Math.min(14, velocity * 12));

      setSkew(clampedSkew);
      lastY.current = y;
      lastT.current = now;

      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setSkew(0), 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return skew;
}

// ⭐ Word-Level Kinetic Scroll Skew Component for Innoveity Tech Solution
function KineticWordSkewText({ className, text }) {
  const skew = useScrollVelocitySkew();
  const words = text ? text.split(' ') : [];

  return (
    <h2 className={className} style={{ overflow: 'visible' }}>
      {words.map((word, idx) => {
        const stiffness = 175 + (idx % 4) * 15;
        const damping = 15 + (idx % 3) * 2;

        return (
          <motion.span
            key={idx}
            animate={{ skewX: skew }}
            transition={{
              type: 'spring',
              stiffness: stiffness,
              damping: damping
            }}
            style={{
              display: 'inline-block',
              transformOrigin: 'left center',
              marginRight: '0.28em',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              willChange: 'transform'
            }}
            className="skew-word-item"
          >
            {word}
          </motion.span>
        );
      })}
    </h2>
  );
}

// ⭐ Single Line Infinite Auto-Scrolling Marquee Component for Pill Badges
function MarqueeBadges({ badgesStr }) {
  const badgesArray = badgesStr ? badgesStr.split(',').map(b => b.trim()) : [];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {badgesArray.map((badge, i) => (
          <span key={`a-${i}`} className="badge-pill">{badge}</span>
        ))}
        {badgesArray.map((badge, i) => (
          <span key={`b-${i}`} className="badge-pill" aria-hidden="true">{badge}</span>
        ))}
        {badgesArray.map((badge, i) => (
          <span key={`c-${i}`} className="badge-pill" aria-hidden="true">{badge}</span>
        ))}
        {badgesArray.map((badge, i) => (
          <span key={`d-${i}`} className="badge-pill" aria-hidden="true">{badge}</span>
        ))}
      </div>
    </div>
  );
}

// Scroll-Reveal Animations Hook for Section Fades
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

const AboutPage = () => {
  const [email, setEmail] = useState('');
  const { aboutContent } = useCMS();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useScrollReveal();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Innoveity Tech Solution updates!');
    setEmail('');
  };

  return (
    <div className="about-exact-clone-page">
      <div className="about-cream-mat-frame">
        
        {/* Main Split-Screen Container */}
        <div className="about-split-screen">
          
          {/* Left Column (~50% width): Dark Green Panel #0D3B34 */}
          <div className="about-left-column">
            
            {/* Content Sections Wrapper */}
            <div className="about-sections-wrapper">
              
              {/* SECTION 1 — Hero */}
              <section className="about-hero-clean-section scroll-reveal">
                <div className="hero-stack-container">
                  <h1 className="display-hero-gold">About us</h1>
                  <h2 className="sub-heading-white">Founded in 2019</h2>
                  <p className="body-muted-paragraph">
                    Innoveity Tech Solution looks to create long-lasting relationships with all the organizations we serve. We are proud that our very first client is still a client today.
                  </p>
                </div>
              </section>

              {/* SECTION 2 — Statement (⭐ Innoveity Kinetic Word Skew Animation) */}
              <section className="statement-section scroll-reveal">
                <KineticWordSkewText className="display-statement-gold" text={aboutContent.mainStatement} />
                <div className="thin-divider-line"></div>
              </section>

              {/* SECTION 3 — Philosophy / Approach */}
              <section className="philosophy-section scroll-reveal">
                <h2 className="philosophy-white-title">Philosophy</h2>
                <p className="body-muted-paragraph philosophy-text">
                  Innoveity Tech Solution realizes the key to both our success and customer happiness is consistency. Providing a consistent service ultimately rests with the talented engineers and specialists who build your digital products each day performing the actual engineering tasks. Our employees get all the training, proper equipment, support needed to perform their duties in the most proficient manner possible. It also means treating those employees with respect and appreciation.
                </p>
              </section>

            </div>
          </div>

          {/* Right Column (~50% width): Building Image + Impact Cards on the RIGHT side */}
          <div className="about-right-column">
            
            {/* Building Image at top of right column */}
            <div className="sticky-building-container">
              <img 
                src="/hero-bg.png" 
                alt="Innoveity Tech Building Facade" 
                className="sticky-building-img" 
              />
              <div className="teal-tint-overlay"></div>
              
              {/* Overlay Suspension Ropes */}
              <div className="suspension-ropes-overlay">
                <div className="rope rope-orange"></div>
                <div className="rope rope-red"></div>
                <div className="rope rope-black"></div>
              </div>
            </div>

            {/* ⭐ Impact Cards Grid below building image */}
            <div className="always-visible-impact-wrapper">
              <div className="impact-grid">
                <div className="impact-card">
                  <span className="impact-number">{aboutContent.stat1Number}</span>
                  <span className="impact-label">{aboutContent.stat1Label}</span>
                </div>
                <div className="impact-card">
                  <span className="impact-number">{aboutContent.stat2Number}</span>
                  <span className="impact-label">{aboutContent.stat2Label}</span>
                </div>
                <div className="impact-card">
                  <span className="impact-number">{aboutContent.stat3Number}</span>
                  <span className="impact-label">{aboutContent.stat3Label}</span>
                </div>
                <div className="impact-card">
                  <span className="impact-number">{aboutContent.stat4Number}</span>
                  <span className="impact-label">{aboutContent.stat4Label}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ⭐ FULL-WIDTH MARQUEE SECTION SPANNING ACROSS BOTH COLUMNS */}
          <div className="full-width-marquee-section scroll-reveal">
            <MarqueeBadges badgesStr={aboutContent.badges} />
          </div>

        </div>

        {/* ⭐ SECTION — STRUCTURED DELIVERY STEP-BY-STEP STAGGERED PIPELINE */}
        <section className="structured-delivery-section scroll-reveal">
          <div className="structured-delivery-container">
            
            {/* Badge Pill */}
            <div className="sd-badge-wrapper">
              <span className="sd-badge">
                <span className="sd-badge-sparkle">✦</span> Structured Delivery
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="sd-main-title">One integrated, end-to-end system.</h2>
            <h3 className="sd-gradient-title">Compounding operational value.</h3>
            <p className="sd-description">
              Innoveity Tech Solution teams capture, align, validate and deliver exactly what keeps your digital programs on track.
            </p>

            {/* ⭐ 4-Step Staggered Staircase Pipeline Architecture */}
            <div className="sd-pipeline-grid">
              
              {/* Step 1: Scopes (Lowest) */}
              <div className="sd-step-col step-1">
                <div className="sd-step-header">
                  <span className="sd-step-dot"></span>
                  <span className="sd-step-title">Scopes</span>
                </div>
                <div className="sd-pillar-line"></div>
                <ul className="sd-step-list">
                  <li>conditions</li>
                  <li>capacity</li>
                  <li>specs</li>
                  <li>timelines</li>
                </ul>
              </div>

              {/* Step 2: Integrates (Step 2 Higher) */}
              <div className="sd-step-col step-2">
                <div className="sd-step-header">
                  <span className="sd-step-dot"></span>
                  <span className="sd-step-title">Integrates</span>
                </div>
                <div className="sd-pillar-line"></div>
                <ul className="sd-step-list">
                  <li>frontend</li>
                  <li>backend</li>
                  <li>cloud</li>
                  <li>security</li>
                </ul>
              </div>

              {/* Step 3: Certifies (Step 3 Higher) */}
              <div className="sd-step-col step-3">
                <div className="sd-step-header">
                  <span className="sd-step-dot"></span>
                  <span className="sd-step-title">Certifies</span>
                </div>
                <div className="sd-pillar-line"></div>
                <ul className="sd-step-list">
                  <li className="highlight-item">reliability</li>
                  <li>testing</li>
                  <li>compliance</li>
                  <li>sign-offs</li>
                </ul>
              </div>

              {/* Step 4: Activates (Highest) */}
              <div className="sd-step-col step-4">
                <div className="sd-step-header">
                  <span className="sd-step-dot"></span>
                  <span className="sd-step-title">Activates</span>
                </div>
                <div className="sd-pillar-line"></div>
                <ul className="sd-step-list">
                  <li>deployment</li>
                  <li>runbooks</li>
                  <li>handoff</li>
                  <li>SLAs</li>
                </ul>
              </div>

            </div>

            {/* ⭐ EXACT INTERSECTING GEOMETRIC WAVE MESH GRAPHIC (Matching Screenshots 1 & 2) */}
            <div className="sd-wave-graphic">
              <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="sd-wave-svg">
                <defs>
                  <linearGradient id="waveLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="40%" stopColor="#34d399" />
                    <stop offset="70%" stopColor="#e8c477" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="waveFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.25)" />
                    <stop offset="50%" stopColor="rgba(52, 211, 153, 0.2)" />
                    <stop offset="100%" stopColor="rgba(232, 196, 119, 0.25)" />
                  </linearGradient>
                </defs>

                {/* Translucent Base Wave Glow */}
                <path d="M0,80 Q200,40 400,70 T800,50 T1200,80 L1200,160 L0,160 Z" fill="url(#waveFillGrad)" opacity="0.4" />

                {/* Intersecting Low Dip Line */}
                <path d="M0,90 C150,110 350,60 600,100 C850,140 1050,70 1200,90" fill="none" stroke="url(#waveLineGrad)" strokeWidth="2.5" opacity="0.9" />

                {/* High Geometric Peak Line (Matches Screenshot 1 Peak!) */}
                <path d="M0,75 C200,50 400,90 620,25 C820,80 1020,40 1200,70" fill="none" stroke="url(#waveLineGrad)" strokeWidth="3" />

                {/* Top Gold Accent Line Filament */}
                <path d="M0,60 C250,85 480,35 680,65 C880,95 1080,45 1200,55" fill="none" stroke="#e8c477" strokeWidth="1.5" opacity="0.75" />
              </svg>
            </div>

          </div>
        </section>

        {/* SECTION 4 — Footer (Full-width Black #0A0A0A) */}
        <footer className="black-footer-section scroll-reveal">
          <div className="footer-inner-container">
            
            {/* Top 4-Column Layout */}
            <div className="footer-top-grid">
              
              {/* Column 1: Innoveity Logo + Join our news */}
              <div className="footer-col-1">
                <h3 className="cico-footer-brand">INNOVEITY</h3>
                <div className="join-news-box">
                  <h4 className="gold-label">Join our newsletter</h4>
                  <form onSubmit={handleNewsletterSubmit} className="cico-news-form">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                    <button type="submit" className="cico-news-btn">Subscribe</button>
                  </form>
                </div>
              </div>

              {/* Column 2: Pages */}
              <div className="footer-col">
                <h4 className="gold-label">Pages</h4>
                <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div className="footer-col">
                <h4 className="gold-label">Company</h4>
                <ul className="footer-links">
                  <li><Link to="/about">Our Team</Link></li>
                  <li><Link to="/services">Careers</Link></li>
                  <li><Link to="/contact">Privacy Policy</Link></li>
                  <li><Link to="/contact">Terms of Service</Link></li>
                </ul>
              </div>

              {/* Column 4: Contact & Location */}
              <div className="footer-col">
                <h4 className="gold-label">Get in Touch</h4>
                <p className="footer-contact-text">
                  contact@innoveitytech.com<br />
                  +1 (555) 234-5678<br />
                  Innovation Hub, Tech City
                </p>
              </div>

            </div>

            {/* Bottom Copyright Row */}
            <div className="footer-bottom-row">
              <p>&copy; {new Date().getFullYear()} Innoveity Tech Solution. All rights reserved.</p>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
};

export default AboutPage;
