import { useLayoutEffect, useRef, useState } from 'react';
import type { TipState } from './useChartTip';

/**
 * Fixed-position readout for chart hovers. Anchored to the viewport like the
 * `.term` tooltips so scroll containers can never clip it; flips below the
 * cursor near the top edge and stays inside the horizontal window bounds.
 */
export function ChartTip({ tip }: { tip: TipState | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    if (!tip) {
      setPos(null);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const below = tip.y - h - 14 < 8;
    setPos({
      left: Math.min(Math.max(tip.x - w / 2, 8), window.innerWidth - w - 8),
      top: below ? tip.y + 14 : tip.y - h - 14,
    });
  }, [tip]);

  if (!tip) return null;
  const style = pos ? { left: pos.left, top: pos.top } : { left: tip.x, top: tip.y, opacity: 0 };
  return (
    <div ref={ref} className="chart-tip" style={style} role="status">
      {tip.title && <span className="t">{tip.title}</span>}
      {tip.rows.map((r) => (
        <span className="r" key={r.label}>
          {r.color && <i className="dot" style={{ background: r.color }} />}
          {r.label}
          <b>{r.value}</b>
        </span>
      ))}
    </div>
  );
}
