import { useState, useEffect } from 'react';
import { submitComment, getComments } from '../lib/supabase';

const STICKY_COLORS = ['sticky-yellow', 'sticky-blue', 'sticky-pink', 'sticky-green', 'sticky-orange', 'sticky-purple'];
const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0', '-rotate-1'];

function colorForIndex(i) {
  return STICKY_COLORS[i % STICKY_COLORS.length];
}

function rotationForIndex(i) {
  return ROTATIONS[i % ROTATIONS.length];
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function CommentBox({ sectionId }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadComments();
    const savedName = localStorage.getItem('service_town_name');
    if (savedName) setName(savedName);
  }, [sectionId]);

  async function loadComments() {
    const data = await getComments(sectionId);
    setComments(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    if (name) localStorage.setItem('service_town_name', name);
    await submitComment(sectionId, name || 'Anonymous', comment.trim());
    setComment('');
    setSubmitted(true);
    await loadComments();
    setSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="fade-in mt-8">
      {/* Sticky notes wall — existing comments */}
      {comments.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-bold text-dusty uppercase tracking-wider mb-3">
            Notes on the wall ({comments.length})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {comments.map((c, i) => (
              <div
                key={c.id}
                className={`sticky-note ${colorForIndex(i)} ${rotationForIndex(i)} hover:rotate-0 hover:scale-105 transition-transform`}
              >
                <div className="sticky-author">{c.commenter_name}</div>
                <div className="sticky-text" style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem' }}>
                  {c.comment}
                </div>
                <div className="sticky-time">{timeAgo(c.created_at)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add your own sticky note */}
      <div className="sticky-note sticky-yellow max-w-sm rotate-0" style={{ margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-transparent border-b border-current/20 pb-1 mb-3 text-sm font-bold uppercase tracking-wider placeholder:text-current/30 focus:outline-none"
            style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem', fontWeight: 600 }}
          />
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Scribble your thoughts here..."
            rows={3}
            className="w-full bg-transparent border-none text-sm placeholder:text-current/30 focus:outline-none resize-none"
            style={{ fontFamily: "'Caveat', cursive", fontSize: '1.05rem' }}
          />
          <div className="flex items-center gap-3 mt-1">
            <button
              type="submit"
              disabled={!comment.trim() || submitting}
              className="px-4 py-1.5 bg-current/15 text-sm font-semibold rounded hover:bg-current/25 disabled:opacity-30 transition-all"
              style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem' }}
            >
              {submitting ? 'Pinning...' : 'Pin to wall'}
            </button>
            {submitted && (
              <span className="text-xs font-medium opacity-60">Pinned!</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
