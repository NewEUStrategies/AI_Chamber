import { useState } from 'react';

export interface TipRow {
  label: string;
  value: string;
  color?: string;
}

export interface TipState {
  /** Viewport coordinates the tooltip anchors to (usually the cursor). */
  x: number;
  y: number;
  title?: string;
  rows: TipRow[];
}

/** Hover state + pointer tracking shared by every dossier chart. */
export function useChartTip() {
  const [tip, setTip] = useState<TipState | null>(null);
  return {
    tip,
    show: (e: { clientX: number; clientY: number }, rows: TipRow[], title?: string) =>
      setTip({ x: e.clientX, y: e.clientY, rows, title }),
    hide: () => setTip(null),
  };
}
