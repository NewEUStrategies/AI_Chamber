import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, ChevronsUp, Eye, Minus } from 'lucide-react';
import { INK, MARK, STATUS } from '@/components/marketing/palette';
import { PLAN_ACCENT } from '../tokens';
import type { RecDirection } from '@/content/plan/types';


/* ---------------------------------------------------------------- *
 * Recommendation direction                                         *
 * ---------------------------------------------------------------- */

/**
 * A direction of travel, never colour alone: every chip carries an arrow and
 * the word. The tones borrow the status tokens because a recommendation to
 * wind a format down is a judgement about its state, and it ships with both
 * secondary encodings the status palette requires.
 */
const REC: Record<RecDirection, { fill: string; Icon: typeof ArrowUp }> = {
  'zwiększyć mocno': { fill: STATUS.dziala.fill, Icon: ChevronsUp },
  zwiększyć: { fill: STATUS.dziala.fill, Icon: ArrowUp },
  utrzymać: { fill: INK.muted, Icon: Minus },
  wygaszać: { fill: STATUS.brak.fill, Icon: ArrowDown },
};

export function RecChip({ rec }: { rec: RecDirection }) {
  const { fill, Icon } = REC[rec];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{ background: `${fill}14`, color: fill }}
    >
      <Icon aria-hidden className="h-3 w-3" />
      {rec}
    </span>
  );
}

/* ---------------------------------------------------------------- *
 * Closing block: what to watch                                     *
 * ---------------------------------------------------------------- */

/**
 * Every channel tab ends the same way: the number the reconnaissance read, and
 * what to compare against it next time. A recommendation without a reading to
 * check it against is an opinion with a deadline.
 */
export function WatchBlock({ baseline, watch }: { baseline: string; watch: string[] }) {
  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <p className="mb-1 flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
        <Eye aria-hidden className="h-3.5 w-3.5" />
        Co obserwować
      </p>
      <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
        Punkt odniesienia z rozpoznania
      </h3>
      <p className="mt-2.5 rounded-[10px] px-3.5 py-2.5 text-[12.5px] font-semibold leading-[1.6] text-slate-600" style={{ background: INK.track }}>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Stan zastany · </span>
        {baseline}
      </p>
      <ul className="mt-3 space-y-1.5">
        {watch.map((w) => (
          <li key={w} className="flex gap-2 text-[12.5px] leading-snug text-slate-600">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PLAN_ACCENT }} />
            {w}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Numbered steps                                                   *
 * ---------------------------------------------------------------- */

/** Numbered because the order is part of the recommendation, not decoration. */
export function Steps({
  items,
}: {
  items: { what: string; why?: string; detail?: string; extra?: string }[];
}) {
  return (
    <ol className="space-y-3">
      {items.map((s, i) => (
        <li key={s.what} className="flex gap-3">
          <span
            className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-extrabold text-white"
            style={{ background: PLAN_ACCENT }}
          >
            {i + 1}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{s.what}</span>
            {s.detail && (
              <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{s.detail}</span>
            )}
            {s.why && (
              <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-500">{s.why}</span>
            )}
            {s.extra && (
              <span className="mt-1 block font-mono text-[10.5px] font-bold uppercase tracking-wider" style={{ color: PLAN_ACCENT }}>
                {s.extra}
              </span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- *
 * Two-column rule list: always / never                             *
 * ---------------------------------------------------------------- */

export function RuleColumns({
  always,
  never,
  alwaysLabel = 'Zawsze',
  neverLabel = 'Nigdy',
}: {
  always: string[];
  never: string[];
  alwaysLabel?: string;
  neverLabel?: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {[
        { label: alwaysLabel, items: always, fill: STATUS.dziala.fill, sign: '+' },
        { label: neverLabel, items: never, fill: STATUS.brak.fill, sign: '−' },
      ].map((col) => (
        <div key={col.label}>
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: col.fill }}>
            {col.label}
          </p>
          <ul className="space-y-1.5">
            {col.items.map((t) => (
              <li key={t} className="flex gap-2 text-[12.5px] leading-snug text-slate-600">
                <span aria-hidden className="shrink-0 font-bold" style={{ color: col.fill }}>
                  {col.sign}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Definition card                                                  *
 * ---------------------------------------------------------------- */

export function DefCard({
  title,
  meta,
  children,
  accent = false,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-[10px] border px-3.5 py-3"
      style={{ borderColor: accent ? `${PLAN_ACCENT}33` : undefined, background: accent ? `${PLAN_ACCENT}08` : undefined }}
    >
      <p className="text-[12.5px] font-extrabold leading-snug text-chamber-navy">{title}</p>
      {meta && (
        <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: PLAN_ACCENT }}>
          {meta}
        </p>
      )}
      <div className="mt-1.5 space-y-1 text-[12px] leading-[1.6] text-slate-600">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Small proportional bar, used inside list rows                    *
 * ---------------------------------------------------------------- */

/**
 * `value` may be null, and null draws nothing at all — not a minimum stub.
 * The floor exists so a real small number stays visible; applied to a missing
 * one it would render "no fixed duration" as "a very short duration", which is
 * a different claim.
 */
export function MiniBar({
  value,
  peak,
  color,
  height = 8,
}: {
  value: number | null;
  peak: number;
  color: string;
  height?: number;
}) {
  return (
    <span className="relative block w-full" style={{ height }}>
      <span aria-hidden className="absolute inset-0 rounded-[3px]" style={{ background: INK.track }} />
      {value !== null && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-out"
          style={{
            width: `${Math.max((value / peak) * 100, 2)}%`,
            background: color,
            borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0`,
          }}
        />
      )}
    </span>
  );
}
