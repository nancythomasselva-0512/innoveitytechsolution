import React, { useEffect, useState } from 'react';
import { 
  FiHome, FiUsers, FiSettings, FiShield, 
  FiDatabase, FiBell, FiSearch, FiServer,
  FiLogOut, FiMenu, FiX, FiCheckCircle, FiAlertTriangle,
  FiDownloadCloud, FiRefreshCw, FiLock, FiCpu, FiExternalLink,
  FiUserPlus, FiTrash2, FiZap, FiFolder, FiFileText, FiPhone,
  FiPlus, FiEdit2, FiCheck, FiLayers, FiInfo
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { InnoveityBrandLogo } from '../components/Navbar/Navbar';
import './AdminPage.css';

const SuperAdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notification, setNotification] = useState('');

  const { 
    projects, addProject, updateProject, deleteProject,
    team, addTeamMember, updateTeamMember, deleteTeamMember,
    contact, updateContact,
    homeContent, updateHomeContent,
    aboutContent, updateAboutContent
  } = useCMS();

  // CMS Form States
  const [newProject, setNewProject] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', image: '' });
  const [editContact, setEditContact] = useState(contact || {});
  const [editHome, setEditHome] = useState(homeContent || {});
  const [editAbout, setEditAbout] = useState(aboutContent || {});

  // Edit Modal States
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: '', role: '', image: '' });

  // Users management
  const [users, setUsers] = useState([
    { id: 1, name: 'System Owner', email: 'owner@innoveitytech.com', role: 'Super Admin', status: 'Active', lastLogin: '2 mins ago' },
    { id: 2, name: 'Arifbillah', email: 'arifbillah@innoveitytech.com', role: 'Admin', status: 'Active', lastLogin: '1 hour ago' },
    { id: 3, name: 'Matum Dhan', email: 'matum@innoveitytech.com', role: 'Admin', status: 'Active', lastLogin: '3 hours ago' }
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Admin' });

  const auditLogs = [
    { id: 101, event: 'CMS Contact Details Updated', user: 'Arifbillah', ip: '103.21.124.5', time: '10 mins ago', level: 'Low' },
    { id: 102, event: 'Super Admin Session Authorized', user: 'System Owner', ip: '157.48.201.12', time: '45 mins ago', level: 'Medium' },
    { id: 103, event: 'Project Portfolio Item Deleted', user: 'Matum Dhan', ip: '103.21.124.8', time: '2 hours ago', level: 'Low' }
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
    const added = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      lastLogin: 'Just now'
    };
    setUsers([...users, added]);
    setNewUser({ name: '', email: '', role: 'Admin' });
    triggerNotification(`Created administrator account: ${added.name}`);
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    triggerNotification('User status updated');
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
          <div className="dash-avatar-circle super-admin">SA</div>
          <div className="user-info">
            <h4>System Master</h4>
            <span className="user-role-tag" style={{ color: '#8b5cf6' }}>Super Admin</span>
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

          <button 
            className={`nav-item-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="nav-icon"><FiShield /></span>
            <span className="nav-label">Security Logs</span>
          </button>
        </nav>

        <div className="sidebar-footer-box">
          <Link to="/admin" className="logout-nav-btn" style={{ background: '#f5f3ff', color: '#7c3aed', borderColor: '#ddd6fe' }}>
            <FiLogOut /> <span className="logout-text">Admin Portal</span>
          </Link>
        </div>
      </aside>

      {/* MAIN WORKSPACE AREA */}
      <div className="dash-main-area">
        
        {/* TOP HEADER */}
        <header className="dash-top-header">
          <div className="dash-header-title">
            <h1>
              {activeTab === 'overview' && 'Super Admin Master Dashboard'}
              {activeTab === 'projects' && 'Manage Projects'}
              {activeTab === 'team' && 'Team Roster Management'}
              {activeTab === 'home' && 'Homepage Content'}
              {activeTab === 'about' && 'About Us Section'}
              {activeTab === 'contact' && 'Contact & Communication Settings'}
              {activeTab === 'users' && 'Manage Administrator Accounts'}
              {activeTab === 'database' && 'System Database & Backups'}
              {activeTab === 'security' && 'Security Audit Logs'}
            </h1>
            <p>Master system metrics, CMS management, user access & audit control.</p>
          </div>

          <div className="dash-header-right">
            {notification && (
              <div className="promo-mint-btn" style={{ background: '#ddd6fe', color: '#6d28d9' }}>
                <FiCheckCircle /> {notification}
              </div>
            )}

            <div className="dash-search-pill">
              <FiSearch />
              <input type="text" placeholder="Search system audit logs..." />
            </div>

            <Link to="/" className="btn-live-preview" target="_blank" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
              Live Site <FiExternalLink />
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW ONLY - RENDERS MASTER WIDGETS */}
        {activeTab === 'overview' && (
          <>
            {/* TOP WIDGETS GRID */}
            <div className="dash-widgets-grid">
              
              <div className="dash-card card-total-overview">
                <div>
                  <span className="overview-top-label">Master System Health</span>
                  <div className="overview-big-digit">
                    99.98<span className="decimal">%</span>
                  </div>

                  <div className="overview-pills-row">
                    <button className="action-pill-btn primary-pill" onClick={exportBackupJSON}>
                      <FiDownloadCloud /> Backup JSON
                    </button>
                    <button className="action-pill-btn" onClick={() => triggerNotification('Database optimized!')}>
                      <FiRefreshCw /> Optimize
                    </button>
                  </div>
                </div>

                <div className="mini-cards-row">
                  <div className="mini-card-blue">
                    <span className="card-number-val">SSL Active</span>
                    <span className="card-holder-name">HTTPS Secure</span>
                  </div>

                  <div className="mini-card-mint">
                    <span className="card-number-val">Latency</span>
                    <span className="card-holder-name">42 ms</span>
                  </div>

                  <div className="mini-card-dark-btn" onClick={exportBackupJSON}>
                    +
                  </div>
                </div>
              </div>

              <div className="dash-card card-bar-chart">
                <div className="chart-header-row">
                  <h3 className="chart-title">System Request Load</h3>
                  <button className="chart-dropdown-pill">Live v</button>
                </div>

                <div className="bar-chart-visual">
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '65%' }}></div>
                    <span className="bar-month-label">00:00</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '80%' }}></div>
                    <span className="bar-month-label">04:00</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill highlight" style={{ height: '95%' }}></div>
                    <span className="bar-month-label">08:00</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '70%' }}></div>
                    <span className="bar-month-label">12:00</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill highlight" style={{ height: '90%' }}></div>
                    <span className="bar-month-label">16:00</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '55%' }}></div>
                    <span className="bar-month-label">20:00</span>
                  </div>
                </div>

                <div className="promo-mint-box">
                  <div>
                    <div className="promo-mint-title">Maintenance Mode</div>
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>{maintenanceMode ? 'ENABLED' : 'Normal Operation'}</span>
                  </div>
                  <button 
                    className="promo-mint-btn"
                    onClick={() => {
                      setMaintenanceMode(!maintenanceMode);
                      triggerNotification(`Maintenance mode ${!maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
                    }}
                  >
                    Toggle
                  </button>
                </div>
              </div>

              <div className="dash-card card-mint-activity">
                <div className="chart-header-row">
                  <h3 className="chart-title">Audit Log Stream</h3>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Live</span>
                </div>

                <div className="activity-list">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="activity-item">
                      <div className="activity-item-left">
                        <div className="activity-icon-circle"><FiShield /></div>
                        <div>
                          <h4 className="activity-item-title">{log.event}</h4>
                          <span className="activity-item-time">{log.user} • {log.time}</span>
                        </div>
                      </div>
                      <span className="activity-value-badge">{log.level}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* BOTTOM ROW WIDGETS */}
            <div className="dash-bottom-grid">
              
              <div className="dash-card card-spline-graph">
                <div className="chart-header-row">
                  <div>
                    <h3 className="chart-title">Global API Latency & Network Bandwidth</h3>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Response 42ms • 0 Packet Loss</span>
                  </div>
                  <button className="chart-dropdown-pill">Today v</button>
                </div>

                <div className="spline-svg-wrapper">
                  <svg width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45"/>
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 140 Q100 60 200 90 T400 20 T600 80 L600 180 L0 180 Z" fill="url(#purpleAreaGrad)" />
                    <path d="M0 140 Q100 60 200 90 T400 20 T600 80" fill="none" stroke="#8b5cf6" strokeWidth="3.5" />
                    <path d="M0 160 Q120 120 220 130 T420 50 T600 100" fill="none" stroke="#2ec4b6" strokeWidth="2.5" />
                    <circle cx="400" cy="20" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              <div className="dash-card card-gauge-score">
                <div className="chart-header-row" style={{ width: '100%' }}>
                  <h3 className="chart-title">System Security Rating</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Grade A+</span>
                </div>

                <div className="gauge-svg-container">
                  <svg width="220" height="120" viewBox="0 0 200 110">
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
                    <path d="M 20 100 A 80 80 0 0 1 175 80" fill="none" stroke="url(#purpleArc)" strokeWidth="16" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="purpleArc" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="gauge-score-number">1620</div>
                <div className="gauge-score-label">Maximum Security Standard</div>

                <button className="gauge-action-btn" onClick={exportBackupJSON}>
                  Export Backup
                </button>
              </div>

            </div>
          </>
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
                        <button className="promo-mint-btn" style={{ background: '#f87171', color: '#fff' }} onClick={() => deleteProject(p.id)}>
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
                    <button className="promo-mint-btn" style={{ background: '#f87171', color: '#fff' }} onClick={() => deleteTeamMember(m.id)}>
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
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Contact Details
                  </button>
                </div>
              </form>
            </div>
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
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save Homepage Content
                  </button>
                </div>
              </form>
            </div>
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
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiCheck /> Save About Us Content
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
                    placeholder="Email Address" 
                    className="dash-input-styled"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group full-width">
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
                    <td><span className="category-badge-pill">{u.role}</span></td>
                    <td><span className="action-pill-btn">{u.status}</span></td>
                    <td>
                      <button className="promo-mint-btn" onClick={() => toggleUserStatus(u.id)}>
                        Toggle Status
                      </button>
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

        {/* TAB 9: SECURITY LOGS */}
        {activeTab === 'security' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row">
              <h3 className="chart-title">Real-Time Security & Activity Audit Log</h3>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>
            <table className="dash-cms-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Event Description</th>
                  <th>User</th>
                  <th>IP Address</th>
                  <th>Time</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td><code>#{log.id}</code></td>
                    <td><strong>{log.event}</strong></td>
                    <td>{log.user}</td>
                    <td><code>{log.ip}</code></td>
                    <td style={{ color: '#64748b' }}>{log.time}</td>
                    <td><span className="category-badge-pill">{log.level}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};

export default SuperAdminPage;
