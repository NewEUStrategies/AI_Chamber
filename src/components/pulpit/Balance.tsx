import { INK, MARK, STATUS, type StatusKey } from '@/components/marketing/palette';
import { REGISTER } from '@/content/pulpit/register';

/** Worst first: the register is read to find what is wrong, not what is fine. */
const ORDER: StatusKey[] = ['brak', 'kuleje', 'nieznane', 'dziala'];

const GLOSS: Record<StatusKey, string> = {
  brak: 'rzeczy, których nie ma wcale',
  kuleje: 'jest, ale nie robi tego, co powinno',
  nieznane: 'z zewnątrz nie da się rozstrzygnąć',
  dziala: 'działa i nie wymaga zmiany',
};

/**
 * The shape of the whole register in one bar, and the filter for it.
 *
 * It sits above the fold because it answers the question a reader actually
 * arrives with — how bad is it — before they have scrolled anything. And it is
 * the control for the list below rather than a picture beside it: a segment
 * that shows eleven unresolved items should be the thing you click to read
 * them.
 *
 * Counts are written beside every segment, so the colour is never the only
 * reading, and the status palette is used for exactly what it is reserved for.
 */
export function Balance({
  active,
  onPick,
}: {
  active: StatusKey | null;
  onPick: (s: StatusKey | null) => void;
}) {
  const counts = ORDER.map((k) => ({ k, n: REGISTER.filter((e) => e.status === k).length })).filter(
    (c) => c.n > 0
  );
  const total = REGISTER.length;

  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Bilans rejestru
        </h2>
        <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
          {total} pozycji · kliknij, żeby zawęzić listę
        </p>
      </div>

      <div
        className="mt-4 flex overflow-hidden rounded-[4px]"
        style={{ height: MARK.maxBarThickness, gap: MARK.surfaceGap, background: INK.surface }}
      >
        {counts.map((c) => {
          const on = active === c.k;
          const dim = active !== null && !on;
          return (
            <button
              key={c.k}
              type="button"
              onClick={() => onPick(on ? null : c.k)}
              aria-pressed={on}
              aria-label={`${STATUS[c.k].label}: ${c.n} z ${total} pozycji`}
              className="relative outline-none transition-opacity focus-visible:opacity-100"
              style={{
                width: `${(c.n / total) * 100}%`,
                background: STATUS[c.k].fill,
                opacity: dim ? 0.28 : 1,
              }}
            >
              {/* The figure sits inside the segment only where it fits with air
                  around it; below that width it lives in the legend alone. */}
              {c.n / total > 0.08 && (
                <span className="text-[11px] font-extrabold tabular-nums text-white">{c.n}</span>
              )}
            </button>
          );
        })}
      </div>

      <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
        {counts.map((c) => {
          const on = active === c.k;
          return (
            <li key={c.k}>
              <button
                type="button"
                onClick={() => onPick(on ? null : c.k)}
                aria-pressed={on}
                className={`w-full rounded-[8px] px-2 py-1.5 text-left outline-none transition-colors ${
                  on ? 'bg-slate-50' : 'hover:bg-slate-50'
                }`}
                style={{ minHeight: MARK.minHitTarget }}
              >
                <span className="flex items-baseline gap-1.5">
                  <i
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-[3px]"
                    style={{ background: STATUS[c.k].fill }}
                  />
                  <span className="text-[15px] font-extrabold tabular-nums text-chamber-navy">{c.n}</span>
                  <span className="text-[12px] font-bold" style={{ color: STATUS[c.k].fill }}>
                    {STATUS[c.k].label}
                  </span>
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-500">{GLOSS[c.k]}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/*
       * Without this line the bar reads as "nothing here works", which is not
       * what it says. A register of recommendations collects things to change,
       * so by construction it has no row for anything that is already fine —
       * those are described where the analysis is, not here.
       */}
      <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-[1.6] text-slate-500">
        Rejestr zbiera <b className="text-slate-600">pozycje do zmiany</b>, więc z założenia nie ma w nim
        wiersza dla rzeczy, które działają i niczego nie wymagają — te opisane są tam, gdzie jest analiza.
        Pasek pokazuje rozkład <i>zadań</i>, nie kondycję organizacji.
      </p>
    </section>
  );
}
