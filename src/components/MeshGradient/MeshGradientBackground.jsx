import React from 'react';
import './MeshGradientBackground.css';

/**
 * MeshGradientBackground
 * Ambient dynamic mesh gradient background component using 100% Innoveity Tech Theme colors:
 * Emerald Green, Forest Dark Green, Teal, and Mint.
 */
const MeshGradientBackground = ({ children, className = '', variant = 'hero' }) => {
  return (
    <div className={`mesh-gradient-wrapper mesh-variant-${variant} ${className}`}>
      {/* Background Animated Color Canvas */}
      <div className="mesh-canvas" aria-hidden="true">
        <div className="mesh-blob blob-forest-dark"></div>
        <div className="mesh-blob blob-teal-cyan"></div>
        <div className="mesh-blob blob-emerald-primary"></div>
        <div className="mesh-blob blob-mint-bright"></div>
        <div className="mesh-blob blob-forest-accent"></div>
        <div className="mesh-noise-overlay"></div>
      </div>

      {/* Content Container */}
      <div className="mesh-content">
        {children}
      </div>
    </div>
  );
};

export default MeshGradientBackground;
