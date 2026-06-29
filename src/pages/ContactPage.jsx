import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import SEOHead from '../components/SEOHead';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        path="/contact" 
        title="Contáctanos" 
        description="Póngase en contacto con Elite Mexico para consultas, información de productos o estimaciones de proyectos."
      />
      <Contact />
    </>
  );
}
