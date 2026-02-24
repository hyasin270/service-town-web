import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qmjmxfudvghnxqhlfcsa.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Polls
export async function submitVote(sectionId, pollQuestion, vote, voterName = 'Anonymous') {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('service_town_polls')
    .insert([{ section_id: sectionId, poll_question: pollQuestion, vote, voter_name: voterName }]);
  if (error) console.error('Vote error:', error);
  return data;
}

export async function getVotes(sectionId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('service_town_polls')
    .select('vote')
    .eq('section_id', sectionId);
  if (error) { console.error('Get votes error:', error); return []; }
  return data || [];
}

// Comments
export async function submitComment(sectionId, commenterName, comment) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('service_town_comments')
    .insert([{ section_id: sectionId, commenter_name: commenterName || 'Anonymous', comment }]);
  if (error) console.error('Comment error:', error);
  return data;
}

export async function getComments(sectionId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('service_town_comments')
    .select('*')
    .eq('section_id', sectionId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) { console.error('Get comments error:', error); return []; }
  return data || [];
}
