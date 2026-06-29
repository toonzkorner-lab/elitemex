import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

export default function ManageGallery() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    
    setLoading(true);
    setSuccess('');
    
    const uploadedFilenames = [];
    
    // Upload each image
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        uploadedFilenames.push(data.filename);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    // Update gallery.json
    if (uploadedFilenames.length > 0) {
      try {
        await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: uploadedFilenames })
        });
        setSuccess(`Successfully uploaded ${uploadedFilenames.length} images to the gallery!`);
        setFiles([]);
      } catch (err) {
        console.error("Gallery update failed", err);
      }
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className="admin-header">
        <h1>Manage Gallery</h1>
        <p>Upload new photos to the global project gallery.</p>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Upload Photos</label>
            <label className="admin-dropzone" style={{ display: 'block' }}>
              <input type="file" style={{ display: 'none' }} accept="image/*" multiple onChange={handleFileChange} />
              <div className="admin-dropzone-icon">
                <UploadCloud size={32} color="#A0A0A5" />
              </div>
              <p>{files.length > 0 ? <span>{files.length} files selected</span> : <span>Click to select multiple photos</span>}</p>
            </label>
          </div>
          
          <button type="submit" className="admin-btn" disabled={loading || files.length === 0}>
            {loading ? 'Uploading...' : 'Publish to Gallery'}
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
