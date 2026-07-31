import React, { useEffect, useState } from 'react';
import { 
  FiHome, FiUsers, FiSettings, FiShield, 
  FiDatabase, FiBell, FiSearch, FiServer,
  FiLogOut, FiMenu, FiX 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './AdminPage.css'; // Reusing the same CSS for consistent layout

const SuperAdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="admin-logo">Inno<span>Super</span></h2>
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            <FiX />
          </button>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #b794f4, #6b46c1)' }}>SA</div>
          <div className="user-info">
            <h4>System Owner</h4>
            <p>Super Administrator</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a href="#overview"><FiHome /> Overview</a></li>
            <li><a href="#users"><FiUsers /> User Management</a></li>
            <li><a href="#database"><FiDatabase /> Database</a></li>
            <li><a href="#security"><FiShield /> Security Logs</a></li>
            <li><a href="#settings"><FiSettings /> System Settings</a></li>
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
              <input type="text" placeholder="Search logs, users, or settings..." />
            </div>
          </div>
          
          <div className="header-right">
            <button className="notification-btn">
              <FiBell />
              <span className="badge" style={{ background: '#b794f4' }}>5</span>
            </button>
            <div className="profile-btn">
              <div className="avatar-small" style={{ background: 'linear-gradient(135deg, #b794f4, #6b46c1)' }}>SA</div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="admin-content-area">
          <div className="page-header">
            <h1>Super Admin Control Panel</h1>
            <p>Complete overview and control of the Innoveity Tech systems.</p>
          </div>

          {/* Metric Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon system"><FiServer /></div>
              <div className="metric-details">
                <h3>System Health</h3>
                <h2>99.9%</h2>
                <p className="positive">All services operational</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon users"><FiUsers /></div>
              <div className="metric-details">
                <h3>Total Accounts</h3>
                <h2>1,245</h2>
                <p className="positive">+12 this week</p>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon security"><FiShield /></div>
              <div className="metric-details">
                <h3>Security Alerts</h3>
                <h2>0</h2>
                <p className="positive">No active threats</p>
              </div>
            </div>
          </div>

          {/* User Role Management Table */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <h3>User Role Management</h3>
              <button className="btn-outline">Add Admin User</button>
            </div>
            
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Last Login</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>john.d@innoveity.com</td>
                    <td><span className="status-badge active">Super Admin</span></td>
                    <td>Just now</td>
                    <td><button className="btn-text">Manage</button></td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>jane.s@innoveity.com</td>
                    <td><span className="status-badge admin">Admin</span></td>
                    <td>2 hours ago</td>
                    <td>
                      <button className="btn-text" style={{ marginRight: '10px' }}>Manage</button>
                      <button className="btn-text danger">Revoke</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Mark Wilson</td>
                    <td>mark.w@client.com</td>
                    <td><span className="status-badge user">User</span></td>
                    <td>Yesterday, 11:20 AM</td>
                    <td><button className="btn-text">Manage</button></td>
                  </tr>
                  <tr>
                    <td>Sarah Jones</td>
                    <td>sarah.j@client.com</td>
                    <td><span className="status-badge user">User</span></td>
                    <td>Jul 25, 2026</td>
                    <td><button className="btn-text">Manage</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPage;
