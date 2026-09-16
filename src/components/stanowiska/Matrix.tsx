import { useMemo, useState } from 'react';
import { CheckCircle2, TriangleAlert } from 'lucide-react';
import { CAT, INK, MARK } from '@/components/marketing/palette';
import { MATRIX, OWNERSHIP_LEGEND } from '@/content/stanowiska/matrix';
import { ROLES } from '@/content/stanowiska/roles';
import type { Ownership, RoleKey } from '@/content/stanowiska/types';

/**
 * Wypełnienie komórki koduje stopień zaangażowania, nie tożsamość roli —
 * to skala porządkowa, więc jeden odcień od pełnego do pustego, a nie cztery
 * różne barwy. Litera zostaje w komórce, bo kolor nigdy nie jest tu jedynym
 * nośnikiem.
 */
const CELL: Record<Ownership, { bg: string; fg: string; title: string }> = {
  O: { bg: CAT[1], fg: '#fff', title: 'odpowiada — właściciel wyniku' },
  W: { bg: 'rgba(41, 50, 119, 0.5)', fg: '#fff', title: 'wykonuje' },
  K: { bg: 'rgba(41, 50, 119, 0.16)', fg: '#293277', title: 'konsultuje lub wspiera' },
  '-': { bg: 'transparent', fg: '#cbd5e1', title: 'poza zakresem roli' },
};

const KEYS = ROLES.map((r) => r.key);

/**
 * Macierz rozgraniczeń, która sprawdza samą siebie.
 *
 * Reguła z materiału źródłowego mówi: w każdym wierszu dokładnie jeden
 * właściciel wyniku, a wiersz bez właściciela oznacza zadanie, które wypadnie
 * z organizacji. Zamiast zakładać, że tabela spełnia tę regułę, widok liczy to
 * na żywo i pokazuje wynik — bo tabela, którą ktoś dopasuje do własnej
 * struktury, przestanie ją spełniać w pierwszym tygodniu.
 */
export function Matrix() {
  const [highlight, setHighlight] = useState<RoleKey | null>(null);

  const audit = useMemo(() => {
    const owners = MATRIX.map((r) => ({
      task: r.task,
      n: KEYS.filter((k) => r.cells[k] === 'O').length,
      intentional: Boolean(r.note),
    }));
    return {
      ok: owners.filter((o) => o.n === 1).length,
      none: owners.filter((o) => o.n === 0 && !o.intentional),
      many: owners.filter((o) => o.n > 1),
      intentional: owners.filter((o) => o.n === 0 && o.intentional).length,
    };
  }, []);

  const clean = audit.none.length === 0 && audit.many.length === 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {OWNERSHIP_LEGEND.map((l) => (
            <li key={l.code} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600">
              <span
                aria-hidden
                className="flex h-5 w-5 items-center justify-center rounded-[4px] text-[10px] font-extrabold"
                style={{
                  background: CELL[l.code as Ownership].bg,
                  color: CELL[l.code as Ownership].fg,
                  border: l.code === '-' ? `1px solid ${INK.grid}` : undefined,
                }}
              >
                {l.code}
              </span>
              {l.label}
            </li>
          ))}
        </ul>

        <div role="group" aria-label="Podświetl kolumnę" className="flex flex-wrap items-center gap-1.5">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setHighlight((h) => (h === r.key ? null : r.key))}
              aria-pressed={highlight === r.key}
              className={`rounded-full border px-2.5 text-[11px] font-bold outline-none transition-colors ${
                highlight === r.key
                  ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy'
              }`}
              style={{ minHeight: MARK.minHitTarget }}
            >
              {r.letter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-[12.5px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="py-2 pr-3 font-bold">Zadanie lub obszar decyzyjny</th>
              {ROLES.map((r) => (
                <th
                  key={r.key}
                  scope="col"
                  className={`py-2 text-center font-bold ${highlight === r.key ? 'text-chamber-navy' : ''}`}
                  style={{ width: 72 }}
                  title={r.title}
                >
                  {r.letter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => (
              <tr key={row.task} className="border-b border-slate-100 last:border-0">
                <th scope="row" className="py-1.5 pr-3 text-left font-semibold text-slate-700">
                  {row.task}
                  {row.note && (
                    <span className="mt-0.5 block text-[11.5px] font-normal leading-snug text-slate-400">
                      {row.note}
                    </span>
                  )}
                </th>
                {ROLES.map((r) => {
                  const v = row.cells[r.key];
                  const c = CELL[v];
                  const dim = highlight !== null && highlight !== r.key;
                  return (
                    <td key={r.key} className="py-1.5 text-center align-middle">
                      <span
                        title={`${r.title}: ${c.title}`}
                        className="mx-auto flex h-6 w-6 items-center justify-center rounded-[5px] text-[11px] font-extrabold transition-opacity"
                        style={{
                          background: c.bg,
                          color: c.fg,
                          border: v === '-' ? `1px solid ${INK.grid}` : undefined,
                          opacity: dim ? 0.3 : 1,
                        }}
                      >
                        {v === '-' ? '·' : v}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kontrola reguły, liczona na żywo. */}
      <div
        className="mt-4 flex items-start gap-2.5 rounded-[10px] px-4 py-3"
        style={{ background: clean ? `${CAT[1]}0f` : 'rgba(159, 18, 57, 0.06)' }}
      >
        {clean ? (
          <CheckCircle2 aria-hidden className="mt-[2px] h-4 w-4 shrink-0" style={{ color: CAT[1] }} />
        ) : (
          <TriangleAlert aria-hidden className="mt-[2px] h-4 w-4 shrink-0 text-rose-600" />
        )}
        <p className="text-[12.5px] leading-[1.65] text-slate-600">
          {clean ? (
            <>
              <b className="text-chamber-navy">Reguła spełniona.</b> W {audit.ok} z {MATRIX.length} wierszy jest
              dokładnie jeden właściciel wyniku. Pozostały {audit.intentional} wiersz celowo nie ma właściciela
              w dziale marketingu i jest to opisane przy nim. Jeśli po dopasowaniu tabeli do własnej struktury
              w którymś wierszu pojawi się drugie „O”, zakres jest źle podzielony; jeśli zniknie ostatnie,
              zadanie wypadnie z organizacji.
            </>
          ) : (
            <>
              <b className="text-chamber-navy">Reguła naruszona.</b>{' '}
              {audit.many.length > 0 && <>Wiersze z więcej niż jednym właścicielem: {audit.many.map((m) => m.task).join('; ')}. </>}
              {audit.none.length > 0 && <>Wiersze bez właściciela: {audit.none.map((m) => m.task).join('; ')}.</>}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
