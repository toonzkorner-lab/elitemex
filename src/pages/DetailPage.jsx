import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, FileText, Download } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import './DetailPage.css';

export default function DetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0);
    fetch(`/data/${slug}.json`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching detail", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="detail-loading">Cargando...</div>;
  if (!data) return <div className="detail-loading">Contenido no encontrado.</div>;

  const pageTitle = data.title.replace(' - Elite South Texas', '').replace(' - Elite Mexico', '');
  const pageDesc = data.content ? data.content.substring(0, 160) : `Conozca más sobre ${pageTitle} de Elite Mexico.`;

  return (
    <div className="detail-page">
      <SEOHead 
        title={pageTitle}
        description={pageDesc}
        path={`/item/${slug}`}
      />
      <div className="container">
        <Link to="/" className="back-btn"><ArrowLeft size={20} /> Volver a Soluciones</Link>
        
        <div className="detail-header">
          <h1>{pageTitle}</h1>
        </div>

        <div className="detail-content">
          <div className="text-content">
            {data.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {data.pdfs && data.pdfs.length > 0 && (
          <section className="resources-section" aria-label="Recursos Técnicos">
            <h2><FileText size={20} style={{verticalAlign: 'bottom', marginRight: 8}}/> Recursos Técnicos y Documentos</h2>
            <div className="resources-grid">
              {data.pdfs.map((pdf, i) => (
                <a key={i} href={`/data/pdfs/${pdf.filename}`} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <div className="resource-icon">
                    <FileText size={24} color="#0A84FF" />
                  </div>
                  <div className="resource-info">
                    <h3>{pdf.title}</h3>
                    <span className="resource-meta">Documento PDF</span>
                  </div>
                  <div className="resource-action">
                    <Download size={18} />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {data.images && data.images.length > 0 && (
          <section className="gallery-section" aria-label="Galería de Imágenes">
            <h2><ImageIcon size={20} style={{verticalAlign: 'bottom', marginRight: 8}}/> Galería de Imágenes</h2>
            <div className="gallery-grid">
              {data.images.map((img, i) => (
                <img 
                  key={i} 
                  src={`/data/images/${img}`} 
                  alt={`${pageTitle} - project photo ${i + 1}`} 
                  loading="lazy"
                  width="400"
                  height="300"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}