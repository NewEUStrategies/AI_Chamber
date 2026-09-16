import type { ReactNode } from 'react';
import { ChartTip } from './ChartTip';
import { useChartTip } from './useChartTip';

/**
 * Metric tile that keeps the existing `.metric` markup and adds a
 * cursor-following explanation of what the figure measures.
 */
export function Metric({
  n,
  l,
  cls,
  title,
  info,
}: {
  n: ReactNode;
  l: ReactNode;
  cls?: 'amber' | 'cyan';
  title: string;
  info: string;
}) {
  const tip = useChartTip();
  const show = (e: { clientX: number; clientY: number }) => tip.show(e, [], title, info);
  return (
    <div
      className={`metric${cls ? ` ${cls}` : ''}`}
      onMouseEnter={show}
      onMouseMove={show}
      onMouseLeave={tip.hide}
    >
      <div className="n">{n}</div>
      <div className="l">{l}</div>
      <ChartTip tip={tip.tip} />
    </div>
  );
}
