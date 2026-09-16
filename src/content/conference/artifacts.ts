import type { Artifact, ArtifactKey, Medium } from './types';

/**
 * The seven families cut out of one day.
 *
 * `units` counts separately published items, not files — a gallery of a
 * hundred and eighty frames is one publication, twelve clips are twelve. That
 * is the number the cascade draws, because it is the number that answers the
 * question the brief asks: how many times does one conference speak?
 *
 * `status` is an assessment of the 2026 edition read from outside, on the same
 * rule as the rest of the cockpit: where the outside view cannot settle it,
 * the answer is `nieznane` rather than a guess dressed as a finding. Two of
 * the seven land there, and that is the honest count.
 */
export const ARTIFACTS: Artifact[] = [
  {
    key: 'nagranie',
    label: 'Pełne nagranie na stronę',
    what: 'Sześć sesji jako osobne nagrania z rozdziałami, na trwałych adresach',
    medium: 'wideo',
    units: 6,
    unitLabel: 'sześć nagrań sesji',
    fromDay: 0,
    dueDay: 3,
    due: 'T+3',
    dueShort: 'T+3',
    owner: 'Producent',
    lands: ['YouTube jako archiwum', '/archiwum-wystapien/ na stronie', 'opis z transkrypcją i rozdziałami'],
    status: 'brak',
    evidence:
      'Izba nie prowadzi kanału wideo — w rozpoznaniu YouTube występuje jako kanał do założenia, a archiwum wystąpień jako jedna z czterech sekcji witryny do zbudowania.',
    why: 'To jedyny nośnik, który jednocześnie obsługuje wyszukiwarkę, modele językowe i dowód wartości dla sponsora. Nagranie bez publikacji nie pracuje na żaden z trzech.',
    gate: [
      'rozdziały z timecodami w opisie',
      'transkrypcja jako tekst, nie napisy wypalone w obrazie',
      'trwały adres, który się nie zmieni',
      'znacznik schema.org VideoObject',
    ],
  },
  {
    key: 'transkrypcja',
    label: 'Transkrypcja jako tekst',
    what: 'Pełny zapis sześciu sesji, PL i EN, jako indeksowalny tekst na stronie',
    medium: 'tekst',
    units: 6,
    unitLabel: 'sześć transkrypcji',
    fromDay: 0,
    dueDay: 3,
    due: 'T+3',
    dueShort: 'T+3',
    owner: 'Redaktor',
    lands: ['strona sesji', 'opis nagrania', 'plik llms.txt'],
    status: 'brak',
    evidence:
      'Przy sześciu wizytach organicznych z Polski miesięcznie i siedmiu frazach z pozycją, serwis nie ma treści, którą wyszukiwarka mogłaby wziąć. Transkrypcji nie ma, bo nie ma nagrań.',
    why: 'Najtańsza treść, jaką izba może mieć: powstaje sama z tego, co już się wydarzyło. To ona zamienia jeden dzień w kilkadziesiąt tysięcy słów, które da się zacytować.',
    gate: [
      'tekst w HTML, nie obraz i nie PDF',
      'nazwiska mówców rozpisane, nie „Speaker 1”',
      'timecody linkujące do momentu w nagraniu',
      'hreflang dla pary PL i EN',
    ],
  },
  {
    key: 'setki',
    label: 'Setki wycięte z nagrania',
    what: 'Dwanaście klipów 30–90 s, publikowanych przez trzy tygodnie po wydarzeniu',
    medium: 'wideo',
    units: 12,
    unitLabel: 'dwanaście klipów',
    fromDay: 1,
    dueDay: 35,
    due: 'T+14 do T+35',
    dueShort: 'T+14…35',
    owner: 'Producent',
    lands: ['LinkedIn — strona', 'kaskada profili osobistych', 'sieci prelegentów'],
    status: 'brak',
    evidence:
      'W próbie dwudziestu siedmiu postów LinkedIna z okresu obejmującego szczyt nie ma ani jednego klipu z sali. Cały dorobek wydarzenia to jeden post ze zdjęciami.',
    why: 'Druga fala zasięgu, której izba dziś w ogóle nie zbiera. Jeden panel daje kilka klipów; sześć sesji daje materiał na cały miesiąc bez jednego dnia zdjęciowego więcej.',
    gate: [
      'jedna teza na klip, nie relacja z panelu',
      'pion 9:16 i wersja pozioma',
      'tag prelegenta w każdym klipie',
      'napisy wypalone — klip ogląda się bez dźwięku',
    ],
  },
  {
    key: 'grafika',
    label: 'Cytat na grafikę',
    what: 'Osiem kart cytatowych w dwóch formatach, z kartą liczbową włącznie',
    medium: 'cytat',
    units: 8,
    unitLabel: 'osiem kart',
    fromDay: 0,
    dueDay: 1,
    due: '30 minut od wypowiedzi',
    dueShort: '30 min',
    owner: 'Dystrybutor',
    lands: ['LinkedIn 1200×1200', 'LinkedIn 1080×1350', 'pakiet amplifikacyjny prelegenta'],
    status: 'kuleje',
    evidence:
      'Rzemiosło istnieje: karty eksperckie ko-brandowane z redakcjami to najdopracowańszy format w portfelu, a szczyt ma własną identyfikację wizualną użytą w ośmiu postach. Czego nie ma, to karty zasilanej ze sceny w dniu wydarzenia.',
    why: 'Jedyny format, który wychodzi w trzydzieści minut od wypowiedzi i wchodzi do sieci prelegenta, a nie tylko izby.',
    gate: [
      'jedno zdanie, które da się zacytować bez kontekstu',
      'mieści się w obu formatach bez zmniejszania stopnia pisma',
      'nazwisko i funkcja przy cytacie',
      'liczba zawsze z podaniem źródła na karcie',
    ],
  },
  {
    key: 'newsletter',
    label: 'Fragment do newslettera',
    what: 'Trzy wejścia konferencji do Policy Brief i sekwencji mailowych',
    medium: 'tekst',
    units: 3,
    unitLabel: 'trzy fragmenty',
    fromDay: 0,
    dueDay: 30,
    due: 'dzień zero, T+1, T+30',
    dueShort: 'T0…+30',
    owner: 'Redaktor',
    lands: ['Policy Brief — wydanie konferencyjne', 'mail do uczestników', 'sekwencja sprzedażowa T+30'],
    status: 'nieznane',
    evidence:
      'Izba prowadzi newsletter — trzy z dwudziestu siedmiu postów to jego zapowiedzi. Czy wydanie konferencyjne wyszło i co zawierało, nie da się ustalić bez dostępu do listy wysyłkowej.',
    why: 'Mail jest jedynym kanałem, w którym izba wie, do kogo mówi. Konferencja jest jedynym momentem w roku, kiedy ta lista rośnie o ludzi, którzy fizycznie przyjechali.',
    gate: [
      'jeden cel na mail i jedno wezwanie do działania',
      'nagłówek bez wykrzyknika i bez emoji',
      'jedna liczba w każdym wydaniu',
      'odbiorca wie, co zrobić w ciągu pięciu minut',
    ],
  },
  {
    key: 'mediapack',
    label: 'Cytat do media packu',
    what: 'Cztery cytaty do autoryzacji, zwolnione według harmonogramu embarga',
    medium: 'cytat',
    units: 4,
    unitLabel: 'cztery cytaty',
    fromDay: -30,
    dueDay: 0,
    due: 'zwolnione od godziny otwarcia',
    dueShort: 'T0',
    owner: 'Rzecznik',
    lands: ['pakiet Tier A i B pod embargo', 'komunikat Tier C w dniu zero', 'newsroom na stronie'],
    status: 'nieznane',
    evidence:
      'Rozpoznanie nie ma tu żadnego pomiaru: nie widać ani listy akredytacyjnej, ani publikacji z podziałem na redakcje. Brak pomiaru to nie to samo co brak działania — i tak jest to zapisane.',
    why: 'Cytat gotowy do wklejenia skraca dziennikarzowi drogę od maila do tekstu. Przy zamknięciu numeru to różnica między byciem cytowanym a pominiętym.',
    gate: [
      'autoryzacja przed wysyłką pakietu',
      'godzina zwolnienia podana wprost przy cytacie',
      'każda liczba z metodą i próbą',
      'rzecznik z numerem telefonu w pakiecie',
    ],
  },
  {
    key: 'zdjecia',
    label: 'Zdjęcia z sali',
    what: 'Plan zdjęciowy na dziesięć kadrów, galeria i trzy publikacje',
    medium: 'foto',
    units: 3,
    unitLabel: 'trzy publikacje, ok. 180 plików',
    fromDay: 0,
    dueDay: 1,
    due: 'pierwsze zdjęcie 60 min, galeria T+1',
    dueShort: '60 min',
    owner: 'Producent',
    lands: ['post w dniu zero', 'galeria do pobrania T+1', 'media pack i newsroom'],
    status: 'kuleje',
    evidence:
      'Relacja zdjęciowa z Pragi jest najmocniejszym postem w całej próbie — 75 reakcji przy medianie 14. Ukazała się jednak siedem dni przed odczytem, czyli około T+6, przy progu T+1. Materiał był; zabrakło tempa.',
    why: 'Najmocniejsza waluta kanału. Posty ze zdjęciami ludzi biją średnią kanału wielokrotnie, a stanowią dwa z dwudziestu siedmiu postów.',
    gate: [
      'fotograf na miejscu przez cały dzień',
      'moment podpisu jako ustawiony kadr, nie zdjęcie z ręki',
      'galeria otagowana nazwiskami',
      'wysoka rozdzielczość do pobrania przez media',
    ],
  },
];

/** Fixed order, so a medium keeps its hue wherever it appears. */
export const MEDIA: { key: Medium; label: string; produces: string }[] = [
  { key: 'wideo', label: 'wideo', produces: 'operator i montaż' },
  { key: 'tekst', label: 'tekst', produces: 'redakcja' },
  { key: 'cytat', label: 'cytat', produces: 'redakcja i grafika' },
  { key: 'foto', label: 'foto', produces: 'fotograf' },
];

export const artifactByKey = (key: ArtifactKey): Artifact =>
  ARTIFACTS.find((a) => a.key === key) ?? ARTIFACTS[0];

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const CASCADE = {
  /** The headline: one day, this many separately published items. */
  units: sum(ARTIFACTS.map((a) => a.units)),
  families: ARTIFACTS.length,
  /** First production day to last deadline. */
  fromDay: Math.min(...ARTIFACTS.map((a) => a.fromDay)),
  toDay: Math.max(...ARTIFACTS.map((a) => a.dueDay)),
  /** Families whose state the outside view could actually settle. */
  assessed: ARTIFACTS.filter((a) => a.status !== 'nieznane').length,
  missing: ARTIFACTS.filter((a) => a.status === 'brak').length,
  /**
   * What the 2026 edition actually produced, as far as the reconnaissance can
   * see: one photo relation on LinkedIn. The gap between this and `units` is
   * the whole argument of the page.
   */
  observedUnits: 1,
  observedNote:
    'Jeden post ze zdjęciami w próbie dwudziestu siedmiu publikacji LinkedIna — jedyny ślad szczytu po jego zakończeniu.',
};
