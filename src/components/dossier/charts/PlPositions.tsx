import { PL_POSITIONS, SEO_DERIVED } from '@/content/dossier/seo';
import { plNum } from '@/content/dossier/analytics';
import { Term } from '@/components/dossier/Term';
import { SERIES } from './trafficPalette';

const TOPIC: Record<string, { label: string; color: string; cls: string }> = {
  golf: { label: 'pole golfowe', color: '#b45309', cls: 'pill warn' },
  ai: { label: 'AI', color: SERIES.summit, cls: 'pill pos' },
  osoba: { label: 'osoba z zespołu', color: SERIES.chamber, cls: 'pill cyan' },
};

/**
 * Polish organic positions. The highest-volume phrases the domain ranks for
 * describe a golf venue, not artificial intelligence.
 */
export function PlPositions() {
  const maxVol = Math.max(...PL_POSITIONS.map((p) => p.volume));
  const golfShare = Math.round((SEO_DERIVED.golfVolume / (SEO_DERIVED.golfVolume + SEO_DERIVED.aiVolume + 110)) * 100);

  return (
    <div className="space-y-5">
      <div className="metrics c4">
        <div className="metric amber">
          <div className="n">7</div>
          <div className="l">wszystkie frazy z pozycją w Polsce</div>
        </div>
        <div className="metric">
          <div className="n">{SEO_DERIVED.totalPlTraffic}</div>
          <div className="l">wizyt miesięcznie z tych fraz łącznie</div>
        </div>
        <div className="metric cyan">
          <div className="n">
            <Term k="wyszukiwania miesięczne">{plNum(SEO_DERIVED.golfVolume)}</Term>
          </div>
          <div className="l">miesięcznych wyszukiwań fraz golfowych</div>
        </div>
        <div className="metric">
          <div className="n">
            <Term k="wyszukiwania miesięczne">{plNum(SEO_DERIVED.aiVolume)}</Term>
          </div>
          <div className="l">miesięcznych wyszukiwań fraz o AI</div>
        </div>
      </div>

      <div className="card">
        <h3>Na co domena izby rankuje w Polsce</h3>
        <p>
          Siedem fraz z jakąkolwiek pozycją. Słupek pokazuje <Term k="wolumen">wolumen wyszukiwań</Term>, kolor — czego fraza
          dotyczy.
        </p>

        <div className="mt-5 space-y-3">
          {[...PL_POSITIONS]
            .sort((a, b) => b.volume - a.volume)
            .map((p) => (
              <div key={p.keyword} className="flex items-center gap-3">
                <span className="w-[190px] shrink-0 truncate text-[12.5px] font-bold text-chamber-navy" title={p.keyword}>
                  {p.keyword}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-[4px] bg-chamber-navy/[0.06]">
                  <div
                    className="h-full rounded-[4px] transition-[width] duration-700"
                    style={{ width: `${Math.max((p.volume / maxVol) * 100, 2)}%`, background: TOPIC[p.topic].color }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
                  <Term k="wyszukiwania miesięczne">{plNum(p.volume)}/mies.</Term>
                </span>
                <span className="w-14 shrink-0 text-right text-[11px] font-bold tabular-nums text-chamber-navy">
                  <Term k="pozycja">poz. {p.position}</Term>
                </span>
              </div>
            ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="data">
            <thead>
              <tr>
                <th>Fraza</th>
                <th>
                  <Term k="pozycja">Pozycja</Term>
                </th>
                <th>
                  <Term k="wolumen">Wolumen</Term>
                </th>
                <th>
                  <Term k="wyszukiwania miesięczne">Ruch</Term>
                </th>
                <th>Adres docelowy</th>
                <th>Temat</th>
              </tr>
            </thead>
            <tbody>
              {PL_POSITIONS.map((p) => (
                <tr key={p.keyword}>
                  <td>{p.keyword}</td>
                  <td className="num tabnum">{p.position}</td>
                  <td className="num tabnum">{plNum(p.volume)}</td>
                  <td className="num tabnum">{p.traffic}</td>
                  <td className="num" style={{ maxWidth: '260px', wordBreak: 'break-all' }}>
                    {p.url}
                  </td>
                  <td className="num">
                    <span className={TOPIC[p.topic].cls}>{TOPIC[p.topic].label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="matters-title" style={{ marginTop: '18px' }}>
          Co z tego wynika
        </div>
        <ul className="matters">
          <li>
            Cztery z siedmiu fraz prowadzą na jedną podstronę: <b>/locations/golf-park-jozefow/</b>.
            To strona miejsca, w którym izba zorganizowała wydarzenie — zaindeksowała się i zaczęła
            rankować na zapytania o pole golfowe. <span className="v">4 z 7</span>
          </li>
          <li>
            Fraza o największym wolumenie w całym portfolio to „golf park józefów" —{' '}
            {plNum(2400)} wyszukiwań miesięcznie, pozycja 14. Najwyżej wyceniane zapytanie, na jakie
            odpowiada domena izby, nie ma nic wspólnego ze sztuczną inteligencją.{' '}
            <span className="v">2 400/mies.</span>
          </li>
          <li>
            Frazy golfowe to {golfShare}% całego wolumenu, na jaki domena rankuje w Polsce. Frazy o AI —
            zaledwie {plNum(SEO_DERIVED.aiVolume)} wyszukiwań miesięcznie, obie na pozycjach bez
            znaczenia (18 i 56). <span className="v">{plNum(SEO_DERIVED.aiVolume)}/mies.</span>
          </li>
          <li>
            Jedyna fraza przynosząca mierzalny ruch to nazwisko dyrektora ds. polityki publicznej —
            cztery wizyty miesięcznie z pozycji piątej. Cała polska widoczność organiczna izby to{' '}
            {SEO_DERIVED.totalPlTraffic} wizyt. <span className="v">{SEO_DERIVED.totalPlTraffic} wizyt</span>
          </li>
          <li>
            Nie rankuje żadna fraza związana z członkostwem, składkami, izbą gospodarczą ani
            regulacjami AI — czyli żadna, którą wpisałby potencjalny członek.{' '}
            <span className="v">luka tematyczna</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
