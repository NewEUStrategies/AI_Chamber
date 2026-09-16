import { GLOSSARY_ORDER } from '@/content/dossier/glossary';
import { GLOSSARY } from '@/content/dossier/seo';

/**
 * Every abbreviation used on the SEO page, spelled out in one place.
 * The same entries power the inline tooltips.
 */
export function GlossaryPanel() {
  return (
    <div className="card">
      <h3>
        Słownik pojęć <span className="mono">{GLOSSARY_ORDER.length} haseł</span>
      </h3>
      <p>
        Każdy skrót użyty na tej stronie ma podpowiedź pod kursorem i pod klawiszem Tab. Poniżej te
        same wyjaśnienia zebrane w jednym miejscu — do przeczytania przed rozmową, żeby żadne pojęcie
        nie zaskoczyło.
      </p>
      <div className="gloss" style={{ marginTop: '16px' }}>
        {GLOSSARY_ORDER.map((key) => {
          const e = GLOSSARY[key];
          if (!e) return null;
          return (
            <div className="row" key={key}>
              <div className="k">
                {key}
                {e.full.toLowerCase() !== key.toLowerCase() && <small>{e.full}</small>}
              </div>
              <div className="d">
                {e.body}
                {e.scale && <span className="sc">Skala: {e.scale}</span>}
                {e.reading && <span className="rd">{e.reading}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
