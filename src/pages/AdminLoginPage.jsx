import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiMail, FiShield, FiUser, FiArrowRight, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useCMS } from '../context/CMSContext';
import { InnoveityBrandLogo } from '../components/Navbar/Navbar';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginAdmin, currentUser } = useCMS();

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'Super Admin') {
        navigate('/super-admin', { replace: true });
      } else {
        navigate('/admin', { replace: true });
      }
    }
  }, [currentUser, navigate]);

  const [roleMode, setRoleMode] = useState('Super Admin'); // 'Super Admin' | 'Admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, password, roleMode);
      setLoading(false);

      if (result.success) {
        setSuccessMsg(`Welcome back, ${result.user.name}! Redirecting to dashboard...`);
        setTimeout(() => {
          if (result.user.role === 'Super Admin') {
            navigate('/super-admin');
          } else {
            navigate('/admin');
          }
        }, 1200);
      } else {
        setErrorMsg(result.message);
      }
    }, 600);
  };

  const handleQuickLogin = (demoEmail, demoPass, demoRole) => {
    setRoleMode(demoRole);
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const result = loginAdmin(demoEmail, demoPass, demoRole);
      setLoading(false);
      if (result.success) {
        setSuccessMsg(`Authorized as ${result.user.name}! Accessing portal...`);
        setTimeout(() => {
          if (result.user.role === 'Super Admin') {
            navigate('/super-admin');
          } else {
            navigate('/admin');
          }
        }, 1000);
      } else {
        setErrorMsg(result.message);
      }
    }, 500);
  };

  return (
    <div className="login-page-container">
      {/* Dynamic Ambient Floating Glow Spheres */}
      <div className="login-glow-sphere glow-1"></div>
      <div className="login-glow-sphere glow-2"></div>

      <div className="login-card-wrapper">
        {/* Header Branding */}
        <div className="login-brand-header">
          <Link to="/" className="login-brand-logo-link">
            <InnoveityBrandLogo size={52} darkBg={true} />
          </Link>
          <h2 className="login-title">Portal Authorization</h2>
          <p className="login-subtitle">Sign in to access your administrative control system</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="login-role-tabs">
          <button 
            type="button"
            className={`login-role-tab ${roleMode === 'Super Admin' ? 'active' : ''}`}
            onClick={() => { setRoleMode('Super Admin'); setErrorMsg(''); }}
          >
            <FiShield /> Super Admin
          </button>
          <button 
            type="button"
            className={`login-role-tab ${roleMode === 'Admin' ? 'active' : ''}`}
            onClick={() => { setRoleMode('Admin'); setErrorMsg(''); }}
          >
            <FiUser /> Admin Portal
          </button>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="login-alert login-alert-error">
            <FiAlertCircle /> <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="login-alert login-alert-success">
            <FiCheckCircle /> <span>{successMsg}</span>
          </div>
        )}

        {/* Main Login Form */}
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">Email Address</label>
            <div className="login-input-wrapper">
              <FiMail className="login-input-icon" />
              <input 
                type="email" 
                placeholder="innoveitytech@gmail.com"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-input-group">
            <label className="login-label">Account Password</label>
            <div className="login-input-wrapper">
              <FiLock className="login-input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Log In as {roleMode}</span> <FiArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="login-footer">
          <Link to="/" className="login-back-link">
            &larr; Return to Innoveity Tech Solution Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
