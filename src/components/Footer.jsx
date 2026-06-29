import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo-container">
            <img src="/logo.jpg" alt="" className="footer-logo-img" />
            <span className="footer-logo-text">Elite Mexico</span>
          </div>
          <p>El líder mundial en soluciones de superficies de alto rendimiento, recubrimientos epóxicos y concreto decorativo.</p>
        </div>
        <div className="footer-col">
          <h4>Enlaces Rápidos</h4>
          <nav aria-label="Footer navigation">
            <a href="/#products">Productos</a>
            <a href="/#industries">Industrias</a>
            <Link to="/gallery" onClick={() => window.scrollTo(0,0)}>Galería</Link>
            <Link to="/resources" onClick={() => window.scrollTo(0,0)}>Recursos</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <address style={{ fontStyle: 'normal' }}>
            <a href="tel:210-612-5947" aria-label="Llamar a Elite Mexico">210-612-5947</a>
            <a href="mailto:carlos.pena@elitecrete.com" aria-label="Email Elite Mexico">carlos.pena@elitecrete.com</a>
            <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}><strong>Sede San Antonio:</strong><br/>10811 Perrin Beitel Rd, San Antonio, TX</p>
            <p><strong>Harlingen:</strong><br/>1121 S. Expressway 93, Harlingen, TX 78550</p>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Elite Mexico. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}