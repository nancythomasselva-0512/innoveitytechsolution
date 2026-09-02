import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMonitor, FiSmartphone, FiCode, FiLayout, FiCloud, 
  FiCpu, FiDatabase, FiLayers, FiTrendingUp, FiSettings,
  FiCheckCircle, FiArrowRight, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import LetterReveal from '../components/LetterReveal/LetterReveal';
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
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  
  useScrollObserver();

  const services = [
    {
      id: 'custom-software',
      shortName: 'Custom Software',
      tag: 'Planning & Code',
      title: 'Custom Software Development',
      desc: 'Bespoke software solutions architected to address your specific operational workflows and unique business requirements without the noise.',
      icon: <FiCode />,
      benefits: ['Automated business processes', 'Tailored feature sets', 'High scalability architecture', 'Seamless third-party integrations']
    },
    {
      id: 'web-dev',
      shortName: 'Web Apps',
      tag: 'Web Engineering',
      title: 'Web Application Development',
      desc: 'High-performance, responsive web applications built with modern frontend frameworks and robust backend technologies.',
      icon: <FiMonitor />,
      benefits: ['Responsive design across devices', 'Lightning-fast load times', 'SEO-optimized structure', 'Secure data handling']
    },
    {
      id: 'mobile-dev',
      shortName: 'Mobile Apps',
      tag: 'Mobile Platforms',
      title: 'Mobile Application Development',
      desc: 'Native and cross-platform mobile experiences focused on exceptional usability, performance, and reliability.',
      icon: <FiSmartphone />,
      benefits: ['iOS and Android compatibility', 'Intuitive user interfaces', 'Offline functionality', 'App store deployment support']
    },
    {
      id: 'ui-ux',
      shortName: 'UI/UX Design',
      tag: 'Design Systems',
      title: 'UI/UX Design Systems',
      desc: 'User-centered design systems, wireframes, and interactive prototypes that elevate user engagement and satisfaction.',
      icon: <FiLayout />,
      benefits: ['Data-driven design decisions', 'Comprehensive design systems', 'Accessibility compliance', 'Interactive prototyping']
    },
    {
      id: 'devops',
      shortName: 'DevOps & CI/CD',
      tag: 'CI/CD & Automation',
      title: 'DevOps & CI/CD Automation',
      desc: 'Automated CI/CD pipelines, infrastructure as code, and continuous deployment workflows for fast, reliable delivery.',
      icon: <FiTrendingUp />,
      benefits: ['Automated CI/CD pipelines', 'Infrastructure as Code (IaC)', 'Zero-downtime deployment', 'Continuous monitoring & alerts']
    },
    {
      id: 'cloud-solutions',
      shortName: 'Cloud Solutions',
      tag: 'Cloud Architecture',
      title: 'Cloud Solutions & Hosting',
      desc: 'Cloud-native applications, infrastructure migration, and scalable hosting environments tailored to your enterprise needs.',
      icon: <FiCloud />,
      benefits: ['99.9% uptime reliability', 'Automated scaling', 'Disaster recovery planning', 'Optimized infrastructure costs']
    },
    {
      id: 'ai-ml',
      shortName: 'AI & ML',
      tag: 'AI & Machine Learning',
      title: 'AI & Machine Learning Solutions',
      desc: 'Intelligent automation, predictive models, and AI features designed to enhance decision-making and operational efficiency.',
      icon: <FiCpu />,
      benefits: ['Data-driven predictive insights', 'Process automation', 'Natural language processing', 'Custom machine learning models']
    },
    {
      id: 'enterprise',
      shortName: 'Enterprise',
      tag: 'Enterprise Platforms',
      title: 'Enterprise Software Solutions',
      desc: 'Large-scale enterprise software platforms that consolidate operations, manage data securely, and facilitate global collaboration.',
      icon: <FiDatabase />,
      benefits: ['High-volume data processing', 'Enterprise-grade security', 'Role-based access control', 'Multi-department workflow support']
    },
    {
      id: 'api-integration',
      shortName: 'API Integration',
      tag: 'API Workflows',
      title: 'API & System Integration',
      desc: 'Seamless connectivity between your core business systems, third-party services, and legacy enterprise platforms.',
      icon: <FiLayers />,
      benefits: ['Secure data synchronization', 'Custom API development', 'Legacy system modernization', 'Real-time webhook processing']
    },
    {
      id: 'maintenance',
      shortName: '24/7 Support',
      tag: 'Support & SLAs',
      title: 'Application Maintenance & Support',
      desc: 'Continuous monitoring, performance optimization, and proactive technical support for your critical applications.',
      icon: <FiSettings />,
      benefits: ['24/7 proactive monitoring', 'Security patch management', 'Performance optimization', 'Dedicated support SLAs']
    }
  ];

  // Duplicated 10 items list for zero-gap seamless infinite loop
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

  const features = [
    { title: 'Business-Oriented Solutions', desc: 'Technology built specifically to solve your real-world business challenges and drive measurable ROI.' },
    { title: 'Scalable Architecture', desc: 'Systems designed from day one to handle increasing traffic, data, and user bases seamlessly.' },
    { title: 'Secure Development Practices', desc: 'Enterprise-grade security protocols integrated throughout the entire software development lifecycle.' },
    { title: 'Modern Technologies', desc: 'Utilization of cutting-edge frameworks and languages that ensure your product remains future-proof.' },
    { title: 'Performance Optimization', desc: 'Codebases and infrastructure fine-tuned for lightning-fast load times and optimal resource utilization.' },
    { title: 'User-Centered Design', desc: 'Interfaces crafted with a deep focus on user psychology, accessibility, and intuitive navigation.' },
    { title: 'Flexible Engagement Model', desc: 'Adaptable partnership structures designed to align with your project scope, budget, and timeline.' },
    { title: 'Ongoing Technical Support', desc: 'Reliable, proactive maintenance to keep your applications running smoothly long after launch.' }
  ];

  return (
    <div className="services-page">
          {/* Unified Hero & Carousel Section with Continuous Moving Grid */}
      <section className="sp-hero-carousel-combined animate-on-scroll">
        <div className="section-grid-pattern"></div>
        
        {/* Header Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '2.5rem' }}>
          <div className="sp-hero-header-row">
            <div className="sp-hero-header-left">
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '12px' }}>
                <h2 className="section-main-title">
                  OUR <span className="title-gradient-accent">SERVICES</span>
                </h2>
              </div>
              
              <h1 className="sp-hero-main-title">
                Technology Solutions Designed to <br />
                <span className="title-gradient-accent">Accelerate Business Growth</span>
              </h1>
            </div>

            <div className="sp-hero-header-right">
              {/* ⭐ Smooth Letter-by-Letter Reveal Animation */}
              <LetterReveal 
                className="sp-intro-letter-reveal"
                text="Innoveity Tech Solution delivers practical, scalable, and future-ready technology services tailored to overcome complex business challenges. From bespoke software engineering to advanced cloud and AI implementations, we provide end-to-end technical expertise to modernize your operations and drive sustainable growth."
              />
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



      {/* Why Our Services Features */}
      <section className="sp-section" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '2.2rem' }}>
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h2 className="section-main-title">
                WHY CHOOSE <span className="title-gradient-accent">US</span>
              </h2>
            </div>
            <h2 className="section-title animate-on-scroll" style={{ textAlign: 'left' }}>
              Why Our <span className="title-gradient-accent">Services</span>
            </h2>
          </div>
          <div className="sp-features-grid">
            {features.map((feature, idx) => {
              // 2D Checkerboard pattern: cards 2, 4, 5, 7 (indices 1, 3, 4, 6) use brand dark green #121212
              const isDarkCard = [1, 3, 4, 6].includes(idx);
              return (
                <div className={`feature-box ${isDarkCard ? 'dark-card' : ''}`} key={idx} style={{ '--stagger': idx }}>
                  <div className="feature-accent-border"></div>
                  <div className="feature-inner-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="sp-section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="sp-cta">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              Let's Build Your Next <span className="title-gradient-accent">Digital Solution</span>
            </h2>
            <p>
              Ready to transform your ideas into reality? Partner with our expert engineering team to discuss your project requirements and discover the perfect technology solutions tailored precisely to your business objectives.
            </p>
            <div className="sp-cta-buttons">
              <Link to="/#contact" className="btn-team-primary glow-button">Request a Consultation</Link>
              <Link to="/#contact" className="btn-team-outline glow-button-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
