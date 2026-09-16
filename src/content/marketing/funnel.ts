import type { FunnelStage } from '@/components/marketing/FunnelDiagram';

/**
 * Funnel assessment for AI Chamber CEE.
 *
 * Every `evidence` string points at a number established in the dossier
 * (pages 16–19, built on SimilarWeb, Semrush and 70 profile screenshots).
 * Where the outside view genuinely cannot see a stage, the status is
 * `nieznane` and the text says so — an unknown is not scored as a failure.
 *
 * `width` encodes assessed strength of the stage, NOT a measured conversion
 * rate: without analytics access no drop-off between stages is observable.
 */
export const FUNNEL: FunnelStage[] = [
  {
    key: 'tofu',
    short: 'TOFU',
    name: 'Zasięg — kto w ogóle o nich słyszy',
    question: 'Kim jesteście i dlaczego mam o was wiedzieć?',
    status: 'kuleje',
    width: 62,
    has: [
      'Szczyt CEE AI Summit z realnym wynikiem politycznym (Deklaracja Praska, dziewięć państw)',
      'Stała obecność ekspercka w mediach branżowych (Rzeczpospolita, wirtualnemedia, My Company, dlahandlu)',
      'Partnerstwa ekosystemowe wnoszące cudze zasięgi (GITEX, Vilnius AI Summit, Carpathian Drone Summit)',
      'LinkedIn z 3 067 obserwujących i medianą 14 reakcji na post',
    ],
    missing: [
      'Widoczność w polskim wyszukiwaniu — siedem fraz, sześć wizyt organicznych miesięcznie',
      'Obecność w odpowiedziach modeli językowych — zero wzmianek marki przy sześciu cytowanych stronach',
      'Drugi kanał społecznościowy — Facebook milczy od sierpnia i przespał własny szczyt',
      'Treść po polsku — dwa posty na dwadzieścia siedem, przy bazie członkowskiej z Polski',
    ],
    evidence:
      'Ruch SimilarWeb 5 361 wizyt (III–VIII 2026); Semrush: 7 fraz z pozycją w bazie PL, łącznie 6 wizyt/mies.; 27 postów LinkedIn i 12 Facebook ze zrzutów z 16 IX 2026.',
  },
  {
    key: 'mofu',
    short: 'MOFU',
    name: 'Zainteresowanie — czym karmią zainteresowanego',
    question: 'Rozumiecie mój problem? Co konkretnie z tego mam?',
    status: 'nieznane',
    width: 44,
    has: [
      'Własne badanie „How do SMEs in CEE find their way in the world of AI?" — 3 200 respondentów z 11 krajów',
      'CEE AI Index 2026 — benchmark gotowości regionu, ogłoszony 8 czerwca',
      'Newsletter prowadzony dwutorowo: własny oraz „AI Insights CEE" na LinkedIn',
      'Regularne webinary użytkowe (sprzedaż, finansowanie, ISO 42001) i transmisje na żywo',
    ],
    missing: [
      'Nie wiadomo, czy raporty są bramkowane formularzem, czy leżą otwarte — a to różnica między aktywem a plikiem',
      'Nie wiadomo, czy zapis na webinar zasila jakąkolwiek sekwencję, czy kończy się na przypomnieniu',
      'Nie wiadomo, ile liczy lista mailowa ani jak się zachowuje',
      'Brak widocznej ścieżki od raportu do rozmowy o członkostwie',
    ],
    evidence:
      'Raport i CEE AI Index potwierdzone na aichamber.eu; webinary 15 VII, 4 VIII, 12 VIII, 16 IX 2026 z postów LinkedIn. Bramkowanie i sekwencje są niewidoczne z zewnątrz — wymagają dostępu do panelu.',
  },
  {
    key: 'bofu',
    short: 'BOFU',
    name: 'Decyzja — jak się zostaje członkiem',
    question: 'Ile to kosztuje, co dostaję i kto już to kupił?',
    status: 'kuleje',
    width: 38,
    has: [
      'Jawny cennik składek: 150, 500 i 1 500 EUR rocznie plus 20 EUR opłaty rejestracyjnej',
      'Formularz deklaracji członkowskiej i statut dostępne publicznie',
      'Mocny dowód społeczny w postaci nazwisk — rada doradcza z byłymi ministrami z jedenastu krajów',
      'Nowe stanowisko Partnerships & Membership Growth Manager — etat pod ten właśnie etap',
    ],
    missing: [
      'Ceny partnerstw korporacyjnych ustalane indywidualnie — brak widełek zatrzymuje samodzielną decyzję',
      'Brak case studies pokazujących, co członek realnie zyskał',
      'Lista członków jest nazwiskami firm, nie historiami — logotyp nie sprzedaje składki',
      'Brak widocznego wezwania do rozmowy: nie ma kalendarza, jest adres e-mail',
    ],
    evidence:
      'Składki i opłata rejestracyjna z formularza deklaracji (źródło 35); oferta pracy (źródło 19); lista członków ~90 firm (źródło 12).',
  },
  {
    key: 'retencja',
    short: 'RETENCJA',
    name: 'Utrzymanie — czy ktokolwiek przedłuża',
    question: 'Czy drugi rok jest wart tego, co pierwszy?',
    status: 'nieznane',
    width: 22,
    has: [
      'Seria webinarów tylko dla członków — wyodrębniona wartość za opłatą',
      'Wydarzenia networkingowe o wysokiej frekwencji emocjonalnej (golf, debaty, szczyt)',
    ],
    missing: [
      'Brak jakichkolwiek danych o odnowieniach — dla organizacji składkowej to metryka numer jeden',
      'Nie wiadomo, czy istnieje onboarding nowego członka',
      'Nie wiadomo, czy ktokolwiek mierzy, którzy członkowie korzystają z benefitów, a którzy zniknęli',
    ],
    evidence:
      'Seria „members-only" potwierdzona w poście z 7 lipca 2026. Danych o odnowieniach nie ma w żadnym dostępnym źródle — to największa pojedyncza luka całej analizy.',
  },
];
