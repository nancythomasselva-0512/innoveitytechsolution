import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import './Navbar.css';

export const InnoveityBrandLogo = ({ size = 36, showText = true }) => (
  <div className="innoveity-brand-wrap">
    <div className="innoveity-logo-icon-box">
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        {/* Gold Dot for 'i' */}
        <rect x="4" y="6" width="5.5" height="5.5" fill="#f59e0b" rx="1.5" />
        {/* Outer V Line */}
        <path d="M5 16L20 37L37 16" stroke="#00a878" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
        {/* Inner V Line */}
        <path d="M12 16L20 27L29 16" stroke="#00a878" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" />
        {/* Top Right Bar */}
        <path d="M29 16H39" stroke="#00a878" strokeWidth="4.5" strokeLinecap="square" />
      </svg>
    </div>

    {showText && (
      <div className="innoveity-brand-text-col">
        <div className="innoveity-brand-main-title">
          <span className="brand-green">INNO</span>
          <span className="brand-v-container">
            <span className="v-gold-badge"></span>
            <span className="brand-green">V</span>
          </span>
          <span className="brand-green">EITY</span>
        </div>
        <span className="innoveity-brand-sub-title">TECH SOLUTIONS</span>
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home', isPage: false },
    { name: 'About Us', to: '/about', isPage: true },
    { name: 'Projects', to: '/projects', isPage: true },
    { name: 'Services', to: '/services', isPage: true },
    { name: 'Our Team', to: '/team', isPage: true },
    { name: 'Contact Us', to: '/contact', isPage: true },
  ];

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    
    if (link.isPage) {
      navigate(link.to);
    } else if (!isHome) {
      if (link.to === 'home') {
        navigate('/');
      } else {
        navigate('/#' + link.to);
        setTimeout(() => {
          const element = document.getElementById(link.to);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/contact');
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="navbar-wrapper container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          {isHome ? (
            <ScrollLink to="home" smooth={true} duration={500} className="brand-link">
              <InnoveityBrandLogo size={36} showText={true} />
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="brand-link">
              <InnoveityBrandLogo size={36} showText={true} />
            </RouterLink>
          )}
        </div>

        {/* Desktop Nav Links */}
        <ul className={`navbar-nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              {isHome && !link.isPage ? (
                <ScrollLink
                  activeClass="nav-link-active"
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="nav-link-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <a
                  className={`nav-link-item ${location.pathname === link.to ? 'nav-link-active' : ''}`}
                  onClick={() => handleNavClick(link)}
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right Action Button */}
        <div className="navbar-actions">
          <button className="pill-btn-contact" onClick={handleContactClick}>
            <span>CONTACT US</span>
            <div className="arrow-circle">
              <FiArrowUpRight size={18} />
            </div>
          </button>

          {/* Mobile Toggle Icon */}
          <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
