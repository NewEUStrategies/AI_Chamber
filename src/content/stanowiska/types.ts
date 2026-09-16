/**
 * Karty stanowiskowe działu marketingu.
 *
 * Dane płacowe pochodzą z trzech różnych pomiarów, które mierzą różne
 * fragmenty rynku, i dlatego podawane są osobno, nigdy jako jedna liczba.
 * Rekomendacja jest czwartą, odrębną pozycją — decyzją, nie odczytem — i tak
 * jest oznaczona wszędzie, gdzie się pojawia.
 */

export type RoleKey = 'dyr' | 'mgr' | 'senior' | 'digital' | 'koord';

/** Kwartyle z badania płacowego: mediana ogólnopolska i jej rozrzut. */
export interface Quartiles {
  q1: number;
  med: number;
  q3: number;
}

export interface Pay {
  /** Badanie płacowe, cała Polska. */
  base: Quartiles;
  baseSrc: string;
  baseNote?: string;
  /** Rynek rekrutacyjny dla Warszawy: [dół, góra]. */
  rec: [number, number];
  recNote: string;
  /** Rekomendacja dla izby, Warszawa: [dół, góra]. */
  izba: [number, number];
  /** Punkt, na którym zależy zamawiającemu — rysowany jako znacznik. */
  target?: [number, number];
  targetNote?: string;
  /** Mediana z Goldman Recruitment, tam gdzie istnieje. */
  gold?: number;
}

export interface Section {
  title: string;
  items: string[];
}

export interface FocusSlice {
  label: string;
  pct: number;
}

export interface Role {
  key: RoleKey;
  /** Numer porządkowy karty: A–E. */
  letter: string;
  title: string;
  english: string;
  /** Poziom w strukturze, od zarządczego po operacyjny. */
  level: string;
  /** Jedno zdanie: za co odpowiada. */
  oneLine: string;
  purpose: string;
  facts: { label: string; value: string }[];
  duties: Section[];
  decides: string[];
  needsApproval: string[];
  outOfScope: string[];
  delegationErrors: string[];
  focus: FocusSlice[];
  metrics: string[];
  hardSkills: string[];
  softSkills: string[];
  tools: string[];
  path: string;
  pay: Pay;
}

/** Wiersz macierzy rozgraniczeń. */
export type Ownership = 'O' | 'W' | 'K' | '-';

export interface MatrixRow {
  task: string;
  cells: Record<RoleKey, Ownership>;
  /** Wyjaśnienie dla wiersza, który celowo nie ma właściciela. */
  note?: string;
}

export interface SpecialistRole {
  name: string;
  band: [number, number];
  what: string;
  verdict: string;
  verdictLabel: 'kompetencja, nie etat' | 'nie w izbie' | 'najbliżej potrzeb izby' | 'nie dotyczy';
  goesInto: string;
}

export interface Source {
  key: string;
  name: string;
  title: string;
  url: string;
  pub: string;
  note: string;
  /** Synteza własna, nie pomiar zewnętrzny. */
  own?: boolean;
}
