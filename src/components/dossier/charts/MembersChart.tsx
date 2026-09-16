import { useEffect, useState } from 'react';
import { ChartTip } from './ChartTip';
import { useChartTip } from './useChartTip';

interface Series {
  label: string;
  value: number;
  display: string;
  note: string;
  highlight?: boolean;
}

const DATA: Series[] = [
  { label: 'AI Chamber', value: 90, display: '~90', note: 'zliczenie z publicznej listy członków, sierpień 2026', highlight: true },
  { label: 'KI Bundesverband', value: 500, display: '500+', note: 'Niemcy — dane z witryny własnej organizacji' },
  { label: 'Hub France IA', value: 800, display: '800+', note: 'Francja — członkowie i partnerzy łącznie' },
];

const MAX = 800;
const TICKS = [0, 200, 400, 600, 800];

/**
 * Member-base benchmark. Uses the dashboard's horizontal bar idiom
 * (navy → green gradient) rather than the source document's column chart.
 */
export function MembersChart() {
  const [mounted, setMounted] = useState(false);
  const tip = useChartTip();
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 pb-5">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
          <i className="h-3 w-3 rounded-[3px] bg-gradient-to-r from-chamber-navy to-chamber-green-deep" />
          AI Chamber — stan obecny
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
          <i className="h-3 w-3 rounded-[3px] bg-sky-500/70" />
          Odpowiedniki zachodnioeuropejskie — członkowie lub członkowie i partnerzy
        </span>
      </div>

      <div className="relative">
        {/* gridlines */}
        <div className="pointer-events-none absolute inset-y-0 left-[148px] right-12 hidden sm:block">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute top-0 bottom-6 w-px bg-slate-100"
              style={{ left: `${(t / MAX) * 100}%` }}
            />
          ))}
        </div>

        <div className="relative space-y-4">
          {DATA.map((d) => (
            <div key={d.label} className="group flex items-center gap-3">
              <span className="w-[136px] shrink-0 truncate text-xs font-bold text-chamber-navy sm:text-[13px]">
                {d.label}
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-chamber-navy/[0.06]">
                <div
                  className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
                    d.highlight
                      ? 'bg-gradient-to-r from-chamber-navy to-chamber-green-deep'
                      : 'bg-sky-500/70'
                  }`}
                  style={{ width: mounted ? `${Math.max((d.value / MAX) * 100, 2)}%` : '0%' }}
                  onMouseEnter={(e) =>
                    tip.show(
                      e,
                      [
                        { label: 'członkowie', value: d.display },
                        { label: 'źródło', value: d.note },
                      ],
                      d.label
                    )
                  }
                  onMouseLeave={tip.hide}
                />
              </div>
              <span
                className={`w-12 shrink-0 text-right font-display text-sm font-extrabold tabular-nums ${
                  d.highlight ? 'text-chamber-green-deep' : 'text-chamber-navy'
                }`}
              >
                {d.display}
              </span>
            </div>
          ))}
        </div>

        {/* axis */}
        <div className="mt-2 hidden pl-[148px] pr-12 sm:block">
          <div className="relative h-4">
            {TICKS.map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 text-[10px] font-semibold tabular-nums text-slate-400"
                style={{ left: `${(t / MAX) * 100}%` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}
