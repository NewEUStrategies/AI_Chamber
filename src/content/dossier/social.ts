import type { GlossaryEntry } from './seo';

/**
 * Social media data, read from the LinkedIn screenshots archived in
 * `research/screenshots/` (bibliography entry 44).
 *
 * Every number here was read off a rendered post card. LinkedIn hides a
 * counter entirely when it is zero, so an absent comment or share count is
 * recorded as 0 rather than as unknown. Reaction counts rendered as
 * "<name> i N innych osób" are stored as N + 1.
 */

export type PostFormat = 'karuzela' | 'obraz' | 'newsletter';
export type PostTopic = 'ludzie' | 'polityka' | 'wydarzenie' | 'media' | 'kanaly';

export interface SocialPost {
  /** Opening line as published, trimmed to what the card showed. */
  title: string;
  format: PostFormat;
  topic: PostTopic;
  lang: 'en' | 'pl';
  reactions: number | null;
  comments: number;
  shares: number;
  /** Relative age as LinkedIn rendered it. */
  age: string;
  /** Post was edited after publication. */
  edited?: boolean;
  /** Exact timestamp, where the activity id could be decoded. */
  exact?: string;
  note?: string;
}

export const LINKEDIN = {
  handle: 'AI Chamber CEE',
  url: 'linkedin.com/company/ai-chamber-cee',
  followers: 3067,
  newsletter: 'AI Insights CEE',
} as const;

/** Read in feed order, newest first. */
export const POSTS: SocialPost[] = [
  {
    title: 'Baner partnerski europecloud i The Recursive',
    format: 'obraz',
    topic: 'wydarzenie',
    lang: 'en',
    reactions: 12,
    comments: 0,
    shares: 0,
    age: '2 mies.',
    note: 'Zrzut objął tylko dolną część karty - treść posta poza kadrem.',
  },
  {
    title:
      'Can Europe remain in the AI race while protecting its creators? We believe the answer is yes, but only with the right copyright framework.',
    format: 'obraz',
    topic: 'polityka',
    lang: 'en',
    reactions: 4,
    comments: 0,
    shares: 0,
    age: '2 mies.',
  },
  {
    title: 'Najlepsze kontrakty rzadko podpisuje sie przy biurku.',
    format: 'obraz',
    topic: 'wydarzenie',
    lang: 'pl',
    reactions: null,
    comments: 0,
    shares: 0,
    age: '2 mies.',
    note: 'Jedyny post po polsku w probie. Zapowiedz AI Business Eagle. Licznik reakcji poza kadrem.',
  },
  {
    title: 'Another week, another group of new AI Chamber members!',
    format: 'karuzela',
    topic: 'ludzie',
    lang: 'en',
    reactions: 13,
    comments: 0,
    shares: 0,
    age: '2 mies.',
  },
  {
    title:
      'Recent articles in Rzeczpospolita highlight two interconnected challenges shaping the future of AI: energy and infrastructure.',
    format: 'obraz',
    topic: 'media',
    lang: 'en',
    reactions: 7,
    comments: 0,
    shares: 2,
    age: '2 mies.',
  },
  {
    title: 'The countdown is on! In just a few days, industry leaders, startups, investors, policymakers...',
    format: 'obraz',
    topic: 'wydarzenie',
    lang: 'en',
    reactions: 14,
    comments: 1,
    shares: 0,
    age: '2 mies.',
    edited: true,
    note: 'Zapowiedz GITEX AI EUROPE, Berlin, 30 VI - 1 VII 2026. Kreacja dostarczona przez organizatora.',
  },
  {
    title: 'AI Chamber Funding & Growth Series - Beyond Venture Capital',
    format: 'obraz',
    topic: 'wydarzenie',
    lang: 'en',
    reactions: 9,
    comments: 1,
    shares: 1,
    age: '2 mies.',
    note: 'Webinar 7 lipca 2026, seria tylko dla czlonkow. Prelegentka: Magdalena Adamczuk, Grants.Capital.',
  },
  {
    title: 'AI Chamber appoints CEE thought leaders to strategic advisory board',
    format: 'karuzela',
    topic: 'ludzie',
    lang: 'en',
    reactions: 50,
    comments: 4,
    shares: 2,
    age: '2 mies.',
    edited: true,
    exact: '22 czerwca 2026, 15:53 UTC',
    note: 'Najmocniejszy post w probie. Rada z liderami i bylymi ministrami z 11 krajow regionu.',
  },
  {
    title: 'Stay Connected with the us!',
    format: 'obraz',
    topic: 'kanaly',
    lang: 'en',
    reactions: 4,
    comments: 1,
    shares: 0,
    age: '2 mies.',
    note: 'Blad jezykowy w pierwszym zdaniu. Grafika to zrzut okna zapisu z wlasnej strony.',
  },
  {
    title: 'AI Chamber has been appointed to the European AI Act Advisory Forum by the European Commission.',
    format: 'obraz',
    topic: 'polityka',
    lang: 'en',
    reactions: 14,
    comments: 0,
    shares: 0,
    age: '2 mies.',
  },
  {
    title: 'AI Chamber continues to grow! We are excited to welcome six new members joining our community',
    format: 'karuzela',
    topic: 'ludzie',
    lang: 'en',
    reactions: 26,
    comments: 6,
    shares: 4,
    age: '2 mies.',
    edited: true,
  },
  {
    title: 'AI Chamber Newsletter - June 2026 is here!',
    format: 'newsletter',
    topic: 'kanaly',
    lang: 'en',
    reactions: 11,
    comments: 0,
    shares: 0,
    age: '3 mies.',
    note: 'Newsletter prowadzony na LinkedIn pod nazwa AI Insights CEE.',
  },
];

/** Visual conventions observed across the sample. */
export const VISUALS = [
  {
    name: 'Granat z siatka polaczen',
    posts: 4,
    where: 'Nowi czlonkowie, newsletter, Policy Statement',
    traits: 'Logo AI CHAMBER, typografia biala z zielonym akcentem, stopka aichamber.eu',
    own: true,
  },
  {
    name: 'Zielony gradient falisty',
    posts: 1,
    where: 'Rada doradcza',
    traits: 'Inna paleta niz reszta - zielen dominujaca zamiast granatu',
    own: true,
  },
  {
    name: 'Karty eksperckie ko-brandowane',
    posts: 1,
    where: 'Komentarz do Rzeczpospolitej',
    traits: 'Dwa logotypy, portret, cytat eksperta - najbardziej dopracowany format',
    own: true,
  },
  {
    name: 'Zrzut ekranu wlasnej strony',
    posts: 1,
    where: 'Zapis do newslettera',
    traits: 'Okno modalne sfotografowane z witryny, plaskie zielone tlo',
    own: true,
  },
  {
    name: 'Kompozyt fotograficzny AI',
    posts: 1,
    where: 'Forum doradcze AI Act',
    traits: 'Flagi UE i mapa Europy, styl generowany - bez elementow identyfikacji izby',
    own: true,
  },
  {
    name: 'Kreacja partnera',
    posts: 2,
    where: 'GITEX, europecloud i The Recursive',
    traits: 'Material przejety bez adaptacji - obca paleta i typografia',
    own: false,
  },
] as const;

/* ------------------------------------------------------------------ */

const measured = POSTS.filter((p) => p.reactions !== null);
const values = measured.map((p) => p.reactions as number).sort((a, b) => a - b);

const median = (xs: number[]): number => {
  const mid = Math.floor(xs.length / 2);
  return xs.length % 2 ? xs[mid] : (xs[mid - 1] + xs[mid]) / 2;
};

const byFormat = (f: PostFormat) => measured.filter((p) => p.format === f);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const mean = (xs: number[]) => (xs.length ? sum(xs) / xs.length : 0);

const carousel = byFormat('karuzela').map((p) => p.reactions as number);
const image = byFormat('obraz').map((p) => p.reactions as number);

export const FORMATS = [
  {
    key: 'karuzela' as const,
    label: 'Karuzela PDF',
    posts: carousel.length,
    reactions: sum(carousel),
    mean: mean(carousel),
    comments: sum(byFormat('karuzela').map((p) => p.comments)),
    shares: sum(byFormat('karuzela').map((p) => p.shares)),
  },
  {
    key: 'obraz' as const,
    label: 'Pojedyncza grafika',
    posts: image.length,
    reactions: sum(image),
    mean: mean(image),
    comments: sum(byFormat('obraz').map((p) => p.comments)),
    shares: sum(byFormat('obraz').map((p) => p.shares)),
  },
  {
    key: 'newsletter' as const,
    label: 'Newsletter LinkedIn',
    posts: byFormat('newsletter').length,
    reactions: sum(byFormat('newsletter').map((p) => p.reactions as number)),
    mean: mean(byFormat('newsletter').map((p) => p.reactions as number)),
    comments: 0,
    shares: 0,
  },
];

export const TOPICS = (['ludzie', 'wydarzenie', 'polityka', 'kanaly', 'media'] as const).map((t) => {
  const rows = measured.filter((p) => p.topic === t);
  const r = rows.map((p) => p.reactions as number);
  return {
    key: t,
    label: {
      ludzie: 'Ludzie i spolecznosc',
      wydarzenie: 'Wydarzenia i partnerstwa',
      polityka: 'Polityka i regulacje',
      kanaly: 'Wlasne kanaly',
      media: 'Obecnosc w mediach',
    }[t],
    posts: rows.length,
    reactions: sum(r),
    mean: mean(r),
  };
});

export const SOCIAL_DERIVED = {
  observed: POSTS.length,
  measured: measured.length,
  totalReactions: sum(values),
  median: median(values),
  mean: mean(values),
  min: values[0],
  max: values[values.length - 1],
  totalComments: sum(POSTS.map((p) => p.comments)),
  totalShares: sum(POSTS.map((p) => p.shares)),
  edited: POSTS.filter((p) => p.edited).length,
  polish: POSTS.filter((p) => p.lang === 'pl').length,
  /** Median reactions as a share of the follower base, in percent. */
  erMedian: (median(values) / LINKEDIN.followers) * 100,
  erMean: (mean(values) / LINKEDIN.followers) * 100,
  /** How much better a document carousel performs than a single graphic. */
  carouselLift: mean(carousel) / mean(image),
  peopleShare: (sum(measured.filter((p) => p.topic === 'ludzie').map((p) => p.reactions as number)) / sum(values)) * 100,
  ownVisuals: VISUALS.filter((v) => v.own).length,
  visualFamilies: VISUALS.length,
};

/* ------------------------------------------------------------------ */

export const SOCIAL_GLOSSARY: Record<string, GlossaryEntry> = {
  ER: {
    full: 'Engagement rate (wskaznik zaangazowania)',
    body: 'Udzial reakcji, komentarzy i udostepnien w liczbie obserwujacych. Pozwala porownywac profile roznej wielkosci - sto reakcji przy tysiacu obserwujacych znaczy co innego niz przy stu tysiacach.',
    scale: 'Dla stron firmowych na LinkedIn typowo 0,3-2%',
    reading: 'Liczony tu od reakcji i od liczby obserwujacych, bo zasiegi sa widoczne tylko dla administratora strony.',
  },
  'karuzela PDF': {
    full: 'Karuzela dokumentowa',
    body: 'Wielostronicowy dokument PDF wgrany bezposrednio do posta. Czytelnik przewija strony w miejscu, bez wychodzenia z serwisu.',
    reading: 'LinkedIn premiuje ten format, bo zatrzymuje uzytkownika w serwisie dluzej niz link wyprowadzajacy na zewnatrz.',
  },
  zasieg: {
    full: 'Zasieg',
    body: 'Liczba osob, ktorym serwis wyswietlil post. Rozna od liczby obserwujacych - algorytm pokazuje tresc tylko czesci z nich, ale moze tez dotrzec dalej.',
    reading: 'Widoczny wylacznie w panelu administratora strony. W tej analizie niedostepny.',
  },
  impresje: {
    full: 'Impresje (wyswietlenia)',
    body: 'Liczba wyswietlen posta, liczaca wielokrotne obejrzenia przez te sama osobe.',
    reading: 'Zawsze wyzsze niz zasieg. Tak samo jak zasieg - tylko dla administratora.',
  },
  'newsletter LinkedIn': {
    full: 'Newsletter LinkedIn',
    body: 'Cykliczna publikacja wewnatrz serwisu, na ktora mozna sie zapisac osobno od obserwowania strony. Kazde wydanie trafia powiadomieniem do subskrybentow.',
    reading: 'Buduje wlasna liste odbiorcow, niezalezna od algorytmu strony glownej.',
  },
  CTA: {
    full: 'Call to action (wezwanie do dzialania)',
    body: 'Zdanie mowiace odbiorcy, co ma zrobic po przeczytaniu - zapisac sie, pobrac raport, zarejestrowac na wydarzenie.',
    reading: 'Post bez CTA buduje rozpoznawalnosc, ale nie generuje dzialania, ktore da sie zmierzyc.',
  },
  reakcja: {
    full: 'Reakcja',
    body: 'Klikniecie jednej z ikon pod postem - Lubie to, Gratulacje, Wsparcie, Interesujace, Ciekawe, Wspolczuje.',
    reading: 'Najtansza forma zaangazowania. Komentarz i udostepnienie waza w algorytmie znacznie wiecej.',
  },
  udostepnienie: {
    full: 'Udostepnienie',
    body: 'Przekazanie posta dalej na wlasny profil. Wynosi tresc poza grono obserwujacych strone.',
    reading: 'Najsilniejszy sygnal - odbiorca firuje trescia wlasnym nazwiskiem.',
  },
};
