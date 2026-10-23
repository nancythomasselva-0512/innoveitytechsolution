import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAward,
  FaBolt,
  FaCircleCheck,
  FaPenNib,
  FaShareNodes,
  FaChartLine,
  FaVideo,
  FaGlobe,
  FaCalendarDays,
  FaGraduationCap,
  FaBriefcase,
  FaCamera,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaArrowTrendUp,
  FaBullhorn,
  FaLightbulb,
  FaPalette,
  FaFilm,
  FaRocket,
  FaStar,
  FaCompass,
  FaUsers,
  FaMagnifyingGlass,
  FaDisplay
} from 'react-icons/fa6';
import { useCMS } from '../context/CMSContext';
import adeliteLogo from '../assets/adelite-logo-transparent.png';
import './MediaPage.css';

const ICON_MAP = {
  FaPenNib,
  FaShareNodes,
  FaChartLine,
  FaVideo,
  FaGlobe,
  FaCalendarDays,
  FaGraduationCap,
  FaBriefcase,
  FaCamera,
  FaAward,
  FaBolt,
  FaCircleCheck,
  FaArrowRight,
  FaBullhorn,
  FaLightbulb,
  FaPalette,
  FaFilm,
  FaRocket,
  FaStar,
  FaCompass,
  FaUsers,
  FaMagnifyingGlass,
  FaDisplay
};

const resolveIcon = (iconVal, defaultIcon = FaCircleCheck) => {
  if (!iconVal) return defaultIcon;
  if (typeof iconVal === 'function' || typeof iconVal === 'object') return iconVal;
  return ICON_MAP[iconVal] || defaultIcon;
};

const WHAT_WE_DO_DATA = [
  {
    id: 'branding-design',
    title: 'Branding & Design',
    desc: 'Brand identity, logos, brochures, profiles and creative collateral.',
    iconName: 'FaPenNib'
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    desc: 'Content calendars, page management, community engagement and reporting.',
    iconName: 'FaShareNodes'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'Campaign strategy, online advertising, audience reach and lead generation.',
    iconName: 'FaChartLine'
  },
  {
    id: 'media-production',
    title: 'Media Production',
    desc: 'Promotional videos, reels, photography and visual storytelling.',
    iconName: 'FaVideo'
  },
  {
    id: 'digital-presence',
    title: 'Digital Presence',
    desc: 'Website content, landing pages and online brand visibility.',
    iconName: 'FaGlobe'
  },
  {
    id: 'event-campaign',
    title: 'Event & Campaign Solutions',
    desc: 'Event branding, promotional campaigns, creative assets and coverage.',
    iconName: 'FaCalendarDays'
  }
];

const SECTORS_DATA = [
  {
    id: 'education',
    number: '01',
    badge: 'ACADEMIC & INSTITUTIONAL',
    title: 'Education & Institutional Branding',
    summary: 'Admissions, campus storytelling, and digital recruitment campaigns.',
    intro: 'Comprehensive recruitment, academic storytelling, and visual identity for schools, colleges, and educational groups.',
    iconName: 'FaGraduationCap',
    points: [
      'Admission Campaigns and Student Recruitment Promotions',
      'Institution Profiles, Prospectuses, Brochures and Presentations',
      'Campus Events, Academic Achievements and Institutional Storytelling',
      'Social Media Handling and Digital Engagement'
    ]
  },
  {
    id: 'corporate',
    number: '02',
    badge: 'ENTERPRISE & COMMERCIAL',
    title: 'Corporate Branding & Business Communication',
    summary: 'Executive messaging, brand positioning, and corporate media collateral.',
    intro: 'Strengthening enterprise reputation, executive messaging, and corporate visual collateral.',
    iconName: 'FaBriefcase',
    points: [
      'Corporate Profile Shoot, Brand Positioning and Visual Communication',
      'Company Profiles, Sales Presentations and Business Collateral',
      'Product Launches, Promotional Campaigns and Digital Advertising',
      'Executive Videos, Customer Testimonials and Corporate Storytelling',
      'Social Media Management and Brand Reputation Support'
    ]
  },
  {
    id: 'events',
    number: '03',
    badge: 'MEDIA & EXPERIENTIAL',
    title: 'Events, Campaigns & Media Production',
    summary: 'Event identity, reels, cinematography, and high-impact live coverage.',
    intro: 'High-impact multi-angle coverage, creative backdrops, reels, and experiential campaign assets.',
    iconName: 'FaCamera',
    points: [
      'Event Identity, Invitations, Backdrops and Promotional Materials',
      'Photography, Videography, Reels and Post-Event Highlights',
      'Campaign Creatives, Motion Graphics and Digital Announcements',
      'Sponsorship Collateral and Audience Engagement Materials'
    ]
  },
  {
    id: 'marketing',
    number: '04',
    badge: 'GROWTH & PERFORMANCE',
    title: 'Digital Performance Marketing & Lead Generation',
    summary: 'Targeted Meta & Google ads, search optimization, and verified leads.',
    intro: 'ROI-driven campaigns, organic discoverability, targeted paid funnels, and real-time analytics.',
    iconName: 'FaChartLine',
    points: [
      'Improve search rankings, organic traffic, and online discoverability through Search Engine Optimisation (SEO).',
      'Create and manage targeted Meta Ads campaigns across Facebook and Instagram.',
      'Reach relevant audiences through Google Ads search, display, and other suitable advertising formats.',
      'Generate prospective student enquiries, admission leads, and business opportunities through Lead Generation Campaigns.',
      'Analytics & Performance Reporting to monitor reach, engagement, clicks, leads, and campaign performance to support data-driven decisions.'
    ]
  }
];

const MediaPage = () => {
  const { mediaContent, headerFooterSettings, contact } = useCMS ? useCMS() : {};

  const email = headerFooterSettings?.email || contact?.email || 'aachinancy@gmail.com';
  const phone = headerFooterSettings?.phone || contact?.phone || '+91 7904327211';

  // Dynamic Content Bindings with Fallbacks
  const hero = mediaContent?.hero || {};
  const motto = hero.motto || 'Transforming Brands into Experiences.';
  const kicker = hero.kicker || 'BRAND & CAPABILITIES';
  const heroTitle = (hero.title && hero.title !== 'MEDIA CAPABILITIES') 
    ? hero.title 
    : 'Your Vision. Our Creativity.';
  const heroTitleHighlight = hero.titleHighlight || 'Greater Impact.';
  const narrativeP1 = hero.narrativeP1 || 'AD ELITE is a creative media and digital solutions brand delivering integrated branding, social media management, digital marketing, and multimedia services for educational institutions, businesses, and organisations. We combine strategic thinking with compelling creativity to help brands communicate effectively, build recognition, and connect meaningfully with their audiences.';
  const narrativeP2 = hero.narrativeP2 || 'Our approach goes beyond creating content. We build cohesive brand experiences that strengthen visibility, encourage engagement, and support measurable growth.';

  const whatWeDoHeader = mediaContent?.whatWeDoHeader || {};
  const whatWeDoKicker = whatWeDoHeader.kicker || 'CORE CAPABILITIES';
  const whatWeDoTitle = whatWeDoHeader.title || 'What';
  const whatWeDoTitleHighlight = whatWeDoHeader.titleHighlight || 'We Do';
  const whatWeDoDesc = whatWeDoHeader.desc || 'Integrated creative, media, and digital solutions designed to strengthen recognition, engagement, and growth.';
  const whatWeDoList = (Array.isArray(mediaContent?.whatWeDo) && mediaContent.whatWeDo.length > 0)
    ? mediaContent.whatWeDo
    : WHAT_WE_DO_DATA;

  const philosophy = mediaContent?.philosophy || {};
  const philosophyBadge = philosophy.badge || 'OUR CREATIVE PHILOSOPHY';
  const philosophyQuote = philosophy.quote || 'Strategy before design. Purpose behind every message. Impact in every interaction.';
  const philosophyDescription = philosophy.description || 'We align creativity with organisational goals to ensure every brand touch point communicates a consistent identity and creates a lasting impression.';
  const philosophyChips = (Array.isArray(philosophy.chips) && philosophy.chips.length === 3)
    ? philosophy.chips
    : ['Strategy Before Design', 'Purpose Behind Every Message', 'Impact In Every Interaction'];

  const solutionsHeader = mediaContent?.solutionsHeader || {};
  const solutionsKicker = solutionsHeader.kicker || 'CLIENT SOLUTIONS & PARTNERSHIP';
  const solutionsTitle = solutionsHeader.title || 'Creative Solutions.';
  const solutionsTitleHighlight = solutionsHeader.titleHighlight || 'Tailored for Every Sector.';
  const solutionsDesc = solutionsHeader.desc || 'AD ELITE develops customised media and marketing solutions that reflect the unique goals, audiences, and growth priorities of each organisation.';
  const sectorsList = (Array.isArray(mediaContent?.sectors) && mediaContent.sectors.length > 0)
    ? mediaContent.sectors
    : SECTORS_DATA;

  const [activeSectorIdx, setActiveSectorIdx] = useState(0);
  const safeSectorIdx = (activeSectorIdx >= 0 && activeSectorIdx < sectorsList.length) ? activeSectorIdx : 0;
  const activeSector = sectorsList[safeSectorIdx] || sectorsList[0] || SECTORS_DATA[0];

  const cta = mediaContent?.cta || {};
  const ctaHeading = cta.heading || "LET'S CREATE SOMETHING THAT MOVES";
  const ctaLeadText = cta.leadText || "From building a distinctive identity to managing your digital presence, AD ELITE is your creative partner for stronger visibility, meaningful engagement, and sustainable growth.";
  const ctaPartnerBadge = cta.partnerBadge || "Your Premier Event Partner";
  const ctaBrandEndorsement = cta.brandEndorsement || "AD ELITE | A Creative Solutions Brand of INNOVEITY";
  const ctaContactPrompt = cta.contactPrompt || "Contact us to discuss your branding, media, social media management, and digital marketing requirements.";
  const ctaBtnText = cta.btnText || "START YOUR MEDIA PROJECT";
  const ctaBtnLink = cta.btnLink || "/contact";
  const ctaWebsiteLink = cta.websiteLink || "/contact";
  const ctaEmail = cta.email || email;
  const ctaPhone = cta.phone || phone;
  const ctaSocialLink = cta.socialLink || "/contact";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="media-page adelite-media-page">
      
      {/* 1. TOP BRAND HEADER LOCKUP */}
      <header className="adelite-header-section">
        <div className="adelite-logo-wrapper">
          <div className="adelite-brand-lockup">
            <img 
              src={adeliteLogo} 
              alt="ADelite Logo" 
              className="adelite-hero-logo" 
            />
            <div className="adelite-motto-divider" aria-hidden="true"></div>
            <p className="adelite-motto-text">{motto}</p>
          </div>
        </div>
      </header>

      <main className="adelite-content-container">

        {/* 2. BRAND & CAPABILITIES HERO */}
        <section className="adelite-hero-intro" aria-labelledby="hero-vision-heading">
          <div className="adelite-kicker-badge">
            <span className="kicker-icon-chip">
              <FaAward />
            </span>
            <span className="kicker-label">{kicker}</span>
          </div>

          <h1 id="hero-vision-heading" className="adelite-display-title">
            {heroTitle} <span className="adelite-gold-gradient">{heroTitleHighlight}</span>
          </h1>

          <div className="adelite-narrative-card">
            <p className="adelite-narrative-body">{narrativeP1}</p>
            {narrativeP2 && <p className="adelite-narrative-body">{narrativeP2}</p>}
          </div>
        </section>

        {/* 2.5 WHAT WE DO (6 CORE CAPABILITIES) */}
        <section className="adelite-what-we-do-section" aria-labelledby="what-we-do-heading">
          <div className="what-we-do-header">
            <div className="adelite-kicker-badge">
              <span className="kicker-icon-chip">
                <FaBolt />
              </span>
              <span className="kicker-label">{whatWeDoKicker}</span>
            </div>
            <h2 id="what-we-do-heading" className="what-we-do-title">
              {whatWeDoTitle} <span className="adelite-gold-gradient">{whatWeDoTitleHighlight}</span>
            </h2>
            <p className="what-we-do-desc">{whatWeDoDesc}</p>
          </div>

          <div className="what-we-do-grid">
            {whatWeDoList.map((item, index) => {
              const Icon = resolveIcon(item.iconName || item.icon, FaBolt);
              return (
                <div key={item.id || index} className="what-we-do-card">
                  <div className="what-we-do-icon-box">
                    <Icon />
                  </div>
                  <div className="what-we-do-content">
                    <h3 className="what-we-do-card-title">{item.title}</h3>
                    <p className="what-we-do-card-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. OUR CREATIVE PHILOSOPHY */}
        <section className="adelite-philosophy-section" aria-labelledby="philosophy-title">
          <div className="adelite-philosophy-card">
            <div className="philosophy-ambient-glow" aria-hidden="true"></div>

            <div className="philosophy-top-badge">
              <span>{philosophyBadge}</span>
            </div>

            <blockquote className="philosophy-quote">
              &ldquo;{philosophyQuote}&rdquo;
            </blockquote>

            <p className="philosophy-description">{philosophyDescription}</p>

            <div className="philosophy-pillars-chips">
              {philosophyChips.map((chip, cIdx) => (
                <span key={cIdx} className="philosophy-chip">
                  <strong className="chip-num">{`0${cIdx + 1}`}</strong> {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CLIENT SOLUTIONS & PARTNERSHIP */}
        <section className="adelite-solutions-section" aria-labelledby="solutions-title">
          
          <div className="adelite-section-header">
            <div className="adelite-kicker-badge">
              <span className="kicker-icon-chip">
                <FaCircleCheck />
              </span>
              <span className="kicker-label">{solutionsKicker}</span>
            </div>
            <h2 id="solutions-title" className="adelite-section-title">
              {solutionsTitle} <span className="adelite-gold-gradient">{solutionsTitleHighlight}</span>
            </h2>
            <p className="adelite-section-desc">{solutionsDesc}</p>
          </div>

          {/* TWO-COLUMN SPLIT: LEFT SECTORS + RIGHT EXPLANATION BOX CARD */}
          <div className="adelite-split-solutions-layout">
            
            {/* LEFT SIDE: Interactive Sector Cards */}
            <div className="adelite-solutions-left-nav" role="tablist">
              {sectorsList.map((sector, idx) => {
                const Icon = resolveIcon(sector.iconName || sector.icon, FaBriefcase);
                const isActive = safeSectorIdx === idx;
                return (
                  <button
                    key={sector.id || idx}
                    type="button"
                    className={`adelite-nav-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveSectorIdx(idx)}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <div className="nav-card-top">
                      <div className="nav-card-icon-wrap">
                        <Icon className="nav-card-icon" />
                      </div>
                      <div className="nav-card-status">
                        {isActive ? (
                          <span className="nav-card-pill is-active">
                            <span className="pulse-dot" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="nav-card-pill">
                            <span className="nav-card-num">{sector.number || `0${idx + 1}`}</span>
                            <FaArrowRight className="nav-card-arrow" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="nav-card-body">
                      <span className="nav-card-kicker">{sector.badge}</span>
                      <h4 className="nav-card-title">{sector.title}</h4>
                    </div>

                    <div className="nav-card-accent-bar" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE: Active Sector Explanation Box Card */}
            <div className="adelite-solutions-right-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSector.id || safeSectorIdx}
                  className="neat-sector-sheet"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Sector Header Info */}
                  <div className="neat-sector-header-info">
                    <div className="neat-badge-row">
                      <span className="neat-category-tag">{activeSector.badge}</span>
                      <span className="neat-counter-tag">SECTOR {activeSector.number || `0${safeSectorIdx + 1}`} / {String(sectorsList.length).padStart(2, '0')}</span>
                    </div>
                    <h3 className="neat-sector-main-title">{activeSector.title}</h3>
                    <p className="neat-sector-main-intro">{activeSector.intro}</p>
                  </div>

                  {/* Clean, Neat Points */}
                  <div className="neat-points-list">
                    {(activeSector.points || []).map((pointText, pIdx) => (
                      <div key={pIdx} className="neat-point-row">
                        <div className="neat-bullet-wrap" aria-hidden="true">
                          <span className="neat-gold-bullet"></span>
                        </div>
                        <p className="neat-point-text">{pointText}</p>
                      </div>
                    ))}
                  </div>

                  {/* Clean Bottom Action Row */}
                  <div className="neat-sector-footer-row">
                    <span className="neat-footer-note">
                      Tailored strategy &amp; full creative delivery by AD ELITE
                    </span>
                    <Link to="/contact" className="neat-action-link">
                      <span>Inquire About {(activeSector.title || '').split('&')[0].trim()}</span>
                      <FaArrowRight />
                    </Link>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </section>

        {/* 5. CALL TO ACTION - BRAND CARD */}
        <section className="adelite-cta-section" aria-labelledby="cta-heading">
          <div className="adelite-cta-card">
            <div className="cta-ambient-glow" aria-hidden="true"></div>

            <div className="cta-inner-content">
              <h2 id="cta-heading" className="cta-gold-title">
                {ctaHeading}
              </h2>

              <p className="cta-lead-text">{ctaLeadText}</p>

              {ctaPartnerBadge && (
                <div className="cta-partner-badge">
                  <span>{ctaPartnerBadge}</span>
                </div>
              )}

              {ctaBrandEndorsement && (
                <div className="cta-brand-endorsement">
                  {ctaBrandEndorsement}
                </div>
              )}

              {ctaContactPrompt && (
                <p className="cta-contact-prompt">{ctaContactPrompt}</p>
              )}

              <div className="cta-actions-row">
                <div className="cta-quick-links">
                  {ctaWebsiteLink.startsWith('http') ? (
                    <a href={ctaWebsiteLink} target="_blank" rel="noopener noreferrer" className="cta-link-pill">
                      <FaGlobe className="link-pill-icon" />
                      <span>Website</span>
                    </a>
                  ) : (
                    <Link to={ctaWebsiteLink} className="cta-link-pill">
                      <FaGlobe className="link-pill-icon" />
                      <span>Website</span>
                    </Link>
                  )}

                  <a href={`mailto:${ctaEmail}`} className="cta-link-pill">
                    <FaEnvelope className="link-pill-icon" />
                    <span>Email</span>
                  </a>

                  <a href={`tel:${String(ctaPhone).replace(/\s+/g, '')}`} className="cta-link-pill">
                    <FaPhone className="link-pill-icon" />
                    <span>Phone</span>
                  </a>

                  {ctaSocialLink.startsWith('http') ? (
                    <a href={ctaSocialLink} target="_blank" rel="noopener noreferrer" className="cta-link-pill">
                      <FaShareNodes className="link-pill-icon" />
                      <span>Social Media</span>
                    </a>
                  ) : (
                    <Link to={ctaSocialLink} className="cta-link-pill">
                      <FaShareNodes className="link-pill-icon" />
                      <span>Social Media</span>
                    </Link>
                  )}
                </div>

                <Link to={ctaBtnLink || "/contact"} className="cta-primary-btn">
                  <span>{ctaBtnText}</span>
                  <FaArrowTrendUp size={16} />
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default MediaPage;
