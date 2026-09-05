import React, { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { ScrollRevealQuote } from '../ScrollRevealQuote/ScrollRevealQuote';
import { useCMS } from '../../context/CMSContext';
import './Testimonials.css';

const fallbackTestimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'Aura Health Platforms',
    image: '/Sarah.jpeg',
    avatar: '/Sarah.jpeg',
    content: 'Innoveity Tech Solution delivered our AI-driven telemedicine platform ahead of schedule with flawless architecture and high scalability.',
    text: 'Innoveity Tech Solution delivered our AI-driven telemedicine platform ahead of schedule with flawless architecture and high scalability.'
  },
  {
    id: 2,
    name: 'David Sterling',
    role: 'VP of Product Engineering',
    company: 'Nexis Cloud Global',
    image: '/David.jpeg',
    avatar: '/David.jpeg',
    content: 'Their team designed a stellar modern web application that transformed our enterprise user engagement metrics by over 240%.',
    text: 'Their team designed a stellar modern web application that transformed our enterprise user engagement metrics by over 240%.'
  }
];

const Testimonials = () => {
  const revealRef = useScrollReveal();
  const { testimonials } = useCMS();
  const [current, setCurrent] = useState(0);

  const list = (testimonials && testimonials.length > 0) ? testimonials : fallbackTestimonials;
  const activeIndex = current >= list.length ? 0 : current;
  const activeItem = list[activeIndex];

  const nextSlide = () => {
    setCurrent(activeIndex === list.length - 1 ? 0 : activeIndex + 1);
  };

  const prevSlide = () => {
    setCurrent(activeIndex === 0 ? list.length - 1 : activeIndex - 1);
  };

  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <div className="reveal" ref={revealRef}>
          <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '16px' }}>
            <h2 className="section-main-title">
              CLIENT <span className="title-gradient-accent">TESTIMONIALS</span>
            </h2>
          </div>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            What Our Clients <span className="title-gradient-accent">Say</span>
          </h2>
          
          <div className="testimonial-slider">
            <button className="slider-btn prev" onClick={prevSlide}>
              <FiChevronLeft />
            </button>
            
            <div className="testimonial-content glass-panel">
              <FaQuoteLeft className="quote-icon text-accent" />
              
              {/* ⭐ Scroll-Linked Word Reveal Quote */}
              <ScrollRevealQuote 
                key={activeItem.id || activeIndex}
                text={activeItem.content || activeItem.text || ''} 
                darkTheme={false}
                className="testimonial-text-reveal"
              />

              <div className="testimonial-author">
                <img 
                  src={activeItem.avatar || activeItem.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'} 
                  alt={activeItem.name} 
                  className="author-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="author-info">
                  <h4 className="author-name">{activeItem.name}</h4>
                  <p className="author-role">{activeItem.role} {activeItem.company ? `• ${activeItem.company}` : ''}</p>
                </div>
              </div>
            </div>
            
            <button className="slider-btn next" onClick={nextSlide}>
              <FiChevronRight />
            </button>
          </div>
          
          <div className="slider-dots">
            {list.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
