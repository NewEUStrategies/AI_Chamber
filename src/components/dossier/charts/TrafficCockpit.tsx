import { ArrowDown, ArrowUp } from 'lucide-react';
import { CHAMBER, DERIVED, SUMMIT } from '@/content/dossier/analytics';
import { SERIES, plFormat, plPct } from './trafficPalette';
import { ChartTip } from './ChartTip';
import { useChartTip } from './useChartTip';

interface Row {
  label: string;
  hint?: string;
  /** Longer explanation shown in a cursor-following tooltip on row hover. */
  info: string;
  chamber: string;
  summit: string;
  /** Which column reads better; drives the subtle emphasis only. */
  better?: 'chamber' | 'summit' | null;
}

const ROWS: Row[] = [
  {
    label: 'Wizyty łącznie',
    hint: 'III–VIII 2026',
    info: 'Suma wszystkich wizyt na obu domenach zmierzona przez SimilarWeb od marca do sierpnia 2026. Szacunek z paneli i danych ruchowych — rzędy wielkości są wiarygodne, dokładne liczby niekoniecznie.',
    chamber: plFormat(CHAMBER.totalVisits),
    summit: plFormat(SUMMIT.totalVisits),
    better: 'chamber',
  },
  {
    label: 'Wizyty miesięcznie',
    info: 'Uśredniony ruch jednego miesiąca z tego samego okresu. Pozwala porównać obie domeny niezależnie od długości ich historii pomiaru.',
    chamber: plFormat(CHAMBER.monthlyVisits),
    summit: plFormat(SUMMIT.monthlyVisits),
    better: 'chamber',
  },
  {
    label: 'Unikalni użytkownicy',
    hint: 'miesięcznie',
    info: 'Liczba różnych osób odwiedzających domenę w typowym miesiącu. SimilarWeb wylicza ją z ciasteczek i paneli badawczych, więc traktuj to jako przybliżenie.',
    chamber: plFormat(CHAMBER.uniqueVisitors),
    summit: plFormat(SUMMIT.uniqueVisitors),
    better: 'chamber',
  },
  {
    label: 'Audytorium po deduplikacji',
    info: 'Liczba osób, które SimilarWeb widział na którejkolwiek z dwóch domen, po odrzuceniu duplikatów — czyli realny zasięg wspólny, nie suma obu list.',
    chamber: plFormat(CHAMBER.deduplicatedAudience),
    summit: plFormat(SUMMIT.deduplicatedAudience),
    better: 'chamber',
  },
  {
    label: 'Czas wizyty',
    info: 'Średni czas jednej wizyty na stronie. Sekundy oznaczają, że użytkownik nie czyta treści — tylko rzuci okiem i wychodzi.',
    chamber: CHAMBER.visitDurationLabel,
    summit: SUMMIT.visitDurationLabel,
    better: 'chamber',
  },
  {
    label: 'Strony na wizytę',
    info: 'Średnia liczba podstron obejrzanych w jednej wizycie. Blisko jedności oznacza brak ścieżki po stronie — użytkownik trafiał na jeden adres i go nie opuszczał.',
    chamber: CHAMBER.pagesPerVisit.toLocaleString('pl-PL'),
    summit: SUMMIT.pagesPerVisit.toLocaleString('pl-PL'),
    better: 'summit',
  },
  {
    label: 'Współczynnik odrzuceń',
    hint: 'niżej = lepiej',
    info: 'Odsetek wizyt zakończonych na stronie wejściowej, bez interakcji. Im wyższy, tym większa część ruchu to przypadkowe lub nietrafione wejścia — niżej znaczy lepiej.',
    chamber: plPct(CHAMBER.bounceRatePct),
    summit: plPct(SUMMIT.bounceRatePct),
    better: 'summit',
  },
  {
    label: 'Wizyty na użytkownika',
    hint: 'wyliczenie własne',
    info: 'Wyliczenie własne: wizyty miesięczne podzielone przez unikalnych użytkowników. Pokazuje, czy odbiorcy wracają na domenę, czy każdy to jednorazowe wejście.',
    chamber: DERIVED.chamberVisitsPerVisitor.toLocaleString('pl-PL'),
    summit: DERIVED.summitVisitsPerVisitor.toLocaleString('pl-PL'),
    better: 'summit',
  },
  {
    label: 'Ranking globalny',
    hint: 'niżej = lepiej',
    info: 'Pozycja domeny w światowym rankingu odwiedzin SimilarWeb. Im niższa liczba, tym większy ruch — dla małych domen oznacza praktycznie brak mierzalnej obecności.',
    chamber: `#${plFormat(CHAMBER.globalRank)}`,
    summit: `#${plFormat(SUMMIT.globalRank)}`,
    better: 'chamber',
  },
  {
    label: 'Ranking w Polsce',
    info: 'Pozycja w rankingu odwiedzin tylko wśród polskich użytkowników. Liczby powyżej miliona oznaczają, że domena jest poza głównym nurtem polskiego internetu.',
    chamber: `#${plFormat(CHAMBER.countryRank)}`,
    summit: `#${plFormat(SUMMIT.countryRank)}`,
    better: 'chamber',
  },
];

function Headline({ domain }: { domain: typeof CHAMBER }) {
  const color = domain === CHAMBER ? SERIES.chamber : SERIES.summit;
  const Arrow = domain.changeUp ? ArrowUp : ArrowDown;
  const tip = useChartTip();
  const show = (e: { clientX: number; clientY: number }) =>
    tip.show(
      e,
      [
        { label: 'wizyty łącznie', value: plFormat(domain.totalVisits) },
        { label: 'zmiana m/m', value: `${plPct(domain.changePct)} ${domain.changeUp ? 'wzrost' : 'spadek'}` },
      ],
      domain.domain,
      'Domena robocza izby. Karta pokazuje łączny ruch zmierzony przez SimilarWeb od marca do sierpnia 2026 wraz ze zmianą miesiąc do miesiąca.'
    );
  return (
    <div
      className="card p-5 sm:p-6"
      onMouseEnter={show}
      onMouseMove={show}
      onMouseLeave={tip.hide}
    >
      <div className="flex items-center gap-2">
        <i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{domain.domain}</p>
      </div>
      <p className="mt-3 font-display text-4xl font-extrabold tabular-nums text-chamber-navy">
        {plFormat(domain.totalVisits)}
      </p>
      <p className="mt-1 text-xs text-slate-400">wizyt łącznie, marzec–sierpień 2026</p>
      <p
        className={`mt-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${
          domain.changeUp
            ? 'border-chamber-green/40 bg-emerald-50 text-chamber-green-deep'
            : 'border-rose-200 bg-rose-50 text-rose-700'
        }`}
      >
        <Arrow className="h-3 w-3" />
        {plPct(domain.changePct)} m/m
      </p>
      <ChartTip tip={tip.tip} />
    </div>
  );
}

/** Side-by-side headline figures for both properties. */
export function TrafficCockpit() {
  const tip = useChartTip();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Headline domain={CHAMBER} />
        <Headline domain={SUMMIT} />
      </div>

      <div className="card overflow-hidden">
        <table className="data">
          <thead>
            <tr>
              <th>Metryka</th>
              <th>
                <span className="inline-flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full" style={{ background: SERIES.chamber }} />
                  aichamber.eu
                </span>
              </th>
              <th>
                <span className="inline-flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full" style={{ background: SERIES.summit }} />
                  ceeaisummit.eu
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const show = (e: { clientX: number; clientY: number }) =>
                tip.show(e, [], r.label, r.info);
              return (
                <tr
                  key={r.label}
                  onMouseEnter={show}
                  onMouseMove={show}
                  onMouseLeave={tip.hide}
                >
                  <td>
                    {r.label}
                    {r.hint && <span className="ml-2 text-[10.5px] font-normal text-slate-400">{r.hint}</span>}
                  </td>
                  <td className={`num tabnum ${r.better === 'chamber' ? 'font-extrabold text-chamber-navy' : ''}`}>
                    {r.chamber}
                  </td>
                  <td className={`num tabnum ${r.better === 'summit' ? 'font-extrabold text-chamber-navy' : ''}`}>
                    {r.summit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ChartTip tip={tip.tip} />
      </div>
    </div>
  );
}
