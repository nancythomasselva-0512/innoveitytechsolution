import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPhone, FiMail, FiMapPin, FiClock, 
  FiUser, FiBriefcase, FiFileText, FiCheckCircle 
} from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useCMS } from '../context/CMSContext';
import DynamicPageSections from '../components/UI/DynamicPageSections';
import './ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { contact, addInquiry } = useCMS();

  // Dynamic rotating words for hero heading
  const rotatingWords = [
    'collaborations.',
    'new projects.',
    'experiences.',
    'digital products.',
    'innovative ideas.'
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.message) {
      setIsSubmitting(true);

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_mnicjda";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_y0z2q8n";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "3gidmTWvW9XfHvxyK";
      const targetEmail = (contact && contact.email) ? contact.email : "aachinancy@gmail.com";

      const fullDetailsSummary = `
📌 NEW WEBSITE CONTACT INQUIRY
----------------------------------------
👤 Name: ${formData.firstName} ${formData.lastName}`.trim() + `
📧 Sender Email: ${formData.email}
📞 Phone Number: ${formData.phone || 'N/A'}
🏢 Company/Org: ${formData.company || 'N/A'}
🏷️ Subject: ${formData.subject || 'General Inquiry'}

💬 Message Content:
${formData.message}
----------------------------------------
`;

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        user_name: `${formData.firstName} ${formData.lastName}`.trim(),
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        user_email: formData.email,
        reply_to: formData.email,
        email: formData.email,
        phone: formData.phone || 'N/A',
        company: formData.company || 'N/A',
        subject: formData.subject || 'General Inquiry',
        message: fullDetailsSummary,
        to_email: targetEmail,
        to_name: 'Innoveity Admin'
      };

      if (addInquiry) {
        addInquiry({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone || 'N/A',
          company: formData.company || 'N/A',
          subject: formData.subject || 'General Inquiry',
          message: formData.message
        });
      }

      try {
        emailjs.init(publicKey);
        const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log("EmailJS response log:", res);
      } catch (err) {
        console.warn("EmailJS primary send fallback triggered:", err);
        try {
          await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
            method: "POST",
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(templateParams)
          });
        } catch (fallbackErr) {
          console.error("Form submission fallback error:", fallbackErr);
        }
      } finally {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: ''
          });
        }, 4000);
      }
    }
  };

  return (
    <div className="contact-modern-page">
      
      {/* Soft Ambient Mesh Glow Backdrop */}
      <div className="contact-ambient-canvas">
        <div className="canvas-blob blob-top-left"></div>
        <div className="canvas-blob blob-bottom-right"></div>
      </div>

      {/* Editorial Dynamic Word Rotator Hero Section */}
      <div className="contact-rotator-hero">
        <div className="rotator-line-1">
          <span className="rotator-text-normal">Let’s make </span>
          <span className="rotator-text-italic">something </span>
          <span className="rotator-text-normal">great!</span>
        </div>

        <div className="rotator-line-2">
          <a href="#contact-form" className="reach-out-pill-btn">
            Reach out
          </a>
          <a href="mailto:contact@innoveitytech.com" className="rotator-email-link">
            contact@innoveitytech.com
          </a>
        </div>

        <div className="rotator-line-3">
          <span className="rotator-text-normal">for </span>
          <div className="rotator-underline-wrapper">
            <span className="descriptor-word">wonderful</span>
            <div className="underline-stroke"></div>
          </div>
          <div className="rotating-word-container">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rotating-word-text"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="rotator-star-icon">✳</span>
        </div>
      </div>

      {/* Main Centered White Glass Card */}
      <div className="contact-main-card-container" id="contact-form">
        
        {/* Left Column: Contact Information */}
        <div className="contact-info-col">
          
          <h2 className="info-title">Contact information</h2>
          <p className="info-subtitle">
            We help you find direction, remove friction, and keep your business moving forward—strategically and confidently.
          </p>

          <div className="info-items-list">
            
            {/* Phone */}
            <a href={`tel:${(contact.phone || '+91 7904327211').replace(/\s+/g, '')}`} className="info-item-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="info-icon-outline">
                <FiPhone />
              </div>
              <span className="info-text-val">{contact.phone || '+91 7904327211'}</span>
            </a>

            {/* Email */}
            <a href={`mailto:${contact.email || 'aachinancy@gmail.com'}`} className="info-item-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="info-icon-outline">
                <FiMail />
              </div>
              <span className="info-text-val">{contact.email || 'aachinancy@gmail.com'}</span>
            </a>

            {/* Address */}
            <div className="info-item-row">
              <div className="info-icon-outline">
                <FiMapPin />
              </div>
              <span className="info-text-val">
                MCC MRF Innovation Park, East Tambaram,<br />
                Chennai - 600059
              </span>
            </div>

            {/* Business Hours */}
            <div className="info-item-row">
              <div className="info-icon-outline">
                <FiClock />
              </div>
              <span className="info-text-val">Monday – Friday, 9:00 AM – 6:00 PM</span>
            </div>

          </div>

          {/* Interactive Map Box */}
          <div className="contact-map-frame">
            <iframe 
              title="Innoveity Tech Location Map"
              src="https://maps.google.com/maps?q=MCC%20MRF%20Innovation%20Park%20East%20Tambaram%20Chennai%20600059&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

        {/* Right Column: Send Us a Message Form */}
        <div className="contact-form-col">
          
          <h2 className="form-title">Send Us a Message</h2>
          <p className="form-subtitle">
            Fill up the form and our team will get back to you within 24 hours.
          </p>

          {isSubmitted ? (
            <div className="form-success-box">
              <FiCheckCircle className="success-icon" />
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out to Innoveity Tech Solution. We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modern-contact-form">
              
              {/* Row 1: First Name & Last Name */}
              <div className="form-row-2col">
                <div className="input-group-with-icon">
                  <label htmlFor="firstName">First name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-field-icon" />
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName" 
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="input-group-with-icon">
                  <label htmlFor="lastName">Last name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-field-icon" />
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName" 
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="form-row-2col">
                <div className="input-group-with-icon">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <FiMail className="input-field-icon" />
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="input-group-with-icon">
                  <label htmlFor="phone">Phone</label>
                  <div className="input-wrapper">
                    <FiPhone className="input-field-icon" />
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Company Name & Subject */}
              <div className="form-row-2col">
                <div className="input-group-with-icon">
                  <label htmlFor="company">Company Name</label>
                  <div className="input-wrapper">
                    <FiBriefcase className="input-field-icon" />
                    <input 
                      type="text" 
                      id="company"
                      name="company" 
                      placeholder="Enter company name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-group-with-icon">
                  <label htmlFor="subject">Subject</label>
                  <div className="input-wrapper">
                    <FiFileText className="input-field-icon" />
                    <input 
                      type="text" 
                      id="subject"
                      name="subject" 
                      placeholder="Enter Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Message Textarea */}
              <div className="input-group-with-icon full-width-group">
                <label htmlFor="message">Message</label>
                <div className="input-wrapper textarea-wrapper">
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Type here . . ."
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-action-row">
                <button type="submit" className="btn-modern-send" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* DYNAMIC CUSTOM SECTIONS */}
      <DynamicPageSections page="contact" />

    </div>
  );
};

export default ContactPage;
