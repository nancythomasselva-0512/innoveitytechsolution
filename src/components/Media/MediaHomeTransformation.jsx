import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiStar, FiShare2, FiSearch, FiTrendingUp, 
  FiLayout, FiVideo, FiFilm, FiPenTool, FiZap,
  FiArrowDownRight, FiPlay, FiCamera, FiCompass
} from 'react-icons/fi';
import './MediaHomeTransformation.css';

const leftMediaServices = [
  {
    id: 'branding',
    number: '01',
    title: 'Branding',
    subtitle: 'Brand architecture, visual identity & strategy',
    icon: <FiStar />
  },
  {
    id: 'smm',
    number: '02',
    title: 'SMM (Social Media)',
    subtitle: 'Strategic social media management & engagement',
    icon: <FiShare2 />
  },
  {
    id: 'seo',
    number: '03',
    title: 'SEO',
    subtitle: 'Search engine optimization & organic rank',
    icon: <FiSearch />
  },
  {
    id: 'performance',
    number: '04',
    title: 'Performance Marketing',
    subtitle: 'Data-driven targeted ads & conversion growth',
    icon: <FiTrendingUp />
  },
  {
    id: 'visual-creatives',
    number: '05',
    title: 'Visual Creatives',
    subtitle: 'Premium graphic design & campaign assets',
    icon: <FiLayout />
  }
];

const rightMediaServices = [
  {
    id: 'video-production',
    number: '06',
    title: 'Video Production',
    subtitle: 'Cinema-grade brand films & commercial shoots',
    icon: <FiVideo />
  },
  {
    id: 'reels-shorts',
    number: '07',
    title: 'Reels & Shorts',
    subtitle: 'High-retention viral short-form video content',
    icon: <FiFilm />
  },
  {
    id: 'content-creation',
    number: '08',
    title: 'Content Creation',
    subtitle: 'Campaign storytelling & creative scripting',
    icon: <FiPenTool />
  },
  {
    id: 'digital-marketing',
    number: '09',
    title: 'Digital Marketing',
    subtitle: 'Full-funnel omnichannel digital growth strategy',
    icon: <FiZap />
  }
];

const MediaHomeTransformation = () => {
  const navigate = useNavigate();

  const handleCardClick = (targetId) => {
    navigate(`/media#media-card-${targetId}`);
    setTimeout(() => {
      const targetElement = document.getElementById(`media-card-${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);
  };

  return (
    <section className="media-trans-section">
      <div className="section-grid-pattern"></div>
      <div className="media-trans-container">
        
        {/* Top Header Row */}
        <div className="media-trans-header-row">
          <motion.div 
            className="media-trans-header-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-left-title-wrapper" style={{ textAlign: 'left', marginBottom: '4px' }}>
              <h2 className="section-main-title" style={{ margin: '0 0 4px 0' }}>
                MEDIA <span className="title-gradient-accent">CAPABILITIES</span>
              </h2>
            </div>
            
            <h2 className="chaos-headline">
              <span className="mosaic-heading-line">Creative Stories.</span>
              <span className="mosaic-heading-line title-gradient-accent">Powerful Visuals. Digital Growth.</span>
            </h2>
          </motion.div>

          <motion.div 
            className="media-trans-header-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="media-trans-narrative-block">
              <p className="media-trans-lead-text">
                From high-impact video production and visual branding to <span className="highlight-orange">performance marketing and viral short-form content.</span>
              </p>
              <p className="media-trans-sublead-text">
                We craft stories that build recognition, capture audience attention and drive measurable business results.
              </p>
            </div>

            <div className="media-pillar-badge-box">
              <div className="media-pillar-words">
                <div className="pillar-orange-dash"></div>
                <span>IDEAS</span>
                <span>STORIES</span>
                <span>BRANDS</span>
                <span>PEOPLE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Interactive Grid: Left 5 Cards | Center Interactive Hub | Right 4 Cards */}
        <div className="media-trans-grid-container">
          
          {/* Left Column (5 Cards) */}
          <div className="media-trans-column">
            {leftMediaServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="media-trans-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onClick={() => handleCardClick(service.id)}
              >
                <div className="media-trans-card-inner">
                  <div className="media-trans-icon-wrapper">
                    {service.icon}
                  </div>
                  <div className="media-trans-card-text">
                    <span className="media-trans-number">{service.number}</span>
                    <h4 className="media-trans-title">{service.title}</h4>
                    <p className="media-trans-desc">{service.subtitle}</p>
                  </div>
                  <div className="media-trans-card-arrow">
                    <FiArrowDownRight />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Interactive Visual Production Hub */}
          <div className="media-trans-center-column">
            <motion.div 
              className="media-hub-glow-box"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="media-hub-circle-outer">
                <div className="media-hub-circle-spin"></div>
                <div className="media-hub-circle-inner">
                  <div className="hub-center-content">
                    <div className="hub-center-icon">
                      <FiCamera />
                    </div>
                    <span className="hub-center-tag">INNOVEITY</span>
                    <h3 className="hub-center-title">MEDIA LAB</h3>
                    <p className="hub-center-sub">Creative • Production • Scale</p>
                  </div>
                </div>
              </div>

              {/* Floating Feature Badges */}
              <div className="hub-floating-badge badge-top-left">
                <span className="badge-dot"></span>
                <span>8K Cinema Production</span>
              </div>

              <div className="hub-floating-badge badge-top-right">
                <span className="badge-dot"></span>
                <span>Viral Reels & Shorts</span>
              </div>

              <div className="hub-floating-badge badge-bottom-left">
                <span className="badge-dot"></span>
                <span>Performance Marketing</span>
              </div>

              <div className="hub-floating-badge badge-bottom-right">
                <span className="badge-dot"></span>
                <span>Omnichannel SMM</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (4 Cards) */}
          <div className="media-trans-column">
            {rightMediaServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="media-trans-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (idx + 5) * 0.08 }}
                onClick={() => handleCardClick(service.id)}
              >
                <div className="media-trans-card-inner">
                  <div className="media-trans-icon-wrapper">
                    {service.icon}
                  </div>
                  <div className="media-trans-card-text">
                    <span className="media-trans-number">{service.number}</span>
                    <h4 className="media-trans-title">{service.title}</h4>
                    <p className="media-trans-desc">{service.subtitle}</p>
                  </div>
                  <div className="media-trans-card-arrow">
                    <FiArrowDownRight />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default MediaHomeTransformation;
