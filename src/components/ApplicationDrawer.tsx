import { useEffect, useState } from 'react';
import {
  Building2,
  CalendarDays,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import type { ApplicationStatus, MembershipApplication } from '@/lib/types';
import {
  STATUS_LABEL,
  STATUS_ORDER,
  companySizeLabel,
  formatRelative,
  maturityLabel,
  statusClass,
} from '@/lib/types';
import { scoreColor } from '@/lib/applications';

export function ApplicationDrawer({
  app,
  onClose,
  onStatusChange,
  onScoreChange,
  onReviewerChange,
  onNotesChange,
  onDelete,
}: {
  app: MembershipApplication;
  onClose: () => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onScoreChange: (id: string, score: number) => void;
  onReviewerChange: (id: string, reviewer: string) => void;
  onNotesChange: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}) {
  const [notes, setNotes] = useState(app.notes ?? '');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => setNotes(app.notes ?? ''), [app.id, app.notes]);
  useEffect(() => setConfirmDelete(false), [app.id]);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-chamber-navy-deep/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 bg-white p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass(
                  app.status
                )}`}
              >
                {STATUS_LABEL[app.status]}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                zgłoszono {formatRelative(app.submitted_at)}
              </span>
            </div>
            <h2 className="mt-2 truncate font-display text-2xl font-extrabold text-chamber-navy">
              {app.company_name}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {app.sector} · {companySizeLabel(app.company_size)}
              {app.employees != null ? ` · ${app.employees} os.` : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Zamknij"
            className="rounded-lg border border-slate-200 p-2 text-slate-400 transition-colors hover:border-chamber-navy/30 hover:text-chamber-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Info icon={UserRound} label="Osoba kontaktowa" value={app.contact_name} />
            <Info icon={Mail} label="E-mail" value={app.email} />
            <Info icon={Phone} label="Telefon" value={app.phone ?? '—'} />
            <Info icon={Globe} label="Strona" value={app.website ?? '—'} href={app.website ?? undefined} />
            <Info icon={MapPin} label="Lokalizacja" value={[app.city, app.country].filter(Boolean).join(', ')} />
            <Info icon={Building2} label="Dojrzałość AI" value={maturityLabel(app.ai_maturity)} />
          </section>

          {app.motivation && (
            <section className="card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Motywacja zgłoszenia
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{app.motivation}</p>
            </section>
          )}

          <section className="card space-y-4 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ocena wewnętrzna
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="label">Etap</label>
                <select
                  value={app.status}
                  onChange={(e) => onStatusChange(app.id, e.target.value as ApplicationStatus)}
                  className="input py-2"
                >
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  Ocena <Star className="inline h-3 w-3 text-chamber-green" />
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={app.score ?? ''}
                  placeholder="0–100"
                  onChange={(e) => onScoreChange(app.id, Number(e.target.value))}
                  className="input py-2"
                />
                {app.score != null && (
                  <p className={`mt-1 text-xs font-semibold ${scoreColor(app.score)}`}>
                    {app.score >= 80 ? 'Silny kandydat' : app.score >= 60 ? 'Warto rozważyć' : 'Słaby profil'}
                  </p>
                )}
              </div>
              <div>
                <label className="label">Opiekun</label>
                <input
                  value={app.reviewer ?? ''}
                  placeholder="np. Tomasz S."
                  onChange={(e) => onReviewerChange(app.id, e.target.value)}
                  className="input py-2"
                />
              </div>
            </div>
          </section>

          <section className="card p-4">
            <label className="label flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-chamber-green-deep" /> Notatki wewnętrzne
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => {
                if (notes !== (app.notes ?? '')) onNotesChange(app.id, notes);
              }}
              rows={4}
              placeholder="Uwagi z rozmowy, rekomendacje, następne kroki…"
              className="input resize-none leading-relaxed"
            />
            <p className="mt-1.5 text-xs text-slate-500">Zapis automatyczny po opuszczeniu pola.</p>
          </section>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 p-4">
          <span className="text-xs text-slate-400">
            Zgłoszenie: {new Date(app.submitted_at).toLocaleString('pl-PL')}
          </span>
          {confirmDelete ? (
            <span className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-600">Usunąć bezpowrotnie?</span>
              <button
                onClick={() => onDelete(app.id)}
                className="rounded-full bg-rose-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-rose-500"
              >
                Tak, usuń
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600 hover:border-slate-400"
              >
                Anuluj
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-4 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:border-rose-400 hover:bg-rose-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Usuń aplikację
            </button>
          )}
        </footer>
      </aside>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-chamber-green-deep" />
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-sm font-bold text-chamber-navy underline-offset-2 hover:text-chamber-green-deep hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-sm font-bold text-chamber-navy">{value}</p>
        )}
      </div>
    </div>
  );
}
