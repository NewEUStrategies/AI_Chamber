import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TipState } from './useChartTip';

const GAP = 14;

/**
 * Cursor-following readout for chart hovers, portaled to document.body —
 * ancestors with transforms (e.g. the page fade-in) would otherwise become
 * the containing block and displace the tooltip. Sits right of the cursor,
 * flips to the left near the right edge and below near the top edge.
 */
export function ChartTip({ tip }: { tip: TipState | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    if (!tip) {
      setSize(null);
      return;
    }
    const el = ref.current;
    if (!el) return;
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
  }, [tip]);

  if (!tip) return null;
  const w = size?.w ?? 160;
  const h = size?.h ?? 60;
  const flipX = tip.x + GAP + w > window.innerWidth - 8;
  const below = tip.y - h - GAP < 8;
  const left = flipX ? tip.x - GAP - w : tip.x + GAP;
  const top = below ? tip.y + GAP : tip.y - h - GAP;
  const anchored = size !== null;
  const style = anchored
    ? { left, top }
    : { left: tip.x + GAP, top: tip.y + GAP, opacity: 0 };
  return createPortal(
    <div ref={ref} className="chart-tip" style={style} role="status">
      {tip.title && <span className="t">{tip.title}</span>}
      {tip.rows.map((r) => (
        <span className="r" key={r.label}>
          {r.color && <i className="dot" style={{ background: r.color }} />}
          {r.label}
          <b>{r.value}</b>
        </span>
      ))}
    </div>,
    document.body
  );
}
