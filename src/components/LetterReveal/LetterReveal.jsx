import React from 'react';
import { motion } from 'framer-motion';
import './LetterReveal.css';

export function LetterReveal({ text, className = '' }) {
  if (!text) return null;
  
  const letters = text.split('');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015, // smooth 0.015s delay between each character
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <motion.p
      className={`letter-reveal-paragraph ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default LetterReveal;
