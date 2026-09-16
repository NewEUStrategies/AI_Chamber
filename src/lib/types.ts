export type ApplicationStatus =
  | 'new'
  | 'in_review'
  | 'interview'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export type AiMaturity = 'exploring' | 'implementing' | 'advanced';

export interface MembershipApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  country: string;
  city: string | null;
  sector: string;
  company_size: string;
  employees: number | null;
  ai_maturity: string;
  motivation: string | null;
  status: ApplicationStatus;
  score: number | null;
  reviewer: string | null;
  notes: string | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export const STATUS_ORDER: ApplicationStatus[] = [
  'new',
  'in_review',
  'interview',
  'accepted',
  'rejected',
  'withdrawn',
];

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  new: 'Nowa',
  in_review: 'Weryfikacja',
  interview: 'Rozmowa',
  accepted: 'Przyjęta',
  rejected: 'Odrzucona',
  withdrawn: 'Wycofana',
};

export const SECTORS = [
  'RegTech',
  'Data Analytics',
  'AI R&D',
  'HealthTech',
  'AgriTech',
  'LegalTech',
  'Manufacturing',
  'Cybersecurity',
  'EnergyTech',
  'FinTech',
  'Computer Vision',
  'MarTech',
  'Logistics',
  'EdTech',
  'Other',
];

export const CEE_COUNTRIES = [
  'Poland',
  'Czechia',
  'Lithuania',
  'Estonia',
  'Latvia',
  'Slovakia',
  'Hungary',
  'Romania',
  'Bulgaria',
  'Croatia',
  'Slovenia',
  'Serbia',
  'Ukraine',
  'Other',
];

export function statusClass(status: ApplicationStatus): string {
  switch (status) {
    case 'new':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    case 'in_review':
      return 'bg-emerald-50 text-chamber-green-deep border-chamber-green/40';
    case 'interview':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'accepted':
      return 'bg-chamber-navy text-white border-chamber-navy';
    case 'rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'withdrawn':
      return 'bg-slate-100 text-slate-500 border-slate-200';
  }
}

export function maturityLabel(m: string): string {
  switch (m) {
    case 'exploring':
      return 'Eksploracja';
    case 'implementing':
      return 'Wdrażanie';
    case 'advanced':
      return 'Zaawansowana';
    default:
      return m;
  }
}

export function companySizeLabel(s: string): string {
  switch (s) {
    case 'micro':
      return 'Mikro (<10)';
    case 'small':
      return 'Mała (<50)';
    case 'medium':
      return 'Średnia (<250)';
    default:
      return s;
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days < 1) return 'dziś';
  if (days === 1) return 'wczoraj';
  if (days < 30) return `${days} dni temu`;
  const months = Math.floor(days / 30);
  return `${months} mies. temu`;
}
