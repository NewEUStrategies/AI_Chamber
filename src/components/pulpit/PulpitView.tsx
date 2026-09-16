import { StatTile } from '@/components/marketing/primitives';
import { STATUS } from '@/components/marketing/palette';
import { HORIZONS, TOTALS } from '@/content/pulpit/register';
import type { Route } from '@/lib/route';
import { AreaMap } from './AreaMap';
import { RegisterList } from './RegisterList';

/**
 * Pulpit — the register of recommendations against the state they answer.
 *
 * The page owns no analysis of its own. Every row is a pointer: one line on
 * what the reconnaissance found, one line on what to do about it, and a
 * destination where that recommendation is worked out in full. Restating the
 * argument here would create a second version of it, and the second version is
 * always the one that goes stale.
 *
 * Status is the only colour scale on the page, which is exactly what the
 * status tokens are reserved for — and it is the right one, because the
 * question the page answers is what state each thing is in.
 */
export function PulpitView({ onNavigate }: { onNavigate: (to: Route) => void }) {
  return (
    <div className="animate-fade-up space-y-6">
      <header>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          Pulpit · AI Chamber CEE
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          Stan aktualny obok rekomendacji
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          Jeden rejestr na sześć obszarów. Każdy wiersz zestawia to, co rozpoznanie ustaliło, z tym, co
          proponujemy zrobić — i prowadzi do strony, na której ta rekomendacja jest rozpisana. Liczby nie
          są tu przepisywane: wszystko, co policzalne, dolicza się z danych rozpoznania. Tam, gdzie
          z zewnątrz nie da się rozstrzygnąć stanu, napisane jest{' '}
          <b style={{ color: STATUS.nieznane.fill }}>nieznane</b> — i takich pozycji jest{' '}
          <b className="tabular-nums">{TOTALS.unknown}</b>.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Pozycji w rejestrze"
          value={String(TOTALS.entries)}
          sub="na sześć obszarów, każda z własnym adresem"
        />
        <StatTile
          label="Rzeczy, których nie ma wcale"
          value={String(TOTALS.missing)}
          sub="stan „brak” — nie słabo działa, tylko nie istnieje"
          tone="bad"
        />
        <StatTile
          label="Niemożliwych do rozstrzygnięcia z zewnątrz"
          value={String(TOTALS.unknown)}
          sub="uczciwa odpowiedź, nie ocena negatywna"
          accent={STATUS.nieznane.fill}
        />
        <StatTile
          label="Do zrobienia w pierwsze 30 dni"
          value={String(TOTALS.first30)}
          sub="bez budżetu i bez zgody zarządu"
          tone="good"
        />
      </div>

      <section>
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Sześć obszarów, sześć wejść
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          Pasek pod opisem pokazuje, w jakim stanie są pozycje wewnątrz obszaru. Kliknięcie kafelki
          otwiera stronę, na której ten obszar jest rozpisany — w zakładce, której dotyczy, a nie na
          pierwszej z brzegu.
        </p>
        <div className="mt-4">
          <AreaMap onNavigate={onNavigate} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Rejestr: stan aktualny → rekomendacja
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          Po lewej to, co jest, po prawej to, co proponujemy. Rozwinięcie wiersza pokazuje, na czym opiera
          się ocena, i prowadzi dalej: do rekomendacji, a przy części pozycji także do strony dossier,
          która dokumentuje odczyt. Kolejność jest malejąca po wpływie — ocenianym, nie prognozowanym.
        </p>
        <div className="mt-4">
          <RegisterList onNavigate={onNavigate} />
        </div>
      </section>

      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Horyzonty
        </p>
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Kolejność wynika z tego, co odblokowuje resztę
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          {HORIZONS.map((h) => (
            <div key={h.key}>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {h.key}
              </dt>
              <dd className="mt-1">
                <span className="block text-[13px] font-extrabold leading-snug text-chamber-navy">
                  {h.label}
                </span>
                <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{h.frame}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
