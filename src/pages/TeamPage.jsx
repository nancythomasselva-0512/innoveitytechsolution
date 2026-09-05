import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheck, FiChevronRight, FiCheckCircle, FiUsers, FiBriefcase, FiArrowRight, FiUpload, FiFileText, FiTrash2 } from 'react-icons/fi';
import { Mail, Phone, Clock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import MeshGradientBackground from '../components/MeshGradient/MeshGradientBackground';
import DynamicPageSections from '../components/UI/DynamicPageSections';
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#careers') {
      setTimeout(() => {
        const el = document.getElementById('careers');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  useScrollObserver();

  const teamStrengths = [
    'Cross-functional teams of software, design, cloud, and AI professionals',
    'User-centric interface design and performance-oriented development',
    'Full-lifecycle development from discovery to deployment and support',
    'Strong focus on scalable, secure, and future-proof software architecture',
    'Agile delivery models ensuring transparency, quality, and fast iteration'
  ];

  const differentiators = [
    'Innovative and future-ready solutions',
    'Responsive and accessible user experiences',
    'Security-focused development practices',
    'Transparent communication and project coordination',
    'Agile and iterative delivery approach',
    'Long-term technical support and maintenance'
  ];

  const { team: teamMembers = [], contact = {}, teamHeaderContent = {}, careers = [], addInquiry } = useCMS();

  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '',
    resumeFile: null,
    resumeFileName: '',
    resumeFileSize: '',
    resumeBase64: '',
    coverLetter: ''
  });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSubmittedSuccess, setAppSubmittedSuccess] = useState(false);

  const handleOpenApplyModal = (job) => {
    setSelectedJobForApply(job);
    setApplyForm({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      experience: job.experience || '2+ Years',
      resumeFile: null,
      resumeFileName: '',
      resumeFileSize: '',
      resumeBase64: '',
      coverLetter: ''
    });
    setAppSubmittedSuccess(false);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please upload a smaller resume document.');
      return;
    }
    const fileSizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = () => {
      setApplyForm(prev => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name,
        resumeFileSize: fileSizeFormatted,
        resumeBase64: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    setApplyForm(prev => ({
      ...prev,
      resumeFile: null,
      resumeFileName: '',
      resumeFileSize: '',
      resumeBase64: ''
    }));
  };

  const handleJobApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJobForApply || !applyForm.name || !applyForm.email) return;
    setIsSubmittingApp(true);
    const targetEmail = (contact && contact.email) ? contact.email : "aachinancy@gmail.com";
    const applicationSummary = `
📌 NEW JOB CANDIDATE APPLICATION
----------------------------------------
💼 Position Applied: ${selectedJobForApply.title} (${selectedJobForApply.department})
👤 Applicant Name: ${applyForm.name}
📧 Email Address: ${applyForm.email}
📞 Phone Number: ${applyForm.phone || 'N/A'}
🎯 Years of Experience: ${applyForm.experience || selectedJobForApply.experience}
🌐 Portfolio / LinkedIn: ${applyForm.portfolio || 'N/A'}
📄 Resume / CV Attached: ${applyForm.resumeFileName ? `${applyForm.resumeFileName} (${applyForm.resumeFileSize})` : 'Not uploaded (Link / Notes provided)'}

📝 Cover Letter & Candidate Pitch:
${applyForm.coverLetter || 'No additional notes provided.'}
----------------------------------------
`;

    // 1. Immediately save record to CMSContext (Syncs with MySQL and LocalStorage)
    if (addInquiry) {
      addInquiry({
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone || 'N/A',
        company: applyForm.resumeFileName ? `📄 Resume: ${applyForm.resumeFileName}` : (applyForm.portfolio || 'Candidate Portfolio'),
        subject: `[Job Application] ${selectedJobForApply.title}`,
        message: applicationSummary
      });
    }

    // 2. Dispatch Email Notification to Admin Email
    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `💼 New Job Application: ${selectedJobForApply.title} - ${applyForm.name}`,
          name: applyForm.name,
          email: applyForm.email,
          phone: applyForm.phone || 'N/A',
          position: selectedJobForApply.title,
          portfolio: applyForm.portfolio || 'N/A',
          experience: applyForm.experience || selectedJobForApply.experience,
          resume_file_name: applyForm.resumeFileName || 'None',
          resume_file_size: applyForm.resumeFileSize || 'None',
          message: applicationSummary,
          to_email: targetEmail
        })
      });
    } catch (err) {
      console.error("Application email send log:", err);
    } finally {
      setIsSubmittingApp(false);
      setAppSubmittedSuccess(true);
      setTimeout(() => {
        setAppSubmittedSuccess(false);
        setSelectedJobForApply(null);
        setApplyForm({
          name: '',
          email: '',
          phone: '',
          portfolio: '',
          experience: '',
          resumeFile: null,
          resumeFileName: '',
          resumeFileSize: '',
          resumeBase64: '',
          coverLetter: ''
        });
      }, 3000);
    }
  };

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
            <h1 className="hero-animated-title">
              <span className="text-gradient-mesh">Building Innovative Digital Solutions</span><br />
              for Modern Businesses
            </h1>
            <p className="hero-animated-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
              Innoveity Tech Solution delivers innovative, scalable, and reliable technology solutions that help organizations streamline operations, enhance customer experiences, and accelerate digital transformation.
            </p>
          </div>
        </section>
      </MeshGradientBackground>


      {/* Our Team */}
      <section className="team-section relative-overflow">
        <div className="team-bg-shape"></div>
        <div className="container relative-z">
          <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
            <h2 className="section-main-title">
              OUR <span className="title-gradient-accent">TEAM</span>
            </h2>
          </div>
          <h2 className="section-title animate-on-scroll" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            Collaborative Expertise, <span className="title-gradient-accent">Unified Delivery</span>
          </h2>
          
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
          <div className="leadership-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h2 className="section-main-title">
                EXECUTIVE <span className="title-gradient-accent">LEADERSHIP</span>
              </h2>
            </div>
            <h2 className="section-title animate-on-scroll" style={{ textAlign: 'left', marginBottom: '14px' }}>
              {leadershipTitleLine1} <span className="title-gradient-accent">{leadershipTitleHighlight}</span>
            </h2>
            <p className="why-intro animate-on-scroll" style={{ textAlign: 'left', maxWidth: '650px', margin: '0' }}>
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
          <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h2 className="section-main-title">
                OUR <span className="title-gradient-accent">EXPERTS</span>
              </h2>
            </div>
            <h2 className="section-title animate-on-scroll" style={{ textAlign: 'left', marginBottom: '14px' }}>
              Developers & <span className="title-gradient-accent">Creative Minds</span>
            </h2>
            <p className="why-intro animate-on-scroll" style={{ textAlign: 'left', maxWidth: '650px', margin: '0' }}>
              {teamSubtitle}
            </p>
          </div>
          
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
          <div className="why-header-split">
            <div className="why-header-left">
              <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
                <h2 className="section-main-title">
                  WHY <span className="title-gradient-accent">US</span>
                </h2>
              </div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
                Why Choose <span className="title-gradient-accent">Innoveity Tech</span><br />
                <span className="title-gradient-accent">Solution</span>
              </h2>
            </div>
            <div className="why-header-right">
              <p className="why-intro">
                Organizations choose Innoveity Tech Solution for its commitment to innovation, engineering excellence, and collaborative delivery.
              </p>
            </div>
          </div>
          
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

      {/* ⭐ Careers & Open Positions Section */}
      <section id="careers" className="team-section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h2 className="section-main-title">
                JOIN OUR <span className="title-gradient-accent">TEAM</span>
              </h2>
            </div>
            <h2 className="section-title animate-on-scroll" style={{ textAlign: 'left', marginBottom: '14px' }}>
              Current <span className="title-gradient-accent">Career Opportunities</span>
            </h2>
            <p className="why-intro animate-on-scroll" style={{ textAlign: 'left', maxWidth: '650px', margin: '0' }}>
              We are constantly seeking passionate software engineers, creative designers, and AI specialists to build world-class digital products.
            </p>
          </div>

          {(() => {
            const activeJobs = (careers || []).filter(c => c.status === 'Active');

            if (activeJobs.length === 0) {
              return (
                <div style={{ background: '#ffffff', borderRadius: '20px', padding: '40px 24px', textAlign: 'center', border: '1.5px dashed #cbd5e1' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff7ed', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem' }}>
                    <FiBriefcase />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#082233', fontWeight: 800, margin: '0 0 8px' }}>No Active Openings Right Now</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 20px' }}>
                    We do not currently have listed openings, but we are always open to meeting extraordinary talent. Send us your resume anytime!
                  </p>
                  <Link to="/contact?subject=General%20Career%20Inquiry" className="btn-team-primary" style={{ display: 'inline-block', padding: '10px 24px' }}>
                    Send General Application
                  </Link>
                </div>
              );
            }

            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '28px',
                      border: '1.5px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease'
                    }}
                    className="career-job-card"
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                        <span style={{
                          background: '#fff7ed',
                          color: '#ea580c',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          padding: '4px 12px',
                          borderRadius: '12px',
                          border: '1px solid #fdba74',
                          textTransform: 'uppercase'
                        }}>
                          {job.department}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          ● HIRING NOW
                        </span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#082233', margin: '0 0 10px', lineHeight: 1.3 }}>
                        {job.title}
                      </h3>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 700, padding: '3px 10px', borderRadius: '8px' }}>
                          📍 {job.location}
                        </span>
                        <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 700, padding: '3px 10px', borderRadius: '8px' }}>
                          ⏳ {job.type}
                        </span>
                        <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.76rem', fontWeight: 700, padding: '3px 10px', borderRadius: '8px' }}>
                          🎯 {job.experience}
                        </span>
                      </div>

                      <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 20px' }}>
                        {job.description}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenApplyModal(job)}
                        style={{
                          background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                          color: '#ffffff',
                          padding: '10px 22px',
                          borderRadius: '30px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.86rem',
                          fontWeight: 800,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 14px rgba(255, 107, 0, 0.35)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Apply for this Role <FiArrowRight />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ⭐ INTERACTIVE JOB APPLICATION MODAL POPUP */}
      {selectedJobForApply && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(8, 34, 51, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
          onClick={() => setSelectedJobForApply(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              maxWidth: '620px',
              width: '100%',
              padding: '2.2rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div>
                <span style={{ background: '#fff7ed', color: '#ea580c', fontSize: '0.74rem', fontWeight: 800, padding: '3px 10px', borderRadius: '10px', textTransform: 'uppercase' }}>
                  {selectedJobForApply.department}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#082233', margin: '6px 0 2px' }}>
                  Apply for {selectedJobForApply.title}
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  📍 {selectedJobForApply.location} • ⏳ {selectedJobForApply.type}
                </span>
              </div>
              <button 
                onClick={() => setSelectedJobForApply(null)}
                style={{ background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>

            {appSubmittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem' }}>
                  <FiCheckCircle />
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#082233', margin: '0 0 8px' }}>
                  Application Submitted!
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 20px' }}>
                  Thank you, <strong>{applyForm.name}</strong>! Your application for <strong>{selectedJobForApply.title}</strong> has been transmitted to our recruitment team.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  style={{ background: '#082233', color: '#ffffff', padding: '10px 24px', borderRadius: '25px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleJobApplicationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '4px' }}>Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '4px' }}>Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '4px' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 9876543210"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '4px' }}>Years of Experience</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 3+ Years"
                      value={applyForm.experience}
                      onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* RESUME UPLOAD SECTION */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '6px' }}>
                    Upload Resume / CV (PDF, DOCX, TXT)
                  </label>
                  
                  {applyForm.resumeFileName ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fff7ed',
                      border: '1.5px solid #ff6b00',
                      borderRadius: '12px',
                      padding: '10px 16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div style={{ background: '#ff6b00', color: '#fff', width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FiFileText size={18} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#082233', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {applyForm.resumeFileName}
                          </p>
                          <span style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600 }}>
                            {applyForm.resumeFileSize} • Ready to submit
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveResume}
                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        title="Remove attached resume"
                      >
                        <FiTrash2 size={13} /> Change
                      </button>
                    </div>
                  ) : (
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      border: '1.5px dashed #cbd5e1',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff6b00'; e.currentTarget.style.background = '#fff7ed'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; }}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleResumeUpload}
                        style={{ display: 'none' }}
                      />
                      <div style={{ background: '#ff6b00', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiUpload size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#082233', display: 'block' }}>
                          Upload Resume / CV File (Click to browse)
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Supported: PDF, DOC, DOCX, TXT (Max 10MB)
                        </span>
                      </div>
                    </label>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '4px' }}>Portfolio / GitHub / LinkedIn Profile (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://github.com/yourhandle or https://linkedin.com/in/..."
                    value={applyForm.portfolio}
                    onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#082233', marginBottom: '4px' }}>Cover Note / Resume Summary / Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Highlight your key achievements, tech stack expertise, and why you are a great fit..."
                    value={applyForm.coverLetter}
                    onChange={(e) => setApplyForm({ ...applyForm, coverLetter: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedJobForApply(null)}
                    style={{ background: '#f1f5f9', color: '#475569', padding: '10px 20px', borderRadius: '25px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingApp}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                      color: '#ffffff',
                      padding: '10px 26px',
                      borderRadius: '25px',
                      border: 'none',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(255, 107, 0, 0.35)'
                    }}
                  >
                    {isSubmittingApp ? 'Submitting Application...' : 'Send Application →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DYNAMIC CUSTOM SECTIONS */}
      <DynamicPageSections page="team" />

      {/* Modern High-Impact Contact Section */}
      <section className="contact-cta-section dark-gradient-bg">
        <div className="container">
          <div className="team-cta relative-overflow">
            <div className="cta-glow-circle-1"></div>
            <div className="cta-glow-circle-2"></div>
            
            <div className="relative-z">
              <h2>Let’s Build Something <span className="title-gradient-accent">Meaningful</span></h2>
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
