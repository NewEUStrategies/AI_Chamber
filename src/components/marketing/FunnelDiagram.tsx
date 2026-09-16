import { Filter } from 'lucide-react';
import { FUNNEL_STAGES, FUNNEL_NOTE } from '@/content/marketing/funnel';
import { MKT } from './palette';
import { MktPanel } from './primitives';

/** Lejek konwersji — przecieki między etapami od zasięgu do członkostwa. */
export function FunnelDiagram() {
  const max = FUNNEL_STAGES[0].value;
  return (
    <MktPanel title="Lejek — od zasięgu do członkostwa" note={FUNNEL_NOTE}>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Filter className="h-3.5 w-3.5 text-chamber-green-deep" />
        Szerokość = liczba, szare = udział przechodzący dalej
      </div>
      <ol className="space-y-3">
        {FUNNEL_STAGES.map((stage, i) => {
          const width = Math.max((stage.value / max) * 100, 8);
          const isLast = i === FUNNEL_STAGES.length - 1;
          return (
            <li key={stage.key}>
              <div className="flex items-center gap-3">
                <span className="w-10 shrink-0 text-right text-xs font-bold tabular-nums text-chamber-navy">
                  {stage.value}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-bold text-chamber-navy">{stage.label}</p>
                    {!isLast && stage.conv > 0 ? (
                      <span className="shrink-0 text-[10px] font-bold text-slate-400">
                        {Math.round(stage.conv * 100)}% dalej
                      </span>
                    ) : null}
                  </div>
                  <div
                    className="mt-1 h-6 rounded-md transition-all duration-700"
                    style={{
                      width: `${width}%`,
                      background: isLast
                        ? MKT.greenSoft
                        : `linear-gradient(90deg, ${MKT.navy}, ${MKT.navyDark})`,
                      border: isLast ? `1px solid ${MKT.greenDeep}` : 'none',
                    }}
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    {stage.unit} — {stage.note}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </MktPanel>
  );
}
