import React from 'react';
import Hero from '../components/Hero/Hero';
import AboutSummary from '../components/AboutSummary/AboutSummary';
import Services from '../components/Services/Services';
import MediaHomeTransformation from '../components/Media/MediaHomeTransformation';
import Projects from '../components/Projects/Projects';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import DynamicPageSections from '../components/UI/DynamicPageSections';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSummary />
      <Services />
      <MediaHomeTransformation />
      <Projects />
      <DynamicPageSections page="home" />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;
