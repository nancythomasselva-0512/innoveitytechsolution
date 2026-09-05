import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiCpu, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCMS } from '../../context/CMSContext';
import './AboutSummary.css';

const AboutSummary = () => {
  const { homeContent } = useCMS();

  return (
    <section className="about-mosaic-section section-padding">
      <div className="container about-mosaic-container">
        
        {/* Left Side: Shaped Image Mosaic with Scroll Motion */}
        <motion.div 
          className="mosaic-left-col"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-left-tag-wrap">
            <h2 className="about-left-main-title">
              WHO WE <span className="title-gradient-accent">ARE</span>
            </h2>
            <h2 className="mosaic-main-heading">
              Technology Built Around <br />
              <span className="title-gradient-accent">Possibility.</span>
            </h2>
            <div className="mosaic-title-bar"></div>
          </div>

          <div className="mosaic-grid">
            {/* Tall Arch Left Image */}
            <motion.div 
              className="mosaic-card tall-arch"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src="/about_mosaic_1.png" alt="Innoveity Software Team" />
            </motion.div>

            {/* Right Stack Images */}
            <div className="mosaic-right-stack">
              <motion.div 
                className="mosaic-card top-capsule"
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src="/about_mosaic_2.png" alt="Tech Solutions Studio" />
              </motion.div>
              <motion.div 
                className="mosaic-card bottom-capsule"
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src="/about_mosaic_3.png" alt="Digital Transformation Meeting" />
              </motion.div>
            </div>
          </div>

          {/* Floating Camper / Tech Vehicle Badge bottom-left */}
          <motion.div 
            className="floating-camper-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="camper-icon">⚡</div>
            <div className="camper-text">
              <span>Innovation</span>
              <strong>On the Move</strong>
            </div>
          </motion.div>
        </motion.div>

        {/* Center Column: Text & Features */}
        <motion.div 
          className="mosaic-center-col"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mosaic-p-lead">
            Technology should do more than digitise an existing process.
          </p>

          <p className="mosaic-p-accent">
            It should make the process <strong>smarter, faster and more impactful.</strong>
          </p>

          <p className="mosaic-p-body">
            At <strong style={{ color: '#082233' }}>Innoveity Tech Solutions</strong>, we design and build intelligent digital solutions for businesses, institutions, startups and government organisations.
          </p>

          <p className="mosaic-p-body">
            From an idea on paper to a technology platform serving thousands of users, we bring together strategy, design, engineering, AI and automation to create solutions built for the real world.
          </p>

          <p className="mosaic-p-body" style={{ marginBottom: '18px' }}>
            Whether it is an AI-powered platform, an enterprise application, a smart mobility ecosystem or a scalable SaaS product, our approach remains the same:
          </p>

          {/* Impact Callout Card */}
          <motion.div 
            className="mosaic-impact-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="impact-target-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>
            <div className="impact-vertical-divider"></div>
            <div className="impact-steps-list">
              <div className="impact-step-item">
                <strong>Understand</strong> the challenge.
              </div>
              <div className="impact-step-item">
                <strong>Build</strong> the right technology.
              </div>
              <div className="impact-step-item">
                <strong>Create</strong> measurable impact.
              </div>
            </div>
          </motion.div>

          {/* CTA Pill Button */}
          <motion.div 
            className="mosaic-cta-group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link to="/about" className="pill-btn-mosaic">
              <span>Learn More</span>
              <FiArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSummary;
