import React, { createContext, useContext, useState, useEffect } from 'react';

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
    { id: 1, name: 'Praveen', role: 'Team Member', image: '/Praveen.jpeg' },
    { id: 2, name: 'Nancy', role: 'Team Member', image: '/Nancy.jpeg' },
    { id: 3, name: 'Raghul', role: 'Team Member', image: '/Raghul.jpeg' },
    { id: 4, name: 'Zubariya', role: 'Team Member', image: '/Zubariya.jpeg' },
    { id: 5, name: 'Yeshwanth', role: 'Team Member', image: '/Yeshwanth.jpeg' },
    { id: 6, name: 'Anto', role: 'Team Member', image: '/Anto.jpeg' }
  ];

  const defaultContact = {
    email: 'aachinancy@gmail.com',
    phone: '+91 7904327211',
    address: 'MCC MRF Innovation Park, East Tambaram, Chennai - 600059'
  };

  const defaultHomeContent = {
    // Hero
    kicker: 'FUTURE-READY TECHNOLOGY SOLUTIONS',
    titleLine1: 'Innoveity Tech',
    titleLine2: 'Solution',
    description: 'Empowering businesses with innovative software development, AI-powered solutions, cloud technologies, mobile applications, web development, and digital transformation services that help organizations achieve sustainable growth.',
    
    // About Summary
    aboutKicker: "Let's Innovate Together",
    aboutTitle: 'Who We Are &\nOur Vision With You',
    aboutDesc: 'Innoveity Tech Solution is a forward-thinking technology partner dedicated to empowering businesses with innovative, secure, and scalable digital solutions. From custom software development to comprehensive digital transformations, we combine deep technical expertise with a customer-first approach to turn complex challenges into competitive advantages.',
    aboutFeature1Title: 'Custom Software',
    aboutFeature1Desc: 'Tailored enterprise applications designed to scale seamlessly.',
    aboutFeature2Title: 'Digital Transformation',
    aboutFeature2Desc: 'Integrating cutting-edge AI & cloud infrastructure into workflows.',

    // Services
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

  // State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('cms_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('cms_team_v2');
    return saved ? JSON.parse(saved) : defaultTeam;
  });

  const [contact, setContact] = useState(() => {
    const saved = localStorage.getItem('cms_contact_v3');
    return saved ? JSON.parse(saved) : defaultContact;
  });

  const [homeContent, setHomeContent] = useState(() => {
    const saved = localStorage.getItem('cms_home');
    return saved ? JSON.parse(saved) : defaultHomeContent;
  });

  const [aboutContent, setAboutContent] = useState(() => {
    const saved = localStorage.getItem('cms_about');
    return saved ? JSON.parse(saved) : defaultAboutContent;
  });

  const [showcaseHeader, setShowcaseHeader] = useState(() => {
    const saved = localStorage.getItem('cms_showcase_header_v2');
    return saved ? JSON.parse(saved) : defaultShowcaseHeader;
  });

  const [showcaseProjects, setShowcaseProjects] = useState(() => {
    const saved = localStorage.getItem('cms_showcase_projects_v2');
    return saved ? JSON.parse(saved) : defaultShowcaseProjects;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('cms_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('cms_showcase_header_v2', JSON.stringify(showcaseHeader));
  }, [showcaseHeader]);

  useEffect(() => {
    localStorage.setItem('cms_showcase_projects_v2', JSON.stringify(showcaseProjects));
  }, [showcaseProjects]);

  useEffect(() => {
    localStorage.setItem('cms_team_v2', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('cms_contact_v3', JSON.stringify(contact));
  }, [contact]);

  useEffect(() => {
    localStorage.setItem('cms_home', JSON.stringify(homeContent));
  }, [homeContent]);

  useEffect(() => {
    localStorage.setItem('cms_about', JSON.stringify(aboutContent));
  }, [aboutContent]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cms_projects' && e.newValue) {
        setProjects(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_showcase_header_v2' && e.newValue) {
        setShowcaseHeader(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_showcase_projects_v2' && e.newValue) {
        setShowcaseProjects(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_team_v2' && e.newValue) {
        setTeam(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_contact_v3' && e.newValue) {
        setContact(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_home' && e.newValue) {
        setHomeContent(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_about' && e.newValue) {
        setAboutContent(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
    home: [
      { id: 1, label: 'Secondary Banner', value: 'Special Technology Solutions 2026' }
    ],
    about: [
      { id: 1, label: 'Vision Tagline', value: 'Empowering Next-Gen Software Architecture' }
    ],
    contact: [
      { id: 1, label: 'Support Desk Hotline', value: '+91 7904327211 (24x7 Direct)' }
    ],
    seo: [
      { id: 1, label: 'Schema Markup Type', value: 'Organization / LocalBusiness' }
    ]
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

// Client-Side Security & Data Obfuscation Helpers
const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonString));
  } catch (e) {
    return JSON.stringify(data);
  }
};

const decryptData = (encryptedString, fallback) => {
  if (!encryptedString) return fallback;
  try {
    const jsonString = decodeURIComponent(atob(encryptedString));
    return JSON.parse(jsonString);
  } catch (e) {
    try {
      return JSON.parse(encryptedString);
    } catch (err) {
      return fallback;
    }
  }
};

  const [adminUsers, setAdminUsers] = useState(() => {
    const saved = localStorage.getItem('cms_admin_sec_v1');
    return saved ? decryptData(saved, defaultAdminAccounts) : defaultAdminAccounts;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    // Clear legacy localStorage session if present
    localStorage.removeItem('cms_session_sec_v1');
    const saved = sessionStorage.getItem('cms_session_sec_v1');
    return saved ? decryptData(saved, null) : null;
  });

  useEffect(() => {
    localStorage.setItem('cms_admin_sec_v1', encryptData(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('cms_session_sec_v1', encryptData(currentUser));
    } else {
      sessionStorage.removeItem('cms_session_sec_v1');
      localStorage.removeItem('cms_session_sec_v1');
    }
  }, [currentUser]);

  const addAdminUser = (user) => {
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
    return newUser;
  };

  const deleteAdminUser = (id) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
  };

  const toggleUserStatus = (id) => {
    setAdminUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
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

    return { success: true, user: updatedUser };
  };

  const logoutAdmin = () => {
    setCurrentUser(null);
  };

  const [seoSettings, setSeoSettings] = useState(() => {
    const saved = localStorage.getItem('cms_seo_v1');
    return saved ? JSON.parse(saved) : defaultSeoSettings;
  });

  const [pageSeoSettings, setPageSeoSettings] = useState(() => {
    const saved = localStorage.getItem('cms_page_seo_v1');
    return saved ? JSON.parse(saved) : defaultPageSeoSettings;
  });

  const [customFields, setCustomFields] = useState(() => {
    const saved = localStorage.getItem('cms_custom_fields_v1');
    return saved ? JSON.parse(saved) : defaultCustomFields;
  });

  useEffect(() => {
    localStorage.setItem('cms_seo_v1', JSON.stringify(seoSettings));
  }, [seoSettings]);

  useEffect(() => {
    localStorage.setItem('cms_page_seo_v1', JSON.stringify(pageSeoSettings));
  }, [pageSeoSettings]);

  useEffect(() => {
    localStorage.setItem('cms_custom_fields_v1', JSON.stringify(customFields));
  }, [customFields]);

  // Actions
  const addProject = (project) => setProjects([...projects, { ...project, id: Date.now() }]);
  const updateProject = (id, updatedProject) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };
  const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id));

  const addShowcaseProject = (project) => {
    const techArray = Array.isArray(project.tech)
      ? project.tech
      : (typeof project.tech === 'string' ? project.tech.split(',').map(t => t.trim()).filter(Boolean) : []);
    const newCard = {
      ...project,
      id: project.id || `showcase-${Date.now()}`,
      tech: techArray
    };
    setShowcaseProjects([...showcaseProjects, newCard]);
  };

  const updateShowcaseProject = (id, updatedProject) => {
    const techArray = Array.isArray(updatedProject.tech)
      ? updatedProject.tech
      : (typeof updatedProject.tech === 'string' ? updatedProject.tech.split(',').map(t => t.trim()).filter(Boolean) : []);
    setShowcaseProjects(showcaseProjects.map(p => p.id === id ? { ...p, ...updatedProject, tech: techArray } : p));
  };

  const deleteShowcaseProject = (id) => {
    setShowcaseProjects(showcaseProjects.filter(p => p.id !== id));
  };

  const updateShowcaseHeader = (newHeader) => {
    setShowcaseHeader(prev => ({ ...prev, ...newHeader }));
  };

  const addTeamMember = (member) => setTeam([...team, { ...member, id: Date.now() }]);
  const updateTeamMember = (id, updatedMember) => {
    setTeam(team.map(m => m.id === id ? { ...m, ...updatedMember } : m));
  };
  const deleteTeamMember = (id) => setTeam(team.filter(m => m.id !== id));
  
  const updateContact = (updatedContact) => setContact(updatedContact);
  const updateHomeContent = (newContent) => setHomeContent(newContent);
  const updateAboutContent = (newContent) => setAboutContent(newContent);
  const updateSeoSettings = (newSeo) => setSeoSettings(newSeo);
  
  const updatePageSeoSettings = (pageKey, newPageSeo) => {
    setPageSeoSettings(prev => ({
      ...prev,
      [pageKey]: { ...prev[pageKey], ...newPageSeo }
    }));
  };

  const addCustomField = (pageKey, field) => {
    setCustomFields(prev => ({
      ...prev,
      [pageKey]: [...(prev[pageKey] || []), { id: Date.now(), ...field }]
    }));
  };

  const deleteCustomField = (pageKey, id) => {
    setCustomFields(prev => ({
      ...prev,
      [pageKey]: (prev[pageKey] || []).filter(f => f.id !== id)
    }));
  };

  return (
    <CMSContext.Provider value={{
      projects, addProject, updateProject, deleteProject,
      showcaseProjects, addShowcaseProject, updateShowcaseProject, deleteShowcaseProject,
      showcaseHeader, updateShowcaseHeader,
      team, addTeamMember, updateTeamMember, deleteTeamMember,
      contact, updateContact,
      homeContent, updateHomeContent,
      aboutContent, updateAboutContent,
      seoSettings, updateSeoSettings,
      pageSeoSettings, updatePageSeoSettings,
      customFields, addCustomField, deleteCustomField,
      adminUsers, addAdminUser, deleteAdminUser, toggleUserStatus,
      currentUser, loginAdmin, logoutAdmin
    }}>
      {children}
    </CMSContext.Provider>
  );
};

