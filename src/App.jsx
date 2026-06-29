import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import GalleryPage from './pages/GalleryPage';
import ResourcesPage from './pages/ResourcesPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import './index.css';

// Lazy-load admin pages (code splitting - only loaded when user visits /admin)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));
const AnalyticsDash = lazy(() => import('./pages/admin/AnalyticsDash'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts'));
const ManageGallery = lazy(() => import('./pages/admin/ManageGallery'));
const ManageResources = lazy(() => import('./pages/admin/ManageResources'));

function AdminFallback() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0A0A0B', color: '#A0A0A5' }}>
      Loading Admin Panel...
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:slug" element={<DetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ResourcesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="/admin" element={<Suspense fallback={<AdminFallback />}><AdminLogin /></Suspense>} />
        <Route path="/admin" element={<Suspense fallback={<AdminFallback />}><AdminLayout /></Suspense>}>
          <Route path="dashboard" element={<Suspense fallback={<AdminFallback />}><DashboardOverview /></Suspense>} />
          <Route path="messages" element={<Suspense fallback={<AdminFallback />}><ManageMessages /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<AdminFallback />}><AnalyticsDash /></Suspense>} />
          <Route path="products" element={<Suspense fallback={<AdminFallback />}><ManageProducts /></Suspense>} />
          <Route path="gallery" element={<Suspense fallback={<AdminFallback />}><ManageGallery /></Suspense>} />
          <Route path="resources" element={<Suspense fallback={<AdminFallback />}><ManageResources /></Suspense>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;