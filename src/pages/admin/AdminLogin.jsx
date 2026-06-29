import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import './AdminStyles.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <Lock size={32} color="#0A84FF" />
        </div>
        <h2>Admin Access</h2>
        <p>Please enter the dashboard password to continue.</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <div className="admin-error">{error}</div>}
          <button type="submit" className="admin-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
