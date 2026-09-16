import type {
  ChannelDecision,
  Emphasis,
  FormatRec,
  Ritual,
  VideoFormat,
  WrittenFormat,
} from './types';

/**
 * Social — channel decisions, format mix, rhythm.
 *
 * Every count referenced below is read from the archived posts in
 * `@/content/dossier/social`, not written here: the panel joins to that data.
 * What is written here is the decision.
 */

export const CHANNEL_DECISIONS: ChannelDecision[] = [
  {
    key: 'fb',
    channel: 'Facebook',
    verdict: 'Zamknąć albo przypisać właściciela. Trzeciej opcji nie ma.',
    status: 'brak',
    body:
      'Dwanaście postów, dziesięć reakcji łącznie, cisza przez własny szczyt, zero opinii — a strona jest podlinkowana z witryny. Potencjalny członek sprawdzający organizację przed opłaceniem składki widzi dowód przeciwko ofercie.',
    actions: [
      'Aktywizacja przez grupy Facebook.',
      'Albo właściciel i rytm tygodniowy, z treścią pisaną pod platformę.',
      'Jeśli zostaje — własne kadry zamiast przeklejek. Ślad „hashtag#AIChamber” w poście z 5 sierpnia pokazuje kopiowanie z LinkedIna bez przeczytania.',
    ],
  },
  {
    key: 'li',
    channel: 'LinkedIn',
    verdict: 'Oś kanału społecznościowego, ale z przebudowanym miksem formatów.',
    status: 'kuleje',
    body:
      'Wskaźnik zaangażowania mieści się w dolnej części normy dla stron firmowych. Problem nie leży w zasięgu, tylko w tym, co się publikuje — rozkład formatów jest odwrotny do ich skuteczności.',
    actions: [
      'Odwrócić proporcje formatów zgodnie z tabelą niżej.',
      'Trzy nazwane rytuały tygodniowe zamiast luźnej serii postów.',
      'Treść regulacyjna zawsze w dwóch wersjach językowych.',
    ],
  },
  {
    key: 'yt',
    channel: 'YouTube',
    verdict: 'Do założenia jako archiwum, nie jako kanał.',
    status: 'brak',
    body:
      'Pełne nagrania paneli, transkrypcje w opisie, rozdziały. Nie ma tu ambicji budowania widowni — jest miejsce, w którym materiał leży pod trwałym adresem.',
    actions: [
      'Pełne nagrania paneli, nie wycinki.',
      'Transkrypcja w opisie jako tekst.',
      'Rozdziały z timecodami.',
      'Naprawia przy okazji widoczność w modelach językowych.',
    ],
  },
  {
    key: 'people',
    channel: 'Profile osobiste',
    verdict: 'Dziewięć sieci do dystrybucji. Bez tej kaskady ekspansja regionalna nie ma nośnika.',
    status: 'nieznane',
    body:
      'Strona firmowa ma strukturalnie niższy zasięg niż profil człowieka. Do dystrybucji wchodzi dziewięć sieci: zarząd, dyrektorzy i czworo doradców-byłych ministrów. Ile z nich podaje dziś dalej, rozpoznanie nie sprawdzało — czytało stronę firmową, nie prywatne profile.',
    actions: [
      'Cztery z tych sieci są zagraniczne — czyli dokładnie tam, gdzie baza członkowska jest symboliczna.',
      'Każdy post strony kaskaduje się przez profile, każdy z własnym jednozdaniowym komentarzem.',
      'Nigdy z przeklejonym tekstem.',
    ],
  },
];

/**
 * Format mix. The counts and the reaction means come from the archived posts;
 * these rows carry only the direction and the reading.
 */
export const FORMAT_RECS: FormatRec[] = [
  {
    key: 'zdjecia',
    label: 'Zdjęcia z wydarzeń',
    rec: 'zwiększyć mocno',
    observation: 'Najwyższy wynik kanału. Dwa posty w całej próbie.',
  },
  {
    key: 'karuzela',
    label: 'Karuzela merytoryczna',
    rec: 'utrzymać',
    observation: 'Najlepszy nośnik treści w portfelu.',
    comment:
      'Karuzela dziś niesie głównie powitania nowych członków. Przestawić na treść merytoryczną — pięć slajdów o jednym obowiązku regulacyjnym.',
  },
  {
    key: 'live',
    label: 'Transmisja i wideo z ludźmi',
    rec: 'zwiększyć',
    observation: 'Źródło niemal połowy komentarzy całego kanału przy dwóch publikacjach.',
    comment:
      'To jedyne miejsce, gdzie dzieje się rozmowa, a jest używane najrzadziej. Raz w miesiącu, naprzemiennie PL i EN.',
  },
  {
    key: 'obraz',
    label: 'Pojedyncza grafika',
    rec: 'wygaszać',
    observation: 'Format najsłabszy, a produkowany najczęściej.',
  },
  {
    key: 'newsletter',
    label: 'Newsletter i kanały własne',
    rec: 'utrzymać',
    observation: 'Funkcja serwisowa — nie ma zbierać zasięgu.',
  },
];

export const RITUALS: Ritual[] = [
  {
    day: 'Poniedziałek',
    dayIndex: 0,
    name: 'Policy Signal',
    what: 'Jedna zmiana regulacyjna, jedno zdanie co znaczy dla firmy, jedno zdanie co robi izba.',
    format: 'Karuzela lub setka · PL i EN',
  },
  {
    day: 'Środa',
    dayIndex: 2,
    name: 'Format zmienny',
    what: 'Zależnie od kalendarza: karta ekspercka, wywiad, zapowiedź wydarzenia, case study członka.',
    format: 'Zmienny',
  },
  {
    day: 'Piątek',
    dayIndex: 4,
    name: 'Ludzie',
    what: 'Zdjęcia, twarze, kulisy, nowi członkowie w formacie „kto to jest i co robi”, nie „witamy w gronie”.',
    format: 'Zdjęcia',
  },
];

/** Naming matters: a ritual is recognisable, a loose series of posts is not. */
export const RITUAL_RULE =
  'Nazwa ma znaczenie, bo rytuał jest rozpoznawalny, a luźna seria postów nie.';

export const VIDEO_FORMATS: VideoFormat[] = [
  {
    name: 'Setka gorąca',
    spec: '30–45 s · pion 9:16 plus wersja pozioma',
    cadence: 'tego samego dnia',
    what: 'Jedna osoba, jedna teza, nagrana na miejscu, tło z identyfikacją.',
    why: 'Nie relacja z panelu — jedno zdanie, które da się zacytować.',
  },
  {
    name: 'Setka regulacyjna',
    spec: '60–90 s',
    cadence: 'co dwa tygodnie',
    what: 'Dyrektor ds. polityki publicznej albo członek rady odpowiada na jedno pytanie: co zmienia art. 50 od sierpnia 2026, czym grozi grudzień 2027, kto jest organem nadzoru w Polsce.',
    why: 'Jedyny format zamieniający kapitał polityczny izby na coś sprzedawalnego.',
  },
  {
    name: 'Setka członkowska',
    spec: '30 s',
    cadence: 'miesięcznie',
    what: 'CEO firmy członkowskiej mówi konkretnie, co dostał — „dzięki izbie nasze stanowisko trafiło do konsultacji KE”.',
    why: 'Pracuje jednocześnie na akwizycję i na retencję pierwszoroczną.',
  },
  {
    name: 'Zajawka prelegenta',
    spec: 'telefon prelegenta',
    cadence: 'T-30 do T-7',
    what: 'Nagrana przez samego prelegenta: „widzimy się w Pradze, będę mówił o X”.',
    why: 'Koszt zerowy, a materiał wchodzi do sieci prelegenta, nie izby.',
  },
  {
    name: 'Format konfrontacyjny',
    spec: 'sklejka',
    cadence: 'co edycję',
    what: 'To samo pytanie zadane każdemu prelegentowi, odpowiedzi cięte obok siebie.',
    why: 'Dwie osoby z różnych krajów mówiące coś przeciwnego w jednym klipie pracują mocniej niż dwanaście uprzejmych wypowiedzi. Powtarzany co roku staje się serią, którą porównuje się między edycjami.',
  },
  {
    name: 'Transmisja na żywo',
    spec: 'naprzemiennie PL i EN',
    cadence: 'raz w miesiącu',
    what: 'Rozmowa na żywo, nie prezentacja.',
    why: 'Dwie dotychczasowe transmisje dały niemal połowę komentarzy całego kanału.',
  },
];

export const WRITTEN_FORMATS: WrittenFormat[] = [
  {
    name: 'Karty eksperckie ko-brandowane',
    what: 'Z redakcjami: Rzeczpospolita, wirtualnemedia, My Company, dlahandlu.',
    use: 'Najdopracowańszy format w portfelu i jedyny, który daje członkowi coś, czym pochwali się u siebie. Zamienić w program z gwarantowaną liczbą kart w pakietach PRO i PREMIUM.',
  },
  {
    name: 'Wywiad z prelegentem przed konferencją',
    what: 'Pełna wersja na stronie, fragment na LinkedIn, setka jako zajawka.',
    use: 'Buduje agendę jako news.',
  },
  {
    name: 'Wywiad z ministrem-doradcą',
    what: 'O rynku jego kraju. Pełna wersja na stronie, fragment na LinkedIn, setka jako zajawka.',
    use: 'Otwiera ekspansję regionalną.',
  },
  {
    name: 'Wywiad z CEO firmy członkowskiej',
    what: 'Pełna wersja na stronie, fragment na LinkedIn, setka jako zajawka.',
    use: 'Dowód wartości i materiał na case study.',
  },
  {
    name: 'Zdjęcia z wydarzeń',
    what: 'Fotograf na każdym wydarzeniu, galeria tego samego dnia.',
    use: 'Najmocniejsza waluta kanału.',
  },
];

/**
 * Ordered on purpose: the sequence is the recommendation. It follows what the
 * chamber actually has and national competitors do not.
 */
export const EMPHASIS: Emphasis[] = [
  {
    what: 'Rada doradcza z byłymi ministrami czterech państw regionu',
    why: 'Nie do odtworzenia przez konkurenta krajowego w skali roku.',
  },
  {
    what: 'Konkretny wpływ na konkretny dokument',
    why: 'Nazwa projektu ustawy, etap konsultacji, data.',
    caution: 'Nie „reprezentujemy interesy”. Ogólnik jest nieweryfikowalny, więc nie działa jako dowód.',
  },
  {
    what: 'Własne dane pierwotne — 3 200 respondentów z 11 krajów',
    why: 'Nie komentarz do cudzych badań, tylko materiał, który cytuje ktoś inny.',
  },
  {
    what: 'Koalicja trzynastu organizacji',
    why: 'Odpowiedź na obiekcję „po co nam składka”: firma o pięciu pracownikach sama nie wpłynie na regulację unijną.',
  },
  {
    what: 'Luka adopcyjna, z rozdzieleniem źródeł',
    why: '13,5% pochodzi z Eurostatu, 4–6% z materiału własnego izby.',
    caution: 'Mieszanie ich w jednym slajdzie jest podatne na podważenie w jednym zdaniu.',
  },
];

export const DO_NOT_EMPHASISE = [
  {
    what: 'Liczba członków',
    why: 'Dziewięćdziesiąt wobec Hub France IA z ponad ośmiuset działa przeciwko nam.',
  },
  { what: 'Zasięgi', why: 'Nie są argumentem dla nikogo poza nami samymi.' },
  { what: 'Wyniki wyszukiwarkowe', why: 'Przy siedmiu frazach z pozycją to argument przeciwko sobie.' },
];

export const TAGGING = {
  always: [
    'Profil osobisty prelegenta przed instytucją — osoba ma sieć, instytucja ma logo.',
    'Każda wymieniona firma członkowska.',
    'Partner wydarzenia.',
    'Dziennikarz, jeśli post dotyczy jego materiału.',
  ],
  never: [
    'Tagowanie masowe.',
    'Więcej niż pięć-sześć podmiotów w poście.',
    'Osoby bez związku z treścią.',
  ],
  rule: 'LinkedIn ogranicza zasięg postów z nadmiernym tagowaniem.',
};

export const AMPLIFICATION = {
  when: 'T-24h',
  items: [
    'Grafika w dwóch formatach: 1200 × 1200 i 1080 × 1350.',
    'Trzy gotowe zdania do wyboru.',
    'Bezpośredni link.',
  ],
  why:
    'Tagowany podmiot, który dostaje gotowy materiał, podaje dalej znacznie częściej niż ten, który ma sobie coś sam wyciąć. Czy taki pakiet dziś wychodzi, z zewnątrz nie widać — jeśli nie, jest to jedna z tańszych zmian w całym planie. Przy konferencji idzie do wszystkich prelegentów, partnerów i sygnatariuszy deklaracji.',
};

/** Publication cascade, in hours. The page draws it on a clock. */
export const CASCADE = {
  pageHour: 9,
  fromHour: 10,
  toHour: 14,
  rule:
    'Post strony o 9:00, kaskada profili osobistych między 10:00 a 14:00, każdy z własnym jednozdaniowym komentarzem, nigdy z przeklejonym tekstem.',
};

/** A post does not go out if any of these is true. */
export const POST_GATE = [
  'Nie da się z niego wyjąć jednego cytowalnego zdania.',
  'Nie ma w nim człowieka, liczby albo daty.',
  'Grafika jest przejętą kreacją partnera bez adaptacji — dziś trzy takie posty, obca paleta i typografia.',
  'Tekst był przeklejony między platformami bez przeczytania.',
];

/** Reference points from the reconnaissance, to compare on the next read. */
export const SOCIAL_WATCH = {
  baseline: 'mediana 14 reakcji, ER 0,46%, 2 z 27 postów po polsku',
  watch: [
    'Mediana reakcji na post, kwartał do kwartału.',
    'Udział formatów z ludźmi w publikacjach.',
    'Kliknięcia do formularza deklaracji.',
    'Liczba postów kaskadowanych przez profile osobiste.',
  ],
};
