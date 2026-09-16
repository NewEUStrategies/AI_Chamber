import { Check, Minus, ShieldCheck, X } from 'lucide-react';
import { CAT, INK, MARK, plInt } from '@/components/marketing/palette';
import type { Role } from '@/content/stanowiska/types';

/** Jedna karta stanowiskowa: cel, zakres, granice i widełki. */
export function RoleCard({ role }: { role: Role }) {
  return (
    <div className="space-y-5">
      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Karta {role.letter} · poziom {role.level.toLowerCase()}
            </p>
            <h2 className="font-display text-[22px] font-extrabold leading-tight text-chamber-navy sm:text-[26px]">
              {role.title}
            </h2>
            <p className="mt-0.5 text-[12.5px] font-semibold italic text-slate-400">{role.english}</p>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 text-[12px] font-extrabold tabular-nums"
            style={{ background: `${CAT[1]}14`, color: CAT[1] }}
          >
            {plInt(role.pay.izba[0])}–{plInt(role.pay.izba[1])} zł
          </span>
        </div>

        <p className="mt-3 max-w-3xl text-[13.5px] leading-[1.7] text-slate-600">{role.purpose}</p>

        <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {role.facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{f.label}</dt>
              <dd className="mt-0.5 text-[12.5px] font-semibold leading-snug text-slate-600">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Zakres obowiązków
        </h3>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {role.duties.map((d) => (
            <div key={d.title}>
              <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: CAT[1] }}>
                {d.title}
              </p>
              <ul className="space-y-1.5">
                {d.items.map((i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-[1.6] text-slate-600">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trzy granice roli obok siebie: co wolno, co wymaga zgody, czego nie ma
          w karcie. Rozdzielone, bo mylenie ich jest źródłem większości sporów
          o zakres. */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Bounds
          title="Decyduje samodzielnie"
          items={role.decides}
          Icon={Check}
          tone={CAT[1]}
        />
        <Bounds
          title="Wymaga akceptacji"
          items={role.needsApproval}
          Icon={ShieldCheck}
          tone={CAT[3]}
        />
        <Bounds title="Poza kartą stanowiskową" items={role.outOfScope} Icon={X} tone={INK.muted} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Typowe błędy w delegowaniu
          </h3>
          <ul className="mt-4 space-y-2.5">
            {role.delegationErrors.map((e) => (
              <li key={e} className="flex gap-2.5 text-[12.5px] leading-[1.6] text-slate-600">
                <Minus aria-hidden className="mt-[4px] h-3 w-3 shrink-0 text-rose-400" />
                {e}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Na czym skupia się przede wszystkim
          </h3>
          {/* Podział czasu jako jeden pasek: sumuje się do stu procent, więc
              część-do-całości, a nie pięć osobnych słupków. */}
          <div
            className="mt-4 flex overflow-hidden rounded-[4px]"
            style={{ height: MARK.maxBarThickness - 4, gap: MARK.surfaceGap, background: INK.surface }}
            role="img"
            aria-label={role.focus.map((f) => `${f.label} ${f.pct} procent`).join(', ')}
          >
            {role.focus.map((f, i) => (
              <span
                key={f.label}
                className="flex items-center justify-center text-[10.5px] font-extrabold text-white"
                style={{
                  width: `${f.pct}%`,
                  background: `rgba(41, 50, 119, ${0.85 - i * 0.16})`,
                }}
              >
                {f.pct >= 18 ? `${f.pct}%` : ''}
              </span>
            ))}
          </div>
          <ul className="mt-2.5 space-y-1">
            {role.focus.map((f, i) => (
              <li key={f.label} className="flex items-center gap-2 text-[12px] text-slate-600">
                <i
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                  style={{ background: `rgba(41, 50, 119, ${0.85 - i * 0.16})` }}
                />
                <span className="flex-1">{f.label}</span>
                <b className="tabular-nums text-chamber-navy">{f.pct}%</b>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Mierniki efektywności
          </h3>
          <ul className="mt-4 space-y-1.5">
            {role.metrics.map((m) => (
              <li key={m} className="flex gap-2 text-[12.5px] leading-[1.6] text-slate-600">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CAT[1] }} />
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">Kompetencje</h3>
          <div className="mt-4 space-y-3.5">
            {[
              { label: 'Twarde', items: role.hardSkills },
              { label: 'Miękkie', items: role.softSkills },
              { label: 'Narzędzia', items: role.tools },
            ].map((g) => (
              <div key={g.label}>
                <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {g.label}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11.5px] font-semibold text-slate-600"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-[1.6] text-slate-500">
            <b className="text-slate-600">Ścieżka rozwoju:</b> {role.path}
          </p>
        </section>
      </div>
    </div>
  );
}

function Bounds({
  title,
  items,
  Icon,
  tone,
}: {
  title: string;
  items: string[];
  Icon: typeof Check;
  tone: string;
}) {
  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-[15px] font-extrabold leading-tight text-chamber-navy">
        <Icon aria-hidden className="h-4 w-4 shrink-0" style={{ color: tone }} />
        {title}
      </h3>
      <ul className="mt-3.5 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-[12.5px] leading-[1.6] text-slate-600">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: tone }} />
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}
