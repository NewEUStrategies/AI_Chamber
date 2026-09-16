import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { BookMarked, ExternalLink } from 'lucide-react';
import { DossierBlocks } from '@/components/dossier/DossierBlocks';
import { DossierHtml } from '@/components/dossier/DossierHtml';
import { useTermTooltipPositioning } from '@/components/dossier/useTermTooltipPositioning';
import {
  RECRUITMENT_PAGES,
  SOURCES_PAGE_ID,
  type RecruitmentTab,
} from '@/content/dossier/split';
import type { Route } from '@/lib/route';

/**
 * Rekrutacja — the five candidate-facing pages, moved out of the dossier.
 *
 * They were the last third of a fifteen-page document and they answer a
 * different question from the rest of it: the dossier is reconnaissance on the
 * organisation, these are preparation for a conversation with it. Read in one
 * sitting, in this order — who I am, what is on offer, how I fit, what I will
 * be asked, and the thirty seconds that has to land first — they are a
 * different document, so they get their own page and their own tabs.
 *
 * The bibliography stays in the dossier, because it serves all fifteen pages.
 * A footnote marker here therefore becomes a cross-view jump: the same click
 * as before, landing on the same entry, one view over.
 */
export function RecruitmentView({
  tab,
  onNavigate,
}: {
  tab?: RecruitmentTab;
  onNavigate: (to: Route) => void;
}) {
  const [active, setActive] = useState<string>(
    tab && RECRUITMENT_PAGES.some((p) => p.id === tab) ? tab : RECRUITMENT_PAGES[0].id
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const firstPaint = useRef(true);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  useTermTooltipPositioning();

  const index = Math.max(0, RECRUITMENT_PAGES.findIndex((p) => p.id === active));
  const page = RECRUITMENT_PAGES[index];

  /**
   * Footnote markers still work, they just land one view over. The reveal
   * logic lives in the dossier and is driven by the route, so this side only
   * has to name the entries it wants opened.
   */
  const jumpToSource = useCallback(
    (el: HTMLElement | null) => {
      const marker = el?.closest<HTMLElement>('sup.fn[data-refs]');
      if (!marker) return false;
      const list = (marker.dataset.refs ?? '').split(',').filter(Boolean);
      if (!list.length) return false;
      onNavigate({ view: 'dossier', page: SOURCES_PAGE_ID, refs: list });
      return true;
    },
    [onNavigate]
  );

  const onContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (jumpToSource(e.target as HTMLElement)) e.preventDefault();
    },
    [jumpToSource]
  );

  const onContentKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (jumpToSource(e.target as HTMLElement)) e.preventDefault();
    },
    [jumpToSource]
  );

  /* A tab change starts at the top of the page it opened. */
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    contentRef.current?.scrollIntoView({ block: 'start' });
  }, [active]);

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    const ids = RECRUITMENT_PAGES.map((p) => p.id);
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % ids.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ids.length - 1;
    else return;
    e.preventDefault();
    setActive(ids[next]);
    refs.current[ids[next]]?.focus();
  };

  return (
    <div className="dossier animate-fade-up">
      <header className="mb-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          Rekrutacja · przygotowanie do rozmowy
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          Pięć stron, które czyta się przed rozmową
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          Wydzielone z dossier, bo odpowiadają na inne pytanie: dossier jest rozpoznaniem organizacji,
          to jest przygotowaniem do rozmowy z nią. Kolejność zakładek jest kolejnością czytania.
          Bibliografia została w dossier — odsyłacz w tekście przenosi do niej i podświetla pozycję,
          którą cytuje.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Strony rekrutacyjne"
        onKeyDown={move}
        className="flex flex-wrap gap-1.5"
      >
        {RECRUITMENT_PAGES.map((p) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                refs.current[p.id] = el;
              }}
              role="tab"
              id={`rk-tab-${p.id}`}
              aria-selected={on}
              aria-controls={`rk-panel-${p.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(p.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                on
                  ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                  : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
              }`}
            >
              <span className={`font-mono text-[10px] ${on ? 'text-white/60' : 'text-slate-400'}`}>
                {p.num}
              </span>
              {p.navLabel}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`rk-panel-${page.id}`}
        aria-labelledby={`rk-tab-${page.id}`}
        tabIndex={0}
        className="dossier-content mt-6 outline-none"
      >
        <div
          ref={contentRef}
          key={page.id}
          onClick={onContentClick}
          onKeyDown={onContentKeyDown}
          className="animate-fade-up scroll-mt-24"
        >
          <header className="mb-8 border-b border-slate-200 pb-6">
            <p className="eyebrow">{page.eyebrow ?? page.group}</p>
            <h2
              className="mt-3 font-display text-[clamp(24px,3.4vw,36px)] font-extrabold leading-tight tracking-tight text-chamber-navy"
              dangerouslySetInnerHTML={{ __html: page.title }}
            />
            {page.lead && (
              <DossierHtml
                className="mt-4 max-w-[70ch] text-[15px] text-slate-500 [&_p]:m-0"
                html={`<p>${page.lead}</p>`}
              />
            )}
          </header>

          <DossierBlocks blocks={page.blocks} />
        </div>

        <p className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6 text-xs text-slate-400">
          <BookMarked className="h-3.5 w-3.5 shrink-0" />
          Strona {page.num} · odsyłacze pokazują opis źródła na miejscu, a kliknięcie otwiera
          bibliografię w dossier
          <button
            type="button"
            onClick={() => onNavigate({ view: 'dossier', page: SOURCES_PAGE_ID })}
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-chamber-navy transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Bibliografia
            <ExternalLink aria-hidden className="h-3 w-3" />
          </button>
        </p>
      </div>
    </div>
  );
}
