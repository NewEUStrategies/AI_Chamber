import { TERMS } from '@/content/dossier/glossary';

/**
 * Abbreviation with an explanatory tooltip — the React counterpart of `g()`
 * from `content/dossier/glossary.ts`. Same markup, same styling, opens on
 * hover and on keyboard focus.
 */
export function Term({ k, children }: { k: string; children?: React.ReactNode }) {
  const entry = TERMS[k];
  if (!entry) return <>{children ?? k}</>;
  return (
    <span className="term" tabIndex={0} role="note" aria-label={`${entry.full} — wyjaśnienie`}>
      {children ?? k}
      <span className="tt">
        <b>{entry.full}</b>
        {entry.body}
        {entry.scale && <span className="sc">Skala: {entry.scale}</span>}
        {entry.reading && <span className="rd">{entry.reading}</span>}
      </span>
    </span>
  );
}
