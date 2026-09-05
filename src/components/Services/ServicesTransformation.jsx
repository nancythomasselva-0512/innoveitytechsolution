import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiCpu, FiCode, FiBookOpen, FiShield, FiTruck, 
  FiPackage, FiSmartphone, FiWifi, FiZap,
  FiArrowDownRight
} from 'react-icons/fi';
import './ServicesTransformation.css';

const leftServices = [
  {
    id: 'ai-intelligent-solutions',
    number: '01',
    title: 'AI & Intelligent Solutions',
    subtitle: 'AI-powered platforms, voice AI, analytics & AI agents',
    icon: <FiCpu />
  },
  {
    id: 'enterprise-software',
    number: '02',
    title: 'Enterprise Software',
    subtitle: 'ERP, CRM, MIS, HR platforms & custom systems',
    icon: <FiCode />
  },
  {
    id: 'education-technology',
    number: '03',
    title: 'Education Technology',
    subtitle: 'Student LMS, assessment & institutional portals',
    icon: <FiBookOpen />
  },
  {
    id: 'digital-governance',
    number: '04',
    title: 'Digital Governance',
    subtitle: 'Citizen engagement, governance & admin dashboards',
    icon: <FiShield />
  },
  {
    id: 'smart-mobility',
    number: '05',
    title: 'Smart Mobility',
    subtitle: 'Contactless ticketing, QR ticketing & mobility apps',
    icon: <FiTruck />
  }
];

const rightServices = [
  {
    id: 'logistics-tracking',
    number: '06',
    title: 'Logistics & Tracking',
    subtitle: 'Parcel tracking, QR/barcode & field operations',
    icon: <FiPackage />
  },
  {
    id: 'web-mobile',
    number: '07',
    title: 'Web & Mobile',
    subtitle: 'Business websites, SaaS, Android, iOS & PWAs',
    icon: <FiSmartphone />
  },
  {
    id: 'iot-smart-technology',
    number: '08',
    title: 'IoT & Smart Technology',
    subtitle: 'Connected devices, sensors & smart infrastructure',
    icon: <FiWifi />
  },
  {
    id: 'startup-innovation',
    number: '09',
    title: 'Startup & Innovation',
    subtitle: 'MVPs, product development & technology strategy',
    icon: <FiZap />
  }
];

const ServicesTransformation = () => {
  const navigate = useNavigate();

  const handleCardClick = (targetId) => {
    navigate(`/services#service-card-${targetId}`);
    setTimeout(() => {
      const targetElement = document.getElementById(`service-card-${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  return (
    <section className="transformation-section">
      <div className="section-grid-pattern"></div>
      <div className="transformation-container">
        
        {/* Top Header Row Matching Flyer */}
        <div className="transformation-header-row">
          {/* Left Column: Title only */}
          <motion.div 
            className="transformation-header-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <h2 className="section-main-title">
                OUR <span className="title-gradient-accent">SERVICES</span>
              </h2>
            </div>
            
            <h2 className="chaos-headline">
              <span className="mosaic-heading-line">One Technology Partner.</span>
              <span className="mosaic-heading-line title-gradient-accent">Multiple Possibilities.</span>
            </h2>
          </motion.div>

          {/* Right Column: Subtitle Narrative then Pillar on the far right */}
          <motion.div 
            className="transformation-header-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <motion.div 
              className="transformation-right-text-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.025 } },
                hidden: {}
              }}
            >
              <p className="transformation-lead-text">
                {"Modern organisations don't need disconnected technology. They need ".split(' ').map((word, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
                    }}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                  >
                    {word}
                  </motion.span>
                ))}
                {"connected solutions that work together.".split(' ').map((word, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
                    }}
                    style={{ display: 'inline-block', marginRight: '0.28em', color: '#ff6b00', fontWeight: 800 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              <p className="transformation-sublead-text">
                {"Our expertise spans the complete digital technology landscape.".split(' ').map((word, i) => (
                  <motion.span
                    key={`w3-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }
                    }}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            <div className="services-pillar-badge-box">
              <div className="services-pillar-words">
                <div className="pillar-orange-dash"></div>
                <span>INNOVATION</span>
                <span>INTEGRATION</span>
                <span>IMPACT</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Interactive Grid: Left Services | Animated Orb | Right Services */}
        <div className="transformation-grid-container">
          
          {/* Left Column Service Cards (5 items) */}
          <div className="transformation-column">
            {leftServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="trans-card service-topic-card"
                onClick={() => handleCardClick(service.id)}
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
                  <h4 className="trans-card-title">{service.number} • {service.title}</h4>
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

          {/* Right Column Service Cards (4 items) */}
          <div className="transformation-column">
            {rightServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="trans-card service-topic-card"
                onClick={() => handleCardClick(service.id)}
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
                  <h4 className="trans-card-title">{service.number} • {service.title}</h4>
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
