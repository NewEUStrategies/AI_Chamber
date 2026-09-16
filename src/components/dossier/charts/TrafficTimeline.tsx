import { useMemo, useState } from 'react';
import { CHAMBER, MONTHS_PL, SUMMIT } from '@/content/dossier/analytics';
import { INK, SERIES, plFormat } from './trafficPalette';

const W = 720;
const H = 300;
const PAD = { top: 20, right: 24, bottom: 42, left: 52 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const SERIES_DEF = [
  { key: 'chamber' as const, label: 'aichamber.eu', color: SERIES.chamber, data: CHAMBER.monthly },
  { key: 'summit' as const, label: 'ceeaisummit.eu', color: SERIES.summit, data: SUMMIT.monthly },
];

const MAX = 2000;
const TICKS = [0, 500, 1000, 1500, 2000];

const x = (i: number) => PAD.left + (i / (MONTHS_PL.length - 1)) * PLOT_W;
const y = (v: number) => PAD.top + PLOT_H - (v / MAX) * PLOT_H;

/**
 * Visits over time for both properties, March–August 2026.
 * One shared y-axis — the two series measure the same thing.
 */
export function TrafficTimeline() {
  const [active, setActive] = useState<number | null>(null);

  const paths = useMemo(
    () => SERIES_DEF.map((s) => ({ ...s, d: s.data.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ') })),
    []
  );

  return (
    <figure className="m-0">
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {SERIES_DEF.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600">
            <i className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="ml-auto text-[11px] font-semibold text-slate-400">
          wizyty miesięcznie · III–VIII 2026
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Wizyty w serwisach aichamber.eu i ceeaisummit.eu od marca do sierpnia 2026"
        onMouseLeave={() => setActive(null)}
      >
        {TICKS.map((t) => (
          <g key={t}>
            <line x1={PAD.left} y1={y(t)} x2={W - PAD.right} y2={y(t)} stroke={INK.grid} strokeWidth="1" />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" fontSize="10.5" fontWeight="600" fill={INK.dim}>
              {plFormat(t)}
            </text>
          </g>
        ))}

        {MONTHS_PL.map((m, i) => (
          <text key={m} x={x(i)} y={H - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK.muted}>
            {m}
          </text>
        ))}
        <text x={W - PAD.right} y={H - 3} textAnchor="end" fontSize="9.5" fontWeight="600" fill={INK.dim}>
          2026
        </text>

        {active !== null && (
          <line
            x1={x(active)}
            y1={PAD.top}
            x2={x(active)}
            y2={PAD.top + PLOT_H}
            stroke={INK.dim}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {paths.map((s) => (
          <path key={s.key} d={s.d} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        ))}

        {paths.map((s) =>
          s.data.map((v, i) => (
            <circle
              key={`${s.key}-${i}`}
              cx={x(i)}
              cy={y(v)}
              r={active === i ? 5.5 : 4}
              fill={s.color}
              stroke={INK.surface}
              strokeWidth="2"
              className="transition-all duration-150"
            />
          ))
        )}

        {/* direct labels on the last point — identity is never colour-alone */}
        {paths.map((s) => (
          <text
            key={`lbl-${s.key}`}
            x={x(5) - 8}
            y={y(s.data[5]) + (s.key === 'chamber' ? -12 : -12)}
            textAnchor="end"
            fontSize="11"
            fontWeight="800"
            fill={INK.strong}
          >
            {plFormat(s.data[5])}
          </text>
        ))}

        {MONTHS_PL.map((_, i) => (
          <rect
            key={`hit-${i}`}
            x={x(i) - PLOT_W / 10}
            y={PAD.top}
            width={PLOT_W / 5}
            height={PLOT_H}
            fill="transparent"
            onMouseEnter={() => setActive(i)}
          />
        ))}
      </svg>

      <div className="mt-3 min-h-[46px] rounded-[7px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs">
        {active === null ? (
          <span className="text-slate-400">Najedź na wykres, aby zobaczyć wartości miesięczne.</span>
        ) : (
          <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="font-bold text-chamber-navy">{MONTHS_PL[active]} 2026</span>
            {SERIES_DEF.map((s) => (
              <span key={s.key} className="inline-flex items-center gap-2 text-slate-600">
                <i className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {s.label}
                <b className="font-extrabold tabular-nums text-chamber-navy">{plFormat(s.data[active])}</b>
              </span>
            ))}
          </span>
        )}
      </div>

      <details className="mt-3 text-xs">
        <summary className="cursor-pointer font-bold text-slate-500 hover:text-chamber-green-deep">
          Pokaż dane w tabeli
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="data">
          <thead>
            <tr>
              <th>Miesiąc 2026</th>
              <th>aichamber.eu</th>
              <th>ceeaisummit.eu</th>
            </tr>
          </thead>
          <tbody>
            {MONTHS_PL.map((m, i) => (
              <tr key={m}>
                <td>{m}</td>
                <td className="num tabnum">{plFormat(CHAMBER.monthly[i])}</td>
                <td className="num tabnum">{plFormat(SUMMIT.monthly[i])}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
