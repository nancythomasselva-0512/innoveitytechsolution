import React, { useState, useEffect } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { FiAward, FiUsers, FiClock, FiHeart } from 'react-icons/fi';
import './WhyUs.css';

const stats = [
  { id: 1, icon: <FiAward />, count: 150, label: 'Projects Completed' },
  { id: 2, icon: <FiUsers />, count: 120, label: 'Happy Clients' },
  { id: 3, icon: <FiClock />, count: 10, label: 'Years Experience' },
  { id: 4, icon: <FiHeart />, count: 50, label: 'Awards Won' },
];

const StatItem = ({ icon, count, label }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const revealRef = useScrollReveal();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (revealRef.current && !hasAnimated) {
        const top = revealRef.current.getBoundingClientRect().top;
        if (top < window.innerHeight) {
          setHasAnimated(true);
          let start = 0;
          const end = count;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              clearInterval(timer);
              setCurrentCount(end);
            } else {
              setCurrentCount(Math.ceil(start));
            }
          }, 16);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [count, hasAnimated, revealRef]);

  return (
    <div className="stat-item glass-panel" ref={revealRef}>
      <div className="stat-icon">{icon}</div>
      <h3 className="stat-count gradient-text">
        {currentCount}<span>+</span>
      </h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const WhyUs = () => {
  const revealRef = useScrollReveal();

  return (
    <section id="why-us" className="section-padding">
      <div className="container">
        <div className="why-us-container reveal" ref={revealRef}>
          <div className="why-us-content">
            <h3 className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>Why Choose Us</h3>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              We Deliver <span className="gradient-text">Excellence</span>
            </h2>
            <p className="why-us-description">
              Choosing the right technology partner is critical to your success. At Innoveity Tech Solution, we go beyond just writing code. We act as your strategic partner, ensuring that our solutions align perfectly with your business goals.
            </p>
            <p className="why-us-description">
              Our proven track record of delivering high-quality, scalable, and secure software solutions makes us the preferred choice for businesses looking to innovate and grow.
            </p>
            <button className="btn btn-primary mt-4">Work With Us</button>
          </div>

          <div className="why-us-stats">
            <div className="stats-grid">
              {stats.map(stat => (
                <StatItem key={stat.id} icon={stat.icon} count={stat.count} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
