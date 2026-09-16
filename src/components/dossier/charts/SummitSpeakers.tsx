import { SUMMIT_SPEAKERS } from '@/content/dossier/analytics';

/** Announced speaker line-up of the CEE AI Summit 2026. */
export function SummitSpeakers() {
  const eu = SUMMIT_SPEAKERS.filter((s) => s.tier === 'eu');
  const gov = SUMMIT_SPEAKERS.filter((s) => s.tier === 'government');

  return (
    <div className="card">
      <h3>
        Zapowiedziani prelegenci <span className="mono">stan na sierpień 2026</span>
      </h3>
      <p>
        Skład potwierdza, że summit jest przedsięwzięciem na poziomie rządowym, a nie branżowym
        spotkaniem firm. Jedna komisarz Unii Europejskiej, dwóch wicepremierów, dwóch ministrów
        i sekretarz stanu — z pięciu krajów.
      </p>

      <div className="metrics c3" style={{ marginTop: '16px' }}>
        <div className="metric amber">
          <div className="n">{SUMMIT_SPEAKERS.length}</div>
          <div className="l">zapowiedzianych nazwisk rangi rządowej</div>
        </div>
        <div className="metric cyan">
          <div className="n">{eu.length}</div>
          <div className="l">przedstawiciel Komisji Europejskiej</div>
        </div>
        <div className="metric">
          <div className="n">{new Set(SUMMIT_SPEAKERS.map((s) => s.country)).size}</div>
          <div className="l">reprezentowanych krajów i instytucji</div>
        </div>
      </div>

      <table className="data" style={{ marginTop: '16px' }}>
        <thead>
          <tr>
            <th>Osoba</th>
            <th>Funkcja</th>
            <th>Kraj / instytucja</th>
          </tr>
        </thead>
        <tbody>
          {[...eu, ...gov].map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td>
                {s.country}
                {s.tier === 'eu' && <span className="pill pos" style={{ marginLeft: '8px' }}>poziom UE</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="note">
        Lista odczytana z podglądu strony ceeaisummit.eu zamieszczonego w raporcie SimilarWeb.
        Przed rozmową warto sprawdzić, czy skład się nie zmienił — na trzy tygodnie przed
        wydarzeniem agenda zwykle jeszcze rośnie.
      </p>
    </div>
  );
}
