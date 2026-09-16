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
    /*
     * Zmiana rozmiaru okna unieważnia kotwicę: `x`/`y` są współrzędnymi
     * viewportu sprzed zmiany, a dymek przykleja się do krawędzi policzonych
     * ze starych wymiarów. Chowamy go, zamiast pokazywać w miejscu, które
     * przestało cokolwiek wskazywać. Dotyczy to głównie obrotu telefonu przy
     * dymku otwartym z klawiatury — wskaźnik myszy sam by go odświeżył.
     *
     * Świadomie bez nasłuchu `scroll`: przeglądarka przewija element przy
     * nadaniu mu fokusu, więc chowanie dymka na przewinięcie gasiłoby dymek
     * wywołany klawiszem Tab. Przy przewijaniu myszą element pod kursorem się
     * zmienia, co i tak wyzwala `pointerleave` i chowa dymek.
     */
    const drop = () => setTip(null);
    window.addEventListener('pointermove', move);
    window.addEventListener('resize', drop);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', drop);
    };
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
