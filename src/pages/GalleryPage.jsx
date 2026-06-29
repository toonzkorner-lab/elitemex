import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import './GalleryPage.css';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    window.scrollTo(0,0);
    fetch('/data/gallery.json')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load gallery", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-page">
      <SEOHead 
        title="Galería de Proyectos" 
        description="Explore cientos de instalaciones de pisos de alto rendimiento de Elite Mexico en proyectos comerciales, industriales y residenciales."
        path="/gallery"
      />
      <div className="gallery-header">
        <h1>Galería de Proyectos</h1>
        <p>Explore cientos de instalaciones de pisos de alto rendimiento en diversas industrias.</p>
      </div>

      {loading ? (
        <div className="gallery-loading">Cargando galería...</div>
      ) : (
        <>
          <div className="gallery-masonry">
            {images.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((img, i) => (
              <div className="gallery-item" key={(currentPage - 1) * itemsPerPage + i}>
                <img 
                  src={`/data/images/${img}`} 
                  alt={`proyecto de pisos de Elite Mexico ${(currentPage - 1) * itemsPerPage + i + 1}`} 
                  loading="lazy"
                  width="400"
                  height="300"
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>

          {Math.ceil(images.length / itemsPerPage) > 1 && (
            <div className="pagination-controls">
              <button 
                className="page-btn"
                disabled={currentPage === 1} 
                onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }}
              >
                Anterior
              </button>
              <span className="page-info">
                Página {currentPage} de {Math.ceil(images.length / itemsPerPage)}
              </span>
              <button 
                className="page-btn"
                disabled={currentPage === Math.ceil(images.length / itemsPerPage)} 
                onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
