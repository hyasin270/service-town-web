import { useState, useEffect } from 'react';
import { submitVote, getVotes } from '../lib/supabase';

export default function Poll({ sectionId, question, options }) {
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const storageKey = `poll_${sectionId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSelected(saved);
      loadResults();
    }
  }, [sectionId]);

  async function loadResults() {
    const votes = await getVotes(sectionId);
    if (votes.length === 0) {
      // No Supabase connection — show local-only result
      setResults(null);
      return;
    }
    const counts = {};
    options.forEach(o => counts[o] = 0);
    votes.forEach(v => { if (counts[v.vote] !== undefined) counts[v.vote]++; });
    setResults(counts);
  }

  async function handleVote(option) {
    if (selected) return;
    setSubmitting(true);
    setSelected(option);
    localStorage.setItem(storageKey, option);
    await submitVote(sectionId, question, option);
    await loadResults();
    setSubmitting(false);
  }

  const total = results ? Object.values(results).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="fade-in mt-8 p-6 bg-white rounded-xl border border-dusty/30 shadow-sm">
      <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-4">
        Quick Poll
      </h4>
      <p className="text-navy/80 mb-4">{question}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {options.map(option => (
          <button
            key={option}
            className={`poll-btn ${selected === option ? 'selected' : ''}`}
            onClick={() => handleVote(option)}
            disabled={!!selected || submitting}
          >
            {option}
          </button>
        ))}
      </div>

      {selected && !results && (
        <p className="text-sm text-navy/50 italic">Vote recorded! (Connect Supabase for live results)</p>
      )}

      {results && total > 0 && (
        <div className="space-y-2 mt-4">
          {options.map(option => {
            const count = results[option] || 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={option} className="flex items-center gap-3">
                <span className="text-xs font-medium text-navy/60 w-32 truncate">{option}</span>
                <div className="flex-1 poll-bar">
                  <div className="poll-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-semibold text-navy/70 w-10 text-right">{pct}%</span>
              </div>
            );
          })}
          <p className="text-xs text-navy/40 mt-2">{total} vote{total !== 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  );
}
