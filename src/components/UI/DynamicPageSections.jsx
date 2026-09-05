import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowUpRight, FiCheckCircle, FiChevronDown, 
  FiLayers, FiZap, FiStar, FiShield, FiTrendingUp 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCMS } from '../../context/CMSContext';
import './DynamicPageSections.css';

const DynamicPageSections = ({ page = 'home' }) => {
  const { customPageSections } = useCMS();
  const [openFaqIndex, setOpenFaqIndex] = useState({});

  const sections = (customPageSections && customPageSections[page]) 
    ? customPageSections[page].filter(sec => sec.active !== false)
    : [];

  if (!sections || sections.length === 0) {
    return null;
  }

  const toggleFaq = (secId, itemIdx) => {
    setOpenFaqIndex(prev => ({
      ...prev,
      [`${secId}-${itemIdx}`]: !prev[`${secId}-${itemIdx}`]
    }));
  };

  return (
    <div className="dynamic-custom-sections-wrapper">
      {sections.map((sec, secIdx) => {
        const themeClass = sec.theme === 'light' 
          ? 'dynamic-theme-light' 
          : (sec.theme === 'sunset' ? 'dynamic-theme-sunset' : 'dynamic-theme-dark');

        return (
          <section key={sec.id || `custom-sec-${secIdx}`} className={`dynamic-section-block ${themeClass}`}>
            <div className="container">
              
              {/* 1. SECTION HEADER (For non-CTA-banner or with title) */}
              {sec.type !== 'banner_cta' && (sec.title || sec.badge) && (
                <motion.div 
                  className="dyn-sec-header"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55 }}
                >
                  {sec.badge && (
                    <span className="dyn-sec-badge">
                      <FiZap size={13} /> {sec.badge}
                    </span>
                  )}
                  {sec.title && <h2 className="dyn-sec-title">{sec.title}</h2>}
                  {sec.subtitle && <p className="dyn-sec-subtitle">{sec.subtitle}</p>}
                </motion.div>
              )}

              {/* 2. LAYOUT: FEATURES GRID */}
              {sec.type === 'features_grid' && sec.items && (
                <div className="dyn-features-grid">
                  {sec.items.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="dyn-feature-card"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {item.tag && <span className="dyn-card-tag">{item.tag}</span>}
                      <h3 className="dyn-card-title">{item.title}</h3>
                      <p className="dyn-card-desc">{item.desc || item.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 3. LAYOUT: CTA BANNER */}
              {sec.type === 'banner_cta' && (
                <motion.div 
                  className="dyn-banner-cta"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  {sec.badge && (
                    <span className="dyn-sec-badge" style={{ marginBottom: '20px' }}>
                      <FiStar size={13} /> {sec.badge}
                    </span>
                  )}
                  {sec.title && <h2 className="dyn-sec-title" style={{ maxWidth: '820px', margin: '0 auto 18px' }}>{sec.title}</h2>}
                  {sec.subtitle && <p className="dyn-sec-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>{sec.subtitle}</p>}

                  <div className="dyn-cta-actions">
                    {sec.ctaText && (
                      <Link to={sec.ctaUrl || '/contact'} className="dyn-btn-primary">
                        <span>{sec.ctaText}</span>
                        <FiArrowUpRight size={18} />
                      </Link>
                    )}
                    {sec.secondaryCtaText && (
                      <Link to={sec.secondaryCtaUrl || '/services'} className="dyn-btn-secondary">
                        <span>{sec.secondaryCtaText}</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}

              {/* 4. LAYOUT: STATS GRID */}
              {sec.type === 'stats_grid' && sec.items && (
                <div className="dyn-stats-grid">
                  {sec.items.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      className="dyn-stat-box"
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <span className="dyn-stat-number">{stat.number}</span>
                      <span className="dyn-stat-label">{stat.label}</span>
                      {stat.desc && <p className="dyn-stat-desc">{stat.desc}</p>}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 5. LAYOUT: FAQ ACCORDION */}
              {sec.type === 'faq_accordion' && sec.items && (
                <div className="dyn-faq-container">
                  {sec.items.map((faq, idx) => {
                    const isOpen = !!openFaqIndex[`${sec.id}-${idx}`];
                    return (
                      <div 
                        key={idx} 
                        className={`dyn-faq-item ${isOpen ? 'open' : ''}`}
                      >
                        <button 
                          className="dyn-faq-question-btn"
                          onClick={() => toggleFaq(sec.id, idx)}
                          type="button"
                        >
                          <span>{faq.question || faq.q}</span>
                          <div className="dyn-faq-icon">
                            <FiChevronDown size={18} />
                          </div>
                        </button>
                        {isOpen && (
                          <motion.div 
                            className="dyn-faq-answer"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            <p style={{ margin: 0 }}>{faq.answer || faq.a}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 6. LAYOUT: SPLIT VISUAL & CONTENT */}
              {sec.type === 'info_split' && (
                <div className="dyn-split-grid">
                  <motion.div 
                    className="dyn-split-visual"
                    initial={{ opacity: 0, x: -35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <img 
                      src={sec.mediaUrl || '/tech_blog_featured.png'} 
                      alt={sec.title || 'Visual'} 
                      className="dyn-split-img"
                    />
                  </motion.div>

                  <motion.div 
                    className="dyn-split-content"
                    initial={{ opacity: 0, x: 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {sec.badge && <span className="dyn-sec-badge">{sec.badge}</span>}
                    {sec.title && <h2 className="dyn-sec-title" style={{ textAlign: 'left' }}>{sec.title}</h2>}
                    {sec.subtitle && <p className="dyn-sec-subtitle" style={{ textAlign: 'left', marginBottom: '20px' }}>{sec.subtitle}</p>}

                    {sec.items && sec.items.length > 0 && (
                      <div className="dyn-split-bullets">
                        {sec.items.map((b, i) => (
                          <div key={i} className="dyn-split-bullet-item">
                            <FiCheckCircle className="dyn-bullet-check" size={18} />
                            <span><strong>{b.title ? `${b.title}: ` : ''}</strong>{b.desc || b.text || b}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.ctaText && (
                      <Link to={sec.ctaUrl || '/contact'} className="dyn-btn-primary" style={{ marginTop: '16px' }}>
                        <span>{sec.ctaText}</span>
                        <FiArrowUpRight size={18} />
                      </Link>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Optional Section-wide CTA link if present on feature/stats grids */}
              {sec.type !== 'banner_cta' && sec.type !== 'info_split' && sec.ctaText && (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <Link to={sec.ctaUrl || '/contact'} className="dyn-btn-primary">
                    <span>{sec.ctaText}</span>
                    <FiArrowUpRight size={18} />
                  </Link>
                </div>
              )}

            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DynamicPageSections;
