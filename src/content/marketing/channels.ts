import type { ChannelRow } from './types';

export const CHANNEL_STATUS_LABEL: Record<ChannelRow['status'], string> = {
  prowadzony: 'Prowadzony',
  pilotaz: 'Pilotaż',
  planowany: 'Planowany',
  'do-odradzenia': 'Do odradzenia',
};

/** Macierz kanałów — ocena wg obecnych danych, nie ambicji. */
export const CHANNELS: ChannelRow[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn (profil firmowy)',
    role: 'Kanał wzrostu i domu treści',
    status: 'prowadzony',
    effort: 3,
    impact: 3,
    note: 'Jedyny kanał z pomiarem: 3067 obserwujących, mediana ~11 reakcji, karuzele 2× mocniejsze od pojedynczych grafik.',
  },
  {
    key: 'newsletter',
    label: 'AI Insights CEE (newsletter)',
    role: 'Retencja i głębia',
    status: 'prowadzony',
    effort: 2,
    impact: 2,
    note: 'Prowadzony jako format na LinkedIn, nie baza adresowa — brak zapisu i open rate, brak pomiaru.',
  },
  {
    key: 'wydarzenia',
    label: 'Wydarzenia własne i stoiska',
    role: 'Przemysłowy lider konwersji',
    status: 'prowadzony',
    effort: 3,
    impact: 3,
    note: 'Webinary Funding & Growth, GITEX Europe; większość leadów rodzi się z kontaktu osobistego, nie online.',
  },
  {
    key: 'seo',
    label: 'SEO / treści na aichamber.eu',
    role: 'Popyt organiczny',
    status: 'do-odradzenia',
    effort: 2,
    impact: 1,
    note: '54 frazy organiczne, wszystkie przypadkowe i ogólnobranżowe; zero fraz o izbie, członkostwie czy summicie.',
  },
  {
    key: 'pr-media',
    label: 'PR i obecność w mediach',
    role: 'Wiarygodność',
    status: 'pilotaz',
    effort: 2,
    impact: 2,
    note: "Realne publikacje (Rz, euronews) — ale brak spójnego systemu odbioru i reuse'u cytowań.",
  },
  {
    key: 'partnerstwa',
    label: 'Partnerstwa media (The Recursive, Search On)',
    role: 'Zasięg wypożyczony',
    status: 'pilotaz',
    effort: 1,
    impact: 2,
    note: 'Banery partnerskie działają jako „social proof", ale nie generują klików do formularza.',
  },
  {
    key: 'ai-search',
    label: 'Widoczność w wyszukiwarkach AI',
    role: 'Nowy kanał referencyjny',
    status: 'planowany',
    effort: 2,
    impact: 2,
    note: 'Obecnie 0 wzmianek w ChatGPT/Gemini; 6 cytowanych stron bez wymieniania marki — do zdobycia jako pierwszy w regionie.',
  },
  {
    key: 'distributions',
    label: 'Własne kontakty / outbound',
    role: 'Aktywacja sieci członków',
    status: 'planowany',
    effort: 3,
    impact: 3,
    note: 'Sieć rad doradczych (11 krajów) nie jest aktywowana do polecenia członkostwa — potencjał „1 przedstawiciel = 1 intro".',
  },
];

export const CHANNEL_NOTE =
  'Oceny wg danych z odczytów SimilarWeb/Semrush i obserwacji treści; kanały oznaczone jako planowane nie mają pomiaru, bo nie zostały uruchomione.';
