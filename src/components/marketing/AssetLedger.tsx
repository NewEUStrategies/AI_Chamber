import { useState } from 'react';
import type { AssetRow, Gap } from '@/content/marketing/types';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { CAT, INK, MARK, STATUS, pct } from './palette';
import { Legend, ViewToggle } from './primitives';

/** Existence and gating are two separate questions; a row answers both. */
const EXIST_TONE: Record<AssetRow['exists'], string> = {
  tak: STATUS.dziala.fill,
  nie: STATUS.brak.fill,
  nieznane: STATUS.nieznane.fill,
};

const FUNNEL_ORDER: AssetRow['funnel'][] = ['TOFU', 'MOFU', 'BOFU', 'retencja'];
/** Colour follows the funnel stage, in fixed order — never the row's rank. */
const FUNNEL_COLOR: Record<AssetRow['funnel'], string> = {
  TOFU: CAT[0],
  MOFU: CAT[1],
  BOFU: CAT[2],
  retencja: CAT[3],
};

/**
 * The lead-magnet inventory. The interesting column is `gated`, not `exists`:
 * an ungated report builds standing but captures nobody, and for most rows the
 * outside view cannot tell which it is. That repetition of "nieznane" is the
 * finding, so the summary bar counts it rather than hiding it.
 */
export function AssetLedger({ assets, gaps }: { assets: AssetRow[]; gaps: Gap[] }) {
  const tip = useChartTip();
  const [table, setTable] = useState(false);

  const capturing = assets.filter((a) => a.exists === 'tak' && a.gated === 'tak').length;
  const leaking = assets.filter((a) => a.exists === 'tak' && a.gated === 'nie').length;
  const unclear = assets.filter((a) => a.exists === 'tak' && a.gated === 'nieznane').length;
  const absent = assets.filter((a) => a.exists === 'nie').length;
  const live = capturing + leaking + unclear;

  const split = [
    { label: 'przechwytuje kontakt', n: capturing, fill: STATUS.dziala.fill },
    { label: 'nie przechwytuje', n: leaking, fill: STATUS.brak.fill },
    { label: 'nie wiadomo', n: unclear, fill: STATUS.nieznane.fill },
  ].filter((s) => s.n > 0);

  return (
    <div className="space-y-5">
      <div>
        <Legend items={split.map((s) => ({ label: s.label, color: s.fill }))} />
        <div
          className="flex overflow-hidden rounded-[4px]"
          style={{ height: MARK.maxBarThickness, gap: MARK.surfaceGap, background: INK.surface }}
          role="img"
          aria-label={`Spośród ${live} istniejących aktywów ${capturing} przechwytuje kontakt, ${leaking} nie, przy ${unclear} nie da się tego ustalić.`}
        >
          {split.map((s, i) => (
            <span
              key={s.label}
              tabIndex={0}
              className="outline-none"
              style={{
                width: `${(s.n / live) * 100}%`,
                background: s.fill,
                borderRadius: i === split.length - 1 ? `0 ${MARK.barRadius}px ${MARK.barRadius}px 0` : 0,
              }}
              onPointerEnter={(e) =>
                tip.show(e, [{ label: 'aktywa', value: String(s.n), color: s.fill }, { label: 'udział', value: pct((s.n / live) * 100) }], s.label)
              }
              onFocus={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                tip.show({ clientX: r.left + r.width / 2, clientY: r.top }, [{ label: 'aktywa', value: String(s.n), color: s.fill }], s.label);
              }}
              onPointerLeave={tip.hide}
              onBlur={tip.hide}
            />
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-snug text-slate-500">
          Przy <b className="text-slate-700">{unclear}</b> z {live} istniejących aktywów nie da się z zewnątrz
          ustalić, czy przechwytują kontakt. Do tego <b className="text-slate-700">{absent}</b> aktywa
          nie istnieją wcale.
        </p>
      </div>

      <ViewToggle table={table} onChange={setTable} controls="assets-body" />

      {table ? (
        <div id="assets-body" className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-1.5 font-bold">Aktywo</th>
                <th className="py-1.5 font-bold">Typ</th>
                <th className="py-1.5 font-bold">Etap</th>
                <th className="py-1.5 font-bold">Istnieje</th>
                <th className="py-1.5 font-bold">Przechwytuje</th>
                <th className="py-1.5 font-bold">Uwaga</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.name} className="border-b border-slate-100 align-top last:border-0">
                  <td className="py-2 pr-3 font-bold text-chamber-navy">{a.name}</td>
                  <td className="py-2 pr-3 text-slate-600">{a.kind}</td>
                  <td className="py-2 pr-3">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
                      <i aria-hidden className="h-2 w-2 rounded-[2px]" style={{ background: FUNNEL_COLOR[a.funnel] }} />
                      {a.funnel}
                    </span>
                  </td>
                  <td className="py-2 pr-3 font-semibold" style={{ color: EXIST_TONE[a.exists] }}>{a.exists}</td>
                  <td className="py-2 pr-3 font-semibold" style={{ color: EXIST_TONE[a.gated] }}>{a.gated}</td>
                  <td className="py-2 text-slate-600">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div id="assets-body" className="space-y-4">
          {FUNNEL_ORDER.filter((f) => assets.some((a) => a.funnel === f)).map((f) => (
            <div key={f}>
              <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
                <i aria-hidden className="h-2 w-2 rounded-[2px]" style={{ background: FUNNEL_COLOR[f] }} />
                {f}
              </p>
              <ul className="space-y-1.5">
                {assets.filter((a) => a.funnel === f).map((a) => (
                  <li
                    key={a.name}
                    className="rounded-[8px] border border-slate-200 px-3.5 py-2.5"
                    style={{ borderLeftWidth: 3, borderLeftColor: EXIST_TONE[a.exists] }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-[13px] font-extrabold text-chamber-navy">{a.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-[11px] font-bold">
                        <span style={{ color: EXIST_TONE[a.exists] }}>istnieje: {a.exists}</span>
                        <span className="text-slate-300" aria-hidden>·</span>
                        <span style={{ color: EXIST_TONE[a.gated] }}>przechwytuje: {a.gated}</span>
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-600">{a.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-[10px] border border-slate-200 bg-slate-50 p-4">
        <h4 className="font-display text-[14px] font-extrabold text-chamber-navy">Czego nie da się ustalić bez dostępu</h4>
        <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-600">
          Poniższe luki nie są zarzutem wobec organizacji — są granicą tej analizy. Każda zamyka
          się jedną prośbą o dostęp.
        </p>
        <ul className="mt-3 space-y-2">
          {gaps.map((g) => (
            <li key={g.what} className="border-t border-slate-200 pt-2 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-[12.5px] font-bold text-chamber-navy">{g.what}</span>
                <span className="text-[11px] font-bold text-slate-400">nakład {g.effort}</span>
              </div>
              <p className="mt-0.5 text-[12px] leading-snug text-slate-600">
                <b className="text-slate-500">Blokuje:</b> {g.blocks}
              </p>
              <p className="text-[12px] leading-snug text-slate-500">
                <b>Jak zdobyć:</b> {g.howToGet}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <ChartTip tip={tip.tip} />
    </div>
  );
}
