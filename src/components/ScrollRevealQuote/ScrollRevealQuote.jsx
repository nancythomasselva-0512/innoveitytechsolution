import React, { useEffect, useRef } from 'react';
import './ScrollRevealQuote.css';

export function useScrollWordReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.reveal-word');

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // progress: 0 when block's top enters bottom of viewport (85% height),
      // 1 when block's top reaches top area of viewport (25% height)
      const start = viewportHeight * 0.88;
      const end = viewportHeight * 0.25;
      const raw = (rect.top - start) / (end - start);
      const progress = Math.min(1, Math.max(0, raw));

      const activeCount = Math.floor(progress * words.length);

      words.forEach((word, i) => {
        word.classList.toggle('is-active', i <= activeCount);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [containerRef]);
}

export function ScrollRevealQuote({ text, className = '', darkTheme = true }) {
  const containerRef = useRef(null);
  useScrollWordReveal(containerRef);

  if (!text) return null;
  const words = text.split(' ');

  return (
    <p 
      ref={containerRef} 
      className={`scroll-reveal-quote-text ${darkTheme ? 'theme-dark' : 'theme-light'} ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-word">
          {word}{' '}
        </span>
      ))}
    </p>
  );
}

export default ScrollRevealQuote;
