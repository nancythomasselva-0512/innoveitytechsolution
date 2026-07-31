import React, { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { ScrollRevealQuote } from '../ScrollRevealQuote/ScrollRevealQuote';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Robert Fox',
    role: 'CEO, InnovateX',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    text: 'Innoveity Tech Solution transformed our business with their cutting-edge web application. Their team is highly professional, skilled, and delivered beyond our expectations.'
  },
  {
    id: 2,
    name: 'Eleanor Pena',
    role: 'CTO, TechGrowth',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    text: 'The AI solution they built for us reduced our operational costs by 30%. Their expertise in modern technologies and problem-solving approach is truly commendable.'
  },
  {
    id: 3,
    name: 'Albert Flores',
    role: 'Founder, CloudSync',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    text: 'A fantastic team to work with! They handled our cloud migration seamlessly with zero downtime. Highly recommended for any complex technical challenges.'
  }
];

const Testimonials = () => {
  const revealRef = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === testimonialsData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonialsData.length - 1 : current - 1);
  };

  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <div className="reveal" ref={revealRef}>
          <h3 className="section-subtitle">Testimonials</h3>
          <h2 className="section-title">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          
          <div className="testimonial-slider">
            <button className="slider-btn prev" onClick={prevSlide}>
              <FiChevronLeft />
            </button>
            
            <div className="testimonial-content glass-panel">
              <FaQuoteLeft className="quote-icon text-accent" />
              
              {/* ⭐ Scroll-Linked Word Reveal Quote */}
              <ScrollRevealQuote 
                key={testimonialsData[current].id}
                text={testimonialsData[current].text} 
                darkTheme={true}
                className="testimonial-text-reveal"
              />

              <div className="testimonial-author">
                <img 
                  src={testimonialsData[current].image} 
                  alt={testimonialsData[current].name} 
                  className="author-image"
                />
                <div className="author-info">
                  <h4 className="author-name">{testimonialsData[current].name}</h4>
                  <p className="author-role">{testimonialsData[current].role}</p>
                </div>
              </div>
            </div>
            
            <button className="slider-btn next" onClick={nextSlide}>
              <FiChevronRight />
            </button>
          </div>
          
          <div className="slider-dots">
            {testimonialsData.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === current ? 'active' : ''}`}
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
