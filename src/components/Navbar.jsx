import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogItems, setCatalogItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/catalog.json')
      .then(res => res.json())
      .then(data => setCatalogItems(data))
      .catch(err => console.error(err));
  }, []);

  const filteredItems = catalogItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="logo-link" onClick={() => window.scrollTo(0,0)} aria-label="Elite Mexico - Inicio">
          <img src="/new-logo.png" alt="Elite Crete Systems" className="nav-logo" />
          <span className="logo-text">Elite Mexico</span>
        </Link>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Inicio</Link>
          <div className="nav-dropdown">
            <a href="/#products" onClick={() => setMobileOpen(false)}>Productos</a>
            <div className="dropdown-menu">
              <Link to="/item/microcement" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Microcemento</Link>
              <Link to="/item/polyurethanes-polyaspartics-and-polyurea-coatings" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Poliuretanos</Link>
              <Link to="/item/epoxy-clear-pigmented-coatings" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Epoxi</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="#solutions" onClick={(e) => { e.preventDefault(); }}>Soluciones</a>
            <div className="dropdown-menu">
              <Link to="/item/fire-rescue-ems" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Bomberos y Rescate</Link>
              <Link to="/item/aviation-and-aerospace" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Aviación y Aeroespacial</Link>
              <Link to="/item/automotive" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Automotriz</Link>
              <Link to="/item/healthcare" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Salud</Link>
              <Link to="/item/retail-and-commercial" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Espacios Comerciales</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="/#industries" onClick={() => setMobileOpen(false)}>Industrias</a>
            <div className="dropdown-menu">
              <Link to="/item/retail-and-commercial" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Comercial</Link>
              <Link to="/item/industrial" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Industrial</Link>
              <Link to="/item/residential-interior" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Residencial</Link>
            </div>
          </div>
          <Link to="/gallery" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Galería</Link>
          <div className="nav-dropdown">
            <Link to="/resources" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Recursos</Link>
            <div className="dropdown-menu">
              <Link to="/resources/microcement" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Docs Microcemento</Link>
              <Link to="/resources/industrial" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Docs Industrial</Link>
              <Link to="/resources/epoxy-clear-pigmented-coatings" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Docs Epoxi</Link>
            </div>
          </div>
          
          <div className="search-wrapper" onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowDropdown(false);
            }
          }}>
            <form className="nav-search" onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery('');
                setShowDropdown(false);
                setMobileOpen(false);
              }
            }}>
              <Search size={18} color="#A0A0A5" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchQuery}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
              />
            </form>
            {showDropdown && searchQuery.trim() && (
               <div className="search-dropdown">
                 {filteredItems.length > 0 ? (
                   filteredItems.map(item => (
                     <Link 
                       key={item.file} 
                       to={`/item/${item.file.replace('.json', '')}`}
                       className="search-dropdown-item"
                       onClick={() => {
                         setSearchQuery('');
                         setShowDropdown(false);
                         setMobileOpen(false);
                       }}
                     >
                       <img 
                         src={item.primary_image ? `/data/images/${item.primary_image}` : "https://via.placeholder.com/40x40"} 
                         alt="" 
                       />
                       <span>{item.title.replace(' - Elite South Texas', '').replace(' - Elite Mexico', '')}</span>
                     </Link>
                   ))
                 ) : (
                   <div className="search-dropdown-empty">No se encontraron productos</div>
                 )}
               </div>
            )}
          </div>

          <a href="sms:210-612-5947" className="btn btn-secondary nav-btn" onClick={() => setMobileOpen(false)}>Text Now</a>
          <a href="mailto:carlos.pena@elitecrete.com" className="btn btn-secondary nav-btn" onClick={() => setMobileOpen(false)}>Email Now</a>
          <Link to="/contact" className="btn btn-primary nav-btn" onClick={() => { window.scrollTo(0,0); setMobileOpen(false); }}>Contáctanos</Link>
        </div>
        <button className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle mobile menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
        </button>
      </div>
    </nav>
  );
}