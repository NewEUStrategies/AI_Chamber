import { SOCIAL_GLOSSARY_ORDER, TERMS } from '@/content/dossier/glossary';

/** The social-media terms, collected in one place. */
export function SocialGlossary() {
  return (
    <div className="card">
      <h3>
        Słownik pojęć
        <span className="mono">{SOCIAL_GLOSSARY_ORDER.length} haseł</span>
      </h3>
      <p>
        Te same hasła, które otwierają się pod kursorem w treści zakładki. Pełny słownik pojęć
        wyszukiwarkowych zamyka zakładkę „Widoczność w wyszukiwarce".
      </p>
      <div className="gloss" style={{ marginTop: '14px' }}>
        {SOCIAL_GLOSSARY_ORDER.map((k) => {
          const e = TERMS[k];
          if (!e) return null;
          return (
            <div className="gi" key={k}>
              <div className="gk">{e.full}</div>
              <div className="gv">
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
