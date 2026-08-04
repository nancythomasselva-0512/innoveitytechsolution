import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';

const SEOHead = () => {
  const location = useLocation();
  const { pageSeoSettings, seoSettings } = useCMS();

  useEffect(() => {
    if (!pageSeoSettings) return;

    let pageKey = 'home';
    const path = location.pathname;

    if (path === '/') pageKey = 'home';
    else if (path.startsWith('/about')) pageKey = 'about';
    else if (path.startsWith('/services')) pageKey = 'services';
    else if (path.startsWith('/projects')) pageKey = 'projects';
    else if (path.startsWith('/contact')) pageKey = 'contact';
    else if (path.startsWith('/team')) pageKey = 'team';
    else if (path.startsWith('/privacy')) pageKey = 'privacy';
    else if (path.startsWith('/terms')) pageKey = 'terms';
    else if (path.startsWith('/refund')) pageKey = 'refund';

    const currentPageSeo = pageSeoSettings[pageKey] || pageSeoSettings.home || {};
    const fallbackTitle = seoSettings?.metaTitle || 'Innoveity Tech Solution';
    const fallbackDesc = seoSettings?.metaDescription || 'Enterprise Software & AI Engineering';
    const fallbackImage = seoSettings?.ogImage || '/Innoveity.png';

    const finalTitle = currentPageSeo.title || fallbackTitle;
    const finalDesc = currentPageSeo.description || fallbackDesc;
    const finalKeywords = currentPageSeo.keywords || seoSettings?.keywords || '';
    const finalOgImage = currentPageSeo.ogImage || fallbackImage;
    const finalCanonical = currentPageSeo.canonicalUrl || window.location.href;

    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', finalDesc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = finalDesc;
      document.head.appendChild(metaDesc);
    }

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', finalKeywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = finalKeywords;
      document.head.appendChild(metaKeywords);
    }

    // 4. Update OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', finalTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', finalDesc);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', finalOgImage);

    // 5. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

  }, [location.pathname, pageSeoSettings, seoSettings]);

  return null;
};

export default SEOHead;
