import { DOMAIN_HEALTH } from '@/content/dossier/seo';
import { plNum } from '@/content/dossier/analytics';
import { Term } from '@/components/dossier/Term';
import { useState } from 'react';
import { INK, SERIES } from './trafficPalette';
import { ChartTip } from './ChartTip';
import { useChartTip } from './useChartTip';

const W = 720;
const H = 180;
const PAD = { top: 18, right: 20, bottom: 30, left: 40 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MIN = 10;
const MAX = 22;

const x = (i: number) => PAD.left + (i / (DOMAIN_HEALTH.asTrend.length - 1)) * PLOT_W;
const y = (v: number) => PAD.top + PLOT_H - ((v - MIN) / (MAX - MIN)) * PLOT_H;

/** Headline domain metrics plus the twelve-month Authority Score trend. */
export function SeoHealth() {
  const d = DOMAIN_HEALTH.asTrend.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const peak = Math.max(...DOMAIN_HEALTH.asTrend);
  const peakIndex = DOMAIN_HEALTH.asTrend.indexOf(peak);
  const [active, setActive] = useState<number | null>(null);
  const tip = useChartTip();
  const columnW = PLOT_W / (DOMAIN_HEALTH.asTrend.length - 1);

  const activate = (i: number) => (e: { clientX: number; clientY: number }) => {
    setActive(i);
    tip.show(e, [{ label: 'Authority Score', value: `${DOMAIN_HEALTH.asTrend[i]} pkt` }], DOMAIN_HEALTH.asTrendLabels[i]);
  };
  const deactivate = () => {
    setActive(null);
    tip.hide();
  };

  return (
    <div className="space-y-5">
      <div className="metrics c4">
        <div className="metric amber">
          <div className="n">{DOMAIN_HEALTH.authorityScore}</div>
          <div className="l">
            <Term k="AS">Authority Score</Term> — skala 0–100
          </div>
        </div>
        <div className="metric">
          <div className="n">{plNum(DOMAIN_HEALTH.referringDomains)}</div>
          <div className="l">
            <Term k="domena odsyłająca">domen odsyłających</Term>
          </div>
        </div>
        <div className="metric">
          <div className="n">{plNum(DOMAIN_HEALTH.backlinks)}</div>
          <div className="l">
            <Term k="link zwrotny">linków zwrotnych</Term> ogółem
          </div>
        </div>
        <div className="metric cyan">
          <div className="n">{plNum(DOMAIN_HEALTH.referringUrls)}</div>
          <div className="l">odsyłających adresów URL</div>
        </div>
      </div>

      <div className="card">
        <h3>
          <Term k="AS">Authority Score</Term> przez dwanaście miesięcy
        </h3>
        <p>
          Wrzesień 2025 – wrzesień 2026. Skok do dwudziestu punktów w lipcu i sierpniu, a potem powrót
          do czternastu, to ślad korekty po stronie Semrush, nie realnej zmiany siły domeny.
        </p>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-4 block h-auto w-full"
          role="img"
          aria-label="Authority Score domeny aichamber.eu od września 2025 do września 2026, w przedziale od 12 do 20 punktów"
        >
          {[10, 14, 18, 22].map((t) => (
            <g key={t}>
              <line x1={PAD.left} y1={y(t)} x2={W - PAD.right} y2={y(t)} stroke={INK.grid} strokeWidth="1" />
              <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fontWeight="600" fill={INK.dim}>
                {t}
              </text>
            </g>
          ))}
          {active !== null && (
            <line
              x1={x(active)}
              y1={PAD.top}
              x2={x(active)}
              y2={PAD.top + PLOT_H}
              stroke={INK.dim}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}
          <path d={d} fill="none" stroke={SERIES.chamber} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {DOMAIN_HEALTH.asTrend.map((v, i) => (
            <circle
              key={i}
              cx={x(i)}
              cy={y(v)}
              r={active === i ? 5.5 : i === peakIndex ? 5 : 3.5}
              fill={SERIES.chamber}
              stroke="#fff"
              strokeWidth="2"
              className="pointer-events-none transition-all duration-150"
            />
          ))}
          {active !== null && (
            <text
              x={x(active)}
              y={y(DOMAIN_HEALTH.asTrend[active]) - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill={INK.strong}
            >
              {DOMAIN_HEALTH.asTrend[active]}
            </text>
          )}
          {DOMAIN_HEALTH.asTrendLabels.map((m, i) =>
            i % 2 === 0 ? (
              <text
                key={m}
                x={x(i)}
                y={H - 10}
                textAnchor="middle"
                fontSize="10"
                fontWeight={active === i ? '800' : '600'}
                fill={active === i ? INK.strong : INK.muted}
                className="pointer-events-none"
              >
                {m}
              </text>
            ) : null
          )}
          {DOMAIN_HEALTH.asTrend.map((_, i) => (
            <rect
              key={`hit-${i}`}
              x={x(i) - columnW / 2}
              y={PAD.top}
              width={columnW}
              height={PLOT_H}
              fill="transparent"
              onMouseEnter={activate(i)}
              onMouseMove={activate(i)}
              onMouseLeave={deactivate}
            />
          ))}
          <text x={x(peakIndex)} y={y(peak) - 12} textAnchor="middle" fontSize="11" fontWeight="800" fill={INK.strong}>
            {peak}
          </text>
        </svg>
        <p className="note">
          Przez większość roku wskaźnik utrzymuje się między dwunastoma a czternastoma punktami. To
          poziom typowy dla młodej domeny bez zbudowanego zaplecza linkowego — nie dla organizacji
          branżowej z dwuletnim stażem i dorobkiem publikacyjnym.
        </p>
        <ChartTip tip={tip.tip} />
      </div>
    </div>
  );
}
