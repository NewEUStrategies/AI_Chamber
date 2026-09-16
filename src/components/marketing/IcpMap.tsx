import { Radar } from 'lucide-react';
import { ICP_SEGMENTS, ICP_NOTE } from '@/content/marketing/icp';
import { MKT } from './palette';
import { MktPanel } from './primitives';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';

/** Mapa segmentów ICP — udział w populacji × gotowość oferty. */
export function IcpMap() {
  const tip = useChartTip();

  const row = (s: (typeof ICP_SEGMENTS)[number]) => {
    const show = (e: { clientX: number; clientY: number }) =>
      tip.show(e, [
        { label: 'Kraje', value: s.countries.join(', '), color: MKT.sky },
        { label: 'Wielkość', value: s.headcount, color: MKT.navy },
        { label: 'Segmenty', value: `${s.share}%`, color: MKT.greenDeep },
      ], s.label, s.drivers[0]);
    return (
      <div
        key={s.key}
        className="group cursor-default rounded-lg p-2 transition-colors hover:bg-slate-50"
        onMouseEnter={show}
        onMouseMove={show}
        onMouseLeave={tip.hide}
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-sm font-bold text-chamber-navy">{s.label}</p>
          <p className="text-xs font-bold tabular-nums text-slate-400">{s.share}%</p>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-chamber-navy/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-chamber-navy to-chamber-green-deep transition-all duration-700"
              style={{ width: `${s.share * 2}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-400">gotowość {s.readiness}%</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {s.countries.map((c) => (
            <span
              key={c}
              className="rounded-full bg-chamber-navy/[0.07] px-2 py-0.5 text-[10px] font-bold text-chamber-navy"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <MktPanel title="Segmenty ICP — do kogo mierzy izba" note={ICP_NOTE}>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Radar className="h-3.5 w-3.5 text-chamber-green-deep" />
        Udział w populacji × gotowość oferty (szacunek)
      </div>
      <div className="space-y-1">{ICP_SEGMENTS.map(row)}</div>
      <ChartTip tip={tip.tip} />
    </MktPanel>
  );
}
