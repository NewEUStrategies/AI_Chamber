import type { FunnelStage } from './types';

/**
 * Lejek marketingowy sklejony z dwóch odczytów: SimilarWeb (ruch całkowity,
 * 894 wizyty/mies.) i Semrush (ruch organiczny 7 wizyt/mies. — pomiar
  nieistotny statystycznie, w lejku liczy się rząd wielkości).
 * Konwersje na etapach popytu to obserwacje procesu rekrutacji, nie pomiar.
 */
export const FUNNEL_STAGES: FunnelStage[] = [
  {
    key: 'odbiorcy',
    label: 'Odbiorcy w zasięgu stałym',
    value: 3067,
    unit: 'obserwujących LinkedIn',
    conv: 0.012,
    note: 'Zasięg organiczny postów rzędu kilku–kilkunastu reakcji przy tej bazie.',
  },
  {
    key: 'klik',
    label: 'Kontakt z treścią',
    value: 894,
    unit: 'wizyt/mies. na aichamber.eu',
    conv: 0.03,
    note: 'Ruch z wszystkich kanałów (SimilarWeb); 31% organiczne, reszta direct i social.',
  },
  {
    key: 'lead',
    label: 'Zapytanie o członkostwo',
    value: 27,
    unit: 'formularz + e-mail, kwartał',
    conv: 0.44,
    note: 'W większości przypadków po osobistym kontakcie na wydarzeniu, nie po treści.',
  },
  {
    key: 'rozmowa',
    label: 'Rozmowa rekrutacyjna',
    value: 12,
    unit: 'umówionych spotkań, kwartał',
    conv: 0.58,
    note: 'Tu przejmuje pulpit rekrutacyjny — dalej patrz zakładka „Pulpit".',
  },
  {
    key: 'czlonek',
    label: 'Członek izby',
    value: 7,
    unit: 'podpisanych, kwartał',
    conv: 0,
    note: 'Finalna konwersja lejka; przy tym kroku retencja > pozyskanie.',
  },
];

export const FUNNEL_NOTE =
  'Największy przeciek jest między zasięgiem a kontaktem z treścią — profil linkowy i treści nie generują ruchu tematycznego. Drugi przeciek, lead→rozmowa, wynika z braku follow-upu po wydarzeniach.';
