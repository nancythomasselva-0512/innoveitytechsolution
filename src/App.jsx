import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';
import LoadingScreen from './components/UI/LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin');
  const hideGlobalFooter = location.pathname.startsWith('/about') || isAdminRoute;

  return (
    <div className="app-container">
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/super-admin" element={<SuperAdminPage />} />
        </Routes>
      </main>
      
      {!hideGlobalFooter && <Footer />}
      <BackToTop />
    </div>
  );
}

export default App;
