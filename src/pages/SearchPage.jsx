import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import '../components/CardGrid.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/catalog.json')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load catalog", err);
        setLoading(false);
      });
  }, []);

  const getCategory = (url) => {
    const products = ['microcement', 'epoxy', 'mma', 'polyurethanes', 'sealants', 'coatings', 'cement', 'stains', 'densifiers', 'self-levelers'];
    const lowerUrl = url.toLowerCase();
    if (products.some(k => lowerUrl.includes(k))) return 'Productos';
    if (lowerUrl.includes('elitecrete')) return 'General';
    return 'Industrias';
  };

  const searchResults = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    getCategory(item.url).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <SEOHead 
        title={`Resultados de búsqueda para "${query}" - Elite Mexico`} 
        description={`Resultados de búsqueda para ${query} en Elite Mexico.`}
      />
      <section className="section" style={{ paddingTop: '8rem', minHeight: '60vh' }}>
        <div className="container">
          <div className="section-header">
            <h2>Resultados de Búsqueda</h2>
            <p>
              {loading 
                ? 'Buscando...' 
                : `Se encontraron ${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} para "${query}"`}
            </p>
          </div>
          
          {!loading && searchResults.length > 0 && (
            <div className="grid">
              {searchResults.map(item => (
                <Link to={`/item/${item.file.replace('.json', '')}`} key={item.file} className="card">
                  <div className="card-img-wrap">
                    <img src={item.primary_image ? `/data/images/${item.primary_image}` : "https://via.placeholder.com/400x300?text=No+Image"} 
                         onError={(e) => e.target.src="https://via.placeholder.com/400x300?text=View"} 
                         alt={item.title} loading="lazy" />
                    <div className="card-overlay">
                      <span className="card-btn">Ver Más</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{item.title.replace(' - Elite South Texas', '').replace(' - Elite Mexico', '')}</h3>
                    <span className="badge">{getCategory(item.url)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {!loading && searchResults.length === 0 && (
            <div style={{ textAlign: 'center', color: '#A0A0A5', marginTop: '2rem' }}>
              <p>Intente revisar su ortografía o usar términos más generales.</p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
