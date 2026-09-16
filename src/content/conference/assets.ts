import type { MailBlock, Shot, Unlock } from './types';

/* ---------------------------------------------------------------- *
 * Transcript                                                       *
 * ---------------------------------------------------------------- */

/**
 * What a transcript unlocks that a recording alone does not. Each row is a
 * capability, not a task — the work is the same upload either way; the
 * difference is whether the text is machine-readable when it lands.
 */
export const TRANSCRIPT_UNLOCKS: Unlock[] = [
  {
    what: 'Indeksowalność w wyszukiwarce',
    why: 'Serwis ma siedem fraz z pozycją i sześć wizyt organicznych z Polski miesięcznie. Transkrypcja jednego dnia to dziesiątki tysięcy słów o regulacji, których dziś na stronie nie ma wcale.',
    status: 'brak',
  },
  {
    what: 'Cytowalność w modelach językowych',
    why: 'Model zaciąga treść izby, ale nie wymienia jej nazwy. Tekst na trwałym adresie, z nazwiskiem mówcy i datą, jest jedyną formą, którą da się przypisać do źródła.',
    status: 'brak',
  },
  {
    what: 'Dostępność',
    why: 'Nagranie bez zapisu jest niedostępne dla części odbiorców i bezużyteczne dla każdego, kto szuka jednego zdania w pięciu godzinach materiału.',
    status: 'brak',
  },
  {
    what: 'Materiał źródłowy dla pozostałych sześciu formatów',
    why: 'Cytat na grafikę, fragment do newslettera i lista setek powstają przez czytanie transkrypcji, nie przez odsłuchiwanie nagrania. To ona skraca produkcję z dni do godzin.',
    status: 'brak',
  },
  {
    what: 'Plik llms.txt i znaczniki schema.org',
    why: 'Warstwa techniczna, która decyduje, czy tekst zostanie w ogóle rozpoznany jako wypowiedź konkretnej osoby na konkretnym wydarzeniu.',
    status: 'brak',
  },
];

/** Shape of one transcript entry. The text itself comes off the recording. */
export const TRANSCRIPT_SHAPE = [
  { field: 'timecode', example: '1:16', why: 'Linkuje do sekundy w nagraniu. Bez tego cytat jest nieweryfikowalny.' },
  { field: 'mówca', example: 'Karel Havlíček, wicepremier (Czechy)', why: 'Nazwisko i funkcja, nigdy „Speaker 1”. To jest to, co cytuje dziennikarz.' },
  { field: 'język', example: 'EN', why: 'Wersja druga powstaje jako tłumaczenie, nie jako streszczenie — hreflang wiąże obie.' },
  { field: 'akapit', example: '40–90 słów', why: 'Krótsze bloki są skanowalne i dają się linkować pojedynczo.' },
];

/* ---------------------------------------------------------------- *
 * Newsletter                                                       *
 * ---------------------------------------------------------------- */

/**
 * The Policy Brief skeleton, in the conference edition. Four blocks and one
 * call to action, in a fixed order that never changes between issues — a
 * briefing read by a ministry assistant is read because it is predictable.
 *
 * Word budgets are the format; the drafts are real copy written against the
 * chamber's own published figures. Square brackets mark what has to be
 * confirmed on the day before the mail can go out.
 */
export const MAIL_BLOCKS: MailBlock[] = [
  {
    key: 'subject',
    label: 'Temat',
    purpose: 'Bez wykrzyknika, bez emoji. Ma powiedzieć, co się stało, a nie że było wspaniale.',
    budgetWords: 9,
    draft: 'Praga: dziewięć państw pod deklaracją, pełny zapis szczytu',
  },
  {
    key: 'changed',
    label: 'Co się zmieniło w tym tygodniu',
    purpose: 'Fakt, data, miejsce. Pierwszy akapit czyta się bez kontekstu z poprzednich wydań.',
    budgetWords: 70,
    draft:
      'Trzeciego września w Martinic Palace w Pradze odbył się CEE AI Summit 2026 pod auspicjami czeskiego Ministerstwa Przemysłu i Handlu. Na scenie wystąpiła komisarz UE ds. startupów, badań i innowacji oraz przedstawiciele rządów pięciu państw regionu. Podczas sesji piątej podpisano deklarację regionalną — sygnatariuszami jest [liczba] państw. Pełny zapis sześciu sesji trafia na stronę izby w tym tygodniu.',
  },
  {
    key: 'means',
    label: 'Co to znaczy dla firmy',
    purpose: 'Przełożenie na obowiązek, termin albo koszt. Bez tego bloku mail jest relacją, nie briefingiem.',
    budgetWords: 60,
    draft:
      'Panel rządowy wskazał organy nadzoru w czterech krajach regionu oraz to, jak każdy z nich czyta obowiązek oznaczania treści z artykułu 50, wchodzący w życie w sierpniu 2026. Firmy, które nie mają jeszcze przypisanego właściciela tego obowiązku po swojej stronie, mają [liczba] miesięcy do terminu dotyczącego systemów wysokiego ryzyka.',
  },
  {
    key: 'does',
    label: 'Co robi izba',
    purpose: 'Nazwa dokumentu, etap, data. Nigdy „reprezentujemy interesy”.',
    budgetWords: 50,
    draft:
      'Deklaracja podpisana w Pradze trafia do rejestru stanowisk wraz z pełnym dokumentem i listą sygnatariuszy. Dokument pokonferencyjny — co ustalono i kto się do czego zobowiązał — ukazuje się siódmego dnia po szczycie na osobnej stronie, razem z komunikatem dla mediów.',
  },
  {
    key: 'number',
    label: 'Jedna liczba',
    purpose: 'Zamknięcie wydania jedną liczbą z podanym źródłem. Ta sama liczba jedzie na kartę cytatową.',
    budgetWords: 14,
    draft: '4–6% — adopcja AI w regionie według materiału własnego izby (CEE AI Action Plan, 2025).',
  },
  {
    key: 'cta',
    label: 'Jedno wezwanie do działania',
    purpose: 'Jeden cel na mail. Test przed wysyłką: czy odbiorca wie, co zrobić w ciągu pięciu minut.',
    budgetWords: 8,
    draft: 'Obejrzyj zapis panelu rządowego (70 minut, z rozdziałami).',
  },
];

/** Where the conference enters the mail programme. Three moments, three jobs. */
export const MAIL_MOMENTS = [
  { day: 0, label: 'dzień zero', what: 'Policy Brief — wydanie konferencyjne, wychodzi w minucie zdjęcia embarga razem z postem.', to: 'cała lista' },
  { day: 1, label: 'T+1', what: 'Mail do uczestników: galeria, liczby dnia, zapowiedź nagrań.', to: 'lista uczestników' },
  { day: 30, label: 'T+30', what: 'Sekwencja sprzedażowa do uczestników niebędących członkami.', to: 'uczestnicy spoza izby' },
];

/* ---------------------------------------------------------------- *
 * Photography                                                      *
 * ---------------------------------------------------------------- */

/**
 * Ten frames. The list exists so that the photographer is not deciding what
 * matters while it is happening — the signing frame in particular is a set-up
 * shot, and a set-up shot that nobody planned is a snapshot.
 */
export const SHOT_PLAN: Shot[] = [
  {
    id: 'f1',
    label: 'Sala przed otwarciem',
    moment: 'T-1 wieczorem i rano w dniu zero',
    slaMin: null,
    slaLabel: 'T-1, do postu „jutro”',
    ratio: '16:9',
    feeds: ['post T-1', 'media pack'],
    priority: 'obowiązkowe',
    composition: 'Pusta sala z identyfikacją w kadrze. Jedyny moment, w którym da się pokazać skalę bez tyłów głów.',
  },
  {
    id: 'f2',
    label: 'Pierwsze zdjęcie z pełnej sali',
    moment: 'otwarcie drzwi',
    slaMin: 60,
    slaLabel: '60 min od otwarcia',
    ratio: '3:2',
    feeds: ['post w dniu zero', 'galeria'],
    priority: 'obowiązkowe',
    composition: 'Pełne rzędy z poziomu sceny. To zdjęcie odpowiada na jedyne pytanie, które zadaje sobie nieobecny: czy ktoś tam był.',
  },
  {
    id: 'f3',
    label: 'Keynote — mówca i ekran',
    moment: 'sesja 1',
    slaMin: 60,
    slaLabel: '60 min od wystąpienia',
    ratio: '3:2',
    feeds: ['post w dniu zero', 'karta cytatowa', 'media pack'],
    priority: 'obowiązkowe',
    composition: 'Sylwetka i treść slajdu w jednym kadrze, bez ucinania nazwiska z listwy.',
  },
  {
    id: 'f4',
    label: 'Panel rządowy — szeroki kadr',
    moment: 'sesja 2',
    slaMin: 90,
    slaLabel: '90 min od sesji',
    ratio: '16:9',
    feeds: ['galeria', 'media pack'],
    priority: 'obowiązkowe',
    composition: 'Czterech ministrów w jednym ujęciu. Kadr, który udowadnia rangę bez jednego słowa podpisu.',
  },
  {
    id: 'f5',
    label: 'Moment podpisu',
    moment: 'sesja 5',
    slaMin: 30,
    slaLabel: '30 min od podpisu',
    ratio: '3:2',
    feeds: ['post w dniu zero', 'karta cytatowa', 'media pack', 'newsroom'],
    priority: 'obowiązkowe',
    composition: 'Kadr ustawiony wcześniej: pióro, dokument, flagi, twarze sygnatariuszy widoczne. Nie zdjęcie z ręki z trzeciego rzędu.',
  },
  {
    id: 'f6',
    label: 'Portret grupowy sygnatariuszy',
    moment: 'zaraz po podpisie',
    slaMin: 30,
    slaLabel: '30 min od podpisu',
    ratio: '3:2',
    feeds: ['media pack', 'newsroom'],
    priority: 'obowiązkowe',
    composition: 'Dziewięć osób, jedna linia, identyfikacja za plecami. Zdjęcie, które redakcja weźmie jako otwierające.',
  },
  {
    id: 'f7',
    label: 'Portrety prelegentów pod identyfikacją',
    moment: 'przerwy',
    slaMin: null,
    slaLabel: 'T+1, do pakietu',
    ratio: '4:5',
    feeds: ['media pack', 'karta cytatowa', 'pakiet amplifikacyjny'],
    priority: 'obowiązkowe',
    composition: 'Pion, tło z identyfikacją, wysoka rozdzielczość. To jest zdjęcie, które prelegent wstawi u siebie.',
  },
  {
    id: 'f8',
    label: 'Kuluary — rozmowy',
    moment: 'przerwy',
    slaMin: 90,
    slaLabel: '90 min',
    ratio: '3:2',
    feeds: ['galeria', 'post piątkowy'],
    priority: 'jeśli zdążymy',
    composition: 'Ludzie w rozmowie, nie ustawieni. Materiał na format piątkowy i na dowód, że networking istnieje.',
  },
  {
    id: 'f9',
    label: 'Ściana partnerów',
    moment: 'przed otwarciem',
    slaMin: null,
    slaLabel: 'T+1, do raportu partnerskiego',
    ratio: '16:9',
    feeds: ['pakiet sponsorski'],
    priority: 'obowiązkowe',
    composition: 'Czysta ekspozycja logotypów. Przy niejawnych cenach partnerstw to jedyny dowód, co partner kupił.',
  },
  {
    id: 'f10',
    label: 'Sala z góry',
    moment: 'w trakcie sesji 2 lub 4',
    slaMin: null,
    slaLabel: 'T+1, do galerii',
    ratio: '16:9',
    feeds: ['galeria', 'post podsumowujący'],
    priority: 'jeśli zdążymy',
    composition: 'Skala z balkonu albo z drabiny. Jedno takie ujęcie zastępuje zdanie o liczbie uczestników.',
  },
];

export const GALLERY = {
  /** Frames delivered, not frames shot. */
  files: 180,
  due: 'T+1',
  note: 'Galeria otagowana nazwiskami, w wysokiej rozdzielczości, gotowa do pobrania bez pytania o zgodę.',
};
