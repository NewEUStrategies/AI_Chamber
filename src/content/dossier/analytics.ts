/**
 * SimilarWeb traffic data for both AI Chamber properties, March–August 2026.
 *
 * Source: two „Website Analysis" exports (pro.similarweb.com), read 16 Sep 2026
 * — bibliography entries 37 (aichamber.eu) and 38 (ceeaisummit.eu).
 *
 * Everything here is transcribed from the reports. The one exception is
 * `monthly`, which SimilarWeb prints only as a chart: those values are read off
 * the plot and are approximate (level M4). The exact six-month totals come from
 * the report itself and are the numbers to quote.
 */

export interface DomainTraffic {
  domain: string;
  label: string;
  /** Exact six-month total from the report. */
  totalVisits: number;
  /** Month-over-month change of the last month, in percent. */
  changePct: number;
  changeUp: boolean;
  monthlyVisits: number;
  uniqueVisitors: number;
  deduplicatedAudience: number;
  /** Average visit duration, in seconds. */
  visitDurationSec: number;
  visitDurationLabel: string;
  pagesPerVisit: number;
  bounceRatePct: number;
  desktopPct: number;
  mobilePct: number;
  globalRank: number;
  countryRank: number;
  countryRankLabel: string;
  /** Read off the „Visits over time" chart — approximate. */
  monthly: number[];
  brandedPct: number;
  nonBrandedPct: number;
}

/**
 * Thousands separator applied consistently, including four-digit numbers.
 * `toLocaleString('pl-PL')` leaves those ungrouped (CLDR minimumGroupingDigits),
 * which reads inconsistently next to the six-digit ranks in the same table.
 */
export const plNum = (n: number): string =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');

export const MONTHS = ['Mar 26', 'Apr 26', 'May 26', 'Cze 26', 'Lip 26', 'Sie 26'];
export const MONTHS_PL = ['III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export const CHAMBER: DomainTraffic = {
  domain: 'aichamber.eu',
  label: 'AI Chamber',
  totalVisits: 5361,
  changePct: 79.63,
  changeUp: true,
  monthlyVisits: 894,
  uniqueVisitors: 433,
  deduplicatedAudience: 368,
  visitDurationSec: 154,
  visitDurationLabel: '00:02:34',
  pagesPerVisit: 2.01,
  bounceRatePct: 42.99,
  desktopPct: 65.46,
  mobilePct: 34.54,
  globalRank: 9618180,
  countryRank: 183833,
  countryRankLabel: 'Polska',
  monthly: [480, 405, 295, 1780, 875, 1550],
  brandedPct: 52,
  nonBrandedPct: 48,
};

export const SUMMIT: DomainTraffic = {
  domain: 'ceeaisummit.eu',
  label: 'CEE AI Summit',
  totalVisits: 1871,
  changePct: 151.17,
  changeUp: true,
  monthlyVisits: 624,
  uniqueVisitors: 287,
  deduplicatedAudience: 242,
  visitDurationSec: 55,
  visitDurationLabel: '00:00:55',
  pagesPerVisit: 2.48,
  bounceRatePct: 40.26,
  desktopPct: 69.7,
  mobilePct: 30.3,
  globalRank: 12067488,
  countryRank: 216513,
  countryRankLabel: 'Polska',
  monthly: [0, 0, 0, 265, 460, 1150],
  brandedPct: 26,
  nonBrandedPct: 74,
};

/* ---------- marketing channels ---------- */

export interface Channel {
  key: string;
  label: string;
  chamber: number;
  summit: number;
}

export const CHANNELS: Channel[] = [
  { key: 'direct', label: 'Bezpośrednie', chamber: 30.3, summit: 35.51 },
  { key: 'organic', label: 'Wyszukiwarka organiczna', chamber: 31.0, summit: 30.73 },
  { key: 'paid-search', label: 'Wyszukiwarka płatna', chamber: 2.72, summit: 2.48 },
  { key: 'referrals', label: 'Odesłania', chamber: 10.68, summit: 12.47 },
  { key: 'display', label: 'Display', chamber: 5.3, summit: 4.28 },
  { key: 'organic-social', label: 'Social organiczny', chamber: 6.57, summit: 6.35 },
  { key: 'paid-social', label: 'Social płatny', chamber: 1.43, summit: 1.4 },
  { key: 'gen-ai', label: 'Gen AI', chamber: 2.41, summit: 1.59 },
  { key: 'email', label: 'E-mail', chamber: 5.24, summit: 3.29 },
  { key: 'affiliates', label: 'Afiliacja', chamber: 4.34, summit: 1.9 },
];

/* ---------- geography ---------- */

export interface CountryShare {
  country: string;
  sharePct: number;
  changePct: number | null;
  changeUp: boolean | null;
}

export const CHAMBER_COUNTRIES: CountryShare[] = [
  { country: 'Polska', sharePct: 83.97, changePct: 99.81, changeUp: true },
  { country: 'Bułgaria', sharePct: 12.22, changePct: null, changeUp: null },
  { country: 'Niemcy', sharePct: 3.15, changePct: 66.22, changeUp: false },
  { country: 'Rumunia', sharePct: 0.66, changePct: null, changeUp: null },
];

export const SUMMIT_COUNTRIES: CountryShare[] = [
  { country: 'Polska', sharePct: 100, changePct: 151.17, changeUp: true },
];

/* ---------- organic search ---------- */

export interface SearchTerm {
  term: string;
  sharePct: number;
}

export const CHAMBER_TERMS: SearchTerm[] = [
  { term: 'ai summit prague', sharePct: 50.66 },
  { term: 'when did musk predict agi?', sharePct: 18.42 },
  { term: 'cee ai hub logo', sharePct: 11.84 },
  { term: 'cee ai summit prague', sharePct: 8.55 },
  { term: 'aiczamber', sharePct: 7.89 },
];

export const SUMMIT_TERMS: SearchTerm[] = [
  { term: 'ai summit prague', sharePct: 39.02 },
  { term: 'cee ai summit prague', sharePct: 31.71 },
  { term: 'ai cee summit', sharePct: 26.83 },
  { term: 'ai future cee', sharePct: 2.44 },
];

/* ---------- referral flow ---------- */

export interface LinkShare {
  domain: string;
  sharePct: number;
  /** SimilarWeb could not attribute this slice to a named domain. */
  unattributed?: boolean;
}

export const CHAMBER_INCOMING: LinkShare[] = [{ domain: 'nieprzypisane', sharePct: 100, unattributed: true }];
export const CHAMBER_OUTGOING: LinkShare[] = [
  { domain: 'ceeaisummit.eu', sharePct: 71.14 },
  { domain: 'linkedin.com', sharePct: 28.86 },
];
export const SUMMIT_INCOMING: LinkShare[] = [
  { domain: 'aichamber.eu', sharePct: 75.95 },
  { domain: 'nieprzypisane', sharePct: 24.05, unattributed: true },
];
export const SUMMIT_OUTGOING: LinkShare[] = [{ domain: 'linkedin.com', sharePct: 100 }];

/* ---------- summit speakers ---------- */

export interface Speaker {
  name: string;
  role: string;
  country: string;
  tier: 'eu' | 'government';
}

/** Announced on ceeaisummit.eu; read from the site preview in the report. */
export const SUMMIT_SPEAKERS: Speaker[] = [
  {
    name: 'Ekaterina Zaharieva',
    role: 'Komisarz UE ds. startupów, badań i innowacji',
    country: 'Komisja Europejska',
    tier: 'eu',
  },
  {
    name: 'Karel Havlíček',
    role: 'Wicepremier, minister przemysłu i handlu',
    country: 'Czechy',
    tier: 'government',
  },
  {
    name: 'Krzysztof Gawkowski',
    role: 'Wicepremier, minister cyfryzacji',
    country: 'Polska',
    tier: 'government',
  },
  {
    name: 'Zoltán Tanács',
    role: 'Minister nauki i technologii',
    country: 'Węgry',
    tier: 'government',
  },
  {
    name: 'Samuel Migaľ',
    role: 'Minister inwestycji, rozwoju regionalnego i informatyzacji',
    country: 'Słowacja',
    tier: 'government',
  },
  {
    name: 'Dariusz Standerski',
    role: 'Sekretarz stanu w Ministerstwie Cyfryzacji',
    country: 'Polska',
    tier: 'government',
  },
];

/* ---------- derived figures used in the copy ---------- */

export const DERIVED = {
  /** Share of the summit's six-month traffic that fell in August alone. */
  summitAugustShare: Math.round((SUMMIT.monthly[5] / SUMMIT.totalVisits) * 100),
  /** Share of the chamber's six-month traffic that fell in June alone. */
  chamberJuneShare: Math.round((CHAMBER.monthly[3] / CHAMBER.totalVisits) * 100),
  /** Chamber non-branded searches that are actually looking for the summit. */
  chamberSummitTermShare: Number((CHAMBER_TERMS[0].sharePct + CHAMBER_TERMS[3].sharePct).toFixed(2)),
  /** Summit non-branded searches that are name variants of the event. */
  summitNameTermShare: Number(
    (SUMMIT_TERMS[0].sharePct + SUMMIT_TERMS[1].sharePct + SUMMIT_TERMS[2].sharePct).toFixed(2)
  ),
  /** Visits per unique visitor. */
  chamberVisitsPerVisitor: Number((CHAMBER.monthlyVisits / CHAMBER.uniqueVisitors).toFixed(2)),
  summitVisitsPerVisitor: Number((SUMMIT.monthlyVisits / SUMMIT.uniqueVisitors).toFixed(2)),
  /** How many times longer a chamber visit lasts than a summit visit. */
  durationRatio: Number((CHAMBER.visitDurationSec / SUMMIT.visitDurationSec).toFixed(1)),
};
