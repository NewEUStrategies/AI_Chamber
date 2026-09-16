import { INK, MARK } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import {
  EMAIL_ORDER,
  EMAIL_WATCH,
  HYGIENE,
  LIST_QUESTION,
  LIST_SOURCES,
  MAIL_GATE,
  POLICY_BRIEF,
  SEGMENTS,
  SEQUENCES,
} from '@/content/plan/email';
import { Panel } from '../primitives';
import { PLAN_ACCENT } from '../tokens';
import { DefCard, MiniBar, Steps, WatchBlock } from './primitives';

/** Longest sequence sets the scale for the span column. */
const PEAK_DAYS = Math.max(...SEQUENCES.map((s) => s.days ?? 0));
const PEAK_MAILS = Math.max(...SEQUENCES.map((s) => s.mails ?? 0));
const TOTAL_MAILS = SEQUENCES.reduce((a, s) => a + (s.mails ?? 0), 0);

/**
 * E-mail marketing automation.
 *
 * Ordered by what unblocks what, because that is the only ordering that
 * survives contact with the work: nothing below the hygiene block matters
 * until the hygiene block is done, and no segmentation is possible while four
 * intake points keep their own lists.
 */
export function EmailPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Sekwencji cyklu życia" value={String(SEQUENCES.length)} sub={`${TOTAL_MAILS} maili łącznie, wszystkie wyzwalane zdarzeniem`} accent={PLAN_ACCENT} />
        <StatTile label="Wejść z własnym formularzem" value={String(LIST_SOURCES.length)} sub={LIST_SOURCES.join(' · ')} accent={PLAN_ACCENT} />
        <StatTile label="Wymiarów segmentacji" value={String(SEGMENTS.length)} sub="kraj, wielkość, branża, status" accent={PLAN_ACCENT} />
        <StatTile label="Nieodnowień z braku zaangażowania" value="52%" sub="nie z ceny — dlatego onboarding jest sekwencją pierwszą" tone="bad" />
      </div>

      <Panel
        kicker="Kolejność prac"
        title="Cztery bloki, w kolejności odblokowywania"
        lead="Nie priorytety według ważności, tylko według zależności. Blok drugi nie ma sensu przed pierwszym, trzeci bez drugiego trafia w próżnię."
      >
        <Steps items={EMAIL_ORDER.map((s) => ({ what: s.name, detail: s.what, why: s.why }))} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Warunek wstępny"
          title="Higiena techniczna"
          lead="Warunek wstępny całej reszty — i jedyna pozycja, którą w części da się sprawdzić bez niczyjej pomocy: rekordy SPF i DMARC są publiczne w DNS. Reszta wymaga jednego pytania do osoby obsługującej wysyłkę."
        >
          <ul className="space-y-2.5">
            {HYGIENE.map((h) => (
              <li key={h.what} className="flex gap-2.5">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PLAN_ACCENT }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{h.what}</span>
                  <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{h.why}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-5">
          <Panel
            kicker="Jedna lista"
            title="Cztery źródła, jeden system"
            lead="Cztery wejścia mają cztery osobne formularze. Co jest pod spodem, z zewnątrz nie widać — kontakty mogą już schodzić się w CRM-ie albo w CRM-ie i narzędziu do wysyłki. Od odpowiedzi zależy, czy to praca nad integracją, czy już tylko nad segmentacją."
          >
            {/* Four inputs converging on one store. The picture is the whole
                task: nothing here is a funnel, it is a merge. */}
            <div className="flex items-stretch gap-3">
              <ul className="flex flex-1 flex-col justify-center gap-1.5">
                {LIST_SOURCES.map((s) => (
                  <li
                    key={s}
                    className="rounded-[6px] px-2.5 py-1.5 text-[11.5px] font-bold text-chamber-navy"
                    style={{ background: INK.track }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div aria-hidden className="flex w-6 shrink-0 items-center justify-center">
                <span className="h-px w-full" style={{ background: INK.grid }} />
              </div>
              <div
                className="flex flex-1 items-center justify-center rounded-[8px] px-3 text-center text-[12px] font-extrabold text-white"
                style={{ background: PLAN_ACCENT }}
              >
                jedna lista z segmentacją
              </div>

            {/* The question, not the verdict: the picture above is what we want,
                not what we claim is missing. */}
            <p className="mt-3 rounded-[8px] px-3 py-2.5 text-[12px] leading-[1.6] text-slate-600" style={{ background: INK.track }}>
              <b className="text-chamber-navy">Pytanie do zadania:</b> {LIST_QUESTION}
            </p>
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
              {SEGMENTS.map((s) => (
                <div key={s.dimension} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:w-[104px] sm:shrink-0 sm:pt-[3px] sm:text-right">
                    {s.dimension}
                  </dt>
                  <dd className="min-w-0 flex-1">
                    <span className="block text-[12px] font-bold leading-snug text-chamber-navy">{s.values}</span>
                    <span className="mt-0.5 block text-[12px] leading-[1.55] text-slate-600">{s.why}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>

      <Panel
        kicker="Produkt flagowy"
        title="Policy Brief"
        lead={POLICY_BRIEF.what}
        note={POLICY_BRIEF.payoff}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <DefCard title="Kadencja" meta={POLICY_BRIEF.cadence} accent>
            <p>Regularność jest połową produktu. Briefing nieregularny nie wchodzi do niczyjego tygodnia.</p>
          </DefCard>
          <DefCard title="Język" meta={POLICY_BRIEF.language} accent>
            <p>Odbiorcą docelowym jest administracja w regionie, nie tylko w Polsce.</p>
          </DefCard>
          <DefCard title="Slot" meta={POLICY_BRIEF.slot} accent>
            <p>Wtorek rano — przed tym, jak tydzień zapełni się czymś innym.</p>
          </DefCard>
        </div>

        <div className="mt-5">
          <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Stała struktura · cztery bloki, zawsze w tej samej kolejności
          </p>
          <ol className="grid gap-2 sm:grid-cols-4">
            {POLICY_BRIEF.structure.map((b, i) => (
              <li
                key={b}
                className="rounded-[8px] border px-3 py-2.5"
                style={{ borderColor: `${PLAN_ACCENT}33` }}
              >
                <span className="font-mono text-[10px] font-extrabold" style={{ color: PLAN_ACCENT }}>
                  {i + 1}
                </span>
                <span className="mt-0.5 block text-[12px] font-bold leading-snug text-chamber-navy">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      <Panel
        kicker="Sekwencje cyklu życia"
        title="Sześć automatyzacji, każda wyzwalana zdarzeniem"
        lead={
          <>
            Kolumna kształtu pokazuje dwie miary osobno: ile maili i przez ile dni. Nie sumują się do
            jednej liczby, więc stoją obok siebie, a nie jedna na drugiej.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Sekwencja konferencyjna</b> jest rozpisana po stronie materiału
            konferencyjnego — tam, gdzie widać, z czego się składa każdy z jej trzech maili. Sekwencja
            reaktywacyjna kończy się wypisaniem i to jest jej cel, nie porażka: uśpiony adres kosztuje
            dostarczalność wszystkim pozostałym.
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-1.5 pr-3 font-bold">Sekwencja</th>
                <th className="py-1.5 pr-3 font-bold">Wyzwalacz</th>
                <th className="py-1.5 pr-3 font-bold" style={{ width: 168 }}>
                  Kształt
                </th>
                <th className="py-1.5 pr-3 font-bold">Z czego się składa</th>
                <th className="py-1.5 font-bold">Uzasadnienie</th>
              </tr>
            </thead>
            <tbody>
              {SEQUENCES.map((s) => (
                <tr key={s.name} className="border-b border-slate-100 align-top last:border-0">
                  <td className="py-2.5 pr-3 font-bold text-chamber-navy">{s.name}</td>
                  <td className="py-2.5 pr-3 text-slate-600">{s.trigger}</td>
                  <td className="py-2.5 pr-3" style={{ minWidth: 168 }}>
                    <span className="flex items-center gap-2">
                      <span className="w-[42px] shrink-0 font-mono text-[10px] font-bold text-slate-400">maile</span>
                      <MiniBar value={s.mails} peak={PEAK_MAILS} color={PLAN_ACCENT} height={6} />
                      <span className="w-[16px] shrink-0 text-right text-[11px] font-extrabold tabular-nums text-chamber-navy">
                        {s.mails ?? '—'}
                      </span>
                    </span>
                    <span className="mt-1 flex items-center gap-2">
                      <span className="w-[42px] shrink-0 font-mono text-[10px] font-bold text-slate-400">dni</span>
                      <MiniBar
                        value={s.days}
                        peak={PEAK_DAYS}
                        color="rgba(41, 50, 119, 0.24)"
                        height={6}
                      />
                      <span className="w-[16px] shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
                        {s.days ?? '—'}
                      </span>
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-slate-600">{s.shape}</td>
                  <td className="py-2.5 text-slate-600">{s.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel
        kicker="Próg jakości"
        title="Cztery warunki przed wysyłką"
        lead="Ostatni jest testem, nie zasadą: jeśli po przeczytaniu nie wiadomo, co zrobić w pięć minut, mail nie ma celu."
      >
        <ul className="space-y-2">
          {MAIL_GATE.map((g, i) => (
            <li key={g} className="flex items-start gap-2.5" style={{ minHeight: MARK.minHitTarget - 8 }}>
              <span
                className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-extrabold text-white"
                style={{ background: PLAN_ACCENT }}
              >
                {i + 1}
              </span>
              <span className="text-[12.5px] leading-[1.6] text-slate-600">{g}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <WatchBlock baseline={EMAIL_WATCH.baseline} watch={EMAIL_WATCH.watch} />
    </div>
  );
}
