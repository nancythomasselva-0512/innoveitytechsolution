import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out to Innoveity Tech Solution! Your message has been sent successfully.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="contact-modern-section section-padding">
      <div className="container contact-max-wrapper">
        
        {/* Top Header Banner Card */}
        <motion.div 
          className="contact-top-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Sparkle Vector Top-Left */}
          <div className="banner-sparkle-left">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <path d="M50 0 C50 25 75 50 100 50 C75 50 50 75 50 100 C50 75 25 50 0 50 C25 50 50 25 50 0 Z" fill="rgba(167, 243, 208, 0.45)" />
              <path d="M20 10 C20 18 28 25 35 25 C28 25 20 32 20 40 C20 32 12 25 5 25 C12 25 20 18 20 10 Z" fill="rgba(110, 231, 183, 0.55)" />
            </svg>
          </div>

          {/* Lightning Circle Right */}
          <div className="banner-circle-right">
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="70" stroke="rgba(167, 243, 208, 0.55)" strokeWidth="6" />
              <path d="M85 45 L65 85 H85 L75 115 L95 75 H75 Z" fill="rgba(110, 231, 183, 0.65)" />
            </svg>
          </div>

          {/* Centered Top Badge */}
          <div className="banner-pill-badge">
            <span>Innoveity / Contact</span>
          </div>

          {/* Main Title */}
          <h2 className="banner-main-title">Lets Work Together</h2>
        </motion.div>

        {/* Main 2-Column Grid */}
        <div className="contact-main-grid">
          
          {/* Left Column: Info & Map Card */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            {/* Top Contact Details Row */}
            <div className="info-grid-items">
              {/* Call us */}
              <div className="info-detail-box">
                <div className="info-green-icon">
                  <FiPhone size={20} />
                </div>
                <div className="info-detail-text">
                  <span className="detail-label">CALL US</span>
                  <p className="detail-value">+1 (555) 325 - 2543</p>
                </div>
              </div>

              {/* Email */}
              <div className="info-detail-box">
                <div className="info-green-icon">
                  <FiMail size={20} />
                </div>
                <div className="info-detail-text">
                  <span className="detail-label">EMAIL</span>
                  <p className="detail-value">hello@innoveitytech.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="info-detail-box full-width">
                <div className="info-green-icon">
                  <FiMapPin size={20} />
                </div>
                <div className="info-detail-text">
                  <span className="detail-label">LOCATION</span>
                  <p className="detail-value">123 Innovation Drive, Tech City, TC 90210</p>
                </div>
              </div>
            </div>

            {/* Embedded City Map Vector Illustration */}
            <div className="contact-map-box">
              <div className="map-grid-overlay">
                <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Street Lines */}
                  <rect width="400" height="200" fill="#f1f5f9" />
                  <path d="M0 40 H400 M0 110 H400 M0 160 H400" stroke="#ffffff" strokeWidth="12" />
                  <path d="M70 0 V200 M180 0 V200 M310 0 V200" stroke="#ffffff" strokeWidth="12" />
                  <path d="M30 0 L140 200" stroke="#ffffff" strokeWidth="8" />
                  {/* Street Names */}
                  <text x="80" y="32" fill="#94a3b8" fontSize="10" fontWeight="600">Innovation Blvd</text>
                  <text x="190" y="102" fill="#94a3b8" fontSize="10" fontWeight="600">Tech Center Ave</text>
                </svg>
              </div>

              {/* Location Marker Pin */}
              <div className="map-pin-pulse">
                <div className="pin-circle">
                  <FiMapPin size={18} color="#ffffff" />
                </div>
                <div className="pulse-ring"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form Card */}
          <motion.div 
            className="contact-form-card"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <form className="contact-form-elements" onSubmit={handleSubmit}>
              
              {/* Row 1: Name & Email */}
              <div className="form-two-cols">
                <div className="form-field-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Arifbillah" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="hello@innoveitytech.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="form-field-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="How can we help your business?" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>

              {/* Row 3: Leave us messages */}
              <div className="form-field-group">
                <label htmlFor="message">Lave us messages</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  placeholder="Tell us about your project requirements..." 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-submit-row">
                <motion.button 
                  type="submit" 
                  className="pill-btn-send"
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Messages
                </motion.button>
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
