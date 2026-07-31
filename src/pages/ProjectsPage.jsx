import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiCheckCircle, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import ProjectsShowcase from '../components/Projects/ProjectsShowcase';
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
    { title: 'Requirement Analysis', desc: 'We conduct deep-dive sessions to understand your business objectives, target audience, and technical constraints to formulate a clear project vision.' },
    { title: 'Solution Planning', desc: 'Our architects design the system architecture, select the optimal technology stack, and create a comprehensive project roadmap with clear milestones.' },
    { title: 'UI/UX Design', desc: 'We craft intuitive user journeys, wireframes, and high-fidelity prototypes ensuring the interface aligns perfectly with your brand and user expectations.' },
    { title: 'Development', desc: 'Our engineering team builds your solution using agile methodologies, ensuring clean, documented, and highly maintainable code.' },
    { title: 'Quality Assurance', desc: 'Rigorous automated and manual testing is performed across devices and environments to guarantee performance, security, and reliability.' },
    { title: 'Deployment', desc: 'We manage a seamless transition to the production environment, configuring cloud infrastructure and monitoring tools for optimal uptime.' },
    { title: 'Continuous Support', desc: 'Post-launch, we provide ongoing maintenance, performance monitoring, and iterative feature updates to support your long-term growth.' }
  ];

  return (
    <div className="projects-page" style={{ paddingTop: '80px', backgroundColor: '#082823' }}>
      
      {/* ⭐ 3D Showcase Hero Section */}
      <ProjectsShowcase />

      {/* Projects Grid Case Studies Section */}
      <section className="projects-section" style={{ backgroundColor: '#ffffff', color: '#111111' }}>
        <div className="container">
          <div className="projects-grid-header" style={{ textCenter: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0d3b34', marginBottom: '10px' }}>Featured Case Studies</h2>
            <p style={{ color: '#555555', fontSize: '16px' }}>Detailed breakdown of system architecture, engineering challenges, and measurable results.</p>
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
      <section className="sp-section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="sp-section-title animate-on-scroll" style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Development Process</h2>
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
        </div>
      </section>

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
