import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';
import './ProjectsShowcase.css';

const defaultProjectsList = [
  {
    id: 'space-room',
    tag: 'Architecture & Cloud',
    title: 'Space to Room',
    subtitle: 'Building Scalable Digital Workspaces',
    description: 'High-performance cloud infrastructure & structural analytics for enterprise real estate and urban development.',
    image: '/tech_blog_featured.png',
    tech: ['AWS', 'React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'ai-advisor',
    tag: 'AI & Analytics',
    title: 'AI Financial Advisor',
    subtitle: 'Personalized Intelligence Engine',
    description: 'Real-time predictive machine learning models and intuitive wealth management dashboards.',
    image: '/tech_blog_2.png',
    tech: ['Python', 'TensorFlow', 'React Native', 'Redis']
  },
  {
    id: 'eclipse-studio',
    tag: 'Web Engineering',
    title: 'Eclipse Studio',
    subtitle: 'Creative Brand & Digital Experience',
    description: 'We believe digital design is about freezing emotions, energy, and atmosphere into seamless user interfaces.',
    image: '/tech_blog_1.png',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'WebGL']
  },
  {
    id: 'telehealth',
    tag: 'Mobile Platform',
    title: 'TeleHealth Care',
    subtitle: 'HIPAA-Compliant Medical Suite',
    description: 'Connecting patients with medical specialists via sub-50ms HD video streaming and instant prescribing.',
    image: '/tech_blog_3.png',
    tech: ['React Native', 'WebRTC', 'GraphQL', 'Docker']
  },
  {
    id: 'altrix-fleet',
    tag: 'IoT Telematics',
    title: 'Altrix Logistics',
    subtitle: 'Smart Fleet Operations',
    description: 'Real-time telematics tracking and automated route optimization processing 1M+ sensor data points per minute.',
    image: '/hero-bg.png',
    tech: ['Go', 'Kafka', 'MongoDB', 'Vue.js']
  }
];

const ProjectsShowcase = () => {
  const cms = useCMS() || {};
  const showcaseProjects = (cms.showcaseProjects && cms.showcaseProjects.length > 0) ? cms.showcaseProjects : defaultProjectsList;
  const showcaseHeader = cms.showcaseHeader || {
    badge: 'OUR PROJECTS',
    titleLine1: 'We Help Brands',
    titleHighlight: 'Win in the Digital Space',
    subtitle: 'An engineering solution agency building strategy-driven systems, high-impact web applications, and enterprise digital platforms that stand out.',
    ctaText: 'View Our Work'
  };

  const [activeIndex, setActiveIndex] = useState(2); // Center active card
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const totalCards = showcaseProjects.length;

  // ⭐ Continuous Auto-Rotate Loop (1.6s per rotation step)
  useEffect(() => {
    if (isPaused || totalCards === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 1600);

    return () => clearInterval(timer);
  }, [isPaused, totalCards]);

  const handleCardClick = (idx) => {
    setActiveIndex(idx);
    setIsPaused(true);
  };

  return (
    <section className="projects-showcase-section">
      <div className="section-grid-pattern"></div>
      <div className="projects-showcase-container">
        
        {/* 2-Column Split Header Section: Left (OUR PROJECTS + Title) | Right (Description + CTA) */}
        <div className="showcase-header-row">
          {/* Left Column */}
          <div className="showcase-header-left">
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '12px' }}>
              <h2 className="section-main-title">
                OUR <span className="title-gradient-accent">PROJECTS</span>
              </h2>
            </div>

            <h2 className="showcase-main-title">
              {showcaseHeader.titleLine1 || 'We Help Brands'} <br />
              <span className="title-highlight">{showcaseHeader.titleHighlight || 'Win In The Digital Space'}</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="showcase-header-right">
            <p className="showcase-subtitle">
              {showcaseHeader.subtitle}
            </p>
          </div>
        </div>

        {/* ⭐ 5 CARDS SHOWCASE: 3 IN FRONT, 2 BEHIND */}
        <div 
          className="showcase-fan-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Radial Ambient Glow Aura */}
          <div className="showcase-ambient-aura"></div>

          {/* 3D Arc Track */}
          <div className="showcase-cards-arc">
            {showcaseProjects.map((project, idx) => {
              // Calculate shortest circular offset (-2, -1, 0, 1, 2)
              let offset = idx - activeIndex;
              if (offset > 2) offset -= totalCards;
              if (offset < -2) offset += totalCards;

              // 3 Front Display Cards vs 2 Behind Cards layout settings:
              let xPx = 0;
              let yPx = 0;
              let rotateY = 0;
              let scale = 1;
              let zIndex = 1;
              let opacity = 1;
              let isCenter = false;

              if (offset === 0) {
                // CENTER FRONT CARD
                xPx = 0;
                yPx = -20;
                rotateY = 0;
                scale = 1.08;
                zIndex = 50;
                opacity = 1;
                isCenter = true;
              } else if (offset === -1) {
                // LEFT 1 FRONT CARD
                xPx = -230;
                yPx = 0;
                rotateY = 16;
                scale = 0.88;
                zIndex = 30;
                opacity = 0.95;
              } else if (offset === 1) {
                // RIGHT 1 FRONT CARD
                xPx = 230;
                yPx = 0;
                rotateY = -16;
                scale = 0.88;
                zIndex = 30;
                opacity = 0.95;
              } else if (offset === -2) {
                // BACK LEFT 2 CARD (BEHIND)
                xPx = -410;
                yPx = 22;
                rotateY = 28;
                scale = 0.70;
                zIndex = 10;
                opacity = 0.45;
              } else if (offset === 2) {
                // BACK RIGHT 2 CARD (BEHIND)
                xPx = 410;
                yPx = 22;
                rotateY = -28;
                scale = 0.70;
                zIndex = 10;
                opacity = 0.45;
              }

              const techPills = Array.isArray(project.tech)
                ? project.tech
                : typeof project.tech === 'string'
                  ? project.tech.split(',').map(t => t.trim()).filter(Boolean)
                  : [];

              return (
                <motion.div
                  key={project.id || idx}
                  className={`showcase-fan-card ${isCenter ? 'is-active-center' : ''}`}
                  onClick={() => handleCardClick(idx)}
                  animate={{
                    x: `${xPx}px`,
                    y: yPx,
                    rotateY: rotateY,
                    scale: scale,
                    zIndex: zIndex,
                    opacity: opacity
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 22
                  }}
                >
                  {/* Card Image Container */}
                  <div className="card-mockup-frame">
                    <img 
                      src={project.image || '/tech_blog_1.png'} 
                      alt={project.title} 
                      className="card-mockup-img" 
                    />
                    <div className="card-overlay-tint"></div>
                    <span className="card-tag-badge">{project.tag}</span>
                  </div>

                  {/* Card Information Footer */}
                  <div className="card-mockup-info">
                    <h3 className="card-mockup-title">{project.title}</h3>
                    <p className="card-mockup-sub">{project.subtitle}</p>
                    <p className="card-mockup-desc">{project.description}</p>
                    
                    <div className="card-tech-pills">
                      {techPills.map((t, i) => (
                        <span key={i} className="tech-pill-item">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectsShowcase;
