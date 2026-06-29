import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

export default function ManageResources() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch('/data/catalog.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedProduct) return;
    
    setLoading(true);
    setSuccess('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('productSlug', selectedProduct);
    formData.append('pdfTitle', pdfTitle);

    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('PDF successfully uploaded and categorized!');
        setFile(null);
        setPdfTitle('');
      } else {
        console.error("Upload failed", data.error);
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className="admin-header">
        <h1>Manage Resources</h1>
        <p>Upload new PDF documents and assign them to a specific product or industry.</p>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Select Category (Product/Industry)</label>
            <select className="admin-select" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} required>
              <option value="">-- Choose Category --</option>
              {products.map(p => (
                <option key={p.file} value={p.file.replace('.json', '')}>{p.title.replace(' - Elite South Texas', '')}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label>Document Title (Optional)</label>
            <input type="text" className="admin-input" placeholder="e.g. Technical Data Sheet" value={pdfTitle} onChange={e => setPdfTitle(e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label>Upload PDF File</label>
            <label className="admin-dropzone" style={{ display: 'block' }}>
              <input type="file" style={{ display: 'none' }} accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />
              <div className="admin-dropzone-icon">
                <UploadCloud size={32} color="#A0A0A5" />
              </div>
              <p>{file ? file.name : <span>Click to select PDF document</span>}</p>
            </label>
          </div>
          
          <button type="submit" className="admin-btn" disabled={loading || !file || !selectedProduct}>
            {loading ? 'Uploading...' : 'Publish Document'}
          </button>

          {success && (
            <div style={{ marginTop: '1rem', color: '#34C759', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} /> {success}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
