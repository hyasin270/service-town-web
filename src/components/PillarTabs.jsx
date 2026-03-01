import { useState, useEffect, useRef } from 'react';
import { pillars } from '../data/pillars';

const pillarKeys = ['technical', 'pedagogical', 'product'];

const colorMap = {
  technical: { badge: 'bg-blu-team', accent: 'border-blu-team', text: 'text-blu-team', light: 'bg-[rgba(91,143,192,0.08)]', border: 'border-l-4 border-blu-team', bg: 'bg-blu-team', headerBg: 'bg-[rgba(91,143,192,0.08)]' },
  pedagogical: { badge: 'bg-red-team', accent: 'border-red-team', text: 'text-red-team', light: 'bg-[rgba(224,85,80,0.08)]', border: 'border-l-4 border-red-team', bg: 'bg-red-team', headerBg: 'bg-[rgba(224,85,80,0.08)]' },
  product: { badge: 'bg-gold', accent: 'border-gold', text: 'text-gold', light: 'bg-[rgba(212,168,67,0.08)]', border: 'border-l-4 border-gold', bg: 'bg-gold', headerBg: 'bg-[rgba(212,168,67,0.08)]' },
};

function PillarSection({ pillarKey }) {
  const [expandedStandard, setExpandedStandard] = useState(null);
  const sectionRef = useRef(null);
  const pillar = pillars[pillarKey];
  const colors = colorMap[pillarKey];

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    const elements = sectionRef.current.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pillarKey]);

  return (
    <div id={`pillar-${pillarKey}`} ref={sectionRef} className="pillar-section fade-in">
      {/* Pillar header — sticky on scroll */}
      <div className={`pillar-sticky-header ${colors.headerBg}`}>
        <span className={`stamp ${colors.text} text-xs`}>{pillar.name}</span>
        <span className="font-display text-xl text-text ml-3">{pillar.tagline}</span>
      </div>

      {/* Pillar image */}
      <div className="rounded-lg overflow-hidden mb-5">
        <img
          src={pillar.image}
          alt={pillar.name}
          className="w-full h-auto"
        />
      </div>

      {/* Description */}
      <p className="text-text-secondary mb-5 text-[0.95rem]">{pillar.description}</p>

      {/* Standards list — expandable accordion */}
      <div className="space-y-2 mb-2">
        {pillar.standards.map((s, idx) => {
          const isExpanded = expandedStandard === s.id;
          return (
            <div key={s.id} className={`standard-accordion ${isExpanded ? colors.border : ''}`}>
              <button
                className="standard-accordion-header"
                onClick={() => setExpandedStandard(isExpanded ? null : s.id)}
              >
                <span className={`${colors.badge} text-white text-xs font-bold px-2 py-0.5 rounded shrink-0`}>
                  {s.id}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-text text-sm">{s.name}</span>
                  {!isExpanded && (
                    <span className="text-text-muted text-sm ml-2 hidden md:inline">{s.detail}</span>
                  )}
                </div>
                <span className={`text-text-muted text-sm transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="standard-accordion-body">
                  <p className={`${colors.text} font-medium text-sm mb-2`}>{s.detail}</p>
                  <p className="text-navy/65 text-[0.88rem] leading-relaxed">{s.deeper}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PillarTabs() {
  const [activePillar, setActivePillar] = useState('technical');
  const observerRef = useRef(null);

  // Track which pillar is in view
  useEffect(() => {
    const sections = pillarKeys.map(k => document.getElementById(`pillar-${k}`));
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const key = entry.target.id.replace('pillar-', '');
            setActivePillar(key);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(s => s && observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToPillar = (key) => {
    document.getElementById(`pillar-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Jump nav — sticky at top */}
      <div className="pillar-jump-nav">
        {pillarKeys.map(k => (
          <button
            key={k}
            className={`pillar-jump-btn ${activePillar === k ? `pillar-jump-active ${colorMap[k].text}` : ''}`}
            onClick={() => scrollToPillar(k)}
          >
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${colorMap[k].bg}`} />
            {pillars[k].name}
          </button>
        ))}
      </div>

      {/* All three pillars rendered sequentially */}
      <div className="space-y-12">
        {pillarKeys.map(k => (
          <PillarSection key={k} pillarKey={k} />
        ))}
      </div>
    </div>
  );
}
