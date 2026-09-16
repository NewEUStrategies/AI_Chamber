import { FORMATS, LINKEDIN_POSTS, SOCIAL_DERIVED, TOPICS } from '@/content/dossier/social';
import { Term } from '@/components/dossier/Term';
import { INK, SERIES } from './trafficPalette';

const pl1 = (n: number) => n.toLocaleString('pl-PL', { maximumFractionDigits: 1 });

function Bars({
  rows,
  accent,
  unit,
}: {
  rows: { label: string; value: number; sub: string; strong?: boolean }[];
  accent: string;
  unit: string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <span className="w-[132px] shrink-0 text-right text-[12px] font-bold text-chamber-navy">{r.label}</span>
          <div className="h-3.5 flex-1 overflow-hidden rounded-[4px]" style={{ background: INK.track }}>
            <div
              className="h-full rounded-[4px] transition-[width] duration-700"
              style={{ width: `${Math.max((r.value / max) * 100, 1.5)}%`, background: r.strong ? accent : 'rgba(41,50,119,0.28)' }}
            />
          </div>
          <span className="w-[112px] shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
            {pl1(r.value)} {unit} · {r.sub}
          </span>
        </div>
      ))}
    </div>
  );
}

/** What actually moves the numbers: format first, topic second. */
export function FormatImpact() {
  const humanFormats = ['zdjecia', 'live'];
  return (
    <div className="space-y-5">
      <div className="card">
        <h3>Format decyduje bardziej niż temat</h3>
        <p>
          Średnia liczba <Term k="reakcja">reakcji</Term> na post w każdym formacie. Wyróżnione
          słupki to formaty pokazujące żywych ludzi — zdjęcia z wydarzeń i transmisje{' '}
          <Term k="LinkedIn Live">na żywo</Term>.
        </p>
        <div className="mt-5">
          <Bars
            accent={SERIES.chamber}
            unit="reakcji"
            rows={FORMATS.map((f) => ({
              label: f.label,
              value: f.mean,
              sub: `${f.posts} ${f.posts === 1 ? 'post' : 'postów'}`,
              strong: humanFormats.includes(f.key),
            }))}
          />
        </div>

        <table className="data" style={{ marginTop: '18px' }}>
          <thead>
            <tr>
              <th>Format</th>
              <th>Postów</th>
              <th>Średnio reakcji</th>
              <th>Komentarzy</th>
              <th>Udostępnień</th>
            </tr>
          </thead>
          <tbody>
            {FORMATS.map((f) => (
              <tr key={f.key}>
                <td>
                  {f.key === 'karuzela' ? (
                    <Term k="karuzela PDF">{f.label}</Term>
                  ) : f.key === 'live' ? (
                    <Term k="LinkedIn Live">{f.label}</Term>
                  ) : f.key === 'newsletter' ? (
                    <Term k="newsletter LinkedIn">{f.label}</Term>
                  ) : (
                    f.label
                  )}
                </td>
                <td className="num tabnum">{f.posts}</td>
                <td className="num tabnum">{pl1(f.mean)}</td>
                <td className="num tabnum">{f.comments}</td>
                <td className="num tabnum">{f.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="matters-title" style={{ marginTop: '18px' }}>
          Co z tego wynika
        </div>
        <ul className="matters">
          <li>
            Posty pokazujące prawdziwych ludzi zbierają średnio{' '}
            <b>{pl1(SOCIAL_DERIVED.humanMean)}</b> reakcji, cała reszta —{' '}
            <b>{pl1(SOCIAL_DERIVED.producedMean)}</b>. To przewaga{' '}
            <span className="v">{pl1(SOCIAL_DERIVED.humanLift)}×</span>
          </li>
          <li>
            Te {SOCIAL_DERIVED.humanPosts} posty to {Math.round((SOCIAL_DERIVED.humanPosts / LINKEDIN_POSTS.length) * 100)}% publikacji i{' '}
            {Math.round(SOCIAL_DERIVED.humanShare)}% wszystkich reakcji w kanale.{' '}
            <span className="v">{Math.round(SOCIAL_DERIVED.humanShare)}% wyniku</span>
          </li>
          <li>
            Dwie transmisje na żywo zebrały {SOCIAL_DERIVED.liveComments} z{' '}
            {LINKEDIN_POSTS.reduce((n, p) => n + p.comments, 0)} komentarzy w całym kanale.
            Rozmowa dzieje się tam, gdzie ktoś mówi na żywo.{' '}
            <span className="v">{SOCIAL_DERIVED.liveComments} komentarzy</span>
          </li>
          <li>
            Pojedyncza grafika — najczęstszy format w kanale — wypada najsłabiej ze wszystkich
            poza newsletterem. Izba produkuje najwięcej tego, co działa najgorzej.{' '}
            <span className="v">luka S1</span>
          </li>
        </ul>
      </div>

      <div className="card">
        <h3>Tematy — dla porządku</h3>
        <p>
          Ten sam rachunek według tematu. Różnice są wyraźnie mniejsze niż między formatami, co
          potwierdza, że o wyniku decyduje sposób pokazania, a nie temat.
        </p>
        <div className="mt-5">
          <Bars
            accent={SERIES.summit}
            unit="reakcji"
            rows={TOPICS.map((t) => ({
              label: t.label,
              value: t.mean,
              sub: `${t.posts} ${t.posts === 1 ? 'post' : 'postów'}`,
              strong: true,
            }))}
          />
        </div>
        <p className="note">
          Rozstęp między najlepszym a najgorszym tematem to{' '}
          {pl1(TOPICS[0].mean / TOPICS[TOPICS.length - 1].mean)}×. Między formatami —{' '}
          {pl1(FORMATS[0].mean / FORMATS[FORMATS.length - 1].mean)}×.
        </p>
      </div>
    </div>
  );
}
