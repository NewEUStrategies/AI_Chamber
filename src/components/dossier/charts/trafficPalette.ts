/**
 * Categorical palette for the traffic charts — two entities, fixed order.
 *
 * Validated with the dataviz palette checker against a light surface:
 * lightness band PASS, chroma floor PASS, CVD separation ΔE 20.1 (deutan) /
 * 8.4 (tritan), normal-vision ΔE 23.3, contrast ≥ 3:1 PASS.
 *
 * `chamber` is the platform navy lightened into the passing band — the raw
 * #293277 sits below it and fails the lightness check for chart marks.
 */
export const SERIES = {
  chamber: '#4a56b8',
  summit: '#00875d',
} as const;

/** Recessive ink tokens — values and labels never wear the series colour. */
export const INK = {
  strong: '#293277',
  body: '#334155',
  muted: '#64748b',
  dim: '#94a3b8',
  grid: '#e2e8f0',
  track: 'rgba(41, 50, 119, 0.07)',
  surface: '#ffffff',
} as const;

export { plNum as plFormat } from '@/content/dossier/analytics';
export const plPct = (n: number): string => `${n.toLocaleString('pl-PL', { maximumFractionDigits: 2 })}%`;
