import type { Section } from './types';

/**
 * The website.
 *
 * The framing matters more than the task list: at the traffic the
 * reconnaissance measured, the site is a credibility proof and a record of
 * what the chamber has done — not a lead generator. The one place where the
 * search channel can deliver anything is the regulatory hub, and the plan is
 * sized accordingly.
 */
export const FRAMING = {
  monthlyVisits: 894,
  what: 'dowód wiarygodności i rejestr dorobku',
  notWhat: 'generator leadów',
  where: 'Jedynym miejscem, gdzie kanał wyszukiwarkowy może cokolwiek dowieźć, jest hub regulacyjny.',
};

/** First week. Three things, none of which needs a budget or a redesign. */
export const TECH_FIXES = [
  {
    what: 'Podstrona /locations/golf-park-jozefow/',
    why: 'Jest dziś najsilniejszą stroną serwisu i odpowiada na zapytania o mini golfa.',
    do: 'Przekierować albo wyindeksować.',
  },
  {
    what: 'Plik disavow w Google Search Console',
    why: 'Domeny na tanich końcówkach (.xyz, .site) i wszystkie hosty *-links-bhs.xyz.',
    do: 'Zgłoszenie wystarcza. Nie pisać do właścicieli farm linkowych.',
  },
  {
    what: 'Sprawdzić, czy disavow w ogóle istnieje',
    why: 'Bez odpowiedzi na to pytanie dwa punkty wyżej są zgadywaniem.',
    do: 'Pierwsze pytanie do osoby odpowiedzialnej za stronę.',
  },
];

export const SECTIONS: Section[] = [
  {
    name: 'Hub regulacyjny',
    what:
      'Kilkanaście stron, każda odpowiadająca na jedno pytanie, PL i EN, trwałe adresy: co muszę oznaczać od sierpnia 2026, czy mój system jest wysokiego ryzyka, kto nadzoruje AI w Polsce, jak przygotować dokumentację.',
    why: 'Jedyna droga, żeby modele językowe zaczęły wymieniać nazwę izby, a nie tylko zaciągać jej treść.',
  },
  {
    name: 'Rejestr stanowisk',
    what:
      'Każda konsultacja, każde stanowisko, każda podpisana deklaracja, z datą, adresatem i pełnym dokumentem. Jedno miejsce, po angielsku.',
    why: 'Materiał, po który sięga dziennikarz i analityk. To on zamienia „reprezentujemy interesy” w sprawdzalny fakt.',
  },
  {
    name: 'Newsroom',
    what:
      'Komunikaty, biogramy i zdjęcia zarządu oraz rady w wysokiej rozdzielczości, logotypy, arkusz faktów, kontakt do rzecznika z numerem telefonu.',
    why: 'Skraca dziennikarzowi drogę od pytania do tekstu, bez jednego maila do nikogo.',
  },
  {
    name: 'Archiwum wystąpień',
    what: 'Pełne nagrania, transkrypcje, cytaty do pobrania.',
    why: 'Treść dla wyszukiwarki, materiał dla modeli językowych i dowód wartości dla sponsora w jednym.',
  },
];

/** The layer that decides whether anything above can be cited at all. */
export const CITABILITY = [
  { what: 'Znaczniki schema.org', detail: 'Organization, Person i Event.' },
  { what: 'hreflang', detail: 'Dla par PL i EN.' },
  { what: 'Plik llms.txt', detail: 'Deklaracja tego, co i jak wolno zaciągnąć.' },
  { what: 'Transkrypcje jako tekst', detail: 'Nie jako obraz i nie jako PDF ze skanu.' },
  {
    what: 'Trwałe adresy dokumentów',
    detail: 'Dokument, który zmienia adres, przestaje być cytowany.',
  },
];

export const CONVERSION_TOOLS = [
  {
    name: 'Bramka na raporcie o MŚP i CEE AI Index',
    what: 'Dziś oba są dostępne bez pozostawienia kontaktu.',
    how: 'Bramka nie musi być twarda — e-mail, kraj i wielkość firmy wystarczą.',
  },
  {
    name: 'Kalkulator gotowości do AI Act',
    what: 'Dziesięć pytań, wynik na e-mail.',
    how: 'Jednocześnie kwalifikuje leada, buduje listę i daje pretekst do rozmowy z segmentem regulowanym.',
  },
  {
    name: 'Trzy case studies członków',
    what: 'Konkretna firma, konkretny problem, konkretny efekt członkostwa.',
    how: 'Najkrótsza droga do podniesienia wypełnień formularza deklaracji. Umieścić przy cenniku, nie w aktualnościach.',
  },
];

export const WEBSITE_WATCH = {
  baseline: '6 wizyt organicznych z Polski miesięcznie, 7 fraz, AS 14',
  watch: [
    'Liczba fraz z pozycją, po odjęciu fraz golfowych.',
    'Ruch na hub regulacyjny.',
    'Pobrania z przechwyconym kontaktem.',
    'Wzmianki marki w odpowiedziach modeli językowych.',
  ],
};
