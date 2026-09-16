import { useMemo, useState } from 'react';
import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from 'lucide-react';
import type { ApplicationStatus, MembershipApplication } from '@/lib/types';
import {
  CEE_COUNTRIES,
  SECTORS,
  STATUS_LABEL,
  STATUS_ORDER,
  formatDate,
  statusClass,
} from '@/lib/types';
import { scoreColor } from '@/lib/applications';

type SortKey = 'company_name' | 'country' | 'sector' | 'status' | 'score' | 'submitted_at';

export function ApplicationsView({
  apps,
  onStatusChange,
  onSelect,
}: {
  apps: MembershipApplication[];
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onSelect: (a: MembershipApplication) => void;
}) {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [sector, setSector] = useState('');
  const [status, setStatus] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('submitted_at');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 10;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = apps.filter((a) => {
      if (status && a.status !== status) return false;
      if (country && a.country !== country) return false;
      if (sector && a.sector !== sector) return false;
      if (!q) return true;
      return (
        a.company_name.toLowerCase().includes(q) ||
        a.contact_name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.city?.toLowerCase().includes(q)
      );
    });
    const dir = sortAsc ? 1 : -1;
    return [...list].sort((a, b) => {
      switch (sortKey) {
        case 'score':
          return ((a.score ?? -1) - (b.score ?? -1)) * dir;
        case 'status':
          return (STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)) * dir;
        case 'submitted_at':
          return (
            (new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()) * dir
          );
        default:
          return String(a[sortKey]).localeCompare(String(b[sortKey]), 'pl') * dir;
      }
    });
  }, [apps, search, country, sector, status, sortKey, sortAsc]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages - 1);
  const rows = filtered.slice(safePage * perPage, safePage * perPage + perPage);
  const activeFilters = [country, sector, status].filter(Boolean).length;

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(key === 'company_name' || key === 'country' || key === 'sector');
    }
  }

  return (
    <div className="space-y-6">
      <header className="animate-fade-up">
        <p className="eyebrow">·Rekrutacja</p>
        <h1 className="section-heading mt-2">Aplikacje</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Wszystkie zgłoszenia firm do AI Chamber — filtrowanie, sortowanie i szybka zmiana etapu.
        </p>
      </header>

      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Szukaj firmy, osoby, e-maila lub miasta…"
              className="input pl-9"
            />
            {search && (
              <button
                aria-label="Wyczyść wyszukiwanie"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-chamber-navy"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs font-bold text-slate-400 sm:flex">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {activeFilters > 0 ? `Filtry (${activeFilters})` : 'Filtry'}
            </span>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setPage(0);
              }}
              className="input w-auto text-xs"
            >
              <option value="">Wszystkie kraje</option>
              {CEE_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                setPage(0);
              }}
              className="input w-auto text-xs"
            >
              <option value="">Wszystkie branże</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
              className="input w-auto text-xs"
            >
              <option value="">Wszystkie statusy</option>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                <Th label="Firma" onSort={() => toggleSort('company_name')} active={sortKey === 'company_name'} asc={sortAsc} />
                <Th label="Kraj" onSort={() => toggleSort('country')} active={sortKey === 'country'} asc={sortAsc} />
                <Th label="Branża" onSort={() => toggleSort('sector')} active={sortKey === 'sector'} asc={sortAsc} />
                <th className="px-4 py-3 font-bold">Dojrzałość AI</th>
                <Th label="Ocena" onSort={() => toggleSort('score')} active={sortKey === 'score'} asc={sortAsc} />
                <Th label="Status" onSort={() => toggleSort('status')} active={sortKey === 'status'} asc={sortAsc} />
                <Th label="Zgłoszono" onSort={() => toggleSort('submitted_at')} active={sortKey === 'submitted_at'} asc={sortAsc} />
                <th className="px-4 py-3 text-right font-bold">Etap</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-slate-400">
                    Brak aplikacji spełniających kryteria.
                  </td>
                </tr>
              )}
              {rows.map((a) => (
                <tr
                  key={a.id}
                  className="group cursor-pointer border-b border-slate-100 transition-colors hover:bg-[#f2f3f6]"
                  onClick={() => onSelect(a)}
                >
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-chamber-navy group-hover:text-chamber-green-deep">
                      {a.company_name}
                    </p>
                    <p className="text-xs text-slate-400">{a.contact_name} · {a.city ?? a.country}</p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{a.country}</td>
                  <td className="px-4 py-3.5 text-slate-600">{a.sector}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {a.ai_maturity}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {a.score != null ? (
                      <span className={`font-bold ${scoreColor(a.score)}`}>{a.score}</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${statusClass(
                        a.status
                      )}`}
                    >
                      {STATUS_LABEL[a.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">{formatDate(a.submitted_at)}</td>
                  <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={a.status}
                      onChange={(e) => onStatusChange(a.id, e.target.value as ApplicationStatus)}
                      className="input w-auto py-1.5 text-xs"
                    >
                      {STATUS_ORDER.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs font-semibold text-slate-500">
          <span>
            {filtered.length === 0
              ? '0 wyników'
              : `${safePage * perPage + 1}–${Math.min((safePage + 1) * perPage, filtered.length)} z ${filtered.length}`}
          </span>
          <span className="flex items-center gap-2">
            <button
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
              className="rounded-lg border border-slate-200 p-1.5 transition-colors hover:border-chamber-green hover:text-chamber-green-deep disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500"
              aria-label="Poprzednia strona"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-bold text-chamber-navy">
              {safePage + 1} / {pages}
            </span>
            <button
              disabled={safePage >= pages - 1}
              onClick={() => setPage(safePage + 1)}
              className="rounded-lg border border-slate-200 p-1.5 transition-colors hover:border-chamber-green hover:text-chamber-green-deep disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500"
              aria-label="Następna strona"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </span>
        </div>
      </div>

      {rows.length > 0 && (
        <p className="flex items-center gap-1.5 text-xs text-slate-400">
          <Users className="h-3.5 w-3.5" /> Kliknij wiersz, aby zobaczyć pełne zgłoszenie.
        </p>
      )}
    </div>
  );
}

function Th({
  label,
  onSort,
  active,
  asc,
}: {
  label: string;
  onSort: () => void;
  active: boolean;
  asc: boolean;
}) {
  return (
    <th className="px-4 py-3 font-bold">
      <button
        onClick={onSort}
        className={`inline-flex items-center gap-1 transition-colors hover:text-chamber-green-deep ${
          active ? 'text-chamber-green-deep' : ''
        }`}
      >
        {label}
        <ArrowDownUp
          className={`h-3 w-3 transition-transform ${active && asc ? 'rotate-180' : ''} ${
            active ? 'opacity-100' : 'opacity-30'
          }`}
        />
      </button>
    </th>
  );
}
