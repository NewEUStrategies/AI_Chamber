import type { MarketingAsset } from './types';

/**
 * Rejestr zasobów markowych — co już istnieje i może być
 * wykorzystywane w kanałach, a co trzeba dopiero stworzyć.
 */
export const ASSETS: MarketingAsset[] = [
  {
    key: 'logo-system',
    label: 'System identyfikacji (logo, granat + zieleń)',
    kind: 'Tożsamość',
    cadence: 'stały',
    note: 'Spójny na stronie i większości kreacji LinkedIn; wyjątki to kreacje partnerów (GITEX, europecloud).',
  },
  {
    key: 'dossier',
    label: 'Dossier rozpoznawcze (15 zakładek)',
    kind: 'Wiedza',
    cadence: 'aktualizowany',
    note: 'Największy zasób wiedzy o izbie — dziś wewnętrzny; każda zakładka to gotowy temat publikacji.',
  },
  {
    key: 'raporty',
    label: 'Raporty i stanowiska (Policy Statement)',
    kind: 'Wiedza',
    cadence: 'ad hoc',
    note: 'Materiał do PR i AI search — struktura pod cytowanie przez modele językowe.',
  },
  {
    key: 'karuzele-czlonkowie',
    label: 'Seria „Nowi członkowie" (karuzele)',
    kind: 'Format social',
    cadence: 'comiesięczny',
    note: 'Najmocniejszy format na LinkedIn — karuzele osiągają ~2× więcej reakcji niż grafiki.',
  },
  {
    key: 'rada',
    label: 'Rada doradcza (11 krajów)',
    kind: 'Sieć',
    cadence: 'stały',
    note: 'Niewykorzystany kanał polecenia — potencjał „1 członek = 1 intro" nie jest aktywowany.',
  },
  {
    key: 'newsletter-format',
    label: 'AI Insights CEE',
    kind: 'Format social',
    cadence: 'comiesięczny',
    note: 'Dziś format na LinkedIn, nie lista adresowa — po przeniesieniu na własną bazę stanie się nośnikiem retencji.',
  },
];
