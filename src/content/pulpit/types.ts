import type { StatusKey } from '@/components/marketing/palette';
import type { Route } from '@/lib/route';

/** The six areas the whole analysis is organised around. */
export type AreaKey = 'lejek' | 'social' | 'email' | 'www' | 'mediapack' | 'konferencja';

export interface Area {
  key: AreaKey;
  label: string;
  /** One line: what this area is responsible for. */
  what: string;
  /** Where the detail for this area lives. */
  to: Route;
  toLabel: string;
}

export type Effort = 'niski' | 'średni' | 'wysoki';
export type Horizon = '0-30' | '30-90' | '90+';

/**
 * One line of the register: a current state set against a recommendation.
 *
 * Both halves are one sentence each, on purpose. The Pulpit is a pointer, not
 * a fourth copy of the analysis — the argument, the evidence and the method
 * live behind `to`, and restating them here would create a version that drifts
 * from the one people actually read.
 */
export interface Entry {
  id: string;
  area: AreaKey;
  /** What the row is about. */
  subject: string;
  /** Stan aktualny. */
  now: string;
  /** What that reading rests on. `nieznane` rows say why it cannot be settled. */
  evidence: string;
  status: StatusKey;
  /** Rekomendacja. */
  recommendation: string;
  effort: Effort;
  /** 1–5, assessed. Nothing here promises a number the chamber cannot measure. */
  impact: number;
  horizon: Horizon;
  /**
   * How to settle a `nieznane` row, and what it costs to find out.
   *
   * A register that says "we cannot tell from outside" and stops there is half
   * an answer. Most of these resolve in one question or one DNS lookup, and
   * saying which turns an admission into the first item of the agenda.
   */
  howToCheck?: string;
  /** Where the recommendation is worked out in full. */
  to: Route;
  toLabel: string;
  /** Optional second destination: the page that documents the reading. */
  evidenceTo?: Route;
  evidenceLabel?: string;
}
