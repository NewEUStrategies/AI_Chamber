/**
 * Dossier content model. The HTML blocks come from a single, first-party source
 * (a 1:1 port of the dossier document) — there is no user-supplied content here,
 * so they are rendered with `dangerouslySetInnerHTML`. The visual layer comes
 * from `src/styles/dossier.css`, which re-skins that markup in platform colours.
 */

/** A chart or panel rendered as a React component instead of static markup. */
export type DossierComponent =
  | 'structure-graph'
  | 'members-chart'
  | 'traffic-cockpit'
  | 'traffic-timeline'
  | 'channel-mix'
  | 'domain-flow'
  | 'domain-detail-chamber'
  | 'domain-detail-summit'
  | 'summit-speakers'
  | 'seo-health'
  | 'link-quality'
  | 'anchor-profile'
  | 'pl-positions'
  | 'ai-prompts'
  | 'glossary-panel';

export interface DossierTab {
  id: string;
  label: string;
  /** Ported markup. Ignored when `blocks` is set. */
  html?: string;
  /** Hand-written tabs mix markup and React panels. */
  blocks?: DossierBlock[];
}

export type DossierBlock =
  | { kind: 'html'; html: string }
  /** `caption` is the source note rendered under the chart; it carries footnotes. */
  | { kind: 'component'; name: DossierComponent; caption?: string }
  | { kind: 'tabs'; group: string; tabs: DossierTab[] };

export interface DossierPage {
  /** Page key, e.g. `przeglad` — drives routing and the sidebar. */
  id: string;
  /** Ordinal shown in the sidebar, e.g. `01`. */
  num: string;
  navLabel: string;
  group: string;
  eyebrow: string | null;
  /** HTML — the title may carry an accented span. */
  title: string;
  /** HTML — the lead carries footnote references. */
  lead: string | null;
  hero?: { tag: string; title: string; lead: string };
  blocks: DossierBlock[];
}
