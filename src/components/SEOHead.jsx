import { useEffect } from 'react';

export default function SEOHead({ title, description, path = '' }) {
  const siteTitle = 'Elite Mexico';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Recubrimientos de Pisos Resinosos y Epóxicos Premium`;
  const metaDescription = description || 'Elite Mexico es el líder mundial en sistemas de recubrimientos de pisos resinosos epóxicos, poliuretano y concreto decorativo de alto rendimiento.';
  const canonical = `https://www.elitecrete.com${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', metaDescription);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', metaDescription, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('twitter:title', fullTitle, 'name');
    setMeta('twitter:description', metaDescription, 'name');

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [fullTitle, metaDescription, canonical]);

  return null;
}
