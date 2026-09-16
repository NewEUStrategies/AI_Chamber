import { useId, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import type { Horizon, RoadmapItem } from '@/content/marketing/types';
import { CAT, INK, MARK, pl } from './palette';
import { Card, Legend, ViewToggle } from './primitives';

type Funnel = RoadmapItem['funnel'];

/**
 * Fixed stage order, fixed colour. The index into CAT is decided here and
 * nowhere else, so a stage keeps its hue no matter what the filter removes and
 * no matter where the item lands in the impact ranking.
 */
const STAGES = ['TOFU', 'MOFU', 'BOFU', 'retencja', 'pomiar'] as const;

const STAGE_COLOR: Record<Funnel, string> = {
  TOFU: CAT[0],
  MOFU: CAT[1],
  BOFU: CAT[2],
  retencja: CAT[3],
  pomiar: CAT[4],
};

const IMPACT_MAX = 5;

/**
 * Impact as a five-step meter — one encoding, not a meter plus a repeated
 * number. The figure itself stays reachable in the tooltip and in the table
 * twin, so nothing is locked behind the picture.
 */
function ImpactMeter({ value, color }: { value: number; color: string }) {
  const steps = Math.max(0, Math.min(IMPACT_MAX, Math.round(value)));
  return (
    <span
      role="img"
      aria-label={`Impact ${pl(value)} na ${IMPACT_MAX}`}
      className="flex shrink-0 items-center"
      style={{ gap: MARK.surfaceGap }}
    >
      {Array.from({ length: IMPACT_MAX }, (_, i) => (
        <i
          key={i}
          aria-hidden
          className="h-[6px] w-[9px] rounded-[2px]"
          style={{ background: i < steps ? color : INK.track }}
        />
      ))}
    </span>
  );
}

/** Stage identity travels on the mark; the label stays recessive ink. */
function StageDot({ stage, className = '' }: { stage: Funnel; className?: string }) {
  return (
    <i
      aria-hidden
      className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${className}`}
      style={{ background: STAGE_COLOR[stage] }}
    />
  );
}

const byImpact = (a: RoadmapItem, b: RoadmapItem) => b.impact - a.impact;

/**
 * The roadmap across three horizons.
 *
 * One control row sits above everything it governs: the funnel filter narrows
 * all three horizons in the same pass, so the per-horizon counts and the total
 * always describe the same set. Filtering is a synchronous `useMemo` — no
 * skeleton, no transition, the surviving rows keep their colour and order.
 */
export function RoadmapBoard({ horizons }: { horizons: Horizon[] }) {
  const tip = useChartTip();
  const uid = useId();
  const bodyId = `${uid}-body`;
  const [table, setTable] = useState(false);
  /** Empty set means "wszystkie" — no stage is singled out. */
  const [picked, setPicked] = useState<Funnel[]>([]);
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  /** Counts over the full data set, so the chips never move under their own filter. */
  const stageCounts = useMemo(() => {
    const out = { TOFU: 0, MOFU: 0, BOFU: 0, retencja: 0, pomiar: 0 } as Record<Funnel, number>;
    for (const h of horizons) for (const it of h.items) out[it.funnel] += 1;
    return out;
  }, [horizons]);

  const view = useMemo(() => {
    const keep = (it: RoadmapItem) => picked.length === 0 || picked.includes(it.funnel);
    return horizons.map((h) => ({
      horizon: h,
      total: h.items.length,
      items: h.items.filter(keep).sort(byImpact),
    }));
  }, [horizons, picked]);

  const shown = view.reduce((n, g) => n + g.items.length, 0);
  const total = view.reduce((n, g) => n + g.total, 0);

  const toggleStage = (s: Funnel) =>
    setPicked((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const toggleItem = (key: string) =>
    setOpen((cur) => {
      const next = new Set(cur);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const tipRows = (it: RoadmapItem) => [
    { label: 'etap', value: it.funnel, color: STAGE_COLOR[it.funnel] },
    { label: 'impact', value: `${pl(it.impact)} / ${IMPACT_MAX}` },
    { label: 'nakład', value: it.effort },
    { label: 'właściciel', value: it.owner },
  ];

  const chipClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-bold transition-colors outline-none ${
      active
        ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy focus-visible:border-slate-300'
    }`;

  return (
    <div>
      {/* One control row, above the content it filters — never tucked inside a card. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div role="group" aria-label="Filtr etapu lejka" className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPicked([])}
            aria-pressed={picked.length === 0}
            aria-controls={bodyId}
            className={chipClass(picked.length === 0)}
            style={{ minHeight: MARK.minHitTarget }}
          >
            wszystkie
            <span className="font-mono text-[10px] font-bold text-slate-400">{total}</span>
          </button>
          {STAGES.map((s) => {
            const active = picked.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleStage(s)}
                aria-pressed={active}
                aria-controls={bodyId}
                className={chipClass(active)}
                style={{ minHeight: MARK.minHitTarget }}
              >
                <StageDot stage={s} />
                {s}
                <span className="font-mono text-[10px] font-bold text-slate-400">{stageCounts[s]}</span>
              </button>
            );
          })}
        </div>
        <ViewToggle table={table} onChange={setTable} controls={bodyId} />
      </div>

      <p className="mt-2 text-[11.5px] font-semibold text-slate-500" role="status">
        Widoczne <b className="tabular-nums text-chamber-navy">{shown}</b> z{' '}
        <b className="tabular-nums text-chamber-navy">{total}</b> pozycji
        {picked.length > 0 && <> · etap: {picked.join(', ')}</>}
      </p>

      <div className="mt-3">
        <Legend items={STAGES.map((s) => ({ label: s, color: STAGE_COLOR[s] }))} />
      </div>

      <div id={bodyId}>
        {table ? (
          /* Table twin — every column, so nothing depends on hovering or expanding. */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-[12.5px]">
              <thead>
                <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-1.5 pr-3 font-bold">Horyzont</th>
                  <th className="py-1.5 pr-3 font-bold">Pozycja</th>
                  <th className="py-1.5 pr-3 font-bold">Etap</th>
                  <th className="py-1.5 pr-3 text-right font-bold">Impact</th>
                  <th className="py-1.5 pr-3 font-bold">Nakład</th>
                  <th className="py-1.5 pr-3 font-bold">Właściciel</th>
                  <th className="py-1.5 pr-3 font-bold">Metryka sukcesu</th>
                  <th className="py-1.5 pr-3 font-bold">Koszt</th>
                  <th className="py-1.5 pr-3 font-bold">Dlaczego</th>
                  <th className="py-1.5 font-bold">Jak</th>
                </tr>
              </thead>
              <tbody>
                {view.flatMap((g) =>
                  g.items.map((it) => (
                    <tr key={`${g.horizon.key}-${it.title}`} className="border-b border-slate-100 align-top last:border-0">
                      <td className="py-2 pr-3 font-semibold text-slate-500">{g.horizon.frame}</td>
                      <td className="py-2 pr-3 font-bold text-chamber-navy">{it.title}</td>
                      <td className="py-2 pr-3">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
                          <StageDot stage={it.funnel} />
                          {it.funnel}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">
                        {pl(it.impact)}
                      </td>
                      <td className="py-2 pr-3 font-semibold text-slate-600">{it.effort}</td>
                      <td className="py-2 pr-3 text-slate-600">{it.owner}</td>
                      <td className="py-2 pr-3 text-slate-600">{it.metric}</td>
                      <td className="py-2 pr-3 text-slate-600">{it.cost}</td>
                      <td className="py-2 pr-3 text-slate-600">{it.why}</td>
                      <td className="py-2 text-slate-600">{it.how}</td>
                    </tr>
                  ))
                )}
                {shown === 0 && (
                  <tr>
                    <td colSpan={10} className="py-4 text-center text-slate-400">
                      Żadna pozycja nie pasuje do wybranego etapu lejka.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {view.map((g) => (
              <Card
                key={g.horizon.key}
                kicker={g.horizon.frame}
                title={g.horizon.label}
                note={
                  <>
                    <b className="tabular-nums text-slate-600">{g.items.length}</b> z{' '}
                    <b className="tabular-nums text-slate-600">{g.total}</b> pozycji · uporządkowane malejąco po
                    impakcie
                  </>
                }
              >
                {/* Minimum height keeps an emptied horizon from collapsing the row. */}
                <ul className="space-y-0.5" style={{ minHeight: MARK.minHitTarget * 2 }}>
                  {g.items.map((it) => {
                    const key = `${g.horizon.key}::${it.title}`;
                    const panelId = `${uid}-${g.horizon.key}-${it.title.replace(/\W+/g, '-')}`;
                    const isOpen = open.has(key);
                    const color = STAGE_COLOR[it.funnel];
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => toggleItem(key)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="flex w-full items-start gap-2.5 rounded-[8px] px-1.5 py-1.5 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                          style={{ minHeight: MARK.minHitTarget }}
                          onPointerEnter={(e) => tip.show(e, tipRows(it), it.title, it.why)}
                          onFocus={(e) => {
                            /* Keyboard focus gets the same readout as the pointer. */
                            const r = e.currentTarget.getBoundingClientRect();
                            tip.show(
                              { clientX: r.right - 24, clientY: r.top + r.height / 2 },
                              tipRows(it),
                              it.title,
                              it.why
                            );
                          }}
                          onPointerLeave={tip.hide}
                          onBlur={tip.hide}
                        >
                          <StageDot stage={it.funnel} className="mt-[5px]" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-bold leading-snug text-chamber-navy">
                              {it.title}
                            </span>
                            {/* Effort is a word, not a colour — it is not a status. */}
                            <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] font-semibold text-slate-500">
                              {it.funnel}
                              <span aria-hidden className="text-slate-300">
                                ·
                              </span>
                              nakład {it.effort}
                            </span>
                          </span>
                          <span className="mt-[3px] flex shrink-0 items-center gap-1.5">
                            <ImpactMeter value={it.impact} color={color} />
                            <ChevronDown
                              aria-hidden
                              className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </span>
                        </button>

                        {isOpen && (
                          <div id={panelId} className="mb-1.5 ml-[22px] mr-1.5 rounded-[8px] bg-slate-50 px-3 py-2.5">
                            <p className="text-[12px] leading-[1.6] text-slate-600">
                              <b className="text-slate-500">Dlaczego:</b> {it.why}
                            </p>
                            <p className="mt-1.5 text-[12px] leading-[1.6] text-slate-600">
                              <b className="text-slate-500">Jak:</b> {it.how}
                            </p>
                            <dl className="mt-2.5 space-y-1.5 border-t border-slate-200 pt-2 text-[11.5px] leading-snug">
                              <div className="flex gap-2">
                                <dt className="w-[74px] shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Właściciel
                                </dt>
                                <dd className="flex-1 font-semibold text-slate-700">{it.owner}</dd>
                              </div>
                              <div className="flex gap-2">
                                <dt className="w-[74px] shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Metryka
                                </dt>
                                <dd className="flex-1 text-slate-700">{it.metric}</dd>
                              </div>
                              <div className="flex gap-2">
                                <dt className="w-[74px] shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Koszt
                                </dt>
                                <dd className="flex-1 text-slate-700">{it.cost}</dd>
                              </div>
                            </dl>
                          </div>
                        )}
                      </li>
                    );
                  })}
                  {g.items.length === 0 && (
                    <li className="px-1.5 py-2 text-[12px] leading-snug text-slate-400">
                      Brak pozycji na tym etapie lejka w tym horyzoncie.
                    </li>
                  )}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}
