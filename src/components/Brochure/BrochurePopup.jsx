import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FiX,
  FiExternalLink,
  FiDownload,
  FiMaximize2,
  FiFileText,
  FiCheckCircle,
  FiStar
} from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';
import './BrochurePopup.css';

const BrochurePopup = () => {
  const { brochurePopup } = useCMS();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Read config safely with fallbacks tailored to the user's attached brochure
  const config = brochurePopup || {
    enabled: true,
    displayMode: 'floating_card',
    delaySeconds: 0.6,
    badge: 'INTERNSHIP CALL',
    title: 'Industry Immersion Programmes',
    subtitle: 'Gain real-world skills & work on live projects with industry experts.',
    brochureUrl: '/innoveity-brochure.jpeg',
    brochureFileName: 'innoveity-brochure.jpeg',
    googleFormUrl: 'https://forms.gle/G9tFYtJ53W9873wQ6',
    googleFormEmbedUrl: '',
    ctaText: 'Apply Now',
    directDownloadText: 'Download Brochure',
    showDirectDownload: true,
    coverImage: '/innoveity-brochure.jpeg',
    features: [
      'AI & Generative AI • Machine Learning',
      'FinTech, Analytics & Growth Strategy',
      '45 Days Live Training & Certification'
    ]
  };

  // Pop up on every refresh / open of the landing page
  useEffect(() => {
    // Only show on landing page
    if (location.pathname !== '/') {
      setIsOpen(false);
      return;
    }

    if (!config.enabled) {
      setIsOpen(false);
      return;
    }

    const delayMs = Math.max((Number(config.delaySeconds) || 0.6) * 1000, 300);
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [config.enabled, config.delaySeconds, location.pathname]);

  const cardRef = useRef(null);

  // Close when clicking anywhere outside the card on the page
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        if (e.target.closest && e.target.closest('.brochure-reopen-tab')) return;
        handleClose(e);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  const targetGoogleFormUrl = (config.googleFormUrl && !config.googleFormUrl.includes('placeholder') && !config.googleFormUrl.includes('1FAIpQLSc6J8qj') && !config.googleFormUrl.includes('docs.google.com/forms/d/e/'))
    ? config.googleFormUrl
    : 'https://forms.gle/G9tFYtJ53W9873wQ6';

  const handleApplyClick = (e) => {
    e.stopPropagation();
    window.open(targetGoogleFormUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = config.brochureUrl || '/innoveity-brochure.jpeg';
    link.download = config.brochureFileName || 'innoveity-brochure.jpeg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Strictly only show on landing page
  if (location.pathname !== '/' || !config.enabled) return null;

  const brochureImageSrc = (!config.coverImage || config.coverImage.includes('tech_blog'))
    ? '/innoveity-brochure.jpeg'
    : config.coverImage;

  const badgeText = (!config.badge || config.badge === 'OFFICIAL BROCHURE')
    ? 'INTERNSHIP CALL 2026'
    : config.badge;

  const titleText = (!config.title || config.title === 'Download Our Company Brochure')
    ? 'Industry Immersion Programmes'
    : config.title;

  const subtitleText = (!config.subtitle || config.subtitle.includes('empowers enterprises'))
    ? 'Gain real-world skills & work on live projects with industry experts.'
    : config.subtitle;

  const ctaButtonText = (!config.ctaText || config.ctaText === 'Fill Google Form to Download' || config.ctaText === 'Apply Online')
    ? 'Apply Now'
    : config.ctaText;

  return (
    <>
      {/* CENTERED FLOATING POPUP (NO BLUR BACKGROUND, PAGE FULLY VISIBLE) */}
      {isOpen ? (
        <div className="brochure-popup-backdrop" role="presentation">
          <div
            ref={cardRef}
            className="brochure-center-card"
            role="dialog"
            aria-modal="false"
            aria-label="Brochure and Internship"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Circular Close Button (top-right overlapping corner) */}
            <button
              className="floating-widget-close"
              onClick={handleClose}
              aria-label="Close brochure popup"
              title="Close"
            >
              <FiX />
            </button>

            <div className="floating-widget-inner">
              {/* Brochure Image Thumbnail (Clickable to Zoom in full view) */}
              <div
                className="floating-widget-media"
                onClick={() => setIsZoomed(true)}
                title="Click to view full size brochure"
              >
                <img
                  src={brochureImageSrc}
                  alt={titleText}
                  className="floating-widget-img"
                  onError={(e) => {
                    e.currentTarget.src = '/innoveity broucher.jpeg';
                  }}
                />
                <div className="floating-widget-zoom-overlay">
                  <span className="zoom-hint-pill">
                    <FiMaximize2 /> View Full Poster
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="floating-widget-content">
                <div className="floating-widget-actions">
                  <a
                    href={targetGoogleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-widget-apply-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{ctaButtonText}</span>
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* RE-OPEN TAB WHEN CARD IS CLOSED */
        <button
          className="brochure-reopen-tab"
          onClick={handleReopen}
          title="Open Brochure & Internship Details"
        >
          <span className="reopen-dot" />
          <FiFileText />
          <span>Brochure & Application</span>
        </button>
      )}

      {/* FULLSCREEN LIGHTBOX ZOOM MODAL (When clicking to view high-res poster) */}
      {isZoomed && (
        <div className="brochure-lightbox-backdrop" onClick={() => setIsZoomed(false)}>
          <div className="brochure-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setIsZoomed(false)}
              aria-label="Close enlarged brochure"
            >
              <FiX />
            </button>

            <div className="lightbox-image-container">
              <img
                src={brochureImageSrc}
                alt="Innoveity Tech Full Brochure"
                className="lightbox-full-img"
              />
            </div>

            <div className="lightbox-bottom-bar">
              <a
                href={targetGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lightbox-apply-btn"
              >
                <span>{ctaButtonText}</span> <FiExternalLink />
              </a>
              <button className="lightbox-dl-btn" onClick={handleDownload}>
                <FiDownload /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrochurePopup;
