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
          className={`text-left p-5 rounded-xl border-2 transition-all ${
            expanded === b.id
              ? 'border-gold bg-gold/5 shadow-md'
              : 'border-dusty/20 bg-white hover:border-gold/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-display text-lg text-navy tracking-wide">
                {b.name}
              </h4>
              <p className="text-gold font-semibold text-sm">{b.service}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${
              b.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {b.status}
            </span>
          </div>

          {expanded === b.id && (
            <div className="mt-3 pt-3 border-t border-dusty/20 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-navy/40 font-medium">Team:</span>
                <span className="text-navy/70">{b.team}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-navy/40 font-medium">Consumers:</span>
                <span className="text-navy/70">{b.consumers}</span>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
