import type { BuyingRole, IcpSegment } from './types';

/**
 * Who AI Chamber should be selling membership to, and who inside those
 * companies actually decides. Segments are ranked by fit, not by size — the
 * biggest pool is not automatically the best one to chase with a two-person
 * commercial function.
 */
export const SEGMENTS: IcpSegment[] = [
  {
    name: 'Polskie MŚP wdrażające AI',
    size: 'największa pula w regionie',
    fit: 5,
    status: 'kuleje',
    why: 'Izba ma o nich własne badanie i zna ich problem lepiej niż ktokolwiek w regionie. Trzy czwarte deklaruje używanie AI, ale tylko jedna czwarta na skalę — to dokładnie luka, którą izba obiecuje zasypać.',
    evidence: 'Raport „How do SMEs in CEE find their way in the world of AI?" — 3 200 respondentów z jedenastu krajów.',
  },
  {
    name: 'Dostawcy rozwiązań AI',
    size: 'trzon obecnej bazy',
    fit: 5,
    status: 'dziala',
    why: 'Kupują widoczność i dostęp do klientów, nie wiedzę. Są najłatwiejsi do pozyskania, bo korzyść jest natychmiastowa, i najłatwiejsi do stracenia, gdy przestaje spływać.',
    evidence: 'Lista członków obejmuje ElevenLabs i ICEYE; karty eksperckie promują członków-dostawców w Rzeczpospolitej i wirtualnemedia.',
  },
  {
    name: 'Firmy w branżach regulowanych',
    size: 'wąska, ale zamożna',
    fit: 4,
    status: 'kuleje',
    why: 'AI Act to dla nich koszt i ryzyko, a izba zasiada przy stole, przy którym te przepisy powstają. Najmocniejszy argument sprzedażowy, jaki mają — i najsłabiej wykorzystany komercyjnie.',
    evidence: 'Powołanie do European AI Act Advisory Forum przy Komisji Europejskiej; konsultacje systemów wysokiego ryzyka; listy otwarte ws. Digital Omnibus.',
  },
  {
    name: 'Startupy AI szukające finansowania',
    size: 'liczna, ale uboga',
    fit: 3,
    status: 'kuleje',
    why: 'Chętnie przyjdą na webinar o finansowaniu, rzadziej zapłacą składkę. Dobre paliwo do budowania zasięgu i listy, słabe do przychodu — chyba że pakiet startowy jest realnie tani.',
    evidence: 'Seria Funding & Growth (webinar „Beyond Venture Capital", 7 lipca; „Not Just Horizon Europe", 16 września).',
  },
  {
    name: 'Instytucje publiczne i samorządy',
    size: 'nieliczna',
    fit: 2,
    status: 'nieznane',
    why: 'Politycznie cenni jako partnerzy i sygnatariusze, ale rzadko płacą składkę członkowską. Traktować jako kapitał relacyjny, nie jako segment przychodowy.',
    evidence: 'Deklaracja Praska podpisana przez dziewięć państw; współpraca z czeskim ministerstwem przemysłu i CNAIP.',
  },
];

/**
 * A chamber sells to a committee, not to a person. `reachedVia: null` marks a
 * role no current channel speaks to — those are the holes that make deals stall
 * late, after the enthusiast inside the company has already said yes.
 */
export const ROLES: BuyingRole[] = [
  {
    role: 'Założyciel lub prezes MŚP',
    weight: 'decyduje',
    wants: 'Dostęp do klientów i wiarygodność, która skraca cykl sprzedaży jego własnej firmy.',
    blocks: 'Nie widzi, co konkretnie dostanie za 1 500 EUR — lista logotypów to nie jest odpowiedź.',
    reachedVia: 'LinkedIn, wydarzenia networkingowe, karty eksperckie w mediach',
  },
  {
    role: 'Dyrektor ds. technologii lub AI',
    weight: 'wpływa',
    wants: 'Wiedzę, czego wymaga regulator, i benchmark, gdzie jest na tle rynku.',
    blocks: 'Treści izby są ogólne — brakuje materiału, który wnosi coś do jego pracy w poniedziałek rano.',
    reachedVia: 'Webinary, raporty, newsletter',
  },
  {
    role: 'Dział prawny i compliance',
    weight: 'wpływa',
    wants: 'Pewność, jak czytać AI Act, i wcześniejsze ostrzeżenie o zmianach.',
    blocks: 'Nie wie, że izba istnieje — komunikacja o rzecznictwie idzie do decydentów w Brukseli, nie do prawników w firmach.',
    reachedVia: null,
  },
  {
    role: 'Dyrektor finansowy',
    weight: 'płaci',
    wants: 'Uzasadnienie wydatku w kategoriach zwrotu, nie przynależności.',
    blocks: 'Brak jakiegokolwiek materiału przeliczającego składkę na korzyść — żadnego case study, żadnej liczby.',
    reachedVia: null,
  },
  {
    role: 'Marketing i komunikacja',
    weight: 'używa',
    wants: 'Powodów do dumy i materiału do własnych kanałów: wystąpień, cytatów, obecności w mediach.',
    blocks: 'Nikt im nie mówi wprost, że karta ekspercka w Rzeczpospolitej jest częścią członkostwa.',
    reachedVia: 'Karty eksperckie, zaproszenia na panele',
  },
];
