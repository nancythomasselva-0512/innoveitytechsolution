import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiChevronRight, FiCheckCircle, FiUsers } from 'react-icons/fi';
import { Mail, Phone, Clock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import MeshGradientBackground from '../components/MeshGradient/MeshGradientBackground';
import './TeamPage.css';

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
      { threshold: 0.2 }
    );
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useScrollObserver();

  const teamStrengths = [
    'Cross-functional collaboration',
    'Modern development practices',
    'User-centered design approach',
    'Quality-driven engineering',
    'Security-focused implementation',
    'Continuous improvement and innovation'
  ];

  const differentiators = [
    'Innovative and future-ready solutions',
    'Clean and scalable architecture',
    'Responsive and accessible user experiences',
    'Security-focused development practices',
    'Transparent communication and project coordination',
    'Agile and iterative delivery approach',
    'Long-term technical support and maintenance'
  ];

  const { team: teamMembers = [], contact = {}, teamHeaderContent = {} } = useCMS();

  const leadershipBadge = teamHeaderContent.leadershipBadge || 'EXECUTIVE LEADERSHIP';
  const leadershipTitleLine1 = teamHeaderContent.leadershipTitleLine1 || 'Founder &';
  const leadershipTitleHighlight = teamHeaderContent.leadershipTitleHighlight || 'Executive Leadership';
  const leadershipSubtitle = teamHeaderContent.leadershipSubtitle || 'Guiding our technology vision, strategic growth, and engineering excellence.';
  
  const teamTitle = teamHeaderContent.teamTitle || (leadershipMembers?.length > 0 ? 'Our Engineering & Creative Experts' : 'Meet Our Experts');
  const teamSubtitle = teamHeaderContent.teamSubtitle || 'The brilliant minds behind our innovative solutions.';

  const defaultLeadership = [
    { id: 101, name: 'Founder & CEO', role: 'Founder & Managing Director', category: 'Leadership', image: '/Founder.jpeg' },
    { id: 102, name: 'Co-Founder & CEO', role: 'Chief Executive Officer', category: 'Leadership', image: '/CEO.jpeg' }
  ];

  const actualLeadership = teamMembers.filter(m => 
    m.category === 'Leadership' || 
    m.role?.toLowerCase().includes('founder') || 
    m.role?.toLowerCase().includes('ceo')
  );

  const leadershipMembers = actualLeadership.length > 0 ? actualLeadership : defaultLeadership;
  const generalMembers = teamMembers.filter(m => !actualLeadership.some(l => l.id === m.id));

  return (
    <div className="team-page">
      
      {/* ⭐ Brand Message / Hero with Dynamic Theme Mesh Gradient */}
      <MeshGradientBackground className="team-hero-mesh-wrapper" variant="hero">
        <section className="team-hero">
          <div className="container relative-z">
            <span className="team-hero-badge">INNOVEITY TECH SOLUTION</span>
            <h1 className="hero-animated-title">
              <span className="text-gradient-mesh">Building Innovative Digital Solutions</span><br />
              for Modern Businesses
            </h1>
            <p className="hero-animated-subtitle">
              Innoveity Tech Solution delivers innovative, scalable, and reliable technology solutions that help organizations streamline operations, enhance customer experiences, and accelerate digital transformation.
            </p>
          </div>
        </section>
      </MeshGradientBackground>


      {/* Our Team */}
      <section className="team-section relative-overflow">
        <div className="team-bg-shape"></div>
        <div className="container relative-z">
          <h2 className="team-section-title">Our Team</h2>
          <h3 className="team-section-subtitle">Collaborative Expertise, Unified Delivery</h3>
          
          <div className="team-content-grid">
            <div className="team-desc">
              <p>
                Innoveity Tech Solution is powered by a multidisciplinary team of software engineers, UI/UX designers, cloud specialists, AI practitioners, quality assurance professionals, and project coordinators who work together throughout the entire development lifecycle.
              </p>
              <p>
                Every project is approached through close collaboration, transparent communication, and shared ownership. By aligning technical expertise with business objectives, the team ensures that each solution is secure, scalable, maintainable, and optimized for long-term growth.
              </p>
            </div>
            
            <div className="team-strengths animate-on-scroll">
              <FiUsers className="watermark-icon" />
              <h3>Team Strengths</h3>
              <div className="strengths-list-container">
                {teamStrengths.map((strength, index) => (
                  <div className="strength-item" key={index} style={{ '--stagger': index }}>
                    <div className="strength-icon-wrapper solid-badge">
                      <FiCheck className="strength-icon-small" />
                    </div>
                    <span className="strength-text">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ Leadership & Executive Board Section (Founder & CEO) */}
      <section className="team-section leadership-section" style={{ background: 'linear-gradient(180deg, rgba(255, 107, 0, 0.04) 0%, rgba(255, 255, 255, 0) 100%)' }}>
        <div className="container">
          <div className="leadership-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="leadership-badge-pill">{leadershipBadge}</span>
            <h2 className="team-section-title animate-on-scroll" style={{ textAlign: 'center', marginTop: '12px' }}>
              {leadershipTitleLine1} <span className="gradient-text">{leadershipTitleHighlight}</span>
            </h2>
            <p className="why-intro animate-on-scroll" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
              {leadershipSubtitle}
            </p>
          </div>

          <div className="leadership-members-grid animate-on-scroll">
            {leadershipMembers.map((member) => (
              <div className="leadership-card" key={member.id}>
                <div className="leadership-card-top-pill">★ LEADERSHIP</div>
                <div className="leadership-image-wrapper">
                  <img src={member.image || '/Founder.jpeg'} alt={member.name} className="leadership-image" />
                </div>
                <div className="leadership-info">
                  <h3>{member.name}</h3>
                  <p className="leadership-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team / Experts Grid */}
      <section className="team-section" style={{ background: 'var(--bg-color)' }}>
        <div className="container">
          <h2 className="team-section-title animate-on-scroll" style={{ textAlign: 'center' }}>
            {teamTitle}
          </h2>
          <p className="why-intro animate-on-scroll" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            {teamSubtitle}
          </p>
          
          <div className="team-members-grid animate-on-scroll">
            {(generalMembers.length > 0 ? generalMembers : teamMembers).map((member) => (
              <div className="team-member-card" key={member.id}>
                <div className="member-image-wrapper">
                  <img src={member.image} alt={member.name} className="member-image" />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="team-section" style={{ background: 'white' }}>
        <div className="container why-container">
          <h2 className="team-section-title">Why Choose Innoveity Tech Solution</h2>
          <p className="why-intro">
            Organizations choose Innoveity Tech Solution for its commitment to innovation, engineering excellence, and collaborative delivery.
          </p>
          
          <div className="why-grid">
            {differentiators.map((diff, index) => (
              <div className="why-item hover-lift premium-tint" key={index}>
                <div className="why-check premium-shadow"><FiCheck /></div>
                <span className="why-text">{diff}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-cta relative-overflow">
            <div className="cta-glow-circle-1"></div>
            <div className="cta-glow-circle-2"></div>
            
            <div className="relative-z">
              <h2>Let’s Build Something Meaningful</h2>
              <p>
                Whether planning a new digital product, modernizing an existing system, or exploring AI and cloud technologies, Innoveity Tech Solution is ready to collaborate and deliver solutions aligned with business goals.
              </p>
              
              <div className="contact-details stacked-details animate-on-scroll">
                <div className="detail-item-stacked" style={{ '--stagger': 0 }}>
                  <div className="detail-icon-badge"><Mail size={24} /></div>
                  <div className="detail-text-col">
                    <span className="detail-label">Email</span>
                    <span className="detail-value"><a href={`mailto:${contact?.email || 'aachinancy@gmail.com'}`}>{contact?.email || 'aachinancy@gmail.com'}</a></span>
                  </div>
                </div>
                <div className="detail-item-stacked" style={{ '--stagger': 1 }}>
                  <div className="detail-icon-badge"><Phone size={24} /></div>
                  <div className="detail-text-col">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{contact?.phone || '+91 7904327211'}</span>
                  </div>
                </div>
                <div className="detail-item-stacked" style={{ '--stagger': 2 }}>
                  <div className="detail-icon-badge"><Clock size={24} /></div>
                  <div className="detail-text-col">
                    <span className="detail-label">Business Hours</span>
                    <span className="detail-value" style={{ whiteSpace: 'pre-wrap' }}>{contact?.businessHours || 'Mon - Sat: 9:00 AM - 6:00 PM'}</span>
                  </div>
                </div>
              </div>

              <div className="cta-actions">
                <Link to="/#contact" className="btn-team-primary glow-hover">Contact Us</Link>
                <Link to="/#services" className="btn-team-outline glow-hover-outline">Explore Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TeamPage;
