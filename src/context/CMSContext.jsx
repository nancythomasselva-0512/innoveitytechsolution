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
  // Default Initial Data
  const defaultProjects = [
    {
      id: 1,
      title: 'Fluentia AI Language Platform',
      category: 'AI Language Platform',
      description: 'Experience high-performance, local client-side AI language processing and dynamic contextual learning within an intuitive web platform.',
      image: '/fluentia.png',
    },
    {
      id: 2,
      title: 'BioMed Summit',
      category: 'Medical Conference Website',
      description: 'A fully responsive and user-friendly medical conference platform designed to handle registrations, scheduling, and speaker profiles.',
      image: '/BioMed.png',
    },
    {
      id: 3,
      title: 'Formbuilder SaaS',
      category: 'Form Building Tool',
      description: 'A robust SaaS solution that allows users to create, manage, and analyze custom forms with advanced conditional logic.',
      image: '/Formbuilder.png',
    },
    {
      id: 4,
      title: 'Frankloo App',
      category: 'Mobile App (Concept)',
      description: 'A modern, accessible mobile application concept tailored for specialized service bookings and real-time tracking.',
      image: '/Frankloo.png',
    },
    {
      id: 5,
      title: 'IGH Educational Platform',
      category: 'E-Learning Portal',
      description: 'An interactive, feature-rich e-learning platform connecting students and educators with secure video streaming and material distribution.',
      image: '/IGH.png',
    },
    {
      id: 6,
      title: 'Innoveity Corporate Site',
      category: 'Corporate Website',
      description: 'The official corporate presence for Innoveity Tech Solution, showcasing our engineering capabilities, team, and services.',
      image: '/Innoveity.png',
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
    email: 'aachinancy@gmail.com',
    phone: '+91 7904327211',
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

  // Database Connection Status ('connected' | 'connecting' | 'fallback')
  const [dbStatus, setDbStatus] = useState(() => isMySqlConfigured() ? 'connecting' : 'fallback');

  // Primary CMS State (Directly populated from MySQL Database)
  const [projects, setProjects] = useState(defaultProjects);
  const [team, setTeam] = useState(defaultTeam);
  const [teamHeaderContent, setTeamHeaderContent] = useState(defaultTeamHeaderContent);
  const [contact, setContact] = useState(defaultContact);
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);
  const [showcaseHeader, setShowcaseHeader] = useState(defaultShowcaseHeader);
  const [showcaseProjects, setShowcaseProjects] = useState(defaultShowcaseProjects);
  const [seoSettings, setSeoSettings] = useState(defaultSeoSettings);
  const [pageSeoSettings, setPageSeoSettings] = useState(defaultPageSeoSettings);
  const [customFields, setCustomFields] = useState(defaultCustomFields);
  const [adminUsers, setAdminUsers] = useState(defaultAdminAccounts);

  // Transient Admin Session
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem('cms_session_sec_v1');
    return saved ? decryptData(saved, null) : null;
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
      if (s.seo_settings) setSeoSettings(s.seo_settings);
      if (s.page_seo_settings) setPageSeoSettings(s.page_seo_settings);
      if (s.custom_fields) setCustomFields(s.custom_fields);

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
      await saveCmsSettingToMySql('seo_settings', seoSettings);
      await saveCmsSettingToMySql('page_seo_settings', pageSeoSettings);
      await saveCmsSettingToMySql('custom_fields', customFields);

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
    await saveCmsSettingToMySql('contact', updatedContact);
  };

  const updateHomeContent = async (newContent) => {
    setHomeContent(newContent);
    await saveCmsSettingToMySql('home_content', newContent);
  };

  const updateAboutContent = async (newContent) => {
    setAboutContent(newContent);
    await saveCmsSettingToMySql('about_content', newContent);
  };

  const updateSeoSettings = async (newSeo) => {
    setSeoSettings(newSeo);
    await saveCmsSettingToMySql('seo_settings', newSeo);
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
    setProjects(defaultProjects);
    setShowcaseHeader(defaultShowcaseHeader);
    setShowcaseProjects(defaultShowcaseProjects);
    setTeam(defaultTeam);
    setTeamHeaderContent(defaultTeamHeaderContent);
    setContact(defaultContact);
    setHomeContent(defaultHomeContent);
    setAboutContent(defaultAboutContent);
    setSeoSettings(defaultSeoSettings);
    setPageSeoSettings(defaultPageSeoSettings);
    setCustomFields({});

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
      seoSettings, updateSeoSettings,
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
