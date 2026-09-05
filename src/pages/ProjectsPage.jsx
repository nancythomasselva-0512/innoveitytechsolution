import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiCheckCircle, FiArrowUpRight, FiSettings } from 'react-icons/fi';
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
