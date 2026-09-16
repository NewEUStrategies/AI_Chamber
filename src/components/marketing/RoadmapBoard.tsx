import { CalendarRange } from 'lucide-react';
import { ROADMAP, ROADMAP_NOTE, ROADMAP_TRACKS } from '@/content/marketing/roadmap';
import { MKT, TRACK_COLOR } from './palette';
import { MktPanel } from './primitives';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';

/** Oś czasu planu czynnościowego w podziale na tory. */
export function RoadmapBoard() {
  const tip = useChartTip();
  const quarters = [...new Set(ROADMAP.map((r) => r.quarter))];

  return (
    <MktPanel title="Plan czynnościowy — tory i kwartały" note={ROADMAP_NOTE}>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-slate-500">
        {(Object.keys(ROADMAP_TRACKS) as (keyof typeof ROADMAP_TRACKS)[]).map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <i
              className="inline-block h-2 w-4 rounded-full"
              style={{ background: MKT[TRACK_COLOR[t]] }}
            />
            {ROADMAP_TRACKS[t]}
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quarters.map((q) => (
          <div key={q}>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-chamber-navy">
              <CalendarRange className="h-3.5 w-3.5 text-chamber-green-deep" />
              {q}
            </p>
            <ul className="space-y-2">
              {ROADMAP.filter((r) => r.quarter === q).map((r) => {
                const show = (e: { clientX: number; clientY: number }) =>
                  tip.show(e, [{ label: 'Tor', value: ROADMAP_TRACKS[r.track] }], r.title, r.detail);
                return (
                  <li
                    key={r.key}
                    className={`rounded-lg border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
                      r.done
                        ? 'border-chamber-green-deep/30 bg-chamber-green-soft/40'
                        : 'border-slate-200 bg-white'
                    }`}
                    onMouseEnter={show}
                    onMouseMove={show}
                    onMouseLeave={tip.hide}
                  >
                    <p className="flex items-start gap-2 text-sm font-bold text-chamber-navy">
                      <i
                        className="mt-1 inline-block h-1.5 w-4 shrink-0 rounded-full"
                        style={{ background: MKT[TRACK_COLOR[r.track]] }}
                      />
                      <span className="min-w-0">{r.title}</span>
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{r.detail}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <ChartTip tip={tip.tip} />
    </MktPanel>
  );
}
