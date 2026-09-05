import React, { useEffect, useState } from 'react';
import {
  FiHome, FiFolder, FiUsers, FiFileText, FiPhone, FiInfo, FiDatabase,
  FiPlus, FiTrash2, FiEdit2, FiSearch, FiExternalLink, FiCalendar, FiClock, FiVideo, FiFilm,
  FiCheck, FiCheckCircle, FiX, FiMenu, FiSettings, FiDownloadCloud, FiLayers, FiArrowUp, FiArrowDown, FiLayout, FiRefreshCw, FiMail,
  FiStar, FiBriefcase, FiBookOpen, FiBox, FiAward, FiTag
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { InnoveityBrandLogo } from '../components/Navbar/Navbar';
import CustomFieldsManager from '../components/UI/CustomFieldsManager';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const {
    projects, addProject, updateProject, deleteProject,
    showcaseProjects, addShowcaseProject, updateShowcaseProject, deleteShowcaseProject,
    team, addTeamMember, updateTeamMember, deleteTeamMember, moveTeamMemberUp, moveTeamMemberDown,
    contact,
    contactInquiries, deleteInquiry, markInquiryReplied, updateInquiryStatus, updateInquiryNotes,
    testimonials, addTestimonial, deleteTestimonial,
    mediaGallery, addMediaItem, deleteMediaItem,
    careers, addCareer, deleteCareer, toggleCareerStatus,
    hiringAlertEnabled, toggleHiringAlert,
    blogPosts, addBlogPost, deleteBlogPost,
    servicesList, addServiceItem, deleteServiceItem,
    adminUsers, addAdminUser, currentUser, logoutAdmin, clearAllCmsCache,
    seedCloudDatabase, dbStatus
  } = useCMS();

  const users = adminUsers || [];
  const inquiries = contactInquiries || [];
  const reviews = testimonials || [];
  const mediaItems = mediaGallery || [];
  const jobs = careers || [];
  const articles = blogPosts || [];
  const services = servicesList || [];

  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('all'); // 'all' | 'New' | 'Replied'
  const [replyModalInq, setReplyModalInq] = useState(null);
  const [quickReplyBody, setQuickReplyBody] = useState('');

  const handleSendEmailReply = (inq, customMsg) => {
    if (markInquiryReplied) {
      markInquiryReplied(inq.id);
    }
    const subject = encodeURIComponent(`Re: ${inq.subject || 'Inquiry - Innoveity Tech Solution'}`);
    const body = encodeURIComponent(
      customMsg 
        ? `Dear ${inq.name},\n\n${customMsg}\n\nBest regards,\nInnoveity Tech Solution Engineering Team\nhttps://innoveitytech.com`
        : `Dear ${inq.name},\n\nThank you for reaching out to Innoveity Tech Solution regarding "${inq.subject}".\n\nWe have reviewed your request and would be delighted to assist you.\n\nBest regards,\nInnoveity Tech Solution\nhttps://innoveitytech.com`
    );
    window.location.href = `mailto:${inq.email}?subject=${subject}&body=${body}`;
    triggerNotification(`Opened email draft to ${inq.email}!`);
    setReplyModalInq(null);
    setQuickReplyBody('');
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  // Add User Form State
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'Admin' });

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) return;
    const added = addAdminUser(newAdmin);
    setNewAdmin({ name: '', email: '', password: '', role: 'Admin' });
    setShowAddAdminForm(false);
    triggerNotification(`Created administrator account: ${added.name}`);
  };

  // CMS Form States
  const [newProject, setNewProject] = useState({ title: '', category: 'Web Development', description: '', image: '' });
  const [newShowcaseCard, setNewShowcaseCard] = useState({ tag: '', title: '', subtitle: '', description: '', image: '', tech: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', category: 'Team Member', image: '' });

  // 1. Testimonial Form State
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', company: '', rating: 5, content: '', avatar: '' });

  // 2. Media Gallery Form State
  const [newMedia, setNewMedia] = useState({ title: '', category: 'Brand Commercial', videoUrl: '', thumbnail: '', description: '' });

  // 3. Careers Form State
  const [newCareer, setNewCareer] = useState({ title: '', department: 'Engineering', location: 'Remote / Chennai', type: 'Full-Time', experience: '2+ Years', description: '' });

  // 4. Blog Form State
  const [newBlog, setNewBlog] = useState({ title: '', category: 'AI & Cloud', author: 'Nancy Thomas', readTime: '5 min read', excerpt: '', coverImage: '' });

  // 5. Services Form State
  const [newService, setNewService] = useState({ title: '', category: 'AI & Cloud Architecture', tagline: '', deliverables: '' });

  // Edit Modal States
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({ title: '', category: 'Web Development', description: '', image: '' });

  const [editingShowcaseId, setEditingShowcaseId] = useState(null);
  const [editShowcaseData, setEditShowcaseData] = useState({ tag: '', title: '', subtitle: '', description: '', image: '', tech: '' });

  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: '', role: '', category: 'Team Member', image: '' });

  const handleAddShowcaseSubmit = (e) => {
    e.preventDefault();
    if (!newShowcaseCard.title || !newShowcaseCard.description) return;
    if (addShowcaseProject) {
      addShowcaseProject(newShowcaseCard);
      setNewShowcaseCard({ tag: '', title: '', subtitle: '', description: '', image: '', tech: '' });
      triggerNotification('New 3D Showcase Card added successfully!');
    }
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleAddTestimonialSubmit = (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.content) return;
    addTestimonial(newTestimonial);
    setNewTestimonial({ name: '', role: '', company: '', rating: 5, content: '', avatar: '' });
    triggerNotification('Added client testimonial review!');
  };

  const handleAddMediaSubmit = (e) => {
    e.preventDefault();
    if (!newMedia.title) return;
    addMediaItem(newMedia);
    setNewMedia({ title: '', category: 'Brand Commercial', videoUrl: '', thumbnail: '', description: '' });
    triggerNotification('Added media video showcase item!');
  };

  const handleAddCareerSubmit = (e) => {
    e.preventDefault();
    if (!newCareer.title) return;
    addCareer(newCareer);
    setNewCareer({ title: '', department: 'Engineering', location: 'Remote / Chennai', type: 'Full-Time', experience: '2+ Years', description: '' });
    triggerNotification('Posted new career opening!');
  };

  const handleAddBlogSubmit = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.excerpt) return;
    addBlogPost(newBlog);
    setNewBlog({ title: '', category: 'AI & Cloud', author: 'Nancy Thomas', readTime: '5 min read', excerpt: '', coverImage: '' });
    triggerNotification('Published new tech blog article!');
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    if (!newService.title) return;
    addServiceItem(newService);
    setNewService({ title: '', category: 'AI & Cloud Architecture', tagline: '', deliverables: '' });
    triggerNotification('Added new solution service package!');
  };

  return (
    <div className="admin-layout">

      {/* QUICK EMAIL REPLY MODAL OVERLAY */}
      {replyModalInq && (
        <div className="dash-modal-backdrop">
          <div className="dash-modal-card">
            <div className="dash-modal-header">
              <h3 className="dash-modal-title">Reply to {replyModalInq.name}</h3>
              <button className="dash-modal-close-btn" onClick={() => setReplyModalInq(null)}><FiX /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSendEmailReply(replyModalInq, quickReplyBody); }} className="dash-form-grid">
              <div className="dash-field-group">
                <label className="dash-label">Recipient Email</label>
                <input
                  type="email"
                  className="dash-input-styled"
                  value={replyModalInq.email}
                  disabled
                />
              </div>

              <div className="dash-field-group">
                <label className="dash-label">Inquiry Subject</label>
                <input
                  type="text"
                  className="dash-input-styled"
                  value={replyModalInq.subject || 'General Inquiry'}
                  disabled
                />
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Client's Received Message</label>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.84rem', color: '#475569', maxHeight: '90px', overflowY: 'auto' }}>
                  {replyModalInq.message}
                </div>
              </div>

              <div className="dash-field-group full-width">
                <label className="dash-label">Your Email Reply Message</label>
                <textarea
                  className="dash-input-styled"
                  style={{ height: '120px' }}
                  placeholder="Type your response message here..."
                  value={quickReplyBody}
                  onChange={(e) => setQuickReplyBody(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="dash-modal-actions">
                <button type="button" className="action-pill-btn secondary-pill" onClick={() => setReplyModalInq(null)}>
                  Cancel
                </button>
                <button type="submit" className="action-pill-btn primary-pill" style={{ background: 'linear-gradient(135deg, #ff6b00, #ea580c)', color: '#ffffff', border: 'none' }}>
                  <FiMail /> Send Email Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <InnoveityBrandLogo size={42} darkBg={false} />
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

        {/* Vertical Navigation Items */}
        <nav className="sidebar-nav-menu">
          <span className="nav-section-title">Core Operations</span>

          <button
            className={`nav-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon"><FiHome /></span>
            <span className="nav-label">Overview</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-icon"><FiDatabase /></span>
            <span className="nav-label">User Database</span>
            <span className="nav-badge">{users.length}</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span className="nav-icon"><FiMail /></span>
            <span className="nav-label">Inquiries & Applications</span>
            {inquiries.length > 0 && (
              <span className="nav-badge">
                {inquiries.length}
              </span>
            )}
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

          <span className="nav-section-title" style={{ marginTop: '12px' }}>Content & Business</span>

          <button
            className={`nav-item-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <span className="nav-icon"><FiStar /></span>
            <span className="nav-label">Client Reviews</span>
            <span className="nav-badge">{reviews.length}</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'media_gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('media_gallery')}
          >
            <span className="nav-icon"><FiVideo /></span>
            <span className="nav-label">Media & Videos</span>
            <span className="nav-badge">{mediaItems.length}</span>
          </button>

          <button
            className={`nav-item-btn ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => setActiveTab('careers')}
          >
            <span className="nav-icon"><FiBriefcase /></span>
            <span className="nav-label">Careers Board</span>
            <span className="nav-badge">{jobs.length}</span>
          </button>
        </nav>

        {/* Sidebar Footer Link */}
        <div className="sidebar-footer-box" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={handleLogout}
            className="logout-nav-btn"
            style={{ width: '100%', background: '#fef2f2', color: '#ef4444', borderColor: '#fecaca', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', border: '1px solid #fecaca', fontWeight: 700 }}
          >
            <FiSettings /> <span className="logout-text">Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE AREA */}
      <div className="dash-main-area">

        {/* TOP HEADER */}
        <header className="dash-top-header">
          <div className="dash-header-title">
            <h1>
              {activeTab === 'overview' && 'Admin Portal Overview'}
              {activeTab === 'users' && 'User Access & Account Directory'}
              {activeTab === 'contact' && 'Customer Inquiries & Lead Pipeline'}
              {activeTab === 'projects' && 'Projects Portfolio Operations'}
              {activeTab === 'team' && 'Team Roster Directory'}
              {activeTab === 'testimonials' && 'Client Testimonials & Ratings'}
              {activeTab === 'media_gallery' && 'Media Capabilities & Video Showcase'}
              {activeTab === 'careers' && 'Careers & Job Openings Management'}
              {activeTab === 'blog' && 'Tech Blog & Engineering Articles'}
              {activeTab === 'services' && 'Services & Solution Packages'}
            </h1>
            <p>Admin Workspace • Synchronized live with CMS.</p>
          </div>

          <div className="dash-header-right">
            {notification && (
              <div className="promo-mint-btn">
                <FiCheckCircle /> {notification}
              </div>
            )}

            <button
              className="btn-live-preview"
              style={{ background: 'linear-gradient(135deg, #ff6b00, #ea580c)', color: '#ffffff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}
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
              style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 700 }}
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

            <Link to="/super-admin" className="dash-round-btn" title="Super Admin Settings">
              <FiSettings />
            </Link>

            <Link to="/" className="btn-live-preview" target="_blank" style={{ whiteSpace: 'nowrap', fontWeight: 700 }}>
              Live Site <FiExternalLink />
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW ONLY - RENDERS THE DONEZO ULTRA-MODERN DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="donezo-container">
            {/* ROW 1: 4 STAT CARDS ACROSS (100% REAL DYNAMIC CMS DATA) */}
            <div className="donezo-top-stats-grid">
              {/* CARD 1: TOTAL PROJECTS */}
              <div className="donezo-stat-card donezo-featured-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('projects')}>
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Total Projects</span>
                <div className="donezo-stat-digit">{projects ? projects.length : 0}</div>
                <div className="donezo-badge-tag"><FiCheckCircle /> [ {projects ? projects.length : 0} Live ] In Portfolio</div>
              </div>

              {/* CARD 2: TEAM MEMBERS */}
              <div className="donezo-stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('team')}>
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Team Roster</span>
                <div className="donezo-stat-digit">{team ? team.length : 0}</div>
                <div className="donezo-badge-tag"><FiCheckCircle /> [ {team ? team.length : 0} Active ] Engineers & Leads</div>
              </div>

              {/* CARD 3: CUSTOMER INQUIRIES */}
              <div className="donezo-stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('contact')}>
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Customer Inquiries</span>
                <div className="donezo-stat-digit">{inquiries ? inquiries.length : 0}</div>
                <div className="donezo-badge-tag" style={{ color: '#ea580c' }}>
                  <FiMail /> [ {inquiries.filter(i => i.status === 'New').length} New ] Direct Messages
                </div>
              </div>

              {/* CARD 4: TESTIMONIALS */}
              <div className="donezo-stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('testimonials')}>
                <span className="donezo-arrow-circle">↗</span>
                <span className="donezo-stat-title">Client Reviews</span>
                <div className="donezo-stat-digit">{reviews ? reviews.length : 0}</div>
                <div className="donezo-badge-tag" style={{ color: '#10b981' }}>
                  <FiCheckCircle /> [ {reviews ? reviews.length : 0} Verified ] Endorsements
                </div>
              </div>
            </div>

            {/* MAIN REAL CMS WORKSPACE GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginTop: '20px', alignItems: 'start' }}>
              {/* RECENT INCOMING CUSTOMER INQUIRIES */}
              <div className="donezo-card" style={{ padding: '24px', justifyContent: 'flex-start', gap: '16px' }}>
                <div className="pos-card-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 className="donezo-card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiMail style={{ color: '#ff6b00' }} /> Recent Customer Inquiries
                    </h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                      Latest direct messages from contact forms & clients
                    </p>
                  </div>
                  <button className="pos-toggle-btn active" style={{ fontSize: '0.74rem', padding: '4px 12px' }} onClick={() => setActiveTab('contact')}>
                    View All ({inquiries.length})
                  </button>
                </div>

                {inquiries && inquiries.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {inquiries.slice(0, 5).map((inq, idx) => (
                      <div
                        key={inq.id || idx}
                        style={{
                          background: inq.status === 'New' ? '#fff7ed' : '#f8fafc',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          border: inq.status === 'New' ? '1px solid #fdba74' : '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <strong style={{ fontSize: '0.88rem', color: '#082233' }}>{inq.name}</strong>
                            <span
                              style={{
                                fontSize: '0.68rem',
                                padding: '2px 6px',
                                borderRadius: '6px',
                                fontWeight: 700,
                                background: inq.status === 'New' ? '#ff6b00' : '#e2e8f0',
                                color: inq.status === 'New' ? '#ffffff' : '#475569'
                              }}
                            >
                              {inq.status || 'New'}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {inq.subject || inq.message || inq.email}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                            {inq.email} • {inq.date || 'Recent'}
                          </div>
                        </div>

                        <button
                          className="action-pill-btn primary-pill"
                          style={{ fontSize: '0.72rem', padding: '6px 10px', whiteSpace: 'nowrap', flexShrink: 0 }}
                          onClick={() => {
                            setReplyModalInq(inq);
                            setQuickReplyBody('');
                          }}
                        >
                          <FiMail /> Reply
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b', fontSize: '0.85rem' }}>
                    No customer inquiries received yet.
                  </div>
                )}
              </div>

              {/* RECENT PORTFOLIO PROJECTS */}
              <div className="donezo-card" style={{ padding: '24px', justifyContent: 'flex-start', gap: '16px' }}>
                <div className="pos-card-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 className="donezo-card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiFolder style={{ color: '#ff6b00' }} /> Live Portfolio Projects
                    </h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                      Published client solutions and engineering builds
                    </p>
                  </div>
                  <button className="pos-toggle-btn active" style={{ fontSize: '0.74rem', padding: '4px 12px' }} onClick={() => setActiveTab('projects')}>
                    + Add Project
                  </button>
                </div>

                {projects && projects.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {projects.slice(0, 5).map((p, idx) => (
                      <div
                        key={p.id || idx}
                        style={{
                          background: '#ffffff',
                          borderRadius: '12px',
                          padding: '10px 14px',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fff7ed', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                              <FiFolder />
                            </div>
                          )}
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#082233', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.title}
                            </div>
                            <span className="category-badge-pill" style={{ marginTop: '2px', display: 'inline-block', fontSize: '0.68rem', padding: '1px 6px' }}>
                              {p.category || 'Engineering'}
                            </span>
                          </div>
                        </div>

                        <button
                          className="pos-toggle-btn"
                          style={{ fontSize: '0.72rem', padding: '4px 10px', flexShrink: 0 }}
                          onClick={() => setActiveTab('projects')}
                        >
                          Manage
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b', fontSize: '0.85rem' }}>
                    No projects available in portfolio.
                  </div>
                )}
              </div>
            </div>

            {/* BOTTOM SECTION: TEAM ROSTER & QUICK ACCESS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px', alignItems: 'start' }}>
              {/* ACTIVE TEAM ROSTER */}
              <div className="donezo-card" style={{ padding: '24px' }}>
                <div className="pos-card-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 className="donezo-card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiUsers style={{ color: '#ff6b00' }} /> Active Team Members
                    </h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                      Engineers & leadership staff shown on site
                    </p>
                  </div>
                  <button className="pos-toggle-btn active" style={{ fontSize: '0.74rem', padding: '4px 12px' }} onClick={() => setActiveTab('team')}>
                    + Add Member
                  </button>
                </div>

                {team && team.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {team.slice(0, 4).map((m, idx) => (
                      <div
                        key={m.id || idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          background: '#f8fafc',
                          borderRadius: '12px',
                          border: '1px solid #f1f5f9'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {m.image ? (
                            <img
                              src={m.image}
                              alt={m.name}
                              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: '#fed7aa',
                                color: '#ea580c',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem'
                              }}
                            >
                              {m.name ? m.name.substring(0, 2).toUpperCase() : 'TM'}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#082233' }}>{m.name}</div>
                            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{m.role || 'Engineer'}</div>
                          </div>
                        </div>

                        <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '6px' }}>
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b', fontSize: '0.85rem' }}>
                    No team members listed.
                  </div>
                )}
              </div>

              {/* QUICK CMS NAVIGATION HUB */}
              <div className="donezo-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="pos-card-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 className="donezo-card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiSettings style={{ color: '#ff6b00' }} /> Quick CMS Hub
                      </h4>
                      <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                        Direct access to manage all active website content
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <button
                      onClick={() => setActiveTab('projects')}
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 10px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fed7aa', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <FiFolder />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#082233' }}>Projects</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{projects.length} Items</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('team')}
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 10px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fff7ed', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <FiUsers />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#082233' }}>Team</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{team.length} Members</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('contact')}
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 10px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <FiPhone />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#082233' }}>Inquiries</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{inquiries.length} Inbox</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('testimonials')}
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 10px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <FiStar />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#082233' }}>Reviews</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{reviews.length} Verified</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('media_gallery')}
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 10px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <FiVideo />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#082233' }}>Media</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{mediaItems.length} Videos</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('careers')}
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 10px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <FiBriefcase />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#082233' }}>Careers</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{jobs.length} Openings</div>
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '16px', background: '#fff7ed', padding: '10px 14px', borderRadius: '10px', border: '1px solid #fdba74', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#ea580c', fontWeight: 700 }}>
                  <span>Live Website Status: Active</span>
                  <a href="/" target="_blank" rel="noreferrer" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Open Live Site <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT WORKSPACE */}
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

            {/* Add Showcase Card Form */}
            <div className="dash-form-wrapper" style={{ marginBottom: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#082233', fontWeight: 700 }}>Add New 3D Showcase Card</h4>
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

                <div className="dash-field-group full-width">
                  <label className="dash-label">Upload Showcase Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setNewShowcaseCard, newShowcaseCard)}
                  />
                  {newShowcaseCard.image && (
                    <img src={newShowcaseCard.image} alt="Preview" style={{ marginTop: '10px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                  )}
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
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#082233', fontWeight: 700 }}>
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
                        <strong style={{ fontSize: '0.92rem', color: '#082233', display: 'block' }}>{card.title}</strong>
                        <span className="category-badge-pill" style={{ marginTop: '4px' }}>{card.tag}</span>
                      </td>
                      <td style={{ color: '#ea580c', fontWeight: 600, fontSize: '0.84rem' }}>{card.subtitle}</td>
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
                    <td><strong style={{ fontSize: '0.95rem', color: '#082233' }}>{p.title}</strong></td>
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

        {/* TAB 3: TEAM ROSTER WORKSPACE (ADD & DELETE ONLY - NO UI EDITING) */}
        {activeTab === 'team' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ marginBottom: '16px' }}>
              <div>
                <h3 className="chart-title">Engineering & Creative Team Management</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0' }}>
                  Add new personnel to the company roster and manage active team member records.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* SECTION 1: ADD TEAM MEMBER FORM */}
            <div className="dash-form-wrapper" style={{ marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#082233', fontWeight: 700 }}>Add New Team Member</h4>
              <form onSubmit={handleAddTeamSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Member Full Name</label>
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
                  <label className="dash-label">Role / Position Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Full Stack AI Developer"
                    className="dash-input-styled"
                    value={newTeam.role}
                    onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Position Tier</label>
                  <select
                    className="dash-input-styled"
                    value={newTeam.category}
                    onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })}
                  >
                    <option value="Team Member">Team Member (Engineering / Creative)</option>
                    <option value="Leadership">Leadership (Founder & CEO)</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Profile Photo (Optional)</label>
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
                    <FiPlus /> Add Member to Roster
                  </button>
                </div>
              </form>
            </div>

            {/* SECTION 2: ACTIVE TEAM ROSTERS */}
            {(() => {
              const leadershipList = (team || []).filter(m =>
                m.category === 'Leadership' ||
                m.role?.toLowerCase().includes('founder') ||
                m.role?.toLowerCase().includes('ceo')
              );
              const teamList = (team || []).filter(m => !leadershipList.some(l => l.id === m.id));

              return (
                <>
                  {leadershipList.length > 0 && (
                    <>
                      <div className="chart-header-row" style={{ marginTop: '24px' }}>
                        <h3 className="chart-title" style={{ color: '#ea580c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          ★ Executive Leadership ({leadershipList.length})
                        </h3>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px' }}>
                        {leadershipList.map((m, idx) => (
                          <div key={m.id || idx} style={{
                            background: '#fff7ed',
                            padding: '20px',
                            borderRadius: '20px',
                            border: '2px solid #ff6b00',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#082233', textAlign: 'center', width: '100%' }}>{m.name}</h4>
                            <p style={{ margin: '0 0 14px', fontSize: '0.82rem', color: '#ea580c', fontWeight: 700, textAlign: 'center', width: '100%' }}>{m.role}</p>

                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button className="chart-dropdown-pill" title="Move Up" onClick={() => moveTeamMemberUp(m.id)} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>
                                <FiArrowUp />
                              </button>
                              <button className="chart-dropdown-pill" title="Move Down" onClick={() => moveTeamMemberDown(m.id)} disabled={idx === leadershipList.length - 1} style={{ opacity: idx === leadershipList.length - 1 ? 0.4 : 1, cursor: idx === leadershipList.length - 1 ? 'not-allowed' : 'pointer' }}>
                                <FiArrowDown />
                              </button>
                              <button className="promo-mint-btn" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }} onClick={() => deleteTeamMember(m.id)}>
                                <FiTrash2 /> Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="chart-header-row" style={{ marginTop: '36px', borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
                    <h3 className="chart-title">Engineering & Creative Team Roster ({teamList.length})</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px' }}>
                    {teamList.map((m, idx) => (
                      <div key={m.id || idx} style={{
                        background: '#f8fafc',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#082233', textAlign: 'center', width: '100%' }}>{m.name}</h4>
                        <p style={{ margin: '0 0 14px', fontSize: '0.82rem', color: '#ff6b00', fontWeight: 700, textAlign: 'center', width: '100%' }}>{m.role}</p>

                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                          <button className="chart-dropdown-pill" title="Move Up" onClick={() => moveTeamMemberUp(m.id)} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>
                            <FiArrowUp />
                          </button>
                          <button className="chart-dropdown-pill" title="Move Down" onClick={() => moveTeamMemberDown(m.id)} disabled={idx === teamList.length - 1} style={{ opacity: idx === teamList.length - 1 ? 0.4 : 1, cursor: idx === teamList.length - 1 ? 'not-allowed' : 'pointer' }}>
                            <FiArrowDown />
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

        {/* TAB 4: CLIENT INQUIRIES & COMMUNICATION INBOX (REPLY BY EMAIL ONLY) */}
        {activeTab === 'contact' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="chart-title">Customer Inquiries & Communication Inbox</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0' }}>
                  Review incoming website contact inquiries, read project details, and reply directly via email.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* INQUIRIES STATS & FILTERS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', background: '#f8fafc', padding: '16px 20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className={`pos-toggle-btn ${inquiryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setInquiryFilter('all')}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  All Inquiries ({inquiries.length})
                </button>
                <button
                  className={`pos-toggle-btn ${inquiryFilter === 'New' ? 'active' : ''}`}
                  onClick={() => setInquiryFilter('New')}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  ⚡ New ({inquiries.filter(i => i.status === 'New').length})
                </button>
                <button
                  className={`pos-toggle-btn ${inquiryFilter === 'Replied' ? 'active' : ''}`}
                  onClick={() => setInquiryFilter('Replied')}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  ✓ Replied ({inquiries.filter(i => i.status === 'Replied').length})
                </button>
              </div>

              <div style={{ position: 'relative', width: '280px' }}>
                <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="dash-input-styled"
                  placeholder="Search sender, email, subject..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  style={{ paddingLeft: '36px', height: '38px', fontSize: '0.82rem', margin: 0 }}
                />
              </div>
            </div>

            {/* INQUIRIES LIST CARDS */}
            {(() => {
              const filtered = inquiries.filter(i => {
                const matchesFilter = inquiryFilter === 'all' || i.status === inquiryFilter;
                const query = inquirySearch.toLowerCase();
                const matchesSearch = !query ||
                  (i.name && i.name.toLowerCase().includes(query)) ||
                  (i.email && i.email.toLowerCase().includes(query)) ||
                  (i.subject && i.subject.toLowerCase().includes(query)) ||
                  (i.company && i.company.toLowerCase().includes(query));
                return matchesFilter && matchesSearch;
              });

              if (filtered.length === 0) {
                return (
                  <div className="dash-form-wrapper" style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.6rem' }}>
                      <FiMail />
                    </div>
                    <h4 style={{ margin: '0 0 6px', color: '#082233', fontSize: '1.1rem', fontWeight: 800 }}>No Customer Inquiries Yet</h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>When visitors submit project requests via the website contact form, they will be listed here automatically.</p>
                  </div>
                );
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filtered.map((inq) => (
                    <div
                      key={inq.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        padding: '24px',
                        border: inq.status === 'New' ? '2px solid #fdba74' : '1px solid #e2e8f0',
                        boxShadow: inq.status === 'New' ? '0 6px 20px rgba(255, 107, 0, 0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* INQUIRY HEADER */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#082233', fontWeight: 800 }}>{inq.name}</h4>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '2px 10px',
                              borderRadius: '12px',
                              background: inq.status === 'New' ? '#fff7ed' : '#f1f5f9',
                              color: inq.status === 'New' ? '#ea580c' : '#082233',
                              border: inq.status === 'New' ? '1px solid #fdba74' : '1px solid #cbd5e1'
                            }}>
                              {inq.status === 'New' ? '● NEW INQUIRY' : '✓ REPLIED'}
                            </span>
                          </div>
                          {inq.company && inq.company !== 'N/A' && (
                            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px', fontWeight: 600 }}>
                              🏢 {inq.company}
                            </div>
                          )}
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiClock /> {inq.date || 'Recent'}
                        </div>
                      </div>

                      {/* INQUIRY CONTACT INFO CHIPS */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem', color: '#082233', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #e2e8f0' }}>
                          <FiMail style={{ color: '#ea580c' }} />
                          <a href={`mailto:${inq.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{inq.email}</a>
                        </div>
                        {inq.phone && inq.phone !== 'N/A' && (
                          <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem', color: '#082233', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #e2e8f0' }}>
                            <FiPhone style={{ color: '#ff6b00' }} />
                            <span>{inq.phone}</span>
                          </div>
                        )}
                        <div style={{ background: '#fff7ed', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem', color: '#ea580c', fontWeight: 800, border: '1px solid #fdba74' }}>
                          🏷️ {inq.subject || 'General Inquiry'}
                        </div>
                      </div>

                      {/* INQUIRY MESSAGE TEXT */}
                      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, marginBottom: '6px' }}>
                          Message Content
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#082233', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                          {inq.message}
                        </p>
                      </div>

                      {/* ACTIONS ROW */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="action-pill-btn primary-pill"
                            style={{ background: 'linear-gradient(135deg, #ff6b00, #ea580c)', color: '#ffffff', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            onClick={() => handleSendEmailReply(inq)}
                            title={`Send direct email reply to ${inq.email}`}
                          >
                            <FiMail /> Reply by Email
                          </button>

                          <button
                            className="chart-dropdown-pill"
                            onClick={() => {
                              setReplyModalInq(inq);
                              setQuickReplyBody(`Hi ${inq.name},\n\nThank you for reaching out regarding "${inq.subject}". We would be happy to schedule a call to discuss your project requirements in detail.\n\nWhen would be a convenient time for you this week?`);
                            }}
                            title="Compose customized message before sending"
                          >
                            <FiEdit2 /> Custom Reply
                          </button>
                        </div>

                        <button
                          className="promo-mint-btn"
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer' }}
                          onClick={() => {
                            if (window.confirm(`Delete inquiry from ${inq.name}?`)) {
                              deleteInquiry(inq.id);
                              triggerNotification('Inquiry record removed.');
                            }
                          }}
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* READ-ONLY LIVE CHANNELS REFERENCE */}
            <div className="dash-form-wrapper" style={{ marginTop: '30px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#082233', fontWeight: 800 }}>Current Live Website Contact Details (Read-Only)</h4>
                <span style={{ fontSize: '0.72rem', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
                  Managed by Super Admin
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.82rem' }}>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700 }}>TARGET NOTIFICATION EMAIL</div>
                  <div style={{ color: '#082233', fontWeight: 700, marginTop: '2px' }}>{contact.email || 'innoveitytech@gmail.com'}</div>
                </div>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700 }}>HOTLINE PHONE NUMBER</div>
                  <div style={{ color: '#082233', fontWeight: 700, marginTop: '2px' }}>{contact.phone || '+91 0908765432'}</div>
                </div>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700 }}>OFFICE LOCATION</div>
                  <div style={{ color: '#082233', fontWeight: 700, marginTop: '2px' }}>{contact.address || 'Chennai, Tamil Nadu, India'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: USER DATABASE & ACCESS DIRECTORY */}
        {activeTab === 'users' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ alignItems: 'center' }}>
              <div>
                <h3 className="chart-title" style={{ margin: 0 }}>User Database & Access Directory</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  View real system administrator accounts and manage access privileges.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="action-pill-btn primary-pill"
                  style={{ background: '#082233', color: '#ffffff', border: 'none', fontWeight: 800 }}
                  onClick={() => setShowAddAdminForm(!showAddAdminForm)}
                >
                  <FiPlus /> {showAddAdminForm ? 'Close Form' : 'Add Admin Account'}
                </button>
                <button className="action-pill-btn" onClick={() => setActiveTab('overview')}>
                  Back to Overview
                </button>
              </div>
            </div>

            {showAddAdminForm && (
              <div className="dash-form-wrapper" style={{ marginTop: '20px', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1rem', fontWeight: 800 }}>Create New Administrator Account</h4>
                <form onSubmit={handleAddAdminSubmit} className="dash-form-grid">
                  <div className="dash-field-group">
                    <label className="dash-label">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Nancy Thomas"
                      className="dash-input-styled"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="dash-field-group">
                    <label className="dash-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. nancy@innoveitytech.com"
                      className="dash-input-styled"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="dash-field-group">
                    <label className="dash-label">Account Password</label>
                    <input
                      type="text"
                      placeholder="Password (default: admin123)"
                      className="dash-input-styled"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="dash-field-group">
                    <label className="dash-label">User Role</label>
                    <select
                      className="dash-input-styled"
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  <div className="dash-field-group full-width" style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" className="action-pill-btn primary-pill" style={{ background: '#ff6b00', border: 'none' }}>
                      <FiCheck /> Save Account
                    </button>
                    <button type="button" className="action-pill-btn" onClick={() => setShowAddAdminForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <table className="dash-cms-table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{u.password || 'admin123'}</code></td>
                    <td><span className="category-badge-pill">{u.role}</span></td>
                    <td><span className="action-pill-btn" style={{ background: '#fff7ed', color: '#ea580c', borderColor: '#fdba74' }}>{u.status}</span></td>
                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: CLIENT TESTIMONIALS & REVIEWS */}
        {activeTab === 'testimonials' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ alignItems: 'center' }}>
              <div>
                <h3 className="chart-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiStar style={{ color: '#ff6b00' }} /> Client Testimonials & Reviews
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Manage verified customer quotes, star ratings, and feedback displayed across the website.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* Add Testimonial Form */}
            <div className="dash-form-wrapper" style={{ marginTop: '20px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1rem', fontWeight: 800 }}>
                + Add Client Review
              </h4>
              <form onSubmit={handleAddTestimonialSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    className="dash-input-styled"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Technology Officer"
                    className="dash-input-styled"
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Aura Health Platforms"
                    className="dash-input-styled"
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Star Rating</label>
                  <select
                    className="dash-input-styled"
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (Great)</option>
                    <option value={3}>⭐⭐⭐ 3 Stars (Good)</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Client Feedback Quote</label>
                  <textarea
                    placeholder="Write client testimonial statement..."
                    className="dash-input-styled"
                    style={{ height: '80px' }}
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Upload Client Avatar Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setNewTestimonial, newTestimonial)}
                  />
                  {newTestimonial.avatar && (
                    <img src={newTestimonial.avatar} alt="Preview" style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Save Testimonial
                  </button>
                </div>
              </form>
            </div>

            {/* Testimonials List */}
            <div className="chart-header-row" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#082233', fontWeight: 700 }}>
                Active Client Reviews ({reviews.length})
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginTop: '14px' }}>
              {reviews.map((t) => (
                <div key={t.id} style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={t.avatar || '/Sarah.jpeg'} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff6b00' }} />
                      <div>
                        <strong style={{ color: '#082233', fontSize: '0.95rem', display: 'block' }}>{t.name}</strong>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.role} • {t.company}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.85rem' }}>{'⭐'.repeat(t.rating || 5)}</span>
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.86rem', lineHeight: '1.5', margin: '0 0 16px', fontStyle: 'italic' }}>
                    "{t.content}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="promo-mint-btn"
                      style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                      onClick={() => {
                        if (window.confirm(`Delete review from ${t.name}?`)) {
                          deleteTestimonial(t.id);
                          triggerNotification('Testimonial removed.');
                        }
                      }}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MEDIA CAPABILITIES & VIDEO GALLERY */}
        {activeTab === 'media_gallery' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ alignItems: 'center' }}>
              <div>
                <h3 className="chart-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiVideo style={{ color: '#ff6b00' }} /> Media Capabilities & Video Showcase
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Manage video commercial showcases, showreels, and media capabilities assets for the website.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* Add Media Form */}
            <div className="dash-form-wrapper" style={{ marginTop: '20px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1rem', fontWeight: 800 }}>
                + Add Video Showcase
              </h4>
              <form onSubmit={handleAddMediaSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Video Showcase Title</label>
                  <input
                    type="text"
                    placeholder="e.g. 3D Kinetic Brand Commercial Reel"
                    className="dash-input-styled"
                    value={newMedia.title}
                    onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Category Tag</label>
                  <select
                    className="dash-input-styled"
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                  >
                    <option value="Brand Commercial">Brand Commercial</option>
                    <option value="3D Animation">3D Animation</option>
                    <option value="Tech Showcase">Tech Showcase</option>
                    <option value="Corporate Film">Corporate Film</option>
                  </select>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Video URL (YouTube, Vimeo, or MP4)</label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="dash-input-styled"
                    value={newMedia.videoUrl}
                    onChange={(e) => setNewMedia({ ...newMedia, videoUrl: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Description / Summary</label>
                  <textarea
                    placeholder="Brief description of the media asset..."
                    className="dash-input-styled"
                    style={{ height: '70px' }}
                    value={newMedia.description}
                    onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Upload Video Thumbnail Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setNewMedia, newMedia)}
                  />
                  {newMedia.thumbnail && (
                    <img src={newMedia.thumbnail} alt="Preview" style={{ marginTop: '10px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                  )}
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Add Video Item
                  </button>
                </div>
              </form>
            </div>

            {/* Media Items Table */}
            <div className="chart-header-row" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#082233', fontWeight: 700 }}>
                Active Media Showcase Items ({mediaItems.length})
              </h4>
            </div>

            <table className="dash-cms-table" style={{ marginTop: '12px' }}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Thumbnail</th>
                  <th>Title & Category</th>
                  <th>Description</th>
                  <th>Video Link</th>
                  <th style={{ width: '120px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {mediaItems.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <img src={m.thumbnail || '/media_showcase_1.jpg'} alt={m.title} style={{ width: '60px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    </td>
                    <td>
                      <strong style={{ color: '#082233', display: 'block', fontSize: '0.92rem' }}>{m.title}</strong>
                      <span className="category-badge-pill" style={{ marginTop: '4px' }}>{m.category}</span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.84rem' }}>{m.description}</td>
                    <td>
                      {m.videoUrl ? (
                        <a href={m.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#ff6b00', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 700 }}>
                          <FiExternalLink /> Watch Video
                        </a>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>No URL</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="promo-mint-btn"
                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                        onClick={() => {
                          if (window.confirm(`Delete media item "${m.title}"?`)) {
                            deleteMediaItem(m.id);
                            triggerNotification('Media item removed.');
                          }
                        }}
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 8: CAREERS & JOB OPENINGS */}
        {activeTab === 'careers' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ alignItems: 'center' }}>
              <div>
                <h3 className="chart-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiBriefcase style={{ color: '#ff6b00' }} /> Careers & Job Openings Management
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Post open technical & design positions, manage hiring statuses, and candidate criteria.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* MASTER TOGGLE FOR LIVE WEBSITE HIRING NOTIFICATION BANNER */}
            <div style={{
              background: hiringAlertEnabled ? '#fff7ed' : '#f8fafc',
              border: hiringAlertEnabled ? '2px solid #ff6b00' : '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: hiringAlertEnabled ? '0 6px 20px rgba(255, 107, 0, 0.12)' : 'none',
              transition: 'all 0.3s ease',
              marginTop: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: hiringAlertEnabled ? '#ff6b00' : '#e2e8f0',
                  color: hiringAlertEnabled ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0
                }}>
                  <FiBriefcase />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#082233', fontWeight: 800 }}>
                      Live Website Hiring Alert Banner
                    </h4>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 10px',
                      borderRadius: '12px',
                      background: hiringAlertEnabled ? '#ea580c' : '#94a3b8',
                      color: '#ffffff',
                      textTransform: 'uppercase'
                    }}>
                      {hiringAlertEnabled ? '🟢 Visible on Home Page' : '⚪ Hidden'}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                    {hiringAlertEnabled
                      ? 'Hiring alert pill is currently LIVE on the Home Page, notifying visitors of open career positions.'
                      : 'Hiring alert pill is hidden from the Home Page. Enable it anytime when you are actively recruiting.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  if (toggleHiringAlert) {
                    const active = await toggleHiringAlert();
                    triggerNotification(active ? '🟢 Hiring Alert enabled on Home Page!' : '⚪ Hiring Alert hidden from Home Page.');
                  }
                }}
                style={{
                  background: hiringAlertEnabled ? 'linear-gradient(135deg, #ff6b00, #ea580c)' : '#082233',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '10px 22px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  transition: 'all 0.2s ease'
                }}
              >
                {hiringAlertEnabled ? 'Turn OFF Home Alert' : 'Turn ON Home Alert'}
              </button>
            </div>

            {/* Post Job Form */}
            <div className="dash-form-wrapper" style={{ marginTop: '20px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1rem', fontWeight: 800 }}>
                + Post New Job Opening
              </h4>
              <form onSubmit={handleAddCareerSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Full Stack AI Engineer"
                    className="dash-input-styled"
                    value={newCareer.title}
                    onChange={(e) => setNewCareer({ ...newCareer, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Department</label>
                  <select
                    className="dash-input-styled"
                    value={newCareer.department}
                    onChange={(e) => setNewCareer({ ...newCareer, department: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Creative & Design">Creative & Design</option>
                    <option value="AI & Research">AI & Research</option>
                    <option value="Product Strategy">Product Strategy</option>
                  </select>
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote / Chennai"
                    className="dash-input-styled"
                    value={newCareer.location}
                    onChange={(e) => setNewCareer({ ...newCareer, location: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Employment Type & Experience</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <select
                      className="dash-input-styled"
                      value={newCareer.type}
                      onChange={(e) => setNewCareer({ ...newCareer, type: e.target.value })}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <input
                      type="text"
                      placeholder="e.g. 2+ Years"
                      className="dash-input-styled"
                      value={newCareer.experience}
                      onChange={(e) => setNewCareer({ ...newCareer, experience: e.target.value })}
                    />
                  </div>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Job Description & Responsibilities</label>
                  <textarea
                    placeholder="Describe role expectations, requirements and deliverables..."
                    className="dash-input-styled"
                    style={{ height: '80px' }}
                    value={newCareer.description}
                    onChange={(e) => setNewCareer({ ...newCareer, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Post Job Opening
                  </button>
                </div>
              </form>
            </div>

            {/* Careers List */}
            <div className="chart-header-row" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#082233', fontWeight: 700 }}>
                Active Job Openings ({jobs.length})
              </h4>
            </div>

            <table className="dash-cms-table" style={{ marginTop: '12px' }}>
              <thead>
                <tr>
                  <th>Job Title & Dept</th>
                  <th>Location</th>
                  <th>Type & Experience</th>
                  <th>Status</th>
                  <th style={{ width: '180px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id}>
                    <td>
                      <strong style={{ color: '#082233', display: 'block', fontSize: '0.94rem' }}>{j.title}</strong>
                      <span className="category-badge-pill" style={{ marginTop: '4px' }}>{j.department}</span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.85rem' }}>{j.location}</td>
                    <td style={{ color: '#475569', fontSize: '0.85rem' }}>{j.type} • {j.experience}</td>
                    <td>
                      <button
                        onClick={() => toggleCareerStatus(j.id)}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '12px',
                          padding: '4px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          background: j.status === 'Active' ? '#fff7ed' : '#f1f5f9',
                          color: j.status === 'Active' ? '#ea580c' : '#64748b',
                          border: j.status === 'Active' ? '1px solid #fdba74' : '1px solid #cbd5e1'
                        }}
                      >
                        {j.status === 'Active' ? '● HIRING ACTIVE' : '✕ CLOSED'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="chart-dropdown-pill"
                          onClick={() => toggleCareerStatus(j.id)}
                        >
                          Toggle Status
                        </button>
                        <button
                          className="promo-mint-btn"
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                          onClick={() => {
                            if (window.confirm(`Delete position "${j.title}"?`)) {
                              deleteCareer(j.id);
                              triggerNotification('Career opening removed.');
                            }
                          }}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 9: TECH BLOG & ARTICLES */}
        {activeTab === 'blog' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ alignItems: 'center' }}>
              <div>
                <h3 className="chart-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiBookOpen style={{ color: '#ff6b00' }} /> Tech Blog & Engineering Articles
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Draft, publish, and manage engineering insights and company technology articles.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* Add Article Form */}
            <div className="dash-form-wrapper" style={{ marginTop: '20px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1rem', fontWeight: 800 }}>
                + Publish New Tech Article
              </h4>
              <form onSubmit={handleAddBlogSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Article Headline / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Distributed Vector Search & Real-Time AI Pipelines"
                    className="dash-input-styled"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Category</label>
                  <select
                    className="dash-input-styled"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  >
                    <option value="AI & Cloud">AI & Cloud</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="System Design">System Design</option>
                    <option value="Product Strategy">Product Strategy</option>
                  </select>
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Author Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nancy Thomas"
                    className="dash-input-styled"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Estimated Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    className="dash-input-styled"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Article Summary / Excerpt</label>
                  <textarea
                    placeholder="Write article synopsis and key technical highlights..."
                    className="dash-input-styled"
                    style={{ height: '80px' }}
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Upload Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="dash-input-styled"
                    onChange={(e) => handleImageUpload(e, setNewBlog, newBlog)}
                  />
                  {newBlog.coverImage && (
                    <img src={newBlog.coverImage} alt="Preview" style={{ marginTop: '10px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                  )}
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Publish Article
                  </button>
                </div>
              </form>
            </div>

            {/* Blog Articles Table */}
            <div className="chart-header-row" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#082233', fontWeight: 700 }}>
                Published Articles ({articles.length})
              </h4>
            </div>

            <table className="dash-cms-table" style={{ marginTop: '12px' }}>
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Cover</th>
                  <th>Article Title & Category</th>
                  <th>Author & Date</th>
                  <th>Read Time</th>
                  <th style={{ width: '120px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <img src={b.coverImage || '/tech_blog_1.png'} alt={b.title} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                    </td>
                    <td>
                      <strong style={{ color: '#082233', display: 'block', fontSize: '0.92rem' }}>{b.title}</strong>
                      <span className="category-badge-pill" style={{ marginTop: '4px' }}>{b.category}</span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.85rem' }}>{b.author} • {b.date}</td>
                    <td style={{ color: '#ea580c', fontWeight: 600, fontSize: '0.82rem' }}>{b.readTime}</td>
                    <td>
                      <button
                        className="promo-mint-btn"
                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                        onClick={() => {
                          if (window.confirm(`Delete article "${b.title}"?`)) {
                            deleteBlogPost(b.id);
                            triggerNotification('Article removed.');
                          }
                        }}
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 10: SERVICES & OFFERINGS */}
        {activeTab === 'services' && (
          <div className="dash-cms-section" style={{ marginTop: 0 }}>
            <div className="chart-header-row" style={{ alignItems: 'center' }}>
              <div>
                <h3 className="chart-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiBox style={{ color: '#ff6b00' }} /> Services & Solution Packages
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Manage technology services, capabilities, and deliverable highlights for prospective clients.
                </p>
              </div>
              <button className="action-pill-btn primary-pill" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </button>
            </div>

            {/* Add Service Form */}
            <div className="dash-form-wrapper" style={{ marginTop: '20px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 16px', color: '#082233', fontSize: '1rem', fontWeight: 800 }}>
                + Add Solution Service Package
              </h4>
              <form onSubmit={handleAddServiceSubmit} className="dash-form-grid">
                <div className="dash-field-group">
                  <label className="dash-label">Service Package Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise AI & Machine Learning"
                    className="dash-input-styled"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    required
                  />
                </div>

                <div className="dash-field-group">
                  <label className="dash-label">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. AI & Cloud Architecture"
                    className="dash-input-styled"
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Value Proposition / Tagline</label>
                  <textarea
                    placeholder="Brief description of the service value to enterprise clients..."
                    className="dash-input-styled"
                    style={{ height: '70px' }}
                    value={newService.tagline}
                    onChange={(e) => setNewService({ ...newService, tagline: e.target.value })}
                  ></textarea>
                </div>

                <div className="dash-field-group full-width">
                  <label className="dash-label">Key Deliverables (Comma-Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Custom Neural Models, RAG Vector Indexing, Low Latency APIs"
                    className="dash-input-styled"
                    value={newService.deliverables}
                    onChange={(e) => setNewService({ ...newService, deliverables: e.target.value })}
                  />
                </div>

                <div className="dash-field-group full-width">
                  <button type="submit" className="action-pill-btn primary-pill" style={{ width: 'fit-content' }}>
                    <FiPlus /> Save Service Package
                  </button>
                </div>
              </form>
            </div>

            {/* Services Grid */}
            <div className="chart-header-row" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#082233', fontWeight: 700 }}>
                Active Service Packages ({services.length})
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginTop: '14px' }}>
              {services.map((s) => (
                <div key={s.id} style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="category-badge-pill" style={{ marginBottom: '8px', display: 'inline-block' }}>{s.category}</span>
                    <h4 style={{ margin: '0 0 8px', color: '#082233', fontSize: '1.05rem', fontWeight: 800 }}>{s.title}</h4>
                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 14px' }}>{s.tagline}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {(s.deliverables || []).map((del, idx) => (
                        <span key={idx} style={{ background: '#fff7ed', color: '#ea580c', fontSize: '0.74rem', padding: '3px 8px', borderRadius: '8px', fontWeight: 700, border: '1px solid #fdba74' }}>
                          ✓ {del}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <button
                      className="promo-mint-btn"
                      style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                      onClick={() => {
                        if (window.confirm(`Delete service "${s.title}"?`)) {
                          deleteServiceItem(s.id);
                          triggerNotification('Service package removed.');
                        }
                      }}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
