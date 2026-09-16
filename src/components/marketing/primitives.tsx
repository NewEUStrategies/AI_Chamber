import type { ReactNode } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';

/** Tytuł sekcji widoku marketingowego, w rytmie nagłówków dashboardu. */
export function MktHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="animate-fade-up">
      <p className="eyebrow">·{eyebrow}</p>
      <h1 className="section-heading mt-2">{title}</h1>
      {children ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{children}</p> : null}
    </header>
  );
}

/** Karta z nagłówkiem i opcjonalnym dymkiem objaśniającym. */
export function MktPanel({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  const tip = useChartTip();
  const show = note
    ? (e: { clientX: number; clientY: number }) => tip.show(e, [], title, note)
    : undefined;
  return (
    <section
      className="card p-6 sm:p-7"
      onMouseEnter={show}
      onMouseMove={show}
      onMouseLeave={tip.hide}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="font-display text-base font-bold text-chamber-navy">{title}</h2>
        {note ? <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">i</span> : null}
      </div>
      {children}
      <ChartTip tip={tip.tip} />
    </section>
  );
}

/** Kafelek liczby z dymkiem objaśniającym, w rytmie kafelka dashboardu. */
export function MktStat({ value, label, info }: { value: string; label: string; info: string }) {
  const tip = useChartTip();
  const show = (e: { clientX: number; clientY: number }) => tip.show(e, [], label, info);
  return (
    <div
      className="card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
      onMouseEnter={show}
      onMouseMove={show}
      onMouseLeave={tip.hide}
    >
      <p className="font-display text-3xl font-extrabold text-chamber-navy">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <ChartTip tip={tip.tip} />
    </div>
  );
}
