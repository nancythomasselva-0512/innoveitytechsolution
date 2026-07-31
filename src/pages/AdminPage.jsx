import React, { useEffect, useState } from 'react';
import { 
  FiHome, FiUsers, FiFileText, FiSettings, 
  FiBell, FiSearch, FiMessageSquare, FiActivity,
  FiLogOut, FiMenu, FiX 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import './AdminPage.css';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const { 
    projects, addProject, deleteProject,
    team, addTeamMember, updateTeamMember, deleteTeamMember,
    contact, updateContact,
    homeContent, updateHomeContent,
    aboutContent, updateAboutContent
  } = useCMS();

  // Temporary state for new items
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', image: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', image: '' });
  const [editContact, setEditContact] = useState(contact || {});
  const [editHome, setEditHome] = useState(homeContent || {});
  const [editAbout, setEditAbout] = useState(aboutContent || {});
  
  // State for inline editing
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: '', role: '', image: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="admin-logo">Inno<span>Admin</span></h2>
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            <FiX />
          </button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <h4>Admin User</h4>
            <p>Content Manager</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''}>
              <a href="#dashboard" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}><FiHome /> Dashboard</a>
            </li>
            <li className={activeTab === 'home' ? 'active' : ''}>
              <a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}><FiFileText /> Home Page</a>
            </li>
            <li className={activeTab === 'about' ? 'active' : ''}>
              <a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}><FiFileText /> About Us</a>
            </li>
            <li className={activeTab === 'projects' ? 'active' : ''}>
              <a href="#projects" onClick={(e) => { e.preventDefault(); setActiveTab('projects'); }}><FiFileText /> Projects</a>
            </li>
            <li className={activeTab === 'inquiries' ? 'active' : ''}>
              <a href="#inquiries" onClick={(e) => { e.preventDefault(); setActiveTab('inquiries'); }}><FiMessageSquare /> Inquiries</a>
            </li>
            <li className={activeTab === 'analytics' ? 'active' : ''}>
              <a href="#analytics" onClick={(e) => { e.preventDefault(); setActiveTab('analytics'); }}><FiActivity /> Analytics</a>
            </li>
            <li className={activeTab === 'team' ? 'active' : ''}>
              <a href="#team" onClick={(e) => { e.preventDefault(); setActiveTab('team'); }}><FiUsers /> Our Team</a>
            </li>
            <li className={activeTab === 'contact' ? 'active' : ''}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}><FiBell /> Contact Settings</a>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/" className="logout-btn">
            <FiLogOut /> Return to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search projects or clients..." />
            </div>
          </div>
          
          <div className="header-right">
            <button className="notification-btn">
              <FiBell />
              <span className="badge">3</span>
            </button>
            <div className="profile-btn">
              <div className="avatar-small">AD</div>
            </div>
          </div>
        </header>

        {/* Content Area Rendering Based on Active Tab */}
        <div className="admin-content-area">
          
          {activeTab === 'dashboard' && (
            <>
              <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome back! Here's what's happening with your content today.</p>
              </div>

              {/* Metric Cards */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon projects"><FiFileText /></div>
                  <div className="metric-details">
                    <h3>Total Projects</h3>
                    <h2>24</h2>
                    <p className="positive">+3 this month</p>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-icon clients"><FiUsers /></div>
                  <div className="metric-details">
                    <h3>Active Clients</h3>
                    <h2>18</h2>
                    <p className="positive">+2 this week</p>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-icon messages"><FiMessageSquare /></div>
                  <div className="metric-details">
                    <h3>New Inquiries</h3>
                    <h2>12</h2>
                    <p className="negative">-1 since yesterday</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="dashboard-panel">
                <div className="panel-header">
                  <h3>Recent Project Updates</h3>
                  <button className="btn-primary">Add New Project</button>
                </div>
                
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Last Modified</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Enterprise Cloud Migration</td>
                        <td>Cloud Solutions</td>
                        <td><span className="status-badge active">Published</span></td>
                        <td>Today, 10:23 AM</td>
                        <td><button className="btn-text">Edit</button></td>
                      </tr>
                      <tr>
                        <td>BioMed Summit</td>
                        <td>Medical Conference</td>
                        <td><span className="status-badge draft">Draft</span></td>
                        <td>Yesterday, 4:15 PM</td>
                        <td><button className="btn-text">Edit</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'home' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Edit Home Page</h3>
                <button className="btn-primary" onClick={() => updateHomeContent(editHome)}>Save Changes</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Kicker Tag</label>
                  <input type="text" value={editHome.kicker || ''} onChange={e => setEditHome({...editHome, kicker: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Title (Line 1)</label>
                  <input type="text" value={editHome.titleLine1 || ''} onChange={e => setEditHome({...editHome, titleLine1: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Title (Line 2)</label>
                  <input type="text" value={editHome.titleLine2 || ''} onChange={e => setEditHome({...editHome, titleLine2: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                  <textarea value={editHome.description || ''} onChange={e => setEditHome({...editHome, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '100px' }} />
                </div>
                
                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                  <h4>About Summary Section</h4>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>About Kicker</label>
                  <input type="text" value={editHome.aboutKicker || ''} onChange={e => setEditHome({...editHome, aboutKicker: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>About Title</label>
                  <textarea value={editHome.aboutTitle || ''} onChange={e => setEditHome({...editHome, aboutTitle: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '60px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>About Description</label>
                  <textarea value={editHome.aboutDesc || ''} onChange={e => setEditHome({...editHome, aboutDesc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '100px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Feature 1 Title</label>
                    <input type="text" value={editHome.aboutFeature1Title || ''} onChange={e => setEditHome({...editHome, aboutFeature1Title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Feature 1 Desc</label>
                    <input type="text" value={editHome.aboutFeature1Desc || ''} onChange={e => setEditHome({...editHome, aboutFeature1Desc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Feature 2 Title</label>
                    <input type="text" value={editHome.aboutFeature2Title || ''} onChange={e => setEditHome({...editHome, aboutFeature2Title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Feature 2 Desc</label>
                    <input type="text" value={editHome.aboutFeature2Desc || ''} onChange={e => setEditHome({...editHome, aboutFeature2Desc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                  <h4>Services Section Header</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Services Title 1</label>
                    <input type="text" value={editHome.servicesMainTitle1 || ''} onChange={e => setEditHome({...editHome, servicesMainTitle1: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Services Title 2 (Highlighted)</label>
                    <input type="text" value={editHome.servicesMainTitle2 || ''} onChange={e => setEditHome({...editHome, servicesMainTitle2: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Services Subtitle</label>
                  <textarea value={editHome.servicesSubtitle || ''} onChange={e => setEditHome({...editHome, servicesSubtitle: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '60px' }} />
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                  <h4>Service Cards</h4>
                </div>
                {(editHome.servicesList || []).map((service, index) => (
                  <div key={index} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Service {index + 1} Title</label>
                        <input type="text" value={service.title} onChange={e => {
                          const newList = [...editHome.servicesList];
                          newList[index].title = e.target.value;
                          setEditHome({...editHome, servicesList: newList});
                        }} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', color: '#333' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Description</label>
                      <textarea value={service.desc} onChange={e => {
                        const newList = [...editHome.servicesList];
                        newList[index].desc = e.target.value;
                        setEditHome({...editHome, servicesList: newList});
                      }} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px', color: '#333' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Edit About Us Page</h3>
                <button className="btn-primary" onClick={() => updateAboutContent(editAbout)}>Save Changes</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Main Kinetic Statement</label>
                  <textarea value={editAbout.mainStatement || ''} onChange={e => setEditAbout({...editAbout, mainStatement: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '80px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Scrolling Badges (comma separated)</label>
                  <input type="text" value={editAbout.badges || ''} onChange={e => setEditAbout({...editAbout, badges: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 1 Number</label>
                    <input type="text" value={editAbout.stat1Number || ''} onChange={e => setEditAbout({...editAbout, stat1Number: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 1 Label</label>
                    <input type="text" value={editAbout.stat1Label || ''} onChange={e => setEditAbout({...editAbout, stat1Label: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 2 Number</label>
                    <input type="text" value={editAbout.stat2Number || ''} onChange={e => setEditAbout({...editAbout, stat2Number: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 2 Label</label>
                    <input type="text" value={editAbout.stat2Label || ''} onChange={e => setEditAbout({...editAbout, stat2Label: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 3 Number</label>
                    <input type="text" value={editAbout.stat3Number || ''} onChange={e => setEditAbout({...editAbout, stat3Number: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 3 Label</label>
                    <input type="text" value={editAbout.stat3Label || ''} onChange={e => setEditAbout({...editAbout, stat3Label: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 4 Number</label>
                    <input type="text" value={editAbout.stat4Number || ''} onChange={e => setEditAbout({...editAbout, stat4Number: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stat 4 Label</label>
                    <input type="text" value={editAbout.stat4Label || ''} onChange={e => setEditAbout({...editAbout, stat4Label: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Manage Projects</h3>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                <input type="text" placeholder="Category" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                <input type="text" placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewProject, newProject)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', backgroundColor: 'white' }} />
                {newProject.image && <img src={newProject.image} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                <button className="btn-primary" onClick={() => { if(newProject.title) { addProject({...newProject, technologies: [], highlights: []}); setNewProject({title:'', category:'', description:'', image:''}) } }}>Add</button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead><tr><th>Title</th><th>Category</th><th>Action</th></tr></thead>
                  <tbody>
                    {projects.map(p => (
                      <tr key={p.id}>
                        <td>{p.title}</td>
                        <td>{p.category}</td>
                        <td><button onClick={() => deleteProject(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Customer Inquiries</h3>
              </div>
              <p>All contact form submissions will appear here...</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Website Analytics</h3>
              </div>
              <p>Traffic and engagement charts will be displayed here...</p>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Manage Our Team</h3>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder="Name" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                <input type="text" placeholder="Role" value={newTeam.role} onChange={e => setNewTeam({...newTeam, role: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewTeam, newTeam)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', backgroundColor: 'white' }} />
                {newTeam.image && <img src={newTeam.image} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                <button className="btn-primary" onClick={() => { if(newTeam.name) { addTeamMember(newTeam); setNewTeam({name:'', role:'', image:''}) } }}>Add Member</button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Role</th><th>Action</th></tr></thead>
                  <tbody>
                    {team.map(m => (
                      <tr key={m.id}>
                        {editingTeamId === m.id ? (
                          <>
                            <td>
                              <input type="text" value={editTeamData.name} onChange={e => setEditTeamData({...editTeamData, name: e.target.value})} style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', width: '100%' }} />
                            </td>
                            <td>
                              <input type="text" value={editTeamData.role} onChange={e => setEditTeamData({...editTeamData, role: e.target.value})} style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', width: '100%' }} />
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => { updateTeamMember(m.id, editTeamData); setEditingTeamId(null); }} style={{ color: 'green', background: 'none', border: 'none', cursor: 'pointer' }}>Save</button>
                                <button onClick={() => setEditingTeamId(null)} style={{ color: 'gray', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{m.name}</td>
                            <td>{m.role}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => { setEditingTeamId(m.id); setEditTeamData({ name: m.name, role: m.role, image: m.image }); }} style={{ color: '#10b981', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => deleteTeamMember(m.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="dashboard-panel">
              <div className="panel-header">
                <h3>Contact Settings</h3>
                <button className="btn-primary" onClick={() => updateContact(editContact)}>Save Changes</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                  <input type="text" value={editContact.email} onChange={e => setEditContact({...editContact, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
                  <input type="text" value={editContact.phone} onChange={e => setEditContact({...editContact, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Address</label>
                  <textarea value={editContact.address} onChange={e => setEditContact({...editContact, address: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '80px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Business Hours</label>
                  <textarea value={editContact.businessHours} onChange={e => setEditContact({...editContact, businessHours: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333', minHeight: '80px' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
