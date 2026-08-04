import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';
import LoadingScreen from './components/UI/LoadingScreen';
import SEOHead from './components/UI/SEOHead';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import { useCMS } from './context/CMSContext';
import './App.css';

const AdminRouteDispatcher = () => {
  const { currentUser } = useCMS();

  if (!currentUser) {
    return <AdminLoginPage />;
  }

  if (currentUser.role === 'Super Admin') {
    return <SuperAdminPage />;
  }

  return <AdminPage />;
};

const ProtectedSuperAdminRoute = ({ children }) => {
  const { currentUser } = useCMS();

  if (!currentUser || currentUser.role !== 'Super Admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin') || location.pathname === '/login';
  const hideGlobalFooter = location.pathname.startsWith('/about') || isAdminRoute;

  return (
    <div className="app-container">
      <SEOHead />
      <LoadingScreen />
      
      {/* Floating Background Elements - Hide on admin routes */}
      {!isAdminRoute && (
        <div className="floating-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      )}

      {!isAdminRoute && <Navbar />}
      
      <main className={isAdminRoute ? "admin-main-content" : "main-content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/login" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminRouteDispatcher />} />
          <Route 
            path="/super-admin" 
            element={
              <ProtectedSuperAdminRoute>
                <SuperAdminPage />
              </ProtectedSuperAdminRoute>
            } 
          />
        </Routes>
      </main>
      
      {!hideGlobalFooter && <Footer />}
      <BackToTop />
    </div>
  );
}

export default App;
