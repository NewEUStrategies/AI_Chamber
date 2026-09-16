/** Wspólne typy widoku marketingowego (dossier rozpoznawcze AI Chamber CEE). */

export type ChannelStatus = 'prowadzony' | 'pilotaz' | 'planowany' | 'do-odradzenia';

export type RoadmapTrack = 'zasieg' | 'popyt' | 'wiarygodnosc' | 'produkt';

export interface IcpSegment {
  key: string;
  label: string;
  /** Udział w populacji firm, do których mierzy izba (szacunek). */
  share: number;
  /** Dopasowanie obecnej oferty do potrzeb segmentu, 0–100. */
  readiness: number;
  headcount: string;
  countries: string[];
  drivers: string[];
  objections: string[];
}

export interface FunnelStage {
  key: string;
  label: string;
  value: number;
  unit: string;
  /** Odsetek przechodzący do etapu następnego, 0–1. */
  conv: number;
  note: string;
}

export interface ChannelRow {
  key: string;
  label: string;
  role: string;
  status: ChannelStatus;
  /** Wkład w koszt godziny zespołu: 1 niski, 2 średni, 3 wysoki. */
  effort: 1 | 2 | 3;
  /** Wpływ na wynik rekrutacyjny: 1 marginalny, 2 zauważalny, 3 istotny. */
  impact: 1 | 2 | 3;
  note: string;
}

export interface RoadmapItem {
  key: string;
  quarter: string;
  title: string;
  track: RoadmapTrack;
  done?: boolean;
  detail: string;
}

export interface MarketingAsset {
  key: string;
  label: string;
  kind: string;
  cadence: string;
  note: string;
}
