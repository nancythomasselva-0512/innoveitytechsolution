import React, { useEffect, useState } from 'react';
import { 
  FiHome, FiFolder, FiUsers, FiFileText, FiPhone, 
  FiPlus, FiTrash2, FiEdit2, FiSearch, FiExternalLink,
  FiCheck, FiCheckCircle, FiX, FiMenu, FiSettings
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { InnoveityBrandLogo } from '../components/Navbar/Navbar';
import './AdminPage.css';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    projects, addProject, updateProject, deleteProject,
    team, addTeamMember, updateTeamMember, deleteTeamMember,
    contact, updateContact,
    homeContent, updateHomeContent
  } = useCMS();

  // CMS Form States
  const [newProject, setNewProject] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', image: '' });
  const [editContact, setEditContact] = useState(contact || {});
  const [editHome, setEditHome] = useState(homeContent || {});

  // Edit Modal States
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: '', role: '', image: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setEditContact(contact || {});
    setEditHome(homeContent || {});
  }, [contact, homeContent]);

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
    triggerNotification('Homepage content copy updated!');
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

        {/* User Card */}
        <div className="sidebar-user-card">
          <div className="dash-avatar-circle">AD</div>
          <div className="user-info">
            <h4>Admin Workspace</h4>
            <span className="user-role-tag">Content Manager</span>
          </div>
        </div>

        {/* Vertical Navigation Items */}
        <nav className="sidebar-nav-menu">
          <span className="nav-section-title">Main Menu</span>
          
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
            className={`nav-item-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span className="nav-icon"><FiPhone /></span>
            <span className="nav-label">Contact Details</span>
          </button>
        </nav>

        {/* Sidebar Footer Link */}
        <div className="sidebar-footer-box">
          <Link to="/super-admin" className="logout-nav-btn">
            <FiSettings /> <span className="logout-text">Super Admin</span>
          </Link>
        </div>
      </aside>

      {/* MAIN WORKSPACE AREA */}
      <div className="dash-main-area">
        
        {/* TOP HEADER */}
        <header className="dash-top-header">
          <div className="dash-header-title">
            <h1>
              {activeTab === 'overview' && 'Admin Overview'}
              {activeTab === 'projects' && 'Manage Projects'}
              {activeTab === 'team' && 'Team Roster Management'}
              {activeTab === 'home' && 'Homepage Content'}
              {activeTab === 'contact' && 'Contact & Communication Settings'}
            </h1>
            <p>Welcome back! Synchronized live with CMS.</p>
          </div>

          <div className="dash-header-right">
            {notification && (
              <div className="promo-mint-btn">
                <FiCheckCircle /> {notification}
              </div>
            )}

            <div className="dash-search-pill">
              <FiSearch />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Link to="/super-admin" className="dash-round-btn" title="Super Admin Settings">
              <FiSettings />
            </Link>

            <Link to="/" className="btn-live-preview" target="_blank">
              Live Preview <FiExternalLink />
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW ONLY - RENDERS THE ANALYTICS WIDGETS */}
        {activeTab === 'overview' && (
          <>
            {/* TOP WIDGETS GRID */}
            <div className="dash-widgets-grid">
              
              {/* WIDGET 1: REAL CMS OVERVIEW CARD */}
              <div className="dash-card card-total-overview">
                <div>
                  <span className="overview-top-label">Total Live CMS Projects</span>
                  <div className="overview-big-digit">
                    {projects ? projects.length : 0}<span className="decimal"> Active</span>
                  </div>

                  <div className="overview-pills-row">
                    <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('projects')}>
                      <FiPlus /> Add Project
                    </button>
                    <button className="action-pill-btn" onClick={() => setActiveTab('team')}>
                      <FiUsers /> Roster
                    </button>
                  </div>
                </div>

                <div className="mini-cards-row">
                  <div className="mini-card-blue">
                    <span className="card-number-val">Featured</span>
                    <span className="card-holder-name">{projects && projects[0] ? projects[0].title : 'Web Solutions'}</span>
                  </div>

                  <div className="mini-card-mint">
                    <span className="card-number-val">Team Roster</span>
                    <span className="card-holder-name">{team ? team.length : 0} Engineers</span>
                  </div>

                  <div className="mini-card-dark-btn" onClick={() => setActiveTab('projects')}>
                    +
                  </div>
                </div>
              </div>

              {/* WIDGET 2: PASTEL BLUE BAR CHART */}
              <div className="dash-card card-bar-chart">
                <div className="chart-header-row">
                  <h3 className="chart-title">Activity Trends</h3>
                  <button className="chart-dropdown-pill">Month v</button>
                </div>

                <div className="bar-chart-visual">
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '40%' }}></div>
                    <span className="bar-month-label">Jun</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '60%' }}></div>
                    <span className="bar-month-label">Jul</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '50%' }}></div>
                    <span className="bar-month-label">Aug</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill highlight" style={{ height: '90%' }}></div>
                    <span className="bar-month-label">Sep</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '70%' }}></div>
                    <span className="bar-month-label">Oct</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill highlight" style={{ height: '85%' }}></div>
                    <span className="bar-month-label">Nov</span>
                  </div>
                  <div className="bar-col">
                    <div className="bar-fill" style={{ height: '45%' }}></div>
                    <span className="bar-month-label">Dec</span>
                  </div>
                </div>

                <div className="promo-mint-box">
                  <div>
                    <div className="promo-mint-title">Manage Content</div>
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>Synchronized live with CMS</span>
                  </div>
                  <button className="promo-mint-btn" onClick={() => setActiveTab('home')}>
                    Edit Copy
                  </button>
                </div>
              </div>

              {/* WIDGET 3: PASTEL MINT ACTIVITY LIST */}
              <div className="dash-card card-mint-activity">
                <div className="chart-header-row">
                  <h3 className="chart-title">Recent Actions</h3>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>See All</span>
                </div>

                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-item-left">
                      <div className="activity-icon-circle"><FiFolder /></div>
                      <div>
                        <h4 className="activity-item-title">Portfolio Updated</h4>
                        <span className="activity-item-time">10 mins ago</span>
                      </div>
                    </div>
                    <span className="activity-value-badge">+{projects ? projects.length : 0} Projects</span>
                  </div>

                  <div className="activity-item">
                    <div className="activity-item-left">
                      <div className="activity-icon-circle"><FiUsers /></div>
                      <div>
                        <h4 className="activity-item-title">Team Member Added</h4>
                        <span className="activity-item-time">1 hour ago</span>
                      </div>
                    </div>
                    <span className="activity-value-badge">+{team ? team.length : 0} Members</span>
                  </div>

                  <div className="activity-item">
                    <div className="activity-item-left">
                      <div className="activity-icon-circle"><FiPhone /></div>
                      <div>
                        <h4 className="activity-item-title">Notification Email</h4>
                        <span className="activity-item-time">Active target</span>
                      </div>
                    </div>
                    <span className="activity-value-badge">websitet96@gmail</span>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM ROW WIDGETS */}
            <div className="dash-bottom-grid">
              
              <div className="dash-card card-spline-graph">
                <div className="chart-header-row">
                  <div>
                    <h3 className="chart-title">CMS System Performance & Traffic</h3>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Response time 42ms • 100% Uptime</span>
                  </div>
                  <button className="chart-dropdown-pill">Dec 06 v</button>
                </div>

                <div className="spline-svg-wrapper">
                  <svg width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45"/>
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 130 Q100 50 200 80 T400 30 T600 90 L600 180 L0 180 Z" fill="url(#areaGrad)" />
                    <path d="M0 130 Q100 50 200 80 T400 30 T600 90" fill="none" stroke="#0284c7" strokeWidth="3.5" />
                    <path d="M0 150 Q120 110 220 120 T420 60 T600 110" fill="none" stroke="#10b981" strokeWidth="2.5" />
                    <circle cx="400" cy="30" r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              <div className="dash-card card-gauge-score">
                <div className="chart-header-row" style={{ width: '100%' }}>
                  <h3 className="chart-title">System Score</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}>See More</span>
                </div>

                <div className="gauge-svg-container">
                  <svg width="220" height="120" viewBox="0 0 200 110">
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
                    <path d="M 20 100 A 80 80 0 0 1 165 60" fill="none" stroke="url(#mintGaugeArc)" strokeWidth="16" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="mintGaugeArc" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="gauge-score-number">1240</div>
                <div className="gauge-score-label">Live Content Performance</div>

                <button className="gauge-action-btn" onClick={() => setActiveTab('projects')}>
                  Manage Projects
                </button>
              </div>

            </div>
          </>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT WORKSPACE */}
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
                    placeholder="Description of project features and technology stack..."
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

        {/* TAB 3: TEAM ROSTER WORKSPACE */}
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

        {/* TAB 4: CONTACT DETAILS WORKSPACE */}
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

        {/* TAB 5: HOMEPAGE SITE COPY WORKSPACE */}
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

      </div>

    </div>
  );
};

export default AdminPage;
