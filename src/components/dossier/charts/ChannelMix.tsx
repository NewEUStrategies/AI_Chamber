import { useState } from 'react';
import { CHANNELS } from '@/content/dossier/analytics';
import { SERIES, plPct } from './trafficPalette';

const MAX = 40;

const SERIES_DEF = [
  { key: 'chamber' as const, label: 'aichamber.eu', color: SERIES.chamber },
  { key: 'summit' as const, label: 'ceeaisummit.eu', color: SERIES.summit },
];

/** Marketing-channel mix for both properties — grouped bars on one shared scale. */
export function ChannelMix() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <figure className="m-0">
      <figcaption className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {SERIES_DEF.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600">
            <i className="h-2.5 w-2.5 rounded-[2px]" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="ml-auto text-[11px] font-semibold text-slate-400">udział w ruchu · III–VIII 2026</span>
      </figcaption>

      <div className="space-y-3.5">
        {CHANNELS.map((c) => (
          <div key={c.key} className="flex items-center gap-3">
            <span className="w-[152px] shrink-0 text-right text-[11.5px] font-bold leading-tight text-chamber-navy sm:w-[178px] sm:text-xs">
              {c.label}
            </span>
            <div className="min-w-0 flex-1 space-y-[2px]">
              {SERIES_DEF.map((s) => {
                const value = c[s.key];
                const id = `${c.key}-${s.key}`;
                return (
                  <div
                    key={s.key}
                    className="group relative flex items-center gap-2"
                    onMouseEnter={() => setHover(id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div className="h-3 flex-1 overflow-hidden rounded-[4px] bg-chamber-navy/[0.06]">
                      <div
                        className="h-full rounded-[4px] transition-[width] duration-700"
                        style={{ width: `${Math.max((value / MAX) * 100, 1)}%`, background: s.color }}
                      />
                    </div>
                    <span
                      className={`w-12 shrink-0 text-right text-[11px] font-bold tabular-nums transition-colors ${
                        hover === id ? 'text-chamber-navy' : 'text-slate-500'
                      }`}
                    >
                      {plPct(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <details className="mt-5 text-xs">
        <summary className="cursor-pointer font-bold text-slate-500 hover:text-chamber-green-deep">
          Pokaż dane w tabeli
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="data">
          <thead>
            <tr>
              <th>Kanał</th>
              <th>aichamber.eu</th>
              <th>ceeaisummit.eu</th>
              <th>Różnica</th>
            </tr>
          </thead>
          <tbody>
            {CHANNELS.map((c) => (
              <tr key={c.key}>
                <td>{c.label}</td>
                <td className="num tabnum">{plPct(c.chamber)}</td>
                <td className="num tabnum">{plPct(c.summit)}</td>
                <td className="num tabnum">
                  {c.summit - c.chamber > 0 ? '+' : ''}
                  {plPct(Number((c.summit - c.chamber).toFixed(2)))}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
