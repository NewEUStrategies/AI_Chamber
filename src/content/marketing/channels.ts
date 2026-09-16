import type { AssetRow, ChannelRow, Gap } from './types';

/**
 * Effort and impact are both assessed on a 1–5 scale, not measured. Effort
 * reads off observable cadence and production value; impact off whatever
 * outcome evidence exists. Where impact is genuinely unobservable the row is
 * marked `nieznane` and placed at its evidenced floor, never at a flattering
 * guess.
 */
export const CHANNELS: ChannelRow[] = [
  {
    channel: 'Wydarzenia własne',
    effort: 5,
    impact: 5,
    status: 'dziala',
    funnel: 'TOFU',
    evidence: 'CEE AI Summit: 250+ uczestników, Deklaracja Praska podpisana przez dziewięć państw, komisarz KE na scenie. Relacja zdjęciowa to najmocniejszy post w historii kanału — 75 reakcji.',
    verdict: 'Najlepsze, co mają. Silnik, nie dźwignia — kosztuje tyle, ile daje, ale daje najwięcej.',
  },
  {
    channel: 'Rzecznictwo regulacyjne',
    effort: 5,
    impact: 4,
    status: 'dziala',
    funnel: 'TOFU',
    evidence: 'Powołanie do European AI Act Advisory Forum, listy otwarte współpodpisane przez dwanaście organizacji z regionu, stanowisko wobec polskiej ustawy o AI.',
    verdict: 'Buduje kapitał polityczny, którego nikt w regionie nie ma. Nie jest jednak spięte ze sprzedażą — to najdroższy nieskonwertowany atut.',
  },
  {
    channel: 'Media i karty eksperckie',
    effort: 2,
    impact: 4,
    status: 'dziala',
    funnel: 'MOFU',
    evidence: 'Obecność w Rzeczpospolitej, wirtualnemedia, My Company Polska i dlahandlu.pl. Format użyty czterokrotnie przy bazie około dziewięćdziesięciu firm członkowskich.',
    verdict: 'Dźwignia. Tani format, który jednocześnie buduje pozycję członka i izby — i jedyny, który daje członkowi coś, czym pochwali się u siebie.',
  },
  {
    channel: 'Partnerstwa ekosystemowe',
    effort: 2,
    impact: 4,
    status: 'dziala',
    funnel: 'TOFU',
    evidence: 'GITEX AI Europe, Vilnius AI Summit, Carpathian Drone Summit, Master Business Forum — udział w roli partnera ekosystemowego, na cudzym zasięgu.',
    verdict: 'Dźwignia. Niski koszt wejścia, cudza publiczność. Brakuje mechanizmu przechwytywania kontaktu z tych wydarzeń.',
  },
  {
    channel: 'LinkedIn organiczny',
    effort: 4,
    impact: 3,
    status: 'kuleje',
    funnel: 'TOFU',
    evidence: '3 067 obserwujących, mediana 14 reakcji na post, 27 postów w trzy miesiące. Posty ze zdjęciami ludzi biją resztę 3,7-krotnie, ale stanowią 11% publikacji.',
    verdict: 'Pracuje, lecz nakład idzie w formaty o najsłabszym zwrocie. Odwrócenie proporcji nie kosztuje nic poza decyzją.',
  },
  {
    channel: 'Webinary i transmisje',
    effort: 3,
    impact: 3,
    status: 'kuleje',
    funnel: 'MOFU',
    evidence: 'Cztery webinary w oknie analizy. Dwie transmisje na żywo zebrały 22 z 48 komentarzy całego kanału — to jedyne miejsce, gdzie toczy się rozmowa.',
    verdict: 'Format sprawdzony, ale nie wiadomo, co dzieje się z zapisem. Bez sekwencji po webinarze to koszt bez zwrotu.',
  },
  {
    channel: 'Newsletter',
    effort: 2,
    impact: 2,
    status: 'nieznane',
    funnel: 'MOFU',
    evidence: 'Prowadzony dwutorowo: własny oraz „AI Insights CEE" na LinkedIn. Wydania czerwiec, sierpień, wrzesień zebrały odpowiednio 11, 8 i 15 reakcji.',
    verdict: 'Jedyne miejsce, gdzie izba ma listę niezależną od algorytmu. Wielkość listy i otwarcia są niewidoczne z zewnątrz — to może być ich najmocniejszy albo najsłabszy kanał.',
  },
  {
    channel: 'Wyszukiwarka',
    effort: 1,
    impact: 1,
    status: 'brak',
    funnel: 'TOFU',
    evidence: 'Siedem fraz z pozycją w polskiej bazie, sześć wizyt organicznych miesięcznie. Cztery z siedmiu fraz prowadzą na stronę pola golfowego.',
    verdict: 'Kanał nie istnieje. Przy Authority Score 14 i profilu linkowym pełnym szumu odbudowa to kwestia kwartałów, nie tygodni.',
  },
  {
    channel: 'Facebook',
    effort: 1,
    impact: 1,
    status: 'brak',
    funnel: 'TOFU',
    evidence: 'Mediana jedna reakcja, zero komentarzy w dwunastu postach, 41 dni ciszy obejmujące własny szczyt w Pradze, zero opinii na stronie.',
    verdict: 'Nie jest neutralny — jest podlinkowany z witryny i pracuje przeciwko sprzedaży członkostwa. Zamknąć albo przypisać właściciela.',
  },
];

/**
 * The asset inventory is the honest part of this analysis: for most rows the
 * outside view can confirm the asset exists but not whether it captures a
 * contact. `gated: 'nieznane'` is the single most repeated value here, and that
 * repetition is itself the finding.
 */
export const ASSETS: AssetRow[] = [
  { name: 'Raport „How do SMEs in CEE find their way in the world of AI?"', kind: 'badanie własne', exists: 'tak', gated: 'nieznane', funnel: 'MOFU', note: '3 200 respondentów z 11 krajów. Najmocniejszy magnes, jaki mają. Nie wiadomo, czy pobranie wymaga adresu e-mail — a to decyduje, czy to aktywo, czy plik.' },
  { name: 'CEE AI Index 2026', kind: 'benchmark', exists: 'tak', gated: 'nieznane', funnel: 'MOFU', note: 'Ranking gotowości regionu, ogłoszony 8 czerwca. Benchmark to format, po który wraca się co roku — idealny pod cykliczne przechwytywanie kontaktu.' },
  { name: 'Newsletter „AI Insights CEE"', kind: 'lista mailowa', exists: 'tak', gated: 'tak', funnel: 'MOFU', note: 'Zapis wymaga subskrypcji, więc kontakt jest przechwytywany. Wielkość listy nieznana.' },
  { name: 'Webinary', kind: 'wydarzenie online', exists: 'tak', gated: 'tak', funnel: 'MOFU', note: 'Zapis przez formularz LinkedIn Events. Nie wiadomo, czy dane trafiają gdziekolwiek poza powiadomienie o starcie.' },
  { name: 'Stanowiska i listy otwarte', kind: 'dokument policy', exists: 'tak', gated: 'nie', funnel: 'TOFU', note: 'Otwarte i dobrze, że otwarte — to materiał budujący pozycję, nie generujący leada.' },
  { name: 'Formularz deklaracji członkowskiej', kind: 'konwersja', exists: 'tak', gated: 'tak', funnel: 'BOFU', note: 'Istnieje i ma jawny cennik. Brak widocznej alternatywy dla niezdecydowanych — nie ma „porozmawiajmy", jest „wypełnij i zapłać".' },
  { name: 'Case study członka', kind: 'dowód społeczny', exists: 'nie', gated: 'nie', funnel: 'BOFU', note: 'Nie istnieje. To brakujące ogniwo między listą logotypów a decyzją o wydatku — zwłaszcza dla dyrektora finansowego.' },
  { name: 'Kalkulator zgodności z AI Act', kind: 'narzędzie', exists: 'nie', gated: 'nie', funnel: 'MOFU', note: 'Nie istnieje. Izba ma wiedzę regulacyjną, której nikt w regionie nie ma, i nie zamieniła jej w narzędzie przechwytujące kontakt.' },
  { name: 'Onboarding nowego członka', kind: 'retencja', exists: 'nieznane', gated: 'nie', funnel: 'retencja', note: 'Niewidoczny z zewnątrz. Przy modelu składkowym pierwsze trzydzieści dni decyduje o odnowieniu.' },
];

/** What cannot be answered without access, and what it costs to get it. */
export const GAPS: Gap[] = [
  { what: 'Analityka witryny i Search Console', blocks: 'Cały lejek — bez tego nie wiadomo, ile osób dociera do formularza ani skąd.', howToGet: 'Prośba o dostęp do konta. Jeśli nie jest wpięte — wpięcie to jedno popołudnie.', effort: 'niski' },
  { what: 'Zasięgi i wyświetlenia z panelu LinkedIn', blocks: 'Rozróżnienie, czy słaby post ma słaby zasięg, czy dobry zasięg i słabą treść. To dwa różne problemy.', howToGet: 'Eksport XLSX z zakładki Analiza na stronie firmowej. Pięć minut, jeśli ma się uprawnienia administratora.', effort: 'niski' },
  { what: 'Wielkość listy mailowej i wskaźniki otwarć', blocks: 'Ocenę najsilniejszego zwykle kanału w B2B, który tu jest całkowicie niewidoczny.', howToGet: 'Panel narzędzia do wysyłki.', effort: 'niski' },
  { what: 'Rozkład członków na pakiety i liczba odnowień', blocks: 'Przychód ze składek zostaje przedziałem 13,5–135 tys. EUR. Dziesięciokrotna rozpiętość to nie jest liczba, na której da się planować.', howToGet: 'Zestawienie z systemu członkowskiego albo z księgowości.', effort: 'średni' },
  { what: 'Budżet marketingowy', blocks: 'Każde zdanie o zwrocie z inwestycji. Bez kosztu nie ma efektywności, jest tylko aktywność.', howToGet: 'Rozmowa z zarządem.', effort: 'niski' },
  { what: 'Ścieżka zapisu z webinaru', blocks: 'Ocenę, czy MOFU w ogóle domyka się w kontakt, czy kończy na powiadomieniu.', howToGet: 'Sprawdzenie, gdzie trafiają dane z formularza LinkedIn Events.', effort: 'niski' },
];
