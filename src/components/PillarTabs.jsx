import { useState } from 'react';
import { pillars } from '../data/pillars';

const tabs = ['technical', 'pedagogical', 'product'];

export default function PillarTabs() {
  const [active, setActive] = useState('technical');
  const [expandedStandard, setExpandedStandard] = useState(null);
  const pillar = pillars[active];

  const colorMap = {
    technical: { tab: 'active-tech', badge: 'bg-blu-team', accent: 'border-blu-team', text: 'text-blu-team', light: 'bg-blu-team/5' },
    pedagogical: { tab: 'active-ped', badge: 'bg-red-team', accent: 'border-red-team', text: 'text-red-team', light: 'bg-red-team/5' },
    product: { tab: 'active-prod', badge: 'bg-gold', accent: 'border-gold', text: 'text-gold', light: 'bg-gold/5' },
  };

  const handleTabChange = (t) => {
    setActive(t);
    setExpandedStandard(null);
  };

  return (
    <div className="fade-in">
      {/* Tab headers */}
      <div className="flex gap-1 border-b border-dusty/20 mb-6">
        {tabs.map(t => (
          <button
            key={t}
            className={`pillar-tab ${active === t ? colorMap[t].tab : ''}`}
            onClick={() => handleTabChange(t)}
          >
            {pillars[t].name}
          </button>
        ))}
      </div>

      {/* Pillar image — full width */}
      <div className="rounded-lg overflow-hidden mb-6">
        <img
          src={pillar.image}
          alt={pillar.name}
          className="w-full h-auto"
        />
      </div>

      {/* Tagline */}
      <p className="font-display text-2xl text-navy tracking-wide mb-2">
        {pillar.tagline}
      </p>
      <p className="text-navy/70 mb-6">{pillar.description}</p>

      {/* Standards list — expandable accordion */}
      <div className="space-y-2">
        {pillar.standards.map(s => {
          const isExpanded = expandedStandard === s.id;
          return (
            <div key={s.id} className={`standard-accordion ${isExpanded ? `border-l-4 ${colorMap[active].accent}` : ''}`}>
              <button
                className="standard-accordion-header"
                onClick={() => setExpandedStandard(isExpanded ? null : s.id)}
              >
                <span className={`${colorMap[active].badge} text-white text-xs font-bold px-2 py-0.5 rounded shrink-0`}>
                  {s.id}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-navy text-sm">{s.name}</span>
                  {!isExpanded && (
                    <span className="text-navy/50 text-sm ml-2 hidden md:inline">{s.detail}</span>
                  )}
                </div>
                <span className={`text-navy/30 text-sm transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="standard-accordion-body">
                  <p className={`${colorMap[active].text} font-medium text-sm mb-2`}>{s.detail}</p>
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
