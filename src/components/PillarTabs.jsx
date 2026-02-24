import { useState } from 'react';
import { pillars } from '../data/pillars';

const tabs = ['technical', 'pedagogical', 'product'];

export default function PillarTabs() {
  const [active, setActive] = useState('technical');
  const pillar = pillars[active];

  const colorMap = {
    technical: { tab: 'active-tech', badge: 'bg-blu-team', accent: 'border-blu-team' },
    pedagogical: { tab: 'active-ped', badge: 'bg-red-team', accent: 'border-red-team' },
    product: { tab: 'active-prod', badge: 'bg-gold', accent: 'border-gold' },
  };

  return (
    <div className="fade-in">
      {/* Tab headers */}
      <div className="flex gap-1 border-b border-dusty/20 mb-6">
        {tabs.map(t => (
          <button
            key={t}
            className={`pillar-tab ${active === t ? colorMap[t].tab : ''}`}
            onClick={() => setActive(t)}
          >
            {pillars[t].name}
          </button>
        ))}
      </div>

      {/* Pillar image */}
      <div className="rounded-lg overflow-hidden mb-6">
        <img
          src={pillar.image}
          alt={pillar.name}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Tagline */}
      <p className="font-display text-2xl text-navy tracking-wide mb-2">
        {pillar.tagline}
      </p>
      <p className="text-navy/70 mb-6">{pillar.description}</p>

      {/* Standards list */}
      <div className="space-y-3">
        {pillar.standards.map(s => (
          <div
            key={s.id}
            className={`p-4 bg-white rounded-lg border-l-4 ${colorMap[active].accent} shadow-sm`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`${colorMap[active].badge} text-white text-xs font-bold px-2 py-0.5 rounded`}>
                {s.id}
              </span>
              <span className="font-semibold text-navy text-sm">{s.name}</span>
            </div>
            <p className="text-sm text-navy/65">{s.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
