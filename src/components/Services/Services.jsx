import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCMS } from '../../context/CMSContext';
import ServicesTransformation from './ServicesTransformation';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();
  const { homeContent } = useCMS();

  const services = homeContent?.servicesList || [];

  const handleExploreService = (service) => {
    const targetId = service?.id || 'web-dev';
    navigate(`/services#service-card-${targetId}`);
    setTimeout(() => {
      const element = document.getElementById(`service-card-${targetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 45, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="services" className="services-section section-padding" style={{ paddingTop: '0' }}>
      
      {/* ⭐ Control / Chaos vs Confidence Feature Comparison Section + Topic Pills at TOP */}
      <ServicesTransformation />

      <div className="container" style={{ marginTop: '60px' }}>
        
        {/* Section Header with Motion */}
        <motion.div 
          className="services-header-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="services-main-title">
            {homeContent.servicesMainTitle1} <span className="gradient-text">{homeContent.servicesMainTitle2}</span>
          </h2>
          <p className="services-subtitle">
            {homeContent.servicesSubtitle}
          </p>
        </motion.div>

        {/* 2x2 Grid of Horizontal Service Cards with Staggered Motion */}
        <motion.div 
          className="services-horizontal-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div 
              className="service-card-horizontal" 
              key={service.id}
              id={`service-card-${service.id}`}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                borderColor: "rgba(255, 107, 0, 0.4)",
                transition: { duration: 0.3 }
              }}
            >
              
              {/* Left Image Box */}
              <div className="service-image-box">
                <motion.img 
                  src={service.image} 
                  alt={service.title} 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Right Content */}
              <div className="service-content-box">
                <div className="service-text-group">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>

                {/* Pill CTA Button */}
                <div className="service-action-row">
                  <motion.button 
                    className="pill-btn-explore" 
                    onClick={() => handleExploreService(service)}
                    whileHover={{ scale: 1.04, x: 2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span>EXPLORE NOW</span>
                    <div className="arrow-circle-sm">
                      <FiArrowUpRight size={16} />
                    </div>
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Center Explore More Button */}
        <motion.div 
          className="services-bottom-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button 
            className="pill-btn-explore-all" 
            onClick={() => navigate('/services')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>EXPLORE MORE</span>
          </motion.button>
        </motion.div>

      </div>

    </section>
  );
};

export default Services;
