import type { ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { INK, MARK, STATUS, type StatusKey } from '@/components/marketing/palette';
import { StatusChip } from '@/components/marketing/primitives';
import type { Artifact } from '@/content/conference/types';
import { MEDIUM_COLOR } from './tokens';

/**
 * The header every tab opens with: what the thing is, who owns it, when it is
 * due, where it lands, and what the outside view can say about the 2026
 * edition. Same five questions in the same order on all seven tabs, because a
 * spec whose shape changes per item is a spec nobody can scan.
 */
export function ArtifactSpec({ artifact }: { artifact: Artifact }) {
  const fill = MEDIUM_COLOR[artifact.medium];
  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <p className="mb-1 flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
            <i aria-hidden className="h-2 w-2 rounded-[2px]" style={{ background: fill }} />
            nośnik: {artifact.medium} · {artifact.unitLabel}
          </p>
          <h2 className="font-display text-[20px] font-extrabold leading-tight text-chamber-navy sm:text-[23px]">
            {artifact.label}
          </h2>
        </div>
        <StatusChip k={artifact.status} />
      </div>

      <p className="mt-2.5 max-w-3xl text-[13.5px] leading-[1.7] text-slate-600">{artifact.why}</p>

      <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <SpecRow label="Termin" value={artifact.due} strong />
        <SpecRow label="Właściciel" value={artifact.owner} />
        <SpecRow label="Gdzie ląduje" value={artifact.lands.join(' · ')} />
        <SpecRow label="Co to jest" value={artifact.what} />
      </dl>

      <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-[1.65] text-slate-500">
        <b style={{ color: STATUS[artifact.status].fill }}>Stan edycji 2026 — {STATUS[artifact.status].label}:</b>{' '}
        {artifact.evidence}
      </p>
    </section>
  );
}

function SpecRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd
        className={`mt-1 text-[12.5px] leading-snug ${
          strong ? 'font-extrabold text-chamber-navy' : 'font-semibold text-slate-600'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Gate list                                                        *
 * ---------------------------------------------------------------- */

/**
 * The publication gate. Written as conditions rather than as a to-do list:
 * every line is something that must be true before the unit goes out, so the
 * list reads the same whether it is being planned or being checked.
 */
export function GateList({ items, title = 'Próg publikacji' }: { items: string[]; title?: string }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
      <ul className="space-y-1.5">
        {items.map((g) => (
          <li key={g} className="flex gap-2 text-[12.5px] leading-snug text-slate-600">
            <Check aria-hidden className="mt-[2px] h-3.5 w-3.5 shrink-0" style={{ color: STATUS.dziala.fill }} />
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Meter — one value against a stated ceiling                       *
 * ---------------------------------------------------------------- */

/**
 * A ratio against a limit, in the same ramp as its track. The number stays
 * beside the bar, so the meter is never the only way to read the value, and
 * overflow is drawn as overflow rather than clipped at a hundred percent.
 */
export function Meter({
  value,
  limit,
  color,
  label,
  unit = '',
}: {
  value: number;
  limit: number;
  color: string;
  label: string;
  unit?: string;
}) {
  const over = value > limit;
  const fill = over ? STATUS.brak.fill : color;
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-[78px] shrink-0 text-right font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="relative flex-1" style={{ height: 8 }}>
        <span aria-hidden className="absolute inset-0 rounded-[3px]" style={{ background: INK.track }} />
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 transition-[width] duration-500"
          style={{
            width: `${Math.min((value / limit) * 100, 100)}%`,
            background: fill,
            borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0`,
          }}
        />
      </span>
      <span
        className="w-[92px] shrink-0 text-right text-[11px] font-bold tabular-nums"
        style={{ color: over ? STATUS.brak.fill : INK.body }}
      >
        {value} / {limit}
        {unit}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Unlock list — a capability with a state                          *
 * ---------------------------------------------------------------- */

export function UnlockRow({ what, why, status }: { what: string; why: string; status: StatusKey }) {
  const s = STATUS[status];
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{ background: `${s.fill}1a` }}
      >
        {status === 'dziala' ? (
          <Check className="h-2.5 w-2.5" style={{ color: s.fill }} />
        ) : (
          <Minus className="h-2.5 w-2.5" style={{ color: s.fill }} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[12.5px] font-bold leading-snug text-chamber-navy">{what}</span>
          <span className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: s.fill }}>
            {s.label}
          </span>
        </span>
        <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{why}</span>
      </span>
    </li>
  );
}

/* ---------------------------------------------------------------- *
 * Panel shell                                                      *
 * ---------------------------------------------------------------- */

export function Panel({
  kicker,
  title,
  lead,
  note,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      {kicker && (
        <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
          {kicker}
        </p>
      )}
      <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">{title}</h3>
      {lead && <p className="mt-2 max-w-3xl text-[13px] leading-[1.7] text-slate-600">{lead}</p>}
      <div className="mt-5">{children}</div>
      {note && (
        <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-[1.6] text-slate-500">{note}</p>
      )}
    </section>
  );
}
