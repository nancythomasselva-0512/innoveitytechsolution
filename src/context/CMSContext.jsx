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

  const defaultTeam = [
    { id: 1, name: 'Praveen', role: 'Team Member', image: '/Praveen.jpeg' },
    { id: 2, name: 'Nancy', role: 'Team Member', image: '/Nancy.jpeg' },
    { id: 3, name: 'Raghul', role: 'Team Member', image: '/Raghul.jpeg' },
    { id: 4, name: 'Zubariya', role: 'Team Member', image: '/Zubariya.jpeg' },
    { id: 5, name: 'Yeshwanth', role: 'Team Member', image: '/Yeshwanth.jpeg' },
    { id: 6, name: 'Anto', role: 'Team Member', image: '/Anto.jpeg' }
  ];

  const defaultContact = {
    email: 'websitet96@gmail.com',
    phone: '+91 9876543210',
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

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('cms_projects', JSON.stringify(projects));
  }, [projects]);

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
      if (e.key === 'cms_team_v2' && e.newValue) {
        setTeam(JSON.parse(e.newValue));
      }
      if (e.key === 'cms_contact' && e.newValue) {
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

  // Actions
  const addProject = (project) => setProjects([...projects, { ...project, id: Date.now() }]);
  const updateProject = (id, updatedProject) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };
  const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id));

  const addTeamMember = (member) => setTeam([...team, { ...member, id: Date.now() }]);
  const updateTeamMember = (id, updatedMember) => {
    setTeam(team.map(m => m.id === id ? { ...m, ...updatedMember } : m));
  };
  const deleteTeamMember = (id) => setTeam(team.filter(m => m.id !== id));
  
  const updateContact = (updatedContact) => setContact(updatedContact);
  const updateHomeContent = (newContent) => setHomeContent(newContent);
  const updateAboutContent = (newContent) => setAboutContent(newContent);

  return (
    <CMSContext.Provider value={{
      projects, addProject, updateProject, deleteProject,
      team, addTeamMember, updateTeamMember, deleteTeamMember,
      contact, updateContact,
      homeContent, updateHomeContent,
      aboutContent, updateAboutContent
    }}>
      {children}
    </CMSContext.Provider>
  );
};
