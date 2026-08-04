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
  const { contact } = useCMS();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleExploreOptions = () => {
    navigate('/services');
  };

  const hideCtaBanner = location.pathname === '/projects' || location.pathname === '/services' || location.pathname === '/team' || location.pathname === '/contact' || location.pathname.startsWith('/privacy') || location.pathname.startsWith('/terms') || location.pathname.startsWith('/refund');

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
            <span>SMART, SCALABLE</span>
          </div>

          {/* Large Title */}
          <h2 className="cta-main-title">
            Ready To Begin Building<br />
            Digital Future Securely?
          </h2>

          {/* Action Buttons */}
          <div className="cta-btn-group">
            <button className="pill-btn-get-started" onClick={handleGetStarted}>
              <span>Get Started</span>
              <div className="cta-arrow-circle">
                <FiArrowUpRight size={16} />
              </div>
            </button>

            <button className="pill-btn-see-options" onClick={handleExploreOptions}>
              See Technology Options
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
                <InnoveityBrandLogo size={32} showText={true} />
              </div>
              <div className="brand-legal-info">
                <p>Operated by Innoveity Tech Solution Ltd.</p>
                <p>{contact?.address || 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059'}</p>
                <p><a href={`tel:${contact?.phone || '+91 7904327211'}`} style={{ color: 'inherit', textDecoration: 'none' }}>{contact?.phone || '+91 7904327211'}</a></p>
                <p><a href={`mailto:${contact?.email || 'aachinancy@gmail.com'}`} style={{ color: 'inherit', textDecoration: 'none' }}>{contact?.email || 'aachinancy@gmail.com'}</a></p>
              </div>
            </div>

            {/* Column 2: Address */}
            <div className="footer-col">
              <h4 className="footer-col-title">Address & Desk</h4>
              <ul className="footer-col-list address-list">
                <li>{contact?.address || 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059'}</li>
                <li>Phone: <a href={`tel:${contact?.phone || '+91 7904327211'}`} style={{ color: '#10b981', textDecoration: 'none' }}>{contact?.phone || '+91 7904327211'}</a></li>
                <li>Email: <a href={`mailto:${contact?.email || 'aachinancy@gmail.com'}`} style={{ color: '#10b981', textDecoration: 'none' }}>{contact?.email || 'aachinancy@gmail.com'}</a></li>
                <li>Hours: Mon - Fri, 9:00 AM - 6:00 PM</li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="footer-col">
              <h4 className="footer-col-title">Solutions</h4>
              <ul className="footer-col-list">
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
                <li><a href="#"><FaXTwitter className="social-icon" /> X.com</a></li>
                <li><a href="#"><FaInstagram className="social-icon" /> Instagram</a></li>
                <li><a href="#"><FaFacebookF className="social-icon" /> Facebook</a></li>
                <li><a href="#"><FaLinkedinIn className="social-icon" /> LinkedIn</a></li>
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
              © {new Date().getFullYear()} Innoveity Tech Solution. All rights reserved.
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
