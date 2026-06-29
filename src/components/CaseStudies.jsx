import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './CaseStudies.css';

const caseStudies = [
  {
    id: 1,
    title: 'Mejora de Estación de Bomberos en el Medio Oeste',
    category: 'Bomberos y Rescate',
    description: 'Una estación de bomberos ubicada en una ciudad mediana estaba experimentando un rápido deterioro en los pisos de sus bahías. Instalamos un recubrimiento protector resinoso multicapa diseñado para extender la vida útil del concreto mientras mejora la seguridad.',
    image: '/data/images/18-Sanibel-Fire-blue-Stout-5.jpg',
    link: '/item/fire-rescue-ems'
  },
  {
    id: 2,
    title: 'Instalación de Procesamiento de la NASA',
    category: 'Aviación y Aeroespacial',
    description: 'Un recubrimiento resinoso autonivelante de ultra alto rendimiento diseñado para brindar protección contra impactos y resistir fluidos Skydrol en un entorno aeroespacial de servicio pesado.',
    image: '/data/images/@NASA-2.jpg',
    link: '/item/aviation-and-aerospace'
  },
  {
    id: 3,
    title: 'Showroom Automotriz de Alto Tráfico',
    category: 'Automotriz',
    description: 'Transformación de un piso de concreto anticuado en una obra maestra de exhibición reflectante y de alto brillo utilizando nuestro sistema epoxi metálico personalizado, que ofrece una durabilidad extrema y una estética increíble.',
    image: '/data/images/Automotive.jpg',
    link: '/item/automotive'
  }
];

export default function CaseStudies() {
  const revealRef = useScrollReveal();

  return (
    <section className="case-studies-section">
      <div className="container reveal" ref={revealRef}>
        <div className="section-header">
          <h2>Casos de Éxito Destacados</h2>
          <p>Aplicaciones reales de los pisos de alto rendimiento de Elite Mexico.</p>
        </div>

        <div className="cs-grid">
          {caseStudies.map((cs) => (
            <Link to={cs.link} key={cs.id} className="cs-card">
              <div className="cs-image-wrap">
                <img src={cs.image} alt={cs.title} loading="lazy" />
                <div className="cs-overlay">
                  <span className="cs-btn">Leer Caso de Éxito</span>
                </div>
              </div>
              <div className="cs-content">
                <span className="cs-category">{cs.category}</span>
                <h3>{cs.title}</h3>
                <p>{cs.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="cs-footer">
          <Link to="/gallery" className="btn btn-primary">Ver Galería Completa</Link>
        </div>
      </div>
    </section>
  );
}
