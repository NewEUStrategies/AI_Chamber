import { useId, useMemo, useState } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { CAT, INK, MARK, plInt } from '@/components/marketing/palette';
import { ViewToggle } from '@/components/marketing/primitives';
import { ROLES } from '@/content/stanowiska/roles';
import { LOCATIONS, type LocationKey, locationByKey } from '@/content/stanowiska/pay';

/**
 * Trzy odczyty rynku, jedna oś.
 *
 * Wszystkie trzy pomiary są w złotówkach, więc mieszczą się na wspólnej skali —
 * to nie jest wykres o dwóch osiach, tylko trzy serie tej samej wielkości.
 * Wspólna oś dla wszystkich pięciu ról jest tu celowa: pokazuje, że pasmo
 * koordynatora mieści się w jednej ósmej pasma dyrektora, a to jest informacja,
 * którą osobne skale per rola by skasowały.
 *
 * Kolory: rekomendacja bierze zieleń izby, bo to ona jest decyzją i to ją się
 * czyta; rynek rekrutacyjny błękit; badanie płacowe wyciszony tusz, bo jest
 * tłem dla pozostałych dwóch, a nie ich konkurentem.
 */
const SERIES = {
  base: { label: 'Badanie płacowe', fill: 'rgba(41, 50, 119, 0.3)' },
  rec: { label: 'Rynek rekrutacyjny', fill: CAT[3] },
  izba: { label: 'Rekomendacja', fill: CAT[1] },
} as const;

/** Górna granica osi: szczyt prognozy RocketJobs dla CMO. */
const AXIS_MAX = 45000;
const TICKS = [0, 10000, 20000, 30000, 40000];

const pos = (v: number) => Math.min((v / AXIS_MAX) * 100, 100);

export function PayChart() {
  const tip = useChartTip();
  const uid = useId();
  const bodyId = `${uid}-body`;
  const [loc, setLoc] = useState<LocationKey>('waw');
  const [table, setTable] = useState(false);
  const location = locationByKey(loc);

  /**
   * Badanie płacowe jest ogólnopolskie, więc skaluje się mnożnikiem wobec
   * mediany krajowej. Rynek rekrutacyjny i rekomendacja są warszawskie, więc
   * skalują się wobec Warszawy. Dwa różne mnożniki dla dwóch różnych baz —
   * użycie jednego zawyżyłoby albo zaniżyło połowę wykresu.
   */
  const rows = useMemo(
    () =>
      ROLES.map((r) => ({
        role: r,
        base: {
          q1: r.pay.base.q1 * location.sed,
          med: r.pay.base.med * location.sed,
          q3: r.pay.base.q3 * location.sed,
        },
        rec: r.pay.rec.map((v) => v * location.rec) as [number, number],
        izba: r.pay.izba.map((v) => v * location.rec) as [number, number],
        target: r.pay.target?.map((v) => v * location.rec) as [number, number] | undefined,
      })),
    [location]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div role="group" aria-label="Lokalizacja" className="flex flex-wrap items-center gap-1.5">
          {LOCATIONS.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setLoc(l.key)}
              aria-pressed={loc === l.key}
              aria-controls={bodyId}
              title={l.label}
              className={`rounded-full border px-2.5 text-[11.5px] font-bold outline-none transition-colors ${
                loc === l.key
                  ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy'
              }`}
              style={{ minHeight: MARK.minHitTarget }}
            >
              {l.short}
            </button>
          ))}
        </div>
        <ViewToggle table={table} onChange={setTable} controls={bodyId} />
      </div>

      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {Object.values(SERIES).map((s) => (
          <li key={s.label} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600">
            <i aria-hidden className="h-2.5 w-2.5 rounded-[3px]" style={{ background: s.fill }} />
            {s.label}
          </li>
        ))}
        <li className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600">
          <i aria-hidden className="h-3 w-[3px] rounded-full" style={{ background: INK.strong }} />
          Punkt docelowy
        </li>
      </ul>

      <div id={bodyId} className="mt-4">
        {table ? (
          <PayTable loc={loc} />
        ) : (
          <>
            <div className="space-y-4">
              {rows.map(({ role, base, rec, izba, target }) => {
                const bars = [
                  { k: 'base' as const, from: base.q1, to: base.q3, mid: base.med },
                  { k: 'rec' as const, from: rec[0], to: rec[1] },
                  { k: 'izba' as const, from: izba[0], to: izba[1] },
                ];
                return (
                  <div key={role.key}>
                    <p className="mb-1 flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[12.5px] font-extrabold text-chamber-navy">{role.title}</span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: CAT[1] }}>
                        {plInt(izba[0])}–{plInt(izba[1])} zł
                      </span>
                    </p>

                    <div className="relative" style={{ paddingLeft: 0 }}>
                      {bars.map((b) => {
                        const s = SERIES[b.k];
                        const rowsTip = [
                          { label: 'od', value: `${plInt(b.from)} zł`, color: s.fill },
                          { label: 'do', value: `${plInt(b.to)} zł` },
                          ...(b.mid ? [{ label: 'mediana', value: `${plInt(b.mid)} zł` }] : []),
                          { label: 'lokalizacja', value: location.short },
                        ];
                        return (
                          <div
                            key={b.k}
                            tabIndex={0}
                            role="img"
                            aria-label={`${role.title}, ${s.label}: od ${plInt(b.from)} do ${plInt(b.to)} złotych`}
                            className="relative mb-[3px] cursor-default outline-none"
                            style={{ height: 10 }}
                            onPointerEnter={(e) => tip.show(e, rowsTip, `${role.title} — ${s.label}`)}
                            onFocus={(e) => {
                              const r = e.currentTarget.getBoundingClientRect();
                              tip.show(
                                { clientX: r.left + r.width / 2, clientY: r.top },
                                rowsTip,
                                `${role.title} — ${s.label}`
                              );
                            }}
                            onPointerLeave={tip.hide}
                            onBlur={tip.hide}
                          >
                            <span
                              aria-hidden
                              className="absolute inset-y-[3px] left-0 w-full rounded-[2px]"
                              style={{ background: INK.track }}
                            />
                            <span
                              aria-hidden
                              className="absolute inset-y-0 rounded-[3px]"
                              style={{
                                left: `${pos(b.from)}%`,
                                width: `${Math.max(pos(b.to) - pos(b.from), 0.6)}%`,
                                background: s.fill,
                              }}
                            />
                            {/* Mediana badania: kreska w środku pasma, nie osobny słupek. */}
                            {b.mid && (
                              <span
                                aria-hidden
                                className="absolute inset-y-0 w-[2px]"
                                style={{ left: `${pos(b.mid)}%`, background: INK.surface }}
                              />
                            )}
                          </div>
                        );
                      })}

                      {/* Punkt docelowy: pionowa kreska przez wszystkie trzy pasma. */}
                      {target && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute top-0 h-[39px] w-[2px]"
                          style={{ left: `${pos(target[0])}%`, background: INK.strong }}
                        />
                      )}
                      {target && target[1] !== target[0] && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute top-0 h-[39px] w-[2px]"
                          style={{ left: `${pos(target[1])}%`, background: INK.strong }}
                        />
                      )}
                    </div>

                    {role.pay.targetNote && (
                      <p className="mt-1 text-[11.5px] leading-snug text-slate-500">{role.pay.targetNote}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Oś: wspólna dla wszystkich pięciu ról. */}
            <div className="relative mt-3">
              <div className="h-px w-full" style={{ background: INK.grid }} />
              <div className="relative h-[16px]">
                {TICKS.map((t, i) => (
                  <span key={t} className="absolute top-0" style={{ left: `${pos(t)}%` }}>
                    <span aria-hidden className="absolute top-0 h-[5px] w-px" style={{ background: INK.dim }} />
                    <span
                      className={`absolute top-[7px] whitespace-nowrap font-mono text-[10px] font-bold text-slate-400 ${
                        i === 0 ? 'translate-x-0' : '-translate-x-1/2'
                      }`}
                    >
                      {t === 0 ? '0' : `${t / 1000} tys.`}
                      {i === TICKS.length - 1 ? ' zł' : ''}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}

function PayTable({ loc }: { loc: LocationKey }) {
  const l = locationByKey(loc);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-[12.5px]">
        <caption className="mb-2 text-left font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {l.label} · wartości przeliczone mnożnikiem lokalizacyjnym
        </caption>
        <thead>
          <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
            <th className="py-1.5 pr-3 font-bold">Stanowisko</th>
            <th className="py-1.5 pr-3 font-bold">Badanie: kwartyle</th>
            <th className="py-1.5 pr-3 font-bold">Badanie: mediana</th>
            <th className="py-1.5 pr-3 font-bold">Rynek rekrutacyjny</th>
            <th className="py-1.5 pr-3 font-bold">Rekomendacja</th>
            <th className="py-1.5 font-bold">Punkt docelowy</th>
          </tr>
        </thead>
        <tbody>
          {ROLES.map((r) => (
            <tr key={r.key} className="border-b border-slate-100 align-top last:border-0">
              <td className="py-2 pr-3 font-bold text-chamber-navy">{r.title}</td>
              <td className="py-2 pr-3 tabular-nums text-slate-600">
                {plInt(r.pay.base.q1 * l.sed)}–{plInt(r.pay.base.q3 * l.sed)}
              </td>
              <td className="py-2 pr-3 tabular-nums text-slate-600">{plInt(r.pay.base.med * l.sed)}</td>
              <td className="py-2 pr-3 tabular-nums text-slate-600">
                {plInt(r.pay.rec[0] * l.rec)}–{plInt(r.pay.rec[1] * l.rec)}
              </td>
              <td className="py-2 pr-3 font-bold tabular-nums" style={{ color: CAT[1] }}>
                {plInt(r.pay.izba[0] * l.rec)}–{plInt(r.pay.izba[1] * l.rec)}
              </td>
              <td className="py-2 tabular-nums text-chamber-navy">
                {r.pay.target
                  ? r.pay.target[0] === r.pay.target[1]
                    ? plInt(r.pay.target[0] * l.rec)
                    : `${plInt(r.pay.target[0] * l.rec)}–${plInt(r.pay.target[1] * l.rec)}`
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
