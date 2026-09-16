import { useEffect, useState } from 'react';

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
  /** Optional wrapping explanation shown under the title. */
  desc?: string;
  rows: TipRow[];
}

/**
 * Hover state + pointer tracking shared by every dossier chart. While a tip
 * is visible a window-level pointermove listener keeps its position glued to
 * the cursor, so charts only need `show` on enter and `hide` on leave.
 */
export function useChartTip() {
  const [tip, setTip] = useState<TipState | null>(null);
  const visible = tip !== null;

  useEffect(() => {
    if (!visible) return;
    const move = (e: PointerEvent) =>
      setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t));
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [visible]);

  return {
    tip,
    show: (
      e: { clientX: number; clientY: number },
      rows: TipRow[],
      title?: string,
      desc?: string
    ) => setTip({ x: e.clientX, y: e.clientY, rows, title, desc }),
    hide: () => setTip(null),
  };
}
