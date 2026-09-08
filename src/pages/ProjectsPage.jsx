import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiExternalLink, FiGithub, FiCheckCircle, FiArrowUpRight, FiSettings,
  FiTruck, FiPackage, FiWifi, FiCpu, FiTrendingUp, FiBarChart2, FiShield,
  FiTarget, FiMonitor, FiSmartphone, FiCloud, FiGrid, FiUsers, FiUser, FiRadio,
  FiDatabase, FiLayers, FiDisc, FiActivity, FiGlobe, FiCode, FiZap, FiServer
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import ProjectsShowcase from '../components/Projects/ProjectsShowcase';
import DynamicPageSections from '../components/UI/DynamicPageSections';
import './ProjectsPage.css';

const useScrollObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll, .timeline-step');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);
};

const ProjectsPage = () => {
  useScrollObserver();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const { projects } = useCMS();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processSteps = [
    {
      num: '01',
      title: 'Ideation',
      desc: 'Understand the challenge, opportunity and desired outcome.'
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'Define the technology roadmap and solution architecture.'
    },
    {
      num: '03',
      title: 'UI/UX',
      desc: 'Create intuitive experiences designed around real users.'
    },
    {
      num: '04',
      title: 'Architecture',
      desc: 'Build a secure, scalable and future-ready technology foundation.'
    },
    {
      num: '05',
      title: 'Development',
      desc: 'Engineer the platform, application or digital ecosystem.'
    },
    {
      num: '06',
      title: 'AI Integration',
      desc: 'Introduce intelligence, automation and data-driven capabilities where they create value.'
    },
    {
      num: '07',
      title: 'Testing',
      desc: 'Validate performance, usability, security and reliability.'
    },
    {
      num: '08',
      title: 'Deployment',
      desc: 'Launch with the infrastructure required for real-world usage.'
    },
    {
      num: '09',
      title: 'Support & Scaling',
      desc: 'Continuously improve, optimise and scale as requirements evolve.'
    }
  ];

  const smartLogisticsItems = [
    { icon: <FiGrid />, title: 'QR & Barcode Tracking' },
    { icon: <FiTruck />, title: 'Parcel Tracking' },
    { icon: <FiSettings />, title: 'Logistics Operations' },
    { icon: <FiUser />, title: 'Field & Job Management' },
    { icon: <FiActivity />, title: 'Real-time Status Updates' },
    { icon: <FiMonitor />, title: 'Administrative Dashboards' }
  ];

  const iotSmartItems = [
    { icon: <FiRadio />, title: 'IoT Monitoring' },
    { icon: <FiCpu />, title: 'Smart Device Integration' },
    { icon: <FiDisc />, title: 'Sensor Applications' },
    { icon: <FiBarChart2 />, title: 'Real-time Monitoring' },
    { icon: <FiDatabase />, title: 'Data Analytics' },
    { icon: <FiLayers />, title: 'Smart Infrastructure' }
  ];

  const webPillar = [
    { icon: <FiGlobe />, title: 'Business Websites' },
    { icon: <FiCode />, title: 'Enterprise Web Applications' },
    { icon: <FiLayers />, title: 'Custom Portals' },
    { icon: <FiBarChart2 />, title: 'Dashboards' }
  ];

  const mobilePillar = [
    { icon: <FiSmartphone />, title: 'Android Applications' },
    { icon: <FiCpu />, title: 'iOS Applications' },
    { icon: <FiZap />, title: 'Cross-platform solutions' }
  ];

  const saasPillar = [
    { icon: <FiCloud />, title: 'Cloud-based SaaS Platforms' },
    { icon: <FiCpu />, title: 'AI-enabled Applications' },
    { icon: <FiDatabase />, title: 'API-driven Products' },
    { icon: <FiServer />, title: 'Microservice Architectures' }
  ];

  return (
    <div className="projects-page" style={{ paddingTop: '80px', backgroundColor: '#ffffff' }}>
      
      {/* ⭐ 3D Showcase Hero Section */}
      <ProjectsShowcase />

      {/* Projects Grid Case Studies Section */}
      <section className="projects-section" style={{ backgroundColor: 'var(--bg-color, #ffffff)', position: 'relative' }}>
        <div className="container">
          <div className="projects-grid-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h2 className="section-main-title">
                CASE <span className="title-gradient-accent">STUDIES</span>
              </h2>
            </div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '14px' }}>
              Featured <span className="title-gradient-accent">Case Studies</span>
            </h2>
            <p className="projects-subtitle" style={{ textAlign: 'left', color: '#082233', fontSize: '1.02rem', maxWidth: '640px', margin: '0', lineHeight: '1.7', fontWeight: 500, opacity: 0.9 }}>
              Detailed breakdown of system architecture, engineering challenges, and measurable results.
            </p>
          </div>

          <div className="projects-accordion-container">
            {projects.map((project, idx) => (
              <div 
                className={`projects-accordion-item ${activeProjectIdx === idx ? 'active' : ''}`} 
                key={project.id}
                onMouseEnter={() => setActiveProjectIdx(idx)}
                onClick={() => setActiveProjectIdx(idx)}
              >
                <div 
                  className="accordion-bg" 
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                
                <div className="accordion-content">
                  <div className="accordion-number">{idx + 1}</div>
                  
                  <div className="accordion-info">
                    <div className="accordion-text">
                      <h3 className="accordion-title">{project.title}</h3>
                      <p className="accordion-category">{project.category}</p>
                    </div>
                    <FiArrowUpRight className="accordion-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Timeline */}
      <section className="sp-section" style={{ background: 'var(--bg-color-light, #f8fafc)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
              <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                HOW WE <span className="title-gradient-accent">WORK</span>
              </h2>
            </div>
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
              From Idea <span className="title-gradient-accent">to Impact.</span>
            </h2>
            <p style={{ maxWidth: '680px', margin: '0', textAlign: 'left', color: '#475569', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Great technology is built through a disciplined process. We take every solution from <span style={{ color: '#ff6b00', fontWeight: 700 }}>concept to deployment—and beyond.</span>
            </p>
          </div>
          
          <div className="sp-timeline-wrapper animate-on-scroll">
            <div className="sp-timeline-line"></div>
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div className={`timeline-step ${isEven ? 'step-left' : 'step-right'}`} key={idx} style={{ '--stagger': idx }}>
                  <div className="timeline-icon">{idx + 1}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Box */}
          <div className="sp-callout-card" style={{ maxWidth: '900px', margin: '3.5rem auto 0 auto', background: '#FFF4EA', border: '1.5px solid rgba(255, 107, 0, 0.35)', borderRadius: '20px', padding: '1.6rem 2rem', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(255, 107, 0, 0.08)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ffffff', border: '1.5px solid #ff6b00', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
              <FiSettings />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#082233', margin: '0 0 6px 0' }}>
                Think it. Build it. <span style={{ color: '#ff6b00' }}>Scale it.</span>
              </h4>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>
                This end-to-end workflow follows the company's stated "Ideation → Strategy → UI/UX → Architecture → Development → AI Integration → Testing → Deployment → Support & Scaling" model.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 08: LOGISTICS & IOT
          ======================================================== */}
      <section className="sp-showcase-section logistics-showcase-section animate-on-scroll" id="logistics-iot" style={{ background: '#ffffff', padding: '5rem 1.5rem', borderBottom: '1px solid rgba(8, 34, 51, 0.08)' }}>
        <div className="section-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Header Row */}
          <div className="enterprise-header-row">
            <div className="enterprise-header-left">
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
                <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                  LOGISTICS & <span className="title-gradient-accent">IOT</span>
                </h2>
              </div>

              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
                Connect Every Movement. <br />
                <span className="title-gradient-accent">Monitor Every Moment.</span>
              </h2>

              <div className="sp-showcase-narrative">
                <p className="narrative-lead" style={{ margin: 0 }}>
                  Whether it is a parcel moving across a network or a sensor transmitting information in real time, <span className="highlight-orange">visibility creates control.</span>
                </p>
              </div>
            </div>

            {/* Top Right Warehouse Visual & Pillar Badge */}
            <div className="enterprise-header-right">
              <div className="enterprise-visual-banner">
                <img 
                  src="/logistics-iot-showcase.jpg" 
                  alt="Track Manage Optimise Deliver" 
                  className="enterprise-banner-img"
                />
                <div className="banner-geo-accent"></div>
                <div className="banner-text-tag">
                  <span>SMART SUPPLY CHAIN</span>
                  <strong>LOGISTICS & IOT</strong>
                </div>
              </div>

              <div className="enterprise-pillars-box">
                <div className="pillar-vertical-dash"></div>
                <div className="enterprise-pillar-list">
                  <span>TRACK</span>
                  <span>MANAGE</span>
                  <span>OPTIMISE</span>
                  <span>DELIVER</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Module Grid (Smart Logistics + IoT & Smart Technology) */}
          <div className="gov-dual-modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '3.5rem', alignItems: 'start' }}>
            {/* Module 1: Smart Logistics */}
            <div className="gov-module-card" style={{ background: '#f8fafc', border: '1.5px solid rgba(8, 34, 51, 0.09)', borderRadius: '20px', padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column' }}>
              <div className="gov-module-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.8rem' }}>
                <div className="gov-icon-badge" style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff3ea', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', flexShrink: 0, border: '1px solid rgba(255, 107, 0, 0.25)' }}>
                  <FiPackage />
                </div>
                <div className="gov-module-header-text">
                  <h3 className="gov-module-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#082233', margin: '0 0 6px 0' }}>Smart Logistics Platforms</h3>
                  <div className="orange-accent-bar" style={{ width: '32px', height: '3.5px', background: '#ff6b00', borderRadius: '2px' }}></div>
                </div>
              </div>
              <p className="gov-module-desc" style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.2rem 0' }}>
                Our logistics platforms help organisations manage operational lifecycles and tracking:
              </p>
              <div className="logistics-items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {smartLogisticsItems.map((item, idx) => (
                  <div className="gov-sub-item-pill" key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', border: '1px solid rgba(8, 34, 51, 0.08)', padding: '10px 12px', borderRadius: '12px' }}>
                    <span style={{ color: '#ff6b00', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#082233' }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Module 2: IoT & Smart Technology */}
            <div className="gov-module-card" style={{ background: '#f8fafc', border: '1.5px solid rgba(8, 34, 51, 0.09)', borderRadius: '20px', padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column' }}>
              <div className="gov-module-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.8rem' }}>
                <div className="gov-icon-badge" style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff3ea', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', flexShrink: 0, border: '1px solid rgba(255, 107, 0, 0.25)' }}>
                  <FiWifi />
                </div>
                <div className="gov-module-header-text">
                  <h3 className="gov-module-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#082233', margin: '0 0 6px 0' }}>IoT & Smart Technology</h3>
                  <div className="orange-accent-bar" style={{ width: '32px', height: '3.5px', background: '#ff6b00', borderRadius: '2px' }}></div>
                </div>
              </div>
              <p className="gov-module-desc" style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.2rem 0' }}>
                We connect devices, sensors, data and software to create intelligent monitoring ecosystems:
              </p>
              <div className="iot-pills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {iotSmartItems.map((item, idx) => (
                  <div className="gov-sub-item-pill" key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', border: '1px solid rgba(8, 34, 51, 0.08)', padding: '10px 12px', borderRadius: '12px' }}>
                    <span style={{ color: '#ff6b00', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#082233' }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Callout Box */}
          <div className="sp-callout-card" style={{ marginTop: '2.5rem', background: '#FFF4EA', border: '1.5px solid rgba(255, 107, 0, 0.35)', borderRadius: '20px', padding: '1.6rem 2rem', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(255, 107, 0, 0.08)' }}>
            <div className="callout-icon-wrapper" style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ffffff', border: '1.5px solid #ff6b00', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
              <FiTarget />
            </div>
            <div className="callout-text-content">
              <h4 className="callout-lead-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#082233', margin: 0 }}>
                Know what is happening. Know where it is happening. <br />
                <span style={{ color: '#ff6b00' }}>Act when it matters.</span>
              </h4>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          PAGE 09: WEB, MOBILE & SAAS
          ======================================================== */}
      <section className="sp-showcase-section saas-showcase-section animate-on-scroll" id="web-mobile-saas" style={{ background: '#f8fafc', padding: '5rem 1.5rem', borderBottom: '1px solid rgba(8, 34, 51, 0.08)' }}>
        <div className="section-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Header Row */}
          <div className="enterprise-header-row">
            <div className="enterprise-header-left">
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
                <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                  WEB, MOBILE & <span className="title-gradient-accent">SAAS</span>
                </h2>
              </div>

              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>
                Digital Products <br />
                <span className="title-gradient-accent">Built to Scale.</span>
              </h2>

              <div className="sp-showcase-narrative">
                <p className="narrative-lead" style={{ marginBottom: '6px' }}>
                  A great digital product needs more than great code. It needs <span className="highlight-orange">clarity, usability, performance and scalability.</span>
                </p>
                <p className="narrative-body" style={{ margin: 0 }}>
                  We design and develop digital products across web, mobile and cloud environments.
                </p>
              </div>
            </div>

            {/* Top Right Visual Banner */}
            <div className="enterprise-header-right">
              <div className="enterprise-visual-banner">
                <img 
                  src="/web-saas-showcase.jpg" 
                  alt="Digital Products Built to Scale" 
                  className="enterprise-banner-img"
                />
                <div className="banner-geo-accent"></div>
                <div className="banner-text-tag">
                  <span>BUILD • LAUNCH • SCALE</span>
                  <strong>DIGITAL ECOSYSTEMS</strong>
                </div>
              </div>

              <div className="enterprise-pillars-box">
                <div className="pillar-vertical-dash"></div>
                <div className="enterprise-pillar-list">
                  <span>IDEAS</span>
                  <span>PRODUCTS</span>
                  <span>USERS</span>
                  <span>GROWTH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subsection Header */}
          <div className="sp-subsection-header" style={{ marginTop: '3.5rem', marginBottom: '1.8rem' }}>
            <h3 className="sp-subsection-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#082233', margin: '0 0 8px 0' }}>What we build</h3>
            <div className="orange-accent-bar" style={{ width: '44px', height: '3.5px', background: '#ff6b00', borderRadius: '3px' }}></div>
          </div>

          {/* 3 Pillars Architecture Grid */}
          <div className="saas-three-pillars-grid">
            {/* Pillar 1: Web */}
            <div className="saas-pillar-card">
              <div className="pillar-top-aura"></div>
              <div className="pillar-header-row">
                <div className="pillar-icon-wrapper">
                  <FiMonitor />
                </div>
                <div className="pillar-header-text">
                  <div className="pillar-title-tag-row">
                    <h3 className="saas-pillar-title">Web Platforms</h3>
                    <span className="pillar-index-tag">01</span>
                  </div>
                  <p className="pillar-sub-label">High-performance web environments</p>
                </div>
              </div>
              <div className="pillar-chips-list">
                {webPillar.map((item, idx) => (
                  <div className="pillar-chip-item" key={idx}>
                    <span className="pillar-chip-icon">{item.icon}</span>
                    <span className="pillar-chip-text">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar 2: Mobile */}
            <div className="saas-pillar-card">
              <div className="pillar-top-aura"></div>
              <div className="pillar-header-row">
                <div className="pillar-icon-wrapper">
                  <FiSmartphone />
                </div>
                <div className="pillar-header-text">
                  <div className="pillar-title-tag-row">
                    <h3 className="saas-pillar-title">Mobile Apps</h3>
                    <span className="pillar-index-tag">02</span>
                  </div>
                  <p className="pillar-sub-label">Native & hybrid mobile applications</p>
                </div>
              </div>
              <div className="pillar-chips-list">
                {mobilePillar.map((item, idx) => (
                  <div className="pillar-chip-item" key={idx}>
                    <span className="pillar-chip-icon">{item.icon}</span>
                    <span className="pillar-chip-text">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar 3: SaaS */}
            <div className="saas-pillar-card">
              <div className="pillar-top-aura"></div>
              <div className="pillar-header-row">
                <div className="pillar-icon-wrapper">
                  <FiCloud />
                </div>
                <div className="pillar-header-text">
                  <div className="pillar-title-tag-row">
                    <h3 className="saas-pillar-title">SaaS Products</h3>
                    <span className="pillar-index-tag">03</span>
                  </div>
                  <p className="pillar-sub-label">Multi-tenant cloud architectures</p>
                </div>
              </div>
              <div className="pillar-chips-list">
                {saasPillar.map((item, idx) => (
                  <div className="pillar-chip-item" key={idx}>
                    <span className="pillar-chip-icon">{item.icon}</span>
                    <span className="pillar-chip-text">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Callout Box */}
          <div className="sp-callout-card" style={{ marginTop: '2.5rem', background: '#FFF4EA', border: '1.5px solid rgba(255, 107, 0, 0.35)', borderRadius: '20px', padding: '1.6rem 2rem', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(255, 107, 0, 0.08)' }}>
            <div className="callout-icon-wrapper" style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ffffff', border: '1.5px solid #ff6b00', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
              <FiTrendingUp />
            </div>
            <div className="callout-text-content">
              <h4 className="callout-lead-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#ff6b00', margin: '0 0 6px 0' }}>
                From first screen to <span style={{ color: '#082233' }}>millions of interactions.</span>
              </h4>
              <p className="callout-desc" style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
                We engineer digital experiences with the architecture needed to evolve as your business grows.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC CUSTOM SECTIONS */}
      <DynamicPageSections page="projects" />

      {/* CTA Section */}
      <section className="projects-cta-section">
        <div className="container">
          <div className="projects-cta">
            <h2 className="cta-title">Have a project in mind?</h2>
            <p className="cta-text">
              Let's collaborate to build something extraordinary together. Our team of experts is ready to turn your vision into reality.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-cta-primary">Start a Conversation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
