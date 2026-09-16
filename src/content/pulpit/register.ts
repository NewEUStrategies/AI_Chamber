import { ARTIFACTS } from '@/content/conference/artifacts';
import { CHANNELS, FB, LI, SOCIAL_DERIVED } from '@/content/dossier/social';
import type { ArtifactKey } from '@/content/conference/types';
import type { Area, AreaKey, Effort, Entry, Horizon } from './types';

/**
 * The register: every recommendation in the cockpit, each one set against the
 * state it is answering.
 *
 * Two rules hold throughout. Numbers are never typed here — anything countable
 * is read from the reconnaissance data, so a correction there corrects the
 * register. And every row ends in a destination: the Pulpit's whole function
 * is to hand the reader to the page where the recommendation is worked out,
 * which is why a row without a `to` cannot be written.
 */

export const AREAS: Area[] = [
  {
    key: 'lejek',
    label: 'Lejek i oferta',
    what: 'Co się dzieje między zasięgiem a opłaconą składką — i czego z zewnątrz nie widać.',
    to: { view: 'marketing', segment: 'lejek' },
    toLabel: 'Marketing',
  },
  {
    key: 'social',
    label: 'Social media',
    what: 'Decyzje kanałowe, miks formatów, rytm i kaskada przez profile osobiste.',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Konferencje · Proponowane działania',
  },
  {
    key: 'email',
    label: 'E-mail marketing',
    what: 'Higiena wysyłki, jedna lista z segmentacją, Policy Brief i sekwencje cyklu życia.',
    to: { view: 'konferencje', mode: 'plan', tab: 'email' },
    toLabel: 'Konferencje · Proponowane działania',
  },
  {
    key: 'www',
    label: 'Strona www',
    what: 'Naprawa techniczna, hub regulacyjny, rejestr stanowisk i przechwytywanie kontaktu.',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Konferencje · Proponowane działania',
  },
  {
    key: 'mediapack',
    label: 'Media pack',
    what: 'Tiering listy, embargo, zawartość pakietu i SLA rzecznika.',
    to: { view: 'konferencje', mode: 'plan', tab: 'mediapack' },
    toLabel: 'Konferencje · Proponowane działania',
  },
  {
    key: 'konferencja',
    label: 'Materiał z konferencji',
    what: 'Siedem rodzin publikacji wyciętych z jednego dnia nagrań, każda z własnym terminem.',
    to: { view: 'konferencje', mode: 'material' },
    toLabel: 'Konferencje · Materiał',
  },
];

export const areaByKey = (key: AreaKey): Area => AREAS.find((a) => a.key === key) ?? AREAS[0];

/* ---------------------------------------------------------------- *
 * Conference rows — derived                                        *
 * ---------------------------------------------------------------- */

/**
 * The seven material families come straight from the conference model, so
 * their state, their name and their destination cannot drift from the page
 * they point at. Only the register-specific fields are written here.
 */
const ARTIFACT_ROWS: Record<ArtifactKey, { now: string; effort: Effort; impact: number; horizon: Horizon }> = {
  nagranie: {
    now: 'Izba nie prowadzi kanału wideo ani archiwum wystąpień.',
    effort: 'średni',
    impact: 5,
    horizon: '30-90',
  },
  transkrypcja: {
    now: 'Pięć godzin sceny rocznie nie zostawia ani jednego słowa indeksowalnego tekstu.',
    effort: 'niski',
    impact: 5,
    horizon: '30-90',
  },
  setki: {
    now: 'W próbie dwudziestu siedmiu postów nie ma ani jednego klipu z sali.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
  },
  grafika: {
    now: 'Rzemiosło istnieje, ale karta nie jest zasilana ze sceny w dniu wydarzenia.',
    effort: 'niski',
    impact: 4,
    horizon: '0-30',
  },
  newsletter: {
    now: 'Newsletter działa; czy wyszło wydanie konferencyjne, nie da się ustalić z zewnątrz.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
  },
  mediapack: {
    now: 'Ani listy akredytacyjnej, ani publikacji per poziom — brak pomiaru, nie brak działania.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
  },
  zdjecia: {
    now: 'Relacja z Pragi była najmocniejszym postem próby, ale wyszła około szóstego dnia.',
    effort: 'niski',
    impact: 4,
    horizon: '0-30',
  },
};

const CONFERENCE_ENTRIES: Entry[] = ARTIFACTS.map((a) => {
  const row = ARTIFACT_ROWS[a.key];
  return {
    id: `k-${a.key}`,
    area: 'konferencja' as const,
    subject: a.label,
    now: row.now,
    evidence: a.evidence,
    status: a.status,
    recommendation: `${a.what}. Termin: ${a.due}, właściciel: ${a.owner.toLowerCase()}.`,
    effort: row.effort,
    impact: row.impact,
    horizon: row.horizon,
    to: { view: 'konferencje', mode: 'material', tab: a.key } as const,
    toLabel: `Konferencje · ${a.label}`,
  };
});

/* ---------------------------------------------------------------- *
 * The rest — authored, with the numbers still computed              *
 * ---------------------------------------------------------------- */

const AUTHORED: Entry[] = [
  /* ---- Lejek i oferta ---- */
  {
    id: 'l-analityka',
    area: 'lejek',
    subject: 'Pomiar ścieżki do formularza',
    now: 'Nie wiadomo, czy ścieżka od źródła do formularza deklaracji jest w ogóle mierzona.',
    evidence:
      'Obecność skryptu analitycznego da się odczytać ze źródła strony, ale to, czy formularz jest oznaczony jako konwersja i czy linki są tagowane, widać dopiero z panelu.',
    status: 'nieznane',
    howToCheck:
      'Jedno pytanie do osoby prowadzącej stronę: czy formularz deklaracji jest zdarzeniem konwersji i czy w raportach widać źródło wejścia. Odpowiedź zajmuje minutę.',
    recommendation:
      'Jeśli pomiar jest — zacząć od odczytu, nie od wdrożenia. Jeśli go nie ma, podpiąć analitykę i Search Console i oznaczyć formularz, bo bez tego każda dalsza optymalizacja jest zgadywaniem.',
    effort: 'niski',
    impact: 5,
    horizon: '0-30',
    to: { view: 'marketing', segment: 'roadmapa' },
    toLabel: 'Marketing · Roadmapa',
  },
  {
    id: 'l-etapy',
    area: 'lejek',
    subject: 'Etapy lejka bez ustalonego stanu',
    now: 'Dwa z czterech etapów pozostają nieobserwowalne z zewnątrz.',
    evidence: 'Przejścia między etapami wymagają dostępu do analityki, którego rozpoznanie nie miało.',
    status: 'nieznane',
    howToCheck: 'Dostęp do analityki domyka dwa etapy naraz — to ta sama prośba co przy pozycji o pomiarze ścieżki.',
    recommendation:
      'Domknąć pomiar, zanim cokolwiek się optymalizuje. Szerokość pasm w diagramie koduje ocenę siły etapu, nie zmierzony spadek.',
    effort: 'niski',
    impact: 4,
    horizon: '0-30',
    to: { view: 'marketing', segment: 'lejek' },
    toLabel: 'Marketing · Lejek',
  },
  {
    id: 'l-kanaly',
    area: 'lejek',
    subject: 'Rozkład nakładu między kanałami',
    now: 'Nakład rozkłada się odwrotnie do zwrotu — najwięcej pracy idzie w to, co daje najmniej.',
    evidence: 'Macierz nakład × zwrot dla wszystkich kanałów, oceniana na skali 1–5.',
    status: 'kuleje',
    recommendation:
      'Wycofać się z kosztownych pomyłek, dosypać do dźwigni. Kanały na granicy skali wymagają doprecyzowania oceny, nie decyzji.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'marketing', segment: 'kanaly' },
    toLabel: 'Marketing · Kanały',
  },
  {
    id: 'l-aktywa',
    area: 'lejek',
    subject: 'Aktywa, które nie przechwytują kontaktu',
    now: 'Najmocniejsze aktywa treściowe leżą otwarte i nie zostawiają ani jednego adresu.',
    evidence:
      'Rozpoznanie podaje, że oba pliki są do pobrania wprost z witryny, bez formularza. To akurat sprawdza się jednym kliknięciem.',
    status: 'brak',
    recommendation:
      'Zbramkować raport o MŚP i CEE AI Index. Bramka miękka: e-mail, kraj i wielkość firmy wystarczą, streszczenie zostaje otwarte.',
    effort: 'niski',
    impact: 5,
    horizon: '0-30',
    to: { view: 'marketing', segment: 'aktywa' },
    toLabel: 'Marketing · Aktywa i luki',
  },

  /* ---- Social ---- */
  {
    id: 's-facebook',
    area: 'social',
    subject: 'Facebook',
    now: `${FB.posts} postów, ${FB.reactions} reakcji łącznie, ${SOCIAL_DERIVED.fbSilentDays} dni ciszy obejmującej własny szczyt.`,
    evidence: 'Odczyt zarchiwizowanych postów obu kanałów. Strona jest podlinkowana z witryny.',
    status: 'brak',
    recommendation:
      'Zamknąć albo przypisać właściciela i rytm tygodniowy. Trzeciej opcji — zostawić jak jest — nie ma, bo strona pracuje przeciwko sprzedaży składki.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Działania · Social media',
    evidenceTo: { view: 'dossier', page: 'social' },
    evidenceLabel: 'Dossier · Social',
  },
  {
    id: 's-miks',
    area: 'social',
    subject: 'Miks formatów',
    now: 'Rozkład publikacji jest odwrotny do skuteczności: najczęściej produkowany format wypada najsłabiej.',
    evidence: `Średnie reakcji per format z ${LI.posts} zarchiwizowanych publikacji LinkedIna.`,
    status: 'kuleje',
    recommendation:
      'Odwrócić proporcje: minimum jedna relacja zdjęciowa i jedna transmisja miesięcznie, karuzela przestawiona na treść merytoryczną.',
    effort: 'niski',
    impact: 4,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Działania · Social media',
    evidenceTo: { view: 'dossier', page: 'social' },
    evidenceLabel: 'Dossier · Social',
  },
  {
    id: 's-rytm',
    area: 'social',
    subject: 'Rytm tygodniowy',
    now: 'Publikacje wychodzą bez stałego rytmu i bez nazwy.',
    evidence: 'Rozkład dat publikacji w całej próbie — brak powtarzalnego slotu.',
    status: 'brak',
    recommendation:
      'Trzy nazwane rytuały: Policy Signal w poniedziałek, format zmienny w środę, ludzie w piątek. Nazwa ma znaczenie, bo rytuał jest rozpoznawalny.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Działania · Social media',
  },
  {
    id: 's-kaskada',
    area: 'social',
    subject: 'Kaskada przez profile osobiste',
    now: 'Nie wiadomo, czy publikacje strony są podawane dalej przez profile osobiste — i w jakiej skali.',
    evidence:
      'Rozpoznanie czytało stronę firmową, a nie prywatne profile zarządu, dyrektorów i doradców. Brak śladu w jednym miejscu nie jest dowodem na brak w drugim.',
    status: 'nieznane',
    howToCheck:
      'Przejrzeć dziewięć profili przez tydzień albo po prostu zapytać, kto podaje dalej i jak często. Przy okazji wychodzi, kto jest skłonny to robić regularnie.',
    recommendation:
      'Niezależnie od odpowiedzi warto ustalić rytm: post strony o 9:00, kaskada między 10:00 a 14:00, każdy z własnym zdaniem. Cztery z dziewięciu sieci są zagraniczne, czyli tam, gdzie baza członkowska jest symboliczna.',
    effort: 'niski',
    impact: 4,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Działania · Social media',
  },
  {
    id: 's-amplifikacja',
    area: 'social',
    subject: 'Protokół amplifikacji',
    now: 'Nie wiadomo, czy tagowane podmioty dostają cokolwiek przed publikacją.',
    evidence:
      'Wysyłka do prelegentów i partnerów jest korespondencją wewnętrzną — z zewnątrz nie zostawia śladu ani gdy jest, ani gdy jej nie ma.',
    status: 'nieznane',
    howToCheck: 'Pytanie do osoby prowadzącej kanał: co dostaje tagowany podmiot i kiedy.',
    recommendation:
      'Jeśli pakietu nie ma, wprowadzić go w kształcie T-24h: grafika w dwóch formatach, trzy gotowe zdania do wyboru, bezpośredni link. Jeśli jest — sprawdzić, czy zawiera wszystkie trzy elementy, bo to one decydują, czy ktoś z niego skorzysta.',
    effort: 'niski',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Działania · Social media',
  },
  {
    id: 's-jezyk',
    area: 'social',
    subject: 'Wersje językowe',
    now: `${SOCIAL_DERIVED.polishPosts} z ${LI.posts} postów po polsku przy bazie członkowskiej opartej na Polsce.`,
    evidence: 'Język każdej publikacji odczytany z zarchiwizowanych postów.',
    status: 'kuleje',
    recommendation: 'Treść regulacyjna zawsze w dwóch wersjach językowych. To najtańsza poprawka w całym rejestrze.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'social' },
    toLabel: 'Działania · Social media',
    evidenceTo: { view: 'dossier', page: 'social' },
    evidenceLabel: 'Dossier · Social',
  },
  {
    id: 's-youtube',
    area: 'social',
    subject: 'YouTube',
    now: 'Kanał wideo nie istnieje.',
    evidence:
      'Izba nie linkuje do kanału ani z witryny, ani z profilu społecznościowego, a rozpoznanie żadnego nie znalazło. To jedna z niewielu rzeczy sprawdzalnych w całości z zewnątrz.',
    status: 'brak',
    recommendation:
      'Założyć jako archiwum, nie jako kanał: pełne nagrania, rozdziały, transkrypcje w opisie. Naprawia przy okazji widoczność w modelach językowych.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'material', tab: 'nagranie' },
    toLabel: 'Konferencje · Pełne nagranie',
  },

  /* ---- E-mail ---- */
  {
    id: 'e-higiena',
    area: 'email',
    subject: 'Higiena wysyłki',
    now: 'Stan uwierzytelnienia domeny wysyłkowej nie został sprawdzony.',
    evidence:
      'Rekordy SPF i DMARC są publiczne w DNS, więc akurat to da się rozstrzygnąć bez niczyjej pomocy. DKIM i wydzielenie subdomeny wymagają już panelu dostawcy.',
    status: 'nieznane',
    howToCheck:
      'Zapytanie DNS o rekordy TXT domeny — dosłownie minuta i zero kosztu. Reszta: jedno pytanie do osoby obsługującej wysyłkę.',
    recommendation:
      'Zacząć od tego sprawdzenia, bo jest najtańsze w całym rejestrze. Czego brakuje, uzupełnić; przy okazji wydzielić subdomenę dla wysyłki masowej, żeby korespondencja operacyjna nie dzieliła reputacji.',
    effort: 'niski',
    impact: 5,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'email' },
    toLabel: 'Działania · E-mail marketing',
  },
  {
    id: 'e-lista',
    area: 'email',
    subject: 'Jedna lista',
    now: 'Cztery wejścia mają osobne formularze. Czy trafiają do jednego systemu, z zewnątrz nie widać.',
    evidence:
      'Osobne formularze nie przesądzają o tym, co jest pod spodem: kontakty mogą schodzić się w CRM-ie albo w CRM-ie i narzędziu do wysyłki. Z zewnątrz widać wejścia, nie bazę.',
    status: 'nieznane',
    howToCheck:
      'Jedno pytanie: gdzie lądują zapisy z każdego z czterech wejść i czy da się dziś wysłać mail do „firm 6–50 osób z Czech”. Druga część odpowiedzi jest ważniejsza od pierwszej.',
    recommendation:
      'Jeśli wspólny system jest, rzecz sprowadza się do segmentacji: kraj, wielkość firmy w progach pakietów, branża regulowana, status kontaktu. Jeśli go nie ma — najpierw spięcie, bo bez niego segmentacja nie ma na czym stanąć.',
    effort: 'średni',
    impact: 5,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'email' },
    toLabel: 'Działania · E-mail marketing',
  },
  {
    id: 'e-brief',
    area: 'email',
    subject: 'Policy Brief',
    now: 'Newsletter wychodzi w rytmie miesięcznym. Co jest w środku, z zewnątrz nie widać.',
    evidence:
      'Zapowiedzi w kanale społecznościowym nazywają kolejne wydania po miesiącach, więc kadencja jest ustalona. Ocena dotyczy wyłącznie jej — treści nie oceniam, bo jej nie widziałem.',
    status: 'kuleje',
    recommendation:
      'Cotygodniowy briefing po angielsku, wtorek rano, stała struktura czterech bloków. Kiedy czyta go administracja, obecność w nim da się sprzedać partnerowi.',
    effort: 'średni',
    impact: 5,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'email' },
    toLabel: 'Działania · E-mail marketing',
  },
  {
    id: 'e-sekwencje',
    area: 'email',
    subject: 'Sekwencje cyklu życia',
    now: 'Nie wiadomo, co dostaje ktoś, kto zapisał się na webinar albo wstąpił do izby.',
    evidence:
      'Sekwencje mailowe widzi tylko ich odbiorca. Rozpoznanie nie zapisywało się na listy, więc nie ma podstaw, by twierdzić, że ich nie ma.',
    status: 'nieznane',
    howToCheck:
      'Zapisać się własnym adresem na webinar i na newsletter, odczekać dwa tygodnie i spisać, co przyszło. Koszt zerowy, odpowiedź pełna.',
    recommendation:
      'Uzupełnić to, czego brakuje, do sześciu sekwencji wyzwalanych zdarzeniem — od onboardingu po reaktywację. Pierwsza w kolejce jest onboardingowa, bo ponad połowa nieodnowień wynika z braku zaangażowania, nie z ceny.',
    effort: 'wysoki',
    impact: 5,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'email' },
    toLabel: 'Działania · E-mail marketing',
  },

  /* ---- Strona www ---- */
  {
    id: 'w-golf',
    area: 'www',
    subject: 'Podstrona golfowa',
    now: 'Najsilniejsza strona serwisu odpowiada dziś na zapytania o mini golfa.',
    evidence: 'Profil fraz z pozycją: adres /locations/golf-park-jozefow/ zbiera ruch niezwiązany z ofertą.',
    status: 'kuleje',
    recommendation: 'Przekierować albo wyindeksować. Pierwszy tydzień, zero budżetu.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Działania · Strona www',
    evidenceTo: { view: 'dossier', page: 'seo' },
    evidenceLabel: 'Dossier · SEO',
  },
  {
    id: 'w-disavow',
    area: 'www',
    subject: 'Plik disavow',
    now: 'Nie wiadomo, czy plik disavow w ogóle istnieje.',
    evidence: 'Zawartość Search Console jest widoczna wyłącznie z konta właściciela serwisu.',
    status: 'nieznane',
    howToCheck: 'Pierwsze pytanie do osoby odpowiedzialnej za stronę. Sam plik sprawdza się w Search Console w minutę.',
    recommendation:
      'Sprawdzić i zgłosić domeny na tanich końcówkach oraz hosty farm linkowych. To pierwsze pytanie do osoby odpowiedzialnej za stronę.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Działania · Strona www',
    evidenceTo: { view: 'dossier', page: 'seo' },
    evidenceLabel: 'Dossier · SEO',
  },
  {
    id: 'w-hub',
    area: 'www',
    subject: 'Hub regulacyjny',
    now: 'Serwis nie ma treści, którą wyszukiwarka albo model językowy mógłby wziąć i przypisać do izby.',
    evidence: 'Siedem fraz z pozycją i sześć wizyt organicznych z Polski miesięcznie.',
    status: 'brak',
    recommendation:
      'Kilkanaście stron, każda na jedno pytanie, PL i EN, trwałe adresy. Jedyne miejsce, gdzie kanał wyszukiwarkowy może cokolwiek dowieźć.',
    effort: 'wysoki',
    impact: 5,
    horizon: '90+',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Działania · Strona www',
    evidenceTo: { view: 'dossier', page: 'seo' },
    evidenceLabel: 'Dossier · SEO',
  },
  {
    id: 'w-rejestr',
    area: 'www',
    subject: 'Rejestr stanowisk',
    now: 'Dorobek advocacy jest rozproszony po aktualnościach i nie da się go zacytować jako całości.',
    evidence: 'Stanowiska i deklaracje pojawiają się jako wpisy w dziale News, bez trwałych adresów.',
    status: 'brak',
    recommendation:
      'Jedno miejsce po angielsku, z datą, adresatem i pełnym dokumentem. To ono zamienia „reprezentujemy interesy” w sprawdzalny fakt.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Działania · Strona www',
  },
  {
    id: 'w-bramka',
    area: 'www',
    subject: 'Bramka na raporcie',
    now: 'Raport o MŚP i CEE AI Index są, wedle rozpoznania, do pobrania bez pozostawienia kontaktu.',
    evidence:
      'Rozpoznanie podaje oba pliki jako dostępne wprost z witryny. Warto to potwierdzić kliknięciem, zanim cokolwiek się zmienia — to jedna z tańszych weryfikacji w rejestrze.',
    status: 'brak',
    recommendation:
      'Trzy pola przed plikiem: e-mail, kraj, wielkość firmy. Streszczenie zostaje otwarte, żeby nie stracić cytowalności w mediach.',
    effort: 'niski',
    impact: 5,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Działania · Strona www',
  },
  {
    id: 'w-case',
    area: 'www',
    subject: 'Case studies członków',
    now: 'Między listą logotypów a decyzją o wydatku nie ma nic, czym dyrektor finansowy uzasadniłby koszt.',
    evidence: 'Witryna pokazuje członków jako logotypy, bez opisu efektu członkostwa.',
    status: 'brak',
    recommendation:
      'Trzy case studies przy cenniku, nie w aktualnościach: konkretna firma, konkretny problem, konkretny efekt.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'www' },
    toLabel: 'Działania · Strona www',
  },

  /* ---- Media pack ---- */
  {
    id: 'm-tiering',
    area: 'mediapack',
    subject: 'Tiering listy',
    now: 'Nie widać ani listy akredytacyjnej, ani publikacji z podziałem na redakcje.',
    evidence:
      'Z zewnątrz nie widać ani listy akredytacyjnej, ani publikacji z podziałem na redakcje. Brak widoczności to nie brak działania, i tak jest to zapisane.',
    status: 'nieznane',
    howToCheck:
      'Poprosić o listę akredytacyjną z ostatniej edycji i o zestawienie publikacji. Jeśli jedno albo drugie nie istnieje, to też jest odpowiedź.',
    recommendation:
      'Trzy poziomy z różną mechaniką: kontakt osobisty, wysyłka pod embargo, komunikat w dniu zero. Wysyłka do wszystkich jest wysyłką do nikogo.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'mediapack' },
    toLabel: 'Działania · Media pack',
  },
  {
    id: 'm-pakiet',
    area: 'mediapack',
    subject: 'Zawartość pakietu',
    now: 'Co zawiera dzisiejszy pakiet, nie da się ustalić bez dostępu do wysyłki.',
    evidence: 'Pakiet prasowy nie jest publikowany na witrynie, a wysyłka do redakcji nie zostawia publicznego śladu.',
    status: 'nieznane',
    howToCheck: 'Poprosić o ostatni wysłany pakiet i porównać z listą dziewięciu elementów obok.',
    recommendation:
      'Dziewięć elementów, w tym trzy tematy sformułowane jako gotowe leady artykułu. Dziennikarz potrzebuje kąta, nie agendy.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'mediapack' },
    toLabel: 'Działania · Media pack',
  },
  {
    id: 'm-sla',
    area: 'mediapack',
    subject: 'SLA rzecznika',
    now: 'W newsroomie nie ma kontaktu do rzecznika z numerem telefonu.',
    evidence: 'Witryna podaje wyłącznie ogólny adres kontaktowy.',
    status: 'brak',
    recommendation:
      'Jedna osoba, numer w pakiecie, dwie godziny na odpowiedź w dni robocze i cztery w dniu konferencji.',
    effort: 'niski',
    impact: 3,
    horizon: '0-30',
    to: { view: 'konferencje', mode: 'plan', tab: 'mediapack' },
    toLabel: 'Działania · Media pack',
  },
  {
    id: 'm-sponsor',
    area: 'mediapack',
    subject: 'Pakiet sponsorski',
    now: 'Publicznie nie ma dokumentu partnerskiego. Czy partnerzy dostają go prywatnie, nie widać.',
    evidence:
      'Oferta partnerska nie jest publikowana, co przy niejawnych cenach jest normalne i samo w sobie niczego nie przesądza.',
    status: 'nieznane',
    howToCheck: 'Poprosić o dokument wysyłany partnerom i sprawdzić, czy odpowiada na cztery pytania obok.',
    recommendation:
      'Jeśli dokumentu nie ma, przygotować go: co partner kupuje w warstwie ekspozycji, ile materiałów wideo z jego udziałem powstanie, co dostanie po wydarzeniu i w jakim terminie. Przy niejawnych cenach to jedyny sposób uzasadnienia kwoty.',
    effort: 'średni',
    impact: 4,
    horizon: '30-90',
    to: { view: 'konferencje', mode: 'plan', tab: 'mediapack' },
    toLabel: 'Działania · Media pack',
  },
];

export const REGISTER: Entry[] = [...AUTHORED, ...CONFERENCE_ENTRIES];

/* ---------------------------------------------------------------- *
 * Derived                                                          *
 * ---------------------------------------------------------------- */

export const HORIZONS: { key: Horizon; label: string; frame: string }[] = [
  { key: '0-30', label: 'Pierwsze 30 dni', frame: 'Bez dodatkowego budżetu, w zakresie uzgodnionym na starcie.' },
  { key: '30-90', label: 'Dni 30–90', frame: 'Budowa brakujących elementów. Wymaga pracy i decyzji.' },
  { key: '90+', label: 'Powyżej 90 dni', frame: 'To, co potrzebuje zespołu albo pieniędzy.' },
];

export const TOTALS = {
  entries: REGISTER.length,
  missing: REGISTER.filter((e) => e.status === 'brak').length,
  unknown: REGISTER.filter((e) => e.status === 'nieznane').length,
  first30: REGISTER.filter((e) => e.horizon === '0-30').length,
  /** Rows the outside view could settle one way or the other. */
  assessed: REGISTER.filter((e) => e.status !== 'nieznane').length,
  /** Reach of the channel the recommendations mostly travel through. */
  followers: CHANNELS.linkedin.followers,
};

export const countByArea = (area: AreaKey) => REGISTER.filter((e) => e.area === area);
