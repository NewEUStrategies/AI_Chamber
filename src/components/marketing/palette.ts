/** Paleta widoku marketingowego — spójna z barwami marki izby. */

export const MKT = {
  navy: '#293277',
  navyDark: '#1d2454',
  navySoft: 'rgba(41, 50, 119, 0.08)',
  green: '#01de99',
  greenDeep: '#00875d',
  greenSoft: 'rgba(1, 222, 153, 0.16)',
  slate: '#64748b',
  slateLight: '#e2e8f0',
  rose: '#e11d48',
  amber: '#d97706',
  sky: '#0284c7',
} as const;

export type MktColor = keyof typeof MKT;

/** Status kanału → kolor kropki statusu. */
export const STATUS_COLOR: Record<string, MktColor> = {
  prowadzony: 'greenDeep',
  pilotaz: 'sky',
  planowany: 'slate',
  'do-odradzenia': 'rose',
};

/** Tor planu → barwa paska na osi czasu. */
export const TRACK_COLOR: Record<string, MktColor> = {
  zasieg: 'sky',
  popyt: 'greenDeep',
  wiarygodnosc: 'navy',
  produkt: 'amber',
};
