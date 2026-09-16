import type { EmbargoStep, MediaQuote, QuoteCard, Tier } from './types';

/**
 * Card capacity at the display size the template uses, measured in characters
 * of quote body. The square format is the tighter of the two, so it is the
 * one that decides whether a line survives — a quote written to 220 characters
 * ships in one format and gets re-typeset for the other, which is exactly the
 * rework a thirty-minute deadline cannot absorb.
 */
export const CARD_CAP = {
  square: { label: '1200 × 1200', ratio: 1, chars: 180 },
  portrait: { label: '1080 × 1350', ratio: 4 / 5, chars: 220 },
} as const;

/**
 * Eight cards off one stage.
 *
 * Four carry a figure and are written out in full, because a figure the
 * chamber already published is a fact and can be typeset before the event —
 * each one ships with its source on the card, which is the difference between
 * a quotable number and a contestable one.
 *
 * Four are quote slots: the constraint is decided, the words are not. Nothing
 * here puts a sentence in a named person's mouth before they say it.
 */
export const QUOTE_CARDS: QuoteCard[] = [
  {
    id: 'q1',
    kind: 'liczba',
    text: '3 200 pracowników z 11 krajów. Na takiej próbie izba oparła obraz tego, gdzie w regionie stoi wdrożenie AI w małych i średnich firmach.',
    attribution: 'Badanie własne AI Chamber',
    source: 'Raport „How do SMEs in CEE find their way in the world of AI?”, lipiec 2025',
    session: 's3',
    at: 118,
    status: 'dziala',
  },
  {
    id: 'q2',
    kind: 'liczba',
    text: '13,5% firm w Unii korzysta dziś z AI.',
    attribution: 'Eurostat',
    source: 'Eurostat — dane o wykorzystaniu AI w przedsiębiorstwach UE',
    session: 's4',
    at: 168,
    status: 'dziala',
    note: 'Nigdy na jednej karcie z liczbą 4–6%. Inne źródło, inna metoda, inny zakres — zestawione razem bez rozdzielenia dają się podważyć jednym zdaniem.',
  },
  {
    id: 'q3',
    kind: 'liczba',
    text: '4–6% — tyle wynosi adopcja AI w regionie według materiału własnego izby.',
    attribution: 'CEE AI Action Plan, AI Chamber',
    source: 'Dokument programowy zaprezentowany w Gdańsku podczas prezydencji Polski w Radzie UE, 2025',
    session: 's4',
    at: 172,
    status: 'dziala',
    note: 'Karta siostrzana do 13,5%. Publikowane osobno, każda z własnym źródłem w stopce.',
  },
  {
    id: 'q4',
    kind: 'liczba',
    text: 'Dziewięć państw pod jedną deklaracją regionalną.',
    attribution: 'CEE AI Summit 2026, Praga',
    source: 'Moment podpisu — liczbę potwierdza lista sygnatariuszy zdjęta ze sceny',
    session: 's5',
    at: 231,
    status: 'kuleje',
    note: 'Liczba do potwierdzenia w dniu zero. Karta przygotowana z pustym miejscem na cyfrę — zmiana jednego znaku zamiast składania od nowa.',
  },
  {
    id: 'q5',
    kind: 'cytat',
    text: '[jedno zdanie z keynote o miejscu regionu w agendzie innowacyjnej Unii]',
    attribution: 'Komisarz UE ds. startupów, badań i innowacji',
    session: 's1',
    at: 12,
    status: 'nieznane',
    note: 'Slot najwyższej rangi w całym dniu. Wycięcie z nagrania, nie parafraza.',
  },
  {
    id: 'q6',
    kind: 'cytat',
    text: '[jedno zdanie o tym, kto w tym kraju nadzoruje AI i od kiedy]',
    attribution: 'Minister z panelu rządowego',
    session: 's2',
    at: 78,
    status: 'nieznane',
    note: 'Cztery warianty tej samej karty, po jednym na kraj. Ten sam layout, podmieniane nazwisko i flaga.',
  },
  {
    id: 'q7',
    kind: 'cytat',
    text: '[jedno zdanie o tym, co firma dostała z członkostwa — z nazwą dokumentu]',
    attribution: 'CEO firmy członkowskiej',
    session: 's4',
    at: 194,
    status: 'nieznane',
    note: 'Jedyna karta, która pracuje bezpośrednio na sprzedaż składki.',
  },
  {
    id: 'q8',
    kind: 'cytat',
    text: '[jedno zdanie prezesa o tym, do czego zobowiązuje deklaracja]',
    attribution: 'Prezes AI Chamber',
    session: 's5',
    at: 233,
    status: 'nieznane',
    note: 'Wychodzi razem ze zdjęciem momentu podpisu — jedna publikacja, dwa nośniki.',
  },
];

/* ---------------------------------------------------------------- *
 * Media pack                                                       *
 * ---------------------------------------------------------------- */

export const TIERS: { key: Tier; who: string; how: string; size: string }[] = [
  {
    key: 'A',
    who: 'Dziennikarze o zasięgu europejskim — technologia i polityka',
    how: 'Kontakt osobisty, telefon przed wysyłką, ekskluzywność',
    size: 'kilku',
  },
  {
    key: 'B',
    who: 'Krajowe redakcje biznesowe i technologiczne w regionie',
    how: 'Pakiet pod embargo, wysyłka zbiorcza',
    size: 'kilkanaście',
  },
  {
    key: 'C',
    who: 'Branżowe i agregatory',
    how: 'Komunikat w dniu zero, bez embarga',
    size: 'kilkadziesiąt',
  },
];

export const MEDIA_QUOTES: MediaQuote[] = [
  {
    id: 'm1',
    who: 'Prezes AI Chamber',
    purpose: 'Ranga wydarzenia i sens deklaracji — cytat do leadu',
    release: 'zwolniony od godziny otwarcia',
    authorised: 'zwolniony',
    tiers: ['A', 'B', 'C'],
  },
  {
    id: 'm2',
    who: 'Dyrektor ds. polityki publicznej',
    purpose: 'Warstwa regulacyjna: terminy, obowiązki, organ nadzoru',
    release: 'zwolniony od godziny otwarcia',
    authorised: 'zwolniony',
    tiers: ['A', 'B', 'C'],
  },
  {
    id: 'm3',
    who: 'Minister-gospodarz',
    purpose: 'Potwierdzenie rangi rządowej — cytat do tytułu',
    release: 'po autoryzacji w biurze prasowym ministerstwa',
    authorised: 'do autoryzacji',
    tiers: ['A', 'B'],
  },
  {
    id: 'm4',
    who: 'Komisarz UE',
    purpose: 'Poziom unijny — cytat dla Tier A, na wyłączność',
    release: 'po autoryzacji w służbie prasowej Komisji',
    authorised: 'slot',
    tiers: ['A'],
  },
];

/**
 * The embargo as a sequence, because its whole value is in the order. One
 * outlet gets the story ahead of everyone; everyone else gets it at a stated
 * hour. A single piece written from a full report works harder than a release
 * sent wide, and the rest of the market picks it up regardless.
 */
export const EMBARGO: EmbargoStep[] = [
  {
    key: 'e1',
    at: -30,
    atLabel: 'T-30',
    tiers: ['B', 'C'],
    what: 'Media pack bez raportu do Tier B i C, kontakt osobisty z Tier A',
    why: 'Redakcja planuje tematy z wyprzedzeniem. Pakiet w dniu zero jest pakietem spóźnionym.',
  },
  {
    key: 'e2',
    at: -7,
    atLabel: 'T-7',
    tiers: ['A', 'B'],
    what: 'Pełny raport pod embargo do Tier A i B, z podaną datą i godziną zdjęcia',
    why: 'Tydzień to minimum na przeczytanie raportu i napisanie z niego tekstu, a nie notatki.',
  },
  {
    key: 'e3',
    at: -2,
    atLabel: 'T-2',
    tiers: ['A'],
    what: 'Ekskluzywność dla jednej redakcji z Tier A — kilkadziesiąt godzin przewagi',
    why: 'W zamian za materiał w dniu zero. Jeden taki tekst pracuje mocniej niż komunikat rozesłany szeroko.',
  },
  {
    key: 'e4',
    at: 0,
    atLabel: 'godzina otwarcia',
    tiers: ['A', 'B', 'C'],
    what: 'Zdjęcie embarga: raport, komunikat do Tier C, cytaty zwolnione, post i mail jednocześnie',
    why: 'Wszystko w jednej minucie. Rozjazd między publikacją a mailem kosztuje połowę efektu.',
  },
  {
    key: 'e5',
    at: 1,
    atLabel: 'T+1',
    tiers: ['A', 'B', 'C'],
    what: 'Galeria w wysokiej rozdzielczości i podsumowanie z liczbami do wszystkich trzech poziomów',
    why: 'Dziennikarz, który pisze dzień później, potrzebuje zdjęcia, którego nie musi prosić.',
  },
];

/** Answer time the spokesperson commits to. Published in the pack, with a phone number. */
export const SPOKESPERSON_SLA = [
  { when: 'dzień roboczy', hours: 2 },
  { when: 'dzień konferencji', hours: 4 },
];
