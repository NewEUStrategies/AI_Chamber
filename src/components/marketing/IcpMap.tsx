import { useId, useState } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import type { BuyingRole, IcpSegment } from '@/content/marketing/types';
import { INK, MARK, SERIES, STATUS, pct, pl } from './palette';
import { BarRows, Card, Legend, StatusChip, ViewToggle } from './primitives';

/** Decision power first — the order the buying centre is actually worked in. */
const WEIGHT_ORDER: BuyingRole['weight'][] = ['decyduje', 'płaci', 'wpływa', 'używa'];

const WEIGHT: Record<BuyingRole['weight'], { color: string; hint: string }> = {
  decyduje: { color: SERIES.chamber, hint: 'mówi ostatnie tak albo nie' },
  płaci: { color: SERIES.amber, hint: 'uwalnia budżet' },
  wpływa: { color: SERIES.blue, hint: 'kształtuje wybór przed decyzją' },
  używa: { color: SERIES.violet, hint: 'korzysta z członkostwa na co dzień' },
};

/** Reach is a state, not a series — it borrows the reserved status tokens. */
const REACH = {
  yes: { color: STATUS.dziala.fill, label: 'dosięgamy' },
  no: { color: STATUS.brak.fill, label: 'poza zasięgiem' },
} as const;

export function IcpMap({ segments, roles }: { segments: IcpSegment[]; roles: BuyingRole[] }) {
  return (
    <div className="grid gap-5">
      <SegmentFit segments={segments} />
      <BuyingCentre roles={roles} />
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Segments — one magnitude per category, so: horizontal bars        *
 * ---------------------------------------------------------------- */

function SegmentFit({ segments }: { segments: IcpSegment[] }) {
  const ranked = [...segments].sort((a, b) => b.fit - a.fit);
  const avg = ranked.length ? ranked.reduce((sum, s) => sum + s.fit, 0) / ranked.length : 0;

  /* One series → one colour. The bar never ramps with the value; the number,
     the status chip and the evidence carry everything else. */
  const bars = ranked.map((s) => ({
    label: s.name,
    value: s.fit,
    detail: [
      { label: 'stan', value: STATUS[s.status].label, color: STATUS[s.status].fill },
      { label: 'wielkość', value: s.size },
    ],
    note: s.why,
  }));

  return (
    <Card
      kicker="Ideal customer profile"
      title="Segmenty ICP — dopasowanie"
      lead="Dopasowanie w skali 1–5: na ile segment odpowiada temu, co AI Chamber realnie potrafi dowieźć. Ocena redakcyjna, oparta na dowodzie przy każdym wierszu — nie na pomiarze."
      note={
        <>
          Średnie dopasowanie portfela: <b className="text-slate-600">{pl(avg, 1)} / 5</b>. Słupek pokazuje ocenę
          dopasowania, nie wielkość segmentu — wielkość stoi opisowo przy każdej pozycji.
        </>
      }
    >
      {/* Single series, so no legend: the card title names what is measured. */}
      <BarRows
        data={bars}
        color={SERIES.chamber}
        max={5}
        labelWidth={168}
        tableCols={['Segment', 'Dopasowanie 1–5']}
      />

      <ul className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        {ranked.map((s) => (
          <li key={s.name} className="grid gap-1.5 sm:grid-cols-[168px_1fr] sm:gap-4">
            <div className="flex items-start gap-2">
              {/* Identity sits in the swatch beside the label, never in the type colour. */}
              <i
                aria-hidden
                className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-[3px]"
                style={{ background: SERIES.chamber }}
              />
              <span className="text-[12.5px] font-bold leading-snug text-chamber-navy">{s.name}</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip k={s.status} />
                <span className="text-[11.5px] font-semibold text-slate-500">{s.size}</span>
                <span className="text-[11.5px] font-bold tabular-nums text-slate-400">{pl(s.fit)} / 5</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-[1.6] text-slate-600">{s.why}</p>
              <p className="mt-1 text-[11.5px] leading-[1.55] text-slate-500">
                <b className="text-slate-600">Dowód:</b> {s.evidence}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------------------------------------------------------- *
 * Buying centre — who decides, and whether we reach them at all     *
 * ---------------------------------------------------------------- */

function BuyingCentre({ roles }: { roles: BuyingRole[] }) {
  const tip = useChartTip();
  const [table, setTable] = useState(false);
  const bodyId = useId();

  const ordered = [...roles].sort(
    (a, b) => WEIGHT_ORDER.indexOf(a.weight) - WEIGHT_ORDER.indexOf(b.weight)
  );
  const reached = roles.filter((r) => r.reachedVia !== null).length;
  const missed = roles.length - reached;
  const share = roles.length ? (reached / roles.length) * 100 : 0;

  const parts = [
    { key: 'yes' as const, count: reached, ...REACH.yes },
    { key: 'no' as const, count: missed, ...REACH.no },
  ].filter((p) => p.count > 0);

  const weightsUsed = WEIGHT_ORDER.filter((w) => ordered.some((r) => r.weight === w));

  return (
    <Card
      kicker="Centrum zakupowe"
      title="Kto decyduje i czy go dziś dosięgamy"
      lead={`${roles.length === 5 ? 'Pięć ról przechodzi' : `${roles.length} ról przechodzi`} przez każdą decyzję o członkostwie. Rola bez kanału kontaktu to nie luka w tabeli — to decyzja podejmowana bez nas.`}
      note="Kolor znacznika oznacza rolę w decyzji; zasięg zawsze niesie etykietę tekstową, nigdy sam kolor."
    >
      <Legend items={parts.map((p) => ({ label: p.label, color: p.color }))} />

      <p className="text-[12.5px] leading-[1.6] text-slate-600">
        AI Chamber dosięga{' '}
        <b className="text-chamber-navy">
          {reached} z {roles.length} ról
        </b>{' '}
        ({pct(share, 0)}).{' '}
        {missed > 0 ? (
          <span className="font-semibold" style={{ color: STATUS.brak.fill }}>
            {missed} {missed === 1 ? 'rola pozostaje' : 'role pozostają'} poza zasięgiem.
          </span>
        ) : (
          'Żadna rola nie pozostaje bez kanału.'
        )}
      </p>

      {/* Adjacent fills are held apart by the surface colour, never by a stroke. */}
      {parts.length > 0 && (
        <div
          className="mt-2.5 flex w-full rounded-[4px]"
          style={{ background: INK.surface, gap: MARK.surfaceGap, height: MARK.maxBarThickness }}
        >
          {parts.map((p, i) => (
            <span
              key={p.key}
              tabIndex={0}
              role="img"
              aria-label={`${p.label}: ${p.count} z ${roles.length} ról`}
              className="cursor-default outline-none transition-opacity hover:opacity-90 focus-visible:opacity-90"
              style={{
                flex: `${p.count} 1 0%`,
                background: p.color,
                /* Square at the baseline, 4px only where the data ends. */
                borderRadius: i === parts.length - 1 ? `0 ${MARK.barRadius}px ${MARK.barRadius}px 0` : 0,
              }}
              onPointerEnter={(e) =>
                tip.show(
                  e,
                  [
                    { label: 'role', value: `${p.count} z ${roles.length}`, color: p.color },
                    { label: 'udział', value: pct((p.count / Math.max(roles.length, 1)) * 100, 0) },
                  ],
                  p.label
                )
              }
              onFocus={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                tip.show(
                  { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 },
                  [
                    { label: 'role', value: `${p.count} z ${roles.length}`, color: p.color },
                    { label: 'udział', value: pct((p.count / Math.max(roles.length, 1)) * 100, 0) },
                  ],
                  p.label
                );
              }}
              onPointerLeave={tip.hide}
              onBlur={tip.hide}
            />
          ))}
        </div>
      )}

      <div className="mt-4">
        <ViewToggle table={table} onChange={setTable} controls={bodyId} />
      </div>

      {table ? (
        <div id={bodyId} className="mt-3 overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-1.5 pr-3 font-bold">Rola</th>
                <th className="py-1.5 pr-3 font-bold">Waga</th>
                <th className="py-1.5 pr-3 font-bold">Czego chce</th>
                <th className="py-1.5 pr-3 font-bold">Co blokuje</th>
                <th className="py-1.5 font-bold">Zasięg</th>
              </tr>
            </thead>
            <tbody>
              {ordered.map((r) => (
                <tr key={r.role} className="border-b border-slate-100 align-top last:border-0">
                  <td className="py-2 pr-3 font-bold text-chamber-navy">{r.role}</td>
                  <td className="py-2 pr-3 text-slate-600">{r.weight}</td>
                  <td className="py-2 pr-3 text-slate-600">{r.wants}</td>
                  <td className="py-2 pr-3 text-slate-600">{r.blocks}</td>
                  <td
                    className="py-2 font-semibold"
                    style={{ color: r.reachedVia ? INK.body : STATUS.brak.fill }}
                  >
                    {r.reachedVia ?? 'poza zasięgiem'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div id={bodyId}>
          <Legend items={weightsUsed.map((w) => ({ label: w, color: WEIGHT[w].color }))} />
          <div className="grid gap-2 sm:grid-cols-2">
            {ordered.map((r) => {
              const out = r.reachedVia === null;
              return (
                <div
                  key={r.role}
                  tabIndex={0}
                  className="relative overflow-hidden rounded-[10px] border border-slate-200 bg-white p-3 pl-4 outline-none transition-colors hover:border-slate-300 focus-visible:border-slate-300"
                  style={{ minHeight: MARK.minHitTarget }}
                  onPointerEnter={(e) =>
                    tip.show(
                      e,
                      [
                        { label: 'w decyzji', value: r.weight, color: WEIGHT[r.weight].color },
                        {
                          label: 'zasięg',
                          value: r.reachedVia ?? 'brak kanału',
                          color: out ? REACH.no.color : REACH.yes.color,
                        },
                      ],
                      r.role,
                      WEIGHT[r.weight].hint
                    )
                  }
                  onFocus={(e) => {
                    const box = e.currentTarget.getBoundingClientRect();
                    tip.show(
                      { clientX: box.right - 24, clientY: box.top + box.height / 2 },
                      [
                        { label: 'w decyzji', value: r.weight, color: WEIGHT[r.weight].color },
                        {
                          label: 'zasięg',
                          value: r.reachedVia ?? 'brak kanału',
                          color: out ? REACH.no.color : REACH.yes.color,
                        },
                      ],
                      r.role,
                      WEIGHT[r.weight].hint
                    );
                  }}
                  onPointerLeave={tip.hide}
                  onBlur={tip.hide}
                >
                  {/* A role nobody can talk to gets a rule the eye finds before the text. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px]"
                    style={{ background: out ? STATUS.brak.fill : INK.grid }}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <i
                        aria-hidden
                        className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-[3px]"
                        style={{ background: WEIGHT[r.weight].color }}
                      />
                      <span className="text-[12.5px] font-bold leading-snug text-chamber-navy">{r.role}</span>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      {r.weight}
                    </span>
                  </div>

                  <dl className="mt-2 space-y-1">
                    <div className="flex gap-1.5 text-[12px] leading-snug">
                      <dt className="shrink-0 font-bold text-slate-400">chce</dt>
                      <dd className="text-slate-600">{r.wants}</dd>
                    </div>
                    <div className="flex gap-1.5 text-[12px] leading-snug">
                      <dt className="shrink-0 font-bold text-slate-400">blokuje</dt>
                      <dd className="text-slate-600">{r.blocks}</dd>
                    </div>
                  </dl>

                  <p className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2 text-[11.5px] leading-snug">
                    <span
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 font-bold"
                      style={{
                        background: `${out ? REACH.no.color : REACH.yes.color}14`,
                        color: out ? REACH.no.color : REACH.yes.color,
                      }}
                    >
                      <i
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: out ? REACH.no.color : REACH.yes.color }}
                      />
                      {out ? REACH.no.label : REACH.yes.label}
                    </span>
                    <span className="text-slate-500">
                      {r.reachedVia ?? 'żaden dzisiejszy kanał nie trafia w tę rolę'}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ChartTip tip={tip.tip} />
    </Card>
  );
}
