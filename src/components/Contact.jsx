import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'Microcement',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', interest: 'Microcement', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Failed to submit form', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contáctanos</h2>
          <p>¿Listo para transformar sus superficies? Contacte a nuestros expertos para consultas, información de productos o estimaciones de proyectos.</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <Phone className="info-icon" />
              <div>
                <h3>Llámanos</h3>
                <p><a href="tel:210-612-5947">210-612-5947</a></p>
                <span className="info-subtext">Lun-Vie, 8am-5pm CST</span>
              </div>
            </div>
            
            <div className="info-card">
              <Mail className="info-icon" />
              <div>
                <h3>Envíanos un correo</h3>
                <p><a href="mailto:carlos.pena@elitecrete.com">carlos.pena@elitecrete.com</a></p>
                <span className="info-subtext">Responderemos en 24 horas</span>
              </div>
            </div>
            
            <div className="info-card">
              <MapPin className="info-icon" />
              <div>
                <h3>Nuestras Ubicaciones</h3>
                <p><strong>Sede San Antonio:</strong><br/>10811 Perrin Beitel Rd, San Antonio, TX</p>
                <p style={{marginTop: '0.5rem'}}><strong>Harlingen:</strong><br/>1121 S. Expressway 93, Harlingen, TX 78550</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {isSuccess ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>¡Mensaje Enviado!</h3>
                <p>Gracias por contactarnos. Uno de nuestros especialistas se pondrá en contacto con usted en breve.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Juan Pérez" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="juan@ejemplo.com" />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Empresa</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Su Empresa" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="interest">Área de Interés</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleChange}>
                    <option value="Microcement">Microcemento</option>
                    <option value="Epoxy Coatings">Recubrimientos Epóxicos</option>
                    <option value="Polyurethane">Sistemas de Poliuretano</option>
                    <option value="Industrial">Pisos Industriales</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje *</label>
                  <textarea id="message" name="message" required rows="4" value={formData.message} onChange={handleChange} placeholder="Cuéntanos sobre tu proyecto..."></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      Enviar Mensaje
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
