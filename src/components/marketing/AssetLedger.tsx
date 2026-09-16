import { Library } from 'lucide-react';
import { ASSETS } from '@/content/marketing/assets';
import { MKT } from './palette';
import { MktPanel } from './primitives';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';

/** Objasnienia rodzajów zasobów w rejestrze. */
const KIND_INFO: Record<string, string> = {
  Tożsamość:
    'Zasoby wizualne marki — logo, kolory, typografia. Raz zbudowane, służą każdemu kanałowi bez dodatkowego nakładu.',
  Wiedza:
    'Materiały merytoryczne izby — raporty, analizy, dossier. Są nośnikiem wiarygodności i gotowym tematem publikacji.',
  'Format social':
    'Powtarzalne formaty treści na LinkedIn — serie, karuzele, newsletter. Siła w rytmie, nie w pojedynczym poście.',
  Sieć:
    'Relacje międzyludzkie — rady, członkowie, partnerzy. Nie da się ich skopiować ani kupić; działają tylko przez kontakt osobisty.',
};

/** Rejestr zasobów markowych z dymkami objaśniającymi. */
export function AssetLedger() {
  const tip = useChartTip();

  const KIND_COLOR: Record<string, string> = {
    Tożsamość: MKT.navy,
    Wiedza: MKT.greenDeep,
    'Format social': MKT.sky,
    Sieć: MKT.amber,
  };

  return (
    <MktPanel title="Rejestr zasobów — co można wykorzystać" note="Zasoby, które już istnieją; każdy dymek opisuje stan i sposób użycia.">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Library className="h-3.5 w-3.5 text-chamber-green-deep" />
        Kolor = rodzaj zasobu
      </div>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-slate-500">
        {Object.keys(KIND_INFO).map((k) => {
          const legendShow = (e: { clientX: number; clientY: number }) =>
            tip.show(e, [], k, KIND_INFO[k]);
          return (
            <span
              key={k}
              className="flex cursor-default items-center gap-1.5 rounded px-0.5"
              onMouseEnter={legendShow}
              onMouseMove={legendShow}
              onMouseLeave={tip.hide}
            >
              <i
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: KIND_COLOR[k] ?? MKT.navy }}
              />
              {k}
            </span>
          );
        })}
      </div>
      <ul className="divide-y divide-slate-100">
        {ASSETS.map((a) => {
          const show = (e: { clientX: number; clientY: number }) =>
            tip.show(e, [{ label: 'Rytm', value: a.cadence, color: KIND_COLOR[a.kind] ?? MKT.navy }], a.label, a.note);
          return (
            <li key={a.key} className="py-2.5">
              <button
                className="group flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors hover:bg-slate-50"
                onMouseEnter={show}
                onMouseMove={show}
                onMouseLeave={tip.hide}
              >
                <i
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: KIND_COLOR[a.kind] ?? MKT.navy }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-chamber-navy">{a.label}</span>
                  <span className="block truncate text-xs text-slate-400">{a.kind}</span>
                </span>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {a.cadence}
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
