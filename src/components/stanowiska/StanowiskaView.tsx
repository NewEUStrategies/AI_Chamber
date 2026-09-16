import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { CAT, INK, MARK, plInt } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import { ROLES } from '@/content/stanowiska/roles';
import {
  ACCESS_DATE,
  HIRING_ORDER,
  SOURCES,
  SPECIALIST_ROLES,
  UNDER_PRESSURE,
} from '@/content/stanowiska/matrix';
import { BENCHMARKS, MODIFIERS, READINGS, ROCKETJOBS_2026 } from '@/content/stanowiska/pay';
import type { StanowiskaTab } from '@/lib/route';
import { Matrix } from './Matrix';
import { PayCalculator } from './PayCalculator';
import { PayChart } from './PayChart';
import { RoleCard } from './RoleCard';

const TABS: { key: StanowiskaTab; label: string; lead: string }[] = [
  { key: 'przeglad', label: 'Przegląd', lead: 'Pięć ról w jednym zdaniu i kolejność zatrudniania przy rosnącym budżecie.' },
  { key: 'karty', label: 'Karty stanowisk', lead: 'Cel, zakres, granice odpowiedzialności i widełki — osobno dla każdej z pięciu ról.' },
  { key: 'macierz', label: 'Macierz rozgraniczeń', lead: 'Kto jest właścicielem którego wyniku. Tabela sprawdza samą siebie.' },
  { key: 'place', label: 'Wynagrodzenia', lead: 'Trzy odczyty rynku na jednej osi, rekomendacja i kalkulator kosztu.' },
  { key: 'specjalistyczne', label: 'Role specjalistyczne', lead: 'Stanowiska, które w 2026 płacą najwięcej — i pytanie, czy w izbie mają być etatem.' },
  { key: 'zrodla', label: 'Źródła', lead: `Wszystkie odczyty z datą publikacji. Dostęp: ${ACCESS_DATE}.` },
];

/**
 * Karty stanowiskowe działu marketingu.
 *
 * Strona ma jedną właściwość, która odróżnia ją od dokumentu: widełki
 * przeliczają się przez lokalizację, a koszt pracodawcy liczy się z wzoru,
 * więc pytanie „ile to naprawdę kosztuje w Krakowie” ma odpowiedź na miejscu,
 * a nie w osobnym arkuszu.
 */
export function StanowiskaView({ tab }: { tab?: StanowiskaTab } = {}) {
  const [active, setActive] = useState<StanowiskaTab>(tab ?? 'przeglad');
  const [role, setRole] = useState(ROLES[0].key);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = TABS.map((t) => t.key);
    const i = keys.indexOf(active);
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % keys.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + keys.length) % keys.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = keys.length - 1;
    else return;
    e.preventDefault();
    setActive(keys[next]);
    refs.current[keys[next]]?.focus();
  };

  const panels: Record<StanowiskaTab, () => ReactNode> = {
    przeglad: () => <Overview onPick={(k) => { setRole(k); setActive('karty'); }} />,
    karty: () => (
      <div>
        <div role="group" aria-label="Wybór karty" className="flex flex-wrap gap-1.5">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              aria-pressed={role === r.key}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${
                role === r.key
                  ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                  : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
              }`}
              style={{ minHeight: MARK.minHitTarget }}
            >
              <span className={`font-mono text-[10px] ${role === r.key ? 'text-white/60' : 'text-slate-400'}`}>
                {r.letter}
              </span>
              {r.title}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <RoleCard role={ROLES.find((r) => r.key === role) ?? ROLES[0]} />
        </div>
      </div>
    ),
    macierz: () => (
      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <Matrix />
      </section>
    ),
    place: () => <Salaries />,
    specjalistyczne: () => <Specialists />,
    zrodla: () => <Sources />,
  };

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          Stanowiska · dział marketingu
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          Pięć stanowisk, pięć zakresów odpowiedzialności
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          Karty dla organizacji członkowskiej: izby gospodarczej, stowarzyszenia branżowego lub think tanku.
          Marketing nie sprzedaje tu produktu, tylko członkostwo, wpływ i społeczność — i to zmienia zarówno
          zakres obowiązków, jak i mierniki. Widełki brutto na umowę o pracę, z przelicznikiem lokalizacji.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Sekcje kart stanowiskowych"
        onKeyDown={move}
        className="flex flex-wrap gap-1.5"
      >
        {TABS.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              ref={(el) => {
                refs.current[t.key] = el;
              }}
              role="tab"
              id={`st-tab-${t.key}`}
              aria-selected={on}
              aria-controls={`st-panel-${t.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.key)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                on
                  ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                  : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 max-w-3xl text-[13px] leading-[1.7] text-slate-600">{current.lead}</p>

      <div
        role="tabpanel"
        id={`st-panel-${current.key}`}
        aria-labelledby={`st-tab-${current.key}`}
        tabIndex={0}
        className="mt-5 outline-none"
      >
        {panels[current.key]()}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Przegląd                                                         *
 * ---------------------------------------------------------------- */

function Overview({ onPick }: { onPick: (k: (typeof ROLES)[number]['key']) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
        <StatTile label="Ról w siatce" value={String(ROLES.length)} sub="od zarządczej po operacyjną" accent={CAT[1]} />
        <StatTile label="Pierwszy etat" value="Manager" sub="nie dyrektor i nie specjalista" />
      </div>

      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Rozdzielnica: pięć ról w jednym zdaniu
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          Kliknięcie wiersza otwiera pełną kartę. Widełki to rekomendacja dla Warszawy.
        </p>
        <ul className="mt-4 space-y-1">
          {ROLES.map((r) => (
            <li key={r.key}>
              <button
                type="button"
                onClick={() => onPick(r.key)}
                className="flex w-full items-start gap-3 rounded-[10px] px-3 py-2.5 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50"
                style={{ minHeight: MARK.minHitTarget }}
              >
                <span
                  className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-extrabold text-white"
                  style={{ background: INK.strong }}
                >
                  {r.letter}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[13px] font-extrabold text-chamber-navy">{r.title}</span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {r.level}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-slate-600">
                    Odpowiada za {r.oneLine}.
                  </span>
                </span>
                <span
                  className="shrink-0 whitespace-nowrap text-[12px] font-extrabold tabular-nums"
                  style={{ color: CAT[1] }}
                >
                  {plInt(r.pay.izba[0])}–{plInt(r.pay.izba[1])} zł
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Kogo zatrudnić najpierw
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          Kolejność, nie ranking ważności. Każdy kolejny etat domyka lukę, którą poprzednia obsada zostawiała
          otwartą — a koszt pod spodem liczy się z widełek rekomendowanych.
        </p>
        <ul className="mt-4 space-y-2.5">
          {HIRING_ORDER.map((h) => {
            const from = h.roles.reduce((a, k) => a + (ROLES.find((r) => r.key === k)?.pay.izba[0] ?? 0), 0);
            const to = h.roles.reduce((a, k) => a + (ROLES.find((r) => r.key === k)?.pay.izba[1] ?? 0), 0);
            return (
              <li key={h.fte} className="flex gap-3 rounded-[10px] border border-slate-200 px-3.5 py-3">
                <span
                  className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
                  style={{ background: CAT[1] }}
                >
                  {h.fte}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span className="text-[12.5px] font-extrabold text-chamber-navy">{h.what}</span>
                    <span className="font-mono text-[10.5px] font-bold tabular-nums text-slate-400">
                      {plInt(from)}–{plInt(to)} zł / mies.
                    </span>
                  </span>
                  <span className="mt-1 block text-[12px] leading-[1.6] text-slate-600">{h.why}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Wynagrodzenia                                                    *
 * ---------------------------------------------------------------- */

function Salaries() {
  return (
    <div className="space-y-5">
      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Trzy odczyty
        </p>
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Dlaczego źródła podają tak różne liczby
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          To nie jest sprzeczność w danych — każde źródło mierzy inny fragment rynku. Dlatego nigdzie nie są
          uśrednione do jednej liczby, tylko rysowane obok siebie.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {READINGS.map((r) => (
            <div key={r.key} className="rounded-[10px] border border-slate-200 px-3.5 py-3">
              <p className="text-[12.5px] font-extrabold text-chamber-navy">{r.label}</p>
              <p className="mt-1 text-[12px] leading-[1.6] text-slate-600">{r.what}</p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-slate-500">{r.why}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <PayChart />
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Kotwica rekomendacji
          </p>
          <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Prognoza RocketJobs na 2026
          </h2>
          <p className="mt-1.5 text-[13px] leading-[1.65] text-slate-600">
            Materiał źródłowy rekomendował korektę w dół o 15–25 procent wobec rynku rekrutacyjnego, typową dla
            organizacji członkowskich. Ta wersja tę korektę porzuca: widełki są zakotwiczone w pasmach poniżej.
          </p>
          <ul className="mt-4 space-y-1.5">
            {ROCKETJOBS_2026.map((r) => (
              <li key={r.level} className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-1.5 last:border-0">
                <span className="text-[12.5px] font-semibold text-slate-700">{r.level}</span>
                <span className="shrink-0 font-mono text-[11.5px] font-bold tabular-nums text-chamber-navy">
                  {plInt(r.band[0])}–{plInt(r.band[1])}
                  {r.plus ? '+' : ''}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="https://rocketjobs.pl/blog/zarobki-w-marketingu-2026-kto-zarobi-najwiecej"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-chamber-green-deep hover:underline"
          >
            rocketjobs.pl · Zarobki w marketingu 2026
            <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          </a>
        </section>

        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Kalkulator
          </p>
          <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Brutto, netto, koszt pracodawcy
          </h2>
          <div className="mt-4">
            <PayCalculator />
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Punkty odniesienia dla rynku 2026
          </h2>
          <ul className="mt-4 space-y-1.5">
            {BENCHMARKS.map((b) => (
              <li key={b.label} className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-1.5 last:border-0">
                <span className="text-[12.5px] text-slate-600">{b.label}</span>
                <span className="shrink-0 font-mono text-[11.5px] font-bold tabular-nums text-chamber-navy">
                  {plInt(b.value)} <span className="font-normal text-slate-400">{b.note}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] leading-[1.6] text-slate-500">
            Próg górnego decyla ma tu praktyczne znaczenie: każde stanowisko powyżej koordynatora mieści się
            w najlepiej opłacanych dziesięciu procentach zatrudnionych w Polsce.
          </p>
        </section>

        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Co jeszcze przesuwa widełki
          </h2>
          <ul className="mt-4 space-y-2.5">
            {MODIFIERS.map((m) => (
              <li key={m.what} className="flex gap-2.5">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CAT[1] }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{m.what}</span>
                  <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{m.effect}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Role specjalistyczne                                             *
 * ---------------------------------------------------------------- */

const VERDICT_TONE: Record<string, string> = {
  'kompetencja, nie etat': CAT[2],
  'najbliżej potrzeb izby': CAT[1],
  'nie w izbie': INK.muted,
  'nie dotyczy': INK.dim,
};

function Specialists() {
  return (
    <div className="space-y-5">
      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Stanowiska, które w 2026 płacą najwięcej
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          Pytanie dla izby nie brzmi, ile kosztują, tylko czy w ogóle powinny być osobnymi etatami. Przy pięciu
          etatach dołożenie jednej z nich zjadłoby jedną trzecią budżetu płac i nie zamknęłoby żadnego
          z podstawowych zakresów.
        </p>
        <p
          className="mt-4 rounded-[8px] px-3.5 py-2.5 text-[12px] leading-[1.6] text-slate-600"
          style={{ background: INK.track }}
        >
          <b className="text-chamber-navy">Ostrzeżenie o jakości danych.</b> Widełki dla tych pięciu ról pochodzą
          z jednego źródła i są prognozą redakcyjną, nie pomiarem. Kierunek potwierdzają Antal i Hays, ale nie na
          poziomie pojedynczych stanowisk. Traktować jako rząd wielkości, nie jako widełki do ogłoszenia.
        </p>

        <ul className="mt-4 space-y-3">
          {SPECIALIST_ROLES.map((s) => (
            <li key={s.name} className="rounded-[10px] border border-slate-200 px-4 py-3.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-[13px] font-extrabold text-chamber-navy">{s.name}</p>
                <span className="font-mono text-[11.5px] font-bold tabular-nums text-slate-500">
                  {plInt(s.band[0])}–{plInt(s.band[1])} zł
                </span>
              </div>
              <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-600">{s.what}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                  style={{ background: `${VERDICT_TONE[s.verdictLabel]}14`, color: VERDICT_TONE[s.verdictLabel] }}
                >
                  {s.verdictLabel}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  wchodzi do karty: {s.goesInto}
                </span>
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-slate-600">{s.verdict}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Druga strona: role pod presją
        </h2>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
          Te same raporty wskazują specjalizacje, których wycena spada. Praktyczny wniosek dla kart: karta
          specjalisty digital musi mieć komponent analityczny i pracę z AI jako wymaganie twarde, a nie jako mile
          widziane. Inaczej rola traci na wartości w ciągu dwóch lat.
        </p>
        <ul className="mt-4 space-y-2.5">
          {UNDER_PRESSURE.map((u) => (
            <li key={u.what} className="flex gap-2.5">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{u.what}</span>
                <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{u.why}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Źródła                                                           *
 * ---------------------------------------------------------------- */

function Sources() {
  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
        Skąd pochodzi każda liczba
      </h2>
      <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.65] text-slate-600">
        Data dostępu do wszystkich pozycji: {ACCESS_DATE}. Pozycje oznaczone jako{' '}
        <b className="text-chamber-navy">synteza własna</b> nie mają źródła zewnętrznego — to szacunek albo
        decyzja, i tak są opisane.
      </p>
      <ol className="mt-4 space-y-3">
        {SOURCES.map((s, i) => (
          <li key={s.key} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0">
            <span className="w-6 shrink-0 text-right font-mono text-[11px] font-extrabold text-slate-300">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[12.5px] font-extrabold text-chamber-navy">{s.name}</span>
                {s.own && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: `${INK.muted}14`, color: INK.muted }}
                  >
                    synteza własna
                  </span>
                )}
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {s.pub}
                </span>
              </span>
              <span className="mt-0.5 block text-[12.5px] italic leading-snug text-slate-600">{s.title}</span>
              <span className="mt-1 block text-[12px] leading-[1.6] text-slate-500">{s.note}</span>
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1 inline-flex items-center gap-1 break-all text-[11.5px] font-semibold text-chamber-green-deep hover:underline"
                >
                  {s.url}
                  <ExternalLink aria-hidden className="h-3 w-3 shrink-0" />
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
