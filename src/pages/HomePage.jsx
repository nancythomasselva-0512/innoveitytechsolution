import React from 'react';
import Hero from '../components/Hero/Hero';
import AboutSummary from '../components/AboutSummary/AboutSummary';

import Services from '../components/Services/Services';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSummary />
      <Services />
      <Projects />
      <Contact />
    </>
  );
};

export default HomePage;
