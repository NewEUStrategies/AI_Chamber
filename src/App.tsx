import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { BookText, LayoutDashboard, Table2, TriangleAlert, LoaderCircle } from 'lucide-react';
import type { ApplicationStatus, MembershipApplication } from '@/lib/types';
import { fetchApplications, updateApplication, deleteApplication } from '@/lib/applications';
import { ChamberLogo } from '@/components/ChamberLogo';
import { DashboardView } from '@/components/DashboardView';
import { ApplicationsView } from '@/components/ApplicationsView';
import { ApplicationDrawer } from '@/components/ApplicationDrawer';

// The dossier ships ~320 kB of prose; keep it out of the initial bundle.
const DossierView = lazy(() =>
  import('@/components/dossier/DossierView').then((m) => ({ default: m.DossierView }))
);

type View = 'dashboard' | 'applications' | 'dossier';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [apps, setApps] = useState<MembershipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MembershipApplication | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setApps(await fetchApplications());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Nie udało się pobrać danych.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const refreshSelected = (updated: Partial<MembershipApplication>) => {
    setSelected((s) => (s ? { ...s, ...updated } : s));
  };

  async function persist(
    id: string,
    patch: Partial<Pick<MembershipApplication, 'status' | 'score' | 'reviewer' | 'notes'>>,
    optimistic: Partial<MembershipApplication>
  ) {
    setApps((list) => list.map((a) => (a.id === id ? { ...a, ...optimistic } : a)));
    refreshSelected(optimistic);
    try {
      await updateApplication(id, patch);
    } catch {
      setError('Nie udało się zapisać zmiany — odśwież stronę.');
      void load();
    }
  }

  const handleStatus = (id: string, status: ApplicationStatus) =>
    persist(id, { status }, { status });
  const handleScore = (id: string, score: number) =>
    persist(id, { score: Number.isNaN(score) ? null : score }, { score: Number.isNaN(score) ? null : score });
  const handleReviewer = (id: string, reviewer: string) =>
    persist(id, { reviewer: reviewer || null }, { reviewer: reviewer || null });
  const handleNotes = (id: string, notes: string) => persist(id, { notes }, { notes });

  async function handleDelete(id: string) {
    setApps((list) => list.filter((a) => a.id !== id));
    setSelected(null);
    try {
      await deleteApplication(id);
    } catch {
      setError('Nie udało się usunąć aplikacji.');
      void load();
    }
  }

  const nav: { key: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'dashboard', label: 'Pulpit', icon: LayoutDashboard },
    { key: 'applications', label: 'Aplikacje', icon: Table2 },
    { key: 'dossier', label: 'Dossier', icon: BookText },
  ];

  return (
    <div className="min-h-screen chamber-grid">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <ChamberLogo className="h-6 max-w-[35vw] object-contain object-left sm:h-8" />
          <nav className="flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
            {nav.map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                aria-label={item.label}
                aria-current={view === item.key ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 ${
                  view === item.key
                    ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                    : 'text-chamber-navy hover:bg-slate-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {error && view !== 'dossier' && (
          <div className="card mb-6 flex items-start gap-3 border-rose-200 bg-rose-50 p-4">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
            <div className="flex-1">
              <p className="text-sm font-bold text-rose-700">Wystąpił problem</p>
              <p className="text-sm text-rose-600/90">{error}</p>
            </div>
            <button onClick={() => void load()} className="btn-secondary px-4 py-1.5 text-xs">
              Ponów
            </button>
          </div>
        )}

        {view === 'dossier' ? (
          <Suspense fallback={<ViewLoader label="Ładowanie dossier…" />}>
            <DossierView />
          </Suspense>
        ) : loading ? (
          <ViewLoader label="Ładowanie danych rekrutacji…" />
        ) : apps.length === 0 && !error ? (
          <div className="card mx-auto max-w-lg p-10 text-center">
            <p className="font-display text-xl font-extrabold text-chamber-navy">Brak aplikacji w bazie</p>
            <p className="mt-2 text-sm text-slate-500">
              Gdy pojawią się zgłoszenia firm, pojawią się tutaj automatycznie.
            </p>
          </div>
        ) : view === 'dashboard' ? (
          <DashboardView
            apps={apps}
            onSelect={(a) => {
              setSelected(a);
            }}
          />
        ) : (
          <ApplicationsView
            apps={apps}
            onStatusChange={handleStatus}
            onSelect={(a) => {
              setSelected(a);
            }}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs font-semibold text-slate-400">
        AI Chamber CEE · Kokpit rekrutacji i dossier rozpoznawcze
      </footer>

      {selected && (
        <ApplicationDrawer
          app={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatus}
          onScoreChange={handleScore}
          onReviewerChange={handleReviewer}
          onNotesChange={handleNotes}
          onDelete={handleDelete}
        />
      )}
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
