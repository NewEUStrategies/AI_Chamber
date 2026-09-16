import type { StatusKey } from '@/components/marketing/palette';

/**
 * Conference material model.
 *
 * The page answers one question: what comes out of a single day of recordings,
 * and by when. So the model is organised around the artefact, not around the
 * agenda — an agenda is the input, and the input is already known.
 *
 * Two kinds of fact live here and they are never mixed silently:
 *
 *   `confirmed: true` / a `source` string  — read off the reconnaissance
 *     material (the dossier, the seventy social screenshots, the summit
 *     announcement). These are findings.
 *   `confirmed: false` / a `slot` status   — production skeleton. A shape to
 *     fill after the event, with the constraint already decided. Nothing here
 *     invents what anybody said.
 */

/**
 * The medium decides who produces the artefact and with what tool, so it is
 * the one categorical encoding the page spends a hue on. Everything else
 * (language, type of short, tier) rides on position, a chip, or a filter.
 */
export type Medium = 'wideo' | 'tekst' | 'cytat' | 'foto';

export type ArtifactKey =
  | 'nagranie'
  | 'transkrypcja'
  | 'setki'
  | 'grafika'
  | 'newsletter'
  | 'mediapack'
  | 'zdjecia';

/** One of the seven families cut out of the same day. */
export interface Artifact {
  key: ArtifactKey;
  /** Tab label. */
  label: string;
  /** One line naming the thing, for the cascade row. */
  what: string;
  medium: Medium;
  /** Separately published items one edition yields — the cascade's bar. */
  units: number;
  unitLabel: string;
  /** First day of production, relative to the event day (0 = day zero). */
  fromDay: number;
  /** Day the last unit must be out. */
  dueDay: number;
  /** How the deadline is written in the operating spec. */
  due: string;
  /** The same deadline at nav width — never an ellipsis of `due`. */
  dueShort: string;
  /** Role from the four-role split: Redaktor, Producent, Dystrybutor, Rzecznik. */
  owner: string;
  /** Where the unit lands. */
  lands: string[];
  /** Assessment of the 2026 edition, from outside. */
  status: StatusKey;
  /** What that assessment rests on. Never an opinion presented as a reading. */
  evidence: string;
  /** Why the artefact exists at all. */
  why: string;
  /** Publication is blocked until each of these is true. */
  gate: string[];
}

/* ---------------------------------------------------------------- *
 * The recording                                                    *
 * ---------------------------------------------------------------- */

export type Stage = 'keynote' | 'panel' | 'prezentacja' | 'ceremonia';

export interface Session {
  key: string;
  no: number;
  title: string;
  /** Minutes from the start of the stream. */
  start: number;
  minutes: number;
  lang: 'pl' | 'en';
  stage: Stage;
  /** Confirmed names where the announcement gave them, role slots otherwise. */
  speakers: string[];
  /** True when the line-up comes from the published announcement. */
  confirmed: boolean;
  /** Why this block is worth cutting. */
  yield: string;
}

export interface Chapter {
  /** Minutes from the start of the stream — the YouTube chapter marker. */
  at: number;
  label: string;
  session: string;
}

/* ---------------------------------------------------------------- *
 * Derivatives                                                      *
 * ---------------------------------------------------------------- */

export type ShortKind = 'gorąca' | 'regulacyjna' | 'członkowska' | 'konfrontacyjna';

export interface Short {
  id: string;
  kind: ShortKind;
  /** What the clip is about. A description of the moment, not a quoted line. */
  thesis: string;
  session: string;
  /** Minutes from the start of the stream — where the cut begins. */
  at: number;
  seconds: number;
  speakerSlot: string;
  /** Days after the event. */
  publishDay: number;
  formats: string[];
}

export type CardKind = 'liczba' | 'cytat';

export interface QuoteCard {
  id: string;
  kind: CardKind;
  /** A sourced figure for `liczba`; the slot pattern for `cytat`. */
  text: string;
  attribution: string;
  /** Provenance of the figure. Required on every `liczba` card. */
  source?: string;
  session: string;
  at: number;
  status: StatusKey;
  note?: string;
}

export type Tier = 'A' | 'B' | 'C';

export interface MediaQuote {
  id: string;
  who: string;
  purpose: string;
  release: string;
  authorised: 'zwolniony' | 'do autoryzacji' | 'slot';
  tiers: Tier[];
}

export interface EmbargoStep {
  key: string;
  /** Days relative to the event day; fractions are hours on day zero. */
  at: number;
  atLabel: string;
  /** Which tiers this step reaches. The order of the steps is the mechanism. */
  tiers: Tier[];
  what: string;
  why: string;
}

export interface MailBlock {
  key: string;
  label: string;
  purpose: string;
  budgetWords: number;
  /** Draft copy. Square brackets mark a figure to confirm before sending. */
  draft: string;
}

export interface Shot {
  id: string;
  label: string;
  moment: string;
  /** Minutes from the moment itself; null when the shot ships the next day. */
  slaMin: number | null;
  slaLabel: string;
  ratio: '3:2' | '4:5' | '1:1' | '16:9';
  feeds: string[];
  priority: 'obowiązkowe' | 'jeśli zdążymy';
  composition: string;
}

/* ---------------------------------------------------------------- *
 * Calendar                                                         *
 * ---------------------------------------------------------------- */

export type Phase = 'przed' | 'dzien' | 'po';

export interface Milestone {
  /** Days relative to the event day. */
  day: number;
  label: string;
  title: string;
  what: string;
  phase: Phase;
  artifacts: ArtifactKey[];
}

/** Day-zero clock: minutes from the moment that triggers the deliverable. */
export interface SlaItem {
  label: string;
  minutes: number;
  trigger: string;
  artifact: ArtifactKey;
}

export interface Unlock {
  what: string;
  why: string;
  status: StatusKey;
}
