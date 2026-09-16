import type { Short, ShortKind } from './types';

/**
 * The cut list.
 *
 * Every row says where in the recording the clip starts, so the cut map can
 * draw the line from source to publication date. That line is the whole point
 * of the tab: twelve publications over three weeks, all of them already shot,
 * all of them costing nothing but an edit.
 *
 * `thesis` describes what the moment is about. It is deliberately not a quoted
 * line — the words get taken off the recording, not written in advance here.
 */
export const SHORTS: Short[] = [
  {
    id: 'k1',
    kind: 'regulacyjna',
    thesis: 'Co zmienia artykuł 50 od sierpnia 2026 i kogo obowiązek oznaczania faktycznie dotyczy',
    session: 's2',
    at: 58,
    seconds: 75,
    speakerSlot: 'Wicepremier, minister przemysłu i handlu (Czechy)',
    publishDay: 14,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k2',
    kind: 'konfrontacyjna',
    thesis: 'Kto jest organem nadzoru — to samo pytanie, cztery kraje, cztery odpowiedzi w jednym klipie',
    session: 's2',
    at: 76,
    seconds: 90,
    speakerSlot: 'Czterech ministrów, sklejka',
    publishDay: 15,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k3',
    kind: 'gorąca',
    thesis: 'Jedno zdanie z keynote o miejscu regionu w agendzie innowacyjnej Unii',
    session: 's1',
    at: 12,
    seconds: 45,
    speakerSlot: 'Komisarz UE ds. startupów, badań i innowacji',
    publishDay: 16,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k4',
    kind: 'regulacyjna',
    thesis: 'Czym grozi grudzień 2027 firmom z systemami wysokiego ryzyka',
    session: 's2',
    at: 99,
    seconds: 80,
    speakerSlot: 'Dyrektor ds. polityki publicznej',
    publishDay: 18,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k5',
    kind: 'członkowska',
    thesis: 'CEO firmy członkowskiej o tym, co konkretnie dało członkostwo — nazwa dokumentu i etap konsultacji',
    session: 's4',
    at: 192,
    seconds: 35,
    speakerSlot: 'CEO firmy członkowskiej',
    publishDay: 19,
    formats: ['9:16'],
  },
  {
    id: 'k6',
    kind: 'gorąca',
    thesis: 'Główna bariera wdrożeniowa z badania na 3 200 respondentach z 11 krajów',
    session: 's3',
    at: 128,
    seconds: 40,
    speakerSlot: 'Autor badania',
    publishDay: 21,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k7',
    kind: 'konfrontacyjna',
    thesis: 'Luka adopcyjna: 13,5 procent z Eurostatu obok 4–6 procent z materiału własnego, z nazwaniem obu źródeł',
    session: 's4',
    at: 170,
    seconds: 85,
    speakerSlot: 'Panel, sklejka dwóch wypowiedzi',
    publishDay: 23,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k8',
    kind: 'członkowska',
    thesis: 'Druga firma członkowska: co się zmieniło po przystąpieniu, w jednej liczbie',
    session: 's4',
    at: 198,
    seconds: 30,
    speakerSlot: 'CEO firmy członkowskiej',
    publishDay: 25,
    formats: ['9:16'],
  },
  {
    id: 'k9',
    kind: 'gorąca',
    thesis: 'Moment podpisu z komentarzem prezesa: co dokładnie podpisało dziewięć państw',
    session: 's5',
    at: 231,
    seconds: 35,
    speakerSlot: 'Prezes izby',
    publishDay: 28,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k10',
    kind: 'regulacyjna',
    thesis: 'Pięć filarów CEE AI Action Plan — który z nich jest najtrudniejszy do wdrożenia w Polsce',
    session: 's6',
    at: 256,
    seconds: 90,
    speakerSlot: 'Sekretarz stanu w Ministerstwie Cyfryzacji',
    publishDay: 30,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k11',
    kind: 'konfrontacyjna',
    thesis: 'To samo pytanie zadane każdemu prelegentowi, odpowiedzi cięte obok siebie — wersja do porównania z edycją 2027',
    session: 's6',
    at: 270,
    seconds: 75,
    speakerSlot: 'Sklejka całego dnia',
    publishDay: 32,
    formats: ['9:16', '16:9'],
  },
  {
    id: 'k12',
    kind: 'członkowska',
    thesis: 'Zobowiązania na kolejny rok: kto się do czego zobowiązał, wprost z panelu zamykającego',
    session: 's6',
    at: 286,
    seconds: 35,
    speakerSlot: 'Rada doradcza izby',
    publishDay: 35,
    formats: ['9:16'],
  },
];

/**
 * Fixed order and a one-line brief per kind. The kind is a filter on this
 * page, never a colour: the medium already owns the hue, and a second
 * categorical scale in the same view would make "wideo" and "gorąca" compete
 * for the same blue.
 */
export const SHORT_KINDS: { key: ShortKind; length: string; brief: string }[] = [
  {
    key: 'gorąca',
    length: '30–45 s',
    brief: 'Jedna osoba, jedna teza, publikacja tego samego dnia. Nie relacja z panelu — zdanie, które da się zacytować.',
  },
  {
    key: 'regulacyjna',
    length: '60–90 s',
    brief: 'Odpowiedź na jedno pytanie o obowiązek albo termin. Jedyny format zamieniający kapitał polityczny izby na coś sprzedawalnego.',
  },
  {
    key: 'członkowska',
    length: '30 s',
    brief: 'CEO firmy członkowskiej mówi konkretnie, co dostał. Pracuje jednocześnie na akwizycję i na retencję pierwszoroczną.',
  },
  {
    key: 'konfrontacyjna',
    length: '75–90 s',
    brief: 'To samo pytanie zadane każdemu, odpowiedzi cięte obok siebie. Powtarzany co roku staje się serią porównywalną między edycjami.',
  },
];

export const SHORTS_WINDOW = {
  from: Math.min(...SHORTS.map((s) => s.publishDay)),
  to: Math.max(...SHORTS.map((s) => s.publishDay)),
  seconds: SHORTS.reduce((a, s) => a + s.seconds, 0),
};
