import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiFileText, FiRefreshCw, FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = ({ activeTab: initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="privacy-page-wrapper">
      <div className="privacy-container">
        
        {/* Navigation / Tab Bar for Legal Documents */}
        <div className="legal-tabs-nav">
          <button 
            className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <FiShield size={16} /> Privacy Policy
          </button>
          <button 
            className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            <FiFileText size={16} /> Terms of Service
          </button>
          <button 
            className={`tab-btn ${activeTab === 'refund' ? 'active' : ''}`}
            onClick={() => setActiveTab('refund')}
          >
            <FiRefreshCw size={16} /> Refund Policy
          </button>
        </div>

        {/* ================= PRIVACY POLICY CONTENT ================= */}
        {activeTab === 'privacy' && (
          <motion.div 
            className="policy-card-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="policy-header">
              <h1 className="policy-title">Privacy Policy</h1>
              <p className="policy-date">Last Updated: January 2026</p>
            </div>

            {/* Intro Paragraph */}
            <p className="policy-intro">
              <span className="brand-highlight">INNOVEITY TECH</span> respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            {/* Section 1 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">1.</span> Information We Collect
              </h2>
              <p className="section-desc">
                We may collect personal and non-personal information, including but not limited to:
              </p>
              <ul className="policy-bullets">
                <li>Name, email address, phone number, and business details</li>
                <li>Account and communication information</li>
                <li>Payment-related information (processed securely by third-party gateways)</li>
                <li>Technical data such as IP address, browser type, and usage activity</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">2.</span> How We Use Your Information
              </h2>
              <ul className="policy-bullets">
                <li>To provide, operate, and improve our services</li>
                <li>To communicate with you regarding projects, services, or support</li>
                <li>To process transactions and send important notices</li>
                <li>To comply with legal and regulatory obligations</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">3.</span> Data Sharing and Disclosure
              </h2>
              <p className="section-desc">
                We do not sell your personal data. We may share information only with trusted service providers, payment processors, legal authorities (if required), or with your explicit consent.
              </p>
            </div>

            {/* Section 4 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">4.</span> Data Security
              </h2>
              <p className="section-desc">
                We implement reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            {/* Section 5 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">5.</span> Cookies and Tracking
              </h2>
              <p className="section-desc">
                We may use cookies and similar technologies to enhance user experience, analyze traffic, and improve our services. You can control cookies through your browser settings.
              </p>
            </div>

            {/* Section 6 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">6.</span> Your Rights
              </h2>
              <ul className="policy-bullets">
                <li>Request access to your personal data</li>
                <li>Request correction or deletion of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">7.</span> Changes to This Policy
              </h2>
              <p className="section-desc">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
              </p>
            </div>

            {/* Divider */}
            <div className="policy-divider"></div>

            {/* Contact Box */}
            <div className="policy-contact-box">
              <p>If you have questions about this Privacy Policy, contact us at:</p>
              <a href="mailto:contact@innoveitytech.com" className="contact-email">
                <FiMail size={18} /> contact@innoveitytech.com
              </a>
            </div>
          </motion.div>
        )}

        {/* ================= TERMS OF SERVICE CONTENT ================= */}
        {activeTab === 'terms' && (
          <motion.div 
            className="policy-card-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="policy-header">
              <h1 className="policy-title">Terms of Service</h1>
              <p className="policy-date">Last Updated: January 2026</p>
            </div>

            <p className="policy-intro">
              Welcome to <span className="brand-highlight">INNOVEITY TECH</span>. These Terms of Service govern your access to and use of our website, products, and services. By using our services, you agree to these terms.
            </p>

            <div className="policy-section">
              <h2 className="section-heading"><span className="sec-num">1.</span> Services</h2>
              <p className="section-desc">
                <span className="brand-highlight">INNOVEITY TECH</span> provides software development, web and mobile applications, SaaS platforms, and digital technology services.
              </p>
            </div>

            <div className="policy-section">
              <h2 className="section-heading"><span className="sec-num">2.</span> Payments</h2>
              <p className="section-desc">
                All payments are subject to agreed proposals, invoices, or subscriptions. Payments are processed via secure third-party gateways.
              </p>
            </div>

            <div className="policy-section">
              <h2 className="section-heading"><span className="sec-num">3.</span> Intellectual Property</h2>
              <p className="section-desc">
                All intellectual property remains with <span className="brand-highlight">INNOVEITY TECH</span> unless otherwise agreed in writing.
              </p>
            </div>

            <div className="policy-section">
              <h2 className="section-heading"><span className="sec-num">4.</span> User Responsibilities</h2>
              <p className="section-desc">
                You agree not to misuse the platform or attempt unauthorized access.
              </p>
            </div>

            <div className="policy-section">
              <h2 className="section-heading"><span className="sec-num">5.</span> Limitation of Liability</h2>
              <p className="section-desc">
                <span className="brand-highlight">INNOVEITY TECH</span> shall not be liable for indirect or consequential damages.
              </p>
            </div>

            <div className="policy-section">
              <h2 className="section-heading"><span className="sec-num">6.</span> Governing Law</h2>
              <p className="section-desc">
                These terms are governed by the laws of India.
              </p>
            </div>

            <div className="policy-divider"></div>
            <div className="policy-contact-box">
              <p>For questions regarding our Terms of Service, contact us at:</p>
              <a href="mailto:contact@innoveitytech.com" className="contact-email">
                <FiMail size={18} /> contact@innoveitytech.com
              </a>
            </div>
          </motion.div>
        )}

        {/* ================= REFUND & CANCELLATION POLICY CONTENT ================= */}
        {activeTab === 'refund' && (
          <motion.div 
            className="policy-card-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="policy-header">
              <h1 className="policy-title">Refund & Cancellation Policy</h1>
              <p className="policy-date">Last Updated: January 2026</p>
            </div>

            {/* Section 1 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">1.</span> Cancellation
              </h2>
              <ul className="policy-bullets">
                <li>Cancellation requests must be emailed to contact@innoveitytech.com</li>
                <li>Projects already started are non-refundable</li>
                <li>Subscription cancellations apply to the next billing cycle</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">2.</span> Refunds
              </h2>
              <ul className="policy-bullets">
                <li>Refunds are only considered before work begins</li>
                <li>No refunds for delivered digital services</li>
                <li>Approved refunds are processed within 7–15 business days</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="policy-section">
              <h2 className="section-heading">
                <span className="sec-num">3.</span> Non-Refundable
              </h2>
              <p className="section-desc">
                Domain, hosting, licenses, consultation, and transaction fees are non-refundable.
              </p>
            </div>

            <div className="policy-divider"></div>
            <div className="policy-contact-box">
              <p>For questions regarding our Refund & Cancellation Policy, contact us at:</p>
              <a href="mailto:contact@innoveitytech.com" className="contact-email">
                <FiMail size={18} /> contact@innoveitytech.com
              </a>
            </div>
          </motion.div>
        )}

        {/* ================= NEWSLETTER CARD ("STAY UPDATED") ================= */}
        <motion.div 
          className="newsletter-card-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="newsletter-card-content">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-subtitle">
              Subscribe to our newsletter and get the latest insights on technology trends, industry news, and exclusive updates from Innoveity Tech.
            </p>

            {subscribed ? (
              <div className="subscribed-success">
                <FiCheckCircle size={20} className="success-icon" />
                <span>Thank you for subscribing! We'll keep you updated.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <div className="input-field-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    <span>Subscribe</span>
                    <FiSend size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Footer legal links bar inside policy page */}
        <div className="policy-legal-footer">
          <p>© {new Date().getFullYear()} Innoveity Tech Solution. All rights reserved. Crafted with innovation and precision.</p>
          <div className="policy-footer-links">
            <button className={activeTab === 'privacy' ? 'active-link' : ''} onClick={() => setActiveTab('privacy')}>Privacy Policy</button>
            <span className="dot">•</span>
            <button className={activeTab === 'terms' ? 'active-link' : ''} onClick={() => setActiveTab('terms')}>Terms of Service</button>
            <span className="dot">•</span>
            <button className={activeTab === 'refund' ? 'active-link' : ''} onClick={() => setActiveTab('refund')}>Refund Policy</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
