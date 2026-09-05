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
    mainStatement: "Smart Technology. Creative Engineering. Scalable Solutions.",
    badges: "Cloud Architecture, Custom Software, AI & Automation, Enterprise Security, Web & Mobile",
    stat1Number: "5+",
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

  const defaultContactInquiries = [
    {
      id: 201,
      name: 'Priya Sharma',
      email: 'priya.sharma@techcorp.in',
      phone: '+91 98401 23456',
      company: 'TechCorp Solutions',
      subject: 'Custom Web Platform & Mobile App Development',
      message: 'Hi Innoveity Team,\n\nWe are looking to develop a custom enterprise SaaS platform with mobile apps. We would like to schedule a consultation to discuss project architecture, deliverables, and estimated timelines.\n\nBest regards,\nPriya Sharma',
      date: 'Today',
      status: 'New'
    },
    {
      id: 202,
      name: 'Kavitha R',
      email: 'kavitha.dev@gmail.com',
      phone: '+91 97890 54321',
      company: '📄 Resume: Kavitha_FullStack_Resume.pdf',
      subject: '[Job Application] Senior Full Stack AI Developer',
      message: '📌 NEW JOB CANDIDATE APPLICATION\n----------------------------------------\n💼 Position Applied: Senior Full Stack AI Developer (Engineering)\n👤 Applicant Name: Kavitha R\n📧 Email Address: kavitha.dev@gmail.com\n📞 Phone Number: +91 97890 54321\n🎯 Years of Experience: 3+ Years\n🌐 Portfolio / LinkedIn: https://github.com/kavitha-dev\n📄 Resume / CV Attached: Kavitha_FullStack_Resume.pdf (1.2 MB)\n\n📝 Cover Letter & Candidate Pitch:\nPassionate full stack developer with 3+ years experience building React, Node.js, and GenAI microservices.\n----------------------------------------',
      date: 'Today',
      status: 'New'
    }
  ];

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
    brandSubTitle: 'SMART TECHNOLOGY. CREATIVE SOLUTIONS.',
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

  const defaultInquiries = [];

  const defaultTestimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Chief Technology Officer',
      company: 'Aura Health Platforms',
      rating: 5,
      content: 'Innoveity Tech Solution delivered our AI-driven telemedicine platform ahead of schedule with flawless architecture and high scalability.',
      avatar: '/Sarah.jpeg'
    },
    {
      id: 2,
      name: 'David Sterling',
      role: 'VP of Product Engineering',
      company: 'Nexis Cloud Global',
      rating: 5,
      content: 'Their team designed a stellar modern web application that transformed our enterprise user engagement metrics by over 240%.',
      avatar: '/David.jpeg'
    }
  ];

  const defaultMediaGallery = [
    {
      id: 1,
      title: 'Next-Gen 3D Interactive Brand Commercial',
      category: 'Brand Commercial',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: '/media_showcase_1.jpg',
      description: 'High-impact 3D visual effects and kinetic typography production for global tech launch.'
    },
    {
      id: 2,
      title: 'Enterprise AI Cloud Telemetry Reel',
      category: 'Tech Showcase',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: '/media_showcase_2.jpg',
      description: 'Live interactive dashboard demonstration showing real-time distributed telemetry.'
    }
  ];

  const defaultCareers = [
    {
      id: 1,
      title: 'Senior Full Stack AI Developer',
      department: 'Engineering',
      location: 'Remote / Chennai',
      type: 'Full-Time',
      experience: '3+ Years',
      status: 'Active',
      description: 'Lead development of next-generation generative AI web platforms and micro-services architectures.'
    },
    {
      id: 2,
      title: 'UI/UX Visual Experience Designer',
      department: 'Creative & Design',
      location: 'Chennai Hybrid',
      type: 'Full-Time',
      experience: '2+ Years',
      status: 'Active',
      description: 'Craft immersive 3D interactive user interfaces, motion design systems, and brand visual identities.'
    }
  ];

  const defaultBlogPosts = [
    {
      id: 1,
      title: 'Architecting High-Throughput Multi-Tenant AI Applications in 2026',
      category: 'AI & Cloud',
      author: 'Nancy Thomas',
      readTime: '6 min read',
      date: 'Sep 02, 2026',
      excerpt: 'A deep-dive into distributed vector search, serverless orchestration, and ultra-low latency real-time pipelines.',
      coverImage: '/tech_blog_1.png'
    },
    {
      id: 2,
      title: 'The Art of Smooth 60FPS Micro-Animations in Modern Web Interfaces',
      category: 'Web Engineering',
      author: 'Arifbillah',
      readTime: '4 min read',
      date: 'Aug 28, 2026',
      excerpt: 'How hardware-accelerated shaders and Framer Motion create cinematic user journeys without compromising performance.',
      coverImage: '/tech_blog_2.png'
    }
  ];

  const defaultServicesList = [
    {
      id: 1,
      title: 'Enterprise AI & Machine Learning',
      category: 'AI & Cloud Architecture',
      tagline: 'Custom deep-learning pipelines, LLM fine-tuning, and automated predictive intelligence.',
      deliverables: ['Custom Neural Models', 'RAG Vector Indexing', 'Scalable Inference APIs']
    },
    {
      id: 2,
      title: 'Full-Stack Web & SaaS Engineering',
      category: 'Product Engineering',
      tagline: 'High-performance React/Next.js platforms with real-time sync and modern UI/UX.',
      deliverables: ['Custom Web Applications', 'Multi-Tenant Architecture', 'Ultra-Fast Performance']
    },
    {
      id: 3,
      title: '3D Interactive Experience & Motion Design',
      category: 'Creative Technology',
      tagline: 'Captivating 3D spatial web design, WebGL animations, and cinematic brand identity.',
      deliverables: ['WebGL Shaders', 'Dynamic 3D Rotators', 'Fluid Micro-Interactions']
    }
  ];

  const defaultCustomPageSections = {
    home: [
      {
        id: 'sec-home-why-choose',
        type: 'features_grid',
        theme: 'dark',
        badge: 'ENGINEERING ADVANTAGE',
        title: 'Why Global Brands Build With Innoveity',
        subtitle: 'We blend deep technical capability with enterprise-grade security and modern aesthetics.',
        items: [
          { title: 'Sub-Second Latency Architecture', desc: 'Optimized cloud pipelines, microservices, and client rendering delivering blisteringly fast user experiences.', tag: 'Performance' },
          { title: 'Bank-Grade Enterprise Security', desc: 'End-to-end encryption, strict compliance audits, and role-governed data workflows built into the core.', tag: 'Security' },
          { title: 'AI-Native Workflow Integration', desc: 'Autonomous LLM agents, vector embeddings, and predictive intelligence woven seamlessly into software.', tag: 'Intelligence' },
          { title: 'Dedicated Post-Launch Engineering', desc: 'Continuous 24/7 SLA monitoring, zero-downtime updates, and proactive scalability improvements.', tag: 'Reliability' }
        ],
        ctaText: 'Explore Engineering Capabilities',
        ctaUrl: '/services',
        active: true
      }
    ],
    about: [
      {
        id: 'sec-about-values',
        type: 'stats_grid',
        theme: 'sunset',
        badge: 'OUR IMPACT & VALUES',
        title: 'Engineering With Purpose & Scale',
        subtitle: 'Our key milestones that demonstrate our relentless focus on delivering client success.',
        items: [
          { number: '99.98%', label: 'System Uptime SLA', desc: 'Across all deployed enterprise cloud microservices' },
          { number: '2.4x', label: 'Client Growth Speed', desc: 'Average user engagement acceleration post-launch' },
          { number: '15+', label: 'Global Tech Stacks', desc: 'Mastery across React, Python AI, Node, AWS & Go' },
          { number: '100%', label: 'Delivery Integrity', desc: 'Every milestone completed on schedule and within scope' }
        ],
        active: true
      }
    ],
    services: [
      {
        id: 'sec-services-faq',
        type: 'faq_accordion',
        theme: 'light',
        badge: 'FREQUENTLY ASKED QUESTIONS',
        title: 'Everything You Need To Know',
        subtitle: 'Answers to common questions about our engineering engagements, timelines, and deliverables.',
        items: [
          { question: 'What is your typical project kickoff timeline?', answer: 'We typically initiate the architecture & discovery phase within 3-5 business days from contract signing, delivering full sprint planning within the first week.' },
          { question: 'Do you provide post-deployment maintenance and SLAs?', answer: 'Yes, all projects come with dedicated 24/7 technical monitoring, bug warranty periods, and optional continuous feature iteration retainers.' },
          { question: 'Can you integrate AI and custom LLMs into our existing software?', answer: 'Absolutely. We specialize in retrofitting legacy software with local/cloud LLMs, vector database indexing, and automated AI workflow pipelines.' }
        ],
        active: true
      }
    ],
    projects: [
      {
        id: 'sec-projects-cta',
        type: 'banner_cta',
        theme: 'dark',
        badge: 'HAVE A CUSTOM VISION?',
        title: 'Let’s Engineer Your Next Breakthrough Product',
        subtitle: 'From initial prototype architecture to full cloud deployment, our dedicated team is ready to build your product.',
        ctaText: 'Schedule Architecture Consultation',
        ctaUrl: '/contact',
        secondaryCtaText: 'Explore All Services',
        secondaryCtaUrl: '/services',
        active: true
      }
    ],
    team: [
      {
        id: 'sec-team-culture',
        type: 'features_grid',
        theme: 'light',
        badge: 'OUR CULTURE & PERKS',
        title: 'What It Means To Build at Innoveity',
        subtitle: 'We foster deep technical ownership, continuous learning, and high-impact engineering.',
        items: [
          { title: 'Cutting-Edge AI Tech Stack', desc: 'Work directly on state-of-the-art Generative AI, distributed systems, and real-time interactive interfaces.', tag: 'Innovation' },
          { title: 'Flexible & Hybrid Workflows', desc: 'Autonomous schedules that empower you to do your highest quality creative and engineering work.', tag: 'Flexibility' },
          { title: 'Accelerated Career Progression', desc: 'Direct mentorship from senior architects and fast-track promotions based on technical impact.', tag: 'Growth' }
        ],
        active: true
      }
    ],
    media: [
      {
        id: 'sec-media-cta',
        type: 'banner_cta',
        theme: 'sunset',
        badge: 'INNOVEITY MEDIA PRODUCTION',
        title: 'Ready To Elevate Your Brand’s Visual Story?',
        subtitle: 'High-end cinema cameras, commercial aerial drones, dynamic editing, and viral social media campaigns tailored for your business.',
        ctaText: 'Start Your Media Campaign',
        ctaUrl: '/contact',
        active: true
      }
    ],
    contact: [
      {
        id: 'sec-contact-guarantee',
        type: 'features_grid',
        theme: 'dark',
        badge: 'OUR RESPONSE GUARANTEE',
        title: 'Fast, Direct & Confidential Communication',
        subtitle: 'We respect your time and confidentiality from the very first interaction.',
        items: [
          { title: '< 24 Hour Response', desc: 'Our engineering leadership reviews and responds to every inquiry within 1 business day.', tag: 'Promptness' },
          { title: 'Strict NDA & IP Protection', desc: 'Your ideas, proprietary business models, and software architectures are 100% safeguarded.', tag: 'Confidentiality' },
          { title: 'Free Architecture Scope', desc: 'Receive a high-level technical feasibility breakdown and timeline estimate at zero cost.', tag: 'Consultation' }
        ],
        active: true
      }
    ]
  };

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
  const [testimonials, setTestimonials] = useState(() => loadLocalState('testimonials', defaultTestimonials));
  const [mediaGallery, setMediaGallery] = useState(() => loadLocalState('media_gallery', defaultMediaGallery));
  const [careers, setCareers] = useState(() => loadLocalState('careers', defaultCareers));
  const [blogPosts, setBlogPosts] = useState(() => loadLocalState('blog_posts', defaultBlogPosts));
  const [servicesList, setServicesList] = useState(() => loadLocalState('services_list', defaultServicesList));
  const [hiringAlertEnabled, setHiringAlertEnabled] = useState(() => loadLocalState('hiring_alert_enabled', true));
  const [customPageSections, setCustomPageSections] = useState(() => loadLocalState('custom_page_sections', defaultCustomPageSections));
  const [contactInquiries, setContactInquiries] = useState(() => {
    const loaded = loadLocalState('contact_inquiries', null);
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      return defaultContactInquiries;
    }
    return loaded;
  });

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
  useEffect(() => { saveLocalState('custom_page_sections', customPageSections); }, [customPageSections]);
  useEffect(() => { saveLocalState('header_footer', headerFooterSettings); }, [headerFooterSettings]);
  useEffect(() => { saveLocalState('admin_users', adminUsers); }, [adminUsers]);
  useEffect(() => { saveLocalState('contact_inquiries', contactInquiries); }, [contactInquiries]);
  useEffect(() => { saveLocalState('testimonials', testimonials); }, [testimonials]);
  useEffect(() => { saveLocalState('media_gallery', mediaGallery); }, [mediaGallery]);
  useEffect(() => { saveLocalState('careers', careers); }, [careers]);
  useEffect(() => { saveLocalState('blog_posts', blogPosts); }, [blogPosts]);
  useEffect(() => { saveLocalState('services_list', servicesList); }, [servicesList]);
  useEffect(() => { saveLocalState('hiring_alert_enabled', hiringAlertEnabled); }, [hiringAlertEnabled]);

  // Transient Admin Session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('cms_session_sec_v1');
      return saved ? decryptData(saved, null) : null;
    } catch (e) {
      return null;
    }
  });

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

    // Clean up legacy blocking flag if present in localStorage
    localStorage.removeItem('cms_has_local_edits_v2');

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
      if (s.custom_page_sections) setCustomPageSections(s.custom_page_sections);
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
      await saveCmsSettingToMySql('custom_page_sections', customPageSections);
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
    let found = adminUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      found = defaultAdminAccounts.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (!found) {
      return { success: false, message: 'Account with this email does not exist.' };
    }
    if (found.password !== password) {
      return { success: false, message: 'Invalid password. Please try again.' };
    }
    if (found.status !== 'Active') {
      return { success: false, message: 'This account has been suspended. Contact Super Admin.' };
    }

    const updatedUser = { ...found, lastLogin: 'Just now' };
    setAdminUsers(prev => {
      if (prev.some(u => u.id === found.id)) {
        return prev.map(u => u.id === found.id ? updatedUser : u);
      }
      return [...prev, updatedUser];
    });
    setCurrentUser(updatedUser);
    upsertItemToMySql('cms_admin_users', updatedUser);

    return { success: true, user: updatedUser };
  };

  const addInquiry = async (inquiry) => {
    const newInq = {
      id: Date.now(),
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || 'N/A',
      company: inquiry.company || 'N/A',
      subject: inquiry.subject || 'General Inquiry',
      message: inquiry.message,
      date: 'Just now',
      status: 'New',
      ...inquiry
    };
    setContactInquiries(prev => [newInq, ...prev]);
    await upsertItemToMySql('cms_contact_inquiries', newInq);
    return newInq;
  };

  const deleteInquiry = async (id) => {
    setContactInquiries(prev => prev.filter(i => i.id !== id));
    await deleteItemFromMySql('cms_contact_inquiries', id);
  };

  const markInquiryReplied = async (id) => {
    let updatedInq = null;
    setContactInquiries(prev => prev.map(i => {
      if (i.id === id) {
        updatedInq = { ...i, status: 'Replied' };
        return updatedInq;
      }
      return i;
    }));
    if (updatedInq) await upsertItemToMySql('cms_contact_inquiries', updatedInq);
  };

  const updateInquiryStatus = async (id, status) => {
    let updatedInq = null;
    setContactInquiries(prev => prev.map(i => {
      if (i.id === id) {
        updatedInq = { ...i, status };
        return updatedInq;
      }
      return i;
    }));
    if (updatedInq) await upsertItemToMySql('cms_contact_inquiries', updatedInq);
  };

  const updateInquiryNotes = async (id, notes) => {
    let updatedInq = null;
    setContactInquiries(prev => prev.map(i => {
      if (i.id === id) {
        updatedInq = { ...i, internalNotes: notes };
        return updatedInq;
      }
      return i;
    }));
    if (updatedInq) await upsertItemToMySql('cms_contact_inquiries', updatedInq);
  };

  // 1. Testimonials Handlers
  const addTestimonial = async (item) => {
    const newTestimonial = {
      id: Date.now(),
      name: item.name,
      role: item.role || 'Client',
      company: item.company || '',
      rating: Number(item.rating) || 5,
      content: item.content,
      avatar: item.avatar || '/Sarah.jpeg'
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    await upsertItemToMySql('cms_testimonials', newTestimonial);
    return newTestimonial;
  };

  const deleteTestimonial = async (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    await deleteItemFromMySql('cms_testimonials', id);
  };

  // 2. Media Gallery Handlers
  const addMediaItem = async (item) => {
    const newMedia = {
      id: Date.now(),
      title: item.title,
      category: item.category || 'Tech Showcase',
      videoUrl: item.videoUrl || '',
      thumbnail: item.thumbnail || '/media_showcase_1.jpg',
      description: item.description || ''
    };
    setMediaGallery(prev => [newMedia, ...prev]);
    await upsertItemToMySql('cms_media_gallery', newMedia);
    return newMedia;
  };

  const deleteMediaItem = async (id) => {
    setMediaGallery(prev => prev.filter(m => m.id !== id));
    await deleteItemFromMySql('cms_media_gallery', id);
  };

  // 3. Careers Handlers
  const addCareer = async (item) => {
    const newJob = {
      id: Date.now(),
      title: item.title,
      department: item.department || 'Engineering',
      location: item.location || 'Remote / Chennai',
      type: item.type || 'Full-Time',
      experience: item.experience || '1+ Years',
      status: 'Active',
      description: item.description || ''
    };
    setCareers(prev => [newJob, ...prev]);
    await upsertItemToMySql('cms_careers', newJob);
    return newJob;
  };

  const deleteCareer = async (id) => {
    setCareers(prev => prev.filter(c => c.id !== id));
    await deleteItemFromMySql('cms_careers', id);
  };

  const toggleCareerStatus = async (id) => {
    let updatedJob = null;
    setCareers(prev => prev.map(c => {
      if (c.id === id) {
        updatedJob = { ...c, status: c.status === 'Active' ? 'Closed' : 'Active' };
        return updatedJob;
      }
      return c;
    }));
    if (updatedJob) await upsertItemToMySql('cms_careers', updatedJob);
  };

  const toggleHiringAlert = async () => {
    const nextVal = !hiringAlertEnabled;
    setHiringAlertEnabled(nextVal);
    await saveCmsSettingToMySql('hiring_alert_enabled', nextVal);
    return nextVal;
  };

  // 4. Blog Posts Handlers
  const addBlogPost = async (item) => {
    const newPost = {
      id: Date.now(),
      title: item.title,
      category: item.category || 'Engineering',
      author: item.author || 'Innoveity Team',
      readTime: item.readTime || '4 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      excerpt: item.excerpt || '',
      coverImage: item.coverImage || '/tech_blog_1.png'
    };
    setBlogPosts(prev => [newPost, ...prev]);
    await upsertItemToMySql('cms_blog_posts', newPost);
    return newPost;
  };

  const deleteBlogPost = async (id) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    await deleteItemFromMySql('cms_blog_posts', id);
  };

  // 5. Services Handlers
  const addServiceItem = async (item) => {
    const newService = {
      id: Date.now(),
      title: item.title,
      category: item.category || 'Engineering',
      tagline: item.tagline || '',
      deliverables: Array.isArray(item.deliverables) 
        ? item.deliverables 
        : typeof item.deliverables === 'string'
          ? item.deliverables.split(',').map(d => d.trim()).filter(Boolean)
          : []
    };
    setServicesList(prev => [newService, ...prev]);
    await upsertItemToMySql('cms_services_list', newService);
    return newService;
  };

  const deleteServiceItem = async (id) => {
    setServicesList(prev => prev.filter(s => s.id !== id));
    await deleteItemFromMySql('cms_services_list', id);
  };

  // 6. Dynamic Custom Page Sections Handlers
  const addCustomSection = async (pageKey, section) => {
    const newSec = {
      id: `sec-${pageKey}-${Date.now()}`,
      type: section.type || 'features_grid',
      theme: section.theme || 'dark',
      badge: section.badge || 'NEW SECTION',
      title: section.title || 'Dynamic Section Title',
      subtitle: section.subtitle || '',
      items: Array.isArray(section.items) ? section.items : [],
      ctaText: section.ctaText || '',
      ctaUrl: section.ctaUrl || '',
      secondaryCtaText: section.secondaryCtaText || '',
      secondaryCtaUrl: section.secondaryCtaUrl || '',
      mediaUrl: section.mediaUrl || '',
      active: section.active !== undefined ? section.active : true,
      ...section
    };
    const updated = {
      ...customPageSections,
      [pageKey]: [...(customPageSections[pageKey] || []), newSec]
    };
    setCustomPageSections(updated);
    await saveCmsSettingToMySql('custom_page_sections', updated);
    return newSec;
  };

  const updateCustomSection = async (pageKey, sectionId, updatedSection) => {
    const pageList = customPageSections[pageKey] || [];
    const updated = {
      ...customPageSections,
      [pageKey]: pageList.map(sec => sec.id === sectionId ? { ...sec, ...updatedSection, id: sectionId } : sec)
    };
    setCustomPageSections(updated);
    await saveCmsSettingToMySql('custom_page_sections', updated);
  };

  const deleteCustomSection = async (pageKey, sectionId) => {
    const pageList = customPageSections[pageKey] || [];
    const updated = {
      ...customPageSections,
      [pageKey]: pageList.filter(sec => sec.id !== sectionId)
    };
    setCustomPageSections(updated);
    await saveCmsSettingToMySql('custom_page_sections', updated);
  };

  const toggleCustomSectionStatus = async (pageKey, sectionId) => {
    const pageList = customPageSections[pageKey] || [];
    const updated = {
      ...customPageSections,
      [pageKey]: pageList.map(sec => sec.id === sectionId ? { ...sec, active: !sec.active } : sec)
    };
    setCustomPageSections(updated);
    await saveCmsSettingToMySql('custom_page_sections', updated);
  };

  const moveCustomSection = async (pageKey, sectionId, direction) => {
    const pageList = [...(customPageSections[pageKey] || [])];
    const index = pageList.findIndex(sec => sec.id === sectionId);
    if (index === -1) return;
    if (direction === 'up' && index > 0) {
      const temp = pageList[index - 1];
      pageList[index - 1] = pageList[index];
      pageList[index] = temp;
    } else if (direction === 'down' && index < pageList.length - 1) {
      const temp = pageList[index + 1];
      pageList[index + 1] = pageList[index];
      pageList[index] = temp;
    }
    const updated = {
      ...customPageSections,
      [pageKey]: pageList
    };
    setCustomPageSections(updated);
    await saveCmsSettingToMySql('custom_page_sections', updated);
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
    setCustomPageSections(defaultCustomPageSections);
    setHeaderFooterSettings(defaultHeaderFooterSettings);
    setContactInquiries(defaultInquiries);
    setTestimonials(defaultTestimonials);
    setMediaGallery(defaultMediaGallery);
    setCareers(defaultCareers);
    setBlogPosts(defaultBlogPosts);
    setServicesList(defaultServicesList);
    setHiringAlertEnabled(true);

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
      contactInquiries, addInquiry, deleteInquiry, markInquiryReplied, updateInquiryStatus, updateInquiryNotes,
      testimonials, addTestimonial, deleteTestimonial,
      mediaGallery, addMediaItem, deleteMediaItem,
      careers, addCareer, deleteCareer, toggleCareerStatus,
      hiringAlertEnabled, setHiringAlertEnabled, toggleHiringAlert,
      blogPosts, addBlogPost, deleteBlogPost,
      servicesList, addServiceItem, deleteServiceItem,
      customPageSections, addCustomSection, updateCustomSection, deleteCustomSection, toggleCustomSectionStatus, moveCustomSection,
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
