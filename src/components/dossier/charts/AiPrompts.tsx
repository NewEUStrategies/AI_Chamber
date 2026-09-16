import { AI_VISIBILITY, CHATGPT_PROMPTS, GEMINI_PROMPTS, SEO_DERIVED, type AiPrompt } from '@/content/dossier/seo';
import { Term } from '@/components/dossier/Term';
import { SERIES } from './trafficPalette';

const INTENT: Record<string, string> = {
  Informacyjna: 'pill',
  Komercyjna: 'pill pos',
  Transakcyjna: 'pill warn',
  Nawigacyjna: 'pill cyan',
};

function PromptList({ title, prompts, color }: { title: string; prompts: AiPrompt[]; color: string }) {
  const commercial = prompts.filter((p) => p.main === 'Komercyjna' || p.secondary === 'Komercyjna').length;
  return (
    <div className="card">
      <h3>
        <span className="inline-flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
          {title}
        </span>
        <span className="mono">{prompts.length} promptów</span>
      </h3>
      <p>
        Zapytania, jakich model spodziewa się od polskich użytkowników w obszarze tematycznym tej
        domeny. {commercial} z {prompts.length} ma charakter komercyjny — czyli pada w momencie, gdy
        ktoś szuka dostawcy, a nie wiedzy. Etykieta przy każdym zapytaniu to jego{' '}
        <Term k="intencja">intencja</Term>.
      </p>
      <ul className="matters" style={{ marginTop: '12px' }}>
        {prompts.map((p) => (
          <li key={p.prompt}>
            {p.prompt}{' '}
            <span className={INTENT[p.main]}>{p.main}</span>
            {p.secondary && (
              <span className="pill" style={{ marginLeft: '6px' }}>
                + {p.secondary}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** How the domain performs in AI answers, and what people actually ask there. */
export function AiPrompts() {
  const citedTotal = AI_VISIBILITY.reduce((n, e) => n + e.citedPages, 0);
  return (
    <div className="space-y-5">
      <div className="card">
        <h3>Obecność w odpowiedziach generowanych przez AI</h3>
        <p>
          Semrush śledzi, czy marka pojawia się w odpowiedziach modeli i czy jej strony bywają
          cytowane jako źródło. To dwie różne rzeczy: cytowanie strony bez wymienienia nazwy oznacza,
          że treść pracuje, ale marka na tym nie zyskuje.
        </p>
        <table className="data" style={{ marginTop: '12px' }}>
          <thead>
            <tr>
              <th>Silnik</th>
              <th>Wzmianki marki</th>
              <th>Cytowane strony</th>
            </tr>
          </thead>
          <tbody>
            {AI_VISIBILITY.map((e) => (
              <tr key={e.engine}>
                <td>{e.engine}</td>
                <td className="num tabnum">{e.mentions}</td>
                <td className="num tabnum">{e.citedPages}</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: 800 }}>Razem</td>
              <td className="num tabnum" style={{ fontWeight: 800 }}>
                0
              </td>
              <td className="num tabnum" style={{ fontWeight: 800 }}>
                {citedTotal}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="note">
          Zero wzmianek przy {citedTotal} cytowanych stronach. Modele sięgają po treści izby, ale nie
          podają jej nazwy — organizacja jest źródłem, nie marką.
        </p>
      </div>

      <div className="card">
        <h3>Dlaczego to ma znaczenie akurat teraz</h3>
        <ul className="matters">
          <li>
            {SEO_DERIVED.commercialPrompts} z {SEO_DERIVED.totalPrompts} zapytań, jakie modele wiążą z
            tym obszarem, to zapytania komercyjne — ktoś szuka dostawcy, szkolenia, finansowania albo
            partnera do projektu. <span className="v">{SEO_DERIVED.commercialPrompts}/{SEO_DERIVED.totalPrompts}</span>
          </li>
          <li>
            Pytania Gemini są niemal wprost opisem tego, czym izba się zajmuje: wsparcie dla firm
            inwestujących w AI, finansowanie innowacji, szkolenia dla kadry, partnerzy do projektów
            badawczo-rozwojowych. Izba odpowiada na te potrzeby, ale nie pojawia się w odpowiedziach.
          </li>
          <li>
            Żaden prompt nie zawiera nazwy organizacji. Nikt nie pyta o AI Chamber — pytają o problem,
            który izba rozwiązuje. <span className="v">0 zapytań o markę</span>
          </li>
          <li>
            Modele językowe stają się kanałem pierwszego kontaktu przy wyborze dostawcy. Przy zerowej
            widoczności ten kanał dziś nie działa ani na korzyść izby, ani przeciw niej — jest po
            prostu pusty. <span className="v">wniosek M5</span>
          </li>
        </ul>
      </div>

      <div className="grid2">
        <PromptList title="ChatGPT" prompts={CHATGPT_PROMPTS} color={SERIES.chamber} />
        <PromptList title="Gemini" prompts={GEMINI_PROMPTS} color={SERIES.summit} />
      </div>
    </div>
  );
}
