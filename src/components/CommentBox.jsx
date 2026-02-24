import { useState, useEffect } from 'react';
import { submitComment, getComments } from '../lib/supabase';

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

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <div className="fade-in mt-6 p-6 bg-white rounded-xl border border-dusty/30 shadow-sm">
      <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-4">
        Share Your Thoughts
      </h4>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-3 py-2 border border-dusty/30 rounded-lg text-sm focus:outline-none focus:border-gold"
        />
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="What do you think about this section? What's missing? What would you change?"
          rows={3}
          className="w-full px-3 py-2 border border-dusty/30 rounded-lg text-sm focus:outline-none focus:border-gold resize-none"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!comment.trim() || submitting}
            className="px-5 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy/90 disabled:opacity-40 transition-all"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          {submitted && (
            <span className="text-sm text-green-600 font-medium">Comment added!</span>
          )}
        </div>
      </form>

      {comments.length > 0 && (
        <div className="mt-6 space-y-3 border-t border-dusty/20 pt-4">
          {comments.map(c => (
            <div key={c.id} className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-navy">{c.commenter_name}</span>
                <span className="text-navy/30">&middot;</span>
                <span className="text-navy/40">{timeAgo(c.created_at)}</span>
              </div>
              <p className="text-navy/70">{c.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
