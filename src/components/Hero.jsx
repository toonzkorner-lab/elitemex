import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Hero.css';

export default function Hero() {
  const revealRef = useScrollReveal();

  return (
    <header className="hero" role="banner">
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-content reveal" ref={revealRef}>
        <h1 className="hero-title animate-up">El Estándar de Referencia en <span className="text-gradient">Pisos Resinosos</span></h1>
        <p className="hero-subtitle animate-up delay-1">Ingeniería para durabilidad extrema, diseño para una estética impecable. Las mejores soluciones en recubrimientos de pisos para espacios industriales, comerciales y residenciales.</p>
        <div className="hero-actions animate-up delay-2">
          <a href="#products" className="btn btn-primary">Explorar Productos</a>
          <a href="#contact" className="btn btn-secondary">Solicitar Cotización</a>
        </div>
      </div>
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="mouse"><span className="wheel"></span></span>
      </div>
    </header>
  );
}