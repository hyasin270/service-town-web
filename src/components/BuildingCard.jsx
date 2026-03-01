import { useState } from 'react';
import { buildings } from '../data/content';

export default function BuildingCards() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
      {buildings.map(b => (
        <button
          key={b.id}
          onClick={() => setExpanded(expanded === b.id ? null : b.id)}
          className={`text-left p-5 rounded-xl border transition-all ${
            expanded === b.id
              ? 'border-gold bg-[rgba(212,168,67,0.08)] shadow-md'
              : 'border-border bg-surface hover:border-border-accent'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-display text-lg text-text">
                {b.name}
              </h4>
              <p className="text-gold font-semibold text-sm font-ui">{b.service}</p>
            </div>
            <span className={`text-xs font-bold font-ui px-2 py-1 rounded ${
              b.status === 'Active' ? 'bg-[rgba(34,197,94,0.15)] text-[#4ade80]' : 'bg-[rgba(212,168,67,0.15)] text-gold'
            }`}>
              {b.status}
            </span>
          </div>

          {expanded === b.id && (
            <div className="mt-3 pt-3 border-t border-border space-y-2 text-sm font-ui">
              <div className="flex gap-2">
                <span className="text-text-muted font-medium">Team:</span>
                <span className="text-text-secondary">{b.team}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-text-muted font-medium">Consumers:</span>
                <span className="text-text-secondary">{b.consumers}</span>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
