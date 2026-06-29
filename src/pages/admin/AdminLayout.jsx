import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Image as ImageIcon, FileText, BarChart2, MessageSquare, LogOut } from 'lucide-react';
import './AdminStyles.css';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>EC Admin<span>.</span></h2>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <LayoutDashboard size={20} /> Overview
          </NavLink>
          <NavLink to="/admin/messages" className={({isActive}) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <MessageSquare size={20} /> Messages
          </NavLink>
          <NavLink to="/admin/analytics" className={({isActive}) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <BarChart2 size={20} /> Analytics
          </NavLink>
          <NavLink to="/admin/products" className={({isActive}) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <Package size={20} /> Products
          </NavLink>
          <NavLink to="/admin/gallery" className={({isActive}) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <ImageIcon size={20} /> Gallery
          </NavLink>
          <NavLink to="/admin/resources" className={({isActive}) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <FileText size={20} /> Resources
          </NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
