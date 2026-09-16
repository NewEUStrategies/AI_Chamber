import type { StatusKey } from '@/components/marketing/palette';
import type { PostFormat } from '@/content/dossier/social';

/**
 * Proposed actions — the operating plan, as opposed to the diagnosis.
 *
 * The rest of the cockpit answers "what is the state of this". These files
 * answer "what do we do about it", and they keep the same rule about numbers:
 * anything countable is derived from the reconnaissance data in
 * `@/content/dossier/*` rather than retyped here. What lives in this folder is
 * the recommendation — the part that is a judgement and should read as one.
 */

/** A channel and the decision taken about it. */
export interface ChannelDecision {
  key: string;
  channel: string;
  /** The decision in one line. */
  verdict: string;
  status: StatusKey;
  body: string;
  /** The minimum that has to happen if the decision is "keep". */
  actions: string[];
}

/** Direction of travel for a format. Always shipped with an icon and a label. */
export type RecDirection = 'zwiększyć mocno' | 'zwiększyć' | 'utrzymać' | 'wygaszać';

export interface FormatRec {
  /** Joins to `FORMATS` in the dossier data, which carries the counts. */
  key: PostFormat;
  /**
   * Display label for this section. The dossier data writes every string
   * without Polish diacritics — a convention of that whole file, read off
   * rendered post cards — and this section does not, so the label is restated
   * here rather than changing a file that a dozen other charts render from.
   */
  label: string;
  rec: RecDirection;
  /** What the archived posts actually show. */
  observation: string;
  /** Where the recommendation is more than "more of this". */
  comment?: string;
}

export interface Ritual {
  day: string;
  /** Weekday, 0 = Monday. Explicit, because matching on the name silently
      dropped Friday — „Piątek” does not start with „Pt”. */
  dayIndex: number;
  name: string;
  what: string;
  format: string;
}

export interface VideoFormat {
  name: string;
  spec: string;
  cadence: string;
  what: string;
  why: string;
}

export interface WrittenFormat {
  name: string;
  what: string;
  use: string;
}

/** Ordered: the sequence of arguments is itself the recommendation. */
export interface Emphasis {
  what: string;
  why: string;
  /** Where the argument can be turned against us if handled carelessly. */
  caution?: string;
}

export interface Sequence {
  name: string;
  trigger: string;
  shape: string;
  /** Number of mails, for the shape column. */
  mails: number | null;
  /** Days the sequence spans, for the shape column. */
  days: number | null;
  why: string;
}

export interface Section {
  name: string;
  what: string;
  why: string;
}

export interface WatchRow {
  channel: string;
  /** What the reconnaissance read. */
  baseline: string;
  /** What to compare against it on the next read. */
  watch: string[];
}
