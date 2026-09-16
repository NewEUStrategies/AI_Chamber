import { useId, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, HelpCircle, MoveRight } from 'lucide-react';
import { INK, MARK, STATUS, type StatusKey } from '@/components/marketing/palette';
import { StatusChip, ViewToggle } from '@/components/marketing/primitives';
import { AREAS, HORIZONS, REGISTER, areaByKey } from '@/content/pulpit/register';
import type { AreaKey, Entry, Horizon } from '@/content/pulpit/types';
import type { Route } from '@/lib/route';

const IMPACT_MAX = 5;

/** Assessed impact as a five-step meter; the figure stays in the table twin. */
function ImpactMeter({ value }: { value: number }) {
  const steps = Math.max(0, Math.min(IMPACT_MAX, Math.round(value)));
  return (
    <span
      role="img"
      aria-label={`Wpływ ${value} na ${IMPACT_MAX}`}
      className="flex shrink-0 items-center"
      style={{ gap: MARK.surfaceGap }}
    >
      {Array.from({ length: IMPACT_MAX }, (_, i) => (
        <i
          key={i}
          aria-hidden
          className="h-[6px] w-[9px] rounded-[2px]"
          style={{ background: i < steps ? INK.strong : INK.track }}
        />
      ))}
    </span>
  );
}

const byImpact = (a: Entry, b: Entry) => b.impact - a.impact;

/**
 * The register: current state on the left, recommendation on the right.
 *
 * The row is the visualisation. Nothing here is a chart because the comparison
 * is not between two numbers — it is between a state and a proposal, and the
 * honest form for that is the pair side by side with an arrow between them,
 * carrying the assessed effort and impact rather than a fabricated delta.
 *
 * Expanding a row is what reveals the evidence and the two destinations. The
 * area cards above give the fast path; this gives the reasoned one.
 */
export function RegisterList({
  onNavigate,
  status,
  onStatusChange,
}: {
  onNavigate: (to: Route) => void;
  /** Controlled from the balance bar above, which is the picture of this filter. */
  status: StatusKey | null;
  onStatusChange: (s: StatusKey | null) => void;
}) {
  const uid = useId();
  const bodyId = `${uid}-body`;
  const [areas, setAreas] = useState<AreaKey[]>([]);
  const [horizons, setHorizons] = useState<Horizon[]>([]);
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [table, setTable] = useState(false);

  /* Counts run over the whole register, so a chip never moves under its own filter. */
  const areaCounts = useMemo(() => {
    const out = {} as Record<AreaKey, number>;
    for (const a of AREAS) out[a.key] = REGISTER.filter((e) => e.area === a.key).length;
    return out;
  }, []);
  const horizonCounts = useMemo(() => {
    const out = {} as Record<Horizon, number>;
    for (const h of HORIZONS) out[h.key] = REGISTER.filter((e) => e.horizon === h.key).length;
    return out;
  }, []);

  const view = useMemo(
    () =>
      REGISTER.filter(
        (e) =>
          (areas.length === 0 || areas.includes(e.area)) &&
          (horizons.length === 0 || horizons.includes(e.horizon)) &&
          (status === null || e.status === status)
      ).sort(byImpact),
    [areas, horizons, status]
  );

  const toggle = <T,>(set: T[], v: T, apply: (next: T[]) => void) =>
    apply(set.includes(v) ? set.filter((x) => x !== v) : [...set, v]);

  const chip = (on: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-bold outline-none transition-colors ${
      on
        ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy'
    }`;

  return (
    <div>
      {/* One control row, above everything it scopes. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div role="group" aria-label="Filtr obszaru" className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setAreas([])}
              aria-pressed={areas.length === 0}
              aria-controls={bodyId}
              className={chip(areas.length === 0)}
              style={{ minHeight: MARK.minHitTarget }}
            >
              wszystkie obszary
              <span className="font-mono text-[10px] font-bold text-slate-400">{REGISTER.length}</span>
            </button>
            {AREAS.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => toggle(areas, a.key, setAreas)}
                aria-pressed={areas.includes(a.key)}
                aria-controls={bodyId}
                className={chip(areas.includes(a.key))}
                style={{ minHeight: MARK.minHitTarget }}
              >
                {a.label}
                <span className="font-mono text-[10px] font-bold text-slate-400">{areaCounts[a.key]}</span>
              </button>
            ))}
          </div>

          <div role="group" aria-label="Filtr horyzontu" className="flex flex-wrap items-center gap-1.5">
            {HORIZONS.map((h) => (
              <button
                key={h.key}
                type="button"
                onClick={() => toggle(horizons, h.key, setHorizons)}
                aria-pressed={horizons.includes(h.key)}
                aria-controls={bodyId}
                className={chip(horizons.includes(h.key))}
                style={{ minHeight: MARK.minHitTarget }}
                title={h.frame}
              >
                {h.key}
                <span className="font-mono text-[10px] font-bold text-slate-400">{horizonCounts[h.key]}</span>
              </button>
            ))}
          </div>
        </div>

        <ViewToggle table={table} onChange={setTable} controls={bodyId} />
      </div>

      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] font-semibold text-slate-500" role="status">
        <span>
          Widoczne <b className="tabular-nums text-chamber-navy">{view.length}</b> z{' '}
          <b className="tabular-nums text-chamber-navy">{REGISTER.length}</b> pozycji · uporządkowane
          malejąco po wpływie
        </span>
        {status && (
          <button
            type="button"
            onClick={() => onStatusChange(null)}
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold"
            style={{ background: `${STATUS[status].fill}14`, color: STATUS[status].fill }}
          >
            stan: {STATUS[status].label} · wyczyść
          </button>
        )}
      </p>

      <div id={bodyId} className="mt-3">
        {table ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-[12.5px]">
              <thead>
                <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-1.5 pr-3 font-bold">Obszar</th>
                  <th className="py-1.5 pr-3 font-bold">Pozycja</th>
                  <th className="py-1.5 pr-3 font-bold">Stan aktualny</th>
                  <th className="py-1.5 pr-3 font-bold">Stan</th>
                  <th className="py-1.5 pr-3 font-bold">Rekomendacja</th>
                  <th className="py-1.5 pr-3 text-right font-bold">Wpływ</th>
                  <th className="py-1.5 pr-3 font-bold">Nakład</th>
                  <th className="py-1.5 pr-3 font-bold">Horyzont</th>
                  <th className="py-1.5 pr-3 font-bold">Dowód</th>
                  <th className="py-1.5 font-bold">Jak ustalić</th>
                </tr>
              </thead>
              <tbody>
                {view.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 align-top last:border-0">
                    <td className="py-2 pr-3 font-semibold text-slate-500">{areaByKey(e.area).label}</td>
                    <td className="py-2 pr-3 font-bold text-chamber-navy">{e.subject}</td>
                    <td className="py-2 pr-3 text-slate-600">{e.now}</td>
                    <td className="py-2 pr-3 font-semibold" style={{ color: STATUS[e.status].fill }}>
                      {STATUS[e.status].label}
                    </td>
                    <td className="py-2 pr-3 text-slate-600">{e.recommendation}</td>
                    <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">{e.impact}</td>
                    <td className="py-2 pr-3 text-slate-600">{e.effort}</td>
                    <td className="py-2 pr-3 font-mono text-slate-500">{e.horizon}</td>
                    <td className="py-2 pr-3 text-slate-600">{e.evidence}</td>
                    <td className="py-2 text-slate-600">{e.howToCheck ?? '—'}</td>
                  </tr>
                ))}
                {view.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-4 text-center text-slate-400">
                      Żadna pozycja nie pasuje do wybranych filtrów.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {view.map((e) => {
              const isOpen = open.has(e.id);
              const panelId = `${uid}-${e.id}`;
              return (
                <li key={e.id} className="rounded-[10px] border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setOpen((cur) => {
                        const next = new Set(cur);
                        if (next.has(e.id)) next.delete(e.id);
                        else next.add(e.id);
                        return next;
                      })
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-start gap-3 rounded-[10px] px-3.5 py-3 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                    style={{ minHeight: MARK.minHitTarget }}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {areaByKey(e.area).label}
                        </span>
                        <span className="text-[13px] font-extrabold leading-snug text-chamber-navy">
                          {e.subject}
                        </span>
                      </span>

                      {/* Stan aktualny → rekomendacja. The pair is the point, so
                          it is one object on wide screens and two stacked rows
                          on narrow ones — never a truncated single line. */}
                      <span className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-3">
                        <span className="min-w-0 flex-1">
                          <span className="mb-1 flex items-center gap-2">
                            <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                              stan aktualny
                            </span>
                            <StatusChip k={e.status} />
                          </span>
                          <span className="block text-[12.5px] leading-[1.6] text-slate-600">{e.now}</span>
                        </span>

                        <MoveRight
                          aria-hidden
                          className="mt-1 hidden h-4 w-4 shrink-0 self-center text-slate-300 lg:block"
                        />

                        <span className="min-w-0 flex-1 rounded-[8px] px-3 py-2" style={{ background: INK.track }}>
                          <span className="mb-1 block font-mono text-[9.5px] font-bold uppercase tracking-wider text-chamber-green-deep">
                            rekomendacja
                          </span>
                          <span className="block text-[12.5px] leading-[1.6] text-slate-700">
                            {e.recommendation}
                          </span>
                        </span>
                      </span>
                    </span>

                    <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                      <ImpactMeter value={e.impact} />
                      <span className="whitespace-nowrap font-mono text-[10px] font-bold text-slate-400">
                        nakład {e.effort} · {e.horizon}
                      </span>
                      <ChevronDown
                        aria-hidden
                        className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div id={panelId} className="border-t border-slate-100 px-3.5 py-3">
                      <p className="text-[12px] leading-[1.65] text-slate-600">
                        <b className="text-slate-500">Na czym opiera się ocena:</b> {e.evidence}
                      </p>
                      {e.howToCheck && (
                        <p
                          className="mt-2 flex items-start gap-2 rounded-[8px] px-3 py-2 text-[12px] leading-[1.6] text-slate-600"
                          style={{ background: INK.track }}
                        >
                          <HelpCircle
                            aria-hidden
                            className="mt-[2px] h-3.5 w-3.5 shrink-0"
                            style={{ color: STATUS.nieznane.fill }}
                          />
                          <span>
                            <b className="text-chamber-navy">Jak to ustalić:</b> {e.howToCheck}
                          </span>
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onNavigate(e.to)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-chamber-navy px-3.5 py-1.5 text-[11.5px] font-bold text-white outline-none transition-colors hover:bg-chamber-navy-dark"
                          style={{ minHeight: MARK.minHitTarget }}
                        >
                          {e.toLabel}
                          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                        </button>
                        {e.evidenceTo && (
                          <button
                            type="button"
                            onClick={() => onNavigate(e.evidenceTo as Route)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-[11.5px] font-bold text-chamber-navy outline-none transition-colors hover:border-slate-300 hover:bg-slate-50"
                            style={{ minHeight: MARK.minHitTarget }}
                          >
                            {e.evidenceLabel}
                            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            {view.length === 0 && (
              <li className="rounded-[10px] border border-dashed border-slate-200 px-4 py-6 text-center text-[12.5px] text-slate-400">
                Żadna pozycja nie pasuje do wybranych filtrów.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
