import React from 'react';
import { Users, Eye, ArrowUpRight } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <>
      <div className="admin-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Admin. Here is what's happening today.</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} color="#0A84FF" /></div>
          <div className="stat-info">
            <h4>Total Visitors (Today)</h4>
            <div className="stat-value">1,492</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Eye size={24} color="#34C759" /></div>
          <div className="stat-info">
            <h4>Page Views</h4>
            <div className="stat-value">4,281</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><ArrowUpRight size={24} color="#FF9F0A" /></div>
          <div className="stat-info">
            <h4>Avg Session</h4>
            <div className="stat-value">2m 14s</div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3>Quick Actions</h3>
        <p style={{color: '#A0A0A5'}}>Use the sidebar to navigate to specific management interfaces. You can add new products and industries, upload photos to the gallery, and add new technical PDFs to the resources page.</p>
      </div>
    </>
  );
}
