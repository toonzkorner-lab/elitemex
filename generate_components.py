import os

components = {
    "src/components/Navbar.jsx": """
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">Elite Crete<span>.</span></Link>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <a href="#products">Products</a>
          <a href="#industries">Industries</a>
          <a href="#contact" className="btn btn-primary nav-btn">Contact Us</a>
        </div>
        <button className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
        </button>
      </div>
    </nav>
  );
}
""",
    "src/components/Navbar.css": """
.navbar { position: fixed; top: 0; left: 0; width: 100%; z-index: 100; padding: 1.5rem 0; transition: all 0.3s ease; }
.navbar.scrolled { padding: 1rem 0; background: rgba(20, 20, 22, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.08); }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.5px; color: #fff; text-decoration: none; }
.logo span { color: #0A84FF; }
.nav-links { display: flex; align-items: center; gap: 2.5rem; }
.nav-links a { color: #A0A0A5; font-weight: 500; text-decoration: none; transition: 0.2s; }
.nav-links a:hover { color: #fff; }
.mobile-menu-toggle { display: none; background: transparent; border: none; cursor: pointer; }
@media (max-width: 768px) {
  .nav-links { position: fixed; top: 0; right: -100%; width: 250px; height: 100vh; background: #141416; flex-direction: column; padding-top: 5rem; transition: 0.3s; }
  .nav-links.open { right: 0; border-left: 1px solid rgba(255,255,255,0.1); }
  .mobile-menu-toggle { display: block; z-index: 101; }
}
""",
    "src/components/Hero.jsx": """
import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title animate-up">The Benchmark in <span className="text-gradient">Resinous Flooring</span></h1>
        <p className="hero-subtitle animate-up delay-1">Engineered for extreme durability, designed for flawless aesthetics. The ultimate floor coating solutions for industrial, commercial, and residential spaces.</p>
        <div className="hero-actions animate-up delay-2">
          <a href="#products" className="btn btn-primary">Explore Products</a>
          <a href="#contact" className="btn btn-secondary">Request a Quote</a>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span className="mouse"><span className="wheel"></span></span>
      </div>
    </header>
  );
}
""",
    "src/components/Hero.css": """
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 6rem 2rem 2rem; background: radial-gradient(circle at center, #141416 0%, #0A0A0B 100%); overflow: hidden; }
.hero::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(10, 132, 255, 0.05) 0%, transparent 50%); animation: rotate 30s linear infinite; pointer-events: none; }
@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(10,10,11,0.3) 0%, #0A0A0B 100%); z-index: 1; }
.hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; }
.hero-title { font-size: clamp(3rem, 5vw + 1rem, 5rem); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 1.5rem; color: #fff; }
.text-gradient { background: linear-gradient(135deg, #0A84FF, #00D084); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: clamp(1.125rem, 2vw, 1.25rem); color: #A0A0A5; margin-bottom: 2.5rem; max-width: 600px; margin-inline: auto; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; }
.hero-scroll-indicator { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 2; }
.mouse { width: 26px; height: 40px; border: 2px solid #A0A0A5; border-radius: 13px; display: block; position: relative; }
.wheel { width: 4px; height: 8px; background: #fff; border-radius: 2px; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); animation: scroll 1.5s infinite; }
@keyframes scroll { 0% { top: 6px; opacity: 1; } 100% { top: 20px; opacity: 0; } }
.animate-up { opacity: 0; transform: translateY(30px); animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.delay-1 { animation-delay: 0.2s; } .delay-2 { animation-delay: 0.4s; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
""",
    "src/components/Footer.jsx": """
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">Elite Crete<span>.</span></h3>
          <p>The global leader in high-performance surface solutions, epoxy coatings, and decorative concrete.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#products">Products</a>
          <a href="#industries">Industries</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>1-800-XXX-XXXX</p>
          <p>info@elitecrete.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Elite Crete Systems. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
""",
    "src/components/Footer.css": """
.footer { border-top: 1px solid rgba(255,255,255,0.08); padding: 4rem 2rem 2rem; background-color: #141416; }
.footer-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
.footer-logo { font-size: 1.5rem; margin-bottom: 1rem; color: #fff; }
.footer-logo span { color: #0A84FF; }
.footer-col h4 { font-size: 1.125rem; margin-bottom: 1.25rem; color: #fff; }
.footer-col p, .footer-col a { color: #A0A0A5; margin-bottom: 0.75rem; display: block; text-decoration: none; }
.footer-col a:hover { color: #0A84FF; }
.footer-bottom { max-width: 1200px; margin: 0 auto; text-align: center; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); color: #A0A0A5; font-size: 0.875rem; }
@media (max-width: 768px) { .footer-container { grid-template-columns: 1fr; } }
""",
    "src/components/CardGrid.jsx": """
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import './CardGrid.css';

export default function CardGrid() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/catalog.json')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load catalog", err);
        setLoading(false);
      });
  }, []);

  const getCategory = (url) => {
    const products = ['microcement', 'epoxy', 'mma', 'polyurethanes', 'sealants', 'coatings', 'cement', 'stains', 'densifiers', 'self-levelers'];
    const lowerUrl = url.toLowerCase();
    if (products.some(k => lowerUrl.includes(k))) return 'Products';
    if (lowerUrl.includes('elitecrete')) return 'General';
    return 'Industries';
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const cat = getCategory(item.url);
    const matchesFilter = filter === 'All' || cat === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-header">
          <h2>Our Solutions</h2>
          <p>Discover high-performance floor systems tailored for specialized environments.</p>
        </div>

        <div className="controls">
          <div className="search-bar">
            <Search size={20} color="#A0A0A5" />
            <input 
              type="text" 
              placeholder="Search products or industries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters">
            {['All', 'Products', 'Industries'].map(f => (
              <button 
                key={f} 
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading content...</div>
        ) : (
          <div className="grid">
            {filteredItems.map(item => (
              <Link to={`/item/${item.file.replace('.json', '')}`} key={item.file} className="card">
                <div className="card-img-wrap">
                  <img src={item.images_count > 0 ? `/data/images/${item.file.replace('.json', '')}.jpg` : "https://via.placeholder.com/400x300?text=No+Image"} 
                       onError={(e) => e.target.src="https://via.placeholder.com/400x300?text=View"} 
                       alt={item.title} loading="lazy" />
                  <div className="card-overlay">
                    <span className="card-btn">Learn More</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{item.title.replace(' - Elite Crete Systems', '')}</h3>
                  <span className="badge">{getCategory(item.url)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
""",
    "src/components/CardGrid.css": """
.section { padding: 6rem 2rem; }
.container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 3rem; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 1rem; color: #fff; }
.section-header p { color: #A0A0A5; font-size: 1.125rem; max-width: 600px; margin: 0 auto; }
.controls { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-bottom: 3rem; }
.search-bar { display: flex; align-items: center; background: #141416; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 0.5rem 1rem; width: 100%; max-width: 500px; }
.search-bar input { background: transparent; border: none; color: #fff; padding: 0.5rem; flex-grow: 1; outline: none; font-size: 1rem; }
.filters { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; }
.filter-btn { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #A0A0A5; padding: 0.5rem 1.25rem; border-radius: 20px; cursor: pointer; transition: 0.2s; }
.filter-btn:hover, .filter-btn.active { background: #0A84FF; color: #fff; border-color: #0A84FF; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
.card { background: #141416; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; transition: 0.3s; display: flex; flex-direction: column; text-decoration: none; }
.card:hover { transform: translateY(-5px); border-color: #0A84FF; box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(10,132,255,0.2); }
.card-img-wrap { position: relative; width: 100%; aspect-ratio: 4/3; overflow: hidden; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: 0.4s; }
.card:hover .card-img-wrap img { transform: scale(1.05); }
.card-overlay { position: absolute; inset: 0; background: rgba(10,10,11,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s; }
.card:hover .card-overlay { opacity: 1; }
.card-btn { padding: 0.5rem 1.5rem; border: 1px solid #fff; border-radius: 4px; color: #fff; font-weight: 600; text-transform: uppercase; font-size: 0.875rem; backdrop-filter: blur(4px); }
.card-content { padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
.card-content h3 { font-size: 1.25rem; color: #fff; margin: 0; }
.badge { background: rgba(255,255,255,0.1); color: #A0A0A5; font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase; }
.loading { text-align: center; color: #A0A0A5; padding: 4rem; }
""",
    "src/pages/Home.jsx": """
import React from 'react';
import Hero from '../components/Hero';
import CardGrid from '../components/CardGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <CardGrid />
    </>
  );
}
""",
    "src/pages/DetailPage.jsx": """
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
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

  if (loading) return <div className="detail-loading">Loading...</div>;
  if (!data) return <div className="detail-loading">Content not found.</div>;

  return (
    <div className="detail-page">
      <div className="container">
        <Link to="/" className="back-btn"><ArrowLeft size={20} /> Back to Solutions</Link>
        
        <div className="detail-header">
          <h1>{data.title.replace(' - Elite Crete Systems', '')}</h1>
        </div>

        <div className="detail-content">
          <div className="text-content">
            {data.content.split('\\n\\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {data.images && data.images.length > 0 && (
            <div className="gallery-section">
              <h3><ImageIcon size={20} style={{verticalAlign: 'bottom', marginRight: 8}}/> Image Gallery</h3>
              <div className="gallery-grid">
                {data.images.map((img, i) => (
                  <img key={i} src={`/data/images/${img}`} alt={`Gallery ${i}`} loading="lazy" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
""",
    "src/pages/DetailPage.css": """
.detail-page { padding: 8rem 2rem 4rem; min-height: 100vh; background: #0A0A0B; color: #F5F5F5; }
.back-btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #A0A0A5; text-decoration: none; margin-bottom: 2rem; transition: 0.2s; }
.back-btn:hover { color: #0A84FF; }
.detail-header { margin-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem; }
.detail-header h1 { font-size: 3rem; font-weight: 800; color: #fff; }
.detail-content { display: grid; grid-template-columns: 1fr; gap: 4rem; }
@media (min-width: 992px) {
  .detail-content { grid-template-columns: 2fr 1fr; }
}
.text-content p { font-size: 1.125rem; line-height: 1.8; color: #A0A0A5; margin-bottom: 1.5rem; }
.gallery-section { background: #141416; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); height: fit-content; }
.gallery-section h3 { font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }
.gallery-grid img { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); transition: 0.2s; cursor: zoom-in; }
.gallery-grid img:hover { transform: scale(1.05); border-color: #0A84FF; }
.detail-loading { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #A0A0A5; }
""",
    "src/App.jsx": """
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:slug" element={<DetailPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
""",
    "src/main.jsx": """
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
""",
    "src/index.css": """
:root { --clr-bg: #0A0A0B; --clr-surface: #141416; --clr-primary: #0A84FF; --clr-secondary: #00D084; --clr-text: #F5F5F5; --clr-text-muted: #A0A0A5; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background-color: var(--clr-bg); color: var(--clr-text); line-height: 1.6; overflow-x: hidden; }
h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; font-weight: 600; line-height: 1.2; }
.btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.875rem 1.75rem; font-family: 'Outfit', sans-serif; font-weight: 600; border-radius: 8px; cursor: pointer; transition: 0.2s; border: none; text-decoration: none;}
.btn-primary { background-color: var(--clr-primary); color: #fff; box-shadow: 0 4px 15px rgba(10, 132, 255, 0.4); }
.btn-primary:hover { background-color: #006ce6; transform: translateY(-2px); }
.btn-secondary { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2); }
.btn-secondary:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
"""
}

for path, content in components.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
print("Components generated.")
