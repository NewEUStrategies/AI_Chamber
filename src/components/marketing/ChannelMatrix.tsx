import { LayoutGrid } from 'lucide-react';
import { CHANNELS, CHANNEL_STATUS_LABEL, CHANNEL_NOTE } from '@/content/marketing/channels';
import { MKT, STATUS_COLOR } from './palette';
import { MktPanel } from './primitives';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';

const EFFORT_LABEL = ['', 'niski', 'średni', 'wysoki'];
const IMPACT_LABEL = ['', 'marginalny', 'zauważalny', 'istotny'];

/** Objasnienia legendy statusów — co dana kropka mówi o kanale. */
const STATUS_INFO: Record<keyof typeof CHANNEL_STATUS_LABEL, string> = {
  prowadzony:
    'Kanał używany dziś na co dzień i mający pomiar wyniku — przy nim plan zaczyna się od optymalizacji, nie od uruchomienia.',
  pilotaz:
    'Kanał testowany okazjonalnie, bez stałego rytmu — wynik jest, ale niepewny; dopiero kolejne próby rozstrzygają, czy skalować.',
  planowany:
    'Kanał jeszcze nieuruchomiony — brak danych, bo nic się jeszcze nie wydarzyło. Ocena to założenie, nie pomiar.',
  'do-odradzenia':
    'Kanał, w którym dane mówią „nie" — nakład nie zwraca się w widoczny wpływ. Rekomendacja wycofania albo przebudowy.',
};

/** Macierz kanałów: nakład × wpływ, z dymkiem objaśniającym każdy wiersz. */
export function ChannelMatrix() {
  const tip = useChartTip();

  return (
    <MktPanel title="Macierz kanałów — co prowadzić, co cofnąć" note={CHANNEL_NOTE}>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
        <LayoutGrid className="h-3.5 w-3.5 text-chamber-green-deep" />
        Kropki = nakład zespołu (poziomo) × wpływ na rekrutację (pionowo)
      </div>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-slate-500">
        {(Object.keys(CHANNEL_STATUS_LABEL) as (keyof typeof CHANNEL_STATUS_LABEL)[]).map((s) => {
          const legendShow = (e: { clientX: number; clientY: number }) =>
            tip.show(e, [], CHANNEL_STATUS_LABEL[s], STATUS_INFO[s]);
          return (
            <span
              key={s}
              className="flex cursor-default items-center gap-1.5 rounded px-0.5"
              onMouseEnter={legendShow}
              onMouseMove={legendShow}
              onMouseLeave={tip.hide}
            >
              <i
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: MKT[STATUS_COLOR[s]] }}
              />
              {CHANNEL_STATUS_LABEL[s]}
            </span>
          );
        })}
      </div>
      <ul className="divide-y divide-slate-100">
        {CHANNELS.map((c) => {
          const show = (e: { clientX: number; clientY: number }) =>
            tip.show(e, [
              { label: 'Nakład', value: EFFORT_LABEL[c.effort], color: MKT.navy },
              { label: 'Wpływ', value: IMPACT_LABEL[c.impact], color: MKT.greenDeep },
            ], c.label, c.note);
          const left = ((c.effort - 1) / 2) * 100;
          const bottom = ((c.impact - 1) / 2) * 100;
          return (
            <li key={c.key} className="py-2.5">
              <button
                className="group flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors hover:bg-slate-50"
                onMouseEnter={show}
                onMouseMove={show}
                onMouseLeave={tip.hide}
              >
                <i
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: MKT[STATUS_COLOR[c.status]] }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-chamber-navy">{c.label}</span>
                  <span className="block truncate text-xs text-slate-400">{c.role}</span>
                </span>
                <span className="relative hidden h-8 w-24 shrink-0 sm:block" aria-hidden="true">
                  <span className="absolute inset-0 rounded border border-slate-200/80 bg-slate-50" />
                  <span
                    className="absolute h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover:scale-125"
                    style={{
                      left: `calc(${left}% - 5px)`,
                      bottom: `calc(${bottom}% - 5px)`,
                      background: MKT[STATUS_COLOR[c.status]],
                    }}
                  />
                </span>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {CHANNEL_STATUS_LABEL[c.status]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <ChartTip tip={tip.tip} />
    </MktPanel>
  );
}
