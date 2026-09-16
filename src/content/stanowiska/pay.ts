/**
 * Parametry płacowe 2026 i przelicznik brutto → netto → koszt pracodawcy.
 *
 * Wzór skalibrowany na dwóch punktach podanych w źródłach: płaca minimalna
 * 4 806 zł daje 3 605,86 zł wobec podanych 3 605,85 zł, a 9 509,02 zł daje
 * dokładnie 6 811,85 zł. Odtwarza też wszystkie sześć pozycji tabeli
 * poglądowej z materiału źródłowego, co do złotówki.
 */

export const TAX_2026 = {
  /** Składki społeczne po stronie pracownika. */
  social: 0.1371,
  /** Zdrowotna liczona od podstawy po odliczeniu społecznych. */
  health: 0.09,
  /** Koszty uzyskania przychodu, miesięcznie. */
  kup: 250,
  /** Kwota zmniejszająca podatek, miesięcznie. */
  reduction: 300,
  /** Miesięczny próg drugiej stawki, czyli 120 000 zł rocznie. */
  bracket: 10000,
  rateLow: 0.12,
  rateHigh: 0.32,
  /** Narzut pracodawcy ponad brutto. */
  employer: 1.2048,
} as const;

export interface Payslip {
  gross: number;
  net: number;
  employerCost: number;
  social: number;
  health: number;
  tax: number;
}

export function payslip(gross: number): Payslip {
  const social = gross * TAX_2026.social;
  const health = (gross - social) * TAX_2026.health;
  const taxable = Math.round(gross - social - TAX_2026.kup);
  const raw =
    taxable <= TAX_2026.bracket
      ? taxable * TAX_2026.rateLow
      : TAX_2026.bracket * TAX_2026.rateLow + (taxable - TAX_2026.bracket) * TAX_2026.rateHigh;
  const tax = Math.max(0, Math.round(raw - TAX_2026.reduction));
  return {
    gross,
    net: gross - social - health - tax,
    employerCost: gross * TAX_2026.employer,
    social,
    health,
    tax,
  };
}

/**
 * Powyżej ok. 24 000 zł brutto miesięcznie w grę wchodzi roczny limit podstawy
 * składek emerytalnej i rentowej. Po jego przekroczeniu realne netto w
 * ostatnich miesiącach roku jest wyższe, a koszt pracodawcy niższy niż tutaj.
 * Kalkulator pokazuje wariant sprzed przekroczenia limitu, ostrożniejszy dla
 * planowania budżetu.
 */
export const THIRTY_TIMES_WARNING = 24000;

/* ---------------------------------------------------------------- *
 * Lokalizacja                                                      *
 * ---------------------------------------------------------------- */

export type LocationKey = 'waw' | 'duze' | 'reszta';

/**
 * Mnożniki wyprowadzone z premii warszawskiej 15–25 procent i z mediany
 * warszawskiej 11 000 zł wobec 9 200–9 800 zł w pozostałych dużych miastach.
 * To szacunek, nie osobny pomiar — i tak jest oznaczony w źródłach.
 */
export const LOCATIONS: { key: LocationKey; label: string; short: string; sed: number; rec: number }[] = [
  { key: 'waw', label: 'Warszawa', short: 'Warszawa', sed: 1.2, rec: 1.0 },
  { key: 'duze', label: 'Kraków, Wrocław, Poznań, Trójmiasto', short: 'Duże miasta', sed: 1.05, rec: 0.88 },
  { key: 'reszta', label: 'Pozostała Polska', short: 'Reszta Polski', sed: 0.92, rec: 0.75 },
];

export const locationByKey = (k: LocationKey) => LOCATIONS.find((l) => l.key === k) ?? LOCATIONS[0];

/* ---------------------------------------------------------------- *
 * Punkty odniesienia                                               *
 * ---------------------------------------------------------------- */

export const BENCHMARKS = [
  { label: 'Płaca minimalna 2026', value: 4806, note: 'brutto', src: 'pit' },
  { label: 'Mediana krajowa, marzec 2026', value: 7530.45, note: 'brutto', src: 'gus_med' },
  { label: 'Przeciętne wynagrodzenie, marzec 2026', value: 9698.95, note: 'brutto', src: 'gus_med' },
  { label: 'Próg górnych 10 procent zatrudnionych', value: 15424.85, note: 'brutto', src: 'gus_med' },
  { label: 'Antal: średnia dla specjalistów', value: 13300, note: '+6% r/r', src: 'antal' },
  { label: 'Antal: średnia dla menedżerów', value: 21400, note: '+4% r/r', src: 'antal' },
];

/**
 * Trzy pomiary mierzą trzy różne fragmenty rynku. To nie jest sprzeczność
 * w danych — to powód, dla którego nigdzie nie są uśredniane do jednej liczby.
 */
export const READINGS = [
  {
    key: 'base',
    label: 'Badanie płacowe',
    what: 'Cały kraj, wszystkie wielkości pracodawców, łącznie z mikrofirmami i regionami.',
    why: 'Daje najniższe mediany. Właściwy punkt odniesienia dla małej organizacji spoza stolicy.',
  },
  {
    key: 'rec',
    label: 'Rynek rekrutacyjny',
    what: 'Stawki z realnie prowadzonych procesów, u pracodawców, których stać na agencję.',
    why: 'Firmy większe i głównie warszawskie. Hays podaje przy tym górne widełki, nie mediany.',
  },
  {
    key: 'izba',
    label: 'Rekomendacja',
    what: 'Decyzja zamawiającego, zakotwiczona w prognozie RocketJobs na 2026.',
    why: 'Nie jest już korygowana w dół o 15–25 procent, jak zwykle rekomenduje się organizacjom członkowskim.',
  },
] as const;

/** Prognoza RocketJobs na 2026 — kotwica dla rekomendacji. */
export const ROCKETJOBS_2026: { level: string; band: [number, number]; plus?: boolean }[] = [
  { level: 'Junior Marketing Specialist', band: [6000, 9000] },
  { level: 'Marketing Specialist (mid)', band: [9500, 14000] },
  { level: 'Senior Marketing Specialist', band: [14500, 20000] },
  { level: 'Marketing Manager / Team Leader', band: [18000, 27000], plus: true },
  { level: 'Dyrektor Marketingu (CMO)', band: [28000, 45000], plus: true },
];

/** Co jeszcze przesuwa widełki, niezależnie od poziomu stanowiska. */
export const MODIFIERS = [
  { what: 'Doświadczenie', effect: 'Różnica między juniorem a seniorem sięga 200 procent.', src: 'rocket' },
  { what: 'Kompetencje AI', effect: 'Ich brak obniża widełki o 20–30 procent.', src: 'crp' },
  {
    what: 'Automatyzacja',
    effect:
      'Trudniejszy rynek dla tradycyjnego SEO, social mediów i e-mail marketingu. Rosną stanowiska na styku marketingu i technologii: 10–15 procent wobec 6–8 średnio.',
    src: 'hays_wm',
  },
  { what: 'Certyfikaty i MBA', effect: 'Podnoszą wynagrodzenie dyrektora o 15–20 procent.', src: 'cyrek_dyr' },
  {
    what: 'Praca zdalna',
    effect:
      'Zaciera premię lokalizacyjną: specjalista spoza stolicy może pracować na stawkach warszawskich, ale rośnie konkurencja o tych samych kandydatów.',
    src: 'rocket',
  },
];
