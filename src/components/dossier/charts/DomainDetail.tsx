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
import { Metric } from './Metric';
import { ChartTip } from './ChartTip';
import { useChartTip } from './useChartTip';

function SplitBar({
  parts,
  color,
}: {
  parts: { label: string; pct: number }[];
  color: string;
}) {
  const tip = useChartTip();
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
            onMouseEnter={(e) =>
              tip.show(e, [{ label: 'udział', value: plPct(p.pct), color: i === 0 ? color : undefined }], p.label)
            }
            onMouseLeave={tip.hide}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {parts.map((p, i) => {
          const legendShow = (e: { clientX: number; clientY: number }) =>
            tip.show(
              e,
              [{ label: 'udział', value: plPct(p.pct), color: i === 0 ? color : undefined }],
              p.label,
              i === 0
                ? 'Pełnokolorowy pasek — część całego ruchu przypadająca na tę pozycję.'
                : 'Szary pasek — część dopełniająca do stu procent.'
            );
          return (
            <span
              key={p.label}
              className="inline-flex cursor-default items-center gap-1.5 rounded px-0.5 text-[11.5px] text-slate-500"
              onMouseEnter={legendShow}
              onMouseMove={legendShow}
              onMouseLeave={tip.hide}
            >
              <i
                className="h-2 w-2 rounded-full"
                style={{ background: i === 0 ? color : 'rgba(41, 50, 119, 0.25)' }}
              />
              {p.label}
              <b className="font-bold tabular-nums text-chamber-navy">{plPct(p.pct)}</b>
            </span>
          );
        })}
      </div>
      <ChartTip tip={tip.tip} />
    </div>
  );
}

function RankedBars({
  rows,
  color,
  emptyNote,
  unit,
}: {
  rows: { label: string; pct: number; note?: string }[];
  color: string;
  emptyNote?: string;
  unit: string;
}) {
  const tip = useChartTip();
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
              onMouseEnter={(e) =>
                tip.show(e, [{ label: unit, value: plPct(r.pct), color }], r.label)
              }
              onMouseLeave={tip.hide}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
            {plPct(r.pct)}
          </span>
          {r.note && <span className="w-16 shrink-0 text-right text-[10.5px] font-bold text-slate-400">{r.note}</span>}
        </div>
      ))}
      <ChartTip tip={tip.tip} />
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
        <Metric
          n={plFormat(d.totalVisits)}
          l="wizyt łącznie, III–VIII 2026"
          title="Wizyty łącznie"
          info="Suma wizyt z wyszukiwarek i przejść bezpośrednich zmierzona przez SimilarWeb od marca do sierpnia 2026. To górna granica ruchu — nie obejmuje odbiorców newslettera ani LinkedIn."
        />
        <Metric
          n={plFormat(d.uniqueVisitors)}
          l="unikalnych użytkowników miesięcznie"
          title="Unikalni użytkownicy"
          info="Szacunek SimilarWeb: liczba różnych osób odwiedzających domenę w typowym miesiącu tego okresu. Wyliczana z ciasteczek i próbek panelowych, więc jest przybliżeniem, nie licznikiem."
        />
        <Metric
          n={d.visitDurationLabel}
          l="średni czas wizyty"
          title="Średni czas wizyty"
          info="Jak długo przeciętny użytkownik pozostaje na stronie przed wyjściem. Poniżej minuty oznacza, że większość osób nie czyta treści — tylko rzuci okiem i wychodzi."
        />
        <Metric
          n={d.pagesPerVisit.toLocaleString('pl-PL')}
          l="stron na wizytę"
          title="Strony na wizytę"
          info="Średnia liczba podstron obejrzanych podczas jednej wizyty. Wartość blisko jedności oznacza, że użytkownicy trafili na pojedynczą stronę i jej nie opuścili — brak ścieżki po stronie."
        />
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
          <RankedBars rows={countryRows(countries)} color={color} unit="udział w ruchu" />
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
          <RankedBars rows={termRows(terms)} color={color} emptyNote="Brak danych w raporcie." unit="udział w zapytaniach" />
        </div>
        <p className="note">Udział w zapytaniach organicznych spoza nazwy marki, sierpień 2026.</p>
      </div>
    </div>
  );
}
