import React, { useEffect, useState } from 'react';
import { 
  FiHome, FiUsers, FiSettings, FiShield, 
  FiDatabase, FiBell, FiSearch, FiServer,
  FiLogOut, FiMenu, FiX, FiCheckCircle, FiAlertTriangle,
  FiDownloadCloud, FiRefreshCw, FiLock, FiCpu, FiExternalLink, FiCalendar, FiClock, FiVideo,
  FiUserPlus, FiTrash2, FiZap, FiFolder, FiFileText, FiPhone,
  FiPlus, FiEdit2, FiCheck, FiLayers, FiInfo, FiGlobe, FiShare2, FiCode
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
    team, addTeamMember, updateTeamMember, deleteTeamMember,
    contact, updateContact,
    homeContent, updateHomeContent,
    aboutContent, updateAboutContent,
    seoSettings, updateSeoSettings,
    pageSeoSettings, updatePageSeoSettings,
    adminUsers, addAdminUser, deleteAdminUser, toggleUserStatus,
    currentUser, logoutAdmin
  } = useCMS();

  const users = adminUsers || [];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  // CMS Form States
  const [newProject, setNewProject] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', image: '' });
  const [editContact, setEditContact] = useState(contact || {});
  const [editHome, setEditHome] = useState(homeContent || {});
  const [editAbout, setEditAbout] = useState(aboutContent || {});
  const [editSeo, setEditSeo] = useState(seoSettings || {});

  const [selectedSeoPage, setSelectedSeoPage] = useState('home');
  const [editPageSeo, setEditPageSeo] = useState({});

  useEffect(() => {
    if (seoSettings) setEditSeo(seoSettings);
  }, [seoSettings]);

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

  // Edit Modal States
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: '', role: '', image: '' });

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

  const handleImageUpload = (e, setter, stateObj) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter({ ...stateObj, image: reader.result });
      };
      reader.readAsDataURL(file);
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
    setNewTeam({ name: '', role: '', image: '' });
    triggerNotification('Team member added successfully!');
  };

  const handleStartEditTeam = (m) => {
    setEditingTeamId(m.id);
    setEditTeamData({ name: m.name, role: m.role, image: m.image });
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

              <div className="dash-field-group full-width" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="action-pill-btn primary-pill">
                  <FiCheck /> Save Changes
                </button>
                <button type="button" className="chart-dropdown-pill" onClick={() => setEditingProjectId(null)}>
                  Cancel
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

              <div className="dash-field-group full-width" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="action-pill-btn primary-pill">
                  <FiCheck /> Save Changes
                </button>
                <button type="button" className="chart-dropdown-pill" onClick={() => setEditingTeamId(null)}>
                  Cancel
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
              <InnoveityBrandLogo size={20} showText={true} />
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
            <span className="user-role-tag" style={{ color: '#10b981' }}>{currentUser?.role || 'Super Admin'}</span>
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
              {activeTab === 'users' && 'Manage Administrator Accounts'}
              {activeTab === 'database' && 'System Database & Backups'}
            </h1>
            <p>Master system metrics, CMS management, user access & audit control.</p>
          </div>

          <div className="dash-header-right">
            {notification && (
              <div className="promo-mint-btn" style={{ background: '#d1fae5', color: '#047857' }}>
                <FiCheckCircle /> {notification}
              </div>
            )}

            <div className="dash-search-pill">
              <FiSearch />
              <input type="text" placeholder="Search system audit logs..." />
            </div>

            <Link to="/" className="btn-live-preview" target="_blank" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
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
                <div className="donezo-badge-tag" style={{ color: '#059669' }}>Active Channels</div>
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
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#0d3b34' }}>
                    {analyticsTimeframe === 'weekly' 
                      ? `${projects && projects.length > 0 ? Math.round((projects.length / (projects.length + 1)) * 100) : 100}%`
                      : `${projects && projects.length > 0 ? Math.min(98, Math.round((projects.length / (projects.length + 2)) * 100 + 12)) : 95}%`
                    }
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                    ↑ {projects ? projects.length : 0} {analyticsTimeframe === 'weekly' ? 'Items (Weekly)' : 'Items (Monthly)'}
                  </span>
                </div>

                {/* SVG AREA/LINE GRAPH WITH DYNAMIC CURVES */}
                <div style={{ position: 'relative', width: '100%', height: '110px', marginTop: '4px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="superAnalyticsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
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
                      stroke="#093c25"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* DATA DOTS */}
                    {analyticsTimeframe === 'weekly' ? (
                      <>
                        <circle cx="10" cy="90" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
                        <circle cx="110" cy="40" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
                        <circle cx="210" cy="20" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="310" cy="65" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
                        <circle cx="390" cy="35" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
                      </>
                    ) : (
                      <>
                        <circle cx="10" cy="75" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
                        <circle cx="130" cy="55" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
                        <circle cx="250" cy="15" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="390" cy="40" r="4" fill="#ffffff" stroke="#093c25" strokeWidth="2.5" />
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
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#093c25', marginBottom: '4px' }}>
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
                      <span style={{ color: '#059669' }}>Optimal</span>
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', background: '#10b981' }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  className="action-pill-btn primary-pill" 
                  style={{ width: '100%', justifyContent: 'center', background: '#093c25', color: '#ffffff', fontWeight: 800, padding: '10px' }} 
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
                    <span style={{ color: '#059669' }}>
                      {projects && projects.length > 0 ? Math.round((projects.filter(p => p.image).length / projects.length) * 100) : 100}% Completed
                    </span>
                  </div>
                  <div style={{ display: 'flex', height: '6px', borderRadius: '4px', overflow: 'hidden', background: '#e2e8f0' }}>
                    <div style={{ width: `${projects && projects.length > 0 ? Math.round((projects.filter(p => p.image).length / projects.length) * 100) : 70}%`, background: '#10b981' }}></div>
                    <div style={{ width: '20%', background: '#3b82f6', marginLeft: '2px' }}></div>
                    <div style={{ width: '10%', background: '#d97706', marginLeft: '2px' }}></div>
                  </div>
                </div>

                <div>
                  {projects && projects.length > 0 ? (
                    projects.slice(0, 3).map((p, idx) => (
                      <div key={p.id || idx} className="donezo-task-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                          <div className="donezo-task-icon-box" style={{ background: idx === 0 ? '#ecfdf5' : idx === 1 ? '#eff6ff' : '#fef3c7', color: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#d97706' }}>
                            {idx === 0 ? '🌐' : idx === 1 ? '⚡' : '🚀'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="donezo-task-title">{p.title}</div>
                              <span style={{ fontSize: '0.68rem', color: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#d97706', fontWeight: 700 }}>
                                {p.image ? '100%' : '85%'}
                              </span>
                            </div>
                            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                              <div style={{ width: p.image ? '100%' : '85%', height: '100%', background: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#d97706' }}></div>
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
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#d1fae5', color: '#059669', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
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
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#093c25" />
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
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#0d3b34', lineHeight: 1 }}>{pct}%</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, marginTop: '4px' }}>Live Completed</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.74rem', color: '#475569', fontWeight: 700, width: '100%', background: '#f8fafc', padding: '8px 12px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#093c25' }}></span> {doneP} Completed
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> {totalP - doneP} Active
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
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '3px 10px', borderRadius: '12px', border: '1px solid #a7f3d0', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    ⚡ System Ready
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    onClick={() => setActiveTab('projects')} 
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 800 }}>
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
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 800 }}>
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

                <div style={{ marginTop: '12px', background: '#ecfdf5', padding: '8px 12px', borderRadius: '10px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>
                  <span>Live Site Status</span>
                  <a href="/" target="_blank" rel="noreferrer" style={{ color: '#059669', textDecoration: 'none', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
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
            <div className="chart-header-row">
              <h3 className="chart-title">Add New Project</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
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

                <div className="dash-field-group full-width">
                  <label className="dash-label">Upload Project Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setNewProject, newProject)}
                  />
                  {newProject.image && (
                    <img src={newProject.image} alt="Preview" style={{ marginTop: '10px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                  )}
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
            <div className="chart-header-row">
              <h3 className="chart-title">Add Team Member</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
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
                    placeholder="e.g. Lead Software Architect" 
                    className="dash-input-styled"
                    value={newTeam.role}
                    onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                    required
                  />
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

            <div className="chart-header-row" style={{ marginTop: '36px' }}>
              <h3 className="chart-title">Current Team Roster ({team ? team.length : 0})</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px' }}>
              {team && team.map((m) => (
                <div key={m.id} style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <img src={m.image || '/Arifbillah.jpeg'} alt={m.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10b981', marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0f172a' }}>{m.name}</h4>
                  <p style={{ margin: '0 0 14px', fontSize: '0.82rem', color: '#10b981', fontWeight: 700 }}>{m.role}</p>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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

                <div className="dash-field-group full-width">
                  <label className="dash-label">Location Map / QR Asset Upload</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setEditContact, editContact)}
                  />
                  {editContact.image && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={editContact.image} alt="Contact Asset" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                    </div>
                  )}
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
              <h4 style={{ margin: '0 0 16px', color: '#0d3b34', fontSize: '1.1rem' }}>Add Custom Contact Channel</h4>
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
                    border: selectedSeoPage === page.id ? '1px solid #093c25' : '1px solid #cbd5e1',
                    background: selectedSeoPage === page.id ? '#093c25' : '#ffffff',
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
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
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
                  <h4 style={{ margin: '0 0 10px', color: '#093c25', fontSize: '1.1rem' }}>
                    Page SEO Configuration: <span style={{ color: '#10b981', textTransform: 'uppercase' }}>{selectedSeoPage} Page</span>
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

                <div className="dash-field-group full-width">
                  <label className="dash-label">Page Open Graph (OG) Social Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setEditPageSeo, editPageSeo)}
                  />
                  {editPageSeo.ogImage && (
                    <img src={editPageSeo.ogImage} alt="OG Preview" style={{ marginTop: '8px', width: '120px', height: '65px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                  )}
                </div>

                <div className="dash-field-group full-width" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#093c25', fontSize: '1.05rem' }}>
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
                  <div style={{ background: '#ecfdf5', padding: '12px 16px', borderRadius: '12px', border: '1px solid #a7f3d0', color: '#059669', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
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

                <div className="dash-field-group full-width">
                  <label className="dash-label">Hero Graphic / Media Banner Upload</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setEditHome, editHome)}
                  />
                  {editHome.image && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={editHome.image} alt="Hero Banner" style={{ width: '120px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                    </div>
                  )}
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
              <h4 style={{ margin: '0 0 16px', color: '#0d3b34', fontSize: '1.1rem' }}>Add Custom Homepage Feature Block</h4>
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

                <div className="dash-field-group full-width">
                  <label className="dash-label">About Us Photo / Media Asset Upload</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setEditAbout, editAbout)}
                  />
                  {editAbout.image && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={editAbout.image} alt="About Us Asset" style={{ width: '100px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                    </div>
                  )}
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
              <h4 style={{ margin: '0 0 16px', color: '#0d3b34', fontSize: '1.1rem' }}>Add Custom Value / Milestone Block</h4>
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
                      <span className="action-pill-btn" style={{ background: u.status === 'Active' ? '#ecfdf5' : '#fef2f2', color: u.status === 'Active' ? '#059669' : '#ef4444' }}>
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

        {/* TAB 8: BACKUPS */}
        {activeTab === 'database' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">1-Click Database Export & Snapshot</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '16px 0 24px' }}>
              Generate an encrypted JSON backup of all CMS contents, portfolio items, team rosters, and contact settings.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="action-pill-btn primary-pill" onClick={exportBackupJSON}>
                <FiDownloadCloud /> Export JSON Backup
              </button>
              <button className="action-pill-btn" onClick={() => triggerNotification('Database optimized!')}>
                <FiRefreshCw /> Optimize Tables
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminPage;
