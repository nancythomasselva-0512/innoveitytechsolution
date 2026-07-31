import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiCheckCircle, FiHeadphones } from 'react-icons/fi';
import { useCMS } from '../context/CMSContext';
import './ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { contact } = useCMS();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="contact-premium-page">
      <div className="contact-bg-text">CONTACT</div>
      <div className="contact-glow"></div>
      
      <div className="contact-premium-container">
        
        {/* Left Side: Info */}
        <div className="contact-premium-left">
          <div className="contact-header-badge">
            <FiMail /> Contact
          </div>
          <h1 className="contact-premium-title">Get in touch</h1>
          <p className="contact-premium-subtitle">
            Have questions or ready to transform your business with innovative technology solutions? Let's talk.
          </p>

          <div className="contact-premium-cards">
            <div className="contact-premium-card">
              <div className="cp-card-icon"><FiMail /></div>
              <div className="cp-card-content">
                <span className="cp-card-label">Email us</span>
                <span className="cp-card-value">{contact.email}</span>
              </div>
              <div className="cp-card-arrow"><FiArrowUpRight /></div>
            </div>

            <div className="contact-premium-card">
              <div className="cp-card-icon"><FiPhone /></div>
              <div className="cp-card-content">
                <span className="cp-card-label">Call us</span>
                <span className="cp-card-value">{contact.phone}</span>
              </div>
              <div className="cp-card-arrow"><FiArrowUpRight /></div>
            </div>

            <div className="contact-premium-card">
              <div className="cp-card-icon"><FiMapPin /></div>
              <div className="cp-card-content">
                <span className="cp-card-label">Our location</span>
                <span className="cp-card-value" style={{ whiteSpace: 'pre-line' }}>{contact.address}</span>
              </div>
              <div className="cp-card-arrow"><FiArrowUpRight /></div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact-premium-right">
          <div className="contact-form-glass">
            {isSubmitted ? (
              <div className="contact-success-state">
                <FiCheckCircle className="success-icon-large" />
                <h3>Message Sent</h3>
                <p>We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-premium-form">
                <div className="cp-input-group">
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Name" 
                    required 
                  />
                </div>
                <div className="cp-input-group">
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Email" 
                    required 
                  />
                </div>
                <div className="cp-input-group">
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Message" 
                    rows="6"
                    required 
                  ></textarea>
                </div>
                <button type="submit" className="cp-submit-btn">Submit</button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* NEW SECTION: Global Support Cards & Map */}
      <div className="contact-global-section">


        <div className="contact-map-section">
          <div className="map-dots-bg"></div>
          
          {/* Glowing Map Point (India) */}
          <div className="map-point point-india"><span></span></div>

          <div className="map-floating-card">
            <h3>Based in India</h3>
            <p>From our headquarters in Chennai, India, we deliver innovative solutions globally.</p>
            <a href="#contact" className="map-explore-link">Get in Touch</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;
