import { ArrowRight } from 'lucide-react';
import { INK, MARK, STATUS, type StatusKey } from '@/components/marketing/palette';
import { AREAS, countByArea } from '@/content/pulpit/register';
import type { Route } from '@/lib/route';

/** Fixed order, worst first: the reader should meet the holes before the rest. */
const ORDER: StatusKey[] = ['brak', 'kuleje', 'nieznane', 'dziala'];

/**
 * Six areas, six destinations.
 *
 * Each card is the whole control — the card navigates, not a link tucked in a
 * corner — and each carries the distribution of states inside it, so choosing
 * where to go is informed by how much is wrong there rather than by the name
 * alone.
 *
 * Status is the only colour on this page, which is what the status palette is
 * reserved for: it means a state, it ships with a written count beside every
 * segment, and no series anywhere borrows it.
 */
export function AreaMap({ onNavigate }: { onNavigate: (to: Route) => void }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {AREAS.map((area) => {
        const rows = countByArea(area.key);
        const counts = ORDER.map((k) => ({ k, n: rows.filter((r) => r.status === k).length })).filter(
          (c) => c.n > 0
        );
        return (
          <li key={area.key}>
            <button
              type="button"
              onClick={() => onNavigate(area.to)}
              className="group flex h-full w-full flex-col rounded-[12px] border border-slate-200 bg-white p-4 text-left outline-none transition-shadow hover:shadow-card-hover focus-visible:shadow-card-hover"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-display text-[15px] font-extrabold leading-tight text-chamber-navy">
                  {area.label}
                </span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-slate-500">
                  {rows.length}
                </span>
              </span>

              <span className="mt-1.5 block flex-1 text-[12px] leading-[1.6] text-slate-600">{area.what}</span>

              <span
                role="img"
                aria-label={`Stan pozycji w tym obszarze: ${counts
                  .map((c) => `${c.n} ${STATUS[c.k].label}`)
                  .join(', ')}`}
                className="mt-3 flex overflow-hidden rounded-[3px]"
                style={{ height: 8, gap: MARK.surfaceGap, background: INK.surface }}
              >
                {counts.map((c) => (
                  <span
                    key={c.k}
                    style={{ width: `${(c.n / rows.length) * 100}%`, background: STATUS[c.k].fill }}
                  />
                ))}
              </span>

              {/* The counts are written out: the bar is a second reading of the
                  same fact, never the only one. */}
              <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                {counts.map((c) => (
                  <span
                    key={c.k}
                    className="text-[10.5px] font-bold tabular-nums"
                    style={{ color: STATUS[c.k].fill }}
                  >
                    {c.n} {STATUS[c.k].label}
                  </span>
                ))}
              </span>

              <span className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-chamber-green-deep">
                {area.toLabel}
                <ArrowRight aria-hidden className="h-3 w-3" />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
