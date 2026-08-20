import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiArrowUpRight, FiLock } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { InnoveityBrandLogo } from '../Navbar/Navbar';
import { useCMS } from '../../context/CMSContext';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact, headerFooterSettings } = useCMS();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleExploreOptions = () => {
    navigate('/services');
  };

  const hideCtaBanner = location.pathname === '/projects' || location.pathname === '/services' || location.pathname === '/team' || location.pathname === '/contact' || location.pathname.startsWith('/privacy') || location.pathname.startsWith('/terms') || location.pathname.startsWith('/refund');

  const operatingCompany = headerFooterSettings?.operatingCompany || 'Operated by Innoveity Tech Solution Ltd.';
  const address = headerFooterSettings?.address || contact?.address || 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059';
  const phone = headerFooterSettings?.phone || contact?.phone || '+91 7904327211';
  const email = headerFooterSettings?.email || contact?.email || 'aachinancy@gmail.com';
  const hours = headerFooterSettings?.hours || 'Mon - Fri, 9:00 AM - 6:00 PM';
  const twitterUrl = headerFooterSettings?.twitterUrl || '#';
  const instagramUrl = headerFooterSettings?.instagramUrl || '#';
  const facebookUrl = headerFooterSettings?.facebookUrl || '#';
  const linkedinUrl = headerFooterSettings?.linkedinUrl || '#';
  const ctaBadge = headerFooterSettings?.ctaBadge || 'SMART, SCALABLE';
  const ctaTitle = headerFooterSettings?.ctaTitle || 'Ready To Begin Building Digital Future Securely?';
  const ctaPrimaryBtnText = headerFooterSettings?.ctaPrimaryBtnText || 'Get Started';
  const ctaSecondaryBtnText = headerFooterSettings?.ctaSecondaryBtnText || 'See Technology Options';
  const copyrightText = headerFooterSettings?.copyrightText || `© ${new Date().getFullYear()} Innoveity Tech Solution. All rights reserved.`;

  return (
    <footer className="footer-wrapper">
      <div className="container">
        
        {/* Top CTA Banner Card - Hidden on specific pages */}
        {!hideCtaBanner && (
        <motion.div 
          className="footer-cta-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Grid Backdrop Overlay */}
          <div className="cta-grid-overlay"></div>

          {/* Centered Top Kicker Badge */}
          <div className="cta-pill-badge">
            <FiLock size={12} style={{ marginRight: '6px' }} />
            <span>{ctaBadge}</span>
          </div>

          {/* Large Title */}
          <h2 className="cta-main-title" style={{ whiteSpace: 'pre-line' }}>
            {ctaTitle}
          </h2>

          {/* Action Buttons */}
          <div className="cta-btn-group">
            <button className="pill-btn-get-started" onClick={handleGetStarted}>
              <span>{ctaPrimaryBtnText}</span>
              <div className="cta-arrow-circle">
                <FiArrowUpRight size={16} />
              </div>
            </button>

            <button className="pill-btn-see-options" onClick={handleExploreOptions}>
              {ctaSecondaryBtnText}
            </button>
          </div>
        </motion.div>
        )}

        <div className="footer-content-divider"></div>
        <div className="footer-main-dark">
          
          {/* 5 Column Grid */}
          <div className="footer-columns-grid">
            
            {/* Column 1: Brand & Registration */}
            <div className="footer-col col-brand">
              <div className="footer-brand-logo-box">
                <InnoveityBrandLogo size={40} showText={true} />
              </div>
              <div className="brand-legal-info">
                <p>{operatingCompany}</p>
                <p>{address}</p>
                <p><a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{phone}</a></p>
                <p><a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{email}</a></p>
              </div>
            </div>

            {/* Column 2: Address */}
            <div className="footer-col">
              <h4 className="footer-col-title">Address & Desk</h4>
              <ul className="footer-col-list address-list">
                <li>{address}</li>
                <li>Phone: <a href={`tel:${phone}`} style={{ color: '#10b981', textDecoration: 'none' }}>{phone}</a></li>
                <li>Email: <a href={`mailto:${email}`} style={{ color: '#10b981', textDecoration: 'none' }}>{email}</a></li>
                <li>Hours: {hours}</li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="footer-col">
              <h4 className="footer-col-title">Solutions</h4>
              <ul className="footer-col-list">
                <li><a href="/media">Media Division</a></li>
                <li><a href="/services">Web Development</a></li>
                <li><a href="/services">Mobile Engineering</a></li>
                <li><a href="/services">Enterprise Software</a></li>
                <li><a href="/services">Cloud Infrastructure</a></li>
                <li><a href="/services">AI Integration</a></li>
                <li><a href="/services">ProtectionPlus</a></li>
              </ul>
            </div>

            {/* Column 4: Company Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-col-list">
                <li><a href="/about">About Us</a></li>
                <li><a href="/team">Our Team</a></li>
                <li><a href="/projects">Portfolio & Projects</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/team">Careers</a></li>
                <li><a href="/contact">Verification</a></li>
              </ul>
            </div>

            {/* Column 5: Connect Social Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Connect</h4>
              <ul className="footer-col-list social-list">
                <li><a href={twitterUrl} target="_blank" rel="noopener noreferrer"><FaXTwitter className="social-icon" /> X.com</a></li>
                <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /> Instagram</a></li>
                <li><a href={facebookUrl} target="_blank" rel="noopener noreferrer"><FaFacebookF className="social-icon" /> Facebook</a></li>
                <li><a href={linkedinUrl} target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="social-icon" /> LinkedIn</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="footer-legal-bar">
            <div className="legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/refund-policy">Refund Policy</Link>
            </div>

            <div className="legal-center-logo">
              <span>❖</span>
            </div>

            <div className="copyright-text">
              {copyrightText}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
