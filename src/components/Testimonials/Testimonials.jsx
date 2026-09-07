import React, { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { useCMS } from '../../context/CMSContext';
import './Testimonials.css';

const fallbackTestimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'Aura Health Platforms',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Innoveity Tech Solution delivered our AI-driven telemedicine platform ahead of schedule with flawless architecture and high scalability.'
  },
  {
    id: 2,
    name: 'David Sterling',
    role: 'VP of Product Engineering',
    company: 'Nexis Cloud Global',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Their team designed a stellar modern web application that transformed our enterprise user engagement metrics by over 240%.'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Head of Digital Innovation',
    company: 'FinScale Capital',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Working with Innoveity Tech was transformative. They engineered an automated financial intelligence engine that handles high-frequency workloads with zero downtime.'
  },
  {
    id: 4,
    name: 'Marcus Vance',
    role: 'Co-Founder & COO',
    company: 'Orbit Logistics Tech',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'From scoping to deployment, Innoveity exceeded every benchmark. Their real-time telematics tracking and fleet platform streamlined our operations nationwide.'
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    role: 'Director of Learning Technologies',
    company: 'EduSphere Global',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'The e-learning platform built by Innoveity Tech has empowered over 50,000 students globally with seamless video classrooms and interactive assessment tools.'
  },
  {
    id: 6,
    name: 'Alex Rivers',
    role: 'Head of Product Engineering',
    company: 'CyberShield Matrix',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Innoveity’s agile methodology, clean code architecture, and AI capabilities make them our top trusted development partner for critical systems.'
  }
];

const Testimonials = () => {
  const revealRef = useScrollReveal();
  const { testimonials } = useCMS();
  const [current, setCurrent] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const list = (testimonials && Array.isArray(testimonials) && testimonials.length >= 3) 
    ? testimonials 
    : fallbackTestimonials;

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1080) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const maxIndex = Math.max(0, list.length - cardsPerPage);

  const nextSlide = () => {
    setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch swipe support for mobile and tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="testimonials" className="section-padding testimonials-fullscreen-section">
      <div className="container testimonials-container-fluid">
        <div className="reveal" ref={revealRef}>
          <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '16px' }}>
            <h2 className="section-main-title">
              CLIENT <span className="title-gradient-accent">TESTIMONIALS</span>
            </h2>
          </div>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            What Our Clients <span className="title-gradient-accent">Say</span>
          </h2>
          
          <div className="testimonials-carousel-wrapper">
            <button 
              className="slider-btn prev" 
              onClick={prevSlide}
              aria-label="Previous Testimonials"
            >
              <FiChevronLeft />
            </button>

            <div 
              className="testimonials-track-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="testimonials-track"
                style={{
                  transform: `translateX(-${current * (100 / cardsPerPage)}%)`,
                  transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {list.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="testimonial-card-slide"
                    style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
                  >
                    <div className="testimonial-card-inner glass-panel">
                      <div className="testimonial-card-header">
                        <div className="quote-badge">
                          <FaQuoteLeft className="quote-icon-sm" />
                        </div>
                        <div className="testimonial-rating-stars">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <FiStar key={i} className="star-icon filled" />
                          ))}
                        </div>
                      </div>

                      <p className="testimonial-card-quote">
                        &ldquo;{item.content || item.text}&rdquo;
                      </p>

                      <div className="testimonial-card-author">
                        <img 
                          src={item.avatar || item.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'} 
                          alt={item.name} 
                          className="author-image-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="author-info-sm">
                          <h4 className="author-name-sm">{item.name}</h4>
                          <p className="author-role-sm">{item.role} {item.company ? `• ${item.company}` : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="slider-btn next" 
              onClick={nextSlide}
              aria-label="Next Testimonials"
            >
              <FiChevronRight />
            </button>
          </div>
          
          <div className="slider-dots">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${index + 1}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
