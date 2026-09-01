import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, FiMonitor, FiSmartphone, FiLayout, FiTrendingUp,
  FiCloud, FiCpu, FiDatabase, FiLayers, FiSettings,
  FiArrowDownRight
} from 'react-icons/fi';
import './ServicesTransformation.css';

const leftServices = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    subtitle: 'Bespoke engineering & automated workflows',
    icon: <FiCode />
  },
  {
    id: 'web-dev',
    title: 'Web Application Development',
    subtitle: 'High-performance web apps & modern stacks',
    icon: <FiMonitor />
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Application Engineering',
    subtitle: 'Native iOS & Android mobile experiences',
    icon: <FiSmartphone />
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design Systems',
    subtitle: 'Intuitive interfaces & user-centered design',
    icon: <FiLayout />
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD Automation',
    subtitle: 'Automated pipelines & IaC cloud deployments',
    icon: <FiTrendingUp />
  }
];

const rightServices = [
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions & Infrastructure',
    subtitle: 'Scalable cloud hosting & 99.9% uptime',
    icon: <FiCloud />
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    subtitle: 'Intelligent automation & predictive models',
    icon: <FiCpu />
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solutions',
    subtitle: 'High-volume platforms & enterprise security',
    icon: <FiDatabase />
  },
  {
    id: 'api-integration',
    title: 'API & System Integration',
    subtitle: 'Seamless third-party connectivity',
    icon: <FiLayers />
  },
  {
    id: 'maintenance',
    title: 'Maintenance & 24/7 Support',
    subtitle: 'Proactive monitoring & performance SLAs',
    icon: <FiSettings />
  }
];

const ServicesTransformation = () => {

  const scrollToService = (targetId) => {
    const targetElement = document.getElementById(`service-card-${targetId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('card-highlight-glow');
      setTimeout(() => {
        targetElement.classList.remove('card-highlight-glow');
      }, 2500);
    }
  };

  return (
    <section className="transformation-section">
      <div className="section-grid-pattern"></div>
      <div className="transformation-container">
        
        {/* Top Header Row: Left (OUR SERVICES + Dual Headline) | Right (Descriptive Narrative & Capabilities) */}
        <div className="transformation-header-row">
          {/* Left Column */}
          <motion.div 
            className="transformation-header-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '12px' }}>
              <h2 className="section-main-title">
                OUR <span className="title-gradient-accent">SERVICES</span>
              </h2>
            </div>
            
            <h2 className="chaos-headline">Stop absorbing the chaos.</h2>
            <h2 className="confidence-headline">
              Run with <span className="gradient-glow-text">confidence.</span>
            </h2>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="transformation-header-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="transformation-pills-row">
              <span className="trans-pill-tag">⚡ Agile Development</span>
              <span className="trans-pill-tag">🛡️ Enterprise Security</span>
              <span className="trans-pill-tag">☁️ Cloud Optimization</span>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Interactive Grid: Left Services (5) | Animated Orb | Right Services (5) */}
        <div className="transformation-grid-container">
          
          {/* Left Column Service Cards (5 items) */}
          <div className="transformation-column">
            {leftServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="trans-card service-topic-card"
                onClick={() => scrollToService(service.id)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.03, x: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="icon-badge service-icon-badge">
                  {service.icon}
                </div>
                <div className="trans-card-content">
                  <h4 className="trans-card-title">{service.title}</h4>
                  <p className="trans-card-text">{service.subtitle}</p>
                </div>
                <FiArrowDownRight className="card-jump-arrow" />
              </motion.div>
            ))}
          </div>

          {/* Center Column: Animated Radial Orb Lattice Graphic */}
          <div className="transformation-center-orb-wrapper">
            <div className="orb-outer-glow"></div>
            
            {/* SVG Animated Lattice Orb */}
            <svg 
              className="center-orb-svg" 
              viewBox="0 0 240 240" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="orbCoreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff8a00" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#ff6b00" stopOpacity="0.4" />
                  <stop offset="85%" stopColor="#121212" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#121212" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="ringGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ff8a00" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Glowing Core Background */}
              <circle cx="120" cy="120" r="95" fill="url(#orbCoreGradient)" className="pulsing-orb-core" />
              
              {/* Rotating Flower Lattice Circles */}
              <g className="rotating-lattice-group">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                  <circle 
                    key={i}
                    cx={120 + 35 * Math.cos((angle * Math.PI) / 180)} 
                    cy={120 + 35 * Math.sin((angle * Math.PI) / 180)} 
                    r="48" 
                    stroke="url(#ringGoldGradient)" 
                    strokeWidth="1.2" 
                    strokeOpacity="0.45"
                  />
                ))}
              </g>

              {/* Inner Pulsing Rings */}
              <circle cx="120" cy="120" r="32" stroke="#e8c477" strokeWidth="1.5" strokeDasharray="4 4" className="spinning-inner-ring" />
              <circle cx="120" cy="120" r="14" fill="#ffffff" fillOpacity="0.9" className="glowing-center-dot" />

              {/* Floating Sparkle Nodes */}
              <circle cx="95" cy="85" r="3" fill="#e8c477" className="orbit-sparkle s1" />
              <circle cx="150" cy="98" r="2.5" fill="#34d399" className="orbit-sparkle s2" />
              <circle cx="110" cy="155" r="3.5" fill="#a78bfa" className="orbit-sparkle s3" />
              <circle cx="160" cy="140" r="2" fill="#e8c477" className="orbit-sparkle s4" />
            </svg>
          </div>

          {/* Right Column Service Cards (5 items) */}
          <div className="transformation-column">
            {rightServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="trans-card service-topic-card"
                onClick={() => scrollToService(service.id)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="icon-badge service-icon-badge">
                  {service.icon}
                </div>
                <div className="trans-card-content">
                  <h4 className="trans-card-title">{service.title}</h4>
                  <p className="trans-card-text">{service.subtitle}</p>
                </div>
                <FiArrowDownRight className="card-jump-arrow" />
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesTransformation;
