/**
 * Semrush and Answer the Public data for aichamber.eu, read 16 September 2026.
 *
 * Sources — bibliography entries 40–43:
 *  40  Semrush, „Linki zwrotne: Przegląd", eksport PDF
 *  41  Semrush, „Lista linków zwrotnych", eksport PDF
 *  42  Semrush, „Pozycje organiczne", baza PL, zrzut panelu
 *  43  Answer the Public, prompty AI (ChatGPT i Gemini), eksport XLSX
 *
 * Raw exports live in `research/exports/`.
 */

/* ================================================================== *
 * Glosariusz — każdy skrót użyty na stronie ma tu rozwinięcie          *
 * ================================================================== */

export interface GlossaryEntry {
  /** Pełna nazwa skrótu. */
  full: string;
  /** Wyjaśnienie w jednym-dwóch zdaniach. */
  body: string;
  /** Skala lub zakres wartości, jeśli metryka ma sens tylko w skali. */
  scale?: string;
  /** Jak to czytać w tym konkretnym przypadku. */
  reading?: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  AS: {
    full: 'Authority Score',
    body: 'Autorska ocena wiarygodności domeny w Semrush. Łączy jakość i liczbę linków przychodzących, ruch organiczny oraz sygnały świadczące o sztucznym pozyskiwaniu linków.',
    scale: '0–100, im wyżej tym lepiej',
    reading: 'Nie da się go porównywać z Domain Rating z Ahrefs — to inne metryki liczone inną metodą.',
  },
  DR: {
    full: 'Domain Rating',
    body: 'Odpowiednik Authority Score liczony przez Ahrefs, oparty głównie na profilu linków.',
    scale: '0–100',
    reading: 'W tym dossier nie występuje — konto Ahrefs nie ma dostępu do API.',
  },
  'domena odsyłająca': {
    full: 'Domena odsyłająca',
    body: 'Unikalna domena, z której prowadzi co najmniej jeden link do analizowanego serwisu. Sto linków z jednej domeny liczy się jako jedna domena odsyłająca.',
    reading: 'Liczba domen mówi więcej o sile profilu niż liczba samych linków.',
  },
  'link zwrotny': {
    full: 'Link zwrotny (backlink)',
    body: 'Odnośnik prowadzący z cudzej strony do analizowanego serwisu. Podstawowy sygnał, którym wyszukiwarki mierzą popularność i wiarygodność strony.',
  },
  follow: {
    full: 'Link follow (dofollow)',
    body: 'Link bez atrybutu ograniczającego, który przekazuje część autorytetu strony linkującej. To linki, które realnie wpływają na pozycje.',
  },
  nofollow: {
    full: 'Link nofollow',
    body: 'Link z atrybutem rel="nofollow", którym właściciel strony sygnalizuje wyszukiwarce, że nie ręczy za cel linku. Nie przekazuje autorytetu lub przekazuje go w minimalnym stopniu.',
    reading: 'Wysoki udział nofollow oznacza, że profil linków wygląda liczebnie lepiej, niż działa.',
  },
  UGC: {
    full: 'User Generated Content',
    body: 'Atrybut rel="ugc" oznaczający link umieszczony przez użytkownika — w komentarzu, na forum, w profilu. Traktowany przez wyszukiwarki podobnie do nofollow.',
  },
  'link sponsorowany': {
    full: 'Link sponsorowany',
    body: 'Atrybut rel="sponsored" oznaczający link opłacony. Deklaracja płatności chroni przed karą za kupowanie linków.',
    reading: 'Zero linków z tym atrybutem nie dowodzi, że żaden link nie był opłacony — dowodzi, że żaden nie został jako opłacony oznaczony.',
  },
  TLD: {
    full: 'Top-Level Domain',
    body: 'Końcówka adresu internetowego — .com, .eu, .pl. Rozkład końcówek w profilu linków pokazuje, skąd pochodzą strony linkujące.',
    reading: 'Tanie końcówki jak .xyz czy .site są typowe dla stron zakładanych masowo i na krótko.',
  },
  PBN: {
    full: 'Private Blog Network',
    body: 'Sieć serwisów zakładanych wyłącznie po to, żeby sprzedawać z nich linki. Strony udają niezależne witryny, ale należą do jednego operatora.',
    reading: 'Google traktuje linki z PBN jako manipulację i może za nie ukarać stronę docelową.',
  },
  anchor: {
    full: 'Anchor (tekst kotwicy)',
    body: 'Widoczny tekst, w który wpisany jest odnośnik. Wyszukiwarki traktują go jako opis strony docelowej.',
    reading: 'Anchory opisujące usługi SEO zamiast organizacji to sygnał, że link nie powstał z powodów redakcyjnych.',
  },
  'anchor reklamowy': {
    full: 'Anchor reklamowy farmy linków',
    body: 'Tekst linku, który zamiast opisywać stronę docelową reklamuje kanał sprzedawcy linków na Telegramie, np. „telegram @seo_anomaly – seo backlinks". @seo_anomaly, @bhs_links czy @seo_cartel to nicki kont sprzedających „backlinks", „black-links" (linki z czarnego rynku SEO), „traffic boost" i „link indexing" (wpisanie adresu do katalogów, żeby wyszukiwarka go odnotowała).',
    reading: 'Domena docelowa jest w takim linku przypadkowa — farma linkuje do losowych adresów, żeby jej strony wyglądały na aktywne. Świadectwo szumu, nie ataku na konkretną organizację.',
  },
  SERP: {
    full: 'Search Engine Results Page',
    body: 'Strona wyników wyszukiwania. Obok klasycznych dziesięciu linków zawiera dziś także odpowiedzi generowane przez AI, mapy, grafikę i inne bloki.',
  },
  'Page AS': {
    full: 'Page Authority Score',
    body: 'Authority Score liczony dla pojedynczej podstrony, a nie dla całej domeny. Pokazuje siłę konkretnego adresu, z którego prowadzi link.',
    scale: '0–100',
  },
  'ruch organiczny': {
    full: 'Ruch organiczny',
    body: 'Szacowana liczba wejść z bezpłatnych wyników wyszukiwania, bez reklam. Semrush wylicza ją z pozycji na frazy i typowej klikalności tych pozycji.',
    reading: 'To model, nie pomiar — przy kilku frazach na dalekich pozycjach błąd jest największy.',
  },
  CPC: {
    full: 'Cost Per Click',
    body: 'Średnia stawka, jaką reklamodawcy płacą za kliknięcie w reklamę na daną frazę.',
    reading: 'Wysokie CPC oznacza, że fraza ma wartość handlową; zerowe — że nikt nie chce za nią płacić.',
  },
  'TSK': {
    full: 'Trudność słowa kluczowego (Keyword Difficulty)',
    body: 'Szacunek, jak trudno wejść do pierwszej dziesiątki wyników na daną frazę.',
    scale: '0–100%, im wyżej tym trudniej',
  },
  wolumen: {
    full: 'Wolumen wyszukiwań',
    body: 'Średnia liczba wyszukiwań danej frazy miesięcznie w wybranym kraju.',
  },
  disavow: {
    full: 'Plik disavow',
    body: 'Lista domen zgłaszana do Google Search Console z prośbą o zignorowanie prowadzących z nich linków. Standardowe narzędzie obrony przed śmieciowym profilem linkowym.',
  },
  'negatywne SEO': {
    full: 'Negatywne SEO',
    body: 'Celowe kierowanie na cudzą domenę śmieciowych linków, żeby obniżyć jej pozycje.',
    reading: 'W praktyce częściej niż z atakiem mamy do czynienia z niecelowym szumem farm linkowych.',
  },
  'intencja': {
    full: 'Intencja wyszukiwania',
    body: 'Cel, z jakim użytkownik wpisuje frazę: informacyjny (chce się dowiedzieć), komercyjny (porównuje przed zakupem), transakcyjny (chce kupić) lub nawigacyjny (szuka konkretnej strony).',
  },
};

/* ================================================================== *
 * 1. Kondycja domeny                                                  *
 * ================================================================== */

export const DOMAIN_HEALTH = {
  authorityScore: 14,
  referringDomains: 416,
  backlinks: 1330,
  referringUrls: 514,
  /** Authority Score miesiąc po miesiącu, wrzesień 2025 – wrzesień 2026. */
  asTrend: [14, 14, 13, 13, 13, 12, 12, 13, 13, 13, 20, 20, 14],
  asTrendLabels: ['IX 25', 'X', 'XI', 'XII', 'I 26', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX 26'],
};

/** Atrybuty linków — ile z nich realnie przekazuje autorytet. */
export const LINK_ATTRIBUTES = [
  { key: 'follow', label: 'Follow', pct: 30.7, count: 410 },
  { key: 'nofollow', label: 'Nofollow', pct: 69.1, count: 922 },
  { key: 'sponsored', label: 'Sponsorowane', pct: 0, count: 0 },
  { key: 'ugc', label: 'UGC', pct: 0.1, count: 2 },
];

export const LINK_TYPES = [
  { label: 'Tekst', pct: 94.4, count: 1260 },
  { label: 'Obraz', pct: 5.6, count: 75 },
  { label: 'Formularz', pct: 0, count: 0 },
  { label: 'Ramka', pct: 0, count: 0 },
];

/** Rozkład domen odsyłających według Authority Score. */
export const AS_DISTRIBUTION = [
  { range: '91–100', pct: 0.24, domains: 0 },
  { range: '81–90', pct: 0.24, domains: 1 },
  { range: '71–80', pct: 0.72, domains: 3 },
  { range: '61–70', pct: 0.48, domains: 2 },
  { range: '51–60', pct: 0.72, domains: 3 },
  { range: '41–50', pct: 3, domains: 13 },
  { range: '31–40', pct: 4, domains: 18 },
  { range: '21–30', pct: 7, domains: 30 },
  { range: '11–20', pct: 6, domains: 23 },
  { range: '0–10', pct: 78, domains: 323 },
];

export const TLD_SPLIT = [
  { tld: '.com', pct: 23.6, domains: 98, cheap: false },
  { tld: '.xyz', pct: 14.7, domains: 61, cheap: true },
  { tld: '.site', pct: 7.5, domains: 31, cheap: true },
  { tld: '.ai', pct: 6.7, domains: 28, cheap: false },
  { tld: '.fr', pct: 0.2, domains: 1, cheap: false },
  { tld: 'pozostałe', pct: 47.4, domains: 197, cheap: false },
];

export const LINK_COUNTRIES = [
  { country: 'Polska', pct: 22, domains: 25 },
  { country: 'Stany Zjednoczone', pct: 18, domains: 21 },
  { country: 'Mołdawia', pct: 14, domains: 16 },
  { country: 'Francja', pct: 9, domains: 10 },
  { country: 'Niemcy', pct: 8, domains: 9 },
];

/* ================================================================== *
 * 2. Anchory                                                          *
 * ================================================================== */

export interface Anchor {
  text: string;
  backlinks: number;
  domains: number;
  firstSeen: string;
  lastSeen: string;
  kind: 'spam' | 'brand' | 'editorial' | 'empty';
}

export const ANCHORS: Anchor[] = [
  {
    text: 'telegram @seo_anomaly – seo backlinks, black-links, traffic boost, link indexing',
    backlinks: 200,
    domains: 100,
    firstSeen: '25 X 2025',
    lastSeen: '16 IX 2026',
    kind: 'spam',
  },
  {
    text: 'tg @bhs_links – best seo links (t.me)',
    backlinks: 200,
    domains: 10,
    firstSeen: '25 II 2026',
    lastSeen: '11 VII 2026',
    kind: 'spam',
  },
  {
    text: 'tg @bhs_links – best seo links (telegram.me)',
    backlinks: 200,
    domains: 10,
    firstSeen: '14 VII 2026',
    lastSeen: '16 IX 2026',
    kind: 'spam',
  },
  {
    text: '@seo_cartel in telegram – seo backlinks, bulk link posting',
    backlinks: 140,
    domains: 50,
    firstSeen: '19 V 2026',
    lastSeen: '16 IX 2026',
    kind: 'spam',
  },
  {
    text: 'high quality dofollow backlinks … premium pbn network service aichamber.eu rank first page google fast … buy backlinks online cheap',
    backlinks: 96,
    domains: 69,
    firstSeen: '29 VI 2026',
    lastSeen: '16 IX 2026',
    kind: 'spam',
  },
  { text: 'ai chamber', backlinks: 75, domains: 40, firstSeen: '12 V 2024', lastSeen: '16 IX 2026', kind: 'brand' },
  { text: 'aichamber.eu', backlinks: 73, domains: 36, firstSeen: '1 X 2025', lastSeen: '16 IX 2026', kind: 'brand' },
  { text: 'brak anchora', backlinks: 54, domains: 16, firstSeen: '10 XII 2024', lastSeen: '16 IX 2026', kind: 'empty' },
  {
    text: 'labelling will cover nearly all commercial ai content – chamber',
    backlinks: 14,
    domains: 1,
    firstSeen: '30 VII 2026',
    lastSeen: '16 IX 2026',
    kind: 'editorial',
  },
  { text: 'ai chamber 2024', backlinks: 11, domains: 8, firstSeen: '19 II 2026', lastSeen: '14 IX 2026', kind: 'brand' },
  {
    text: 'how do smes in cee find their way in the world of ai?',
    backlinks: 6,
    domains: 5,
    firstSeen: '6 IX 2025',
    lastSeen: '15 IX 2026',
    kind: 'editorial',
  },
  { text: 'www.aichamber.eu', backlinks: 6, domains: 5, firstSeen: '8 XII 2024', lastSeen: '14 IX 2026', kind: 'brand' },
];

/* ================================================================== *
 * 3. Najmocniejsze linki                                              *
 * ================================================================== */

export interface TopBacklink {
  pageAs: number;
  source: string;
  domain: string;
  anchor: string;
  follow: boolean;
  note?: string;
}

export const TOP_BACKLINKS: TopBacklink[] = [
  { pageAs: 79, source: 'GITEX AI EUROPE, Berlin, 30.06–1.07.2026', domain: 'gitexeurope.com', anchor: 'AI Chamber', follow: true },
  { pageAs: 73, source: 'Search On Media Group', domain: 'searchon.it', anchor: '— (obraz)', follow: false },
  { pageAs: 57, source: 'FutureLaw 2026, największe wydarzenie legal-tech w Nordyckim regionie', domain: 'futurelaw.ee', anchor: '— (tekst)', follow: true },
  { pageAs: 50, source: 'CEE AI Summit 2026', domain: 'ceeaisummit.eu', anchor: 'Learn more', follow: true, note: 'własne wydarzenie izby' },
  { pageAs: 50, source: 'Zastąpienie tradycyjnych menedżerów: kto naprawdę rządzi', domain: 'menedzer.ai', anchor: 'AI Chamber', follow: false },
  { pageAs: 49, source: 'Candidati alla Startup Competition del WMF2027', domain: 'wemakefuture.it', anchor: '— (obraz)', follow: false },
  { pageAs: 46, source: 'AI chat, który naprawdę działa dla ciebie', domain: 'czat.ai', anchor: 'AI Chamber', follow: false },
  { pageAs: 35, source: 'Llega un AI Omnibus imperfecto (Euronews, wersja hiszpańska)', domain: 'es.euronews.com', anchor: 'Central European AI Chamber', follow: true },
  { pageAs: 35, source: 'Ogólnopolski Kongres Jakościowy 2026', domain: 'jakoscbezretuszu.pl', anchor: 'AI Chamber Patronat medialny', follow: true },
  { pageAs: 33, source: 'Sztuczna inteligencja w biznesie 2026: zysk, porażka i prawo', domain: 'pracownicy.ai', anchor: 'AI Chamber 2024: Rola AI w MŚP', follow: false },
  { pageAs: 30, source: 'Europe has both a competitiveness and a fantasy-thinking problem', domain: 'eutechloop.com', anchor: 'AI Chamber', follow: true },
  { pageAs: 22, source: 'Business Day AI Action Summit', domain: 'ai-business-day.org', anchor: '— (obraz)', follow: true },
  { pageAs: 12, source: 'Latest GPAI Code of Practice draft kicks off lobbying fight', domain: 'euractiv.com', anchor: 'said', follow: true, note: 'cytowanie listu czternastu organizacji' },
  { pageAs: 12, source: 'EU’s AI Omnibus signals shift from regulation to deployment', domain: '150sec.com', anchor: 'For example, AI Chamber', follow: true },
];

/* ================================================================== *
 * 4. Pozycje organiczne w Polsce                                      *
 * ================================================================== */

export interface OrganicPosition {
  keyword: string;
  position: number;
  volume: number;
  traffic: number;
  trafficPct: number;
  difficulty: number;
  url: string;
  topic: 'ai' | 'golf' | 'osoba';
}

export const PL_POSITIONS: OrganicPosition[] = [
  { keyword: 'marcin olender', position: 5, volume: 110, traffic: 4, trafficPct: 66.66, difficulty: 17, url: '/marcin-olender-joins-ai-chamber-as-director-of-public-policy/', topic: 'osoba' },
  { keyword: 'golf park józefów telimeny józefów', position: 8, volume: 260, traffic: 1, trafficPct: 16.66, difficulty: 12, url: '/locations/golf-park-jozefow/', topic: 'golf' },
  { keyword: 'golf park józefów', position: 14, volume: 2400, traffic: 1, trafficPct: 16.66, difficulty: 29, url: '/locations/golf-park-jozefow/', topic: 'golf' },
  { keyword: 'warsaw ai', position: 56, volume: 30, traffic: 0, trafficPct: 0, difficulty: 29, url: '/locations/warsaw/', topic: 'ai' },
  { keyword: 'ai events', position: 18, volume: 30, traffic: 0, trafficPct: 0, difficulty: 51, url: '/events/', topic: 'ai' },
  { keyword: 'mini golf józefów', position: 20, volume: 90, traffic: 0, trafficPct: 0, difficulty: 12, url: '/locations/golf-park-jozefow/', topic: 'golf' },
  { keyword: 'jozefow golf', position: 6, volume: 70, traffic: 0, trafficPct: 0, difficulty: 14, url: '/locations/golf-park-jozefow/', topic: 'golf' },
];

/* ================================================================== *
 * 5. Widoczność w wyszukiwarkach AI                                   *
 * ================================================================== */

export const AI_VISIBILITY = [
  { engine: 'ChatGPT', mentions: 0, citedPages: 4 },
  { engine: 'Przegląd od AI (Google)', mentions: 0, citedPages: 2 },
  { engine: 'Tryb AI (Google)', mentions: 0, citedPages: 0 },
  { engine: 'Gemini', mentions: 0, citedPages: 0 },
];

export interface AiPrompt {
  prompt: string;
  main: 'Informacyjna' | 'Komercyjna' | 'Transakcyjna' | 'Nawigacyjna';
  secondary?: string;
}

export const CHATGPT_PROMPTS: AiPrompt[] = [
  { prompt: 'Jakie platformy oferują narzędzia do automatyzacji procesów biznesowych online?', main: 'Informacyjna' },
  { prompt: 'Gdzie mogę znaleźć opinie o usługach platform do zarządzania AI dla firm?', main: 'Informacyjna' },
  { prompt: 'Jakie są najlepsze rozwiązania AI dla małych i średnich przedsiębiorstw w Polsce?', main: 'Informacyjna' },
  { prompt: 'Czy istnieją darmowe wersje próbne narzędzi do automatyzacji procesów biznesowych online?', main: 'Informacyjna', secondary: 'Komercyjna' },
  { prompt: 'Jak porównać popularne serwisy oferujące sztuczną inteligencję do analizy danych?', main: 'Informacyjna' },
  { prompt: 'Jakie firmy oferują kompleksowe rozwiązania AI do optymalizacji pracy zespołu?', main: 'Informacyjna' },
  { prompt: 'Jakie funkcje oferują platformy AI dla automatyzacji marketingu internetowego?', main: 'Informacyjna' },
  { prompt: 'Jakie są koszty korzystania z usług AI wspierających zarządzanie przedsiębiorstwem?', main: 'Informacyjna', secondary: 'Komercyjna' },
  { prompt: 'Jakie narzędzia AI pomagają w analizie i raportowaniu działalności firmy?', main: 'Informacyjna' },
  { prompt: 'Jakie firmy oferują wsparcie techniczne dla platform automatyzujących procesy biznesowe?', main: 'Informacyjna' },
  { prompt: 'Jak rozpocząć korzystanie z platformy oferującej wsparcie AI dla biznesu?', main: 'Nawigacyjna', secondary: 'Transakcyjna' },
  { prompt: 'Jak zarejestrować konto na platformie online do automatyzacji procesów biznesowych?', main: 'Nawigacyjna', secondary: 'Transakcyjna' },
  { prompt: 'Gdzie kupić subskrypcję na platformę AI wspierającą zarządzanie projektami?', main: 'Transakcyjna' },
];

export const GEMINI_PROMPTS: AiPrompt[] = [
  { prompt: 'Jakie są korzyści z wdrożenia sztucznej inteligencji w małych i średnich przedsiębiorstwach w Polsce?', main: 'Informacyjna' },
  { prompt: 'Gdzie znaleźć wsparcie dla firm planujących inwestycje w technologie AI w Europie?', main: 'Komercyjna', secondary: 'Informacyjna' },
  { prompt: 'Programy finansowania innowacji cyfrowych z wykorzystaniem AI dostępne w Polsce.', main: 'Komercyjna', secondary: 'Informacyjna' },
  { prompt: 'Firmy konsultingowe oferujące doradztwo w transformacji AI dla biznesu.', main: 'Komercyjna' },
  { prompt: 'Szkolenia z zakresu sztucznej inteligencji dla kadry menedżerskiej w Polsce.', main: 'Komercyjna' },
  { prompt: 'Dostawcy rozwiązań AI do automatyzacji procesów biznesowych.', main: 'Komercyjna' },
  { prompt: 'Gdzie szukać partnerów do projektów badawczo-rozwojowych w AI w Europie?', main: 'Komercyjna', secondary: 'Informacyjna' },
  { prompt: 'Centra kompetencji w obszarze AI wspierające innowacje w Polsce.', main: 'Komercyjna', secondary: 'Informacyjna' },
  { prompt: 'Narzędzia AI do analizy danych i prognozowania dla firm.', main: 'Komercyjna', secondary: 'Informacyjna' },
  { prompt: 'Przykłady udanych wdrożeń AI w polskim przemyśle.', main: 'Informacyjna' },
  { prompt: 'Jakie są kluczowe wyzwania we wdrażaniu AI w sektorze publicznym?', main: 'Informacyjna' },
  { prompt: 'Jak aplikować o dotacje na rozwój sztucznej inteligencji w przedsiębiorstwie?', main: 'Informacyjna', secondary: 'Transakcyjna' },
];

/* ================================================================== *
 * Wielkości pochodne                                                  *
 * ================================================================== */

const spam = ANCHORS.filter((a) => a.kind === 'spam');
const brand = ANCHORS.filter((a) => a.kind === 'brand');

export const SEO_DERIVED = {
  spamBacklinks: spam.reduce((n, a) => n + a.backlinks, 0),
  spamDomainSlots: spam.reduce((n, a) => n + a.domains, 0),
  brandBacklinks: brand.reduce((n, a) => n + a.backlinks, 0),
  brandDomains: brand.reduce((n, a) => n + a.domains, 0),
  /** Udział anchorów reklamujących sprzedawców linków w całym profilu. */
  get spamShare() {
    return Number(((this.spamBacklinks / DOMAIN_HEALTH.backlinks) * 100).toFixed(1));
  },
  /** Domeny odsyłające o Authority Score powyżej 50. */
  strongDomains: AS_DISTRIBUTION.filter((b) => ['51–60', '61–70', '71–80', '81–90', '91–100'].includes(b.range)).reduce(
    (n, b) => n + b.domains,
    0
  ),
  /** Domeny na tanich końcówkach typowych dla farm linkowych. */
  cheapTldDomains: TLD_SPLIT.filter((t) => t.cheap).reduce((n, t) => n + t.domains, 0),
  /** Ruch organiczny z fraz o tematyce golfowej. */
  golfVolume: PL_POSITIONS.filter((p) => p.topic === 'golf').reduce((n, p) => n + p.volume, 0),
  aiVolume: PL_POSITIONS.filter((p) => p.topic === 'ai').reduce((n, p) => n + p.volume, 0),
  totalPlTraffic: PL_POSITIONS.reduce((n, p) => n + p.traffic, 0),
  commercialPrompts:
    GEMINI_PROMPTS.filter((p) => p.main === 'Komercyjna').length +
    CHATGPT_PROMPTS.filter((p) => p.main === 'Komercyjna').length,
  totalPrompts: GEMINI_PROMPTS.length + CHATGPT_PROMPTS.length,
};
