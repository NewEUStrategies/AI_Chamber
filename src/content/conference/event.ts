import type { Chapter, Session } from './types';

/**
 * The edition the page is built around.
 *
 * Date, venue, auspices and the government-rank line-up come from the summit
 * announcement recorded in the dossier (bibliography entry 16). Everything
 * about the *recording* — the session grid, its lengths, its chapter marks —
 * is a production skeleton: the shape the material is cut into, sized to a
 * one-day summit. Swap the titles for the real agenda; the arithmetic below
 * follows automatically, because nothing downstream is hard-coded.
 */
export const EVENT = {
  name: 'CEE AI Summit 2026',
  city: 'Praga',
  venue: 'Martinic Palace',
  /** Day zero. Every T± figure on the page is counted from here. */
  date: '2026-09-03',
  dateLabel: '3 września 2026',
  auspices: 'Ministerstwo Przemysłu i Handlu Republiki Czeskiej',
  /** Read off the announcement: one EU commissioner, two deputy PMs, three more. */
  governmentSpeakers: 6,
  countries: 5,
  /** The document the signing moment produces. */
  declaration: 'Deklaracja regionalna CEE AI',
  declarationSignatories: 9,
} as const;

/** Assumed speech rate used to size the transcript. Stated, not hidden. */
export const WORDS_PER_MINUTE = 135;

/**
 * Six sessions, in stream order. `start` is minutes from the first frame, so
 * the ribbon, the chapter list and the cut map all read from one clock —
 * a timecode written once is a timecode that cannot drift between views.
 */
export const SESSIONS: Session[] = [
  {
    key: 's1',
    no: 1,
    title: 'Otwarcie i keynote Komisji Europejskiej',
    start: 0,
    minutes: 45,
    lang: 'en',
    stage: 'keynote',
    speakers: ['Ekaterina Zaharieva — komisarz UE ds. startupów, badań i innowacji'],
    confirmed: true,
    yield: 'Najwyższa ranga w całym dniu i jedyne wystąpienie, które media podejmą bez zachęty.',
  },
  {
    key: 's2',
    no: 2,
    title: 'Panel rządowy: wdrożenie AI Act w regionie',
    start: 45,
    minutes: 70,
    lang: 'en',
    stage: 'panel',
    speakers: [
      'Karel Havlíček — wicepremier, minister przemysłu i handlu (Czechy)',
      'Krzysztof Gawkowski — wicepremier, minister cyfryzacji (Polska)',
      'Zoltán Tanács — minister nauki i technologii (Węgry)',
      'Samuel Migaľ — minister inwestycji i informatyzacji (Słowacja)',
    ],
    confirmed: true,
    yield: 'Czterech ministrów z czterech krajów na jednej scenie — materiał na format konfrontacyjny.',
  },
  {
    key: 's3',
    no: 3,
    title: 'Prezentacja raportu: MŚP a AI w Europie Środkowo-Wschodniej',
    start: 115,
    minutes: 40,
    lang: 'en',
    stage: 'prezentacja',
    speakers: ['Dyrektor ds. polityki publicznej', 'Autorzy badania'],
    confirmed: false,
    yield: 'Jedyny moment dnia z własnymi danymi pierwotnymi: 3 200 respondentów z 11 krajów.',
  },
  {
    key: 's4',
    no: 4,
    title: 'Panel biznesowy: luka adopcyjna i co ją zamyka',
    start: 155,
    minutes: 60,
    lang: 'en',
    stage: 'panel',
    speakers: ['CEO firm członkowskich', 'Przedstawiciel Komisji'],
    confirmed: false,
    yield: 'Źródło setek członkowskich — konkretna firma mówi, co dostała.',
  },
  {
    key: 's5',
    no: 5,
    title: 'Podpisanie deklaracji regionalnej',
    start: 215,
    minutes: 25,
    lang: 'en',
    stage: 'ceremonia',
    speakers: ['Sygnatariusze — dziewięć państw', 'Prezes izby'],
    confirmed: false,
    yield: 'Jedyny moment fotograficzny, który jest wydarzeniem sam w sobie, a nie ilustracją.',
  },
  {
    key: 's6',
    no: 6,
    title: 'Panel zamykający: CEE AI Action Plan — co dalej',
    start: 240,
    minutes: 65,
    lang: 'pl',
    stage: 'panel',
    speakers: ['Dariusz Standerski — sekretarz stanu w Ministerstwie Cyfryzacji', 'Rada doradcza izby'],
    confirmed: true,
    yield: 'Jedyna sesja po polsku — i jedyne źródło materiału na bazę członkowską opartą na Polsce.',
  },
];

/**
 * Chapter marks for the archive copy. Two purposes at once: they are what a
 * viewer scrubs to, and they are the headings a language model reads when the
 * transcript is indexed. A recording without them is one 305-minute block that
 * nothing can cite.
 */
export const CHAPTERS: Chapter[] = [
  { at: 0, label: 'Otwarcie, powitanie gospodarza', session: 's1' },
  { at: 8, label: 'Keynote: agenda innowacyjna UE a region', session: 's1' },
  { at: 32, label: 'Pytania z sali', session: 's1' },
  { at: 45, label: 'Panel rządowy — wejście', session: 's2' },
  { at: 54, label: 'Art. 50 i obowiązek oznaczania od sierpnia 2026', session: 's2' },
  { at: 76, label: 'Kto jest organem nadzoru w każdym z czterech krajów', session: 's2' },
  { at: 98, label: 'Grudzień 2027: systemy wysokiego ryzyka', session: 's2' },
  { at: 115, label: 'Raport MŚP — metoda i próba', session: 's3' },
  { at: 126, label: 'Wyniki: bariery wdrożeniowe', session: 's3' },
  { at: 142, label: 'Wyniki: kompetencje i koszt', session: 's3' },
  { at: 155, label: 'Panel biznesowy — wejście', session: 's4' },
  { at: 168, label: 'Luka adopcyjna: dwa źródła, dwie liczby', session: 's4' },
  { at: 190, label: 'Case studies firm członkowskich', session: 's4' },
  { at: 215, label: 'Podpisanie deklaracji — wystąpienia sygnatariuszy', session: 's5' },
  { at: 231, label: 'Moment podpisu', session: 's5' },
  { at: 240, label: 'Panel zamykający — wejście', session: 's6' },
  { at: 252, label: 'Pięć filarów CEE AI Action Plan', session: 's6' },
  { at: 281, label: 'Zobowiązania na kolejny rok', session: 's6' },
];

/* ---------------------------------------------------------------- *
 * Derived — computed, never typed in twice                         *
 * ---------------------------------------------------------------- */

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const RECORDING = {
  minutes: sum(SESSIONS.map((s) => s.minutes)),
  sessions: SESSIONS.length,
  chapters: CHAPTERS.length,
  /** Transcript size at the stated speech rate. */
  words: Math.round(sum(SESSIONS.map((s) => s.minutes)) * WORDS_PER_MINUTE),
  polishMinutes: sum(SESSIONS.filter((s) => s.lang === 'pl').map((s) => s.minutes)),
  confirmedSessions: SESSIONS.filter((s) => s.confirmed).length,
};

export const sessionByKey = (key: string): Session | undefined =>
  SESSIONS.find((s) => s.key === key);

/** `137` → `2:17` — one formatter, so every timecode on the page reads alike. */
export const timecode = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}:${String(m).padStart(2, '0')}`;
};

/** Days between the event and `now`. Negative before, positive after. */
export function dayOffset(now: Date = new Date()): number {
  const event = new Date(`${EVENT.date}T00:00:00Z`);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((today - event.getTime()) / 86_400_000);
}

/** `-90` → `T-90`, `0` → `dzień zero`. */
export const tLabel = (day: number): string =>
  day === 0 ? 'dzień zero' : day > 0 ? `T+${day}` : `T${day}`;
