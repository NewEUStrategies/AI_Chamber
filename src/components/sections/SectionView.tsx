import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { BookMarked, ExternalLink, Lock, X } from 'lucide-react';
import { DossierBlocks } from '@/components/dossier/DossierBlocks';
import { DossierHtml } from '@/components/dossier/DossierHtml';
import { useTermTooltipPositioning } from '@/components/dossier/useTermTooltipPositioning';
import {
  SECTION_PAGES,
  SOURCES_PAGE_ID,
  sectionByKey,
  type SectionKey,
} from '@/content/dossier/split';
import type { Route } from '@/lib/route';

/**
 * Sekcja dossier stojąca jako osobna strona.
 *
 * Trzy grupy stron wyszły z dossier, bo odpowiadają na inne pytania niż
 * reszta, i wszystkie trzy potrzebują dokładnie tego samego: zakładek,
 * nagłówka i działających przypisów. Jeden komponent zamiast trzech kopii
 * oznacza też, że poprawka w mechanice przypisów działa od razu wszędzie.
 *
 * Bibliografia została w dossier, bo obsługuje wszystkie piętnaście stron.
 * Odsyłacz jest więc skokiem między widokami: to samo kliknięcie, ta sama
 * podświetlona pozycja, jeden widok obok.
 *
 * Hasło na wybranych zakładkach jest cechą sekcji, a nie komponentu: dziś
 * ma je tylko rekrutacja, ale bramka nie musi o tym wiedzieć.
 */
export function SectionView({
  section: key,
  tab,
  onNavigate,
}: {
  section: SectionKey;
  tab?: string;
  onNavigate: (to: Route) => void;
}) {
  const section = sectionByKey(key);
  const pages = SECTION_PAGES[key];
  const restricted = new Set(section.restricted ?? []);
  const [active, setActive] = useState<string>(
    tab && pages.some((p) => p.id === tab) && !restricted.has(tab) ? tab : pages[0].id
  );
  const [unlocked, setUnlocked] = useState(false);
  const [gate, setGate] = useState<{ tab: string; error: boolean } | null>(null);
  const gateInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstPaint = useRef(true);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  useTermTooltipPositioning();

  const index = Math.max(0, pages.findIndex((p) => p.id === active));
  const page = pages[index];

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

  /* Zmiana zakładki zaczyna od góry otwartej strony. */
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    contentRef.current?.scrollIntoView({ block: 'start' });
  }, [active]);

  useEffect(() => {
    if (!gate) return;
    gateInputRef.current?.focus();
  }, [gate]);

  /* Zakładka chroniona otwiera bramkę zamiast treści, dopóki hasło nie padnie. */
  const selectTab = (next: string) => {
    if (restricted.has(next) && !unlocked) {
      setGate({ tab: next, error: false });
      return;
    }
    setActive(next);
  };

  const submitGate = (e: FormEvent) => {
    e.preventDefault();
    const input = gateInputRef.current;
    if (!input || !gate) return;
    if (section.password && input.value === section.password) {
      setUnlocked(true);
      setActive(gate.tab);
      setGate(null);
    } else {
      setGate({ ...gate, error: true });
      input.select();
    }
  };

  const closeGate = () => setGate(null);

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    const ids = pages.map((p) => p.id);
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % ids.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ids.length - 1;
    else return;
    e.preventDefault();
    selectTab(ids[next]);
    refs.current[ids[next]]?.focus();
  };

  return (
    <div className="dossier animate-fade-up">
      <header className="mb-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          {section.kicker}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          {section.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          {section.lead} Bibliografia została w dossier — odsyłacz w tekście przenosi do niej
          i podświetla pozycję, którą cytuje.
        </p>
      </header>

      <div
        role="tablist"
        aria-label={`Strony sekcji ${section.navLabel}`}
        onKeyDown={move}
        className="flex flex-wrap gap-1.5"
      >
        {pages.map((p) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                refs.current[p.id] = el;
              }}
              role="tab"
              id={`sec-tab-${p.id}`}
              aria-selected={on}
              aria-controls={`sec-panel-${p.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => selectTab(p.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                on
                  ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                  : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
              }`}
            >
              <span className={`font-mono text-[10px] ${on ? 'text-white/60' : 'text-slate-400'}`}>{p.num}</span>
              {p.navLabel}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`sec-panel-${page.id}`}
        aria-labelledby={`sec-tab-${page.id}`}
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
          Strona {page.num} · odsyłacze pokazują opis źródła na miejscu, a kliknięcie otwiera bibliografię
          w dossier
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
      {gate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
          onClick={closeGate}
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
              <h3 className="flex items-center gap-2 font-display text-[15px] font-extrabold text-chamber-navy">
                <Lock aria-hidden className="h-4 w-4 text-chamber-green-deep" />
                Strona chroniona
              </h3>
              <button
                type="button"
                onClick={closeGate}
                aria-label="Zamknij"
                className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={submitGate} className="space-y-3 px-5 py-4">
              <p className="text-[13px] leading-relaxed text-slate-600">
                Ta część materiałów jest dostępna po podaniu hasła.
              </p>
              <input
                ref={gateInputRef}
                type="password"
                autoComplete="off"
                placeholder="Wpisz hasło"
                className={`w-full rounded-[8px] border px-3.5 py-2.5 text-[14px] font-semibold text-chamber-navy outline-none transition-colors ${
                  gate.error
                    ? 'border-rose-300 bg-rose-50 focus:border-rose-400'
                    : 'border-slate-200 focus:border-chamber-navy'
                }`}
              />
              {gate.error && (
                <p className="text-[12px] font-semibold text-rose-500">
                  Nieprawidłowe hasło. Spróbuj ponownie.
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-[8px] bg-chamber-navy px-4 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-chamber-navy/90"
              >
                Odblokuj
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
