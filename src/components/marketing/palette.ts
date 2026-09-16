/**
 * Marketing cockpit palette.
 *
 * Every set below was run through the dataviz validator
 * (`scripts/validate_palette.js`) against the light surface #fcfcfb — the
 * results are recorded per set so a reviewer can re-run rather than re-reason.
 */

/**
 * Categorical — identity, fixed order, never cycled. A ninth series folds into
 * "Other" or becomes small multiples; it never gets a generated hue.
 *
 * Validated: lightness band PASS · chroma floor PASS · CVD separation PASS
 * (worst adjacent amber↔green ΔE 9.1 deutan) · normal-vision PASS (worst 19.8)
 * · contrast PASS. ALL CHECKS PASS.
 */
export const CAT = ['#4a56b8', '#00875d', '#b45309', '#0284c7', '#7c3aed'] as const;

export const SERIES = {
  chamber: CAT[0],
  green: CAT[1],
  amber: CAT[2],
  blue: CAT[3],
  violet: CAT[4],
} as const;

/**
 * Ordinal — the funnel stages are ordered, so they get one hue stepping
 * light→dark, not five categorical hues. Using the categorical set here would
 * double-encode position as identity.
 *
 * Validated with --ordinal: lightness monotone PASS · adjacent ΔL PASS ·
 * light-end contrast PASS (2.32:1) · single hue PASS (spread 3°). ALL PASS.
 */
export const FUNNEL_RAMP = ['#9aa5de', '#7581cf', '#5460b6', '#3c4791', '#293277'] as const;

/**
 * Status — reserved tokens for state, never reused as "series 5". These always
 * ship with an icon and a text label, so colour is never the only channel.
 *
 * The validator reports one FAIL on the categorical run: #64748b sits below the
 * chroma floor. That is deliberate — "nieznane" must read neutral, and a status
 * palette is explicitly out of the categorical check's scope. CVD lands at
 * ΔE 8.0 (protan), inside the 6–8 band that is legal precisely because of the
 * icon + label secondary encoding.
 */
export const STATUS = {
  dziala: { fill: '#00875d', label: 'działa' },
  kuleje: { fill: '#d97706', label: 'kuleje' },
  brak: { fill: '#9f1239', label: 'brak' },
  nieznane: { fill: '#64748b', label: 'nieznane' },
} as const;

export type StatusKey = keyof typeof STATUS;

/** Recessive ink. Text never wears a series colour — the mark beside it carries identity. */
export const INK = {
  strong: '#293277',
  body: '#334155',
  muted: '#64748b',
  dim: '#94a3b8',
  grid: '#e2e8f0',
  track: 'rgba(41, 50, 119, 0.07)',
  surface: '#ffffff',
} as const;

/** Mark specs, fixed across every chart in this view (see dataviz/marks-and-anatomy). */
export const MARK = {
  /** Bars never fill their slot; the leftover band is air. */
  maxBarThickness: 24,
  /** Rounded at the data end, square at the baseline. */
  barRadius: 4,
  lineWidth: 2,
  /** Dots carry a 2px surface ring so they stay legible where marks overlap. */
  ringWidth: 2,
  minMarkerSize: 8,
  /** White doing the separating — between stacked segments and adjacent bars alike. */
  surfaceGap: 2,
  /** Pointer targets are bigger than the painted pixels. */
  minHitTarget: 24,
} as const;

export const pl = (n: number, max = 1): string =>
  n.toLocaleString('pl-PL', { maximumFractionDigits: max });

export const plInt = (n: number): string =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const pct = (n: number, max = 1): string => `${pl(n, max)}%`;
