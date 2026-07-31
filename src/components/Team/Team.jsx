import React from 'react';
import './Team.css';

const Team = () => {
  return (
    <section id="team" className="section-padding" style={{ background: 'var(--bg-color-light)' }}>
      <div className="container">
        <h3 className="section-subtitle">Who We Are</h3>
        <h2 className="section-title">Meet Our <span className="gradient-text">Team</span></h2>
        
        <div className="team-grid">
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="CEO" />
            <div className="team-info">
              <h4>John Doe</h4>
              <p>CEO</p>
            </div>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="CTO" />
            <div className="team-info">
              <h4>Jane Smith</h4>
              <p>CTO</p>
            </div>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Lead Developer" />
            <div className="team-info">
              <h4>Mike Johnson</h4>
              <p>Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
