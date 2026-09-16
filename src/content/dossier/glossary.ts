import { GLOSSARY } from './seo';
import { SOCIAL_GLOSSARY } from './social';

/** Every term the dossier explains, from both thematic pages. */
export const TERMS = { ...GLOSSARY, ...SOCIAL_GLOSSARY };

/**
 * Markup for an abbreviation with an explanatory tooltip.
 *
 * Mirrors the footnote mechanism: pure CSS, opens on hover and on keyboard
 * focus, so every abbreviation on the page can be read without leaving it.
 * Styling lives in `src/styles/dossier.css` under `.term`.
 */
export function g(key: keyof typeof TERMS | string, label?: string): string {
  const entry = TERMS[key];
  if (!entry) return label ?? String(key);
  const shown = label ?? String(key);
  const parts = [`<b>${entry.full}</b>`, entry.body];
  if (entry.scale) parts.push(`<span class="sc">Skala: ${entry.scale}</span>`);
  if (entry.reading) parts.push(`<span class="rd">${entry.reading}</span>`);
  return (
    `<span class="term" tabindex="0" role="note" aria-label="${entry.full} — wyjaśnienie">` +
    `${shown}<span class="tt">${parts.join(' ')}</span></span>`
  );
}

/** Search-visibility terms, in reading order. */
export const GLOSSARY_ORDER: string[] = [
  'AS',
  'Page AS',
  'DR',
  'domena odsyłająca',
  'link zwrotny',
  'follow',
  'nofollow',
  'UGC',
  'link sponsorowany',
  'anchor',
  'anchor reklamowy',
  'TLD',
  'PBN',
  'disavow',
  'negatywne SEO',
  'ruch organiczny',
  'wolumen',
  'wyszukiwania miesięczne',
  'pozycja',
  'CPC',
  'TSK',
  'intencja',
  'SERP',
];

/** Social-media terms, in reading order. */
export const SOCIAL_GLOSSARY_ORDER: string[] = [
  'ER',
  'zasieg',
  'impresje',
  'reakcja',
  'udostepnienie',
  'karuzela PDF',
  'LinkedIn Live',
  'newsletter LinkedIn',
  'CTA',
  'cross-posting',
];
