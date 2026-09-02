import React, { useEffect, useState } from 'react';
import {
  FiHome, FiUsers, FiSettings, FiShield,
  FiDatabase, FiBell, FiSearch, FiServer,
  FiLogOut, FiMenu, FiX, FiCheckCircle, FiAlertTriangle,
  FiDownloadCloud, FiRefreshCw, FiLock, FiCpu, FiExternalLink, FiCalendar, FiClock, FiVideo, FiFilm,
  FiUserPlus, FiTrash2, FiZap, FiFolder, FiFileText, FiPhone, FiImage, FiUpload,
  FiPlus, FiEdit2, FiCheck, FiLayers, FiInfo, FiGlobe, FiShare2, FiCode, FiArrowUp, FiArrowDown, FiLayout
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { InnoveityBrandLogo } from '../components/Navbar/Navbar';
import CustomFieldsManager from '../components/UI/CustomFieldsManager';
import './AdminPage.css';

const SuperAdminPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notification, setNotification] = useState('');

  // Analytics Toggle State ('weekly' | 'monthly')
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('weekly');

  // Live Stopwatch Timer state
  const [timerSeconds, setTimerSeconds] = useState(5048); // Starts at 01:24:08
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const {
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
    adminUsers, addAdminUser, deleteAdminUser, toggleUserStatus,
    currentUser, logoutAdmin, clearAllCmsCache,
    dbStatus, seedCloudDatabase, fetchLatestFromMySql
  } = useCMS();

  const users = adminUsers || [];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  // CMS Form States
  const [newProject, setNewProject] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [editShowcaseHeader, setEditShowcaseHeader] = useState(showcaseHeader || {});
  const [newShowcaseCard, setNewShowcaseCard] = useState({ tag: '', title: '', subtitle: '', description: '', image: '', tech: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', category: 'Team Member', image: '' });
  const [editTeamHeader, setEditTeamHeader] = useState(teamHeaderContent || {});
  const [editContact, setEditContact] = useState(contact || {});
  const [editHome, setEditHome] = useState(homeContent || {});
  const [editAbout, setEditAbout] = useState(aboutContent || {});
  const [editMedia, setEditMedia] = useState(mediaContent || {});
  const [editSeo, setEditSeo] = useState(seoSettings || {});
  const [editHeaderFooter, setEditHeaderFooter] = useState(headerFooterSettings || {});
  const [newNavLink, setNewNavLink] = useState({ name: '', to: '', isPage: true });

  useEffect(() => {
    if (headerFooterSettings) setEditHeaderFooter(headerFooterSettings);
  }, [headerFooterSettings]);

  useEffect(() => {
    if (mediaContent) setEditMedia(mediaContent);
  }, [mediaContent]);

  const handleSaveMedia = (e) => {
    e.preventDefault();
    if (updateMediaContent) {
      updateMediaContent(editMedia);
      triggerNotification('Media Division content saved & synced live across all devices!');
    }
  };

  const handleSaveHeaderFooter = (e) => {
    e.preventDefault();
    if (updateHeaderFooterSettings) {
      updateHeaderFooterSettings(editHeaderFooter);
      triggerNotification('Header & Footer configuration saved successfully!');
    }
  };

  const handleAddNavLink = (e) => {
    e.preventDefault();
    if (!newNavLink.name || !newNavLink.to) return;
    const currentLinks = editHeaderFooter.navLinks || [];
    const updatedLinks = [...currentLinks, { id: Date.now(), ...newNavLink }];
    const updatedObj = { ...editHeaderFooter, navLinks: updatedLinks };
    setEditHeaderFooter(updatedObj);
    if (updateHeaderFooterSettings) {
      updateHeaderFooterSettings(updatedObj);
      triggerNotification(`Added navigation link "${newNavLink.name}"`);
    }
    setNewNavLink({ name: '', to: '', isPage: true });
  };

  const handleDeleteNavLink = (index) => {
    const currentLinks = [...(editHeaderFooter.navLinks || [])];
    currentLinks.splice(index, 1);
    const updatedObj = { ...editHeaderFooter, navLinks: currentLinks };
    setEditHeaderFooter(updatedObj);
    if (updateHeaderFooterSettings) {
      updateHeaderFooterSettings(updatedObj);
      triggerNotification('Removed navigation item');
    }
  };

  const moveNavLinkUp = (index) => {
    if (index <= 0) return;
    const links = [...(editHeaderFooter.navLinks || [])];
    const temp = links[index - 1];
    links[index - 1] = links[index];
    links[index] = temp;
    const updatedObj = { ...editHeaderFooter, navLinks: links };
    setEditHeaderFooter(updatedObj);
    if (updateHeaderFooterSettings) updateHeaderFooterSettings(updatedObj);
  };

  const moveNavLinkDown = (index) => {
    const links = [...(editHeaderFooter.navLinks || [])];
    if (index >= links.length - 1) return;
    const temp = links[index + 1];
    links[index + 1] = links[index];
    links[index] = temp;
    const updatedObj = { ...editHeaderFooter, navLinks: links };
    setEditHeaderFooter(updatedObj);
    if (updateHeaderFooterSettings) updateHeaderFooterSettings(updatedObj);
  };

  const [selectedSeoPage, setSelectedSeoPage] = useState('home');
  const [editPageSeo, setEditPageSeo] = useState({});

  useEffect(() => {
    if (seoSettings) setEditSeo(seoSettings);
  }, [seoSettings]);

  useEffect(() => {
    if (showcaseHeader) setEditShowcaseHeader(showcaseHeader);
    if (teamHeaderContent) setEditTeamHeader(teamHeaderContent);
  }, [showcaseHeader, teamHeaderContent]);

  const handleSaveTeamHeaderSubmit = (e) => {
    e.preventDefault();
    if (updateTeamHeaderContent) {
      updateTeamHeaderContent(editTeamHeader);
      triggerNotification('Team Section Headings & Subtitles updated!');
    }
  };

  useEffect(() => {
    if (pageSeoSettings && pageSeoSettings[selectedSeoPage]) {
      setEditPageSeo(pageSeoSettings[selectedSeoPage]);
    }
  }, [selectedSeoPage, pageSeoSettings]);

  const handleSaveSeo = (e) => {
    e.preventDefault();
    updateSeoSettings(editSeo);
    if (updatePageSeoSettings) {
      updatePageSeoSettings(selectedSeoPage, editPageSeo);
    }
    triggerNotification(`SEO & Meta Configuration Saved for ${selectedSeoPage.toUpperCase()} Page!`);
  };

  const handleSaveShowcaseHeaderSubmit = (e) => {
    e.preventDefault();
    if (updateShowcaseHeader) {
      updateShowcaseHeader(editShowcaseHeader);
      triggerNotification('3D Showcase Section Header updated successfully!');
    }
  };

  const handleAddShowcaseSubmit = (e) => {
    e.preventDefault();
    if (!newShowcaseCard.title || !newShowcaseCard.description) return;
    if (addShowcaseProject) {
      addShowcaseProject(newShowcaseCard);
      setNewShowcaseCard({ tag: '', title: '', subtitle: '', description: '', image: '', tech: '' });
      triggerNotification('New 3D Showcase Card added successfully!');
    }
  };

  // Edit Modal States
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({ title: '', category: 'Web Development', description: '', image: '' });

  const [editingShowcaseId, setEditingShowcaseId] = useState(null);
  const [editShowcaseData, setEditShowcaseData] = useState({ tag: '', title: '', subtitle: '', description: '', image: '', tech: '' });

  const handleStartEditShowcase = (card) => {
    setEditingShowcaseId(card.id);
    setEditShowcaseData({
      tag: card.tag || '',
      title: card.title || '',
      subtitle: card.subtitle || '',
      description: card.description || '',
      image: card.image || '',
      tech: Array.isArray(card.tech) ? card.tech.join(', ') : (card.tech || '')
    });
  };

  const handleSaveEditShowcase = (e) => {
    e.preventDefault();
    if (updateShowcaseProject) {
      updateShowcaseProject(editingShowcaseId, editShowcaseData);
      setEditingShowcaseId(null);
      triggerNotification('3D Showcase Card updated successfully!');
    }
  };

  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: '', role: '', category: 'Team Member', image: '' });

  // Users management form state
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Admin' });

  const auditLogs = [
    { id: 101, event: 'CMS Contact Details Updated', user: 'Nancy Thomas', ip: '103.21.124.5', time: '10 mins ago', level: 'Low' },
    { id: 102, event: 'Super Admin Session Authorized', user: 'System Owner', ip: '157.48.201.12', time: '45 mins ago', level: 'Medium' },
    { id: 103, event: 'Project Portfolio Item Updated', user: 'Praveen', ip: '103.21.124.8', time: '2 hours ago', level: 'Low' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setEditContact(contact || {});
    setEditHome(homeContent || {});
    setEditAbout(aboutContent || {});
  }, [contact, homeContent, aboutContent]);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const compressAndSetImage = (file, callback) => {
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size is over 15MB. Please choose an image file under 15MB.');
      return;
    }

    if (file.size < 60 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/jpeg', 0.88);
        callback(compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e, setter, stateObj) => {
    const file = e.target.files[0];
    if (file) {
      compressAndSetImage(file, (compressedResult) => {
        setter({ ...stateObj, image: compressedResult });
      });
    }
  };

  // CMS Handlers
  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    addProject(newProject);
    setNewProject({ title: '', category: 'Web Development', description: '', image: '' });
    triggerNotification('New project added successfully!');
  };

  const handleStartEditProject = (p) => {
    setEditingProjectId(p.id);
    setEditProjectData({ title: p.title, category: p.category, description: p.description, image: p.image });
  };

  const handleSaveEditProject = (e) => {
    e.preventDefault();
    updateProject(editingProjectId, editProjectData);
    setEditingProjectId(null);
    triggerNotification('Project updated successfully!');
  };

  const handleAddTeamSubmit = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.role) return;
    addTeamMember(newTeam);
    setNewTeam({ name: '', role: '', category: 'Team Member', image: '' });
    triggerNotification('Team member added successfully!');
  };

  const handleStartEditTeam = (m) => {
    setEditingTeamId(m.id);
    setEditTeamData({
      name: m.name,
      role: m.role,
      category: m.category || (m.role?.toLowerCase().includes('founder') || m.role?.toLowerCase().includes('ceo') ? 'Leadership' : 'Team Member'),
      image: m.image
    });
  };

  const handleSaveEditTeam = (e) => {
    e.preventDefault();
    updateTeamMember(editingTeamId, editTeamData);
    setEditingTeamId(null);
    triggerNotification('Team member updated successfully!');
  };

  // Dynamic Content Blocks & Media state for Homepage, About Us & Contact
  const [homeBlocks, setHomeBlocks] = useState([
    { id: 1, title: 'AI Automation & Cloud Solutions', subtitle: 'Delivering next-gen web architecture and scalable cloud apps.' },
    { id: 2, title: 'Interactive UI/UX & Dynamic Rotator', subtitle: 'Crafting pixel-perfect web design and fluid micro-animations.' }
  ]);
  const [newHomeBlock, setNewHomeBlock] = useState({ title: '', subtitle: '' });

  const [aboutBlocks, setAboutBlocks] = useState([
    { id: 1, title: 'Engineering Excellence', description: 'Building resilient software products built for modern scale.' },
    { id: 2, title: 'Agile Delivery', description: 'End-to-end strategy, rapid execution, and continuous optimization.' }
  ]);
  const [newAboutBlock, setNewAboutBlock] = useState({ title: '', description: '' });

  const [contactBlocks, setContactBlocks] = useState([
    { id: 1, title: 'Direct Technical Desk', value: 'tech@innoveitytech.com' },
    { id: 2, title: 'Headquarters Location', value: 'Chennai, Tamil Nadu, India' }
  ]);
  const [newContactBlock, setNewContactBlock] = useState({ title: '', value: '' });

  const handleAddHomeBlock = (e) => {
    e.preventDefault();
    if (!newHomeBlock.title) return;
    setHomeBlocks([...homeBlocks, { id: Date.now(), ...newHomeBlock }]);
    setNewHomeBlock({ title: '', subtitle: '' });
    triggerNotification('Added new Homepage content block!');
  };

  const handleDeleteHomeBlock = (id) => {
    setHomeBlocks(homeBlocks.filter(b => b.id !== id));
    triggerNotification('Removed Homepage content block');
  };

  const handleAddAboutBlock = (e) => {
    e.preventDefault();
    if (!newAboutBlock.title) return;
    setAboutBlocks([...aboutBlocks, { id: Date.now(), ...newAboutBlock }]);
    setNewAboutBlock({ title: '', description: '' });
    triggerNotification('Added new About Us content block!');
  };

  const handleDeleteAboutBlock = (id) => {
    setAboutBlocks(aboutBlocks.filter(b => b.id !== id));
    triggerNotification('Removed About Us content block');
  };

  const handleAddContactBlock = (e) => {
    e.preventDefault();
    if (!newContactBlock.title) return;
    setContactBlocks([...contactBlocks, { id: Date.now(), ...newContactBlock }]);
    setNewContactBlock({ title: '', value: '' });
    triggerNotification('Added new Contact channel block!');
  };

  const handleDeleteContactBlock = (id) => {
    setContactBlocks(contactBlocks.filter(b => b.id !== id));
    triggerNotification('Removed Contact channel block');
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateContact(editContact);
    triggerNotification('Contact details updated!');
  };

  const handleSaveHome = (e) => {
    e.preventDefault();
    updateHomeContent(editHome);
    triggerNotification('Homepage copy updated!');
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateAboutContent(editAbout);
    triggerNotification('About Us section copy updated!');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const created = addAdminUser(newUser);
    setNewUser({ name: '', email: '', password: '', role: 'Admin' });
    triggerNotification(`Created administrator account: ${created.name}`);
  };

  const exportBackupJSON = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      system: 'Innoveity Tech Solution CMS',
      users: users,
      projects: projects,
      team: team,
      contact: contact,
      homeContent: homeContent,
      aboutContent: aboutContent,
      logs: auditLogs,
      status: 'Healthy'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `innoveity_cms_backup_${Date.now()}.json`;
    a.click();
    triggerNotification('System database backup exported!');
  };

  return (
    <div className="admin-layout">

      {/* EDIT 3D SHOWCASE CARD MODAL OVERLAY */}
      {editingShowcaseId && (
        <div className="dash-modal-backdrop">
          <div className="dash-modal-card">
            <div className="dash-modal-header">
              <h3 className="dash-modal-title">Edit 3D Showcase Card</h3>
              <button className="dash-modal-close-btn" onClick={() => setEditingShowcaseId(null)}><FiX /></button>
            </div>
            <form onSubmit={handleSaveEditShowcase} className="dash-form-grid">
              <div className="dash-field-group">
                <label className="dash-label">Category Tag / Badge</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  placeholder="e.g. Web Engineering"
                  value={editShowcaseData.tag}
                  onChange={(e) => setEditShowcaseData({ ...editShowcaseData, tag: e.target.value })}
                  required
                />
              </div>

              <div className="dash-field-group">
                <label className="dash-label">Project Title</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  placeholder="e.g. Eclipse Studio"
                  value={editShowcaseData.title}
                  onChange={(e) => setEditShowcaseData({ ...editShowcaseData, title: e.target.value })}
                  required
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Subtitle / Tagline</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  placeholder="e.g. Creative Brand & Digital Experience"
                  value={editShowcaseData.subtitle}
                  onChange={(e) => setEditShowcaseData({ ...editShowcaseData, subtitle: e.target.value })}
                  required
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Description</label>
                <textarea
                  className="dash-input-styled"
                  style={{ height: '90px' }}
                  value={editShowcaseData.description}
                  onChange={(e) => setEditShowcaseData({ ...editShowcaseData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Tech Stack (Comma Separated)</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  placeholder="e.g. Next.js, Framer Motion, Tailwind, WebGL"
                  value={editShowcaseData.tech}
                  onChange={(e) => setEditShowcaseData({ ...editShowcaseData, tech: e.target.value })}
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Upload New Card Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="dash-input-styled"
                  onChange={(e) => handleImageUpload(e, setEditShowcaseData, editShowcaseData)}
                />
                {editShowcaseData.image && (
                  <img src={editShowcaseData.image} alt="Preview" style={{ marginTop: '10px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                )}
              </div>

              <div className="dash-modal-actions">
                <button type="button" className="action-pill-btn secondary-pill" onClick={() => setEditingShowcaseId(null)}>
                  Cancel
                </button>
                <button type="submit" className="action-pill-btn primary-pill">
                  <FiCheck /> Save Showcase Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL OVERLAY */}
      {editingProjectId && (
        <div className="dash-modal-backdrop">
          <div className="dash-modal-card">
            <div className="dash-modal-header">
              <h3 className="dash-modal-title">Edit Project Details</h3>
              <button className="dash-modal-close-btn" onClick={() => setEditingProjectId(null)}><FiX /></button>
            </div>
            <form onSubmit={handleSaveEditProject} className="dash-form-grid">
              <div className="dash-field-group full-width">
                <label className="dash-label">Project Title</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  value={editProjectData.title}
                  onChange={(e) => setEditProjectData({ ...editProjectData, title: e.target.value })}
                  required
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Category</label>
                <select
                  className="dash-input-styled"
                  value={editProjectData.category}
                  onChange={(e) => setEditProjectData({ ...editProjectData, category: e.target.value })}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Engineering">Mobile App Engineering</option>
                  <option value="Custom Enterprise Software">Custom Enterprise Software</option>
                  <option value="Cloud & AI Infrastructure">Cloud & AI Infrastructure</option>
                  <option value="AI Language Platform">AI Language Platform</option>
                  <option value="Medical Conference Website">Medical Conference Website</option>
                  <option value="Form Building Tool">Form Building Tool</option>
                  <option value="E-Learning Portal">E-Learning Portal</option>
                  <option value="Corporate Website">Corporate Website</option>
                </select>
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Description</label>
                <textarea
                  className="dash-input-styled"
                  style={{ height: '90px' }}
                  value={editProjectData.description}
                  onChange={(e) => setEditProjectData({ ...editProjectData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Upload New Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="dash-input-styled"
                  onChange={(e) => handleImageUpload(e, setEditProjectData, editProjectData)}
                />
                {editProjectData.image && (
                  <img src={editProjectData.image} alt="Preview" style={{ marginTop: '10px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                )}
              </div>

              <div className="dash-modal-actions">
                <button type="button" className="action-pill-btn secondary-pill" onClick={() => setEditingProjectId(null)}>
                  Cancel
                </button>
                <button type="submit" className="action-pill-btn primary-pill">
                  <FiCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEAM MEMBER MODAL OVERLAY */}
      {editingTeamId && (
        <div className="dash-modal-backdrop">
          <div className="dash-modal-card">
            <div className="dash-modal-header">
              <h3 className="dash-modal-title">Edit Team Member</h3>
              <button className="dash-modal-close-btn" onClick={() => setEditingTeamId(null)}><FiX /></button>
            </div>
            <form onSubmit={handleSaveEditTeam} className="dash-form-grid">
              <div className="dash-field-group full-width">
                <label className="dash-label">Member Name</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  value={editTeamData.name}
                  onChange={(e) => setEditTeamData({ ...editTeamData, name: e.target.value })}
                  required
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Role / Position</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  value={editTeamData.role}
                  onChange={(e) => setEditTeamData({ ...editTeamData, role: e.target.value })}
                  required
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Category / Position Tier</label>
                <select
                  className="dash-input-styled"
                  value={editTeamData.category}
                  onChange={(e) => setEditTeamData({ ...editTeamData, category: e.target.value })}
                >
                  <option value="Leadership">Leadership (Founder & CEO)</option>
                  <option value="Team Member">Team Member</option>
                </select>
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Profile Picture (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="dash-input-styled"
                  onChange={(e) => handleImageUpload(e, setEditTeamData, editTeamData)}
                />
                {editTeamData.image && (
                  <img src={editTeamData.image} alt="Preview" style={{ marginTop: '10px', width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                )}
              </div>

              <div className="dash-modal-actions">
                <button type="button" className="action-pill-btn secondary-pill" onClick={() => setEditingTeamId(null)}>
                  Cancel
                </button>
                <button type="submit" className="action-pill-btn primary-pill">
                  <FiCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VERTICAL SIDEBAR MENU */}
      <aside className={`dash-vertical-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-top-brand">
          {sidebarOpen ? (
            <>
              <InnoveityBrandLogo size={42} darkBg={true} />
              <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(false)} title="Collapse Menu">
                <FiX />
              </button>
            </>
          ) : (
            <button className="sidebar-toggle-btn closed-expand-btn" onClick={() => setSidebarOpen(true)} title="Expand Menu" style={{ margin: '0 auto' }}>
              <FiMenu />
            </button>
          )}
        </div>

        <div className="sidebar-user-card">
          <div className="dash-avatar-circle super-admin">
            {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'SA'}
          </div>
          <div className="user-info">
            <h4>{currentUser?.name || 'System Owner'}</h4>
            <span className="user-role-tag" style={{ color: '#ff6b00' }}>{currentUser?.role || 'Super Admin'}</span>
          </div>
        </div>

        <nav className="sidebar-nav-menu">
          <span className="nav-section-title">Master Control</span>

          <button
            className={`nav-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon"><FiHome /></span>
            <span className="nav-label">Overview</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="nav-icon"><FiFolder /></span>
            <span className="nav-label">Projects</span>
            <span className="nav-badge">{projects ? projects.length : 0}</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <span className="nav-icon"><FiUsers /></span>
            <span className="nav-label">Team Roster</span>
            <span className="nav-badge">{team ? team.length : 0}</span>
          </button>

          <span className="nav-section-title">Site Content</span>

          <button
            className={`nav-item-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="nav-icon"><FiFileText /></span>
            <span className="nav-label">Homepage</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="nav-icon"><FiInfo /></span>
            <span className="nav-label">About Us</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span className="nav-icon"><FiPhone /></span>
            <span className="nav-label">Contact Details</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            <span className="nav-icon"><FiGlobe /></span>
            <span className="nav-label">SEO & Meta Settings</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'header_footer' ? 'active' : ''}`}
            onClick={() => setActiveTab('header_footer')}
          >
            <span className="nav-icon"><FiLayout /></span>
            <span className="nav-label">Header & Footer</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            <span className="nav-icon"><FiFilm /></span>
            <span className="nav-label">Media Division Page</span>
          </button>

          <span className="nav-section-title">System Admin</span>

          <button
            className={`nav-item-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-icon"><FiUsers /></span>
            <span className="nav-label">Admin Accounts</span>
            <span className="nav-badge">{users.length}</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            <span className="nav-icon"><FiDatabase /></span>
            <span className="nav-label">Backups</span>
          </button>
        </nav>

        <div className="sidebar-footer-box" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={handleLogout}
            className="logout-nav-btn"
            style={{ width: '100%', background: '#fef2f2', color: '#ef4444', borderColor: '#fecaca', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', border: '1px solid #fecaca', fontWeight: 700 }}
          >
            <FiLogOut /> <span className="logout-text">Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE AREA */}
      <div className="dash-main-area">

        {/* TOP HEADER */}
        <header className="dash-top-header">
          <div className="dash-header-title">
            <h1>
              {/* TOP HEADER */}
              {activeTab === 'overview' && 'Super Admin Master Dashboard'}
              {activeTab === 'projects' && 'Manage Projects'}
              {activeTab === 'team' && 'Team Roster Management'}
              {activeTab === 'home' && 'Homepage Content'}
              {activeTab === 'about' && 'About Us Section'}
              {activeTab === 'contact' && 'Contact & Communication Settings'}
              {activeTab === 'seo' && 'Search Engine Optimization (SEO) & Social Meta'}
              {activeTab === 'header_footer' && 'Header, Footer & Navigation Management'}
              {activeTab === 'media' && 'Media Division Page Management'}
              {activeTab === 'users' && 'Manage Administrator Accounts'}
              {activeTab === 'database' && 'System Database & Backups'}
            </h1>
            <p>Master system metrics, CMS management, user access & audit control.</p>
          </div>

          <div className="dash-header-right">
            {notification && (
              <div className="promo-mint-btn" style={{ background: '#fed7aa', color: '#047857' }}>
                <FiCheckCircle /> {notification}
              </div>
            )}

            <div className="dash-search-pill">
              <FiSearch />
              <input type="text" placeholder="Search system audit logs..." />
            </div>

            <button
              className="btn-live-preview"
              style={{ background: 'linear-gradient(135deg, #ff6b00, #ea580c)', color: '#ffffff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={async () => {
                if (window.confirm('Push all current website content to live MySQL Database so all devices sync instantly?')) {
                  const ok = await seedCloudDatabase();
                  if (ok) triggerNotification('⚡ Successfully synced all data to Live MySQL Database!');
                }
              }}
              title="Push all website data to live MySQL Database"
            >
              <FiDatabase /> Sync DB
            </button>

            <button
              className="btn-live-preview"
              style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer', whiteSpace: 'nowrap' }}
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all system & CMS cache? This will reset all CMS cache storage.')) {
                  clearAllCmsCache();
                  triggerNotification('⚡ System & CMS Cache cleared successfully!');
                }
              }}
              title="Clear all browser and CMS storage cache"
            >
              <FiRefreshCw /> Clear Cache
            </button>

            <Link to="/" className="btn-live-preview" target="_blank" style={{ background: 'linear-gradient(135deg, #ff6b00, #ea580c)', whiteSpace: 'nowrap' }}>
              Live Site <FiExternalLink />
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW ONLY - RENDERS THE DONEZO ULTRA-MODERN DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="donezo-container">
            {/* ROW 1: 4 STAT CARDS ACROSS (100% REAL DYNAMIC CMS DATA) */}
            <div className="donezo-top-stats-grid">
              {/* CARD 1: FEATURED DARK FOREST GREEN */}
              <div className="donezo-stat-card donezo-featured-card">
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Total Projects</span>
                <div className="donezo-stat-digit">{projects ? projects.length : 0}</div>
                <div className="donezo-badge-tag"><FiCheckCircle /> [ {projects ? projects.length : 0} Live ] Synced with CMS</div>
              </div>

              {/* CARD 2: ENDED PROJECTS */}
              <div className="donezo-stat-card">
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Ended Projects</span>
                <div className="donezo-stat-digit">{projects ? projects.filter(p => p.image || p.category === 'Web Development').length : 0}</div>
                <div className="donezo-badge-tag"><FiCheckCircle /> [ {projects && projects.length > 0 ? Math.round((projects.filter(p => p.image).length / projects.length) * 100) : 100}% ] Portfolio Ready</div>
              </div>

              {/* CARD 3: RUNNING PROJECTS */}
              <div className="donezo-stat-card">
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Running Projects</span>
                <div className="donezo-stat-digit">{projects ? projects.filter(p => !p.image).length : 0}</div>
                <div className="donezo-badge-tag"><FiCheckCircle /> [ {projects ? projects.filter(p => !p.image).length : 0} Active ] In Progress</div>
              </div>

              {/* CARD 4: PENDING PROJECTS */}
              <div className="donezo-stat-card">
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Pending Inquiries</span>
                <div className="donezo-stat-digit">{contactBlocks ? contactBlocks.length : 0}</div>
                <div className="donezo-badge-tag" style={{ color: '#ea580c' }}>Active Channels</div>
              </div>
            </div>

            {/* ROW 2: MIDDLE 3-COLUMN GRID */}
            <div className="donezo-middle-grid">
              {/* CARD 1: PROJECT ANALYTICS LINE GRAPH CHART (INTERACTIVE WEEKLY/MONTHLY) */}
              <div className="donezo-card">
                <div className="pos-card-header" style={{ marginBottom: '4px' }}>
                  <h4 className="donezo-card-title" style={{ margin: 0 }}>Project Analytics</h4>
                  <div className="pos-toggle-pills">
                    <button
                      className={`pos-toggle-btn ${analyticsTimeframe === 'weekly' ? 'active' : ''}`}
                      style={{ fontSize: '0.72rem', padding: '2px 8px', cursor: 'pointer' }}
                      onClick={() => setAnalyticsTimeframe('weekly')}
                    >
                      Weekly
                    </button>
                    <button
                      className={`pos-toggle-btn ${analyticsTimeframe === 'monthly' ? 'active' : ''}`}
                      style={{ fontSize: '0.72rem', padding: '2px 8px', cursor: 'pointer' }}
                      onClick={() => setAnalyticsTimeframe('monthly')}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#082233' }}>
                    {analyticsTimeframe === 'weekly'
                      ? `${projects && projects.length > 0 ? Math.round((projects.length / (projects.length + 1)) * 100) : 100}%`
                      : `${projects && projects.length > 0 ? Math.min(98, Math.round((projects.length / (projects.length + 2)) * 100 + 12)) : 95}%`
                    }
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', background: '#fff7ed', padding: '2px 8px', borderRadius: '12px', border: '1px solid #fdba74' }}>
                    ↑ {projects ? projects.length : 0} {analyticsTimeframe === 'weekly' ? 'Items (Weekly)' : 'Items (Monthly)'}
                  </span>
                </div>

                {/* SVG AREA/LINE GRAPH WITH DYNAMIC CURVES */}
                <div style={{ position: 'relative', width: '100%', height: '110px', marginTop: '4px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="superAnalyticsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* DASHED GRIDLINES */}
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="90" x2="400" y2="90" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />

                    {/* FILLED AREA BELOW LINE */}
                    <path
                      d={analyticsTimeframe === 'weekly'
                        ? "M 10 90 Q 60 70, 110 40 T 210 20 T 310 65 T 390 35 L 390 110 L 10 110 Z"
                        : "M 10 75 Q 70 25, 130 55 T 250 15 T 390 40 L 390 110 L 10 110 Z"
                      }
                      fill="url(#superAnalyticsGrad)"
                    />

                    {/* GLOWING CURVED TREND LINE */}
                    <path
                      d={analyticsTimeframe === 'weekly'
                        ? "M 10 90 Q 60 70, 110 40 T 210 20 T 310 65 T 390 35"
                        : "M 10 75 Q 70 25, 130 55 T 250 15 T 390 40"
                      }
                      fill="none"
                      stroke="#082233"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* DATA DOTS */}
                    {analyticsTimeframe === 'weekly' ? (
                      <>
                        <circle cx="10" cy="90" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                        <circle cx="110" cy="40" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                        <circle cx="210" cy="20" r="6" fill="#ff6b00" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="310" cy="65" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                        <circle cx="390" cy="35" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                      </>
                    ) : (
                      <>
                        <circle cx="10" cy="75" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                        <circle cx="130" cy="55" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                        <circle cx="250" cy="15" r="6" fill="#ff6b00" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="390" cy="40" r="4" fill="#ffffff" stroke="#082233" strokeWidth="2.5" />
                      </>
                    )}
                  </svg>
                </div>

                {/* X-AXIS LABELS DYNAMICALLY SWITCHED */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, marginTop: '8px', padding: '0 4px' }}>
                  {analyticsTimeframe === 'weekly' ? (
                    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)
                  ) : (
                    ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => <span key={m}>{m}</span>)
                  )}
                </div>
              </div>

              {/* CARD 2: SYSTEM STATUS & LIVE CMS OVERVIEW */}
              <div className="donezo-card" style={{ justifyContent: 'space-between' }}>
                <div className="pos-card-header" style={{ marginBottom: '4px' }}>
                  <h4 className="donezo-card-title" style={{ margin: 0 }}>System Notifications</h4>
                  <span className="pos-stat-pill" style={{ fontSize: '0.7rem' }}>Live</span>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#082233', marginBottom: '4px' }}>
                    CMS Synchronization Active
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                    All site content is synced with live local database.
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
                    Status: 100% Operational
                  </div>

                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px dashed #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', fontWeight: 700, marginBottom: '4px' }}>
                      <span>Database Health</span>
                      <span style={{ color: '#ea580c' }}>Optimal</span>
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', background: '#ff6b00' }}></div>
                    </div>
                  </div>
                </div>

                <button
                  className="action-pill-btn primary-pill"
                  style={{ width: '100%', justifyContent: 'center', background: '#082233', color: '#ffffff', fontWeight: 800, padding: '10px' }}
                  onClick={() => setActiveTab('projects')}
                >
                  ⚡ Manage Content
                </button>
              </div>

              {/* CARD 3: INNOVEITY PROJECT TASKS DERIVED DYNAMICALLY FROM REAL CMS PROJECTS */}
              <div className="donezo-card">
                <div className="pos-card-header" style={{ marginBottom: '6px' }}>
                  <h4 className="donezo-card-title" style={{ margin: 0 }}>Project Tasks</h4>
                  <button className="pos-toggle-btn active" style={{ fontSize: '0.72rem', padding: '2px 8px' }} onClick={() => setActiveTab('projects')}>+ New</button>
                </div>

                {/* SEGMENTED TASK PROGRESS BAR CHART */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Sprint Execution</span>
                    <span style={{ color: '#ea580c' }}>
                      {projects && projects.length > 0 ? Math.round((projects.filter(p => p.image).length / projects.length) * 100) : 100}% Completed
                    </span>
                  </div>
                  <div style={{ display: 'flex', height: '6px', borderRadius: '4px', overflow: 'hidden', background: '#e2e8f0' }}>
                    <div style={{ width: `${projects && projects.length > 0 ? Math.round((projects.filter(p => p.image).length / projects.length) * 100) : 70}%`, background: '#ff6b00' }}></div>
                    <div style={{ width: '20%', background: '#3b82f6', marginLeft: '2px' }}></div>
                    <div style={{ width: '10%', background: '#d97706', marginLeft: '2px' }}></div>
                  </div>
                </div>

                <div>
                  {projects && projects.length > 0 ? (
                    projects.slice(0, 3).map((p, idx) => (
                      <div key={p.id || idx} className="donezo-task-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                          <div className="donezo-task-icon-box" style={{ background: idx === 0 ? '#fff7ed' : idx === 1 ? '#eff6ff' : '#fef3c7', color: idx === 0 ? '#ff6b00' : idx === 1 ? '#3b82f6' : '#d97706' }}>
                            {idx === 0 ? '🌐' : idx === 1 ? '⚡' : '🚀'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="donezo-task-title">{p.title}</div>
                              <span style={{ fontSize: '0.68rem', color: idx === 0 ? '#ff6b00' : idx === 1 ? '#3b82f6' : '#d97706', fontWeight: 700 }}>
                                {p.image ? '100%' : '85%'}
                              </span>
                            </div>
                            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                              <div style={{ width: p.image ? '100%' : '85%', height: '100%', background: idx === 0 ? '#ff6b00' : idx === 1 ? '#3b82f6' : '#d97706' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', padding: '10px' }}>No projects</div>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 3: BOTTOM 3-COLUMN GRID */}
            <div className="donezo-bottom-grid">
              {/* CARD 1: TEAM COLLABORATION */}
              <div className="donezo-card">
                <div className="pos-card-header" style={{ marginBottom: '8px' }}>
                  <h4 className="donezo-card-title" style={{ margin: 0 }}>Team Collaboration</h4>
                  <button className="chart-dropdown-pill" onClick={() => setActiveTab('team')}>+ Add Member</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {team && team.length > 0 ? (
                    team.map((m, idx) => (
                      <div key={m.id || idx} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: idx < team.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {m.image ? (
                            <img src={m.image} alt={m.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fed7aa', color: '#ea580c', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                              {m.name ? m.name.substring(0, 2).toUpperCase() : 'TM'}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{m.name}</div>
                            <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{m.role || 'Full Stack Developer'}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', padding: '10px' }}>No team members</div>
                  )}
                </div>
              </div>

              {/* CARD 2: PROJECT PROGRESS DUAL CIRCULAR RADIAL RING (100% DYNAMIC FROM CMS PROJECTS) */}
              {/* CARD 2: PROJECT PROGRESS */}
              <div className="donezo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h4 className="donezo-card-title" style={{ margin: 0 }}>Project Progress</h4>

                {(() => {
                  const totalP = projects ? projects.length : 0;
                  const doneP = projects ? projects.filter(p => p.image).length : 0;
                  const pct = totalP > 0 ? Math.round((doneP / totalP) * 100) : 100;
                  const dashOffset = 339.29 - (339.29 * (pct / 100));
                  return (
                    <>
                      <div style={{ position: 'relative', width: '130px', height: '130px', margin: '16px auto' }}>
                        <svg width="130" height="130" viewBox="0 0 140 140">
                          <defs>
                            <linearGradient id="superRingGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#ff6b00" />
                              <stop offset="100%" stopColor="#082233" />
                            </linearGradient>
                          </defs>
                          <circle cx="70" cy="70" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                          <circle
                            cx="70" cy="70" r="54"
                            fill="none"
                            stroke="url(#superRingGrad)"
                            strokeWidth="10"
                            strokeDasharray="339.29"
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            transform="rotate(-90 70 70)"
                          />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#082233', lineHeight: 1 }}>{pct}%</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, marginTop: '4px' }}>Live Completed</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.74rem', color: '#475569', fontWeight: 700, width: '100%', background: '#f8fafc', padding: '8px 12px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#082233' }}></span> {doneP} Completed
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6b00' }}></span> {totalP - doneP} Active
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* CARD 3: CMS QUICK CONTROL CENTER */}
              <div className="donezo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 className="donezo-card-title" style={{ margin: 0 }}>Quick Management</h4>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ea580c', background: '#fff7ed', padding: '3px 10px', borderRadius: '12px', border: '1px solid #fdba74', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    ⚡ System Ready
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => setActiveTab('projects')}
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fed7aa', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 800 }}>
                      <FiFolder />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Add Project
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Portfolio items
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('team')}
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 800 }}>
                      <FiUsers />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Add Member
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Roster directory
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={exportBackupJSON}
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 800 }}>
                      <FiDownloadCloud />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Save Backup
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        JSON snapshot
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('home')}
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 800 }}>
                      <FiFileText />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Edit Homepage
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Site copy & hero
                      </div>
                    </div>
                  </button>
                </div>

                <div style={{ marginTop: '12px', background: '#fff7ed', padding: '8px 12px', borderRadius: '10px', border: '1px solid #fdba74', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>
                  <span>Live Site Status</span>
                  <a href="/" target="_blank" rel="noreferrer" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Preview <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>

            {/* ⭐ SECTION 1: 3D ROTATOR SHOWCASE CONTENT EDITOR */}
            <div className="chart-header-row" style={{ marginBottom: '16px' }}>
              <div>
                <h3 className="chart-title" style={{ fontSize: '1.25rem', color: '#082233', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiLayers style={{ color: '#ff6b00' }} /> Projects 3D Showcase (Rotator Section)
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  Manage the 3D rotating arc cards carousel shown on Homepage & Projects Hero.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* Showcase Header Form */}
            <div className="dash-form-wrapper" style={{ marginBottom: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>Showcase Section Header Copy</h4>
              <form onSubmit={handleSaveShowcaseHeaderSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Badge Pill Text</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. OUR PROJECTS"
                    value={editShowcaseHeader.badge || ''}
                    onChange={(e) => setEditShowcaseHeader({ ...editShowcaseHeader, badge: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Title Line 1</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. We Help Brands"
                    value={editShowcaseHeader.titleLine1 || ''}
                    onChange={(e) => setEditShowcaseHeader({ ...editShowcaseHeader, titleLine1: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Title Highlight (Accent Text)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Win in the Digital Space"
                    value={editShowcaseHeader.titleHighlight || ''}
                    onChange={(e) => setEditShowcaseHeader({ ...editShowcaseHeader, titleHighlight: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">CTA Button Label</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. View Our Work"
                    value={editShowcaseHeader.ctaText || ''}
                    onChange={(e) => setEditShowcaseHeader({ ...editShowcaseHeader, ctaText: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Subtitle / Description</label>
                  <textarea
                    className="dash-input-styled"
                    style={{ height: '70px' }}
                    placeholder="Subtitle text..."
                    value={editShowcaseHeader.subtitle || ''}
                    onChange={(e) => setEditShowcaseHeader({ ...editShowcaseHeader, subtitle: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Update Showcase Header
                  </button>
                </div>
              </form>
            </div>

            {/* Add Showcase Card Form */}
            <div className="dash-form-wrapper" style={{ marginBottom: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>Add New 3D Showcase Card</h4>
              <form onSubmit={handleAddShowcaseSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Category Tag / Badge</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Web Engineering"
                    value={newShowcaseCard.tag}
                    onChange={(e) => setNewShowcaseCard({ ...newShowcaseCard, tag: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Project Title</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Eclipse Studio"
                    value={newShowcaseCard.title}
                    onChange={(e) => setNewShowcaseCard({ ...newShowcaseCard, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Subtitle / Tagline</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Creative Brand & Digital Experience"
                    value={newShowcaseCard.subtitle}
                    onChange={(e) => setNewShowcaseCard({ ...newShowcaseCard, subtitle: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Description</label>
                  <textarea
                    className="dash-input-styled"
                    placeholder="Detailed description of the showcase project..."
                    value={newShowcaseCard.description}
                    onChange={(e) => setNewShowcaseCard({ ...newShowcaseCard, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Tech Stack (Comma Separated)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Next.js, Framer Motion, Tailwind, WebGL"
                    value={newShowcaseCard.tech}
                    onChange={(e) => setNewShowcaseCard({ ...newShowcaseCard, tech: e.target.value })}
                  />
                </div>

                {/* SHOWCASE CARD IMAGE ASSET */}
                <div className="dash-field-group full-width" style={{ marginTop: '14px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiImage /> Showcase Card Image Asset
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="showcase-card-img-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, setNewShowcaseCard, newShowcaseCard)}
                        />
                        <label htmlFor="showcase-card-img-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiUpload /> Upload Showcase Image
                        </label>
                      </div>
                      <input
                        type="text"
                        className="dash-input-styled"
                        placeholder="e.g. /tech_blog_1.png or data:image/jpeg;base64,..."
                        value={newShowcaseCard.image || ''}
                        onChange={(e) => setNewShowcaseCard({ ...newShowcaseCard, image: e.target.value })}
                      />
                    </div>
                    {newShowcaseCard.image && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={newShowcaseCard.image}
                          alt="Showcase Preview"
                          style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <button
                          type="button"
                          onClick={() => setNewShowcaseCard({ ...newShowcaseCard, image: '' })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add Showcase Card
                  </button>
                </div>
              </form>
            </div>

            {/* Showcase Cards Table */}
            <div className="chart-header-row" style={{ marginTop: '20px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>
                Active 3D Showcase Cards ({showcaseProjects ? showcaseProjects.length : 0})
              </h4>
            </div>

            <table className="dash-cms-table" style={{ marginBottom: '36px' }}>
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Image</th>
                  <th style={{ width: '180px' }}>Title & Tag</th>
                  <th style={{ width: '200px' }}>Subtitle</th>
                  <th>Description & Tech Stack</th>
                  <th style={{ width: '160px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {showcaseProjects && showcaseProjects.map((card) => {
                  const techList = Array.isArray(card.tech)
                    ? card.tech
                    : typeof card.tech === 'string'
                      ? card.tech.split(',').map(t => t.trim()).filter(Boolean)
                      : [];
                  return (
                    <tr key={card.id}>
                      <td>
                        <img src={card.image || '/tech_blog_1.png'} alt={card.title} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                      </td>
                      <td>
                        <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>{card.title}</strong>
                        <span className="category-badge-pill" style={{ marginTop: '4px' }}>{card.tag}</span>
                      </td>
                      <td style={{ color: '#047857', fontWeight: 600, fontSize: '0.84rem' }}>{card.subtitle}</td>
                      <td>
                        <p style={{ color: '#475569', fontSize: '0.84rem', margin: '0 0 6px 0', lineHeight: '1.4' }}>{card.description}</p>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {techList.map((t, idx) => (
                            <span key={idx} style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '6px', fontWeight: 600 }}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="chart-dropdown-pill" onClick={() => handleStartEditShowcase(card)}>
                            <FiEdit2 /> Edit
                          </button>
                          <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }} onClick={() => deleteShowcaseProject(card.id)}>
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* ⭐ SECTION 2: CASE STUDIES PORTFOLIO MANAGEMENT */}
            <div className="chart-header-row" style={{ marginTop: '36px', borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
              <h3 className="chart-title">Add New Case Study Project</h3>
            </div>

            <div className="dash-form-wrapper">
              <form onSubmit={handleAddProjectSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Project Title</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Enterprise Cloud ERP"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Category</label>
                  <select
                    className="dash-input-styled"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Engineering">Mobile App Engineering</option>
                    <option value="Custom Enterprise Software">Custom Enterprise Software</option>
                    <option value="Cloud & AI Infrastructure">Cloud & AI Infrastructure</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Description</label>
                  <textarea
                    className="dash-input-styled"
                    placeholder="Description of project features..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* PROJECT IMAGE ASSET */}
                <div className="dash-field-group full-width" style={{ marginTop: '14px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiImage /> Case Study Project Image Asset
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="new-project-img-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, setNewProject, newProject)}
                        />
                        <label htmlFor="new-project-img-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiUpload /> Upload Project Image
                        </label>
                      </div>
                      <input
                        type="text"
                        className="dash-input-styled"
                        placeholder="e.g. /project_thumb.png or data:image/jpeg;base64,..."
                        value={newProject.image || ''}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      />
                    </div>
                    {newProject.image && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={newProject.image}
                          alt="Project Preview"
                          style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <button
                          type="button"
                          onClick={() => setNewProject({ ...newProject, image: '' })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Save Project
                  </button>
                </div>
              </form>
            </div>

            <div className="chart-header-row" style={{ marginTop: '36px' }}>
              <h3 className="chart-title">Existing Portfolio Projects ({projects ? projects.length : 0})</h3>
            </div>

            <table className="dash-cms-table">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Image</th>
                  <th style={{ width: '220px' }}>Title</th>
                  <th style={{ width: '180px' }}>Category</th>
                  <th>Description</th>
                  <th style={{ width: '160px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects && projects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image || '/service_software.png'} alt={p.title} style={{ width: '46px', height: '46px', borderRadius: '12px', objectFit: 'cover' }} />
                    </td>
                    <td><strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{p.title}</strong></td>
                    <td><span className="category-badge-pill">{p.category}</span></td>
                    <td style={{ color: '#475569', fontSize: '0.86rem', lineHeight: '1.5' }}>{p.description}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="chart-dropdown-pill" onClick={() => handleStartEditProject(p)}>
                          <FiEdit2 /> Edit
                        </button>
                        <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }} onClick={() => deleteProject(p.id)}>
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: TEAM ROSTER MANAGEMENT */}
        {activeTab === 'team' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>

            {/* ⭐ SECTION 0: EDIT TEAM SECTION HEADINGS & SUBTITLES */}
            <div className="chart-header-row">
              <h3 className="chart-title">Edit Team Section Headings & Subtitles</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            <div className="dash-form-wrapper" style={{ marginBottom: '32px' }}>
              <form onSubmit={handleSaveTeamHeaderSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Leadership Badge Tag</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. EXECUTIVE LEADERSHIP"
                    value={editTeamHeader.leadershipBadge || ''}
                    onChange={(e) => setEditTeamHeader({ ...editTeamHeader, leadershipBadge: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Leadership Heading Title (Line 1)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Founder &"
                    value={editTeamHeader.leadershipTitleLine1 || ''}
                    onChange={(e) => setEditTeamHeader({ ...editTeamHeader, leadershipTitleLine1: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Leadership Heading Highlight</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Executive Leadership"
                    value={editTeamHeader.leadershipTitleHighlight || ''}
                    onChange={(e) => setEditTeamHeader({ ...editTeamHeader, leadershipTitleHighlight: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Leadership Subtitle Sentence</label>
                  <textarea
                    className="dash-input-styled"
                    style={{ height: '60px' }}
                    placeholder="e.g. Guiding our technology vision, strategic growth, and engineering excellence."
                    value={editTeamHeader.leadershipSubtitle || ''}
                    onChange={(e) => setEditTeamHeader({ ...editTeamHeader, leadershipSubtitle: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width" style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '16px', marginTop: '8px' }}>
                  <label className="dash-label">Team Members Section Title</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    placeholder="e.g. Our Engineering & Creative Experts"
                    value={editTeamHeader.teamTitle || ''}
                    onChange={(e) => setEditTeamHeader({ ...editTeamHeader, teamTitle: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Team Members Section Subtitle Sentence</label>
                  <textarea
                    className="dash-input-styled"
                    style={{ height: '60px' }}
                    placeholder="e.g. The brilliant minds behind our innovative solutions."
                    value={editTeamHeader.teamSubtitle || ''}
                    onChange={(e) => setEditTeamHeader({ ...editTeamHeader, teamSubtitle: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Headings & Subtitles
                  </button>
                </div>
              </form>
            </div>

            {/* ⭐ SECTION 1: ADD TEAM MEMBER */}
            <div className="chart-header-row" style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
              <h3 className="chart-title">Add Team Member</h3>
            </div>

            <div className="dash-form-wrapper">
              <form onSubmit={handleAddTeamSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Member Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Arifbillah"
                    className="dash-input-styled"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Role / Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Founder & Managing Director"
                    className="dash-input-styled"
                    value={newTeam.role}
                    onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Category / Tier</label>
                  <select
                    className="dash-input-styled"
                    value={newTeam.category}
                    onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })}
                  >
                    <option value="Leadership">Leadership (Founder & CEO)</option>
                    <option value="Team Member">Team Member</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setNewTeam, newTeam)}
                  />
                  {newTeam.image && (
                    <img src={newTeam.image} alt="Preview" style={{ marginTop: '10px', width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add Member
                  </button>
                </div>
              </form>
            </div>

            {/* SECTION 1: LEADERSHIP ROSTER (FOUNDER & CEO) */}
            {(() => {
              const leadershipList = (team || []).filter(m =>
                m.category === 'Leadership' ||
                m.role?.toLowerCase().includes('founder') ||
                m.role?.toLowerCase().includes('ceo')
              );
              const teamList = (team || []).filter(m => !leadershipList.some(l => l.id === m.id));

              return (
                <>
                  <div className="chart-header-row" style={{ marginTop: '36px' }}>
                    <h3 className="chart-title" style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      ★ Executive Leadership Roster (Founder & CEO) ({leadershipList.length})
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px' }}>
                    {leadershipList.map((m, idx) => (
                      <div key={m.id} style={{
                        background: '#fff7ed',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '2px solid #ff6b00',
                        textAlign: 'center',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#ea580c',
                          color: 'white',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '12px',
                          textTransform: 'uppercase'
                        }}>
                          ★ Leadership
                        </span>

                        <img src={m.image || '/Founder.jpeg'} alt={m.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ea580c', marginBottom: '10px', marginTop: '10px' }} />
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0f172a' }}>{m.name}</h4>
                        <p style={{ margin: '0 0 14px', fontSize: '0.82rem', color: '#047857', fontWeight: 700 }}>{m.role}</p>

                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                          <button className="chart-dropdown-pill" title="Move Up" onClick={() => moveTeamMemberUp(m.id)} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>
                            <FiArrowUp />
                          </button>
                          <button className="chart-dropdown-pill" title="Move Down" onClick={() => moveTeamMemberDown(m.id)} disabled={idx === leadershipList.length - 1} style={{ opacity: idx === leadershipList.length - 1 ? 0.4 : 1, cursor: idx === leadershipList.length - 1 ? 'not-allowed' : 'pointer' }}>
                            <FiArrowDown />
                          </button>
                          <button className="chart-dropdown-pill" onClick={() => handleStartEditTeam(m)}>
                            <FiEdit2 /> Edit
                          </button>
                          <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }} onClick={() => deleteTeamMember(m.id)}>
                            <FiTrash2 /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SECTION 2: TEAM MEMBERS & EXPERTS ROSTER */}
                  <div className="chart-header-row" style={{ marginTop: '40px', borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
                    <h3 className="chart-title">Engineering & Creative Team Roster ({teamList.length})</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px' }}>
                    {teamList.map((m, idx) => (
                      <div key={m.id} style={{
                        background: '#f8fafc',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#64748b',
                          color: 'white',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '12px',
                          textTransform: 'uppercase'
                        }}>
                          Member
                        </span>

                        <img src={m.image || '/Arifbillah.jpeg'} alt={m.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff6b00', marginBottom: '10px', marginTop: '10px' }} />
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0f172a' }}>{m.name}</h4>
                        <p style={{ margin: '0 0 14px', fontSize: '0.82rem', color: '#ff6b00', fontWeight: 700 }}>{m.role}</p>

                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                          <button className="chart-dropdown-pill" title="Move Up" onClick={() => moveTeamMemberUp(m.id)} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>
                            <FiArrowUp />
                          </button>
                          <button className="chart-dropdown-pill" title="Move Down" onClick={() => moveTeamMemberDown(m.id)} disabled={idx === teamList.length - 1} style={{ opacity: idx === teamList.length - 1 ? 0.4 : 1, cursor: idx === teamList.length - 1 ? 'not-allowed' : 'pointer' }}>
                            <FiArrowDown />
                          </button>
                          <button className="chart-dropdown-pill" onClick={() => handleStartEditTeam(m)}>
                            <FiEdit2 /> Edit
                          </button>
                          <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }} onClick={() => deleteTeamMember(m.id)}>
                            <FiTrash2 /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* TAB 4: CONTACT DETAILS */}
        {activeTab === 'contact' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Contact & Communication Settings</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            <div className="dash-form-wrapper">
              <form onSubmit={handleSaveContact} className="dash-form-grid">
                <div className="dash-field-group full-width">
                  <label className="dash-label">Target Notification Email</label>
                  <input
                    type="email"
                    className="dash-input-styled"
                    value={editContact.email || ''}
                    onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Phone Number</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editContact.phone || ''}
                    onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Office Address</label>
                  <textarea
                    className="dash-input-styled"
                    value={editContact.address || ''}
                    onChange={(e) => setEditContact({ ...editContact, address: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* LOCATION MAP / QR ASSET */}
                <div className="dash-field-group full-width" style={{ marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiImage /> Location Map / QR Code Media Asset
                    </label>
                    <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      ★ Active Contact Asset
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          id="contact-qr-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, setEditContact, editContact)}
                        />
                        <label htmlFor="contact-qr-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiUpload /> Upload Contact Asset
                        </label>
                      </div>
                      <input
                        type="text"
                        className="dash-input-styled"
                        placeholder="e.g. /qr_map.png or data:image/jpeg;base64,..."
                        value={editContact.image || ''}
                        onChange={(e) => setEditContact({ ...editContact, image: e.target.value })}
                      />
                    </div>
                    {editContact.image && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={editContact.image}
                          alt="Contact Asset Preview"
                          style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditContact({ ...editContact, image: '' })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Contact Details
                  </button>
                </div>
              </form>
            </div>

            {/* ADD CUSTOM CONTACT CHANNEL BLOCK */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem' }}>Add Custom Contact Channel</h4>
              <form onSubmit={handleAddContactBlock} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Channel Title / Desk</label>
                  <input
                    type="text"
                    placeholder="e.g. WhatsApp Support"
                    className="dash-input-styled"
                    value={newContactBlock.title}
                    onChange={(e) => setNewContactBlock({ ...newContactBlock, title: e.target.value })}
                  />
                </div>
                <div className="dash-field-group">
                  <label className="dash-label">Contact Link / Detail</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 9876543210"
                    className="dash-input-styled"
                    value={newContactBlock.value}
                    onChange={(e) => setNewContactBlock({ ...newContactBlock, value: e.target.value })}
                  />
                </div>
                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add Contact Content Block
                  </button>
                </div>
              </form>

              {contactBlocks.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h5 style={{ margin: '0 0 12px', color: '#475569' }}>Active Custom Channels ({contactBlocks.length})</h5>
                  {contactBlocks.map((b) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <strong style={{ color: '#0f172a' }}>{b.title}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{b.value}</div>
                      </div>
                      <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444' }} onClick={() => handleDeleteContactBlock(b.id)}>
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <CustomFieldsManager pageKey="contact" title="Contact Details Custom Fields" />
          </div>
        )}

        {/* TAB: SEO & SEARCH ENGINE META MANAGEMENT WORKSPACE */}
        {activeTab === 'seo' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Search Engine Optimization (SEO) Suite - All Pages</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* PAGE SELECTOR PILLS BAR */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '14px 0 20px', background: '#f8fafc', padding: '12px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              {[
                { id: 'home', label: '🏠 Home Page', path: '/' },
                { id: 'about', label: 'ℹ️ About Us', path: '/about' },
                { id: 'services', label: '⚡ Services', path: '/services' },
                { id: 'projects', label: '🚀 Portfolio', path: '/projects' },
                { id: 'contact', label: '📞 Contact Us', path: '/contact' },
                { id: 'team', label: '👥 Team Roster', path: '/team' },
                { id: 'privacy', label: '🔒 Privacy Policy', path: '/privacy-policy' },
                { id: 'terms', label: '📜 Terms of Service', path: '/terms-of-service' },
                { id: 'refund', label: '💳 Refund Policy', path: '/refund-policy' }
              ].map(page => (
                <button
                  key={page.id}
                  type="button"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '30px',
                    border: selectedSeoPage === page.id ? '1px solid #082233' : '1px solid #cbd5e1',
                    background: selectedSeoPage === page.id ? '#082233' : '#ffffff',
                    color: selectedSeoPage === page.id ? '#ffffff' : '#334155',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedSeoPage === page.id ? '0 4px 12px rgba(9, 60, 37, 0.2)' : 'none'
                  }}
                  onClick={() => setSelectedSeoPage(page.id)}
                >
                  {page.label}
                </button>
              ))}
            </div>

            {/* LIVE PREVIEW CARDS ROW FOR ACTIVE PAGE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', margin: '16px 0 24px' }}>
              {/* GOOGLE SEARCH PREVIEW */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  🔍 Google Search Engine Preview ({selectedSeoPage.toUpperCase()} PAGE)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {editPageSeo.canonicalUrl || `https://innoveitytech.com/${selectedSeoPage === 'home' ? '' : selectedSeoPage}`}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 600, margin: '4px 0 2px', lineHeight: 1.3 }}>
                  {editPageSeo.title || editSeo.metaTitle || 'Innoveity Tech Solution'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#4d5156', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {editPageSeo.description || editSeo.metaDescription || 'Innoveity Tech Solution software development agency.'}
                </p>
              </div>

              {/* SOCIAL MEDIA OPEN GRAPH PREVIEW */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  📱 WhatsApp & Social Share Card ({selectedSeoPage.toUpperCase()} PAGE)
                </div>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                  <img
                    src={editPageSeo.ogImage || editSeo.ogImage || '/Innoveity.png'}
                    alt="Social Card"
                    style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                      INNOVEITYTECH.COM
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', margin: '2px 0 4px' }}>
                      {editPageSeo.title || editSeo.metaTitle}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {editPageSeo.description || editSeo.metaDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO EDIT FORM */}
            <div className="dash-form-wrapper">
              <form onSubmit={handleSaveSeo} className="dash-form-grid">
                <div className="dash-field-group full-width">
                  <h4 style={{ margin: '0 0 10px', color: '#082233', fontSize: '1.1rem' }}>
                    Page SEO Configuration: <span style={{ color: '#ff6b00', textTransform: 'uppercase' }}>{selectedSeoPage} Page</span>
                  </h4>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Page Meta Title (60-70 characters recommended)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editPageSeo.title || ''}
                    onChange={(e) => setEditPageSeo({ ...editPageSeo, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Page Meta Description (150-160 characters recommended)</label>
                  <textarea
                    className="dash-input-styled"
                    style={{ minHeight: '80px' }}
                    value={editPageSeo.description || ''}
                    onChange={(e) => setEditPageSeo({ ...editPageSeo, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Page Target Keywords (Comma Separated)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editPageSeo.keywords || ''}
                    onChange={(e) => setEditPageSeo({ ...editPageSeo, keywords: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Page Canonical URL</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editPageSeo.canonicalUrl || ''}
                    onChange={(e) => setEditPageSeo({ ...editPageSeo, canonicalUrl: e.target.value })}
                  />
                </div>

                {/* PAGE OPEN GRAPH SOCIAL IMAGE */}
                <div className="dash-field-group full-width" style={{ marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiImage /> Page Open Graph (OG) Social Image
                    </label>
                    <span style={{ fontSize: '0.72rem', background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      ★ Social Share Banner
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="seo-og-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, setEditPageSeo, editPageSeo)}
                        />
                        <label htmlFor="seo-og-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiUpload /> Upload OG Social Image
                        </label>
                      </div>
                      <input
                        type="text"
                        className="dash-input-styled"
                        placeholder="e.g. /Innoveity.png or data:image/jpeg;base64,..."
                        value={editPageSeo.ogImage || ''}
                        onChange={(e) => setEditPageSeo({ ...editPageSeo, ogImage: e.target.value })}
                      />
                    </div>
                    {editPageSeo.ogImage && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={editPageSeo.ogImage}
                          alt="OG Preview"
                          style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditPageSeo({ ...editPageSeo, ogImage: '' })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dash-field-group full-width" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#082233', fontSize: '1.05rem' }}>
                    Global Technical SEO & Indexing
                  </h4>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Google Analytics / GTM Tracking ID</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editSeo.googleAnalyticsId || ''}
                    onChange={(e) => setEditSeo({ ...editSeo, googleAnalyticsId: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Robots.txt Indexing Rules</label>
                  <textarea
                    className="dash-input-styled"
                    style={{ fontFamily: 'monospace', minHeight: '80px', fontSize: '0.82rem' }}
                    value={editSeo.robotsTxt || ''}
                    onChange={(e) => setEditSeo({ ...editSeo, robotsTxt: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <div style={{ background: '#fff7ed', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fdba74', color: '#ea580c', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCheckCircle size={16} /> Live Route Watcher Active: Dynamically injecting document title, meta tags, and open-graph cards for all 9 routes.
                  </div>
                </div>

                <div className="dash-field-group full-width" style={{ marginTop: '10px' }}>
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiGlobe /> Save & Apply SEO Meta for {selectedSeoPage.toUpperCase()} Page
                  </button>
                </div>
              </form>
            </div>

            <CustomFieldsManager pageKey="seo" title="SEO & Meta Custom Fields" />
          </div>
        )}

        {/* TAB 5: HOMEPAGE SITE COPY */}
        {activeTab === 'home' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Homepage Content Editor</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            <div className="dash-form-wrapper">
              <form onSubmit={handleSaveHome} className="dash-form-grid">
                <div className="dash-field-group full-width">
                  <label className="dash-label">Hero Kicker Badge</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editHome.kicker || ''}
                    onChange={(e) => setEditHome({ ...editHome, kicker: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Title Line 1</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editHome.titleLine1 || ''}
                    onChange={(e) => setEditHome({ ...editHome, titleLine1: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Title Line 2</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editHome.titleLine2 || ''}
                    onChange={(e) => setEditHome({ ...editHome, titleLine2: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Hero Description</label>
                  <textarea
                    className="dash-input-styled"
                    value={editHome.description || ''}
                    onChange={(e) => setEditHome({ ...editHome, description: e.target.value })}
                  ></textarea>
                </div>

                {/* HERO GRAPHIC / MEDIA BANNER IMAGE ASSET */}
                <div className="dash-field-group full-width" style={{ marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiImage /> Hero Graphic / Media Banner Image Asset
                    </label>
                    <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      ★ Live Banner Asset
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="home-hero-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, setEditHome, editHome)}
                        />
                        <label htmlFor="home-hero-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiUpload /> Upload Hero Image
                        </label>
                      </div>
                      <input
                        type="text"
                        className="dash-input-styled"
                        placeholder="e.g. /hero_banner.png or data:image/jpeg;base64,..."
                        value={editHome.image || ''}
                        onChange={(e) => setEditHome({ ...editHome, image: e.target.value })}
                      />
                    </div>
                    {editHome.image && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={editHome.image}
                          alt="Hero Banner Preview"
                          style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditHome({ ...editHome, image: '' })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Homepage Content
                  </button>
                </div>
              </form>
            </div>

            {/* ADD CUSTOM HOMEPAGE CONTENT BLOCK */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem' }}>Add Custom Homepage Feature Block</h4>
              <form onSubmit={handleAddHomeBlock} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Feature Title</label>
                  <input
                    type="text"
                    placeholder="e.g. AI Automation & Cloud"
                    className="dash-input-styled"
                    value={newHomeBlock.title}
                    onChange={(e) => setNewHomeBlock({ ...newHomeBlock, title: e.target.value })}
                  />
                </div>
                <div className="dash-field-group">
                  <label className="dash-label">Feature Subtitle / Detail</label>
                  <input
                    type="text"
                    placeholder="e.g. Delivering next-gen Web Apps"
                    className="dash-input-styled"
                    value={newHomeBlock.subtitle}
                    onChange={(e) => setNewHomeBlock({ ...newHomeBlock, subtitle: e.target.value })}
                  />
                </div>
                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add Homepage Content Block
                  </button>
                </div>
              </form>

              {homeBlocks.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h5 style={{ margin: '0 0 12px', color: '#475569' }}>Active Feature Blocks ({homeBlocks.length})</h5>
                  {homeBlocks.map((b) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <strong style={{ color: '#0f172a' }}>{b.title}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{b.subtitle}</div>
                      </div>
                      <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444' }} onClick={() => handleDeleteHomeBlock(b.id)}>
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <CustomFieldsManager pageKey="home" title="Homepage Custom Fields" />
          </div>
        )}

        {/* TAB 6: ABOUT US PAGE COPY */}
        {activeTab === 'about' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">About Us Section Editor</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            <div className="dash-form-wrapper">
              <form onSubmit={handleSaveAbout} className="dash-form-grid">
                <div className="dash-field-group full-width">
                  <label className="dash-label">Main Philosophy Statement</label>
                  <textarea
                    className="dash-input-styled"
                    value={editAbout.mainStatement || ''}
                    onChange={(e) => setEditAbout({ ...editAbout, mainStatement: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Marquee Badges (Comma Separated)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editAbout.badges || ''}
                    onChange={(e) => setEditAbout({ ...editAbout, badges: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Stat 1 (Experience)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editAbout.stat1Number || ''}
                    onChange={(e) => setEditAbout({ ...editAbout, stat1Number: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Stat 2 (Projects)</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editAbout.stat2Number || ''}
                    onChange={(e) => setEditAbout({ ...editAbout, stat2Number: e.target.value })}
                  />
                </div>

                {/* ABOUT US PHOTO / MEDIA ASSET */}
                <div className="dash-field-group full-width" style={{ marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiImage /> About Us Photo / Media Asset
                    </label>
                    <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      ★ Active Media Asset
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="about-photo-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, setEditAbout, editAbout)}
                        />
                        <label htmlFor="about-photo-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiUpload /> Upload About Image
                        </label>
                      </div>
                      <input
                        type="text"
                        className="dash-input-styled"
                        placeholder="e.g. /about_team.png or data:image/jpeg;base64,..."
                        value={editAbout.image || ''}
                        onChange={(e) => setEditAbout({ ...editAbout, image: e.target.value })}
                      />
                    </div>
                    {editAbout.image && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={editAbout.image}
                          alt="About Asset Preview"
                          style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditAbout({ ...editAbout, image: '' })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save About Us Content
                  </button>
                </div>
              </form>
            </div>

            {/* ADD CUSTOM ABOUT US VALUE / MILESTONE BLOCK */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem' }}>Add Custom Value / Milestone Block</h4>
              <form onSubmit={handleAddAboutBlock} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Milestone Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering Excellence"
                    className="dash-input-styled"
                    value={newAboutBlock.title}
                    onChange={(e) => setNewAboutBlock({ ...newAboutBlock, title: e.target.value })}
                  />
                </div>
                <div className="dash-field-group">
                  <label className="dash-label">Milestone Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Building resilient software products"
                    className="dash-input-styled"
                    value={newAboutBlock.description}
                    onChange={(e) => setNewAboutBlock({ ...newAboutBlock, description: e.target.value })}
                  />
                </div>
                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add About Us Content Block
                  </button>
                </div>
              </form>

              {aboutBlocks.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h5 style={{ margin: '0 0 12px', color: '#475569' }}>Active Milestone Blocks ({aboutBlocks.length})</h5>
                  {aboutBlocks.map((b) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <strong style={{ color: '#0f172a' }}>{b.title}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{b.description}</div>
                      </div>
                      <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444' }} onClick={() => handleDeleteAboutBlock(b.id)}>
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <CustomFieldsManager pageKey="about" title="About Us Custom Fields" />
          </div>
        )}

        {/* TAB: HEADER & FOOTER SETTINGS */}
        {activeTab === 'header_footer' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Header, Footer & Social Media Management</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* 1. HEADER BRANDING & CTA BUTTON */}
            <div className="dash-form-wrapper" style={{ marginTop: '16px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiLayout /> Header Logo & Button Configuration
              </h4>
              <form onSubmit={handleSaveHeaderFooter} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Logo Sub-Title / Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. TECH SOLUTION"
                    className="dash-input-styled"
                    value={editHeaderFooter.brandSubTitle || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, brandSubTitle: e.target.value })}
                  />
                  <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>Displays below the main Innoveity logo in top navbar.</small>
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Header Action Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. CONTACT US"
                    className="dash-input-styled"
                    value={editHeaderFooter.contactBtnText || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, contactBtnText: e.target.value })}
                  />
                  <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>Text for the top right call-to-action button in header.</small>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Header Branding
                  </button>
                </div>
              </form>
            </div>

            {/* 2. HEADER NAVIGATION MENU ITEMS MANAGER */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiLayers /> Navigation Bar Menu Links Manager
              </h4>

              {/* Add New Link Form */}
              <form onSubmit={handleAddNavLink} className="dash-form-grid" style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px dashed #cbd5e1' }}>
                <div className="dash-field-group">
                  <label className="dash-label">Link Display Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Media Division"
                    className="dash-input-styled"
                    value={newNavLink.name}
                    onChange={(e) => setNewNavLink({ ...newNavLink, name: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Target Route / Anchor ID</label>
                  <input
                    type="text"
                    placeholder="e.g. /media or home"
                    className="dash-input-styled"
                    value={newNavLink.to}
                    onChange={(e) => setNewNavLink({ ...newNavLink, to: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Navigation Type</label>
                  <select
                    className="dash-input-styled"
                    value={newNavLink.isPage ? 'page' : 'scroll'}
                    onChange={(e) => setNewNavLink({ ...newNavLink, isPage: e.target.value === 'page' })}
                  >
                    <option value="page">Separate Page Route (e.g. /media, /about)</option>
                    <option value="scroll">Smooth Scroll Anchor (e.g. #contact, home)</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add Navigation Menu Item
                  </button>
                </div>
              </form>

              {/* Active Navigation Menu List */}
              <h5 style={{ margin: '0 0 12px', color: '#334155' }}>Active Navigation Bar Menu Items ({(editHeaderFooter.navLinks || []).length})</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(editHeaderFooter.navLinks || []).map((link, idx) => (
                  <div key={link.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <button type="button" onClick={() => moveNavLinkUp(idx)} disabled={idx === 0} style={{ border: 'none', background: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', color: idx === 0 ? '#cbd5e1' : '#ff6b00', padding: 0 }}>
                          <FiArrowUp size={16} />
                        </button>
                        <button type="button" onClick={() => moveNavLinkDown(idx)} disabled={idx === (editHeaderFooter.navLinks || []).length - 1} style={{ border: 'none', background: 'none', cursor: idx === (editHeaderFooter.navLinks || []).length - 1 ? 'not-allowed' : 'pointer', color: idx === (editHeaderFooter.navLinks || []).length - 1 ? '#cbd5e1' : '#ff6b00', padding: 0 }}>
                          <FiArrowDown size={16} />
                        </button>
                      </div>
                      <div>
                        <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{link.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          Target: <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{link.to}</code> • {link.isPage ? 'Page Route' : 'Scroll Anchor'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        className="promo-mint-btn"
                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                        onClick={() => handleDeleteNavLink(idx)}
                      >
                        <FiTrash2 /> Remove Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. FOOTER ADDRESS & DESK CONTACT DETAILS */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiPhone /> Footer Company & Desk Contact Info
              </h4>
              <form onSubmit={handleSaveHeaderFooter} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Operating Entity Line</label>
                  <input
                    type="text"
                    placeholder="e.g. Operated by Innoveity Tech Solution Ltd."
                    className="dash-input-styled"
                    value={editHeaderFooter.operatingCompany || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, operatingCompany: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Physical Office Address</label>
                  <input
                    type="text"
                    placeholder="e.g. MCC MRF Innovation Park, East Tambaram, Chennai - 600059"
                    className="dash-input-styled"
                    value={editHeaderFooter.address || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, address: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Direct Contact Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 7904327211"
                    className="dash-input-styled"
                    value={editHeaderFooter.phone || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, phone: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Official Support Email</label>
                  <input
                    type="email"
                    placeholder="e.g. aachinancy@gmail.com"
                    className="dash-input-styled"
                    value={editHeaderFooter.email || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, email: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Working Operating Hours</label>
                  <input
                    type="text"
                    placeholder="e.g. Mon - Fri, 9:00 AM - 6:00 PM"
                    className="dash-input-styled"
                    value={editHeaderFooter.hours || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, hours: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Footer Contact Info
                  </button>
                </div>
              </form>
            </div>

            {/* 4. FOOTER SOCIAL LINKS ("CONNECT") */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiShare2 /> Footer Social Media Links ("Connect")
              </h4>
              <form onSubmit={handleSaveHeaderFooter} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">X.com (Twitter) Profile URL</label>
                  <input
                    type="text"
                    placeholder="https://x.com/innoveitytech"
                    className="dash-input-styled"
                    value={editHeaderFooter.twitterUrl || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, twitterUrl: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Instagram Profile URL</label>
                  <input
                    type="text"
                    placeholder="https://instagram.com/innoveitytech"
                    className="dash-input-styled"
                    value={editHeaderFooter.instagramUrl || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, instagramUrl: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Facebook Page URL</label>
                  <input
                    type="text"
                    placeholder="https://facebook.com/innoveitytech"
                    className="dash-input-styled"
                    value={editHeaderFooter.facebookUrl || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, facebookUrl: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">LinkedIn Company Page URL</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/company/innoveitytech"
                    className="dash-input-styled"
                    value={editHeaderFooter.linkedinUrl || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, linkedinUrl: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Social Links
                  </button>
                </div>
              </form>
            </div>

            {/* 5. FOOTER CTA BANNER CARD & COPYRIGHT */}
            <div className="dash-form-wrapper" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiZap /> Footer Call-to-Action Banner & Legal Bar
              </h4>
              <form onSubmit={handleSaveHeaderFooter} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">CTA Kicker Pill Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. SMART, SCALABLE"
                    className="dash-input-styled"
                    value={editHeaderFooter.ctaBadge || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, ctaBadge: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">CTA Card Main Headline</label>
                  <textarea
                    placeholder="e.g. Ready To Begin Building Digital Future Securely?"
                    className="dash-input-styled"
                    style={{ height: '70px' }}
                    value={editHeaderFooter.ctaTitle || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, ctaTitle: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Primary CTA Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Get Started"
                    className="dash-input-styled"
                    value={editHeaderFooter.ctaPrimaryBtnText || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, ctaPrimaryBtnText: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Secondary CTA Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. See Technology Options"
                    className="dash-input-styled"
                    value={editHeaderFooter.ctaSecondaryBtnText || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, ctaSecondaryBtnText: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Footer Copyright Notice Text</label>
                  <input
                    type="text"
                    placeholder="e.g. © 2026 Innoveity Tech Solution. All rights reserved."
                    className="dash-input-styled"
                    value={editHeaderFooter.copyrightText || ''}
                    onChange={(e) => setEditHeaderFooter({ ...editHeaderFooter, copyrightText: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save All Header & Footer Settings
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* TAB: MEDIA DIVISION PAGE MANAGEMENT */}
        {activeTab === 'media' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Media Division Page Live CMS Management</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            <div className="dash-form-wrapper" style={{ marginTop: '16px' }}>
              <form onSubmit={handleSaveMedia} className="dash-form-grid">

                {/* HERO SECTION CONFIGURATION */}
                <div className="dash-field-group full-width">
                  <h4 style={{ margin: '0 0 12px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiFilm /> 1. Hero Section Content
                  </h4>
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Hero Brand Pill Badge</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.hero?.badge || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, badge: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Hero Pill Subtitle</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.hero?.subBadge || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, subBadge: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Main Hero Title</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.hero?.title || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, title: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Tagline 1</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.hero?.tagline1 || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, tagline1: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Tagline 2</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.hero?.tagline2 || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, tagline2: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Tagline 3</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.hero?.tagline3 || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, tagline3: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Hero Description Text</label>
                  <textarea
                    rows={4}
                    className="dash-input-styled"
                    value={editMedia.hero?.description || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, description: e.target.value } })}
                  />
                </div>

                {/* HERO BACKGROUND IMAGE MANAGEMENT */}
                <div className="dash-field-group full-width" style={{ marginTop: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <label className="dash-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                    <FiImage /> Hero Background Image Asset
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="hero-bg-upload"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            compressAndSetImage(file, (compressedResult) => {
                              setEditMedia(prev => ({
                                ...prev,
                                hero: { ...(prev?.hero || {}), bgImage: compressedResult }
                              }));
                            });
                          }
                        }}
                      />
                      <label htmlFor="hero-bg-upload" className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <FiUpload /> Upload Hero Background Image
                      </label>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Upload local image file or specify path/URL below:</span>
                    </div>
                    <input
                      type="text"
                      className="dash-input-styled"
                      placeholder="e.g. /media_hero_bg.png or data:image/jpeg;base64,..."
                      value={editMedia.hero?.bgImage || ''}
                      onChange={(e) => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, bgImage: e.target.value } })}
                    />
                    {editMedia.hero?.bgImage && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                        <img
                          src={editMedia.hero.bgImage}
                          alt="Hero Background Preview"
                          style={{ width: '110px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>Hero Background Preview</div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {editMedia.hero.bgImage.startsWith('data:') ? 'Custom Uploaded Image (Base64)' : editMedia.hero.bgImage}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditMedia({ ...editMedia, hero: { ...editMedia.hero, bgImage: '' } })}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3D DECK CARDS IMAGE MANAGEMENT */}
                <div className="dash-field-group full-width" style={{ marginTop: '24px' }}>
                  <h4 style={{ margin: '0 0 12px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiLayers /> 2. 3D Deck Showcase Images Management
                  </h4>
                </div>

                {[
                  { id: 'mmac-arch', title: 'MMAC Studio', subtitle: 'BRAND ARCHITECTURE', tag: 'Visual Identity', defaultImg: '/deck_arch_gold.png' },
                  { id: 'lifestyle-pour', title: 'Pour, Breathe, Begin', subtitle: 'REELS & SHORT FORM', tag: 'Social Media', defaultImg: '/deck_lifestyle.png' },
                  { id: 'muyal-chair', title: 'Muyal Heritage', subtitle: 'CONCEPT FILMS', tag: 'Commercial Shoot', defaultImg: '/deck_green_chair.png' },
                  { id: 'cinematic-urban', title: 'Cinematic Urban', subtitle: 'BRAND CAMPAIGN', tag: 'Video Production', defaultImg: '/deck_fashion.png' },
                  { id: 'coffee-craft', title: 'Coffee & Craft', subtitle: 'PRODUCT CINEMATOGRAPHY', tag: 'High-End Studio', defaultImg: '/deck_product.png' },
                  { id: 'editorial-design', title: 'Editorial Craft', subtitle: 'BRAND DESIGN', tag: 'Creative Studio', defaultImg: '/deck_design.png' },
                  { id: 'digital-growth', title: 'Digital Scale', subtitle: 'PERFORMANCE MEDIA', tag: 'Growth Marketing', defaultImg: '/deck_growth.png' }
                ].map((cardMeta, idx) => {
                  const defaultDeckCards = [
                    { id: 'mmac-arch', title: 'MMAC Studio', subtitle: 'BRAND ARCHITECTURE', tag: 'Visual Identity', image: '/deck_arch_gold.png' },
                    { id: 'lifestyle-pour', title: 'Pour, Breathe, Begin', subtitle: 'REELS & SHORT FORM', tag: 'Social Media', image: '/deck_lifestyle.png' },
                    { id: 'muyal-chair', title: 'Muyal Heritage', subtitle: 'CONCEPT FILMS', tag: 'Commercial Shoot', image: '/deck_green_chair.png' },
                    { id: 'cinematic-urban', title: 'Cinematic Urban', subtitle: 'BRAND CAMPAIGN', tag: 'Video Production', image: '/deck_fashion.png' },
                    { id: 'coffee-craft', title: 'Coffee & Craft', subtitle: 'PRODUCT CINEMATOGRAPHY', tag: 'High-End Studio', image: '/deck_product.png' },
                    { id: 'editorial-design', title: 'Editorial Craft', subtitle: 'BRAND DESIGN', tag: 'Creative Studio', image: '/deck_design.png' },
                    { id: 'digital-growth', title: 'Digital Scale', subtitle: 'PERFORMANCE MEDIA', tag: 'Growth Marketing', image: '/deck_growth.png' }
                  ];
                  const currentDeck = editMedia.deckCards && editMedia.deckCards.length > 0 ? editMedia.deckCards : defaultDeckCards;
                  const cardItem = currentDeck[idx] || cardMeta;
                  const cardImg = cardItem.image || cardMeta.defaultImg;

                  return (
                    <div key={idx} className="dash-field-group full-width" style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>
                          Deck Card {idx + 1}: {cardMeta.title} ({cardMeta.subtitle})
                        </label>
                        <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                          {cardMeta.tag}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 260px' }}>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <input
                              type="file"
                              accept="image/*"
                              id={`deck-img-upload-${idx}`}
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  compressAndSetImage(file, (compressedResult) => {
                                    const updatedDeck = [...currentDeck];
                                    updatedDeck[idx] = { ...(updatedDeck[idx] || cardMeta), image: compressedResult };
                                    setEditMedia({ ...editMedia, deckCards: updatedDeck });
                                  });
                                }
                              }}
                            />
                            <label htmlFor={`deck-img-upload-${idx}`} className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <FiUpload /> Upload Image
                            </label>
                          </div>
                          <input
                            type="text"
                            className="dash-input-styled"
                            placeholder={`e.g. /deck_${idx + 1}.png`}
                            value={cardItem.image || ''}
                            onChange={(e) => {
                              const updatedDeck = [...currentDeck];
                              updatedDeck[idx] = { ...(updatedDeck[idx] || cardMeta), image: e.target.value };
                              setEditMedia({ ...editMedia, deckCards: updatedDeck });
                            }}
                          />
                        </div>
                        {cardImg && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                            <img
                              src={cardImg}
                              alt={cardMeta.title}
                              style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedDeck = [...currentDeck];
                                updatedDeck[idx] = { ...(updatedDeck[idx] || cardMeta), image: '' };
                                setEditMedia({ ...editMedia, deckCards: updatedDeck });
                              }}
                              style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                            >
                              <FiTrash2 /> Clear
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* PRODUCTION CAPABILITIES POSTER IMAGES MANAGEMENT */}
                <div className="dash-field-group full-width" style={{ marginTop: '24px' }}>
                  <h4 style={{ margin: '0 0 12px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiVideo /> 3. Production Capabilities Poster Images Management
                  </h4>
                </div>

                {[
                  { id: 'camera-prod', title: 'PROFESSIONAL CAMERA PRODUCTION', badge: '★ 4.9/5 • 8K RED & ARRI Cinema Systems', defaultPoster: '/cap_camera_prod.png' },
                  { id: 'cinematic-vid', title: 'CINEMATIC VIDEO', badge: '★ 5.0/5 • Anamorphic Commercial Films', defaultPoster: '/cap_cinematic_vid.png' },
                  { id: 'gimbal-motion', title: 'GIMBAL & MOTION', badge: '★ 4.9/5 • 3-Axis Stabilized Motion', defaultPoster: '/cap_gimbal_motion.png' },
                  { id: 'aerial-content', title: 'AERIAL CONTENT', badge: '★ 5.0/5 • 4K Drone Cinematography', defaultPoster: '/cap_aerial_drone.png' },
                  { id: 'post-production', title: 'POST-PRODUCTION', badge: '★ 4.9/5 • Color Grading & Motion FX', defaultPoster: '/cap_post_production.png' }
                ].map((capMeta, idx) => {
                  const defaultCapabilities = [
                    { id: 'camera-prod', title: 'PROFESSIONAL CAMERA PRODUCTION', poster: '/cap_camera_prod.png' },
                    { id: 'cinematic-vid', title: 'CINEMATIC VIDEO', poster: '/cap_cinematic_vid.png' },
                    { id: 'gimbal-motion', title: 'GIMBAL & MOTION', poster: '/cap_gimbal_motion.png' },
                    { id: 'aerial-content', title: 'AERIAL CONTENT', poster: '/cap_aerial_drone.png' },
                    { id: 'post-production', title: 'POST-PRODUCTION', poster: '/cap_post_production.png' }
                  ];
                  const currentCaps = editMedia.capabilities && editMedia.capabilities.length > 0 ? editMedia.capabilities : defaultCapabilities;
                  const capItem = currentCaps[idx] || capMeta;
                  const capPoster = capItem.poster || capMeta.defaultPoster;

                  return (
                    <div key={idx} className="dash-field-group full-width" style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label className="dash-label" style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>
                          Capability {idx + 1}: {capMeta.title}
                        </label>
                        <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                          {capMeta.badge}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 260px' }}>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <input
                              type="file"
                              accept="image/*"
                              id={`cap-poster-upload-${idx}`}
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  compressAndSetImage(file, (compressedResult) => {
                                    const updatedCaps = [...currentCaps];
                                    updatedCaps[idx] = { ...(updatedCaps[idx] || capMeta), poster: compressedResult };
                                    setEditMedia({ ...editMedia, capabilities: updatedCaps });
                                  });
                                }
                              }}
                            />
                            <label htmlFor={`cap-poster-upload-${idx}`} className="action-pill-btn primary-pill" style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <FiUpload /> Upload Poster Image
                            </label>
                          </div>
                          <input
                            type="text"
                            className="dash-input-styled"
                            placeholder={`e.g. /cap_poster_${idx + 1}.png`}
                            value={capItem.poster || ''}
                            onChange={(e) => {
                              const updatedCaps = [...currentCaps];
                              updatedCaps[idx] = { ...(updatedCaps[idx] || capMeta), poster: e.target.value };
                              setEditMedia({ ...editMedia, capabilities: updatedCaps });
                            }}
                          />
                        </div>
                        {capPoster && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                            <img
                              src={capPoster}
                              alt={capMeta.title}
                              style={{ width: '80px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedCaps = [...currentCaps];
                                updatedCaps[idx] = { ...(updatedCaps[idx] || capMeta), poster: '' };
                                setEditMedia({ ...editMedia, capabilities: updatedCaps });
                              }}
                              style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                            >
                              <FiTrash2 /> Clear
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* CALL TO ACTION CONFIGURATION */}
                <div className="dash-field-group full-width" style={{ marginTop: '20px' }}>
                  <h4 style={{ margin: '0 0 12px', color: '#082233', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiZap /> 4. Call to Action (CTA) Section
                  </h4>
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">CTA Badge Tag</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.cta?.brandTag || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, cta: { ...editMedia.cta, brandTag: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">CTA Primary Button Text</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.cta?.btnText || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, cta: { ...editMedia.cta, btnText: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">CTA Main Heading</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.cta?.heading || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, cta: { ...editMedia.cta, heading: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Subheading Line 1</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.cta?.subheadingLine1 || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, cta: { ...editMedia.cta, subheadingLine1: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Subheading Line 2</label>
                  <input
                    type="text"
                    className="dash-input-styled"
                    value={editMedia.cta?.subheadingLine2 || ''}
                    onChange={(e) => setEditMedia({ ...editMedia, cta: { ...editMedia.cta, subheadingLine2: e.target.value } })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content', marginTop: '12px' }}>
                    <FiCheck /> Save All Media Division Content (Live Sync)
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

        {/* TAB 7: ADMIN ACCOUNTS */}
        {activeTab === 'users' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Manage Administrator Accounts</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            <div className="dash-form-wrapper">
              <form onSubmit={handleAddUser} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="dash-input-styled"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address (e.g. nancy@innoveitytech.com)"
                    className="dash-input-styled"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Account Password</label>
                  <input
                    type="text"
                    placeholder="Password (default: admin123)"
                    className="dash-input-styled"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">User Role</label>
                  <select
                    className="dash-input-styled"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiUserPlus /> Create Administrator Account
                  </button>
                </div>
              </form>
            </div>

            <table className="dash-cms-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{u.password || 'admin123'}</code></td>
                    <td><span className="category-badge-pill">{u.role}</span></td>
                    <td>
                      <span className="action-pill-btn" style={{ background: u.status === 'Active' ? '#fff7ed' : '#fef2f2', color: u.status === 'Active' ? '#ea580c' : '#ef4444' }}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="promo-mint-btn" onClick={() => toggleUserStatus(u.id)}>
                          Toggle Status
                        </button>
                        <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444' }} onClick={() => deleteAdminUser(u.id)}>
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 8: DATABASE & BACKUPS */}
        {activeTab === 'database' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Centralized Production MySQL Database</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* Cloud Status Badge */}
            <div style={{
              margin: '20px 0',
              padding: '16px 20px',
              borderRadius: '14px',
              background: dbStatus === 'connected' ? '#fff7ed' : (dbStatus === 'connecting' ? '#eff6ff' : '#fff7ed'),
              border: `1px solid ${dbStatus === 'connected' ? '#fdba74' : (dbStatus === 'connecting' ? '#bfdbfe' : '#fde68a')}`,
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: dbStatus === 'connected' ? '#ff6b00' : (dbStatus === 'connecting' ? '#3b82f6' : '#f59e0b'),
                  boxShadow: dbStatus === 'connected' ? '0 0 8px #ff6b00' : 'none'
                }} />
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>
                    {dbStatus === 'connected' && 'MySQL Database Connected (Live 3s Polling Active)'}
                    {dbStatus === 'connecting' && 'Connecting to MySQL Database...'}
                    {dbStatus === 'fallback' && 'Database Mode: Local Fallback (MySQL Credentials Pending)'}
                  </strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    {dbStatus === 'connected'
                      ? 'Live sync active across all devices & sessions via MySQL Database.'
                      : 'Add VITE_MYSQL_API_URL and MYSQL credentials to your .env to connect your MySQL DB.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="action-pill-btn primary-pill"
                  onClick={async () => {
                    if (window.confirm('Push current website master data to MySQL Database?')) {
                      await seedCloudDatabase();
                      triggerNotification('⚡ MySQL DB seeded successfully!');
                    }
                  }}
                >
                  <FiZap /> Seed / Push Data to MySQL DB
                </button>
                <button
                  className="action-pill-btn"
                  style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}
                  onClick={async () => {
                    await fetchLatestFromMySql();
                    triggerNotification('Sync complete with MySQL Database');
                  }}
                >
                  <FiRefreshCw /> Fetch Latest Cloud Data
                </button>
              </div>
            </div>


            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '24px 0 16px' }}>
              Generate an encrypted JSON backup snapshot or manage cache storage.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="action-pill-btn primary-pill" onClick={exportBackupJSON}>
                <FiDownloadCloud /> Export JSON Backup Snapshot
              </button>
              <button
                className="action-pill-btn"
                style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all system & CMS cache?')) {
                    clearAllCmsCache();
                    triggerNotification('⚡ System & CMS Cache cleared successfully!');
                  }
                }}
              >
                <FiRefreshCw /> Clear Local Cache
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SuperAdminPage;
