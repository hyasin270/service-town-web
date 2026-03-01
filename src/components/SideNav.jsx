import { useState, useEffect } from 'react';
import { sections } from '../data/content';

const navItems = sections.map(s => ({ id: s.id, title: s.title.replace('Welcome to ', '') }));

export default function SideNav() {
  const [active, setActive] = useState('');
  const [visited, setVisited] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            setVisited(prev => new Set([...prev, entry.target.id]));
          }
        }
      },
      { threshold: 0.3 }
    );

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
      {navItems.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center gap-3"
          title={item.title}
        >
          <div
            className={`sidenav-dot ${active === item.id ? 'active' : visited.has(item.id) ? 'visited' : ''}`}
          />
          <span className="text-xs font-medium font-ui text-text/0 group-hover:text-text/80 transition-all whitespace-nowrap bg-surface/90 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            {item.title}
          </span>
        </a>
      ))}
    </nav>
  );
}
