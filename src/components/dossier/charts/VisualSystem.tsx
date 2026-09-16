import { SOCIAL_DERIVED, VISUALS } from '@/content/dossier/social';
import { INK, SERIES } from './trafficPalette';

const total = VISUALS.reduce((n, v) => n + v.posts, 0);

/** Audit of the visual layer: how many conventions, and whose. */
export function VisualSystem() {
  return (
    <div className="space-y-5">
      <div className="card">
        <h3>
          Warstwa wizualna
          <span className="mono">{SOCIAL_DERIVED.visualFamilies} konwencji</span>
        </h3>
        <p>
          Każdy post w próbie przypisany do rodziny wizualnej. Pasek pokazuje, jaką część
          publikacji obsługuje dana konwencja.
        </p>

        <div className="mt-5 flex h-4 gap-[2px] overflow-hidden rounded-full">
          {VISUALS.map((v, i) => (
            <span
              key={v.name}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${(v.posts / total) * 100}%`,
                background: v.own
                  ? `color-mix(in srgb, ${SERIES.chamber} ${100 - i * 12}%, white)`
                  : INK.dim,
              }}
              title={`${v.name}: ${v.posts}`}
            />
          ))}
        </div>

        <table className="data" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>Konwencja</th>
              <th>Postów</th>
              <th>Gdzie</th>
              <th>Cechy</th>
              <th>Czyja</th>
            </tr>
          </thead>
          <tbody>
            {VISUALS.map((v) => (
              <tr key={v.name}>
                <td style={{ fontWeight: 700 }}>{v.name}</td>
                <td className="num tabnum">{v.posts}</td>
                <td>{v.where}</td>
                <td>{v.traits}</td>
                <td className="num">
                  {v.own ? <span className="pill pos">własna</span> : <span className="pill warn">partnera</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="matters-title" style={{ marginTop: '18px' }}>
          Co z tego wynika
        </div>
        <ul className="matters">
          <li>
            <b>Szczyt ma własną identyfikację, izba ma swoją.</b> Zielona linia CEE Summit i
            granatowa linia AI Chamber to dwa osobne systemy. Dla odbiorcy przewijającego feed
            to dwie różne organizacje. <span className="v">2 systemy</span>
          </li>
          <li>
            <b>Karty eksperckie są najlepszym, co izba ma.</b> Portret, cytat, logo redakcji —
            format jednocześnie buduje wiarygodność członka i izby. Użyty cztery razy na{' '}
            {total} postów. <span className="v">4 z {total}</span>
          </li>
          <li>
            <b>Kompozyty generowane osłabiają przekaz.</b> Flagi, mapy i wagi w stylu
            generowanym nie niosą żadnego elementu identyfikacji — post o powołaniu do forum
            doradczego Komisji Europejskiej wygląda jak ilustracja stockowa.{' '}
            <span className="v">4 posty</span>
          </li>
          <li>
            <b>Jedna grafika to zrzut ekranu własnej strony.</b> Okno zapisu do newslettera
            sfotografowane z witryny, wklejone jako kreacja. Zebrał cztery reakcje — najsłabszy
            wynik w kanale. <span className="v">4 reakcje</span>
          </li>
          <li>
            <b>Materiały partnerów wchodzą bez adaptacji.</b> Fioletowy GITEX obok granatowej
            identyfikacji izby — kanał wygląda jak tablica ogłoszeń, nie jak marka.{' '}
            <span className="v">3 posty</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
