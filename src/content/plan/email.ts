import type { Section, Sequence } from './types';

/**
 * E-mail marketing automation.
 *
 * The order of this file is the order of the work: nothing below the hygiene
 * block matters until the hygiene block is done, because mail that does not
 * reach the inbox cannot be optimised.
 */

/** Precondition. Without these, the rest does not arrive. */
export const HYGIENE = [
  {
    what: 'SPF, DKIM i DMARC',
    why: 'Skonfigurowane i zweryfikowane. Bez uwierzytelnienia domeny filtry traktują wysyłkę jak podejrzaną.',
  },
  {
    what: 'Rozgrzewanie domeny wysyłkowej',
    why: 'Przy zmianie dostawcy. Nagły wolumen z nowej domeny to najszybsza droga do folderu spam.',
  },
  {
    what: 'Osobna subdomena dla mailingu masowego',
    why: 'Żeby korespondencja operacyjna nie dzieliła reputacji z wysyłką marketingową.',
  },
  {
    what: 'Podwójne potwierdzenie zapisu',
    why: 'Lista mniejsza, ale żywa. Adres, którego nikt nie potwierdził, obniża wskaźniki wszystkim pozostałym.',
  },
  {
    what: 'Automatyczne czyszczenie twardych odbić',
    why: 'Powtarzana wysyłka na martwy adres jest sygnałem dla filtra.',
  },
  {
    what: 'Podstawa przetwarzania i polityka RODO przy formularzu',
    why: 'Warunek prawny, a przy odbiorcy z administracji także warunek wiarygodności.',
  },
];

/**
 * Four intake points with four separate forms.
 *
 * What is on the other side of them is not visible from outside: the contacts
 * may already converge in a CRM, or in a CRM and a sending tool. The register
 * treats this as an open question rather than a finding, and so does this file.
 */
export const LIST_SOURCES = ['webinary', 'formularz członkowski', 'wydarzenia', 'newsletter'];

/** The question that decides whether this is an integration job or a segmentation one. */
export const LIST_QUESTION =
  'Gdzie lądują zapisy z każdego z czterech wejść i czy da się dziś wysłać mail do „firm 6–50 osób z Czech”? Druga część odpowiedzi jest ważniejsza od pierwszej.';

export const SEGMENTS = [
  { dimension: 'Kraj', values: 'każdy z rynków regionu', why: 'Determinuje ekspansję i decyduje, która treść w ogóle jest właściwa.' },
  {
    dimension: 'Liczba pracowników',
    values: '1–5 · 6–50 · 51–250 · powyżej 250',
    why: 'Te same progi co pakiety członkowskie — segment przekłada się wprost na ofertę.',
  },
  { dimension: 'Branża', values: 'regulowana lub nie', why: 'Rozstrzyga, czy treść o AI Act jest obowiązkiem, czy ciekawostką.' },
  {
    dimension: 'Status',
    values: 'członek · lead · uczestnik wydarzenia · media · decydent',
    why: 'Pięć różnych powodów, dla których ktoś jest na liście, i pięć różnych maili.',
  },
];

/** The flagship. Weekly, in English, Tuesday morning. */
export const POLICY_BRIEF = {
  cadence: 'cotygodniowo',
  language: 'angielski',
  slot: 'wtorek rano',
  what:
    'Nie podsumowanie miesiąca dla członków, tylko briefing, który asystent w ministerstwie czyta, bo jest najszybszym sposobem dowiedzenia się, co się wydarzyło w regulacji AI w regionie.',
  structure: [
    'Co się zmieniło w tym tygodniu',
    'Co to znaczy dla firmy',
    'Co robi izba',
    'Jedna liczba',
  ],
  payoff:
    'Kiedy briefing czyta administracja, obecność w nim staje się pozycją, którą można sprzedać partnerowi korporacyjnemu.',
};

export const SEQUENCES: Sequence[] = [
  {
    name: 'Onboarding członka',
    trigger: 'przyjęcie w poczet członków',
    shape:
      'Dostęp do advocacy, zapis do grupy roboczej, przedstawienie opiekuna, pierwsza karta ekspercka, kontakt po 30 dniach.',
    mails: 5,
    days: 14,
    why: '52% nieodnowień wynika z braku zaangażowania, nie z ceny.',
  },
  {
    name: 'Odnowienie Q4',
    trigger: '90, 60 i 30 dni przed 31 grudnia',
    shape:
      'Podsumowanie roku dla tej konkretnej firmy: gdzie poszedł jej głos, co dostała, propozycja wyższego pakietu.',
    mails: 3,
    days: 90,
    why: 'Odnowienie jest automatyczne, więc czwarty kwartał to jedyne okno rozmowy.',
  },
  {
    name: 'Po pobraniu raportu',
    trigger: 'pobranie zbramkowanego materiału',
    shape: 'Dane dla kraju odbiorcy, wniosek dla jego wielkości firmy, case study, oferta.',
    mails: 4,
    days: null,
    why: 'Raport jest najmocniejszym aktywem akwizycyjnym, a wedle rozpoznania leży otwarty — to sprawdza się jednym kliknięciem.',
  },
  {
    name: 'Po webinarze',
    trigger: 'zapis lub udział',
    shape: 'Nagranie, materiał pogłębiony, zaproszenie na rozmowę.',
    mails: 3,
    days: 10,
    why: 'Co dostaje dziś osoba po zapisie, widzi tylko ona sama — warto zapisać się własnym adresem i sprawdzić.',
  },
  {
    name: 'Konferencyjna',
    trigger: 'rejestracja',
    shape: 'Rozpisana po stronie materiału konferencyjnego: dzień zero, T+1 i T+30.',
    mails: 3,
    days: 30,
    why: 'Konferencja jest jedynym momentem w roku, kiedy lista rośnie o ludzi, którzy fizycznie przyjechali.',
  },
  {
    name: 'Reaktywacja',
    trigger: '90 dni bez otwarcia',
    shape: 'Dwa maile, potem wypisanie.',
    mails: 2,
    days: 90,
    why: 'Reputacja domeny wysyłkowej. Uśpiony adres kosztuje dostarczalność wszystkim pozostałym.',
  },
];

export const MAIL_GATE = [
  'Jeden cel na mail.',
  'Jedno wezwanie do działania.',
  'Nagłówek bez wykrzyknika i bez emoji w briefingu policy.',
  'Test przed wysyłką: czy odbiorca po przeczytaniu wie, co ma zrobić w ciągu najbliższych pięciu minut.',
];

export const EMAIL_WATCH = {
  baseline: 'wielkość listy niewidoczna z zewnątrz',
  watch: [
    'Wielkość listy per segment.',
    'Otwarcia i kliknięcia per sekwencja.',
    'Wskaźnik odnowień.',
  ],
};

/** Four sections of work, in the order they unblock each other. */
export const EMAIL_ORDER: Section[] = [
  { name: 'Higiena techniczna', what: 'Sześć pozycji poniżej', why: 'Warunek wstępny. Bez tego reszta nie dociera.' },
  {
    name: 'Jedna lista',
    what: 'Ustalić, gdzie schodzą się zapisy z czterech wejść',
    why: 'Od odpowiedzi zależy, czy to praca nad integracją, czy już tylko nad segmentacją.',
  },
  { name: 'Policy Brief', what: 'Cotygodniowy briefing po angielsku', why: 'Produkt flagowy — buduje pozycję u administracji.' },
  { name: 'Sekwencje cyklu życia', what: 'Sześć automatyzacji', why: 'Zamieniają jednorazowy kontakt w relację.' },
];
