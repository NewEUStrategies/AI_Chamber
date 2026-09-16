import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookMarked, CornerUpLeft } from 'lucide-react';
import { DOSSIER_GROUPS, DOSSIER_PAGES } from '@/content/dossier';
import { DossierChart } from '@/components/dossier/DossierChart';
import { DossierHtml } from '@/components/dossier/DossierHtml';
import { DossierTabs } from '@/components/dossier/DossierTabs';

const SOURCES_PAGE = 'zrodla';
const HIGHLIGHT_MS = 3200;

export function DossierView() {
  const [pageId, setPageId] = useState(DOSSIER_PAGES[0].id);
  const [pendingRefs, setPendingRefs] = useState<string[] | null>(null);
  const [returnTo, setReturnTo] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstPaint = useRef(true);

  const index = Math.max(0, DOSSIER_PAGES.findIndex((p) => p.id === pageId));
  const page = DOSSIER_PAGES[index];
  const prev = DOSSIER_PAGES[index - 1];
  const next = DOSSIER_PAGES[index + 1];

  const goTo = useCallback((id: string) => {
    setPageId(id);
    setPendingRefs(null);
    setReturnTo(null);
  }, []);

  /* Footnote markers jump to their entry in the bibliography (page 08). */
  const onContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const marker = (e.target as HTMLElement).closest<HTMLElement>('sup.fn[data-refs]');
      if (!marker) return;
      e.preventDefault();
      const refs = (marker.dataset.refs ?? '').split(',').filter(Boolean);
      if (!refs.length) return;
      if (pageId !== SOURCES_PAGE) setReturnTo(pageId);
      setPageId(SOURCES_PAGE);
      setPendingRefs(refs);
    },
    [pageId]
  );

  const onContentKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const marker = (e.target as HTMLElement).closest<HTMLElement>('sup.fn[data-refs]');
      if (!marker) return;
      e.preventDefault();
      const refs = (marker.dataset.refs ?? '').split(',').filter(Boolean);
      if (!refs.length) return;
      if (pageId !== SOURCES_PAGE) setReturnTo(pageId);
      setPageId(SOURCES_PAGE);
      setPendingRefs(refs);
    },
    [pageId]
  );

  /* Highlight and reveal the cited entries once the sources page is on screen. */
  useEffect(() => {
    if (pageId !== SOURCES_PAGE || !pendingRefs) return;
    const root = contentRef.current;
    if (!root) return;
    const targets = pendingRefs
      .map((r) => root.querySelector<HTMLElement>(`[data-src="${CSS.escape(r)}"]`))
      .filter((el): el is HTMLElement => el != null);
    targets.forEach((el) => el.classList.add('is-target'));
    targets[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const timer = window.setTimeout(() => {
      targets.forEach((el) => el.classList.remove('is-target'));
      setPendingRefs(null);
    }, HIGHLIGHT_MS);
    return () => {
      window.clearTimeout(timer);
      targets.forEach((el) => el.classList.remove('is-target'));
    };
  }, [pageId, pendingRefs]);

  /* Plain page changes start at the top; footnote jumps scroll themselves. */
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    if (pendingRefs) return;
    contentRef.current?.scrollIntoView({ block: 'start' });
  }, [pageId, pendingRefs]);

  return (
    <div className="dossier flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="lg:w-[272px] lg:shrink-0">
        <div className="lg:sticky lg:top-24">
          <div className="card overflow-hidden">
            <nav
              aria-label="Strony dossier"
              className="flex gap-1 overflow-x-auto p-2 lg:block lg:max-h-none lg:overflow-x-visible"
            >
              {DOSSIER_GROUPS.map((group) => (
                <div key={group.group} className="flex shrink-0 gap-1 lg:block">
                  <p className="hidden px-3 pb-1 pt-3 text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400 lg:block">
                    {group.group}
                  </p>
                  {group.pages.map((p) => {
                    const active = p.id === pageId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => goTo(p.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left text-[13px] font-bold transition-colors lg:w-full lg:gap-3 lg:whitespace-normal ${
                          active
                            ? 'bg-chamber-navy/[0.07] text-chamber-navy'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-chamber-navy'
                        }`}
                      >
                        {active && (
                          <span className="absolute inset-y-1.5 left-0 hidden w-[3px] rounded-full bg-chamber-green lg:block" />
                        )}
                        <span
                          className={`w-5 shrink-0 text-[11px] font-extrabold tabular-nums ${
                            active ? 'text-chamber-green-deep' : 'text-slate-300'
                          }`}
                        >
                          {p.num}
                        </span>
                        <span className="min-w-0 flex-1 leading-snug">{p.navLabel}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>

            <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 text-[11px] leading-relaxed text-slate-400">
              KRS / rejestr.io · odczyt 08.2026
              <br />
              Źródło własne: aichamber.eu
              <br />
              Cennik składek: niejawny
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div
          ref={contentRef}
          key={page.id}
          onClick={onContentClick}
          onKeyDown={onContentKeyDown}
          className="animate-fade-up scroll-mt-24"
        >
          {page.hero ? (
            <header className="pb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                <span className="h-[7px] w-[7px] rounded-full bg-chamber-green ring-4 ring-chamber-green/20" />
                {page.hero.tag}
              </span>
              <h1
                className="mt-5 font-display text-[clamp(28px,4.6vw,46px)] font-extrabold leading-[1.08] tracking-tight text-chamber-navy"
                dangerouslySetInnerHTML={{ __html: page.hero.title }}
              />
              <DossierHtml
                className="mt-5 max-w-[64ch] text-base text-slate-500 [&_p]:m-0"
                html={`<p>${page.hero.lead}</p>`}
              />
            </header>
          ) : (
            <header className="mb-8 border-b border-slate-200 pb-6 pt-2">
              {page.eyebrow && <p className="eyebrow">{page.eyebrow}</p>}
              <h1
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
          )}

          {page.id === SOURCES_PAGE && returnTo && (
            <button
              onClick={() => goTo(returnTo)}
              className="btn-secondary mb-6 px-4 py-1.5 text-xs"
            >
              <CornerUpLeft className="h-3.5 w-3.5" />
              Wróć do: {DOSSIER_PAGES.find((p) => p.id === returnTo)?.navLabel}
            </button>
          )}

          <div className="space-y-6">
            {page.blocks.map((block, i) =>
              block.kind === 'tabs' ? (
                <DossierTabs key={`${block.group}-${i}`} group={block.group} tabs={block.tabs} />
              ) : block.kind === 'component' ? (
                <DossierChart key={i} name={block.name} caption={block.caption} />
              ) : (
                <DossierHtml key={i} html={block.html} />
              )
            )}
          </div>
        </div>

        <nav className="mt-10 flex items-stretch justify-between gap-3 border-t border-slate-200 pt-6">
          {prev ? (
            <button onClick={() => goTo(prev.id)} className="group card flex items-center gap-3 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
              <ArrowLeft className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-chamber-green-deep" />
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Poprzednia
                </span>
                <span className="block truncate text-sm font-bold text-chamber-navy">{prev.navLabel}</span>
              </span>
            </button>
          ) : (
            <span />
          )}
          {next && (
            <button onClick={() => goTo(next.id)} className="group card ml-auto flex items-center gap-3 px-4 py-3 text-right transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Następna
                </span>
                <span className="block truncate text-sm font-bold text-chamber-navy">{next.navLabel}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-chamber-green-deep" />
            </button>
          )}
        </nav>

        <p className="mt-6 flex items-center gap-2 text-xs text-slate-400">
          <BookMarked className="h-3.5 w-3.5 shrink-0" />
          Strona {page.num} z {String(DOSSIER_PAGES.length).padStart(2, '0')} · odsyłacze otwierają opis
          źródła, kliknięcie przenosi do bibliografii
        </p>
      </div>
    </div>
  );
}
