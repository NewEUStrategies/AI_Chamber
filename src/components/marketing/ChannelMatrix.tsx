import { useId, useMemo, useState } from 'react';
import type { ChannelRow } from '@/content/marketing/types';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { CAT, INK, MARK, SERIES, STATUS, pl } from './palette';
import { BarRows, Card, Legend, StatusChip, ViewToggle } from './primitives';

/* ---------------------------------------------------------------- *
 * Geometry                                                         *
 * ---------------------------------------------------------------- */

/**
 * The axis titles live inside the viewBox, so they scale with the chart and
 * can never be cropped by the card — the padding below reserves their band.
 */
const W = 720;
const H = 440;
const PAD = { top: 30, right: 30, bottom: 66, left: 72 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

/** Both axes carry the same assessed 1–5 scale, padded so edge points clear the frame. */
const DOM_MIN = 0.4;
const DOM_MAX = 5.6;
const TICKS = [1, 2, 3, 4, 5];
/** Midpoint of the scale — where the quadrants split. */
const MID = 3;
/** Radius of the deterministic fan used to separate co-located channels. */
const SPREAD_R = 9;

const sx = (v: number) => PAD.left + ((v - DOM_MIN) / (DOM_MAX - DOM_MIN)) * PLOT_W;
const sy = (v: number) => PAD.top + PLOT_H - ((v - DOM_MIN) / (DOM_MAX - DOM_MIN)) * PLOT_H;
const clamp = (v: number) => Math.min(Math.max(v, 1), 5);

/* ---------------------------------------------------------------- *
 * Quadrants                                                        *
 * ---------------------------------------------------------------- */

type QuadKey = 'dzwignie' | 'silniki' | 'tlo' | 'pomylki' | 'granica';

const QUAD: Record<QuadKey, { label: string; action: string }> = {
  dzwignie: { label: 'dźwignie', action: 'tu inwestować' },
  silniki: { label: 'silniki', action: 'utrzymać' },
  tlo: { label: 'tło', action: 'zostawić jak jest' },
  pomylki: { label: 'kosztowne pomyłki', action: 'wycofać się' },
  granica: { label: 'na granicy', action: 'doprecyzować ocenę' },
};

const QUAD_ORDER: QuadKey[] = ['dzwignie', 'silniki', 'tlo', 'pomylki', 'granica'];

/**
 * A value sitting exactly on the midpoint belongs to neither half, so it is
 * called out rather than pushed into a quadrant it does not earn.
 */
function quadrantOf(effort: number, impact: number): QuadKey {
  if (effort === MID || impact === MID) return 'granica';
  if (impact > MID) return effort > MID ? 'silniki' : 'dzwignie';
  return effort > MID ? 'pomylki' : 'tlo';
}

interface Pt {
  row: ChannelRow;
  i: number;
  cx: number;
  cy: number;
  /** Channel identity, assigned in fixed order from the categorical set — never cycled. */
  color: string;
  named: boolean;
  quad: QuadKey;
  /** Direct label: extremes, and every channel the palette could not name. */
  label: boolean;
  /** Which side the label fits on, or null when neither side is clear. */
  side: 'left' | 'right' | null;
}

/** Long channel names would collide with their neighbours at label size. */

/** Polish counts take three forms; a bare "kanałów" beside 2 reads as machine output. */
function channelWord(n: number): string {
  if (n === 1) return 'kanał';
  const last = n % 10;
  const teen = n % 100 >= 12 && n % 100 <= 14;
  return !teen && last >= 2 && last <= 4 ? 'kanały' : 'kanałów';
}

/* ---------------------------------------------------------------- *
 * Matrix                                                           *
 * ---------------------------------------------------------------- */

/**
 * Effort against impact, one point per channel.
 *
 * Position carries the whole argument — colour is only identity, so a channel
 * keeps its hue wherever it lands. The first five channels take the
 * categorical set in input order; anything beyond that stays neutral and
 * earns its identity from a direct label, because a sixth generated hue would
 * read as a sixth meaning.
 */
export function ChannelMatrix({ rows }: { rows: ChannelRow[] }) {
  const tip = useChartTip();
  const [table, setTable] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const bodyId = useId();

  const pts = useMemo<Pt[]>(() => {
    // Channels that share a cell are fanned out by a fixed angle so the marks
    // stay separable; the fan is deterministic, so the picture never shifts.
    const cells = new Map<string, number[]>();
    rows.forEach((r, i) => {
      const key = `${clamp(r.effort)}|${clamp(r.impact)}`;
      const seats = cells.get(key);
      if (seats) seats.push(i);
      else cells.set(key, [i]);
    });
    const seat = new Map<number, { k: number; n: number }>();
    cells.forEach((seats) => seats.forEach((idx, k) => seat.set(idx, { k, n: seats.length })));

    return rows.map((r, i) => {
      const e = clamp(r.effort);
      const im = clamp(r.impact);
      const s = seat.get(i) ?? { k: 0, n: 1 };
      const angle = s.n > 1 ? (s.k / s.n) * Math.PI * 2 - Math.PI / 2 : 0;
      const rad = s.n > 1 ? SPREAD_R : 0;
      const named = i < CAT.length;
      const quad = quadrantOf(e, im);
      return {
        row: r,
        i,
        cx: sx(e) + Math.cos(angle) * rad,
        cy: sy(im) + Math.sin(angle) * rad,
        color: named ? CAT[i] : INK.dim,
        named,
        quad,
        label: !named || (quad === 'dzwignie' && im >= 4 && e <= 2) || (quad === 'pomylki' && im <= 2 && e >= 4),
        side: null as 'left' | 'right' | null,
      };
    });
  }, [rows]);

  /**
   * Label placement, measured rather than assumed.
   *
   * A label is never truncated and never allowed to collide: it takes the side
   * that both fits inside the plot and clears every other mark. When neither
   * side is clear the label is dropped — the tooltip and the table view still
   * carry the value, so nothing becomes unreachable.
   */
  const placed = useMemo<Pt[]>(() => {
    const CHAR = 5.6;
    const OFFSET = 13;
    const CLEAR = 14;
    return pts.map((p) => {
      if (!p.label) return p;
      const w = p.row.channel.length * CHAR;
      const prefersLeft = p.cx > PAD.left + PLOT_W * 0.7;
      const boxes = {
        right: { x0: p.cx + OFFSET, x1: p.cx + OFFSET + w },
        left: { x0: p.cx - OFFSET - w, x1: p.cx - OFFSET },
      } as const;
      const clears = (side: 'left' | 'right') => {
        const b = boxes[side];
        if (b.x0 < PAD.left || b.x1 > PAD.left + PLOT_W) return false;
        return !pts.some(
          (o) => o.i !== p.i && Math.abs(o.cy - p.cy) < CLEAR && o.cx > b.x0 - CLEAR && o.cx < b.x1 + CLEAR
        );
      };
      const order: ('left' | 'right')[] = prefersLeft ? ['left', 'right'] : ['right', 'left'];
      const side = order.find(clears) ?? null;
      return { ...p, side };
    });
  }, [pts]);

  const tally = useMemo(() => {
    const counts = new Map<QuadKey, number>();
    pts.forEach((p) => counts.set(p.quad, (counts.get(p.quad) ?? 0) + 1));
    return QUAD_ORDER.map((k) => ({ k, n: counts.get(k) ?? 0 })).filter((t) => t.n > 0);
  }, [pts]);

  const legendItems = useMemo(() => {
    const items = pts.filter((p) => p.named).map((p) => ({ label: p.row.channel, color: p.color }));
    const rest = pts.length - items.length;
    if (rest > 0) items.push({ label: `pozostałe (${rest}) — podpisane przy punktach`, color: INK.dim });
    return items;
  }, [pts]);

  const bars = useMemo(
    () =>
      [...pts]
        .sort((a, b) => b.row.impact - a.row.impact || a.row.effort - b.row.effort)
        .map((p) => ({
          label: p.row.channel,
          value: p.row.impact,
          color: p.color,
          detail: [
            { label: 'nakład', value: `${pl(p.row.effort)} / 5` },
            { label: 'stan', value: STATUS[p.row.status].label, color: STATUS[p.row.status].fill },
            { label: 'ćwiartka', value: QUAD[p.quad].label },
          ],
          note: p.row.verdict,
        })),
    [pts]
  );

  const tipRows = (p: Pt) => [
    { label: 'nakład', value: `${pl(p.row.effort)} / 5`, color: p.color },
    { label: 'efekt', value: `${pl(p.row.impact)} / 5` },
    { label: 'stan', value: STATUS[p.row.status].label, color: STATUS[p.row.status].fill },
    { label: 'ćwiartka', value: `${QUAD[p.quad].label} — ${QUAD[p.quad].action}` },
    { label: 'etap lejka', value: p.row.funnel },
  ];

  const describe = (p: Pt) =>
    `${p.row.channel}: nakład ${pl(p.row.effort)} z 5, efekt ${pl(p.row.impact)} z 5, stan ${
      STATUS[p.row.status].label
    }, ćwiartka ${QUAD[p.quad].label} — ${QUAD[p.quad].action}, etap lejka ${p.row.funnel}. ${p.row.verdict}`;

  return (
    <Card
      kicker="Kanały"
      title="Macierz nakład–efekt"
      lead={
        <>
          Każdy kanał ma dwie oceny w skali 1–5: ile w niego wkładamy i co z niego wychodzi. Oś
          pionowa rozstrzyga, czy kanał w ogóle działa; pozioma — ile to kosztuje. Lewy górny róg to
          dźwignie: duży efekt przy małym nakładzie. Prawy dolny to pieniądze wyrzucone w błoto.
        </>
      }
      note={
        <>
          Skale są ocenami, nie pomiarem — 1–5 opisuje rząd wielkości, nie złotówki ani konwersje.
          Podział ćwiartek biegnie przez środek skali (3); kanał leżący dokładnie na 3 trafia do
          „na granicy”, zamiast być doklejany do sąsiedniej ćwiartki. Kanały o identycznej ocenie
          rozsunięto o kilka pikseli, żeby nie zasłaniały się nawzajem — liczy się komórka, nie
          drobne przesunięcie. Kolor wskazuje wyłącznie kanał; nigdy nie koduje wartości na osi.
        </>
      }
    >
      <ViewToggle table={table} onChange={setTable} controls={bodyId} />

      {rows.length === 0 ? (
        <p id={bodyId} className="mt-3 text-[12.5px] text-slate-400">
          Brak danych o kanałach.
        </p>
      ) : table ? (
        <div id={bodyId} className="mt-3 overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-1.5 font-bold">Kanał</th>
                <th className="py-1.5 text-right font-bold">Nakład (1–5)</th>
                <th className="py-1.5 text-right font-bold">Efekt (1–5)</th>
                <th className="py-1.5 font-bold">Stan</th>
                <th className="py-1.5 font-bold">Werdykt</th>
                <th className="py-1.5 font-bold">Etap lejka</th>
              </tr>
            </thead>
            <tbody>
              {pts.map((p) => (
                <tr key={p.row.channel} className="border-b border-slate-100 align-top last:border-0">
                  <td className="py-2 pr-3">
                    <span className="flex items-start gap-2">
                      <i
                        aria-hidden
                        className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-[3px]"
                        style={{ background: p.color }}
                      />
                      <span>
                        <span className="font-bold text-chamber-navy">{p.row.channel}</span>
                        <span className="block text-[11px] leading-snug text-slate-400">
                          {QUAD[p.quad].label} · {QUAD[p.quad].action}
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">
                    {pl(p.row.effort)}
                  </td>
                  <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">
                    {pl(p.row.impact)}
                  </td>
                  <td className="py-2 pr-3">
                    <StatusChip k={p.row.status} />
                  </td>
                  <td className="py-2 pr-3 text-slate-600">
                    {p.row.verdict}
                    <span className="mt-0.5 block text-[11px] leading-snug text-slate-400">
                      Dowód: {p.row.evidence}
                    </span>
                  </td>
                  <td className="py-2 font-mono text-[11px] font-bold text-slate-500">{p.row.funnel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div id={bodyId}>
          <Legend items={legendItems} />

          {/* Narrow screens scroll the plot rather than shrinking its type to nothing. */}
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block h-auto w-full min-w-[540px]"
              role="img"
              aria-label={`Macierz nakładu i efektu dla ${rows.length} kanałów, obie skale 1–5. Szczegóły w bliźniaczej tabeli.`}
            >
              {/* Faint grid, every tick but the midline. Hairline, continuous, never dashed. */}
              {TICKS.filter((t) => t !== MID).map((t) => (
                <g key={`grid-${t}`}>
                  <line x1={sx(t)} y1={PAD.top} x2={sx(t)} y2={PAD.top + PLOT_H} stroke={INK.grid} strokeWidth="1" />
                  <line x1={PAD.left} y1={sy(t)} x2={PAD.left + PLOT_W} y2={sy(t)} stroke={INK.grid} strokeWidth="1" />
                </g>
              ))}

              {/* The quadrant split: one step stronger than the grid, still a hairline. */}
              <line
                x1={sx(MID)}
                y1={PAD.top}
                x2={sx(MID)}
                y2={PAD.top + PLOT_H}
                stroke={INK.dim}
                strokeWidth="1"
                opacity="0.7"
              />
              <line
                x1={PAD.left}
                y1={sy(MID)}
                x2={PAD.left + PLOT_W}
                y2={sy(MID)}
                stroke={INK.dim}
                strokeWidth="1"
                opacity="0.7"
              />

              {/* Quadrant names sit in the corners; no tinted backgrounds shouting over the data. */}
              {(
                [
                  { k: 'dzwignie' as QuadKey, x: PAD.left + 10, y: PAD.top + 15, anchor: 'start' as const },
                  { k: 'silniki' as QuadKey, x: PAD.left + PLOT_W - 10, y: PAD.top + 15, anchor: 'end' as const },
                  { k: 'tlo' as QuadKey, x: PAD.left + 10, y: PAD.top + PLOT_H - 20, anchor: 'start' as const },
                  {
                    k: 'pomylki' as QuadKey,
                    x: PAD.left + PLOT_W - 10,
                    y: PAD.top + PLOT_H - 20,
                    anchor: 'end' as const,
                  },
                ] as const
              ).map((c) => (
                <g key={`quad-${c.k}`}>
                  <text
                    x={c.x}
                    y={c.y}
                    textAnchor={c.anchor}
                    fontSize="10.5"
                    fontWeight="800"
                    letterSpacing="0.06em"
                    fill={INK.muted}
                  >
                    {QUAD[c.k].label.toUpperCase()}
                  </text>
                  <text x={c.x} y={c.y + 13} textAnchor={c.anchor} fontSize="10" fontWeight="600" fill={INK.dim}>
                    {QUAD[c.k].action}
                  </text>
                </g>
              ))}

              {/* Axes — continuous hairlines. */}
              <line
                x1={PAD.left}
                y1={PAD.top + PLOT_H}
                x2={PAD.left + PLOT_W}
                y2={PAD.top + PLOT_H}
                stroke={INK.muted}
                strokeWidth="1"
              />
              <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H} stroke={INK.muted} strokeWidth="1" />

              {TICKS.map((t) => (
                <g key={`tick-${t}`}>
                  <text
                    x={sx(t)}
                    y={PAD.top + PLOT_H + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={INK.muted}
                  >
                    {t}
                  </text>
                  <text x={PAD.left - 12} y={sy(t) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill={INK.muted}>
                    {t}
                  </text>
                </g>
              ))}

              {/* Axis titles are not optional — an unlabelled axis is a riddle. */}
              <text
                x={PAD.left + PLOT_W / 2}
                y={H - 16}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="800"
                fill={INK.body}
              >
                nakład →
              </text>
              <text x={PAD.left} y={H - 16} textAnchor="start" fontSize="10" fontWeight="600" fill={INK.dim}>
                1 = mały
              </text>
              <text x={PAD.left + PLOT_W} y={H - 16} textAnchor="end" fontSize="10" fontWeight="600" fill={INK.dim}>
                5 = duży
              </text>
              <text
                transform={`translate(20 ${PAD.top + PLOT_H / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="800"
                fill={INK.body}
              >
                efekt →
              </text>

              {placed.map((p) => {
                const on = active === p.i;
                const toLeft = p.side === 'left';
                return (
                  <g
                    key={p.row.channel}
                    tabIndex={0}
                    role="img"
                    aria-label={describe(p)}
                    className="cursor-default outline-none"
                    onPointerEnter={(e) => {
                      setActive(p.i);
                      tip.show(e, tipRows(p), p.row.channel, p.row.verdict);
                    }}
                    onPointerLeave={() => {
                      setActive(null);
                      tip.hide();
                    }}
                    /* Keyboard focus shows exactly what hover shows. */
                    onFocus={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      setActive(p.i);
                      tip.show(
                        { clientX: r.left + r.width / 2, clientY: r.top },
                        tipRows(p),
                        p.row.channel,
                        p.row.verdict
                      );
                    }}
                    onBlur={() => {
                      setActive(null);
                      tip.hide();
                    }}
                  >
                    {/* Hit target first: 24px across, far wider than the painted mark. */}
                    <circle cx={p.cx} cy={p.cy} r={MARK.minHitTarget / 2} fill="transparent" />
                    {on && <circle cx={p.cx} cy={p.cy} r={13} fill={p.color} opacity="0.16" />}
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={on ? 6.5 : MARK.minMarkerSize / 2 + 1}
                      fill={p.color}
                      stroke={INK.surface}
                      strokeWidth={MARK.ringWidth}
                    />
                    {(p.side !== null || on) && (
                      <text
                        x={p.cx + (toLeft ? -13 : 13)}
                        y={p.cy + 4}
                        textAnchor={toLeft ? 'end' : 'start'}
                        fontSize="10.5"
                        fontWeight="700"
                        fill={INK.strong}
                        stroke={INK.surface}
                        strokeWidth="3"
                        paintOrder="stroke"
                      >
                        {p.row.channel}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-slate-500">
            {tally.map((t) => (
              <li key={t.k}>
                {QUAD[t.k].label}{' '}
                <b className="tabular-nums text-chamber-navy">
                  {t.n} {channelWord(t.n)}
                </b>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Ten sam efekt, ustawiony w kolejności
            </p>
            <p className="mt-1 text-[12px] leading-snug text-slate-500">
              Macierz pokazuje układ sił, ranking — dystans między kanałami. Kolory są te same, więc
              ten sam kanał da się śledzić w obu widokach.
            </p>
            <BarRows
              data={bars}
              color={SERIES.chamber}
              unit=" / 5"
              max={5}
              labelWidth={170}
              tableCols={['Kanał', 'Efekt (1–5)']}
            />
          </div>
        </div>
      )}

      <ChartTip tip={tip.tip} />
    </Card>
  );
}
