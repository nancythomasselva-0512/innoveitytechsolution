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
              ABOUT <span className="title-gradient-accent">US</span>
            </h2>
            <h2 className="mosaic-main-heading">
              {homeContent.aboutTitle.split('\n').map((line, i) => (
                <span key={i} className={`mosaic-heading-line ${i === 1 ? 'title-gradient-accent' : ''}`}>
                  {line}
                </span>
              ))}
            </h2>
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
          <motion.span 
            className="script-kicker"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {homeContent.aboutKicker}
          </motion.span>

          <p className="mosaic-body-text" style={{ fontSize: '1.05rem', lineHeight: '1.75', marginTop: '12px' }}>
            {homeContent.aboutDesc}
          </p>

          {/* Feature Bullets */}
          <div className="mosaic-features-list">
            <motion.div 
              className="mosaic-feature-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="feature-circle-icon">
                <FiCode size={22} />
              </div>
              <div className="feature-text-group">
                <h4>{homeContent.aboutFeature1Title}</h4>
                <p>{homeContent.aboutFeature1Desc}</p>
              </div>
            </motion.div>

            <motion.div 
              className="mosaic-feature-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <div className="feature-circle-icon">
                <FiCpu size={22} />
              </div>
              <div className="feature-text-group">
                <h4>{homeContent.aboutFeature2Title}</h4>
                <p>{homeContent.aboutFeature2Desc}</p>
              </div>
            </motion.div>
          </div>

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
