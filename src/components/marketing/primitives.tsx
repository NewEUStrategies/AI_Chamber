import { useId, useState, type ReactNode } from 'react';
import { Table2, BarChart3 } from 'lucide-react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { INK, MARK, STATUS, type StatusKey, pl } from './palette';

/* ---------------------------------------------------------------- *
 * Card + section chrome                                            *
 * ---------------------------------------------------------------- */

export function Card({
  title,
  kicker,
  lead,
  children,
  note,
}: {
  title: string;
  kicker?: string;
  lead?: ReactNode;
  children: ReactNode;
  note?: ReactNode;
}) {
  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      {kicker && (
        <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
          {kicker}
        </p>
      )}
      <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">{title}</h3>
      {lead && <p className="mt-2 text-[13.5px] leading-[1.65] text-slate-600">{lead}</p>}
      <div className="mt-5">{children}</div>
      {note && <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-[1.6] text-slate-500">{note}</p>}
    </section>
  );
}

/** Status chip — colour never travels alone; the label is always present. */
export function StatusChip({ k }: { k: StatusKey }) {
  const s = STATUS[k];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{ background: `${s.fill}14`, color: s.fill }}
    >
      <i aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: s.fill }} />
      {s.label}
    </span>
  );
}

/* ---------------------------------------------------------------- *
 * Stat tile — the form when the answer is one number               *
 * ---------------------------------------------------------------- */

export function StatTile({
  label,
  value,
  sub,
  accent,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  tone?: 'neutral' | 'good' | 'bad';
}) {
  const bar = accent ?? (tone === 'good' ? STATUS.dziala.fill : tone === 'bad' ? STATUS.brak.fill : INK.strong);
  return (
    <div className="relative overflow-hidden rounded-[12px] border border-slate-200 bg-white p-4">
      <span aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ background: bar }} />
      {/* Proportional figures: tabular-nums would make a display-size number read loose. */}
      <div className="font-display text-[26px] font-extrabold leading-none text-chamber-navy">{value}</div>
      <div className="mt-1.5 text-[12px] font-bold leading-snug text-slate-600">{label}</div>
      {sub && <div className="mt-0.5 text-[11px] leading-snug text-slate-400">{sub}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Horizontal bars — the default form for magnitude by category     *
 * ---------------------------------------------------------------- */

export interface BarDatum {
  label: string;
  value: number;
  /** Overrides the single-series colour; used when a row carries its own identity. */
  color?: string;
  /** Extra rows shown in the tooltip. */
  detail?: { label: string; value: string }[];
  note?: string;
}

/**
 * One series → one colour, no value-ramp on nominal categories. Bars cap at
 * 24px, round only at the data end, and carry their own hover tooltip; the
 * table view twin keeps every value reachable without a pointer.
 */
export function BarRows({
  data,
  color,
  unit = '',
  max,
  labelWidth = 200,
  tableCols,
}: {
  data: BarDatum[];
  color: string;
  unit?: string;
  max?: number;
  labelWidth?: number;
  tableCols?: [string, string];
}) {
  const tip = useChartTip();
  const [table, setTable] = useState(false);
  const peak = max ?? Math.max(...data.map((d) => d.value), 1);
  const tableId = useId();

  return (
    <div>
      <ViewToggle table={table} onChange={setTable} controls={tableId} />
      {table ? (
        <table id={tableId} className="mt-3 w-full text-[12.5px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="py-1.5 font-bold">{tableCols?.[0] ?? 'Pozycja'}</th>
              <th className="py-1.5 text-right font-bold">{tableCols?.[1] ?? 'Wartość'}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-b border-slate-100 last:border-0">
                <td className="py-1.5 pr-3 font-semibold text-slate-700">{d.label}</td>
                <td className="py-1.5 text-right font-bold tabular-nums text-chamber-navy">
                  {pl(d.value)}
                  {unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div id={tableId} className="mt-3 space-y-1">
          {data.map((d) => {
            const fill = d.color ?? color;
            return (
              <div
                key={d.label}
                tabIndex={0}
                role="img"
                aria-label={`${d.label}: ${pl(d.value)}${unit}`}
                /* Hit target spans the whole row, not just the painted bar. */
                className="flex cursor-default items-center gap-3 rounded-[6px] py-1.5 outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                style={{ minHeight: MARK.minHitTarget }}
                onPointerEnter={(e) =>
                  tip.show(e, [{ label: 'wartość', value: `${pl(d.value)}${unit}`, color: fill }, ...(d.detail ?? [])], d.label, d.note)
                }
                onFocus={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  tip.show(
                    { clientX: r.right - 24, clientY: r.top + r.height / 2 },
                    [{ label: 'wartość', value: `${pl(d.value)}${unit}`, color: fill }, ...(d.detail ?? [])],
                    d.label,
                    d.note
                  );
                }}
                onPointerLeave={tip.hide}
                onBlur={tip.hide}
              >
                <span
                  className="shrink-0 truncate text-right text-[12px] font-bold text-chamber-navy"
                  style={{ width: labelWidth }}
                  title={d.label}
                >
                  {d.label}
                </span>
                <span className="relative flex-1" style={{ height: 12 }}>
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-full rounded-[3px]"
                    style={{ background: INK.track }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-out"
                    style={{
                      width: `${Math.max((d.value / peak) * 100, 1)}%`,
                      background: fill,
                      /* Square at the baseline, 4px rounded at the data end. */
                      borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0`,
                    }}
                  />
                </span>
                <span className="w-[74px] shrink-0 text-right text-[12px] font-extrabold tabular-nums text-chamber-navy">
                  {pl(d.value)}
                  {unit}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <ChartTip tip={tip.tip} />
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Legend + view toggle                                             *
 * ---------------------------------------------------------------- */

/** Always rendered for two or more series; a single series relies on the title. */
export function Legend({ items }: { items: { label: string; color: string; line?: boolean }[] }) {
  if (items.length < 2) return null;
  return (
    <ul className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600">
          {i.line ? (
            <i aria-hidden className="h-[2px] w-4 rounded-full" style={{ background: i.color }} />
          ) : (
            <i aria-hidden className="h-2.5 w-2.5 rounded-[3px]" style={{ background: i.color }} />
          )}
          {i.label}
        </li>
      ))}
    </ul>
  );
}

export function ViewToggle({
  table,
  onChange,
  controls,
}: {
  table: boolean;
  onChange: (v: boolean) => void;
  controls: string;
}) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={() => onChange(!table)}
        aria-pressed={table}
        aria-controls={controls}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-500 transition-colors hover:border-slate-300 hover:text-chamber-navy"
      >
        {table ? <BarChart3 className="h-3.5 w-3.5" /> : <Table2 className="h-3.5 w-3.5" />}
        {table ? 'wykres' : 'tabela'}
      </button>
    </div>
  );
}
