import {
  CHAMBER,
  CHAMBER_COUNTRIES,
  CHAMBER_TERMS,
  SUMMIT,
  SUMMIT_COUNTRIES,
  SUMMIT_TERMS,
  type CountryShare,
  type DomainTraffic,
  type SearchTerm,
} from '@/content/dossier/analytics';
import { SERIES, plFormat, plPct } from './trafficPalette';

function SplitBar({
  parts,
  color,
}: {
  parts: { label: string; pct: number }[];
  color: string;
}) {
  return (
    <div>
      <div className="flex h-3.5 gap-[2px] overflow-hidden rounded-full">
        {parts.map((p, i) => (
          <span
            key={p.label}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${p.pct}%`,
              background: i === 0 ? color : 'rgba(41, 50, 119, 0.12)',
            }}
            title={`${p.label}: ${plPct(p.pct)}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {parts.map((p, i) => (
          <span key={p.label} className="inline-flex items-center gap-1.5 text-[11.5px] text-slate-500">
            <i
              className="h-2 w-2 rounded-full"
              style={{ background: i === 0 ? color : 'rgba(41, 50, 119, 0.25)' }}
            />
            {p.label}
            <b className="font-bold tabular-nums text-chamber-navy">{plPct(p.pct)}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function RankedBars({
  rows,
  color,
  emptyNote,
}: {
  rows: { label: string; pct: number; note?: string }[];
  color: string;
  emptyNote?: string;
}) {
  if (rows.length === 0) return <p className="note">{emptyNote}</p>;
  const max = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <span className="w-[150px] shrink-0 truncate text-[12px] font-semibold text-chamber-navy" title={r.label}>
            {r.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-[4px] bg-chamber-navy/[0.06]">
            <div
              className="h-full rounded-[4px] transition-[width] duration-700"
              style={{ width: `${Math.max((r.pct / max) * 100, 2)}%`, background: color }}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
            {plPct(r.pct)}
          </span>
          {r.note && <span className="w-16 shrink-0 text-right text-[10.5px] font-bold text-slate-400">{r.note}</span>}
        </div>
      ))}
    </div>
  );
}

function countryRows(list: CountryShare[]) {
  return list.map((c) => ({
    label: c.country,
    pct: c.sharePct,
    note:
      c.changePct == null ? '—' : `${c.changeUp ? '↑' : '↓'} ${c.changePct.toLocaleString('pl-PL')}%`,
  }));
}

function termRows(list: SearchTerm[]) {
  return list.map((t) => ({ label: t.term, pct: t.sharePct }));
}

/** Full traffic profile of one property. */
export function DomainDetail({ which }: { which: 'chamber' | 'summit' }) {
  const isChamber = which === 'chamber';
  const d: DomainTraffic = isChamber ? CHAMBER : SUMMIT;
  const color = isChamber ? SERIES.chamber : SERIES.summit;
  const countries = isChamber ? CHAMBER_COUNTRIES : SUMMIT_COUNTRIES;
  const terms = isChamber ? CHAMBER_TERMS : SUMMIT_TERMS;

  return (
    <div className="space-y-5">
      <div className="metrics c4">
        <div className="metric">
          <div className="n">{plFormat(d.totalVisits)}</div>
          <div className="l">wizyt łącznie, III–VIII 2026</div>
        </div>
        <div className="metric">
          <div className="n">{plFormat(d.uniqueVisitors)}</div>
          <div className="l">unikalnych użytkowników miesięcznie</div>
        </div>
        <div className="metric">
          <div className="n">{d.visitDurationLabel}</div>
          <div className="l">średni czas wizyty</div>
        </div>
        <div className="metric">
          <div className="n">
            {d.pagesPerVisit.toLocaleString('pl-PL')}
          </div>
          <div className="l">stron na wizytę</div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>Urządzenia</h3>
          <div className="mt-4">
            <SplitBar
              color={color}
              parts={[
                { label: 'Desktop', pct: d.desktopPct },
                { label: 'Mobile', pct: d.mobilePct },
              ]}
            />
          </div>
          <h3 className="mt-6">Wyszukiwarka: marka a fraza ogólna</h3>
          <div className="mt-4">
            <SplitBar
              color={color}
              parts={[
                { label: 'Zapytania markowe', pct: d.brandedPct },
                { label: 'Zapytania ogólne', pct: d.nonBrandedPct },
              ]}
            />
          </div>
          <p className="note">Podział zapytań organicznych za sierpień 2026.</p>
        </div>

        <div className="card">
          <h3>Pozycja w rankingach</h3>
          <table className="data" style={{ marginTop: '10px' }}>
            <tbody>
              <tr>
                <td>Ranking globalny</td>
                <td className="num tabnum">#{plFormat(d.globalRank)}</td>
              </tr>
              <tr>
                <td>Ranking krajowy ({d.countryRankLabel})</td>
                <td className="num tabnum">#{plFormat(d.countryRank)}</td>
              </tr>
              <tr>
                <td>Ranking branżowy</td>
                <td className="num">brak danych</td>
              </tr>
              <tr>
                <td>Zmiana miesiąc do miesiąca</td>
                <td className="num tabnum">
                  {d.changeUp ? '↑' : '↓'} {plPct(d.changePct)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Geografia ruchu</h3>
        <div className="mt-4">
          <RankedBars rows={countryRows(countries)} color={color} />
        </div>
        {!isChamber && (
          <p className="note">
            Cały zmierzony ruch pochodzi z Polski — mimo że wydarzenie odbywa się w Pradze.
          </p>
        )}
      </div>

      <div className="card">
        <h3>Najczęstsze zapytania ogólne</h3>
        <div className="mt-4">
          <RankedBars rows={termRows(terms)} color={color} emptyNote="Brak danych w raporcie." />
        </div>
        <p className="note">Udział w zapytaniach organicznych spoza nazwy marki, sierpień 2026.</p>
      </div>
    </div>
  );
}
