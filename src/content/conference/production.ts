import type { Milestone, SlaItem } from './types';

/**
 * The calendar, at two zoom levels.
 *
 * `MILESTONES` runs T-90 to T+35 in days; `DAY_ZERO` runs the event day itself
 * in minutes. They are the same timeline — day zero is one tick on the first
 * and the whole axis on the second — so the page toggles between them rather
 * than drawing a day-scale axis that cannot show a thirty-minute deadline.
 */
export const MILESTONES: Milestone[] = [
  {
    day: -90,
    label: 'T-90',
    title: 'Otwarcie rejestracji i pierwsza fala prelegentów',
    what: 'Strona z agendą i cennikiem. Prelegenci po dwóch tygodniowo, nigdy wszyscy naraz — każdy jako osobny post z zajawką nagraną przez niego samego telefonem.',
    phase: 'przed',
    artifacts: ['setki'],
  },
  {
    day: -60,
    label: 'T-60',
    title: 'Seria merytoryczna i pierwszy wywiad',
    what: 'Co dwa tygodnie jeden temat z agendy jako karuzela i setka. Pierwszy wywiad pisemny z prelegentem na stronie. Sekwencja mailowa do uczestników poprzedniej edycji.',
    phase: 'przed',
    artifacts: ['newsletter', 'setki'],
  },
  {
    day: -30,
    label: 'T-30',
    title: 'Media pack i otwarcie akredytacji',
    what: 'Wysyłka do Tier B i C, kontakt osobisty z Tier A. Akredytacja otwarta — to ona daje listę dziennikarzy na cały rok. Druga fala prelegentów, keynote jako osobny moment.',
    phase: 'przed',
    artifacts: ['mediapack'],
  },
  {
    day: -14,
    label: 'T-14',
    title: 'Zapowiedź dokumentu',
    what: 'Co zostanie podpisane lub ogłoszone. Na samą agendę dziennikarz nie przyjedzie — musi wiedzieć, po co.',
    phase: 'przed',
    artifacts: ['mediapack'],
  },
  {
    day: -7,
    label: 'T-7',
    title: 'Raport pod embargo i pakiety amplifikacyjne',
    what: 'Pełny raport do Tier A i B z podaną datą i godziną zdjęcia embarga. Pakiety do wszystkich prelegentów, partnerów i sygnatariuszy: grafika w dwóch formatach, trzy gotowe zdania, bezpośredni link.',
    phase: 'przed',
    artifacts: ['mediapack', 'grafika'],
  },
  {
    day: -1,
    label: 'T-1',
    title: 'Post „jutro” i zdjęcia przygotowań',
    what: 'Praktyczne informacje dla uczestników i mediów. Fotograf zaczyna dzień wcześniej — pusta sala przed otwarciem jest kadrem, którego nie da się zrobić później.',
    phase: 'przed',
    artifacts: ['zdjecia'],
  },
  {
    day: 0,
    label: 'dzień zero',
    title: 'Trzy role na miejscu i nic mniej',
    what: 'Fotograf, operator setek, publikujący. Publikujący nie robi nic innego — w dniu konferencji nikt nie ma czasu montować, i to jest powód, dla którego większość organizacji publikuje relację trzy dni później.',
    phase: 'dzien',
    artifacts: ['zdjecia', 'grafika', 'setki', 'mediapack', 'newsletter'],
  },
  {
    day: 1,
    label: 'T+1',
    title: 'Galeria, liczby, mail do uczestników',
    what: 'Pełna galeria otagowana i gotowa do pobrania. Post podsumowujący z liczbami: uczestnicy, kraje, sygnatariusze. Mail do wszystkich uczestników z materiałami.',
    phase: 'po',
    artifacts: ['zdjecia', 'newsletter'],
  },
  {
    day: 3,
    label: 'T+3',
    title: 'Nagrania i transkrypcje na stronie',
    what: 'Druga fala zasięgu, której izba dziś w ogóle nie zbiera. Od tego momentu materiał zaczyna pracować w wyszukiwarce i w modelach językowych, a nie tylko w feedzie.',
    phase: 'po',
    artifacts: ['nagranie', 'transkrypcja'],
  },
  {
    day: 7,
    label: 'T+7',
    title: 'Dokument pokonferencyjny',
    what: 'Co ustalono, kto się do czego zobowiązał, co dalej. Osobna strona, osobny komunikat — i pozycja w rejestrze stanowisk, po którą sięgnie analityk.',
    phase: 'po',
    artifacts: ['mediapack', 'transkrypcja'],
  },
  {
    day: 14,
    label: 'T+14',
    title: 'Start serii setek',
    what: 'Klipy wycięte z nagrań, publikowane przez trzy tygodnie, każdy z tagiem mówcy. Materiał jest już nagrany — koszt krańcowy każdego kolejnego klipu to montaż.',
    phase: 'po',
    artifacts: ['setki'],
  },
  {
    day: 30,
    label: 'T+30',
    title: 'Sekwencja sprzedażowa do nieczłonków',
    what: 'Jedyny moment w roku, kiedy izba ma listę osób, które fizycznie przyjechały. Dziś ta lista przepada.',
    phase: 'po',
    artifacts: ['newsletter'],
  },
  {
    day: 35,
    label: 'T+35',
    title: 'Ostatnia setka z serii',
    what: 'Koniec okna dystrybucji jednej edycji. Między edycjami wchodzą mniejsze formaty regionalne, zaczynając od Czech.',
    phase: 'po',
    artifacts: ['setki'],
  },
];

/**
 * The day-zero clock. `minutes` counts from the moment that triggers the
 * deliverable, not from the start of the day — the first photo is sixty
 * minutes from the doors opening, the signing frame thirty from the signature.
 * Anchoring each to its own trigger is what makes the number enforceable.
 */
export const DAY_ZERO: SlaItem[] = [
  {
    label: 'Raport po zdjęciu embarga',
    minutes: 0,
    trigger: 'godzina otwarcia',
    artifact: 'mediapack',
  },
  {
    label: 'Cytat dnia na grafice',
    minutes: 30,
    trigger: 'wypowiedź na scenie',
    artifact: 'grafika',
  },
  {
    label: 'Zdjęcie momentu podpisu',
    minutes: 30,
    trigger: 'złożenie podpisu',
    artifact: 'zdjecia',
  },
  {
    label: 'Pierwsze zdjęcie z sali',
    minutes: 60,
    trigger: 'otwarcie drzwi',
    artifact: 'zdjecia',
  },
  {
    label: 'Setka z kuluarów',
    minutes: 90,
    trigger: 'nagranie wypowiedzi',
    artifact: 'setki',
  },
  {
    label: 'Podsumowanie dnia, 60 s',
    minutes: 600,
    trigger: 'zamknięcie ostatniej sesji',
    artifact: 'setki',
  },
];

/** Deadlines that fit the minute axis; the evening summary is shown apart. */
export const DAY_ZERO_AXIS_MAX = 90;

export const PHASE_LABEL: Record<Milestone['phase'], string> = {
  przed: 'przed',
  dzien: 'dzień zero',
  po: 'po',
};

/**
 * Four roles. They may be combined in one person, but none of them may stay
 * unassigned — an unassigned role is the reason a relation waits three days.
 */
export const ROLES = [
  { role: 'Redaktor', does: 'decyduje, co wychodzi, i trzyma próg jakości', onSite: false },
  { role: 'Producent', does: 'dowozi materiał, pilnuje terminów, prowadzi plan zdjęciowy', onSite: true },
  { role: 'Dystrybutor', does: 'publikuje, kaskaduje, obsługuje protokół amplifikacji', onSite: true },
  { role: 'Rzecznik', does: 'jedyny kontakt dla mediów, z własnym SLA odpowiedzi', onSite: true },
] as const;

/**
 * The rule that makes the SLA table above possible at all. Without it every
 * number in it is fiction: an organisation whose room report waits for board
 * sign-off loses to one that publishes within the hour, and no amount of
 * quality makes that up.
 */
export const SPEED_RULE = {
  skipsApproval: ['relacja z sali', 'post reaktywny na zmianę regulacyjną', 'zdjęcia', 'setka z kuluarów'],
  needsApproval: ['stanowisko', 'cytat imienny', 'liczba'],
};
