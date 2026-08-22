import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';
import './Navbar.css';

export const InnoveityBrandLogo = ({ size = 28, showText = true, subTextOverride }) => {
  const cms = useCMS ? useCMS() : null;
  const brandSub = subTextOverride || cms?.headerFooterSettings?.brandSubTitle || 'TECH SOLUTIONS';
  const subFontSize = `${Math.max(0.42, size * 0.0165)}rem`;
  const subPadding = `${Math.max(18, size * 1.25)}px`;

  return (
    <div className="innoveity-brand-wrap" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
      <img
        src="/Innoveity.png"
        alt="Innoveity Tech Logo"
        style={{
          height: `${size}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/logo-transparent.png';
        }}
      />
      {showText && (
        <span className="innoveity-brand-sub-title" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: subFontSize,
          fontWeight: 800,
          letterSpacing: '2.2px',
          color: '#00a878',
          marginTop: '2px',
          paddingLeft: subPadding,
          textTransform: 'uppercase',
          lineHeight: 1
        }}>
          {brandSub}
        </span>
      )}
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
    { name: 'Media Division', to: '/media', isPage: true },
    { name: 'Our Team', to: '/team', isPage: true },
  ];

  const navLinks = headerFooterSettings?.navLinks || defaultNavLinks;
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
              <InnoveityBrandLogo size={38} showText={true} />
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="brand-link">
              <InnoveityBrandLogo size={38} showText={true} />
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
            <span>{contactBtnText}</span>
            <div className="arrow-circle">
              <FiArrowUpRight size={14} />
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
