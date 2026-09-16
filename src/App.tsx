import { Suspense, lazy, useCallback, useState } from 'react';
import {
  Activity,
  BookText,
  Clapperboard,
  IdCard,
  LayoutDashboard,
  Megaphone,
  Radar,
  UserRoundSearch,
  LoaderCircle,
} from 'lucide-react';
import { ChamberLogo } from '@/components/ChamberLogo';
import { PulpitView } from '@/components/pulpit/PulpitView';
import { routeKey, sameView, type Route, type ViewKey } from '@/lib/route';

// The dossier ships ~320 kB of prose; keep it out of the initial bundle.
const DossierView = lazy(() =>
  import('@/components/dossier/DossierView').then((m) => ({ default: m.DossierView }))
);

// The marketing cockpit carries its own charts; keep it out of the initial bundle too.
const MarketingView = lazy(() =>
  import('@/components/marketing/MarketingView').then((m) => ({ default: m.MarketingView }))
);

// Same for the conference view: seven panels, each with its own visualisation.
const ConferenceView = lazy(() =>
  import('@/components/conference/ConferenceView').then((m) => ({ default: m.ConferenceView }))
);

// Trzy sekcje wyprowadzone z dossier dzielą jeden widok: ten sam mechanizm
// zakładek, przypisów i bloków prozy, tylko inna lista stron.
const SectionView = lazy(() =>
  import('@/components/sections/SectionView').then((m) => ({ default: m.SectionView }))
);

// Karty stanowiskowe: pięć kart, macierz, wykres płacowy i kalkulator.
const StanowiskaView = lazy(() =>
  import('@/components/stanowiska/StanowiskaView').then((m) => ({ default: m.StanowiskaView }))
);

const NAV: { key: ViewKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'pulpit', label: 'Pulpit', icon: LayoutDashboard },
  { key: 'marketing', label: 'Marketing', icon: Megaphone },
  { key: 'konferencje', label: 'Konferencje', icon: Clapperboard },
  { key: 'rekrutacja', label: 'Rekrutacja', icon: UserRoundSearch },
  { key: 'stanowiska', label: 'Stanowiska', icon: IdCard },
  { key: 'analiza', label: 'Analiza rynkowa', icon: Radar },
  { key: 'slad', label: 'Ślad cyfrowy', icon: Activity },
  { key: 'dossier', label: 'Dossier', icon: BookText },
];

export default function App() {
  const [route, setRoute] = useState<Route>({ view: 'pulpit' });
  /**
   * Counts navigations, and rides in the mounted view's key.
   *
   * Without it a deep link only works once: open the roadmap from the Pulpit,
   * switch to another tab inside the marketing view, come back and follow the
   * same link, and nothing would move — the route value is unchanged, so React
   * keeps the component and its now-stale tab state. Bumping a counter makes
   * every navigation a remount, which is the one behaviour that is correct in
   * all four views without each of them reimplementing it.
   */
  const [visit, setVisit] = useState(0);

  const navigate = useCallback((next: Route) => {
    setRoute(next);
    setVisit((v) => v + 1);
  }, []);

  /* The top nav is a plain view switch: re-clicking the view you are already
     in should not throw away where you had scrolled to. */
  const switchView = (key: ViewKey) => {
    if (sameView(route, { view: key } as Route)) return;
    navigate({ view: key } as Route);
  };

  return (
    <div className="min-h-screen chamber-grid">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        {/*
         * Osiem pozycji nie mieści się w jednym wierszu obok logo na żadnym
         * realnym ekranie, więc nawigacja schodzi do własnego wiersza, kiedy
         * zabraknie miejsca, zamiast ściskać etykiety albo wypychać nagłówek
         * poza ekran. Przewijanie poziome zostaje jako ostatnie zabezpieczenie.
         */}
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <ChamberLogo className="h-6 shrink-0 object-contain object-left sm:h-8" />
          <nav className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-slate-200 bg-slate-50 p-1 xl:gap-1">
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => switchView(item.key)}
                aria-label={item.label}
                aria-current={route.view === item.key ? 'page' : undefined}
                title={item.label}
                className={`flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-bold transition-all duration-200 xl:px-3.5 ${
                  route.view === item.key
                    ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                    : 'text-chamber-navy hover:bg-slate-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden xl:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {route.view === 'pulpit' ? (
          <PulpitView onNavigate={navigate} />
        ) : route.view === 'dossier' ? (
          <Suspense fallback={<ViewLoader label="Ładowanie dossier…" />}>
            <DossierView key={routeKey(route, visit)} page={route.page} refs={route.refs} />
          </Suspense>
        ) : route.view === 'marketing' ? (
          <Suspense fallback={<ViewLoader label="Ładowanie kokpitu…" />}>
            <MarketingView key={routeKey(route, visit)} segment={route.segment} />
          </Suspense>
        ) : route.view === 'rekrutacja' || route.view === 'analiza' || route.view === 'slad' ? (
          <Suspense fallback={<ViewLoader label="Ładowanie materiałów…" />}>
            <SectionView
              key={routeKey(route, visit)}
              section={route.view}
              tab={route.tab}
              onNavigate={navigate}
            />
          </Suspense>
        ) : route.view === 'stanowiska' ? (
          <Suspense fallback={<ViewLoader label="Ładowanie kart stanowiskowych…" />}>
            <StanowiskaView key={routeKey(route, visit)} tab={route.tab} />
          </Suspense>
        ) : (
          <Suspense fallback={<ViewLoader label="Ładowanie konferencji…" />}>
            <ConferenceView key={routeKey(route, visit)} mode={route.mode} tab={route.tab} />
          </Suspense>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs font-semibold text-slate-400">
        AI Chamber CEE · Kokpit rekomendacji i dossier rozpoznawcze
      </footer>
    </div>
  );
}

function ViewLoader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-slate-400">
      <LoaderCircle className="h-8 w-8 animate-spin text-chamber-green-deep" />
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}
