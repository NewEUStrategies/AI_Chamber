import {
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  Globe2,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { MembershipApplication, ApplicationStatus } from '@/lib/types';
import { STATUS_LABEL, formatRelative } from '@/lib/types';

interface Kpi {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}

const STAGE_FLOW: ApplicationStatus[] = ['new', 'in_review', 'interview', 'accepted'];

export function DashboardView({
  apps,
  onSelect,
}: {
  apps: MembershipApplication[];
  onSelect: (a: MembershipApplication) => void;
}) {
  const total = apps.length;
  const byStatus = (s: ApplicationStatus) => apps.filter((a) => a.status === s).length;
  const accepted = byStatus('accepted');
  const acceptanceRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  const scored = apps.filter((a) => a.score != null);
  const avgScore =
    scored.length > 0 ? Math.round(scored.reduce((s, a) => s + (a.score ?? 0), 0) / scored.length) : 0;
  const last7 = apps.filter(
    (a) => Date.now() - new Date(a.submitted_at).getTime() < 7 * 86_400_000
  ).length;

  const kpis: Kpi[] = [
    { label: 'Wszystkie aplikacje', value: String(total), sub: 'od początku rekrutacji', icon: Building2, accent: true },
    { label: 'Nowe (7 dni)', value: String(last7), sub: 'oczekują na weryfikację', icon: Clock },
    { label: 'Wskaźnik przyjęcia', value: `${acceptanceRate}%`, sub: `${accepted} przyjętych firm`, icon: TrendingUp },
    { label: 'Średnia ocena', value: scored.length ? String(avgScore) : '—', sub: 'skala 0–100', icon: BarChart3 },
  ];

  const countries = countBy(apps, (a) => a.country).slice(0, 6);
  const sectors = countBy(apps, (a) => a.sector).slice(0, 6);
  const recent = [...apps]
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <header className="animate-fade-up">
        <p className="eyebrow">·Pulpit rekrutacji</p>
        <h1 className="section-heading mt-2">Przegląd aplikacji członkowskich</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Bieżący obraz naboru firm do AI Chamber w regionie CEE — od nowych zgłoszeń po
          przyjętych członków.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="card group p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {kpi.label}
              </p>
              <kpi.icon
                className={`h-5 w-5 transition-colors ${
                  kpi.accent ? 'text-chamber-green-deep' : 'text-slate-300 group-hover:text-chamber-green-deep'
                }`}
              />
            </div>
            <p
              className={`mt-3 font-display text-4xl font-extrabold ${
                kpi.accent ? 'text-chamber-green-deep' : 'text-chamber-navy'
              }`}
            >
              {kpi.value}
            </p>
            <p className="mt-1.5 text-xs text-slate-400">{kpi.sub}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6 sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-chamber-navy">
            <Globe2 className="h-4 w-4 text-chamber-green-deep" /> Kandydaci według kraju
          </h2>
          <div className="mt-5 space-y-3.5">
            {countries.map(([country, count]) => (
              <Bar key={country} label={country} value={count} max={countries[0][1]} suffix={`${count}`} />
            ))}
          </div>
        </div>
        <div className="card p-6 sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-chamber-navy">
            <BarChart3 className="h-4 w-4 text-chamber-green-deep" /> Kandydaci według branży
          </h2>
          <div className="mt-5 space-y-3.5">
            {sectors.map(([sector, count]) => (
              <Bar key={sector} label={sector} value={count} max={sectors[0][1]} suffix={`${count}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="card p-6 sm:p-7 lg:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-chamber-navy">
            <Users className="h-4 w-4 text-chamber-green-deep" /> Lejek procesu
          </h2>
          <ol className="mt-6 space-y-4">
            {STAGE_FLOW.map((stage, i) => {
              const count = byStatus(stage);
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const isLast = i === STAGE_FLOW.length - 1;
              return (
                <li key={stage} className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                      isLast
                        ? 'bg-chamber-green text-chamber-navy-deep'
                        : 'bg-chamber-navy/[0.07] text-chamber-navy'
                    }`}
                  >
                    {count}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-chamber-navy">{STATUS_LABEL[stage]}</p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-chamber-navy/[0.08]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isLast ? 'bg-chamber-green-deep' : 'bg-sky-500/60'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{pct}%</span>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-center">
            <div>
              <p className="font-display text-xl font-extrabold text-rose-600">{byStatus('rejected')}</p>
              <p className="text-xs text-slate-400">odrzucone</p>
            </div>
            <div>
              <p className="font-display text-xl font-extrabold text-slate-400">
                {byStatus('withdrawn')}
              </p>
              <p className="text-xs text-slate-400">wycofane</p>
            </div>
          </div>
        </div>

        <div className="card p-6 sm:p-7 lg:col-span-3">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-chamber-navy">
            <Clock className="h-4 w-4 text-chamber-green-deep" /> Najnowsze aplikacje
          </h2>
          <ul className="mt-5 divide-y divide-slate-100">
            {recent.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => onSelect(a)}
                  className="group flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-[#f2f3f6]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chamber-navy/[0.07] text-xs font-extrabold text-chamber-navy">
                    {initials(a.company_name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-chamber-navy group-hover:text-chamber-green-deep">
                      {a.company_name}
                    </span>
                    <span className="block truncate text-xs text-slate-400">
                      {a.country} · {a.sector} · {formatRelative(a.submitted_at)}
                    </span>
                  </span>
                  {a.status === 'accepted' && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-chamber-green-deep" />
                  )}
                  <span className="shrink-0 text-xs font-semibold text-slate-400">
                    {STATUS_LABEL[a.status]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Bar({
  label,
  value,
  max,
  suffix,
}: {
  label: string;
  value: number;
  max: number;
  suffix: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 truncate text-xs font-semibold text-slate-600">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-chamber-navy/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-chamber-navy to-chamber-green-deep transition-all duration-700"
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-xs font-bold text-slate-500">{suffix}</span>
    </div>
  );
}

function countBy(
  apps: MembershipApplication[],
  key: (a: MembershipApplication) => string
): [string, number][] {
  const map = new Map<string, number>();
  for (const a of apps) map.set(key(a), (map.get(key(a)) ?? 0) + 1);
  return [...map.entries()].sort((x, y) => y[1] - x[1]);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}
