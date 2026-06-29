import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

export default function ManageProducts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setLoading(true);
    setSuccess('');
    
    let uploadedImage = null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        uploadedImage = data.filename;
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          primary_image: uploadedImage
        })
      });
      setSuccess('Product successfully created!');
      setTitle('');
      setContent('');
      setFile(null);
    } catch (err) {
      console.error("Creation failed", err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="admin-header">
        <h1>Manage Products & Industries</h1>
        <p>Add new solutions to the catalog database.</p>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Title (e.g. "Residential Epoxy")</label>
            <input type="text" className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="admin-form-group">
            <label>Description / Content</label>
            <textarea className="admin-textarea" value={content} onChange={e => setContent(e.target.value)} required></textarea>
          </div>
          <div className="admin-form-group">
            <label>Thumbnail Image (Optional)</label>
            <label className="admin-dropzone" style={{ display: 'block' }}>
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={e => setFile(e.target.files[0])} />
              <div className="admin-dropzone-icon">
                <UploadCloud size={32} color="#A0A0A5" />
              </div>
              <p>{file ? file.name : <span>Click to upload an image</span>}</p>
            </label>
          </div>
          
          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Publish Product'}
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
