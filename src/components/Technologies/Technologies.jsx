import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaAws, FaDocker, FaPython } from 'react-icons/fa';
import './Technologies.css';

const techs = [
  { icon: <FaReact />, name: 'React', color: '#61DAFB' },
  { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
  { icon: <FaHtml5 />, name: 'HTML5', color: '#E34F26' },
  { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572B6' },
  { icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <FaAws />, name: 'AWS', color: '#FF9900' },
  { icon: <FaDocker />, name: 'Docker', color: '#2496ED' },
  { icon: <FaPython />, name: 'Python', color: '#3776AB' },
];

const Technologies = () => {
  const revealRef = useScrollReveal();

  return (
    <section id="technologies" className="section-padding">
      <div className="container">
        <div className="reveal" ref={revealRef}>
          <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '16px' }}>
            <h2 className="section-main-title">
              OUR <span className="title-gradient-accent">TECHNOLOGIES</span>
            </h2>
          </div>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            Our Tech <span className="title-gradient-accent">Stack</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'left', marginTop: '0', marginBottom: '3rem' }}>
            We use the latest technologies to build robust, scalable, and high-performance solutions.
          </p>

          <div className="tech-grid">
            {techs.map((tech, index) => (
              <div 
                className="tech-card glass-panel" 
                key={index}
                style={{ '--hover-color': tech.color }}
              >
                <div className="tech-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <h4 className="tech-name">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
