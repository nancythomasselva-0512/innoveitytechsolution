import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiCpu, FiCode, FiBookOpen, FiShield, FiTruck, 
  FiPackage, FiSmartphone, FiWifi, FiZap,
  FiCheckCircle, FiArrowRight, FiChevronLeft, FiChevronRight,
  FiMic, FiGlobe, FiTrendingUp, FiUsers, FiUser, FiAward,
  FiMessageSquare, FiDatabase,
  FiLayers, FiBarChart2,
  FiBriefcase, FiCheckSquare, FiMonitor, FiGrid, FiNavigation, FiMapPin,
  FiLock
} from 'react-icons/fi';
import DynamicPageSections from '../components/UI/DynamicPageSections';
import './ServicesPage.css';

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
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll('.animate-on-scroll, .timeline-step, .feature-box, .sp-card, .sp-cta');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

const ServicesPage = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeTrackRef = useRef(null);

  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const cleanServiceId = hashId.replace('service-card-', '');
      setActiveCardId(cleanServiceId);
      setIsPaused(true);
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (marqueeTrackRef.current) {
            const track = marqueeTrackRef.current;
            const cardLeft = el.offsetLeft;
            const trackWidth = track.clientWidth;
            const cardWidth = el.clientWidth;
            track.scrollTo({
              left: cardLeft - (trackWidth / 2) + (cardWidth / 2),
              behavior: 'smooth'
            });
          }
        }
      }, 350);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  
  useScrollObserver();

  const services = [
    {
      id: 'ai-intelligent-solutions',
      number: '01',
      shortName: 'AI & Intelligent',
      tag: '01 • Artificial Intelligence',
      title: 'AI & Intelligent Solutions',
      desc: 'AI-powered platforms, voice AI, multilingual intelligence, analytics, automation and AI agents.',
      icon: <FiCpu />,
      benefits: [
        'AI-Powered Platforms & Custom LLM Models',
        'Voice AI & Conversational Agents',
        'Multilingual Intelligence & Analytics',
        'Intelligent Workflow Automation & AI Agents'
      ]
    },
    {
      id: 'enterprise-software',
      number: '02',
      shortName: 'Enterprise Software',
      tag: '02 • Enterprise Systems',
      title: 'Enterprise Software',
      desc: 'ERP, CRM, MIS, HR platforms, workflow automation and custom enterprise systems.',
      icon: <FiCode />,
      benefits: [
        'Custom ERP, CRM & MIS Solutions',
        'HR Management & Employee Portals',
        'Complex Workflow Automation Systems',
        'High-Security Enterprise Architectures'
      ]
    },
    {
      id: 'education-technology',
      number: '03',
      shortName: 'EdTech',
      tag: '03 • Education Technology',
      title: 'Education Technology',
      desc: 'Student platforms, LMS, assessment systems, placement solutions and institutional portals.',
      icon: <FiBookOpen />,
      benefits: [
        'Interactive Student Portals & Mobile Apps',
        'Learning Management Systems (LMS)',
        'Automated Assessment & Examination Tools',
        'Placement Portals & Institutional ERP'
      ]
    },
    {
      id: 'digital-governance',
      number: '04',
      shortName: 'Digital Governance',
      tag: '04 • Public Sector Tech',
      title: 'Digital Governance',
      desc: 'Citizen engagement, governance platforms, dashboards and administrative systems.',
      icon: <FiShield />,
      benefits: [
        'Citizen Engagement Portals & Mobile Apps',
        'Administrative Management Systems',
        'Real-Time Analytics & Reporting Dashboards',
        'Secure Data Handling & Compliance Standards'
      ]
    },
    {
      id: 'smart-mobility',
      number: '05',
      shortName: 'Smart Mobility',
      tag: '05 • Transit & Mobility',
      title: 'Smart Mobility',
      desc: 'Contactless ticketing, QR ticketing, traffic intelligence and mobility applications.',
      icon: <FiTruck />,
      benefits: [
        'Contactless & QR-Based Ticketing Systems',
        'Real-Time Fleet & Traffic Intelligence',
        'Commuter Mobile Apps & Wayfinding',
        'Scalable High-Throughput Transit Gateways'
      ]
    },
    {
      id: 'logistics-tracking',
      number: '06',
      shortName: 'Logistics & Tracking',
      tag: '06 • Supply Chain Tech',
      title: 'Logistics & Tracking',
      desc: 'Parcel tracking, QR/barcode ecosystems, field operations and logistics management.',
      icon: <FiPackage />,
      benefits: [
        'End-to-End Live Parcel Tracking Engines',
        'QR & Barcode Scanning Ecosystems',
        'Field Operations & Driver Dispatch Tools',
        'Multi-Warehouse Logistics Management'
      ]
    },
    {
      id: 'web-mobile',
      number: '07',
      shortName: 'Web & Mobile',
      tag: '07 • Web & App Engineering',
      title: 'Web & Mobile',
      desc: 'Business websites, enterprise applications, SaaS platforms, Android, iOS and PWAs.',
      icon: <FiSmartphone />,
      benefits: [
        'High-Converting Business & Corporate Websites',
        'Native Android & iOS Application Development',
        'Multi-Tenant Scalable SaaS Platforms',
        'Progressive Web Applications (PWAs)'
      ]
    },
    {
      id: 'iot-smart-technology',
      number: '08',
      shortName: 'IoT & Smart Tech',
      tag: '08 • Connected IoT Systems',
      title: 'IoT & Smart Technology',
      desc: 'Connected devices, sensors, real-time monitoring and smart infrastructure.',
      icon: <FiWifi />,
      benefits: [
        'Smart Sensor Integration & Device Gateways',
        'Sub-Second Telemetry & Live Dashboards',
        'Industrial Automation & Remote Monitoring',
        'Energy-Efficient Smart Infrastructure'
      ]
    },
    {
      id: 'startup-innovation',
      number: '09',
      shortName: 'Startup & Innovation',
      tag: '09 • Venture & Product Lab',
      title: 'Startup & Innovation',
      desc: 'MVPs, product development, architecture, SaaS and technology strategy.',
      icon: <FiZap />,
      benefits: [
        'Rapid MVP Architecture & Prototyping',
        'End-to-End Product Engineering & Launch',
        'Scalable Cloud-Native Tech Foundations',
        'Strategic Tech Advisory & Fractional CTO'
      ]
    }
  ];

  // Duplicated list for zero-gap seamless infinite loop
  const duplicatedServices = [...services, ...services];

  // ⭐ Fast Continuous Auto-Looping Timer (slides 1 card right every 1.6s, resets at end)
  useEffect(() => {
    if (isPaused) return;

    const autoLoopTimer = setInterval(() => {
      if (marqueeTrackRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = marqueeTrackRef.current;
        
        // If reached end of duplicated items, reset scroll position smoothly to start
        if (scrollLeft + clientWidth >= scrollWidth - 30) {
          marqueeTrackRef.current.scrollTo({ left: 0, behavior: 'instant' });
          marqueeTrackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        } else {
          marqueeTrackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 1600);

    return () => clearInterval(autoLoopTimer);
  }, [isPaused]);

  // ⭐ Working Left & Right Arrow Buttons Handler
  const handleArrowClick = (direction) => {
    setIsPaused(true);
    if (marqueeTrackRef.current) {
      const { scrollLeft, scrollWidth } = marqueeTrackRef.current;
      const scrollAmount = direction === 'left' ? -380 : 380;
      
      if (direction === 'left' && scrollLeft <= 20) {
        // Seamless loop to middle if clicking left at start
        marqueeTrackRef.current.scrollTo({ left: scrollWidth / 2, behavior: 'instant' });
        marqueeTrackRef.current.scrollBy({ left: -380, behavior: 'smooth' });
      } else {
        marqueeTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const aiCapabilities = [
    { icon: <FiMic />, title: 'Smart Voice Interfaces' },
    { icon: <FiGlobe />, title: 'Regional Language AI' },
    { icon: <FiTrendingUp />, title: 'AI Analytics & Intelligent Automation' },
    { icon: <FiUsers />, title: 'AI-powered Employee Well-being Platforms' },
    { icon: <FiAward />, title: 'AI-based Education Platforms' },
    { icon: <FiCpu />, title: 'AI Agents & AI-native Applications' }
  ];

  const enterpriseSolutions = [
    {
      icon: <FiDatabase />,
      title: 'AI ERP',
      desc: 'Bring operations, information and decision-making onto one connected platform.'
    },
    {
      icon: <FiUsers />,
      title: 'AI Based CRM',
      desc: 'Manage leads, customers, communication and business workflows more effectively.'
    },
    {
      icon: <FiUser />,
      title: 'AI HR & Employee Management',
      desc: 'Simplify employee processes, information and organisational workflows.'
    },
    {
      icon: <FiAward />,
      title: 'Student Management Systems',
      desc: 'Connect student data, administration and institutional operations.'
    },
    {
      icon: <FiBookOpen />,
      title: 'AI Learning Management Systems',
      desc: 'Create structured digital learning environments for modern institutions.'
    },
    {
      icon: <FiLayers />,
      title: 'Workflow Automation',
      desc: 'Reduce manual processes and create faster, more transparent operations.'
    }
  ];

  const edtechSolutions = [
    { icon: <FiAward />, title: 'Student Super Platforms' },
    { icon: <FiBriefcase />, title: 'Placement & Internship Platforms' },
    { icon: <FiCheckSquare />, title: 'Online Assessment & Examination Systems' },
    { icon: <FiMonitor />, title: 'LMS & Digital Learning Platforms' },
    { icon: <FiUsers />, title: 'Student Management Systems' },
    { icon: <FiGlobe />, title: 'College & University Portals' },
    { icon: <FiLock />, title: 'Digital Secure Vault' },
    { icon: <FiLayers />, title: 'All Type of EdTech Solutions' }
  ];

  const digitalGovernanceItems = [
    { icon: <FiUsers />, title: 'Citizen Engagement' },
    { icon: <FiShield />, title: 'Digital Governance' },
    { icon: <FiBarChart2 />, title: 'Data & Dashboards' }
  ];

  const smartMobilityItems = [
    { icon: <FiSmartphone />, title: 'Contactless Ticketing' },
    { icon: <FiGrid />, title: 'QR & Barcode Ticketing' },
    { icon: <FiNavigation />, title: 'Smart Mobility Applications' }
  ];

  return (
    <div className="services-page">
      {/* Unified Hero & Carousel Section with Continuous Moving Grid */}
      <section className="sp-hero-carousel-combined animate-on-scroll">
        <div className="section-grid-pattern"></div>
        
        {/* Header Content Matching Flyer */}
        <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '2.5rem' }}>
          <div className="sp-hero-header-row">
            <div className="sp-hero-header-left">
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
                <h2 className="section-main-title">
                  OUR <span className="title-gradient-accent">SERVICES</span>
                </h2>
              </div>
              
              <h1 className="sp-hero-main-title">
                One Technology Partner. <br />
                <span className="title-gradient-accent">Multiple Possibilities.</span>
              </h1>
            </div>

            <div className="sp-hero-header-right">
              <motion.div 
                className="transformation-right-text-block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  visible: { transition: { staggerChildren: 0.025 } },
                  hidden: {}
                }}
              >
                <p style={{ fontSize: '1.05rem', color: '#1e293b', margin: '0 0 6px 0', lineHeight: 1.6 }}>
                  {"Modern organisations don't need disconnected technology. They need ".split(' ').map((word, i) => (
                    <motion.span
                      key={`pw1-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
                      }}
                      style={{ display: 'inline-block', marginRight: '0.28em' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  {"connected solutions that work together.".split(' ').map((word, i) => (
                    <motion.span
                      key={`pw2-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
                      }}
                      style={{ display: 'inline-block', marginRight: '0.28em', color: '#ff6b00', fontWeight: 800 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>

                <p style={{ fontSize: '0.98rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  {"Our expertise spans the complete digital technology landscape.".split(' ').map((word, i) => (
                    <motion.span
                      key={`pw3-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
                      }}
                      style={{ display: 'inline-block', marginRight: '0.28em' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              </motion.div>

              <div className="services-pillar-badge-box">
                <div className="services-pillar-words">
                  <div className="pillar-orange-dash"></div>
                  <span>INNOVATION</span>
                  <span>INTEGRATION</span>
                  <span>IMPACT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ CONTINUOUS AUTO-LOOPING + WORKING LEFT/RIGHT ARROWS CAROUSEL */}
        <div className="container" style={{ maxWidth: '100%', padding: 0, position: 'relative', zIndex: 2 }}>
          {/* ⭐ CAROUSEL CONTAINER */}
          <div 
            className="sp-marquee-overflow-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* ⭐ WORKING LEFT NAV ARROW */}
            <button 
              className="carousel-nav-btn nav-left" 
              onClick={() => handleArrowClick('left')}
              aria-label="Previous service cards"
            >
              <FiChevronLeft />
            </button>

            {/* ⭐ HORIZONTAL SCROLL TRACK */}
            <div 
              className="sp-marquee-track" 
              ref={marqueeTrackRef}
            >
              {duplicatedServices.map((service, idx) => {
                const isActive = activeCardId === service.id;
                return (
                  <div 
                    className={`sp-card sp-carousel-card ${isActive ? 'is-active-glowing' : ''}`} 
                    key={`${service.id}-${idx}`} 
                    id={`service-card-${service.id}`} 
                    onClick={() => {
                      setActiveCardId(service.id);
                      setIsPaused(true);
                    }}
                  >
                    {/* Top Ambient Aura Glow */}
                    <div className="card-top-aura-glow"></div>

                    {/* Top Header Row with Pill Tag & Icon */}
                    <div className="sp-card-header-row">
                      <span className="sp-pill-tag">
                        <span className="pill-dot">⊙</span> {service.tag}
                      </span>
                      <div className="sp-icon-wrapper">
                        <span className="sp-icon">{service.icon}</span>
                      </div>
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="sp-card-title">{service.title}</h3>
                    <p className="sp-card-desc">{service.desc}</p>
                    
                    {/* Benefits List */}
                    <ul className="sp-card-benefits">
                      {service.benefits.map((benefit, i) => (
                        <li key={i}>
                          <FiCheckCircle className="sp-benefit-icon" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Interactive Glow CTA Button */}
                    <div className="sp-card-footer">
                      <Link to="/#contact" className="sp-card-learn-btn">
                        <span>Learn more</span>
                        <FiArrowRight className="sp-btn-arrow" />
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* ⭐ WORKING RIGHT NAV ARROW */}
            <button 
              className="carousel-nav-btn nav-right" 
              onClick={() => handleArrowClick('right')}
              aria-label="Next service cards"
            >
              <FiChevronRight />
            </button>

          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 04: AI SHOWCASE SECTION (Intelligence That Moves Business Forward)
          ======================================================== */}
      <section className="sp-showcase-section ai-showcase-section animate-on-scroll">
        <div className="section-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className="ai-showcase-grid">
            {/* Left Content Column */}
            <div className="ai-showcase-left">
              
              {/* Standard Theme Section Header */}
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
                <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                  ARTIFICIAL <span className="title-gradient-accent">INTELLIGENCE</span>
                </h2>
              </div>

              {/* Main Headline */}
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
                Intelligence That Moves <br />
                <span className="title-gradient-accent">Business Forward.</span>
              </h2>

              {/* Intro Narrative */}
              <div className="sp-showcase-narrative">
                <p className="narrative-lead">
                  AI is no longer just about prediction. <br />
                  It is about <span className="highlight-dark">understanding</span>, <span className="highlight-orange">automating and acting.</span>
                </p>
                <p className="narrative-body">
                  We develop AI-powered solutions that help organisations turn data and information into smarter decisions and more efficient operations.
                </p>
              </div>

              {/* Subsection Title */}
              <div className="sp-subsection-header">
                <h3 className="sp-subsection-title">Our AI capabilities</h3>
                <div className="orange-accent-bar"></div>
              </div>

              {/* AI Capabilities Grid */}
              <div className="ai-capabilities-grid">
                {aiCapabilities.map((cap, idx) => (
                  <div className="ai-capability-item" key={idx}>
                    <div className="ai-cap-icon-box">
                      {cap.icon}
                    </div>
                    <span className="ai-cap-title">{cap.title}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Quote Callout Box */}
              <div className="sp-callout-card ai-callout-card">
                <div className="callout-icon-wrapper">
                  <FiMessageSquare className="callout-icon" />
                </div>
                <div className="callout-text-content">
                  <h4 className="callout-lead-title">
                    From conversation to insight. <br />
                    <span>From insight to action.</span>
                  </h4>
                  <p className="callout-desc">
                    We integrate AI into practical business and institutional applications—creating technology that is not only intelligent, but useful.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Visual / Humanoid Card Column */}
            <div className="ai-showcase-right">
              <div className="ai-humanoid-visual-card">
                {/* Visual Ambient Glow */}
                <div className="visual-ambient-glow"></div>
                
                {/* Geometric Accent Slanted Shapes */}
                <div className="geo-accent-bar top-right-bar"></div>
                <div className="geo-accent-bar bottom-left-bar"></div>

                {/* Android Image */}
                <div className="ai-img-frame">
                  <img 
                    src="/ai-humanoid-showcase.jpg" 
                    alt="Human Potential Powered by AI" 
                    className="ai-humanoid-image"
                  />
                  <div className="ai-img-overlay-gradient"></div>
                </div>

                {/* Floating Bottom Pill Badge */}
                <div className="ai-human-badge">
                  <span className="human-text-top">HUMAN</span>
                  <span className="human-text-mid">POTENTIAL</span>
                  <div className="badge-dash"></div>
                  <span className="human-text-sub">POWERED BY AI</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 05: ENTERPRISE + DIGITAL TRANSFORMATION
          ======================================================== */}
      <section className="sp-showcase-section enterprise-showcase-section animate-on-scroll">
        <div className="section-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Header Row */}
          <div className="enterprise-header-row">
            <div className="enterprise-header-left">
              {/* Standard Theme Section Header */}
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
                <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                  ENTERPRISE & <span className="title-gradient-accent">TRANSFORMATION</span>
                </h2>
              </div>

              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
                Transform Complexity <br />
                <span className="title-gradient-accent">Into Control.</span>
              </h2>

              <div className="sp-showcase-narrative">
                <p className="narrative-lead" style={{ marginBottom: '6px' }}>
                  Every organisation has its own workflows, people, processes and priorities.
                </p>
                <p className="narrative-body" style={{ margin: 0 }}>
                  We build enterprise technology around <span className="highlight-orange">the way your organisation actually works.</span>
                </p>
              </div>
            </div>

            {/* Top Right Skyline Visual & Pillar Badge */}
            <div className="enterprise-header-right">
              {/* Skyline Visual Card */}
              <div className="enterprise-visual-banner">
                <img 
                  src="/enterprise-showcase.jpg" 
                  alt="Connected Operations Stronger Tomorrows" 
                  className="enterprise-banner-img"
                />
                <div className="banner-geo-accent"></div>
                <div className="banner-text-tag">
                  <span>CONNECTED OPERATIONS</span>
                  <strong>STRONGER TOMORROWS</strong>
                </div>
              </div>

              {/* 4 Pillars Badge */}
              <div className="enterprise-pillars-box">
                <div className="pillar-vertical-dash"></div>
                <div className="enterprise-pillar-list">
                  <span>PEOPLE</span>
                  <span>PROCESSES</span>
                  <span>TECHNOLOGY</span>
                  <span>GROWTH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subsection Title */}
          <div className="sp-subsection-header" style={{ marginTop: '3.5rem' }}>
            <h3 className="sp-subsection-title">Enterprise solutions</h3>
            <div className="orange-accent-bar"></div>
          </div>

          {/* 6 Enterprise Solutions Cards Grid */}
          <div className="enterprise-solutions-grid">
            {enterpriseSolutions.map((sol, idx) => (
              <div className="enterprise-card" key={idx} style={{ '--stagger': idx }}>
                <div className="enterprise-card-inner">
                  <div className="enterprise-icon-box">
                    {sol.icon}
                  </div>
                  <div className="enterprise-card-body">
                    <h4 className="enterprise-card-title">{sol.title}</h4>
                    <p className="enterprise-card-desc">{sol.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Box */}
          <div className="sp-callout-card enterprise-callout-card">
            <div className="callout-icon-wrapper">
              <FiBarChart2 className="callout-icon" />
            </div>
            <div className="callout-text-content">
              <p className="enterprise-callout-text">
                Technology that adapts to your organisation— <br className="mobile-hide" />
                <span className="highlight-orange">not the other way around.</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 06: EDUCATION TECHNOLOGY
          ======================================================== */}
      <section className="sp-showcase-section edtech-showcase-section animate-on-scroll" id="edtech-solutions">
        <div className="section-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className="ai-showcase-grid">
            {/* Left Content Column */}
            <div className="ai-showcase-left">
              
              {/* Standard Theme Section Header */}
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
                <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                  EDUCATION <span className="title-gradient-accent">TECHNOLOGY</span>
                </h2>
              </div>

              {/* Main Headline */}
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
                Reimagining the Digital <br />
                <span className="title-gradient-accent">Education Ecosystem.</span>
              </h2>

              {/* Intro Narrative */}
              <div className="sp-showcase-narrative">
                <p className="narrative-lead">
                  Education is no longer confined to the classroom.
                </p>
                <p className="narrative-body">
                  We build technology ecosystems that connect <span className="highlight-dark">students, educators, institutions and industry</span>—creating a more connected journey from <span className="highlight-orange">learning to career.</span>
                </p>
              </div>

              {/* Subsection Title */}
              <div className="sp-subsection-header">
                <h3 className="sp-subsection-title">Our EdTech solutions</h3>
                <div className="orange-accent-bar"></div>
              </div>

              {/* 6 EdTech Solutions Grid */}
              <div className="ai-capabilities-grid">
                {edtechSolutions.map((sol, idx) => (
                  <div className="ai-capability-item" key={idx}>
                    <div className="ai-cap-icon-box">
                      {sol.icon}
                    </div>
                    <span className="ai-cap-title">{sol.title}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Quote Callout Box */}
              <div className="sp-callout-card edtech-callout-card">
                <div className="callout-icon-wrapper">
                  <FiBookOpen className="callout-icon" />
                </div>
                <div className="callout-text-content">
                  <h4 className="callout-lead-title">
                    Learn. Connect. Prepare. <span>Progress.</span>
                  </h4>
                  <p className="callout-desc">
                    Our technology helps institutions move beyond fragmented systems towards a connected digital ecosystem designed around the complete student journey.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Visual / Campus Card Column */}
            <div className="ai-showcase-right">
              <div className="ai-humanoid-visual-card edtech-visual-card">
                <div className="visual-ambient-glow"></div>
                
                {/* Geometric Accent Slanted Shapes */}
                <div className="geo-accent-bar top-right-bar"></div>
                <div className="geo-accent-bar bottom-left-bar"></div>

                {/* Campus Image Frame */}
                <div className="ai-img-frame">
                  <img 
                    src="/edtech-showcase.jpg" 
                    alt="Reimagining the Digital Education Ecosystem" 
                    className="ai-humanoid-image"
                  />
                  <div className="ai-img-overlay-gradient"></div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="ai-human-badge edtech-badge">
                  <span className="human-text-top">LEARNING TODAY</span>
                  <div className="badge-dash"></div>
                  <span className="human-text-mid" style={{ color: '#ffffff', fontSize: '0.75rem' }}>A BRIGHTER TOMORROW</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 07: SMART GOVERNANCE & MOBILITY
          ======================================================== */}
      <section className="sp-showcase-section governance-showcase-section animate-on-scroll" id="governance-mobility">
        <div className="section-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Header Row */}
          <div className="enterprise-header-row">
            <div className="enterprise-header-left">
              {/* Standard Theme Section Header */}
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
                <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                  SMART GOVERNANCE & <span className="title-gradient-accent">MOBILITY</span>
                </h2>
              </div>

              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
                Smarter Cities. <br />
                <span className="title-gradient-accent">Better Experiences.</span>
              </h2>

              <div className="sp-showcase-narrative">
                <p className="narrative-lead" style={{ margin: 0 }}>
                  When technology connects citizens, data, infrastructure and administration, <span className="highlight-orange">everyday services become simpler.</span>
                </p>
              </div>
            </div>

            {/* Top Right Skyline Visual & Pillar Badge */}
            <div className="enterprise-header-right">
              {/* Skyline Visual Card */}
              <div className="enterprise-visual-banner">
                <img 
                  src="/smart-governance-showcase.jpg" 
                  alt="Connected Cities Stronger Communities" 
                  className="enterprise-banner-img"
                />
                <div className="banner-geo-accent"></div>
                <div className="banner-text-tag">
                  <span>CONNECTED CITIES</span>
                  <strong>STRONGER COMMUNITIES</strong>
                </div>
              </div>

              {/* 4 Pillars Badge */}
              <div className="enterprise-pillars-box">
                <div className="pillar-vertical-dash"></div>
                <div className="enterprise-pillar-list">
                  <span>PEOPLE</span>
                  <span>CITIZENS</span>
                  <span>TECHNOLOGY</span>
                  <span>PROGRESS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Module Grid (Digital Governance + Smart Mobility) */}
          <div className="gov-dual-modules-grid">
            {/* Module 1: Digital Governance */}
            <div className="gov-module-card">
              <div className="gov-module-header">
                <div className="gov-icon-badge">
                  <FiShield />
                </div>
                <div className="gov-module-header-text">
                  <h3 className="gov-module-title">Digital Governance</h3>
                  <div className="orange-accent-bar" style={{ width: '32px', height: '3px' }}></div>
                </div>
              </div>
              <p className="gov-module-desc">
                We create platforms that help government organisations streamline citizen services, administrative workflows and information management.
              </p>
              <div className="gov-sub-items-grid">
                {digitalGovernanceItems.map((item, idx) => (
                  <div className="gov-sub-item-pill" key={idx}>
                    <span className="gov-item-icon">{item.icon}</span>
                    <span className="gov-item-title">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Module 2: Smart Mobility */}
            <div className="gov-module-card">
              <div className="gov-module-header">
                <div className="gov-icon-badge">
                  <FiTruck />
                </div>
                <div className="gov-module-header-text">
                  <h3 className="gov-module-title">Smart Mobility</h3>
                  <div className="orange-accent-bar" style={{ width: '32px', height: '3px' }}></div>
                </div>
              </div>
              <p className="gov-module-desc">
                We bring intelligence into modern transportation through seamless digital transit solutions:
              </p>
              <div className="gov-sub-items-grid">
                {smartMobilityItems.map((item, idx) => (
                  <div className="gov-sub-item-pill" key={idx}>
                    <span className="gov-item-icon">{item.icon}</span>
                    <span className="gov-item-title">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Callout Box */}
          <div className="sp-callout-card governance-callout-card" style={{ marginTop: '2.5rem' }}>
            <div className="callout-icon-wrapper">
              <FiMapPin className="callout-icon" />
            </div>
            <div className="callout-text-content">
              <h4 className="callout-lead-title">
                From public systems to <span>public experiences.</span>
              </h4>
              <p className="callout-desc">
                Technology designed to make services more accessible, transparent and efficient.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC CUSTOM SECTIONS */}
      <DynamicPageSections page="services" />
    </div>
  );
};

export default ServicesPage;
