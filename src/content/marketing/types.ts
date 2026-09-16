import type { StatusKey } from '@/components/marketing/palette';

/** Who the buying decision runs through. */
export interface BuyingRole {
  role: string;
  /** What this person actually wants out of membership. */
  wants: string;
  /** What stops them saying yes. */
  blocks: string;
  weight: 'decyduje' | 'wpływa' | 'płaci' | 'używa';
  /** Where AI Chamber currently reaches them, or null when it does not. */
  reachedVia: string | null;
}

export interface IcpSegment {
  name: string;
  size: string;
  why: string;
  evidence: string;
  fit: number;
  status: StatusKey;
}

export interface ChannelRow {
  channel: string;
  /** 1–5, how much the organisation currently invests. */
  effort: number;
  /** 1–5, measured or best-evidenced return. */
  impact: number;
  status: StatusKey;
  evidence: string;
  verdict: string;
  funnel: 'TOFU' | 'MOFU' | 'BOFU' | 'retencja';
}

export interface AssetRow {
  name: string;
  kind: string;
  exists: 'tak' | 'nie' | 'nieznane';
  gated: 'tak' | 'nie' | 'nieznane';
  funnel: 'TOFU' | 'MOFU' | 'BOFU' | 'retencja';
  note: string;
}

export interface RoadmapItem {
  title: string;
  why: string;
  how: string;
  owner: string;
  effort: 'niski' | 'średni' | 'wysoki';
  impact: number;
  metric: string;
  funnel: 'TOFU' | 'MOFU' | 'BOFU' | 'retencja' | 'pomiar';
  cost: string;
}

export interface Horizon {
  key: string;
  label: string;
  frame: string;
  items: RoadmapItem[];
}

export interface Gap {
  what: string;
  blocks: string;
  howToGet: string;
  effort: 'niski' | 'średni' | 'wysoki';
}
