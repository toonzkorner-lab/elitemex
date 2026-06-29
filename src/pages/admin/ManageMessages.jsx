import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building, Clock, CheckCircle } from 'lucide-react';
import './AdminStyles.css';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/messages/${id}/read`, { method: 'POST' });
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  if (loading) return <div className="admin-page"><p>Loading messages...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Contact Form Messages</h1>
      </div>

      <div className="messages-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{
              background: '#1A1A1E',
              border: `1px solid ${msg.read ? '#2A2A35' : '#0A84FF'}`,
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {msg.name} {!msg.read && <span style={{ background: '#0A84FF', color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>New</span>}
                  </h3>
                  <div style={{ display: 'flex', gap: '1.5rem', color: '#A0A0A5', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14}/> {msg.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={14}/> {msg.phone}</span>
                    {msg.company && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Building size={14}/> {msg.company}</span>}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> {new Date(msg.date).toLocaleString()}</span>
                  </div>
                </div>
                {!msg.read && (
                  <button 
                    onClick={() => markAsRead(msg.id)}
                    style={{ background: 'transparent', border: '1px solid #0A84FF', color: '#0A84FF', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <CheckCircle size={16} /> Mark as Read
                  </button>
                )}
              </div>
              
              <div style={{ background: '#0A0A0B', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ color: '#0A84FF', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Interested In: {msg.interest}
                </div>
                <p style={{ margin: 0, color: '#E0E0E5', lineHeight: '1.5' }}>{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
