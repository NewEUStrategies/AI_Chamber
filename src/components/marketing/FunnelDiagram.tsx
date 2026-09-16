import { useState } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { FUNNEL_RAMP, INK, MARK, STATUS, type StatusKey } from './palette';
import { ViewToggle } from './primitives';

export interface FunnelStage {
  key: string;
  short: string;
  name: string;
  question: string;
  /** What the organisation actually runs at this stage. */
  has: string[];
  /** What is missing and costs them. */
  missing: string[];
  status: StatusKey;
  /** Relative width of the band, 0–100. Not a conversion rate — see the note. */
  width: number;
  evidence: string;
}

/**
 * The funnel as a set of bands, not a tapering cone.
 *
 * A drawn cone implies measured drop-off between stages; there is no analytics
 * access here, so the widths encode assessed strength, and the caption says so.
 * Colour steps along the ordinal ramp because the stages are ordered.
 */
export function FunnelDiagram({ stages }: { stages: FunnelStage[] }) {
  const tip = useChartTip();
  const [open, setOpen] = useState<string | null>(stages[0]?.key ?? null);
  const [table, setTable] = useState(false);

  return (
    <div>
      <ViewToggle table={table} onChange={setTable} controls="funnel-body" />

      {table ? (
        <div id="funnel-body" className="mt-3 overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-1.5 font-bold">Etap</th>
                <th className="py-1.5 font-bold">Pytanie odbiorcy</th>
                <th className="py-1.5 font-bold">Stan</th>
                <th className="py-1.5 font-bold">Co mają</th>
                <th className="py-1.5 font-bold">Czego brakuje</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((s) => (
                <tr key={s.key} className="border-b border-slate-100 align-top last:border-0">
                  <td className="py-2 pr-3 font-bold text-chamber-navy">{s.short}</td>
                  <td className="py-2 pr-3 text-slate-600">{s.question}</td>
                  <td className="py-2 pr-3 font-semibold" style={{ color: STATUS[s.status].fill }}>
                    {STATUS[s.status].label}
                  </td>
                  <td className="py-2 pr-3 text-slate-600">{s.has.join('; ') || '—'}</td>
                  <td className="py-2 text-slate-600">{s.missing.join('; ') || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div id="funnel-body" className="mt-3 space-y-1.5">
          {stages.map((s, i) => {
            const fill = FUNNEL_RAMP[Math.min(i, FUNNEL_RAMP.length - 1)];
            const isOpen = open === s.key;
            return (
              <div key={s.key}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.key)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 rounded-[8px] px-1 py-1.5 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                  style={{ minHeight: MARK.minHitTarget }}
                  onPointerEnter={(e) =>
                    tip.show(
                      e,
                      [
                        { label: 'stan', value: STATUS[s.status].label, color: STATUS[s.status].fill },
                        { label: 'ma', value: String(s.has.length) },
                        { label: 'brakuje', value: String(s.missing.length) },
                      ],
                      `${s.short} — ${s.name}`,
                      s.question
                    )
                  }
                  onPointerLeave={tip.hide}
                >
                  <span className="w-[54px] shrink-0 text-right font-mono text-[11px] font-extrabold" style={{ color: fill }}>
                    {s.short}
                  </span>
                  {/* Bands are separated by the surface gap, never by a stroke. */}
                  <span className="relative h-7 flex-1 overflow-hidden rounded-[4px]" style={{ background: INK.track }}>
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 flex items-center transition-[width] duration-700 ease-out"
                      style={{ width: `${s.width}%`, background: fill, borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0` }}
                    />
                    <span className="relative z-10 flex h-full items-center px-3 text-[12px] font-bold text-white mix-blend-normal">
                      {s.name}
                    </span>
                  </span>
                  <span
                    className="w-[74px] shrink-0 text-right text-[11px] font-bold"
                    style={{ color: STATUS[s.status].fill }}
                  >
                    {STATUS[s.status].label}
                  </span>
                </button>

                {isOpen && (
                  <div className="ml-[66px] mr-1 mb-1.5 rounded-[8px] bg-slate-50 px-4 py-3">
                    <p className="text-[12.5px] italic leading-[1.6] text-slate-500">„{s.question}"</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Co mają</p>
                        {s.has.length ? (
                          <ul className="space-y-1">
                            {s.has.map((h) => (
                              <li key={h} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700">
                                <span aria-hidden style={{ color: STATUS.dziala.fill }}>+</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-[12.5px] text-slate-400">nic, co dałoby się ustalić z zewnątrz</p>
                        )}
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Czego brakuje</p>
                        <ul className="space-y-1">
                          {s.missing.map((m) => (
                            <li key={m} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700">
                              <span aria-hidden style={{ color: STATUS.brak.fill }}>−</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="mt-3 border-t border-slate-200 pt-2 text-[11.5px] leading-snug text-slate-500">
                      <b className="text-slate-600">Dowód:</b> {s.evidence}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <ChartTip tip={tip.tip} />
    </div>
  );
}
