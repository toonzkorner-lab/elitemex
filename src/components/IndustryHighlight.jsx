import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Plane, Car, HeartPulse, Building2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './IndustryHighlight.css';

const industries = [
  {
    id: 'fire-rescue',
    title: 'Bomberos y Rescate',
    icon: <Flame size={24} />,
    description: 'Los sistemas de pisos HERMETIC™ son pisos resinosos aplicados de manera fluida, diseñados para mejorar la durabilidad mientras proporcionan una superficie antideslizante. Ofrecen alta resistencia a la abrasión y al impacto.',
    image: '/data/images/10-Gordon-county-fire-station-reflector-by-Adam-Diskey-1-768x768.jpg',
    link: '/item/fire-rescue-ems'
  },
  {
    id: 'aviation',
    title: 'Aviación y Aeroespacial',
    icon: <Plane size={24} />,
    description: 'Nuestros sistemas de pisos aeroespaciales son recubrimientos resinosos autonivelantes de ultra alto rendimiento. Ofrecen protección contra impactos y resistencia excepcional a fluidos y productos petroquímicos.',
    image: '/data/images/16-Industrial-hangar-flake-stout-combo-1.jpg',
    link: '/item/aviation-and-aerospace'
  },
  {
    id: 'automotive',
    title: 'Automotriz y Showrooms',
    icon: <Car size={24} />,
    description: 'La industria automotriz requiere alta durabilidad para áreas de servicio y gran valor estético para exhibiciones. Nuestras superficies son resistentes a la abrasión, antideslizantes y fáciles de mantener.',
    image: '/data/images/18-Toyota-USA-Quartz-1-1.jpg',
    link: '/item/automotive'
  },
  {
    id: 'healthcare',
    title: 'Salud y Médica',
    icon: <HeartPulse size={24} />,
    description: 'Pisos diseñados para el tráfico pesado de equipos médicos. Estos sistemas continuos y no porosos proporcionan una superficie antimicrobiana resistente a fluidos químicos y soportan limpieza agresiva.',
    image: '/data/images/10430388_1448855615397629_6757677876344705567_n.jpg',
    link: '/item/healthcare'
  },
  {
    id: 'commercial',
    title: 'Espacios Comerciales',
    icon: <Building2 size={24} />,
    description: 'Sistemas de pisos arquitectónicos con posibilidades de diseño ilimitadas para tiendas, oficinas y restaurantes. Crea una gran primera impresión asegurando durabilidad extrema y bajos costos de mantenimiento.',
    image: '/data/images/10-Commercial-hotel-by-SBR-Concrete-Polishing-1.jpg',
    link: '/item/retail-and-commercial'
  }
];

export default function IndustryHighlight() {
  const [activeTab, setActiveTab] = useState(industries[0]);
  const revealRef = useScrollReveal();

  return (
    <section className="industry-section">
      <div className="container reveal" ref={revealRef}>
        <div className="section-header">
          <h2>Soluciones Industriales Especializadas</h2>
          <p>Rendimiento diseñado para cada entorno.</p>
        </div>

        <div className="industry-layout">
          <div className="industry-tabs">
            {industries.map((ind) => (
              <button
                key={ind.id}
                className={`industry-tab ${activeTab.id === ind.id ? 'active' : ''}`}
                onClick={() => setActiveTab(ind)}
              >
                <span className="tab-icon">{ind.icon}</span>
                <span className="tab-title">{ind.title}</span>
              </button>
            ))}
          </div>

          <div className="industry-content-wrapper">
            <div className="industry-image-container">
              <img src={activeTab.image} alt={activeTab.title} className="industry-image" />
              <div className="industry-overlay"></div>
            </div>
            <div className="industry-details">
              <h3>{activeTab.title}</h3>
              <p>{activeTab.description}</p>
              <Link to={activeTab.link} className="industry-link">
                Explorar Soluciones <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
