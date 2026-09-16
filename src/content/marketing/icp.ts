import type { IcpSegment } from './types';

/**
 * Segmenty ICP odczytane z dossier rozpoznawczego (zakładka „Fit").
 * Udziały to szacunki na bazie profilu członków i kandydatów,
 * nie pomiar — przy tak małej liczbie firm liczy się kolejność,
 * nie wartość.
 */
export const ICP_SEGMENTS: IcpSegment[] = [
  {
    key: 'scaleup',
    label: 'AI scale-up z CEE',
    share: 38,
    readiness: 74,
    headcount: '50–250',
    countries: ['PL', 'CZ', 'RO', 'HU'],
    drivers: [
      'Kredyty handlowe wobec funduszy i korporacji',
      'Wejście do programów unijnych (AI Act, DIGITAL)',
      'Rekrutacja talentów w regionie',
    ],
    objections: [
      'Czynsz członkowski przy spalaniu gotówki',
      'Izba kojarzona z lobbingiem dużych podmiotów',
    ],
  },
  {
    key: 'korporacja',
    label: 'Korporacja z zapleczem AI',
    share: 27,
    readiness: 61,
    headcount: '1000+',
    countries: ['PL', 'DE', 'AT'],
    drivers: [
      'Wpływ na kształt regulacji AI Act na wczesnym etapie',
      'Networking z decydentami Bruksela–Warszawa',
      'Widoczność ESG/technologiczna w regionie',
    ],
    objections: [
      'Decyzja zapada w centrali poza regionem',
      'Własne lobby branżowe już istnieje',
    ],
  },
  {
    key: 'dostawca',
    label: 'Dostawcy infrastruktury i chmur',
    share: 20,
    readiness: 48,
    headcount: '250+',
    countries: ['PL', 'LT', 'SK'],
    drivers: [
      'Dotarcie do buyerów AI ze środka izby',
      'Współtworzenie standardów interoperacyjności',
    ],
    objections: [
      'Izba zrzesza ich klientów, nie ich — ryzyko kanibalizacji',
      'Wolą własne summity (CEE AI Summit jako konkurent)',
    ],
  },
  {
    key: 'instytucja',
    label: 'Kancelarie, think-tanki, media branżowe',
    share: 15,
    readiness: 39,
    headcount: '10–100',
    countries: ['PL', 'BE', 'EE'],
    drivers: [
      'Dostęp do wiedzy członków jako materiału analitycznego',
      'Współprodukcja treści (raporty, webinary)',
    ],
    objections: [
      'Brak budżetu członkowskiego w modelu non-profit',
      'Dla nich izba jest źródłem, nie klientem',
    ],
  },
];

export const ICP_NOTE =
  'Punktem wyjścia jest profil firm już przyjętych i kandydatów w lejku rekrutacji; segmenty bez własnego popytu (instytucje) trafiają do ról partnerskich, nie sprzedażowych.';
