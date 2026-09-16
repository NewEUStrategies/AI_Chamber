import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { CAT, INK, MARK, plInt } from '@/components/marketing/palette';
import { ROLES } from '@/content/stanowiska/roles';
import { THIRTY_TIMES_WARNING, payslip } from '@/content/stanowiska/pay';

const MIN = 4806;
const MAX = 40000;
const STEP = 100;

/**
 * Brutto, netto i koszt pracodawcy.
 *
 * Wzór jest skalibrowany na dwóch punktach podanych w źródłach i odtwarza
 * wszystkie sześć pozycji tabeli poglądowej z materiału co do złotówki, więc
 * kalkulator liczy, a nie odczytuje z tabeli — dzięki temu działa też dla
 * kwot pomiędzy nimi.
 *
 * Skróty do widełek rekomendowanych są tu po coś: pytanie, które zwykle pada
 * przy ustalaniu pensji, brzmi „ile to kosztuje pracodawcę”, a nie „ile
 * wychodzi z tysiąca złotych”.
 */
export function PayCalculator() {
  const [gross, setGross] = useState(12000);
  const p = payslip(gross);
  const overLimit = gross > THIRTY_TIMES_WARNING;

  const shortcuts = ROLES.flatMap((r) => {
    const target = r.pay.target?.[0];
    return [
      { label: `${r.title.split(' ')[0]} ${plInt(r.pay.izba[0])}`, value: r.pay.izba[0] },
      ...(target && target !== r.pay.izba[0]
        ? [{ label: `cel ${plInt(target)}`, value: target }]
        : []),
    ];
  });

  return (
    <div>
      <label htmlFor="brutto" className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Wynagrodzenie brutto, miesięcznie
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <input
          id="brutto"
          type="number"
          min={MIN}
          max={MAX}
          step={STEP}
          value={Math.round(gross)}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (Number.isFinite(v)) setGross(Math.min(Math.max(v, MIN), MAX));
          }}
          className="w-[128px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[15px] font-extrabold tabular-nums text-chamber-navy outline-none focus:border-chamber-green focus:bg-white focus:ring-2 focus:ring-chamber-green/25"
        />
        <span className="text-[13px] font-bold text-slate-400">zł</span>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={gross}
          onChange={(e) => setGross(Number(e.target.value))}
          aria-label="Suwak wynagrodzenia brutto"
          className="h-1.5 min-w-[160px] flex-1 cursor-pointer appearance-none rounded-full accent-chamber-green-deep"
          style={{ background: INK.track }}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {shortcuts.map((s) => (
          <button
            key={`${s.label}-${s.value}`}
            type="button"
            onClick={() => setGross(s.value)}
            aria-pressed={gross === s.value}
            className={`rounded-full border px-2.5 text-[11px] font-bold tabular-nums outline-none transition-colors ${
              gross === s.value
                ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy'
            }`}
            style={{ minHeight: MARK.minHitTarget }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Brutto', value: p.gross, note: 'to, co w umowie', fill: INK.strong },
          { label: 'Netto około', value: p.net, note: 'to, co pracownik dostaje', fill: CAT[1] },
          { label: 'Koszt pracodawcy około', value: p.employerCost, note: 'to, co realnie wydajesz', fill: CAT[3] },
        ].map((t) => (
          <div key={t.label} className="relative overflow-hidden rounded-[12px] border border-slate-200 bg-white p-4">
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ background: t.fill }} />
            <div className="font-display text-[24px] font-extrabold leading-none text-chamber-navy">
              {plInt(t.value)} <span className="text-[14px] font-bold text-slate-400">zł</span>
            </div>
            <div className="mt-1.5 text-[12px] font-bold leading-snug text-slate-600">{t.label}</div>
            <div className="mt-0.5 text-[11px] leading-snug text-slate-400">{t.note}</div>
          </div>
        ))}
      </div>

      {/* Z czego składa się różnica między brutto a netto. */}
      <div className="mt-4">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Z czego składa się różnica
        </p>
        <div
          className="flex overflow-hidden rounded-[4px]"
          style={{ height: MARK.maxBarThickness - 6, gap: MARK.surfaceGap, background: INK.surface }}
          role="img"
          aria-label={`Z ${plInt(p.gross)} zł brutto: ${plInt(p.net)} netto, ${plInt(p.social)} składki społeczne, ${plInt(p.health)} zdrowotna, ${plInt(p.tax)} zaliczka na podatek.`}
        >
          {[
            { label: 'netto', v: p.net, fill: CAT[1] },
            { label: 'składki społeczne', v: p.social, fill: 'rgba(41, 50, 119, 0.45)' },
            { label: 'zdrowotna', v: p.health, fill: 'rgba(41, 50, 119, 0.3)' },
            { label: 'podatek', v: p.tax, fill: 'rgba(41, 50, 119, 0.18)' },
          ].map((seg) => (
            <span key={seg.label} style={{ width: `${(seg.v / p.gross) * 100}%`, background: seg.fill }} />
          ))}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {[
            { label: 'netto', v: p.net },
            { label: 'składki społeczne', v: p.social },
            { label: 'zdrowotna', v: p.health },
            { label: 'podatek', v: p.tax },
          ].map((seg) => (
            <li key={seg.label} className="text-[11px] font-semibold tabular-nums text-slate-500">
              {seg.label} <b className="text-chamber-navy">{plInt(seg.v)}</b>
            </li>
          ))}
        </ul>
      </div>

      {overLimit && (
        <p className="mt-4 flex items-start gap-2 rounded-[8px] px-3 py-2.5 text-[12px] leading-[1.6] text-slate-600" style={{ background: INK.track }}>
          <AlertTriangle aria-hidden className="mt-[2px] h-3.5 w-3.5 shrink-0 text-amber-600" />
          <span>
            Powyżej około {plInt(THIRTY_TIMES_WARNING)} zł brutto miesięcznie w grę wchodzi roczny limit podstawy
            składek emerytalnej i rentowej. Po jego przekroczeniu realne netto w ostatnich miesiącach roku jest
            wyższe, a koszt pracodawcy niższy niż tutaj. Kalkulator pokazuje wariant sprzed przekroczenia limitu,
            ostrożniejszy dla planowania budżetu.
          </span>
        </p>
      )}

      <p className="mt-3 text-[11.5px] leading-[1.6] text-slate-500">
        Wartości orientacyjne. Zależą od ulg podatkowych, PPK, wieku pracownika i miejsca zamieszkania. Wzór
        skalibrowany na dwóch punktach: płaca minimalna 4 806 zł daje 3 605,86 zł wobec podanych 3 605,85 zł,
        a 9 509,02 zł daje dokładnie 6 811,85 zł.
      </p>
    </div>
  );
}
