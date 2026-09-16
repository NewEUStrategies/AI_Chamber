import { useState } from 'react';
import { ChartTip } from './ChartTip';
import { useChartTip } from './useChartTip';

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  title: string[];
  sub: string;
  kind: 'core' | 'related' | 'plain';
}

const NODES: Node[] = [
  { id: 'chamber', x: 410, y: 250, r: 58, title: ['AI Chamber', 'izba gospodarcza'], sub: 'KRS 0001108700', kind: 'core' },
  { id: 'ceo', x: 180, y: 115, r: 43, title: ['Snażyk'], sub: 'prezes zarządu', kind: 'plain' },
  { id: 'bod', x: 120, y: 270, r: 42, title: ['Board of', 'Directors'], sub: '5 osób', kind: 'plain' },
  { id: 'boa', x: 190, y: 410, r: 43, title: ['Board of', 'Advisors'], sub: '7 osób', kind: 'plain' },
  { id: 'team', x: 470, y: 435, r: 42, title: ['Zespół', 'operacyjny'], sub: 'około 12 osób', kind: 'plain' },
  { id: 'members', x: 660, y: 400, r: 42, title: ['Członkowie', '~90 firm'], sub: 'MŚP z CEE', kind: 'plain' },
  { id: 'fundacja', x: 655, y: 120, r: 54, title: ['Fundacja AI CEE', 'KRS 0001064000'], sub: 'podmiot powiązany', kind: 'related' },
];

const LEGEND = [
  { color: '#01de99', label: 'Podmiot docelowy (izba gospodarcza)' },
  { color: '#293277', label: 'Podmiot powiązany (wspólny założyciel)' },
  { color: '#cbd5e1', label: 'Organy, zespół i baza członkowska' },
  { color: '#01de99', label: 'powiązanie osobowe (linia przerywana)', dashed: true },
];

/** Organisational map of AI Chamber, drawn in the platform palette. */
export function StructureGraph() {
  const [active, setActive] = useState<string | null>(null);
  const tip = useChartTip();
  const center = NODES[0];

  return (
    <div className="card overflow-hidden p-4 sm:p-5">
      <svg
        viewBox="0 0 820 500"
        className="block h-auto w-full"
        role="img"
        aria-label="Mapa struktury organizacyjnej AI Chamber"
      >
        <defs>
          <radialGradient id="dossier-graph-bg" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#eef1f8" />
            <stop offset="100%" stopColor="#ffffff" />
          </radialGradient>
          <linearGradient id="dossier-graph-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#293277" />
            <stop offset="100%" stopColor="#00875d" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="820" height="500" rx="7" fill="url(#dossier-graph-bg)" />

        {NODES.slice(1).map((n) => {
          const dashed = n.id === 'fundacja';
          const lit = active === n.id || active === 'chamber';
          return (
            <line
              key={`link-${n.id}`}
              x1={center.x}
              y1={center.y}
              x2={n.x}
              y2={n.y}
              stroke={dashed ? '#00875d' : '#cbd5e1'}
              strokeWidth={dashed ? 2 : 1.4}
              strokeDasharray={dashed ? '5 4' : undefined}
              opacity={lit ? 1 : 0.65}
              className="transition-opacity duration-200"
            />
          );
        })}

        {NODES.map((n) => {
          const isActive = active === n.id;
          const fill = n.kind === 'core' ? 'url(#dossier-graph-core)' : n.kind === 'related' ? '#f0f4ff' : '#ffffff';
          const stroke = n.kind === 'core' ? '#00875d' : n.kind === 'related' ? '#293277' : '#cbd5e1';
          const textColor = n.kind === 'core' ? '#ffffff' : '#293277';
          const subColor = n.kind === 'core' ? 'rgba(255,255,255,0.85)' : n.kind === 'related' ? '#00875d' : '#94a3b8';
          const firstLineY = n.y - (n.title.length - 1) * 8 - (n.kind === 'core' ? 6 : 2);
          return (
            <g
              key={n.id}
              onMouseEnter={(e) => {
                setActive(n.id);
                tip.show(
                  e,
                  [
                    { label: 'rola', value: n.sub },
                    {
                      label: 'rodzaj',
                      value:
                        n.kind === 'core'
                          ? 'podmiot docelowy'
                          : n.kind === 'related'
                            ? 'podmiot powiązany'
                            : 'organ / zespół',
                    },
                  ],
                  n.title.join(' ')
                );
              }}
              onMouseMove={(e) => {
                setActive(n.id);
                tip.show(
                  e,
                  [
                    { label: 'rola', value: n.sub },
                    {
                      label: 'rodzaj',
                      value:
                        n.kind === 'core'
                          ? 'podmiot docelowy'
                          : n.kind === 'related'
                            ? 'podmiot powiązany'
                            : 'organ / zespół',
                    },
                  ],
                  n.title.join(' ')
                );
              }}
              onMouseLeave={tip.hide}
              className="cursor-default"
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={fill}
                stroke={stroke}
                strokeWidth={n.kind === 'plain' ? 1.5 : 2}
                className="transition-all duration-200"
                style={{ filter: isActive ? 'drop-shadow(0 6px 16px rgba(20,26,61,0.18))' : undefined }}
              />
              {n.title.map((line, i) => (
                <text
                  key={line}
                  x={n.x}
                  y={firstLineY + i * 16}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize={n.kind === 'core' ? 12.5 : 11.5}
                  fontWeight="700"
                  fontFamily="Manrope, sans-serif"
                >
                  {line}
                </text>
              ))}
              <text
                x={n.x}
                y={firstLineY + n.title.length * 16 + 2}
                textAnchor="middle"
                fill={subColor}
                fontSize="9"
                fontWeight="600"
                fontFamily="'IBM Plex Sans', sans-serif"
                letterSpacing="0.04em"
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4">
        {LEGEND.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-2 text-xs text-slate-500">
            {l.dashed ? (
              <span
                className="inline-block h-0.5 w-4 shrink-0 rounded-full"
                style={{ backgroundImage: `repeating-linear-gradient(90deg, ${l.color} 0 5px, transparent 5px 9px)` }}
              />
            ) : (
              <i className="inline-block h-3 w-3 shrink-0 rounded-[3px]" style={{ background: l.color }} />
            )}
            {l.label}
          </span>
        ))}
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}
