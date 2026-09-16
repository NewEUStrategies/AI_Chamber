import type { GlossaryEntry } from './seo';

/**
 * Social media data, read from the seventy screenshots archived in
 * `research/screenshots/` (bibliography entry 44).
 *
 * Every number was read off a rendered post card. Both networks hide a counter
 * entirely when it is zero, so an absent comment or share count is recorded as
 * 0. Reaction counts rendered as "<name> i N innych osob" are stored as N + 1.
 * LinkedIn shows relative ages ("2 mies."), Facebook exact dates - hence the
 * different shape of the two lists.
 */

export type PostFormat = 'karuzela' | 'zdjecia' | 'obraz' | 'live' | 'newsletter';
export type PostTopic = 'ludzie' | 'polityka' | 'wydarzenie' | 'partner' | 'media' | 'kanaly';

export interface SocialPost {
  title: string;
  format: PostFormat;
  topic: PostTopic;
  lang: 'en' | 'pl';
  reactions: number;
  comments: number;
  shares: number;
  /** LinkedIn: relative age as rendered. Facebook: publication date. */
  when: string;
  /** Days before 16 September 2026, derived from `when`. */
  ageDays: number;
  note?: string;
}

export const CHANNELS = {
  linkedin: { name: 'LinkedIn', handle: 'AI Chamber CEE', followers: 3067, newsletter: 'AI Insights CEE' },
  facebook: { name: 'Facebook', handle: 'AI Chamber CEE', followers: null, reviews: 0 },
} as const;

/** LinkedIn, newest first. Ages are LinkedIn's own rounding. */
export const LINKEDIN_POSTS: SocialPost[] = [
  { title: 'AI Chamber Golf & Business is back! (vol. 2, 15 X)', format: 'obraz', topic: 'wydarzenie', lang: 'en', reactions: 6, comments: 0, shares: 5, when: '1 d', ageDays: 1 },
  { title: 'Meet our new AI Chamber members joining us this month', format: 'karuzela', topic: 'ludzie', lang: 'en', reactions: 14, comments: 3, shares: 0, when: '2 d', ageDays: 2 },
  { title: 'Our September AI Chamber Newsletter is here', format: 'newsletter', topic: 'kanaly', lang: 'en', reactions: 15, comments: 0, shares: 2, when: '5 d', ageDays: 5 },
  { title: 'Hosting the CEE AI Summit in Prague - relacja zdjeciowa', format: 'zdjecia', topic: 'wydarzenie', lang: 'en', reactions: 75, comments: 6, shares: 0, when: '1 tydz.', ageDays: 7, note: 'Najmocniejszy post w calej probie. Zdjecia z sali, ludzie, wystapienia.' },
  { title: 'From an idea born in CEE to an AI solution with global impact', format: 'karuzela', topic: 'wydarzenie', lang: 'en', reactions: 24, comments: 0, shares: 1, when: '2 tyg.', ageDays: 14 },
  { title: 'Can Europe build the sovereign capacity to compete in AI?', format: 'karuzela', topic: 'polityka', lang: 'en', reactions: 21, comments: 0, shares: 2, when: '2 tyg.', ageDays: 14 },
  { title: 'AI needs more than intelligence - Ceske Radiokomunikace partnerem', format: 'obraz', topic: 'partner', lang: 'en', reactions: 14, comments: 0, shares: 0, when: '2 tyg.', ageDays: 14 },
  { title: 'Not Just Horizon Europe: A Practical Guide to EU Funding for AI', format: 'live', topic: 'wydarzenie', lang: 'en', reactions: 23, comments: 13, shares: 5, when: '3 tyg.', ageDays: 21, note: 'Transmisja na zywo. Najwyzsza liczba komentarzy w calej probie.' },
  { title: 'AI is built by people - relacja z AI Business Eagle', format: 'zdjecia', topic: 'wydarzenie', lang: 'en', reactions: 53, comments: 4, shares: 2, when: '1 mies.', ageDays: 30, note: 'Zdjecia uczestnikow z pola golfowego.' },
  { title: 'Strong AI ecosystems are built through strong partnerships - Allegro', format: 'obraz', topic: 'partner', lang: 'en', reactions: 24, comments: 0, shares: 0, when: '1 mies.', ageDays: 32 },
  { title: 'Meet our new AI Chamber CEE members joining us this August', format: 'karuzela', topic: 'ludzie', lang: 'en', reactions: 18, comments: 0, shares: 0, when: '1 mies.', ageDays: 33 },
  { title: 'Another week, more great insights from members featured across media', format: 'karuzela', topic: 'media', lang: 'en', reactions: 13, comments: 0, shares: 0, when: '1 mies.', ageDays: 34 },
  { title: 'AI Chamber took part in the European Commission consultation', format: 'obraz', topic: 'polityka', lang: 'en', reactions: 13, comments: 0, shares: 2, when: '1 mies.', ageDays: 36 },
  { title: 'Our August AI Chamber Newsletter is here', format: 'newsletter', topic: 'kanaly', lang: 'en', reactions: 8, comments: 0, shares: 0, when: '1 mies.', ageDays: 37 },
  { title: 'Rywalizacja. Emocje. Nagrody - zapowiedz AI Business Eagle', format: 'obraz', topic: 'wydarzenie', lang: 'pl', reactions: 7, comments: 0, shares: 0, when: '1 mies.', ageDays: 40 },
  { title: 'AI zmienia sposob, w jaki pracujemy. Ale czy zmienia to, jak sie czujemy?', format: 'live', topic: 'wydarzenie', lang: 'pl', reactions: 17, comments: 9, shares: 4, when: '2 mies.', ageDays: 45, note: 'Transmisja po polsku z psychotraumatologiem. Drugi wynik po stronie komentarzy.' },
  { title: 'AI Chamber continues to grow - szesciu nowych czlonkow', format: 'karuzela', topic: 'ludzie', lang: 'en', reactions: 26, comments: 6, shares: 4, when: '2 mies.', ageDays: 50 },
  { title: 'AI Chamber appoints CEE thought leaders to strategic advisory board', format: 'karuzela', topic: 'ludzie', lang: 'en', reactions: 50, comments: 4, shares: 2, when: '2 mies.', ageDays: 56, note: 'Rada z liderami i bylymi ministrami z jedenastu krajow regionu.' },
  { title: 'AI Chamber has been appointed to the European AI Act Advisory Forum', format: 'obraz', topic: 'polityka', lang: 'en', reactions: 14, comments: 0, shares: 0, when: '2 mies.', ageDays: 58 },
  { title: 'The countdown is on - GITEX AI EUROPE', format: 'obraz', topic: 'partner', lang: 'en', reactions: 14, comments: 1, shares: 0, when: '2 mies.', ageDays: 60 },
  { title: 'Another week, another group of new AI Chamber members', format: 'karuzela', topic: 'ludzie', lang: 'en', reactions: 13, comments: 0, shares: 0, when: '2 mies.', ageDays: 62 },
  { title: 'Baner partnerski europecloud i The Recursive', format: 'obraz', topic: 'partner', lang: 'en', reactions: 12, comments: 0, shares: 0, when: '2 mies.', ageDays: 63 },
  { title: 'AI Chamber Funding & Growth Series - Beyond Venture Capital', format: 'obraz', topic: 'wydarzenie', lang: 'en', reactions: 9, comments: 1, shares: 1, when: '2 mies.', ageDays: 65 },
  { title: 'Recent articles in Rzeczpospolita - energia i infrastruktura', format: 'obraz', topic: 'media', lang: 'en', reactions: 7, comments: 0, shares: 2, when: '2 mies.', ageDays: 66 },
  { title: 'Can Europe remain in the AI race while protecting its creators?', format: 'obraz', topic: 'polityka', lang: 'en', reactions: 4, comments: 0, shares: 0, when: '2 mies.', ageDays: 68 },
  { title: 'Stay Connected with the us! - zapis do newslettera', format: 'obraz', topic: 'kanaly', lang: 'en', reactions: 4, comments: 1, shares: 0, when: '2 mies.', ageDays: 70, note: 'Blad jezykowy w pierwszym zdaniu. Grafika to zrzut okna zapisu z wlasnej strony.' },
  { title: 'AI Chamber Newsletter - June 2026', format: 'newsletter', topic: 'kanaly', lang: 'en', reactions: 11, comments: 0, shares: 0, when: '3 mies.', ageDays: 85 },
];

/** Facebook, newest first. Facebook renders exact dates. */
export const FACEBOOK_POSTS: SocialPost[] = [
  { title: 'Congratulations to Oxylabs.io on achieving unicorn status', format: 'obraz', topic: 'partner', lang: 'en', reactions: 1, comments: 0, shares: 0, when: '6 sierpnia', ageDays: 41 },
  { title: 'Experts featured across four leading Polish business media', format: 'obraz', topic: 'media', lang: 'en', reactions: 1, comments: 0, shares: 0, when: '5 sierpnia', ageDays: 42, note: 'Hashtag wyrenderowany jako "hashtag#AIChamber" - slad przeklejenia z LinkedIna.' },
  { title: 'AI Chamber took part in the European Commission consultation', format: 'obraz', topic: 'polityka', lang: 'en', reactions: 0, comments: 0, shares: 0, when: '4 sierpnia', ageDays: 43 },
  { title: 'Ekaterina Zaharieva dolacza do CEE AI Summit jako keynote', format: 'obraz', topic: 'wydarzenie', lang: 'en', reactions: 2, comments: 0, shares: 0, when: '29 lipca', ageDays: 49 },
  { title: 'Fair use in the age of AI - ugoda Bartz v. Anthropic', format: 'obraz', topic: 'polityka', lang: 'en', reactions: 0, comments: 0, shares: 0, when: '27 lipca', ageDays: 51 },
  { title: 'Where does your country stand in AI readiness? - CEE AI Index', format: 'obraz', topic: 'kanaly', lang: 'en', reactions: 0, comments: 0, shares: 0, when: '7 lipca', ageDays: 71 },
  { title: 'Najlepsze kontrakty rzadko podpisuje sie przy biurku - AI Business Eagle', format: 'obraz', topic: 'wydarzenie', lang: 'pl', reactions: 1, comments: 0, shares: 0, when: '3 lipca', ageDays: 75, note: 'Jedyny post z cennikiem: 199 PLN + VAT dla czlonkow, 399 PLN + VAT poza czlonkostwem.' },
  { title: 'AI Chamber has been appointed to the European AI Act Advisory Forum', format: 'obraz', topic: 'polityka', lang: 'en', reactions: 0, comments: 0, shares: 0, when: '21 czerwca', ageDays: 87 },
  { title: 'Unleash the Debate: Will AI consume the planet?', format: 'zdjecia', topic: 'wydarzenie', lang: 'en', reactions: 1, comments: 0, shares: 0, when: '15 czerwca', ageDays: 93 },
  { title: 'Can CEE become the next AI powerhouse?', format: 'obraz', topic: 'wydarzenie', lang: 'en', reactions: 2, comments: 0, shares: 1, when: '10 czerwca', ageDays: 98 },
  { title: 'Interview for My Company Polska - Adam Gabriel Dobrakowski', format: 'obraz', topic: 'media', lang: 'en', reactions: 1, comments: 0, shares: 0, when: '1 czerwca', ageDays: 107 },
  { title: 'dlahandlu.pl - Dr Klaudia Martinek-Jaguszewska o wdrozeniach AI', format: 'obraz', topic: 'media', lang: 'en', reactions: 1, comments: 0, shares: 0, when: '20 maja', ageDays: 119 },
];

/** Visual conventions observed across both channels. */
export const VISUALS = [
  { name: 'Granat z siatka polaczen', posts: 9, where: 'Nowi czlonkowie, newslettery, Policy Statement', traits: 'Logo AI CHAMBER, biala typografia z zielonym akcentem, stopka aichamber.eu', own: true },
  { name: 'Zielen CEE Summit', posts: 8, where: 'Partnerzy szczytu, panele, Success Stories, keynote', traits: 'Osobna identyfikacja wydarzenia - zielona siatka, panorama Pragi', own: true },
  { name: 'Karty eksperckie ko-brandowane', posts: 4, where: 'Rzeczpospolita, wirtualnemedia, My Company, dlahandlu', traits: 'Dwa logotypy, portret, cytat - najbardziej dopracowany format', own: true },
  { name: 'Fotografia z wydarzen', posts: 3, where: 'Szczyt w Pradze, golf, debata oksfordzka', traits: 'Prawdziwi ludzie, prawdziwe sale - bez stylizacji', own: true },
  { name: 'Kompozyt generowany', posts: 4, where: 'Forum doradcze, konsultacje, fair use', traits: 'Flagi, mapy, wagi - styl generowany, bez elementow identyfikacji', own: true },
  { name: 'Zrzut ekranu wlasnej strony', posts: 1, where: 'Zapis do newslettera', traits: 'Okno modalne sfotografowane z witryny', own: true },
  { name: 'Kreacja partnera', posts: 3, where: 'GITEX, europecloud, The Recursive', traits: 'Material przejety bez adaptacji - obca paleta i typografia', own: false },
] as const;

/* ------------------------------------------------------------------ */

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const mean = (xs: number[]) => (xs.length ? sum(xs) / xs.length : 0);
const median = (xs: number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

function stats(posts: SocialPost[], followers: number | null) {
  const r = posts.map((p) => p.reactions);
  return {
    posts: posts.length,
    reactions: sum(r),
    median: median(r),
    mean: mean(r),
    max: Math.max(...r),
    min: Math.min(...r),
    comments: sum(posts.map((p) => p.comments)),
    shares: sum(posts.map((p) => p.shares)),
    er: followers ? (median(r) / followers) * 100 : null,
  };
}

export const LI = stats(LINKEDIN_POSTS, CHANNELS.linkedin.followers);
export const FB = stats(FACEBOOK_POSTS, null);

const FORMAT_LABEL: Record<PostFormat, string> = {
  zdjecia: 'Zdjecia z wydarzen',
  live: 'Transmisja na zywo',
  karuzela: 'Karuzela PDF',
  obraz: 'Pojedyncza grafika',
  newsletter: 'Newsletter',
};

export const FORMATS = (['zdjecia', 'live', 'karuzela', 'obraz', 'newsletter'] as const)
  .map((f) => {
    const rows = LINKEDIN_POSTS.filter((p) => p.format === f);
    return {
      key: f,
      label: FORMAT_LABEL[f],
      posts: rows.length,
      mean: mean(rows.map((p) => p.reactions)),
      comments: sum(rows.map((p) => p.comments)),
      shares: sum(rows.map((p) => p.shares)),
    };
  })
  .sort((a, b) => b.mean - a.mean);

const TOPIC_LABEL: Record<PostTopic, string> = {
  wydarzenie: 'Wydarzenia wlasne',
  ludzie: 'Ludzie i spolecznosc',
  partner: 'Partnerzy',
  polityka: 'Polityka i regulacje',
  media: 'Obecnosc w mediach',
  kanaly: 'Wlasne kanaly',
};

export const TOPICS = (['wydarzenie', 'ludzie', 'partner', 'polityka', 'media', 'kanaly'] as const)
  .map((t) => {
    const rows = LINKEDIN_POSTS.filter((p) => p.topic === t);
    return { key: t, label: TOPIC_LABEL[t], posts: rows.length, mean: mean(rows.map((p) => p.reactions)), reactions: sum(rows.map((p) => p.reactions)) };
  })
  .sort((a, b) => b.mean - a.mean);

const humanFormats: PostFormat[] = ['zdjecia', 'live'];
const humanPosts = LINKEDIN_POSTS.filter((p) => humanFormats.includes(p.format));
const producedPosts = LINKEDIN_POSTS.filter((p) => !humanFormats.includes(p.format));

export const SOCIAL_DERIVED = {
  /** Facebook has published nothing since this many days before the read. */
  fbSilentDays: FACEBOOK_POSTS[0].ageDays,
  /** The summit fell inside that silence. */
  fbMissedSummit: true,
  liNewestDays: LINKEDIN_POSTS[0].ageDays,
  /** How many times the median LinkedIn post beats the median Facebook post. */
  channelGap: median(LINKEDIN_POSTS.map((p) => p.reactions)) / Math.max(median(FACEBOOK_POSTS.map((p) => p.reactions)), 1),
  /** Posts showing real people or a live human, against everything else. */
  humanMean: mean(humanPosts.map((p) => p.reactions)),
  producedMean: mean(producedPosts.map((p) => p.reactions)),
  humanLift: mean(humanPosts.map((p) => p.reactions)) / mean(producedPosts.map((p) => p.reactions)),
  humanPosts: humanPosts.length,
  humanShare: (sum(humanPosts.map((p) => p.reactions)) / sum(LINKEDIN_POSTS.map((p) => p.reactions))) * 100,
  /** Comments concentrated in the two live broadcasts. */
  liveComments: sum(LINKEDIN_POSTS.filter((p) => p.format === 'live').map((p) => p.comments)),
  polishPosts: LINKEDIN_POSTS.filter((p) => p.lang === 'pl').length,
  visualFamilies: VISUALS.length,
  /** Weekly cadence over the LinkedIn window. */
  liPerWeek: LINKEDIN_POSTS.length / (LINKEDIN_POSTS[LINKEDIN_POSTS.length - 1].ageDays / 7),
  fbPerWeek: FACEBOOK_POSTS.length / ((FACEBOOK_POSTS[FACEBOOK_POSTS.length - 1].ageDays - FACEBOOK_POSTS[0].ageDays) / 7),
  /** Benchmark: the founder's other organisation, from the LinkedIn sidebar. */
  startupPolandFollowers: 14272,
};

/* ------------------------------------------------------------------ */

export const SOCIAL_GLOSSARY: Record<string, GlossaryEntry> = {
  ER: {
    full: 'Engagement rate (wskaznik zaangazowania)',
    body: 'Udzial reakcji, komentarzy i udostepnien w liczbie obserwujacych. Pozwala porownywac profile roznej wielkosci - sto reakcji przy tysiacu obserwujacych znaczy co innego niz przy stu tysiacach.',
    scale: 'Dla stron firmowych na LinkedIn typowo 0,3-2%',
    reading: 'Liczony tu od mediany reakcji i od liczby obserwujacych, bo zasiegi widzi wylacznie administrator strony.',
  },
  'karuzela PDF': {
    full: 'Karuzela dokumentowa',
    body: 'Wielostronicowy dokument PDF wgrany bezposrednio do posta. Czytelnik przewija strony w miejscu, bez wychodzenia z serwisu.',
    reading: 'LinkedIn premiuje ten format, bo zatrzymuje uzytkownika dluzej niz link wyprowadzajacy na zewnatrz.',
  },
  'LinkedIn Live': {
    full: 'LinkedIn Live',
    body: 'Transmisja na zywo wewnatrz serwisu, polaczona z wydarzeniem, na ktore mozna sie zapisac. Po zakonczeniu zostaje nagranie w feedzie.',
    reading: 'Jedyny format, w ktorym widzowie pisza w trakcie - stad nieproporcjonalnie duzo komentarzy.',
  },
  zasieg: {
    full: 'Zasieg',
    body: 'Liczba osob, ktorym serwis wyswietlil post. Rozna od liczby obserwujacych - algorytm pokazuje tresc tylko czesci z nich, ale moze tez dotrzec dalej.',
    reading: 'Widoczny wylacznie w panelu administratora. W tej analizie niedostepny.',
  },
  impresje: {
    full: 'Impresje (wyswietlenia)',
    body: 'Liczba wyswietlen posta, liczaca wielokrotne obejrzenia przez te sama osobe.',
    reading: 'Zawsze wyzsze niz zasieg. Tak samo jak zasieg - tylko dla administratora.',
  },
  'newsletter LinkedIn': {
    full: 'Newsletter LinkedIn',
    body: 'Cykliczna publikacja wewnatrz serwisu, na ktora mozna sie zapisac osobno od obserwowania strony. Kazde wydanie trafia powiadomieniem do subskrybentow.',
    reading: 'Buduje wlasna liste odbiorcow, niezalezna od algorytmu strony glownej. Izba prowadzi go pod nazwa AI Insights CEE.',
  },
  CTA: {
    full: 'Call to action (wezwanie do dzialania)',
    body: 'Zdanie mowiace odbiorcy, co ma zrobic po przeczytaniu - zapisac sie, pobrac raport, zarejestrowac na wydarzenie.',
    reading: 'Post bez CTA buduje rozpoznawalnosc, ale nie generuje dzialania, ktore da sie zmierzyc.',
  },
  reakcja: {
    full: 'Reakcja',
    body: 'Klikniecie jednej z ikon pod postem - Lubie to, Gratulacje, Wsparcie, Interesujace.',
    reading: 'Najtansza forma zaangazowania. Komentarz i udostepnienie waza w algorytmie znacznie wiecej.',
  },
  udostepnienie: {
    full: 'Udostepnienie',
    body: 'Przekazanie posta dalej na wlasny profil. Wynosi tresc poza grono obserwujacych strone.',
    reading: 'Najsilniejszy sygnal - odbiorca firmuje tresc wlasnym nazwiskiem.',
  },
  'cross-posting': {
    full: 'Cross-posting',
    body: 'Publikowanie tej samej tresci na kilku platformach bez dostosowania do kazdej z nich.',
    reading: 'Rozpoznawalny po sladach: hashtagach w formacie obcym dla platformy, odwolaniach do funkcji, ktorych tam nie ma, proporcjach grafik z innego serwisu.',
  },
};
