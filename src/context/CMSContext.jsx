import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  isMySqlConfigured,
  fetchAllFromMySql,
  saveCmsSettingToMySql,
  upsertItemToMySql,
  deleteItemFromMySql
} from '../lib/mysqlClient';

const CMSContext = createContext();

export const useCMS = () => useContext(CMSContext);

export const CMSProvider = ({ children }) => {
  // Default Initial Data (Using AI-Generated High Resolution Renders)
  const defaultProjects = [
    {
      id: 1,
      title: 'AI Neural Engine',
      category: 'Artificial Intelligence',
      description: 'Experience high-performance, local client-side AI language processing and dynamic contextual learning within an intuitive web platform.',
      image: '/tech_blog_featured.png',
    },
    {
      id: 2,
      title: 'Cloud Data Core',
      category: 'Data Infrastructure',
      description: 'A fully responsive and scalable data center telemetry platform designed for high-availability enterprise cloud workloads.',
      image: '/tech_blog_3.png',
    },
    {
      id: 3,
      title: 'SaaS Workspace',
      category: 'Enterprise Software',
      description: 'A robust SaaS solution that allows users to create, manage, and analyze custom forms with advanced conditional logic.',
      image: '/service_software.png',
    },
    {
      id: 4,
      title: 'Mobile Suite',
      category: 'Mobile App Engineering',
      description: 'A modern, accessible mobile application concept tailored for specialized service bookings and real-time tracking.',
      image: '/service_mobile.png',
    },
    {
      id: 5,
      title: 'EduStream Hub',
      category: 'E-Learning Platform',
      description: 'An interactive, feature-rich e-learning platform connecting students and educators with secure video streaming and material distribution.',
      image: '/service_web.png',
    },
    {
      id: 6,
      title: 'Core Systems',
      category: 'Digital Transformation',
      description: 'The official corporate presence for Innoveity Tech Solution, showcasing our engineering capabilities, team, and services.',
      image: '/service_cloud.png',
    },
  ];

  const defaultShowcaseHeader = {
    badge: 'OUR PROJECTS',
    titleLine1: 'We Help Brands',
    titleHighlight: 'Win in the Digital Space',
    subtitle: 'An engineering solution agency building strategy-driven systems, high-impact web applications, and enterprise digital platforms that stand out.',
    ctaText: 'View Our Work'
  };

  const defaultShowcaseProjects = [
    {
      id: 'space-room',
      tag: 'Architecture & Cloud',
      title: 'Space to Room',
      subtitle: 'Building Scalable Digital Workspaces',
      description: 'High-performance cloud infrastructure & structural analytics for enterprise real estate and urban development.',
      image: '/tech_blog_featured.png',
      tech: ['AWS', 'React', 'Node.js', 'PostgreSQL']
    },
    {
      id: 'ai-advisor',
      tag: 'AI & Analytics',
      title: 'AI Financial Advisor',
      subtitle: 'Personalized Intelligence Engine',
      description: 'Real-time predictive machine learning models and intuitive wealth management dashboards.',
      image: '/tech_blog_2.png',
      tech: ['Python', 'TensorFlow', 'React Native', 'Redis']
    },
    {
      id: 'eclipse-studio',
      tag: 'Web Engineering',
      title: 'Eclipse Studio',
      subtitle: 'Creative Brand & Digital Experience',
      description: 'We believe digital design is about freezing emotions, energy, and atmosphere into seamless user interfaces.',
      image: '/tech_blog_1.png',
      tech: ['Next.js', 'Framer Motion', 'Tailwind', 'WebGL']
    },
    {
      id: 'telehealth',
      tag: 'Mobile Platform',
      title: 'TeleHealth Care',
      subtitle: 'HIPAA-Compliant Medical Suite',
      description: 'Connecting patients with medical specialists via sub-50ms HD video streaming and instant prescribing.',
      image: '/tech_blog_3.png',
      tech: ['React Native', 'WebRTC', 'GraphQL', 'Docker']
    },
    {
      id: 'altrix-fleet',
      tag: 'IoT Telematics',
      title: 'Altrix Logistics',
      subtitle: 'Smart Fleet Operations',
      description: 'Real-time telematics tracking and automated route optimization processing 1M+ sensor data points per minute.',
      image: '/hero-bg.png',
      tech: ['Go', 'Kafka', 'MongoDB', 'Vue.js']
    }
  ];

  const defaultTeam = [
    { id: 101, name: 'Founder & CEO', role: 'Founder & Managing Director', category: 'Leadership', image: '/Founder.jpeg' },
    { id: 102, name: 'Co-Founder & CEO', role: 'Chief Executive Officer', category: 'Leadership', image: '/CEO.jpeg' },
    { id: 1, name: 'Praveen', role: 'Team Member', category: 'Team Member', image: '/Praveen.jpeg' },
    { id: 2, name: 'Nancy', role: 'Team Member', category: 'Team Member', image: '/Nancy.jpeg' },
    { id: 3, name: 'Raghul', role: 'Team Member', category: 'Team Member', image: '/Raghul.jpeg' },
    { id: 4, name: 'Zubariya', role: 'Team Member', category: 'Team Member', image: '/Zubariya.jpeg' },
    { id: 5, name: 'Yeshwanth', role: 'Team Member', category: 'Team Member', image: '/Yeshwanth.jpeg' },
    { id: 6, name: 'Anto', role: 'Team Member', category: 'Team Member', image: '/Anto.jpeg' }
  ];

  const defaultTeamHeaderContent = {
    leadershipBadge: 'EXECUTIVE LEADERSHIP',
    leadershipTitleLine1: 'Founder &',
    leadershipTitleHighlight: 'Executive Leadership',
    leadershipSubtitle: 'Guiding our technology vision, strategic growth, and engineering excellence.',
    teamTitle: 'Our Engineering & Creative Experts',
    teamSubtitle: 'The brilliant minds behind our innovative solutions.'
  };

  const defaultContact = {
    email: 'innoveitytech@gmail.com',
    phone: '+91 0908765432',
    address: 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059'
  };

  const defaultHomeContent = {
    kicker: 'FUTURE-READY TECHNOLOGY SOLUTIONS',
    titleLine1: 'Innoveity Tech',
    titleLine2: 'Solution',
    description: 'Empowering businesses with innovative software development, AI-powered solutions, cloud technologies, mobile applications, web development, and digital transformation services that help organizations achieve sustainable growth.',
    aboutKicker: "Let's Innovate Together",
    aboutTitle: 'Who We Are &\nOur Vision With You',
    aboutDesc: 'Innoveity Tech Solution is a forward-thinking technology partner dedicated to empowering businesses with innovative, secure, and scalable digital solutions. From custom software development to comprehensive digital transformations, we combine deep technical expertise with a customer-first approach to turn complex challenges into competitive advantages.',
    aboutFeature1Title: 'Custom Software',
    aboutFeature1Desc: 'Tailored enterprise applications designed to scale seamlessly.',
    aboutFeature2Title: 'Digital Transformation',
    aboutFeature2Desc: 'Integrating cutting-edge AI & cloud infrastructure into workflows.',
    servicesMainTitle1: 'Integrated Technology',
    servicesMainTitle2: 'Solutions',
    servicesSubtitle: 'Comprehensive software engineering, mobile development, and cloud services designed to accelerate your growth.',
    servicesList: [
      {
        id: 'web-dev',
        title: 'Web Development Services',
        desc: 'Modern, high-performance, and responsive web applications engineered for scalability, security, and conversion.',
        image: '/service_web.png'
      },
      {
        id: 'mobile-dev',
        title: 'Mobile Application Engineering',
        desc: 'Native and cross-platform iOS & Android mobile apps delivering seamless user experiences and robust features.',
        image: '/service_mobile.png'
      },
      {
        id: 'custom-software',
        title: 'Custom Enterprise Software',
        desc: 'Tailored enterprise software solutions, automation tools, and complex workflow systems designed for your needs.',
        image: '/service_software.png'
      },
      {
        id: 'cloud-solutions',
        title: 'Cloud & AI Infrastructure',
        desc: 'Secure cloud infrastructure, microservices, and cutting-edge AI integrations ensuring maximum efficiency.',
        image: '/service_cloud.png'
      }
    ]
  };

  const defaultAboutContent = {
    mainStatement: "We provide all the technology leadership, custom engineering, and supervision necessary to deliver your digital products to complete satisfaction",
    badges: "Cloud Architecture, Custom Software, AI & Automation, Enterprise Security, Web & Mobile",
    stat1Number: "10+",
    stat1Label: "Years Experience",
    stat2Number: "500+",
    stat2Label: "Projects Delivered",
    stat3Number: "50+",
    stat3Label: "Tech Experts",
    stat4Number: "99%",
    stat4Label: "Client Success"
  };

  const defaultSeoSettings = {
    metaTitle: 'Innoveity Tech Solution | Enterprise Software & AI Cloud Engineering',
    metaDescription: 'Innoveity Tech Solution is a leading software development & digital transformation agency offering Web, Mobile, AI, and Cloud Infrastructure.',
    keywords: 'software development, web development, mobile apps, AI solutions, cloud infrastructure, Chennai IT company, Innoveity Tech',
    ogImage: '/Innoveity.png',
    canonicalUrl: 'https://innoveitytech.com',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /super-admin\nSitemap: https://innoveitytech.com/sitemap.xml',
    googleAnalyticsId: 'G-INNOVEITY2026',
    author: 'Innoveity Tech Solution Private Limited'
  };

  const defaultPageSeoSettings = {
    home: {
      title: 'Innoveity Tech Solution | Enterprise Software & AI Cloud Engineering',
      description: 'Innoveity Tech Solution is a leading software development & digital transformation agency in Chennai offering Web, Mobile, AI, and Cloud Infrastructure.',
      keywords: 'software development, web development, mobile apps, AI solutions, cloud infrastructure, Chennai IT company, Innoveity Tech',
      ogImage: '/Innoveity.png',
      canonicalUrl: 'https://innoveitytech.com/'
    },
    about: {
      title: 'About Us | Innoveity Tech Solution - Technology Leadership',
      description: 'Learn about Innoveity Tech Solution, our mission, vision, engineering team, and commitment to delivering cutting-edge software solutions.',
      keywords: 'about innoveity, tech leadership, software team, Chennai IT company, IT experts',
      ogImage: '/Innoveity.png',
      canonicalUrl: 'https://innoveitytech.com/about'
    },
    services: {
      title: 'Services & Engineering Capabilities | Innoveity Tech Solution',
      description: 'Explore our integrated technology solutions including Web Development, Mobile Engineering, Custom Enterprise Software, and Cloud Infrastructure.',
      keywords: 'web development services, mobile app development, custom software, cloud AI infrastructure',
      ogImage: '/service_web.png',
      canonicalUrl: 'https://innoveitytech.com/services'
    },
    projects: {
      title: 'Portfolio & Case Studies | Innoveity Tech Solution',
      description: 'Discover our portfolio of successful software products, enterprise SaaS applications, AI language platforms, and mobile apps.',
      keywords: 'software portfolio, client case studies, web development projects, AI SaaS apps',
      ogImage: '/fluentia.png',
      canonicalUrl: 'https://innoveitytech.com/projects'
    },
    contact: {
      title: 'Contact Us | Get in Touch with Innoveity Tech Solution',
      description: 'Reach out to Innoveity Tech Solution for consultation, project inquiries, or technology partnerships.',
      keywords: 'contact innoveity, hire software developers, IT consultation Chennai',
      ogImage: '/Innoveity.png',
      canonicalUrl: 'https://innoveitytech.com/contact'
    },
    team: {
      title: 'Our Team & Leadership | Innoveity Tech Solution',
      description: 'Meet the talented software architects, engineers, and technology strategists at Innoveity Tech Solution.',
      keywords: 'innoveity team, software engineers, tech leadership, developers Chennai',
      ogImage: '/Arifbillah.jpeg',
      canonicalUrl: 'https://innoveitytech.com/team'
    },
    privacy: {
      title: 'Privacy Policy | Innoveity Tech Solution',
      description: 'Read the official Privacy Policy of Innoveity Tech Solution regarding data protection, user privacy, and security.',
      keywords: 'privacy policy, data protection, innoveity privacy',
      ogImage: '/Innoveity.png',
      canonicalUrl: 'https://innoveitytech.com/privacy-policy'
    },
    terms: {
      title: 'Terms of Service | Innoveity Tech Solution',
      description: 'Terms of service and operational agreements governing the use of Innoveity Tech Solution website and digital products.',
      keywords: 'terms of service, user agreement, innoveity terms',
      ogImage: '/Innoveity.png',
      canonicalUrl: 'https://innoveitytech.com/terms-of-service'
    },
    refund: {
      title: 'Refund & Cancellation Policy | Innoveity Tech Solution',
      description: 'Official refund, project cancellation, and billing policies for Innoveity Tech Solution software development services.',
      keywords: 'refund policy, cancellation policy, innoveity terms',
      ogImage: '/Innoveity.png',
      canonicalUrl: 'https://innoveitytech.com/refund-policy'
    }
  };

  const defaultCustomFields = {
    home: [{ id: 1, label: 'Secondary Banner', value: 'Special Technology Solutions 2026' }],
    about: [{ id: 1, label: 'Vision Tagline', value: 'Empowering Next-Gen Software Architecture' }],
    contact: [{ id: 1, label: 'Support Desk Hotline', value: '+91 7904327211 (24x7 Direct)' }],
    seo: [{ id: 1, label: 'Schema Markup Type', value: 'Organization / LocalBusiness' }]
  };

  const defaultMediaContent = {
    hero: {
      badge: 'INNOVEITY MEDIA',
      subBadge: 'Creative. Strategic. Data-Driven.',
      title: 'MEDIA DIVISION',
      tagline1: 'Creative Stories.',
      tagline2: 'Powerful Visuals.',
      tagline3: 'Digital Growth.',
      description: 'Our Media Division brings together creative production, digital content, social media and performance-driven marketing to help brands build a stronger presence in the digital world. From an idea to the final frame, we create content that looks premium, communicates clearly and delivers purpose.',
      bgImage: '/media_hero_bg.png'
    },
    deckCards: [
      { id: 'mmac-arch', title: 'MMAC Studio', subtitle: 'BRAND ARCHITECTURE', tag: 'Visual Identity', image: '/deck_arch_gold.png' },
      { id: 'lifestyle-pour', title: 'Pour, Breathe, Begin', subtitle: 'REELS & SHORT FORM', tag: 'Social Media', image: '/deck_lifestyle.png' },
      { id: 'muyal-chair', title: 'Muyal Heritage', subtitle: 'CONCEPT FILMS', tag: 'Commercial Shoot', image: '/deck_green_chair.png' },
      { id: 'cinematic-urban', title: 'Cinematic Urban', subtitle: 'BRAND CAMPAIGN', tag: 'Video Production', image: '/deck_fashion.png' },
      { id: 'coffee-craft', title: 'Coffee & Craft', subtitle: 'PRODUCT CINEMATOGRAPHY', tag: 'High-End Studio', image: '/deck_product.png' },
      { id: 'editorial-design', title: 'Editorial Craft', subtitle: 'BRAND DESIGN', tag: 'Creative Studio', image: '/deck_design.png' },
      { id: 'digital-growth', title: 'Digital Scale', subtitle: 'PERFORMANCE MEDIA', tag: 'Growth Marketing', image: '/deck_growth.png' }
    ],
    services: [
      { num: '01', title: 'Social Media Management', desc: 'Strategic management of your social media presence with consistent, engaging and brand-focused content.', tag: 'Brand Growth' },
      { num: '02', title: 'Content Creation', desc: 'Creative content designed around your brand, audience and business objectives.', tag: 'Creative Craft' },
      { num: '03', title: 'Reels & Short-Form Videos', desc: 'High-quality reels and short-form videos built for attention, engagement and reach.', tag: 'Viral Reach' },
      { num: '04', title: 'Creative Design', desc: 'Premium visual creatives for campaigns, promotions, announcements and digital platforms.', tag: 'Visual Identity' },
      { num: '05', title: 'Video Production', desc: 'Professional video production for brands, products, events, campaigns and corporate communication.', tag: 'Cinematic Excellence' },
      { num: '06', title: 'Photography', desc: 'Product, corporate, event and promotional photography with a focus on strong visual storytelling.', tag: 'Storytelling' },
      { num: '07', title: 'Performance Marketing', desc: 'Targeted digital advertising designed to reach the right audience and support measurable business growth.', tag: 'Data Driven' },
      { num: '08', title: 'SEO', desc: "Search engine optimization customized according to each client's business, industry, competition and objectives.", tag: 'Organic Growth' }
    ],
    capabilities: [
      { id: 'camera-prod', title: 'PROFESSIONAL CAMERA PRODUCTION', quote: 'High-quality visual production using professional camera systems and production equipment.', badge: '★ 4.9/5 • 8K RED & ARRI Cinema Systems', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cameraman-setting-up-a-camera-42861-large.mp4', poster: '/cap_camera_prod.png' },
      { id: 'cinematic-vid', title: 'CINEMATIC VIDEO', quote: 'From brand films to promotional content, we create visually engaging stories built around your message.', badge: '★ 5.0/5 • Anamorphic Commercial Films', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-filmmaker-with-a-camera-on-a-tripod-42862-large.mp4', poster: '/cap_cinematic_vid.png' },
      { id: 'gimbal-motion', title: 'GIMBAL & MOTION', quote: 'Smooth, dynamic camera movements for reels, advertisements, events and cinematic brand content.', badge: '★ 4.9/5 • 3-Axis Stabilized Motion', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cameraman-filming-an-actor-with-a-stabilizer-42864-large.mp4', poster: '/cap_gimbal_motion.png' },
      { id: 'aerial-content', title: 'AERIAL CONTENT', quote: 'Drone-based visuals for locations, events, real estate, institutions, hospitality and brand campaigns.', badge: '★ 5.0/5 • 4K Drone Cinematography', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-sunset-41584-large.mp4', poster: '/cap_aerial_drone.png' },
      { id: 'post-production', title: 'POST-PRODUCTION', quote: 'Professional editing, colour correction, sound design, motion graphics and final delivery optimized for each platform.', badge: '★ 4.9/5 • Color Grading & Motion FX', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-video-editing-software-timeline-43343-large.mp4', poster: '/cap_post_production.png' }
    ],
    whyChooseUs: [
      { title: 'Creative First', desc: 'Ideas that make your brand stand out.' },
      { title: 'Quality Driven', desc: 'Professional production and attention to detail.' },
      { title: 'Strategy Led', desc: 'Every piece of content has a purpose.' },
      { title: 'Performance Focused', desc: 'We create content with business results in mind.' },
      { title: 'End-to-End Execution', desc: 'From concept and production to publishing and optimization.' }
    ],
    audienceTypes: ['Brands', 'Businesses', 'Startups', 'Institutions', 'Events', 'Products', 'Personal Brands'],
    cta: {
      brandTag: 'INNOVEITY MEDIA',
      heading: "LET'S CREATE SOMETHING THAT MOVES",
      subheadingLine1: 'Your brand has a story.',
      subheadingLine2: "Let's tell it better.",
      badges: 'Creative • Strategic • Data-Driven',
      btnText: 'START YOUR MEDIA PROJECT'
    }
  };

  const defaultHeaderFooterSettings = {
    brandSubTitle: 'TECH SOLUTIONS',
    contactBtnText: 'CONTACT US',
    navLinks: [
      { id: 1, name: 'Home', to: 'home', isPage: false },
      { id: 2, name: 'About Us', to: '/about', isPage: true },
      { id: 3, name: 'Projects', to: '/projects', isPage: true },
      { id: 4, name: 'Services', to: '/services', isPage: true },
      { id: 5, name: 'Media Division', to: '/media', isPage: true },
      { id: 6, name: 'Our Team', to: '/team', isPage: true }
    ],
    operatingCompany: 'Operated by Innoveity Tech Solution Ltd.',
    address: 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059',
    phone: '+91 0908765432',
    email: 'innoveitytech@gmail.com',
    hours: 'Mon - Fri, 9:00 AM - 6:00 PM',
    twitterUrl: 'https://x.com/innoveitytech',
    instagramUrl: 'https://instagram.com/innoveitytech',
    facebookUrl: 'https://facebook.com/innoveitytech',
    linkedinUrl: 'https://linkedin.com/company/innoveitytech',
    ctaBadge: 'SMART, SCALABLE',
    ctaTitle: 'Ready To Begin Building Digital Future Securely?',
    ctaPrimaryBtnText: 'Get Started',
    ctaSecondaryBtnText: 'See Technology Options',
    copyrightText: '© 2026 Innoveity Tech Solution. All rights reserved.'
  };

  const defaultAdminAccounts = [
    {
      id: 1,
      name: 'Super Admin Master',
      email: 'innoveitytech@gmail.com',
      password: 'superadmin123',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: 'Just now'
    },
    {
      id: 2,
      name: 'Admin Content Manager',
      email: 'innoveityadmin@gmail.com',
      password: 'admin123',
      role: 'Admin',
      status: 'Active',
      lastLogin: '10 mins ago'
    }
  ];

  // Helper security functions for transient session encryption
  const encryptData = (data) => {
    try {
      return btoa(encodeURIComponent(JSON.stringify(data)));
    } catch (e) {
      return JSON.stringify(data);
    }
  };

  const decryptData = (encryptedString, fallback) => {
    if (!encryptedString) return fallback;
    try {
      return JSON.parse(decodeURIComponent(atob(encryptedString)));
    } catch (e) {
      try {
        return JSON.parse(encryptedString);
      } catch (err) {
        return fallback;
      }
    }
  };

  // LocalStorage Persistence Helpers
  const loadLocalState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`cms_${key}_v2`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const saveLocalState = (key, value) => {
    try {
      localStorage.setItem(`cms_${key}_v2`, JSON.stringify(value));
      localStorage.setItem('cms_has_local_edits_v2', 'true');
    } catch (e) {
      console.warn(`[LocalStorage] Error saving ${key}:`, e);
    }
  };

  // Database Connection Status ('connected' | 'connecting' | 'fallback')
  const [dbStatus, setDbStatus] = useState(() => isMySqlConfigured() ? 'connecting' : 'fallback');

  // Primary CMS State (Directly populated from LocalStorage & MySQL Database)
  const [projects, setProjects] = useState(() => loadLocalState('projects', defaultProjects));
  const [team, setTeam] = useState(() => loadLocalState('team', defaultTeam));
  const [teamHeaderContent, setTeamHeaderContent] = useState(() => loadLocalState('team_header', defaultTeamHeaderContent));
  const [contact, setContact] = useState(() => loadLocalState('contact', defaultContact));
  const [homeContent, setHomeContent] = useState(() => loadLocalState('home_content', defaultHomeContent));
  const [aboutContent, setAboutContent] = useState(() => loadLocalState('about_content', defaultAboutContent));
  const [mediaContent, setMediaContent] = useState(() => loadLocalState('media_content', defaultMediaContent));
  const [showcaseHeader, setShowcaseHeader] = useState(() => loadLocalState('showcase_header', defaultShowcaseHeader));
  const [showcaseProjects, setShowcaseProjects] = useState(() => loadLocalState('showcase_projects', defaultShowcaseProjects));
  const [seoSettings, setSeoSettings] = useState(() => loadLocalState('seo_settings', defaultSeoSettings));
  const [pageSeoSettings, setPageSeoSettings] = useState(() => loadLocalState('page_seo_settings', defaultPageSeoSettings));
  const [customFields, setCustomFields] = useState(() => loadLocalState('custom_fields', defaultCustomFields));
  const [headerFooterSettings, setHeaderFooterSettings] = useState(() => loadLocalState('header_footer', defaultHeaderFooterSettings));
  const [adminUsers, setAdminUsers] = useState(() => loadLocalState('admin_users', defaultAdminAccounts));

  // Auto-persist all CMS state to LocalStorage
  useEffect(() => { saveLocalState('projects', projects); }, [projects]);
  useEffect(() => { saveLocalState('team', team); }, [team]);
  useEffect(() => { saveLocalState('team_header', teamHeaderContent); }, [teamHeaderContent]);
  useEffect(() => { saveLocalState('contact', contact); }, [contact]);
  useEffect(() => { saveLocalState('home_content', homeContent); }, [homeContent]);
  useEffect(() => { saveLocalState('about_content', aboutContent); }, [aboutContent]);
  useEffect(() => { saveLocalState('media_content', mediaContent); }, [mediaContent]);
  useEffect(() => { saveLocalState('showcase_header', showcaseHeader); }, [showcaseHeader]);
  useEffect(() => { saveLocalState('showcase_projects', showcaseProjects); }, [showcaseProjects]);
  useEffect(() => { saveLocalState('seo_settings', seoSettings); }, [seoSettings]);
  useEffect(() => { saveLocalState('page_seo_settings', pageSeoSettings); }, [pageSeoSettings]);
  useEffect(() => { saveLocalState('custom_fields', customFields); }, [customFields]);
  useEffect(() => { saveLocalState('header_footer', headerFooterSettings); }, [headerFooterSettings]);
  useEffect(() => { saveLocalState('admin_users', adminUsers); }, [adminUsers]);

  // Transient Admin Session (Starts null so /admin always prompts login)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser) sessionStorage.setItem('cms_session_sec_v1', encryptData(currentUser));
    else sessionStorage.removeItem('cms_session_sec_v1');
  }, [currentUser]);

  // Load latest data from MySQL Database API
  const fetchLatestFromMySql = useCallback(async () => {
    if (!isMySqlConfigured()) {
      setDbStatus('fallback');
      return;
    }

    // Protect local user modifications from being overwritten by 3-second background polling
    const hasLocalEdits = localStorage.getItem('cms_has_local_edits_v2') === 'true';
    if (hasLocalEdits) {
      setDbStatus('connected');
      return;
    }

    try {
      const data = await fetchAllFromMySql();
      if (!data) {
        setDbStatus('fallback');
        return;
      }

      if (data.projects && data.projects.length > 0) setProjects(data.projects);
      if (data.showcaseProjects && data.showcaseProjects.length > 0) setShowcaseProjects(data.showcaseProjects);
      if (data.team && data.team.length > 0) setTeam(data.team);
      if (data.adminUsers && data.adminUsers.length > 0) setAdminUsers(data.adminUsers);

      const s = data.settings || {};
      if (s.showcase_header) setShowcaseHeader(s.showcase_header);
      if (s.team_header) setTeamHeaderContent(s.team_header);
      if (s.contact) setContact(s.contact);
      if (s.home_content) setHomeContent(s.home_content);
      if (s.about_content) setAboutContent(s.about_content);
      if (s.media_content) setMediaContent(s.media_content);
      if (s.seo_settings) setSeoSettings(s.seo_settings);
      if (s.page_seo_settings) setPageSeoSettings(s.page_seo_settings);
      if (s.custom_fields) setCustomFields(s.custom_fields);
      if (s.header_footer_settings) setHeaderFooterSettings(s.header_footer_settings);

      setDbStatus('connected');
    } catch (err) {
      console.warn('[MySQL DB] Error syncing:', err);
      setDbStatus('fallback');
    }
  }, []);

  // Live Sync Engine: 3-Second Live Polling from MySQL Database
  useEffect(() => {
    fetchLatestFromMySql();

    let pollInterval = null;
    if (isMySqlConfigured()) {
      pollInterval = setInterval(() => {
        fetchLatestFromMySql();
      }, 3000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [fetchLatestFromMySql]);

  // Seed / Push Master dataset to MySQL Database
  const seedCloudDatabase = async () => {
    if (!isMySqlConfigured()) {
      alert('MySQL API configuration is missing in .env!');
      return false;
    }

    try {
      setDbStatus('connecting');

      for (const p of projects) await upsertItemToMySql('cms_projects', p);
      for (const sp of showcaseProjects) await upsertItemToMySql('cms_showcase_projects', sp);
      for (const tm of team) await upsertItemToMySql('cms_team', tm);
      for (const au of adminUsers) await upsertItemToMySql('cms_admin_users', au);

      await saveCmsSettingToMySql('showcase_header', showcaseHeader);
      await saveCmsSettingToMySql('team_header', teamHeaderContent);
      await saveCmsSettingToMySql('contact', contact);
      await saveCmsSettingToMySql('home_content', homeContent);
      await saveCmsSettingToMySql('about_content', aboutContent);
      await saveCmsSettingToMySql('media_content', mediaContent);
      await saveCmsSettingToMySql('seo_settings', seoSettings);
      await saveCmsSettingToMySql('page_seo_settings', pageSeoSettings);
      await saveCmsSettingToMySql('custom_fields', customFields);
      await saveCmsSettingToMySql('header_footer_settings', headerFooterSettings);

      setDbStatus('connected');
      alert('Successfully seeded all website data to MySQL Database! Live sync active across all devices.');
      return true;
    } catch (err) {
      console.error('Error seeding MySQL DB:', err);
      alert(`Error seeding MySQL DB: ${err.message}`);
      return false;
    }
  };

  // CRUD Actions synced with MySQL Database
  const addProject = async (project) => {
    const newProj = { ...project, id: Date.now() };
    setProjects(prev => [...prev, newProj]);
    await upsertItemToMySql('cms_projects', newProj);
  };

  const updateProject = async (id, updatedProject) => {
    const merged = { ...projects.find(p => p.id === id), ...updatedProject, id };
    setProjects(prev => prev.map(p => p.id === id ? merged : p));
    await upsertItemToMySql('cms_projects', merged);
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    await deleteItemFromMySql('cms_projects', id);
  };

  const addShowcaseProject = async (project) => {
    const techArray = Array.isArray(project.tech)
      ? project.tech
      : (typeof project.tech === 'string' ? project.tech.split(',').map(t => t.trim()).filter(Boolean) : []);
    const newCard = {
      ...project,
      id: project.id || `showcase-${Date.now()}`,
      tech: techArray
    };
    setShowcaseProjects(prev => [...prev, newCard]);
    await upsertItemToMySql('cms_showcase_projects', newCard);
  };

  const updateShowcaseProject = async (id, updatedProject) => {
    const techArray = Array.isArray(updatedProject.tech)
      ? updatedProject.tech
      : (typeof updatedProject.tech === 'string' ? updatedProject.tech.split(',').map(t => t.trim()).filter(Boolean) : []);
    const merged = { ...showcaseProjects.find(p => p.id === id), ...updatedProject, id, tech: techArray };
    setShowcaseProjects(prev => prev.map(p => p.id === id ? merged : p));
    await upsertItemToMySql('cms_showcase_projects', merged);
  };

  const deleteShowcaseProject = async (id) => {
    setShowcaseProjects(prev => prev.filter(p => p.id !== id));
    await deleteItemFromMySql('cms_showcase_projects', id);
  };

  const updateShowcaseHeader = async (newHeader) => {
    const updated = { ...showcaseHeader, ...newHeader };
    setShowcaseHeader(updated);
    await saveCmsSettingToMySql('showcase_header', updated);
  };

  const addTeamMember = async (member) => {
    const newMember = {
      id: Date.now(),
      name: member.name,
      role: member.role,
      category: member.category || (member.role?.toLowerCase().includes('founder') || member.role?.toLowerCase().includes('ceo') ? 'Leadership' : 'Team Member'),
      image: member.image || ''
    };
    setTeam(prev => newMember.category === 'Leadership' ? [newMember, ...prev] : [...prev, newMember]);
    await upsertItemToMySql('cms_team', newMember);
  };

  const updateTeamMember = async (id, updatedMember) => {
    const merged = { ...team.find(m => m.id === id), ...updatedMember, id };
    setTeam(prev => prev.map(m => m.id === id ? merged : m));
    await upsertItemToMySql('cms_team', merged);
  };

  const deleteTeamMember = async (id) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    await deleteItemFromMySql('cms_team', id);
  };

  const moveTeamMemberUp = (id) => {
    setTeam(prev => {
      const index = prev.findIndex(m => m.id === id);
      if (index <= 0) return prev;
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveTeamMemberDown = (id) => {
    setTeam(prev => {
      const index = prev.findIndex(m => m.id === id);
      if (index === -1 || index >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const updateTeamHeaderContent = async (newHeader) => {
    const updated = { ...teamHeaderContent, ...newHeader };
    setTeamHeaderContent(updated);
    await saveCmsSettingToMySql('team_header', updated);
  };

  const updateContact = async (updatedContact) => {
    setContact(updatedContact);
    const updatedHF = {
      ...headerFooterSettings,
      phone: updatedContact.phone || headerFooterSettings.phone,
      email: updatedContact.email || headerFooterSettings.email,
      address: updatedContact.address || headerFooterSettings.address,
      hours: updatedContact.hours || headerFooterSettings.hours,
    };
    setHeaderFooterSettings(updatedHF);
    await saveCmsSettingToMySql('contact', updatedContact);
    await saveCmsSettingToMySql('header_footer_settings', updatedHF);
  };

  const updateHomeContent = async (newContent) => {
    setHomeContent(newContent);
    await saveCmsSettingToMySql('home_content', newContent);
  };

  const updateAboutContent = async (newContent) => {
    setAboutContent(newContent);
    await saveCmsSettingToMySql('about_content', newContent);
  };

  const updateMediaContent = async (newMedia) => {
    const updated = { ...mediaContent, ...newMedia };
    setMediaContent(updated);
    await saveCmsSettingToMySql('media_content', updated);
  };

  const updateSeoSettings = async (newSeo) => {
    setSeoSettings(newSeo);
    await saveCmsSettingToMySql('seo_settings', newSeo);
  };

  const updateHeaderFooterSettings = async (newSettings) => {
    const updatedHF = { ...headerFooterSettings, ...newSettings };
    setHeaderFooterSettings(updatedHF);

    const updatedContact = {
      ...contact,
      phone: newSettings.phone || contact.phone,
      email: newSettings.email || contact.email,
      address: newSettings.address || contact.address,
      hours: newSettings.hours || contact.hours,
    };
    setContact(updatedContact);

    await saveCmsSettingToMySql('header_footer_settings', updatedHF);
    await saveCmsSettingToMySql('contact', updatedContact);
  };

  const updatePageSeoSettings = async (pageKey, newPageSeo) => {
    const updated = {
      ...pageSeoSettings,
      [pageKey]: { ...pageSeoSettings[pageKey], ...newPageSeo }
    };
    setPageSeoSettings(updated);
    await saveCmsSettingToMySql('page_seo_settings', updated);
  };

  const addCustomField = async (pageKey, field) => {
    const updated = {
      ...customFields,
      [pageKey]: [...(customFields[pageKey] || []), { id: Date.now(), ...field }]
    };
    setCustomFields(updated);
    await saveCmsSettingToMySql('custom_fields', updated);
  };

  const deleteCustomField = async (pageKey, id) => {
    const updated = {
      ...customFields,
      [pageKey]: (customFields[pageKey] || []).filter(f => f.id !== id)
    };
    setCustomFields(updated);
    await saveCmsSettingToMySql('custom_fields', updated);
  };

  const addAdminUser = async (user) => {
    const newUser = {
      id: Date.now(),
      name: user.name,
      email: user.email.toLowerCase().trim(),
      password: user.password || 'admin123',
      role: user.role || 'Admin',
      status: 'Active',
      lastLogin: 'Never'
    };
    setAdminUsers(prev => [...prev, newUser]);
    await upsertItemToMySql('cms_admin_users', newUser);
    return newUser;
  };

  const deleteAdminUser = async (id) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
    await deleteItemFromMySql('cms_admin_users', id);
  };

  const toggleUserStatus = async (id) => {
    let updatedUser = null;
    setAdminUsers(prev => prev.map(u => {
      if (u.id === id) {
        updatedUser = { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
        return updatedUser;
      }
      return u;
    }));
    if (updatedUser) await upsertItemToMySql('cms_admin_users', updatedUser);
  };

  const loginAdmin = (email, password, requiredRole) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    const found = adminUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return { success: false, message: 'Account with this email does not exist.' };
    }
    if (found.password !== password) {
      return { success: false, message: 'Invalid password. Please try again.' };
    }
    if (found.status !== 'Active') {
      return { success: false, message: 'This account has been suspended. Contact Super Admin.' };
    }
    if (requiredRole === 'Super Admin' && found.role !== 'Super Admin') {
      return { success: false, message: 'Access denied: Super Admin privileges required.' };
    }

    const updatedUser = { ...found, lastLogin: 'Just now' };
    setAdminUsers(prev => prev.map(u => u.id === found.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    upsertItemToMySql('cms_admin_users', updatedUser);

    return { success: true, user: updatedUser };
  };

  const logoutAdmin = () => {
    setCurrentUser(null);
  };

  const clearAllCmsCache = () => {
    localStorage.clear();
    setProjects(defaultProjects);
    setShowcaseHeader(defaultShowcaseHeader);
    setShowcaseProjects(defaultShowcaseProjects);
    setTeam(defaultTeam);
    setTeamHeaderContent(defaultTeamHeaderContent);
    setContact(defaultContact);
    setHomeContent(defaultHomeContent);
    setAboutContent(defaultAboutContent);
    setMediaContent(defaultMediaContent);
    setSeoSettings(defaultSeoSettings);
    setPageSeoSettings(defaultPageSeoSettings);
    setCustomFields({});
    setHeaderFooterSettings(defaultHeaderFooterSettings);

    return true;
  };

  return (
    <CMSContext.Provider value={{
      dbStatus,
      seedCloudDatabase,
      fetchLatestFromMySql,
      projects, addProject, updateProject, deleteProject,
      showcaseProjects, addShowcaseProject, updateShowcaseProject, deleteShowcaseProject,
      showcaseHeader, updateShowcaseHeader,
      team, addTeamMember, updateTeamMember, deleteTeamMember, moveTeamMemberUp, moveTeamMemberDown,
      teamHeaderContent, updateTeamHeaderContent,
      contact, updateContact,
      homeContent, updateHomeContent,
      aboutContent, updateAboutContent,
      mediaContent, updateMediaContent,
      seoSettings, updateSeoSettings,
      headerFooterSettings, updateHeaderFooterSettings,
      pageSeoSettings, updatePageSeoSettings,
      customFields, addCustomField, deleteCustomField,
      adminUsers, addAdminUser, deleteAdminUser, toggleUserStatus,
      currentUser, loginAdmin, logoutAdmin,
      clearAllCmsCache
    }}>
      {children}
    </CMSContext.Provider>
  );
};
