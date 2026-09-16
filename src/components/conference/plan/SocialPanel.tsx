import { useState } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { INK, MARK, pl } from '@/components/marketing/palette';
import { StatTile, StatusChip, ViewToggle } from '@/components/marketing/primitives';
import { FORMATS, LI, SOCIAL_DERIVED } from '@/content/dossier/social';
import {
  AMPLIFICATION,
  CASCADE,
  CHANNEL_DECISIONS,
  DO_NOT_EMPHASISE,
  EMPHASIS,
  FORMAT_RECS,
  POST_GATE,
  RITUALS,
  RITUAL_RULE,
  SOCIAL_WATCH,
  TAGGING,
  VIDEO_FORMATS,
  WRITTEN_FORMATS,
} from '@/content/plan/social';
import { Panel } from '../primitives';
import { PLAN_ACCENT } from '../tokens';
import { DefCard, MiniBar, RecChip, RuleColumns, Steps, WatchBlock } from './primitives';

/** Formats joined to their recommendation, in effectiveness order. */
const ROWS = FORMATS.map((f) => {
  const rec = FORMAT_RECS.find((r) => r.key === f.key);
  /* Counts and means come from the archived posts; the label is this
     section's, because the dossier data is written without diacritics. */
  return { ...f, rec, label: rec?.label ?? f.label };
}).filter((r) => r.rec);

const PEAK_SHARE = Math.max(...ROWS.map((r) => r.posts));
const PEAK_MEAN = Math.max(...ROWS.map((r) => r.mean));
const BEST = ROWS[0];
const WORST = ROWS[ROWS.length - 1];

const WEEK = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt'];

/**
 * Social — the channel decisions and the format mix.
 *
 * The centrepiece is the mix chart, and its form is doing the argument: two
 * columns on two separate scales, sorted by effectiveness, so the share column
 * visibly runs the other way. Putting both measures on one axis would have
 * been a dual-axis chart inventing a relationship; putting them side by side
 * as small multiples shows the real one, which is an inversion.
 */
export function SocialPanel() {
  const tip = useChartTip();
  const [table, setTable] = useState(false);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Wskaźnik zaangażowania na LinkedInie" value={`${pl(LI.er ?? 0, 2)}%`} sub={`mediana ${pl(LI.median)} reakcji przy ${pl(LI.posts)} postach`} accent={PLAN_ACCENT} />
        <StatTile label="Postów po polsku" value={`${SOCIAL_DERIVED.polishPosts} z ${LI.posts}`} sub="przy bazie członkowskiej opartej na Polsce" tone="bad" />
        <StatTile label="Komentarzy z dwóch transmisji" value={`${SOCIAL_DERIVED.liveComments} z ${LI.comments}`} sub="jedyne miejsce, gdzie dzieje się rozmowa" accent={PLAN_ACCENT} />
        <StatTile label="Sieci osobistych do kaskady" value="9" sub="zarząd, dyrektorzy i czworo doradców-byłych ministrów" accent={PLAN_ACCENT} />
      </div>

      <Panel
        kicker="Decyzje kanałowe"
        title="Cztery kanały, cztery rozstrzygnięcia"
        lead="Każdy kanał dostaje decyzję, nie listę życzeń. Przy Facebooku decyzja jest binarna, bo trzecia opcja — zostawić jak jest — pracuje przeciwko sprzedaży członkostwa."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {CHANNEL_DECISIONS.map((c) => (
            <div key={c.key} className="rounded-[10px] border border-slate-200 px-4 py-3.5">
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                <p className="font-display text-[15px] font-extrabold leading-tight text-chamber-navy">{c.channel}</p>
                <StatusChip k={c.status} />
              </div>
              <p className="mt-1 text-[12.5px] font-bold leading-snug" style={{ color: PLAN_ACCENT }}>
                {c.verdict}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-[1.65] text-slate-600">{c.body}</p>
              <ul className="mt-2.5 space-y-1 border-t border-slate-100 pt-2.5">
                {c.actions.map((a) => (
                  <li key={a} className="flex gap-2 text-[12px] leading-[1.55] text-slate-600">
                    <span aria-hidden className="mt-[6px] h-1 w-1 shrink-0 rounded-full" style={{ background: PLAN_ACCENT }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        kicker="Miks formatów"
        title="Rozkład zastany jest odwrotny do skuteczności"
        lead={
          <>
            Wiersze uporządkowane malejąco po średniej reakcji. Kolumna udziału biegnie w drugą stronę — i to
            jest cała diagnoza. Format o najwyższej średniej ma{' '}
            <b className="text-chamber-navy">{BEST.posts} z {LI.posts}</b> publikacji, format o najniższej —{' '}
            <b className="text-chamber-navy">{WORST.posts}</b>.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Dwie kolumny, dwie skale, nigdy jedna oś.</b> Udział liczy się w
            postach, średnia w reakcjach; zestawione na wspólnej osi sugerowałyby zależność, której w tych
            danych nie ma. Obok siebie pokazują tę, która jest — odwrócenie. Liczby pochodzą z dwudziestu
            siedmiu zarchiwizowanych publikacji, nie z tej strony.
          </>
        }
      >
        <div className="flex justify-end">
          <ViewToggle table={table} onChange={setTable} controls="plan-mix" />
        </div>

        <div id="plan-mix" className="mt-3">
          {table ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="py-1.5 pr-3 font-bold">Format</th>
                    <th className="py-1.5 pr-3 text-right font-bold">Postów</th>
                    <th className="py-1.5 pr-3 text-right font-bold">Średnia reakcji</th>
                    <th className="py-1.5 pr-3 font-bold">Rekomendacja</th>
                    <th className="py-1.5 font-bold">Obserwacja z danych</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.key} className="border-b border-slate-100 align-top last:border-0">
                      <td className="py-2 pr-3 font-bold text-chamber-navy">{r.label}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-slate-600">
                        {r.posts} z {LI.posts}
                      </td>
                      <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">
                        {pl(r.mean)}
                      </td>
                      <td className="py-2 pr-3 font-semibold text-slate-600">{r.rec?.rec}</td>
                      <td className="py-2 text-slate-600">{r.rec?.observation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="hidden gap-3 pb-1.5 sm:flex">
                <span className="w-[150px] shrink-0" />
                <span className="flex-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  udział w publikacjach
                </span>
                <span className="flex-1 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: PLAN_ACCENT }}>
                  średnia reakcji
                </span>
                <span className="w-[132px] shrink-0" />
              </div>

              <ul className="space-y-1">
                {ROWS.map((r) => (
                  <li
                    key={r.key}
                    tabIndex={0}
                    className="flex cursor-default flex-col gap-1.5 rounded-[6px] py-1.5 outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 sm:flex-row sm:items-center sm:gap-3"
                    style={{ minHeight: MARK.minHitTarget }}
                    onPointerEnter={(e) =>
                      tip.show(
                        e,
                        [
                          { label: 'postów', value: `${r.posts} z ${LI.posts}` },
                          { label: 'średnia reakcji', value: pl(r.mean), color: PLAN_ACCENT },
                          { label: 'komentarzy', value: String(r.comments) },
                          { label: 'rekomendacja', value: r.rec?.rec ?? '' },
                        ],
                        r.label,
                        r.rec?.observation
                      )
                    }
                    onFocus={(e) => {
                      const b = e.currentTarget.getBoundingClientRect();
                      tip.show(
                        { clientX: b.left + b.width / 2, clientY: b.top },
                        [
                          { label: 'postów', value: `${r.posts} z ${LI.posts}` },
                          { label: 'średnia reakcji', value: pl(r.mean), color: PLAN_ACCENT },
                          { label: 'komentarzy', value: String(r.comments) },
                          { label: 'rekomendacja', value: r.rec?.rec ?? '' },
                        ],
                        r.label,
                        r.rec?.observation
                      );
                    }}
                    onPointerLeave={tip.hide}
                    onBlur={tip.hide}
                  >
                    <span className="break-words text-[12px] font-bold leading-snug text-chamber-navy sm:w-[150px] sm:shrink-0 sm:text-right">
                      {r.label}
                    </span>

                    <span className="flex flex-1 items-center gap-2">
                      <span className="sr-only">udział w publikacjach</span>
                      {/*
                       * Below 640 px the column headers are gone, so each bar
                       * carries its own short label — otherwise a phone shows
                       * two bars per row with nothing saying which is which.
                       */}
                      <span
                        aria-hidden
                        className="w-[46px] shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-400 sm:hidden"
                      >
                        udział
                      </span>
                      {/* Recessive ink: the share is the context, the reactions
                          column is the point. */}
                      <MiniBar value={r.posts} peak={PEAK_SHARE} color="rgba(41, 50, 119, 0.24)" />
                      <span className="w-[52px] shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
                        {r.posts}/{LI.posts}
                      </span>
                    </span>

                    <span className="flex flex-1 items-center gap-2">
                      <span className="sr-only">średnia reakcji</span>
                      <span
                        aria-hidden
                        className="w-[46px] shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wider sm:hidden"
                        style={{ color: PLAN_ACCENT }}
                      >
                        reakcje
                      </span>
                      <MiniBar value={r.mean} peak={PEAK_MEAN} color={PLAN_ACCENT} />
                      <span className="w-[38px] shrink-0 text-right text-[11px] font-extrabold tabular-nums text-chamber-navy">
                        {pl(r.mean)}
                      </span>
                    </span>

                    {r.rec && (
                      <span className="sm:w-[132px] sm:shrink-0">
                        <RecChip rec={r.rec.rec} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
          {ROWS.filter((r) => r.rec?.comment).map((r) => (
            <li key={r.key} className="text-[12.5px] leading-[1.65] text-slate-600">
              <b className="text-chamber-navy">{r.label}:</b> {r.rec?.comment}
            </li>
          ))}
        </ul>

        <ChartTip tip={tip.tip} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Rytm tygodniowy"
          title="Trzy stałe rytuały z nazwą"
          lead={RITUAL_RULE}
        >
          {/* A week, with the three fixed slots marked. The two empty days are
              part of the recommendation: a ritual that fills every day is not a
              ritual, it is a quota. */}
          <div className="mb-4 flex gap-1.5">
            {WEEK.map((d, i) => {
              const on = RITUALS.some((r) => r.dayIndex === i);
              return (
                <span
                  key={d}
                  className="flex flex-1 items-center justify-center rounded-[6px] py-1.5 text-[11px] font-bold"
                  style={{
                    background: on ? PLAN_ACCENT : INK.track,
                    color: on ? '#fff' : INK.dim,
                  }}
                >
                  {d}
                </span>
              );
            })}
          </div>
          <ul className="space-y-3">
            {RITUALS.map((r) => (
              <li key={r.day}>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    {r.day}
                  </span>
                  <span className="text-[13px] font-extrabold text-chamber-navy">{r.name}</span>
                  <span className="font-mono text-[10px] font-bold" style={{ color: PLAN_ACCENT }}>
                    {r.format}
                  </span>
                </p>
                <p className="mt-0.5 text-[12px] leading-[1.6] text-slate-600">{r.what}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          kicker="Kaskada publikacji"
          title="Jedna publikacja, dziewięć sieci"
          lead={CASCADE.rule}
          note="Strona firmowa ma strukturalnie niższy zasięg niż profil człowieka. Cztery z dziewięciu sieci są zagraniczne — dokładnie tam, gdzie baza członkowska jest symboliczna."
        >
          {/* A clock, not a chart: the window is the recommendation. */}
          <div className="relative" style={{ height: 46 }}>
            <span aria-hidden className="absolute left-0 right-0 top-[18px] h-px" style={{ background: INK.grid }} />
            <span
              aria-hidden
              className="absolute top-[14px] h-[9px] rounded-full"
              style={{
                left: `${((CASCADE.fromHour - 8) / 8) * 100}%`,
                width: `${((CASCADE.toHour - CASCADE.fromHour) / 8) * 100}%`,
                background: `${PLAN_ACCENT}33`,
              }}
            />
            {[
              { h: CASCADE.pageHour, label: 'post strony', strong: true },
              { h: CASCADE.fromHour, label: 'start kaskady', strong: false },
              { h: CASCADE.toHour, label: 'koniec okna', strong: false },
            ].map((m) => (
              <span key={m.h} className="absolute top-0" style={{ left: `${((m.h - 8) / 8) * 100}%` }}>
                <span
                  aria-hidden
                  className="absolute top-[14px] h-[9px] w-[9px] -translate-x-1/2 rounded-full"
                  style={{ background: m.strong ? PLAN_ACCENT : '#fff', boxShadow: `0 0 0 2px ${PLAN_ACCENT}` }}
                />
                <span className="absolute top-0 -translate-x-1/2 font-mono text-[10px] font-extrabold text-chamber-navy">
                  {m.h}:00
                </span>
                <span className="absolute top-[28px] -translate-x-1/2 whitespace-nowrap font-mono text-[9.5px] font-bold text-slate-400">
                  {m.label}
                </span>
              </span>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        kicker="Formaty wideo"
        title="Sześć odmian, każda o innym zastosowaniu"
        lead="Długość i kadencja są częścią definicji formatu, nie sugestią. Format bez ustalonej długości zamienia się w relację z panelu, a relacja z panelu nie działa."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_FORMATS.map((v) => (
            <DefCard key={v.name} title={v.name} meta={`${v.spec} · ${v.cadence}`} accent>
              <p>{v.what}</p>
              <p className="text-slate-500">{v.why}</p>
            </DefCard>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Formaty pisemne"
          title="Co daje członkowi coś, czym pochwali się u siebie"
          lead="Wywiad ma trzy odmiany o różnym zastosowaniu. W każdej pełna wersja idzie na stronę, fragment na LinkedIn, setka jako zajawka."
        >
          <ul className="space-y-3">
            {WRITTEN_FORMATS.map((w) => (
              <li key={w.name}>
                <p className="text-[12.5px] font-extrabold leading-snug text-chamber-navy">{w.name}</p>
                <p className="mt-0.5 text-[12px] leading-[1.6] text-slate-600">{w.what}</p>
                <p className="mt-0.5 text-[12px] leading-[1.6]" style={{ color: PLAN_ACCENT }}>
                  {w.use}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          kicker="Protokół amplifikacji"
          title={`Pakiet do każdego tagowanego podmiotu, ${AMPLIFICATION.when}`}
          lead={AMPLIFICATION.why}
        >
          <Steps items={AMPLIFICATION.items.map((what) => ({ what }))} />
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tagowanie
            </p>
            <RuleColumns always={TAGGING.always} never={TAGGING.never} />
            <p className="mt-3 text-[12px] leading-[1.6] text-slate-500">{TAGGING.rule}</p>
          </div>
        </Panel>
      </div>

      <Panel
        kicker="Co podkreślać"
        title="Kolejność argumentów jest częścią rekomendacji"
        lead="Wynika z tego, co izba faktycznie ma, a czego nie mają konkurenci krajowi. Pierwsza pozycja nie jest do odtworzenia przez nikogo w regionie w skali roku."
      >
        <ol className="space-y-3">
          {EMPHASIS.map((e, i) => (
            <li key={e.what} className="flex gap-3">
              <span
                className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-extrabold text-white"
                style={{ background: PLAN_ACCENT }}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{e.what}</span>
                <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{e.why}</span>
                {e.caution && (
                  <span className="mt-1 block rounded-[6px] px-2.5 py-1.5 text-[11.5px] leading-[1.55] text-slate-600" style={{ background: INK.track }}>
                    <b className="text-chamber-navy">Uwaga:</b> {e.caution}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Czego nie podkreślać
          </p>
          <ul className="space-y-1.5">
            {DO_NOT_EMPHASISE.map((d) => (
              <li key={d.what} className="text-[12.5px] leading-[1.6] text-slate-600">
                <b className="text-chamber-navy">{d.what}</b> — {d.why}
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel
        kicker="Próg jakości"
        title="Post nie wychodzi, jeśli którekolwiek z tych jest prawdziwe"
        lead="Cztery warunki wykluczające. Nie lista życzeń — lista powodów odrzucenia."
      >
        <RuleColumns
          always={['Jest w nim człowiek, liczba albo data.', 'Da się z niego wyjąć jedno cytowalne zdanie.', 'Grafika jest własna albo zaadaptowana.', 'Tekst napisany pod tę platformę.']}
          never={POST_GATE}
          alwaysLabel="Wychodzi, gdy"
          neverLabel="Nie wychodzi, gdy"
        />
      </Panel>

      <WatchBlock baseline={SOCIAL_WATCH.baseline} watch={SOCIAL_WATCH.watch} />
    </div>
  );
}
