import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-screen">
      <div className="loader-content">
        <div className="loader-logo gradient-text">Innoveity</div>
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
