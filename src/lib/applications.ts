import { supabase } from '@/lib/supabase';
import type { MembershipApplication } from '@/lib/types';

export async function fetchApplications(): Promise<MembershipApplication[]> {
  const { data, error } = await supabase
    .from('membership_applications')
    .select('*')
    .order('submitted_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as MembershipApplication[];
}

export async function updateApplication(
  id: string,
  patch: Partial<Pick<MembershipApplication, 'status' | 'score' | 'reviewer' | 'notes'>>
): Promise<void> {
  const { error } = await supabase
    .from('membership_applications')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase.from('membership_applications').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export function scoreColor(score: number): string {
  if (score >= 80) return 'text-chamber-green-deep';
  if (score >= 60) return 'text-sky-700';
  if (score >= 40) return 'text-amber-600';
  return 'text-rose-600';
}
