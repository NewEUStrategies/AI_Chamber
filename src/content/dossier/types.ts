/**
 * Dossier content model. The HTML blocks come from a single, first-party source
 * (a 1:1 port of the dossier document) — there is no user-supplied content here,
 * so they are rendered with `dangerouslySetInnerHTML`. The visual layer comes
 * from `src/styles/dossier.css`, which re-skins that markup in platform colours.
 */

/** A chart rendered as a React component instead of the source document's SVG. */
export type DossierComponent = 'structure-graph' | 'members-chart';

export interface DossierTab {
  id: string;
  label: string;
  html: string;
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
