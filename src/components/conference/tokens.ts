import type { Medium } from '@/content/conference/types';
import { RECORDING } from '@/content/conference/event';
import { CAT, INK } from '@/components/marketing/palette';

/**
 * The conference view runs on the marketing cockpit's palette — the same five
 * categorical hues, the same status tokens, the same mark specs, all already
 * through the validator against this surface. A second palette for a second
 * view would mean a reader relearning what blue means one tab over.
 *
 * Exactly one dimension on this page spends a hue: the medium. It is the
 * dimension that decides who produces the artefact and with what tool, so it
 * is the one worth spending on. Everything else that could have been coloured
 * — language, kind of short, media tier, phase of the calendar — rides on
 * position, a chip, or a filter instead. That keeps the page inside four of
 * the five validated slots and keeps "blue" meaning one thing throughout.
 */
export const MEDIUM_COLOR: Record<Medium, string> = {
  wideo: CAT[0],
  tekst: CAT[1],
  cytat: CAT[2],
  foto: CAT[3],
};

/**
 * Accent for the proposed-actions half of the page.
 *
 * The four media above spend four of the five validated categorical slots.
 * This is the fifth and last, and the plan section uses it as one colour
 * throughout: the plan is a single subject, and giving each of its four
 * channels its own hue would have meant reusing slots that already mean a
 * medium two clicks away.
 */
export const PLAN_ACCENT = CAT[4];

/**
 * The source of everything on the page is not a series — it is where the
 * series come from. It wears recessive ink so the seven derivatives keep the
 * only colour in the cascade.
 */
export const SOURCE_COLOR = INK.strong;

/**
 * Calendar phases are chrome, not data: the milestones sitting on them carry
 * the artefact colours, so the bands underneath stay neutral tints. Colouring
 * them would put two categorical scales on one axis.
 */
export const PHASE_TINT = {
  przed: 'rgba(41, 50, 119, 0.04)',
  dzien: 'rgba(41, 50, 119, 0.10)',
  po: 'rgba(41, 50, 119, 0.06)',
} as const;

/** Seconds → `0:45`. Shorts are timed in seconds, sessions in minutes. */
export const clock = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/**
 * Minute of the stream → percent of the recording. One scale, defined once and
 * shared: the ribbon, the chapter list and the cut map all place marks with
 * it, so a timecode cannot drift between views.
 */
export const ribbonPos = (minute: number) => (minute / RECORDING.minutes) * 100;

/**
 * Tailwind transform for an axis label sitting at `percent` along its axis.
 * Labels at the ends anchor to the edge; everything between centres on its
 * tick. Centring the end labels too would hang half of each one outside the
 * plot — visible, because nothing clips it, and misaligned with the tick it
 * is supposed to name.
 */
export const edgeAnchor = (percent: number): string =>
  percent <= 2 ? 'translate-x-0' : percent >= 98 ? '-translate-x-full' : '-translate-x-1/2';
