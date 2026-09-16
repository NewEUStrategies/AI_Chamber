import { useEffect, useRef, useState } from 'react';
import type { DossierTab } from '@/content/dossier';
import { DossierBlocks } from '@/components/dossier/DossierBlocks';

/** Tab group, styled after the platform's pill navigation. */
export function DossierTabs({ group, tabs }: { group: string; tabs: DossierTab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setActive(0), [group]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="mb-6">
      <div
        role="tablist"
        aria-label="Zakładki sekcji"
        onKeyDown={onKeyDown}
        className="inline-flex max-w-full flex-wrap gap-1 rounded-[7px] border border-slate-200 bg-slate-50 p-1"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 ${
              i === active
                ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                : 'text-chamber-navy hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        key={tabs[active].id}
        role="tabpanel"
        id={`panel-${tabs[active].id}`}
        aria-labelledby={`tab-${tabs[active].id}`}
        className="mt-6 animate-fade-up"
      >
        <DossierBlocks blocks={tabs[active].blocks ?? [{ kind: 'html', html: tabs[active].html ?? '' }]} />
      </div>
    </div>
  );
}
