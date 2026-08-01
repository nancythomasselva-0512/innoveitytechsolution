import React, { useState, useEffect } from 'react';
import { 
  FiPhone, FiMail, FiMapPin, FiClock, 
  FiUser, FiBriefcase, FiFileText, FiCheckCircle 
} from 'react-icons/fi';
import { useCMS } from '../context/CMSContext';
import './ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { contact } = useCMS();

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
      try {
        await fetch("https://formsubmit.co/ajax/websitet96@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New Contact Inquiry from ${formData.firstName} ${formData.lastName}`,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone || 'N/A',
            company: formData.company || 'N/A',
            subject: formData.subject || 'General Inquiry',
            message: formData.message
          })
        });
      } catch (err) {
        console.error("Notification submission log:", err);
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
        }, 5000);
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

      {/* Main Centered White Glass Card */}
      <div className="contact-main-card-container">
        
        {/* Left Column: Contact Information */}
        <div className="contact-info-col">
          
          <h2 className="info-title">Contact information</h2>
          <p className="info-subtitle">
            We help you find direction, remove friction, and keep your business moving forward—strategically and confidently.
          </p>

          <div className="info-items-list">
            
            {/* Phone */}
            <div className="info-item-row">
              <div className="info-icon-outline">
                <FiPhone />
              </div>
              <span className="info-text-val">{contact.phone || '+1 561 301 4406'}</span>
            </div>

            {/* Email */}
            <div className="info-item-row">
              <div className="info-icon-outline">
                <FiMail />
              </div>
              <span className="info-text-val">{contact.email || 'contact@innoveitytechsolution.com'}</span>
            </div>

            {/* Address */}
            <div className="info-item-row">
              <div className="info-icon-outline">
                <FiMapPin />
              </div>
              <span className="info-text-val">{contact.address ? contact.address.replace('\n', ', ').replace(',,', ',') : 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059'}</span>
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

    </div>
  );
};

export default ContactPage;
