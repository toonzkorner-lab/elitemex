import React from 'react';
import Hero from '../components/Hero';
import CardGrid from '../components/CardGrid';
import IndustryHighlight from '../components/IndustryHighlight';
import CaseStudies from '../components/CaseStudies';
import SEOHead from '../components/SEOHead';

export default function Home() {
  return (
    <>
      <SEOHead path="/" />
      <Hero />
      <CardGrid />
      <IndustryHighlight />
      <CaseStudies />
    </>
  );
}