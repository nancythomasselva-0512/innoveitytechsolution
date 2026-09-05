import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';
import './Navbar.css';

export const InnoveityBrandLogo = ({ size = 50, showText = true, subTextOverride, darkBg = false }) => {
  const cms = useCMS ? useCMS() : null;
  const brandSub = subTextOverride || cms?.headerFooterSettings?.brandSubTitle || 'SMART TECHNOLOGY. CREATIVE SOLUTIONS.';
  const logoSrc = darkBg ? '/logo-light.png' : '/logo-transparent.png';

  return (
    <div className="innoveity-brand-wrap" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent' }}>
      <img
        src={logoSrc}
        alt="Innoveity Tech Solution"
        className="innoveity-main-logo-img"
        style={{
          height: `${size}px`,
          width: 'auto',
          maxWidth: '240px',
          objectFit: 'contain',
          display: 'block',
          filter: darkBg ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/logo-transparent.png';
        }}
      />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { headerFooterSettings } = useCMS();
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

  const defaultNavLinks = [
    { name: 'Home', to: 'home', isPage: false },
    { name: 'About Us', to: '/about', isPage: true },
    { name: 'Projects', to: '/projects', isPage: true },
    { name: 'Services', to: '/services', isPage: true },
    { name: 'Media Capabilities', to: '/media', isPage: true },
    { name: 'Our Team', to: '/team', isPage: true },
  ];

  const rawNavLinks = headerFooterSettings?.navLinks || defaultNavLinks;
  const navLinks = rawNavLinks.map(link => ({
    ...link,
    name: link.name === 'Media Division' ? 'Media Capabilities' : link.name
  }));
  const contactBtnText = headerFooterSettings?.contactBtnText || 'CONTACT US';

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
              <InnoveityBrandLogo size={50} darkBg={false} />
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="brand-link">
              <InnoveityBrandLogo size={50} darkBg={false} />
            </RouterLink>
          )}
        </div>

        {/* Center Floating Glass Pill Nav Bar */}
        <div className={`navbar-center-pill-wrap ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <ul className="navbar-nav-links-pill">
            {navLinks.map((link, index) => {
              const isActive = (isHome && link.to === 'home') || location.pathname === link.to;

              return (
                <li key={index} className="nav-pill-item">
                  {isHome && !link.isPage ? (
                    <ScrollLink
                      activeClass="nav-link-pill-active"
                      to={link.to}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className={`nav-link-pill-btn ${isActive ? 'nav-link-pill-active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </ScrollLink>
                  ) : (
                    <a
                      className={`nav-link-pill-btn ${isActive ? 'nav-link-pill-active' : ''}`}
                      onClick={() => handleNavClick(link)}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Action Button */}
        <div className="navbar-actions">
          <button className="pill-btn-login" onClick={handleContactClick}>
            <span>{contactBtnText}</span>
          </button>

          {/* Mobile Toggle Icon */}
          <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
