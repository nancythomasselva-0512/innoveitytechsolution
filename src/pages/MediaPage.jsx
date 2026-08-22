import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiShare2, 
  FiPenTool, 
  FiFilm, 
  FiLayout, 
  FiVideo, 
  FiCamera, 
  FiTrendingUp, 
  FiSearch, 
  FiCheckCircle, 
  FiArrowRight, 
  FiZap, 
  FiCompass, 
  FiSliders, 
  FiPlayCircle, 
  FiTarget, 
  FiStar,
  FiAward,
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi';
import LetterReveal from '../components/LetterReveal/LetterReveal';
import { useCMS } from '../context/CMSContext';
import './MediaPage.css';

const useScrollObserver = () => {
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
    const elements = document.querySelectorAll('.animate-on-scroll, .media-service-card, .cap-ui-card, .why-media-card, .built-for-chip');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

const MediaPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeDeckIndex, setActiveDeckIndex] = useState(2);
  const [isDeckPaused, setIsDeckPaused] = useState(false);
  const [isCapPaused, setIsCapPaused] = useState(false);
  const capabilitiesTrackRef = useRef(null);

  // 3D Curved Deck Cards (Seamlessly Overlapping - Zero Gaps)
  const deckCards = [
    {
      id: 'mmac-arch',
      title: 'MMAC Studio',
      subtitle: 'BRAND ARCHITECTURE',
      tag: 'Visual Identity',
      image: '/deck_arch_gold.png'
    },
    {
      id: 'lifestyle-pour',
      title: 'Pour, Breathe, Begin',
      subtitle: 'REELS & SHORT FORM',
      tag: 'Social Media',
      image: '/deck_lifestyle.png'
    },
    {
      id: 'muyal-chair',
      title: 'Muyal Heritage',
      subtitle: 'CONCEPT FILMS',
      tag: 'Commercial Shoot',
      image: '/deck_green_chair.png'
    },
    {
      id: 'cinematic-urban',
      title: 'Cinematic Urban',
      subtitle: 'BRAND CAMPAIGN',
      tag: 'Video Production',
      image: '/deck_fashion.png'
    },
    {
      id: 'coffee-craft',
      title: 'Coffee & Craft',
      subtitle: 'PRODUCT CINEMATOGRAPHY',
      tag: 'High-End Studio',
      image: '/deck_product.png'
    },
    {
      id: 'editorial-design',
      title: 'Editorial Craft',
      subtitle: 'BRAND DESIGN',
      tag: 'Creative Studio',
      image: '/deck_design.png'
    },
    {
      id: 'digital-growth',
      title: 'Digital Scale',
      subtitle: 'PERFORMANCE MEDIA',
      tag: 'Growth Marketing',
      image: '/deck_growth.png'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth continuous auto-rotation for 3D deck carousel animation (Left to Right)
  useEffect(() => {
    if (isDeckPaused) return;
    const interval = setInterval(() => {
      setActiveDeckIndex((prev) => (prev - 1 + deckCards.length) % deckCards.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isDeckPaused, deckCards.length]);

  // Smooth continuous auto-scroll for Production Capabilities cards carousel
  useEffect(() => {
    if (isCapPaused) return;
    const interval = setInterval(() => {
      if (capabilitiesTrackRef.current) {
        const track = capabilitiesTrackRef.current;
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScrollLeft - 15) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 3200);
    return () => clearInterval(interval);
  }, [isCapPaused]);

  useScrollObserver();

  const handleCapArrowClick = (direction) => {
    if (capabilitiesTrackRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      capabilitiesTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleDeckNext = () => {
    setActiveDeckIndex((prev) => (prev + 1) % deckCards.length);
  };

  const handleDeckPrev = () => {
    setActiveDeckIndex((prev) => (prev - 1 + deckCards.length) % deckCards.length);
  };

  const services = [
    {
      num: '01',
      title: 'Social Media Management',
      desc: 'Strategic management of your social media presence with consistent, engaging and brand-focused content.',
      icon: <FiShare2 />,
      tag: 'Brand Growth'
    },
    {
      num: '02',
      title: 'Content Creation',
      desc: 'Creative content designed around your brand, audience and business objectives.',
      icon: <FiPenTool />,
      tag: 'Creative Craft'
    },
    {
      num: '03',
      title: 'Reels & Short-Form Videos',
      desc: 'High-quality reels and short-form videos built for attention, engagement and reach.',
      icon: <FiFilm />,
      tag: 'Viral Reach'
    },
    {
      num: '04',
      title: 'Creative Design',
      desc: 'Premium visual creatives for campaigns, promotions, announcements and digital platforms.',
      icon: <FiLayout />,
      tag: 'Visual Identity'
    },
    {
      num: '05',
      title: 'Video Production',
      desc: 'Professional video production for brands, products, events, campaigns and corporate communication.',
      icon: <FiVideo />,
      tag: 'Cinematic Excellence'
    },
    {
      num: '06',
      title: 'Photography',
      desc: 'Product, corporate, event and promotional photography with a focus on strong visual storytelling.',
      icon: <FiCamera />,
      tag: 'Storytelling'
    },
    {
      num: '07',
      title: 'Performance Marketing',
      desc: 'Targeted digital advertising designed to reach the right audience and support measurable business growth.',
      icon: <FiTrendingUp />,
      tag: 'Data Driven'
    },
    {
      num: '08',
      title: 'SEO',
      desc: "Search engine optimization customized according to each client's business, industry, competition and objectives.",
      icon: <FiSearch />,
      tag: 'Organic Growth'
    }
  ];

  // 5 Production Capabilities with embedded animated video previews (matching reference UI style)
  // 5 Production Capabilities with embedded animated video previews (matching reference UI style)
  const productionCapabilities = [
    {
      id: 'camera-prod',
      title: 'PROFESSIONAL CAMERA PRODUCTION',
      quote: 'High-quality visual production using professional camera systems and production equipment.',
      badge: '★ 4.9/5 • 8K RED & ARRI Cinema Systems',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cameraman-setting-up-a-camera-42861-large.mp4',
      poster: '/cap_camera_prod.png',
      icon: <FiCamera />,
      specs: ['Cinema-Grade 8K RED & ARRI Systems', 'Studio & Multi-Angle Lighting', 'Professional Sound Rigs']
    },
    {
      id: 'cinematic-vid',
      title: 'CINEMATIC VIDEO',
      quote: 'From brand films to promotional content, we create visually engaging stories built around your message.',
      badge: '★ 5.0/5 • Anamorphic Commercial Films',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-filmmaker-with-a-camera-on-a-tripod-42862-large.mp4',
      poster: '/cap_cinematic_vid.png',
      icon: <FiFilm />,
      specs: ['Brand Documentaries', 'Promotional Commercials', 'Narrative Storytelling']
    },
    {
      id: 'gimbal-motion',
      title: 'GIMBAL & MOTION',
      quote: 'Smooth, dynamic camera movements for reels, advertisements, events and cinematic brand content.',
      badge: '★ 4.9/5 • 3-Axis Stabilized Motion',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cameraman-filming-an-actor-with-a-stabilizer-42864-large.mp4',
      poster: '/cap_gimbal_motion.png',
      icon: <FiPlayCircle />,
      specs: ['3-Axis Motorized Stabilization', 'Dynamic Tracking Shots', 'Action & Event Coverage']
    },
    {
      id: 'aerial-content',
      title: 'AERIAL CONTENT',
      quote: 'Drone-based visuals for locations, events, real estate, institutions, hospitality and brand campaigns.',
      badge: '★ 5.0/5 • 4K Drone Cinematography',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-sunset-41584-large.mp4',
      poster: '/cap_aerial_drone.png',
      icon: <FiCompass />,
      specs: ['4K Drone Cinematography', 'Licensed Aerial Operators', 'Architectural & Landscape']
    },
    {
      id: 'post-production',
      title: 'POST-PRODUCTION',
      quote: 'Professional editing, colour correction, sound design, motion graphics and final delivery optimized for each platform.',
      badge: '★ 4.9/5 • Color Grading & Motion FX',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-video-editing-software-timeline-43343-large.mp4',
      poster: '/cap_post_production.png',
      icon: <FiSliders />,
      specs: ['DaVinci Resolve Color Grading', '2D/3D Motion FX', 'Spatial Audio Mastering']
    }
  ];

  const workflowSteps = [
    { name: 'IDEA', subtitle: 'Concept & Vision', desc: 'Brainstorming creative angles and defining the core message that aligns with your brand personality.' },
    { name: 'STRATEGY', subtitle: 'Audience & Target', desc: 'Mapping out distribution channels, campaign targets, tone of voice, and platform specifics.' },
    { name: 'PRODUCTION', subtitle: 'Shoot & Record', desc: 'Executing high-end camera production with professional crew, lighting, sound, and direction.' },
    { name: 'EDITING', subtitle: 'Post-Production', desc: 'Assembly, color grading, VFX, motion graphics, and audio mastering tuned to perfection.' },
    { name: 'PUBLISHING', subtitle: 'Launch & Distribute', desc: 'Optimized formatting and strategic schedule delivery across primary digital and social channels.' },
    { name: 'PERFORMANCE', subtitle: 'Analyze & Scale', desc: 'Tracking engagement metrics, viewer retention, conversions, and optimizing for maximum ROI.' }
  ];

  const whyChooseUs = [
    {
      title: 'Creative First',
      desc: 'Ideas that make your brand stand out.',
      icon: <FiStar />
    },
    {
      title: 'Quality Driven',
      desc: 'Professional production and attention to detail.',
      icon: <FiAward />
    },
    {
      title: 'Strategy Led',
      desc: 'Every piece of content has a purpose.',
      icon: <FiTarget />
    },
    {
      title: 'Performance Focused',
      desc: 'We create content with business results in mind.',
      icon: <FiActivity />
    },
    {
      title: 'End-to-End Execution',
      desc: 'From concept and production to publishing and optimization.',
      icon: <FiZap />
    }
  ];

  const cms = useCMS ? useCMS() : null;
  const mediaCMS = cms?.mediaContent || {};

  const heroBadge = mediaCMS.hero?.badge || 'INNOVEITY MEDIA';
  const heroSubBadge = mediaCMS.hero?.subBadge || 'Creative. Strategic. Data-Driven.';
  const heroTitle = mediaCMS.hero?.title || 'MEDIA DIVISION';
  const heroTagline1 = mediaCMS.hero?.tagline1 || 'Creative Stories.';
  const heroTagline2 = mediaCMS.hero?.tagline2 || 'Powerful Visuals.';
  const heroTagline3 = mediaCMS.hero?.tagline3 || 'Digital Growth.';
  const heroDesc = mediaCMS.hero?.description || 'Our Media Division brings together creative production, digital content, social media and performance-driven marketing to help brands build a stronger presence in the digital world. From an idea to the final frame, we create content that looks premium, communicates clearly and delivers purpose.';
  const heroBgImage = mediaCMS.hero?.bgImage || '/media_hero_bg.png';

  const deckCardsList = mediaCMS.deckCards && mediaCMS.deckCards.length > 0
    ? mediaCMS.deckCards
    : deckCards;

  const servicesList = mediaCMS.services && mediaCMS.services.length > 0
    ? mediaCMS.services.map((s, idx) => ({ ...s, icon: services[idx]?.icon || <FiShare2 /> }))
    : services;

  const capabilitiesList = mediaCMS.capabilities && mediaCMS.capabilities.length > 0
    ? mediaCMS.capabilities.map((c, idx) => ({ ...c, icon: productionCapabilities[idx]?.icon || <FiCamera />, specs: productionCapabilities[idx]?.specs || [] }))
    : productionCapabilities;

  const whyChooseUsList = mediaCMS.whyChooseUs && mediaCMS.whyChooseUs.length > 0
    ? mediaCMS.whyChooseUs.map((w, idx) => ({ ...w, icon: whyChooseUs[idx]?.icon || <FiStar /> }))
    : whyChooseUs;

  const audienceTypesList = mediaCMS.audienceTypes || audienceTypes;

  const ctaBrandTag = mediaCMS.cta?.brandTag || 'INNOVEITY MEDIA';
  const ctaHeading = mediaCMS.cta?.heading || "LET'S CREATE SOMETHING THAT MOVES";
  const ctaSub1 = mediaCMS.cta?.subheadingLine1 || 'Your brand has a story.';
  const ctaSub2 = mediaCMS.cta?.subheadingLine2 || "Let's tell it better.";
  const ctaBadges = mediaCMS.cta?.badges || 'Creative • Strategic • Data-Driven';
  const ctaBtnText = mediaCMS.cta?.btnText || 'START YOUR MEDIA PROJECT';

  return (
    <div className="media-page">
      
      {/* Hero Section */}
      <section className="mp-hero animate-on-scroll">
        <div
          className="mp-hero-bg-overlay"
          style={heroBgImage ? { backgroundImage: `url(${heroBgImage})` } : {}}
        ></div>
        <div className="container mp-hero-container">
          
          <div className="mp-brand-pill">
            <span className="mp-pill-dot"></span>
            <span>{heroBadge}</span>
            <span className="mp-pill-sub">• {heroSubBadge}</span>
          </div>

          <h1 className="mp-hero-title">
            {heroTitle}
          </h1>

          <div className="mp-hero-tagline">
            <span>{heroTagline1}</span> <span>{heroTagline2}</span> <span>{heroTagline3}</span>
          </div>

          <motion.p
            className="mp-hero-reveal-text"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.02 } },
              hidden: {}
            }}
          >
            {heroDesc.split(' ').map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em', whiteSpace: 'nowrap' }}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <div className="mp-hero-actions">
            <a href="#services" className="btn-mp-primary">
              <span>EXPLORE SERVICES</span>
              <FiArrowRight />
            </a>
            <Link to="/contact" className="btn-mp-secondary">
              <span>GET IN TOUCH</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Media Services Section */}
      <section id="services" className="mp-section mp-services-section">
        <div className="container">
          
          <div className="mp-section-header animate-on-scroll">
            <span className="mp-section-kicker">WHAT WE OFFER</span>
            <h2 className="mp-section-title">
              OUR MEDIA <span className="mp-gradient-text">SERVICES</span>
            </h2>
            <p className="mp-section-desc">
              Comprehensive creative and performance solutions tailored to amplify your brand's digital voice.
            </p>
          </div>

          <div className="mp-services-grid">
            {servicesList.map((srv, idx) => (
              <div className="media-service-card" key={idx} style={{ '--card-idx': idx }}>
                <div className="mp-card-top">
                  <span className="mp-service-num">{srv.num}</span>
                  <span className="mp-service-tag">{srv.tag}</span>
                </div>

                <div className="mp-service-icon-box">
                  {srv.icon}
                </div>

                <h3 className="mp-service-title">{srv.title}</h3>
                <p className="mp-service-desc">{srv.desc}</p>

                <div className="mp-card-footer">
                  <Link to="/contact" className="mp-service-link">
                    <span>Discuss Project</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================================
         3D FAN-OUT CARDS DECK SHOWCASE SECTION (MATCHING USER REFERENCE IMAGE)
         ========================================================================== */}
      <section className="mp-section mp-deck-section">
        <div className="mp-deck-full-container">
          
          <div className="mp-section-header animate-on-scroll">
            <span className="mp-section-kicker">EDITORIAL & CAMPAIGNS SHOWCASE</span>
            <h2 className="mp-section-title">
              CREATIVE STORIES <span className="mp-gradient-text">IN MOTION</span>
            </h2>
            <p className="mp-section-desc">
              Click or hover any 3D editorial card deck to explore brand stories, lifestyle reels, and commercial campaigns.
            </p>
          </div>

          {/* 3D FAN DECK CONTAINER */}
          <div 
            className="mp-3d-deck-wrapper"
            onMouseEnter={() => setIsDeckPaused(true)}
            onMouseLeave={() => setIsDeckPaused(false)}
          >
            <div className="mp-3d-deck-container">
              {deckCardsList.map((card, idx) => {
                const total = deckCardsList.length;
                let diff = idx - activeDeckIndex;
                // Circular wrap calculation for smooth infinite full page left-to-right flow
                while (diff > total / 2) diff -= total;
                while (diff < -total / 2) diff += total;

                const isActive = diff === 0;
                
                // Calculate 3D transforms for tightly overlapping card deck (Zero Gaps)
                const translateX = diff * 210; // 210px offset creates seamless 90px card overlap (zero gaps)
                const rotateY = diff * -16; // 3D Y rotation
                const rotateZ = diff * 5.5; // curved arc Z rotation
                const translateZ = -Math.abs(diff) * 80; // depth offset
                const scale = 1 - Math.abs(diff) * 0.07; // scale reduction for side cards
                const opacity = 1 - Math.abs(diff) * 0.12; // fading for outer cards
                const zIndex = 10 - Math.abs(diff);

                return (
                  <div
                    key={card.id || idx}
                    className={`mp-3d-card ${isActive ? 'is-focused' : ''}`}
                    onClick={() => setActiveDeckIndex(idx)}
                    style={{
                      transform: `perspective(1400px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                  >
                    <div className="mp-3d-card-inner">
                      <img src={card.image} alt={card.title} className="mp-3d-card-img" />
                      <div className="mp-3d-card-overlay">
                        <span className="mp-3d-card-tag">{card.tag}</span>
                        <h3 className="mp-3d-card-title">{card.title}</h3>
                        <p className="mp-3d-card-sub">{card.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DECK NAVIGATION CONTROLS */}
            <div className="mp-deck-controls">
              <button className="deck-nav-btn" onClick={handleDeckPrev} aria-label="Previous card">
                <FiChevronLeft size={22} />
              </button>
              <div className="deck-dots">
                {deckCardsList.map((_, i) => (
                  <span
                    key={i}
                    className={`deck-dot ${i === activeDeckIndex ? 'active' : ''}`}
                    onClick={() => setActiveDeckIndex(i)}
                  />
                ))}
              </div>
              <button className="deck-nav-btn" onClick={handleDeckNext} aria-label="Next card">
                <FiChevronRight size={22} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Concept to Content Journey / Workflow Section */}
      <section className="mp-section mp-workflow-section">
        <div className="container">
          
          <div className="mp-section-header animate-on-scroll">
            <span className="mp-section-kicker">SEAMLESS PROCESS</span>
            <h2 className="mp-section-title">
              FROM CONCEPT <span className="mp-gradient-text">TO CONTENT</span>
            </h2>
            <p className="mp-section-desc">
              We handle the complete content journey so your brand can focus on what it does best.
            </p>
          </div>

          {/* Interactive Pipeline Steps Bar */}
          <div className="mp-pipeline-bar">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                className={`pipeline-node ${activeStep === idx ? 'is-active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="node-num">0{idx + 1}</div>
                <div className="node-name">{step.name}</div>
                {idx < workflowSteps.length - 1 && <div className="node-connector"></div>}
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mp-workflow-card"
          >
            <div className="wf-card-header">
              <span className="wf-step-index">STEP 0{activeStep + 1}</span>
              <span className="wf-arrow-tag">
                {workflowSteps[activeStep].name}
              </span>
            </div>
            <h3 className="wf-card-title">{workflowSteps[activeStep].name}: {workflowSteps[activeStep].subtitle}</h3>
            <p className="wf-card-desc">{workflowSteps[activeStep].desc}</p>

            <div className="wf-journey-path">
              {workflowSteps.map((s, i) => (
                <span key={i} className={`journey-tag ${i === activeStep ? 'current' : ''}`}>
                  {s.name} {i < workflowSteps.length - 1 ? '→' : ''}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ==========================================================================
         PRODUCTION CAPABILITIES SHOWCASE SECTION (PLACED AFTER CONCEPT TO CONTENT)
         ========================================================================== */}
      <section className="mp-section mp-cap-ui-section">
        <div className="mp-cap-bg-watermark">✦</div>
        
        <div className="container mp-cap-ui-container">
          
          {/* LEFT SIDE HEADER & CONTROLS */}
          <div className="mp-cap-left-col">
            
            <div className="mp-cap-kicker-badge">
              <span className="kicker-dot"></span>
              <span>OUR PRODUCTION CAPABILITIES</span>
            </div>

            <h2 className="mp-cap-serif-title">
              What Our Production<br />
              <span className="mp-cap-serif-highlight">Capabilities</span> Deliver <span className="title-sparkle">✦</span>
            </h2>

            <p className="mp-cap-left-desc">
              High-end visual production using professional 8K cinema camera systems, 3-axis motion stabilizers, licensed aerial drones, and state-of-the-art post-production suites.
            </p>

            {/* LEFT / RIGHT CAROUSEL ARROWS */}
            <div className="mp-cap-nav-arrows">
              <button 
                className="cap-arrow-btn" 
                onClick={() => handleCapArrowClick('left')}
                aria-label="Previous capability"
              >
                <FiChevronLeft size={20} />
              </button>

              <button 
                className="cap-arrow-btn" 
                onClick={() => handleCapArrowClick('right')}
                aria-label="Next capability"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

          </div>

          {/* RIGHT SIDE CAROUSEL OF CREAM/OFF-WHITE CAPABILITY CARDS */}
          <div 
            className="mp-cap-right-col"
            onMouseEnter={() => setIsCapPaused(true)}
            onMouseLeave={() => setIsCapPaused(false)}
          >
            <div className="mp-cap-track" ref={capabilitiesTrackRef}>
              
              {capabilitiesList.map((cap, idx) => (
                <div className="cap-ui-card" key={cap.id}>
                  
                  {/* QUOTE ICON */}
                  <div className="cap-card-quote-mark">“</div>

                  {/* QUOTE / DESCRIPTION */}
                  <p className="cap-card-quote-text">
                    {cap.quote}
                  </p>

                  {/* TITLE & RATING BADGE */}
                  <div className="cap-card-header">
                    <div className="cap-card-icon-badge">{cap.icon}</div>
                    <div className="cap-card-title-box">
                      <h3 className="cap-card-title">{cap.title}</h3>
                      <span className="cap-card-rating">{cap.badge}</span>
                    </div>
                  </div>

                  {/* ANIMATED VIDEO FRAME */}
                  <div 
                    className="cap-card-video-frame"
                    onClick={() => setActiveVideoModal(cap)}
                  >
                    <video
                      src={cap.videoUrl}
                      poster={cap.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="cap-card-video"
                    />

                    {/* OVERLAY & PLAY BADGE */}
                    <div className="cap-video-overlay">
                      <div className="cap-play-pill">
                        <FiPlayCircle className="play-icon" />
                        <span>PREVIEW VIDEO</span>
                      </div>
                    </div>
                  </div>

                  {/* SPECS LIST */}
                  <div className="cap-card-specs">
                    {cap.specs && cap.specs.map((spec, i) => (
                      <span key={i} className="spec-tag">✓ {spec}</span>
                    ))}
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* FULLSCREEN VIDEO MODAL POPUP */}
      {activeVideoModal && (
        <div className="cap-video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="cap-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cap-modal-header">
              <h3>{activeVideoModal.title}</h3>
              <button className="cap-modal-close" onClick={() => setActiveVideoModal(null)}>
                <FiX size={22} />
              </button>
            </div>

            <div className="cap-modal-player-box">
              <video
                src={activeVideoModal.videoUrl}
                poster={activeVideoModal.poster}
                autoPlay
                controls
                playsInline
                className="cap-modal-video"
              />
            </div>
            <p className="cap-modal-desc">{activeVideoModal.quote}</p>
          </div>
        </div>
      )}

      {/* Why Innoveity Media */}
      <section className="mp-section mp-why-section">
        <div className="container">
          
          <div className="mp-section-header animate-on-scroll">
            <span className="mp-section-kicker">OUR EDGE</span>
            <h2 className="mp-section-title">
              WHY INNOVEITY <span className="mp-gradient-text">MEDIA?</span>
            </h2>
            <p className="mp-section-desc">
              Strategic direction coupled with cinema-grade execution to make your content impactful.
            </p>
          </div>

          <div className="mp-why-grid">
            {whyChooseUsList.map((item, idx) => (
              <div className="why-media-card" key={idx}>
                <div className="why-icon-box">
                  {item.icon}
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Built For Section */}
      <section className="mp-section mp-built-for-section">
        <div className="container">
          
          <div className="mp-section-header animate-on-scroll">
            <span className="mp-section-kicker">TAILORED SOLUTIONS</span>
            <h2 className="mp-section-title">
              BUILT FOR <span className="mp-gradient-text">YOUR AUDIENCE</span>
            </h2>
            <p className="mp-section-desc">
              Whether you are launching a brand, promoting a product, covering an event or building your digital presence, our Media Division creates content designed for your audience.
            </p>
          </div>

          <div className="mp-built-grid">
            {audienceTypesList.map((aud, idx) => (
              <div className="built-for-chip" key={idx}>
                <span className="chip-bullet">•</span>
                <span className="chip-label">{aud}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="mp-section mp-cta-section">
        <div className="container">
          <div className="mp-cta-card">
            
            <div className="cta-brand-tag">
              <span className="cta-glow-dot"></span>
              <span>{ctaBrandTag}</span>
            </div>

            <h2 className="cta-heading">
              {ctaHeading}
            </h2>

            <p className="cta-subheading">
              {ctaSub1}<br />
              <strong>{ctaSub2}</strong>
            </p>

            <div className="cta-badges">
              <span>{ctaBadges}</span>
            </div>

            <div className="cta-actions">
              <Link to="/contact" className="btn-mp-cta-primary">
                <span>{ctaBtnText}</span>
                <FiArrowRight />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default MediaPage;
