import type { MatrixRow, SpecialistRole, Source } from './types';

/**
 * Macierz rozgraniczeń.
 *
 * W każdym wierszu poza ostatnim jest dokładnie jeden właściciel wyniku.
 * Jeśli po dopasowaniu do własnej struktury pojawi się drugi, zakres jest źle
 * podzielony; jeśli zabraknie właściciela, zadanie wypadnie z organizacji.
 * Widok sprawdza ten warunek na żywo i pokazuje wynik, zamiast zakładać, że
 * tabela jest poprawna.
 */
export const MATRIX: MatrixRow[] = [
  { task: 'Strategia marketingu i pozycjonowanie marki', cells: { dyr: 'O', mgr: 'K', senior: 'K', digital: '-', koord: '-' } },
  { task: 'Roczny plan marketingowy', cells: { dyr: 'O', mgr: 'W', senior: 'K', digital: 'K', koord: 'K' } },
  { task: 'Plan kwartalny i priorytety zespołu', cells: { dyr: 'K', mgr: 'O', senior: 'K', digital: 'K', koord: 'K' } },
  { task: 'Budżet działu: budowa i obrona przed zarządem', cells: { dyr: 'O', mgr: 'K', senior: '-', digital: '-', koord: '-' } },
  { task: 'Budżet kampanijny: alokacja i rozliczenie', cells: { dyr: 'K', mgr: 'O', senior: 'W', digital: 'W', koord: 'K' } },
  { task: 'Decyzje kadrowe i struktura działu', cells: { dyr: 'O', mgr: 'K', senior: '-', digital: '-', koord: '-' } },
  { task: 'Bieżące zarządzanie pracą zespołu', cells: { dyr: 'K', mgr: 'O', senior: 'K', digital: '-', koord: '-' } },
  { task: 'Strategia pozyskania i utrzymania członków', cells: { dyr: 'O', mgr: 'W', senior: 'W', digital: 'K', koord: 'K' } },
  { task: 'Oferta pakietów i materiały sponsoringowe', cells: { dyr: 'O', mgr: 'W', senior: 'W', digital: '-', koord: 'K' } },
  { task: 'Relacje z mediami i pozycja ekspercka', cells: { dyr: 'O', mgr: 'K', senior: 'W', digital: '-', koord: 'K' } },
  { task: 'Strategia treści i plan redakcyjny', cells: { dyr: 'K', mgr: 'O', senior: 'W', digital: 'K', koord: 'K' } },
  { task: 'Kampanie płatne: konfiguracja i optymalizacja', cells: { dyr: '-', mgr: 'O', senior: 'K', digital: 'W', koord: '-' } },
  { task: 'SEO i rozwój serwisu', cells: { dyr: '-', mgr: 'O', senior: 'K', digital: 'W', koord: '-' } },
  { task: 'Newsletter i automatyzacje mailowe', cells: { dyr: '-', mgr: 'K', senior: 'O', digital: 'W', koord: 'W' } },
  { task: 'Prowadzenie profili w social media', cells: { dyr: '-', mgr: 'K', senior: 'K', digital: 'O', koord: 'W' } },
  { task: 'Analityka, atrybucja, raport dla zarządu', cells: { dyr: 'O', mgr: 'W', senior: 'W', digital: 'W', koord: 'K' } },
  { task: 'Logistyka wydarzeń i obsługa uczestników', cells: { dyr: '-', mgr: 'K', senior: 'K', digital: '-', koord: 'O' } },
  { task: 'Dostawcy, zamówienia, faktury', cells: { dyr: 'K', mgr: 'O', senior: '-', digital: '-', koord: 'W' } },
  { task: 'Prowadzenie merytoryczne juniorów', cells: { dyr: 'K', mgr: 'O', senior: 'W', digital: '-', koord: '-' } },
  { task: 'Zatwierdzanie komunikatów zewnętrznych', cells: { dyr: 'O', mgr: 'K', senior: 'K', digital: '-', koord: '-' } },
  {
    task: 'Treść stanowisk merytorycznych i regulacyjnych',
    cells: { dyr: '-', mgr: '-', senior: '-', digital: '-', koord: '-' },
    note:
      'Celowo bez właściciela w dziale marketingu. Treść stanowisk merytorycznych należy do zespołu policy lub public affairs; marketing odpowiada wyłącznie za ich komunikację.',
  },
];

export const OWNERSHIP_LEGEND = [
  { code: 'O', label: 'odpowiada', what: 'jest właścicielem wyniku' },
  { code: 'W', label: 'wykonuje', what: 'realizuje zadanie' },
  { code: 'K', label: 'konsultuje', what: 'wspiera lub opiniuje' },
  { code: '-', label: 'poza zakresem', what: 'rola nie uczestniczy' },
] as const;

/** Kogo zatrudnić najpierw, przy rosnącym budżecie etatowym. */
export const HIRING_ORDER = [
  {
    fte: 1,
    roles: ['mgr'],
    what: 'Manager marketingu',
    why:
      'Nie dyrektor i nie specjalista. Potrzebny ktoś, kto sam zaplanuje i sam wykona. Tytuł dyrektora przy zespole jednoosobowym podnosi koszt bez dodania wartości.',
  },
  {
    fte: 2,
    roles: ['mgr', 'digital'],
    what: 'Manager + specjalista digital',
    why: 'Manager planuje, negocjuje i rozlicza; specjalista uruchamia kanały. Wydarzenia obsługiwane z zewnątrz.',
  },
  {
    fte: 3,
    roles: ['mgr', 'senior', 'digital'],
    what: 'Manager + starszy specjalista + digital',
    why: 'Pojawia się warstwa ekspercka: treści przestają być wciskane między kampanie.',
  },
  {
    fte: 4,
    roles: ['mgr', 'senior', 'digital', 'koord'],
    what: 'Manager + starszy specjalista + digital + koordynator',
    why: 'Koordynator zdejmuje logistykę i administrację.',
  },
  {
    fte: 5,
    roles: ['dyr', 'mgr', 'senior', 'digital', 'koord'],
    what: 'Dyrektor + manager + starszy specjalista + digital + koordynator',
    why: 'Dyrektor ma sens dopiero tutaj: jest komu delegować bieżące prowadzenie zespołu.',
  },
];

/* ---------------------------------------------------------------- *
 * Role specjalistyczne                                             *
 * ---------------------------------------------------------------- */

/**
 * Widełki dla tych pięciu ról pochodzą z jednego źródła i są prognozą
 * redakcyjną, nie pomiarem. Kierunek potwierdzają Antal i Hays, ale nie na
 * poziomie pojedynczych stanowisk — traktować jako rząd wielkości, nie jako
 * widełki do ogłoszenia.
 */
export const SPECIALIST_ROLES: SpecialistRole[] = [
  {
    name: 'AI in Marketing Manager',
    band: [18000, 28000],
    what: 'Wdraża i optymalizuje narzędzia AI: strategie treści z użyciem dużych modeli, personalizacja, automatyzacja analityki.',
    verdict:
      'W izbie nie ma uzasadnienia dla osobnego etatu, ale jest dla wpisania tej kompetencji do kart managera i starszego specjalisty. Brak kompetencji AI-native obniża widełki o 20–30 procent, więc premia za ich posiadanie to realnie 10–20 procent nad widełki bazowe.',
    verdictLabel: 'kompetencja, nie etat',
    goesInto: 'Manager i starszy specjalista',
  },
  {
    name: 'Marketing Data Analyst',
    band: [16000, 25000],
    what: 'Mierzy skuteczność kampanii, buduje modele predykcyjne, przekłada dane na rekomendacje biznesowe.',
    verdict:
      'Analityka na skalę izby mieści się w kartach specjalisty digital i starszego specjalisty. Osobny etat ma sens dopiero przy budżecie mediowym rzędu setek tysięcy złotych rocznie, bo dopiero wtedy jego praca się zwraca.',
    verdictLabel: 'nie w izbie',
    goesInto: 'Specjalista digital i starszy specjalista',
  },
  {
    name: 'Marketing Automation i MarTech Specialist',
    band: [15000, 23000],
    what: 'Zarządza ekosystemem narzędzi: CRM, platformy automatyzacji, analityka.',
    verdict:
      'Jedyna z tych ról, której opis pokrywa się z codzienną pracą izby. Cykl życia członka — powitanie, przypomnienie o składce, reaktywacja — to dosłownie marketing automation. Osobny etat rozważać przy bazie liczonej w tysiącach członków.',
    verdictLabel: 'najbliżej potrzeb izby',
    goesInto: 'Specjalista digital',
  },
  {
    name: 'Performance Marketing Lead',
    band: [14000, 22000],
    what: 'Kampanie płatne z naciskiem na zwrot z wydatku reklamowego, często z premią od wyników.',
    verdict:
      'Izba nie ma budżetu mediowego uzasadniającego dedykowaną rolę. Kampanie płatne to 10–20 procent pracy specjalisty digital. Model premiowy od wyników słabo pasuje do organizacji rozliczanej z liczby członków, a nie z przychodu ze sprzedaży.',
    verdictLabel: 'nie w izbie',
    goesInto: 'Specjalista digital, obszar kampanii płatnych',
  },
  {
    name: 'E-commerce Manager',
    band: [15000, 24000],
    what: 'Kompleksowe zarządzanie sklepem internetowym: strategia, analityka, optymalizacja sprzedaży.',
    verdict:
      'Izba nie prowadzi sklepu. Częściowym odpowiednikiem jest sprzedaż pakietów członkowskich i biletów, ale to należy do managera i do rozwoju biznesu. Rola podana dla kompletności obrazu rynku.',
    verdictLabel: 'nie dotyczy',
    goesInto: 'Manager oraz rozwój biznesu',
  },
];

/** Specjalizacje, których wycena spada. */
export const UNDER_PRESSURE = [
  {
    what: 'Social media specialist',
    why: 'Skupiony wyłącznie na prowadzeniu profili, bez komponentu analitycznego i strategicznego. U Haysa górne widełki to 11 000 zł, najniżej w całym zestawieniu marketingowym.',
  },
  { what: 'Content writer bez specjalizacji', why: 'Bez SEO lub AI. Tworzenie prostych tekstów stało się tanie.' },
  {
    what: 'Tradycyjne SEO, social media i e-mail jako osobne role',
    why: 'Hays wprost nazywa to trudniejszymi czasami dla kandydatów z tych obszarów.',
  },
];

/* ---------------------------------------------------------------- *
 * Źródła                                                           *
 * ---------------------------------------------------------------- */

export const ACCESS_DATE = '16 września 2026';

export const SOURCES: Source[] = [
  {
    key: 'rocket',
    name: 'RocketJobs / RocketSpace',
    title: 'Zarobki w marketingu 2026: kto zarobi najwięcej?',
    url: 'https://rocketjobs.pl/blog/zarobki-w-marketingu-2026-kto-zarobi-najwiecej',
    pub: '20 stycznia 2026',
    note:
      'Kotwica dla rekomendacji na tej stronie. Prognoza redakcyjna oparta na ogłoszeniach: junior 6 000–9 000, mid 9 500–14 000, senior 14 500–20 000, manager 18 000–27 000, dyrektor i CMO 28 000–45 000 zł i więcej. Warszawa płaci o 15–25 procent więcej niż inne miasta.',
  },
  {
    key: 'hays_wm',
    name: 'Hays Poland za Wirtualne Media',
    title: 'Raport płacowy: kto zarabia najwięcej w marketingu i e-commerce?',
    url: 'https://www.wirtualnemedia.pl/raport-placowy-2026-kto-zarabia-najwiecej-w-marketingu-i-e-commerce,7242673111546848a',
    pub: '13 stycznia 2026',
    note: 'Podane liczby to GÓRNE widełki, nie mediany. Wzrost płac w e-commerce i digital 6–8 procent rocznie, na stanowiskach strategicznych 10–15.',
  },
  {
    key: 'goldman',
    name: 'Goldman Recruitment',
    title: 'Manager ds. Marketingu: rola, zakres obowiązków i wynagrodzenie w 2026 roku',
    url: 'https://goldmanrecruitment.pl/manager-ds-marketingu-rola-i-zakres-obowiazkow/',
    pub: '25 sierpnia 2026',
    note: 'Salary Survey 2026: 14 500 zł dolny poziom, 16 500 zł mediana, 19 000 zł górny. Najświeższe źródło dla stanowiska managera.',
  },
  {
    key: 'wyn_dyr',
    name: 'Sedlak & Sedlak / wynagrodzenia.pl',
    title: 'Moja Płaca: dyrektor ds. marketingu',
    url: 'https://wynagrodzenia.pl/moja-placa',
    pub: 'dane aktualizowane na bieżąco, odczyt 2026',
    note: 'Ogólnopolskie Badanie Wynagrodzeń. Próba obejmuje cały kraj i wszystkie wielkości firm, dlatego mediany są niższe niż w raportach agencji.',
  },
  {
    key: 'wyn_kier',
    name: 'Sedlak & Sedlak / wynagrodzenia.pl',
    title: 'Ile zarabia kierownik marketingu',
    url: 'https://wynagrodzenia.pl/moja-placa/ile-zarabia-kierownik-marketingu',
    pub: 'dane aktualizowane na bieżąco, odczyt 2026',
    note: 'Mediana 11 250 zł, kwartyle 9 000 i 14 940 zł. Tytuł kierownika i koordynatora bywa agregowany, co zawyża stawkę dla roli operacyjnej.',
  },
  {
    key: 'wyn_spec',
    name: 'Sedlak & Sedlak / wynagrodzenia.pl',
    title: 'Moja Płaca: specjalista ds. marketingu internetowego',
    url: 'https://wynagrodzenia.pl/moja-placa',
    pub: 'dane aktualizowane na bieżąco, odczyt 2026',
    note: 'Dla roli digital: 6 430 / 7 960 / 10 110 zł.',
  },
  {
    key: 'nfj',
    name: 'kursyszkolenia.online za No Fluff Jobs',
    title: 'Ile zarabia specjalista ds. marketingu w 2026?',
    url: 'https://kursyszkolenia.online/specjalista-ds-marketingu-zarobki/',
    pub: '9 lutego 2026',
    note: 'Opracowanie wtórne. Starszy specjalista: 7 780 / 9 320 / 11 980 zł.',
  },
  {
    key: 'crp_waw',
    name: 'CRP Wrocław',
    title: 'Ile zarabia się w marketingu? Poznaj zarobki',
    url: 'https://blog.crp.wroclaw.pl/ile-zarabia-sie-w-marketingu-poznaj-zarobki/',
    pub: '7 maja 2026',
    note: 'Mediana w Warszawie ok. 11 000 zł, w Krakowie, Wrocławiu, Poznaniu i Trójmieście 9 200–9 800 zł.',
  },
  {
    key: 'crp',
    name: 'CRP Wrocław',
    title: 'Ile zarabia specjalista ds. marketingu w 2026 roku?',
    url: 'https://blog.crp.wroclaw.pl/ile-zarabia-specjalista-ds-marketingu-2/',
    pub: '7 maja 2026',
    note: 'Brak kompetencji AI-native obniża widełki o 20–30 procent.',
  },
  {
    key: 'indeed_waw',
    name: 'Indeed Polska',
    title: 'Wynagrodzenie na stanowisku specjalista ds. marketingu, Warszawa',
    url: 'https://pl.indeed.com/career/specjalista-do-spraw-marketingu/salaries/Warszawa--mazowieckie',
    pub: 'dane aktualizowane na bieżąco, odczyt 2026',
    note: 'Średnia dla Warszawy 8 488 zł.',
  },
  {
    key: 'zarabiaj',
    name: 'Zarabiaj.pl',
    title: 'Ile zarabia koordynator ds. marketingu w 2026',
    url: 'https://www.zarabiaj.pl/zarobki/ile-zarabia-koordynator-ds-marketingu/',
    pub: 'wrzesień 2026',
    note: 'Średnia 10 865 zł, zawyżona przez role menedżerskie pod tym samym tytułem.',
  },
  {
    key: 'antal',
    name: 'Antal za Wszystko co Najważniejsze',
    title: 'Raport Płacowy Antal 2026',
    url: 'https://wszystkoconajwazniejsze.pl/pepites/raport-placowy-antal-2026/',
    pub: '15 września 2026',
    note:
      'Ponad 3 000 specjalistów i menedżerów. Specjaliści 13 300 zł (+6%), menedżerowie 21 400 zł (+4%). Autorzy zastrzegają, że to cena nowych kompetencji na rynku rekrutacyjnym, nie reprezentatywny pomiar wynagrodzeń.',
  },
  {
    key: 'gus_med',
    name: 'GUS za Wszystko co Najważniejsze',
    title: 'Połowa zatrudnionych zarabia nie więcej niż 7530 zł',
    url: 'https://wszystkoconajwazniejsze.pl/pepites/mediana-wynagrodzen-w-polsce-2026/',
    pub: 'wrzesień 2026, dane za marzec 2026',
    note: 'Mediana 7 530,45 zł, przeciętne 9 698,95 zł, próg górnych 10 procent 15 424,85 zł.',
  },
  {
    key: 'cyrek_dyr',
    name: 'Cyrek Digital',
    title: 'Dyrektor ds. marketingu: kto to jest i czym się zajmuje?',
    url: 'https://cyrekdigital.com/pl/baza-wiedzy/dyrektor-ds-marketingu/',
    pub: '9 marca 2026',
    note: 'MBA i certyfikaty mogą podnieść wynagrodzenie dyrektora o 15–20 procent.',
  },
  {
    key: 'pit',
    name: 'PIT.pl',
    title: 'Wynagrodzenie minimalne 2026',
    url: 'https://www.pit.pl/wynagrodzenie-minimalne/',
    pub: 'aktualizacja 2026',
    note: '4 806 zł brutto, ok. 3 605,85 zł netto. Punkt kalibracyjny kalkulatora.',
  },
  {
    key: 'pitax',
    name: 'PITax',
    title: 'Średnia krajowa 2026: ile na rękę dostanie pracownik',
    url: 'https://www.pitax.pl/wiedza/aktualnosci/srednia-krajowa-2026-ile-na-reke-dostanie-pracownik-i-kiedy-zaplaci-wyzsza-stawke-podatku/',
    pub: 'lipiec 2026',
    note: 'Drugi punkt kalibracyjny: 9 509,02 zł brutto daje 6 811,85 zł netto.',
  },
  {
    key: 'esco',
    name: 'ESCO (Komisja Europejska) i O*NET OnLine',
    title: 'Klasyfikacje zawodów i kompetencji',
    url: 'https://esco.ec.europa.eu/',
    pub: 'aktualizowane cyklicznie',
    note: 'Referencyjna struktura opisu zawodów, na której oparte są zakresy obowiązków.',
  },
  {
    key: 'syn_loc',
    name: 'Synteza własna: przelicznik lokalizacyjny',
    title: 'Mnożniki dla Warszawy, dużych miast i pozostałej Polski',
    url: '',
    pub: '16 września 2026',
    note: 'Wyprowadzone z premii warszawskiej 15–25 procent i z mediany warszawskiej wobec pozostałych dużych miast. To szacunek, nie pomiar.',
    own: true,
  },
  {
    key: 'syn_rec',
    name: 'Decyzja zamawiającego: widełki rekomendowane',
    title: 'Rekomendacja zakotwiczona w prognozie RocketJobs na 2026',
    url: '',
    pub: '16 września 2026',
    note:
      'Materiał źródłowy rekomendował korektę w dół o 15–25 procent wobec rynku rekrutacyjnego, typową dla organizacji członkowskich. Ta wersja korektę porzuca i kotwiczy widełki w pasmach RocketJobs, bo to są pieniądze, które organizacja zamierza realnie zapłacić.',
    own: true,
  },
];

export const sourceByKey = (key: string) => SOURCES.find((s) => s.key === key);
