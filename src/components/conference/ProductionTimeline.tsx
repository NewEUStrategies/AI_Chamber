import { useId, useMemo, useState } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { INK, MARK } from '@/components/marketing/palette';
import { ViewToggle } from '@/components/marketing/primitives';
import { ARTIFACTS, artifactByKey } from '@/content/conference/artifacts';
import { dayOffset, tLabel } from '@/content/conference/event';
import { DAY_ZERO, DAY_ZERO_AXIS_MAX, MILESTONES } from '@/content/conference/production';
import type { ArtifactKey } from '@/content/conference/types';
import { MEDIUM_COLOR, PHASE_TINT, edgeAnchor } from './tokens';

/* ---------------------------------------------------------------- *
 * Scales                                                           *
 * ---------------------------------------------------------------- */

const FROM = Math.min(...MILESTONES.map((m) => m.day));
const TO = Math.max(...MILESTONES.map((m) => m.day));
const SPAN = TO - FROM;

/** Day → percent of the campaign axis. */
const dayPos = (day: number) => ((day - FROM) / SPAN) * 100;

/**
 * Ticks are drawn for every milestone; labels only for these four. Thirteen
 * labels on a hundred-and-twenty-five-day axis collide around day zero, where
 * nine of them sit inside three weeks — so the axis keeps the marks and hands
 * the names to the list underneath, which is where they are readable anyway.
 * Four is what survives at 360 px: a fifth at T+7 sat inside the width of the
 * „dzień zero” label and overprinted it.
 */
const LABELLED = new Set([-90, -30, 0, 35]);

/*
 * The label column is 146 px and the row gap is 10 px, so the axis below the
 * bars starts at 156 px. Both are literals on purpose: they have to move
 * together, and a class next to a style prop hides that they are one measure.
 */

type Scale = 'kampania' | 'dzien';

/* ---------------------------------------------------------------- *
 * Component                                                        *
 * ---------------------------------------------------------------- */

/**
 * The calendar at two zoom levels, because one axis cannot carry both.
 *
 * On the campaign scale a day is under one percent of the width, so a
 * thirty-minute deadline is invisible; on the day-zero scale ninety minutes
 * fill the screen and T+35 is off it. They are the same timeline, so the
 * control switches between them rather than compromising into an axis that
 * shows neither honestly.
 *
 * Both scales are linked to the open tab: the selected family's bar and rows
 * keep full colour, the rest drop back to recessive ink. Nothing is removed —
 * the surrounding calendar is the context that makes one bar mean anything.
 */
export function ProductionTimeline({ active }: { active: ArtifactKey }) {
  const tip = useChartTip();
  const uid = useId();
  const bodyId = `${uid}-body`;
  const [scale, setScale] = useState<Scale>('kampania');
  const [table, setTable] = useState(false);
  const today = useMemo(() => dayOffset(), []);
  const artifact = artifactByKey(active);
  const inRange = today >= FROM && today <= TO;

  const relevant = MILESTONES.filter((m) => m.artifacts.includes(active));

  return (
    <section className="rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Kalendarz produkcji
          </p>
          <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
            Kiedy powstaje i kiedy musi wyjść
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Skala osi" className="flex items-center gap-1.5">
            {(['kampania', 'dzien'] as Scale[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScale(s)}
                aria-pressed={scale === s}
                aria-controls={bodyId}
                className={`rounded-full border px-2.5 text-[11.5px] font-bold outline-none transition-colors ${
                  scale === s
                    ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy'
                }`}
                style={{ minHeight: MARK.minHitTarget }}
              >
                {s === 'kampania' ? 'oś kampanii · dni' : 'dzień zero · minuty'}
              </button>
            ))}
          </div>
          <ViewToggle table={table} onChange={setTable} controls={bodyId} />
        </div>
      </div>

      <p className="mt-2 text-[12.5px] leading-[1.65] text-slate-600">
        Pełną barwę trzyma rodzina otwarta w zakładce —{' '}
        <b style={{ color: MEDIUM_COLOR[artifact.medium] }}>{artifact.label.toLowerCase()}</b>. Reszta
        kalendarza zostaje na miejscu w wyciszonej szarości, bo to ona nadaje jednemu paskowi sens.
      </p>

      <div id={bodyId} className="mt-5">
        {table ? (
          <TimelineTable />
        ) : scale === 'kampania' ? (
          <CampaignScale active={active} today={today} inRange={inRange} tip={tip} />
        ) : (
          <DayZeroScale active={active} tip={tip} />
        )}
      </div>

      {!table && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Punkty kalendarza dotyczące tej rodziny · {relevant.length} z {MILESTONES.length}
          </p>
          <ul className="space-y-2.5">
            {relevant.map((m) => (
              <li key={m.day} className="flex gap-3">
                <span className="w-[74px] shrink-0 text-right font-mono text-[11px] font-extrabold text-chamber-navy">
                  {m.label}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{m.title}</span>
                  <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{m.what}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ChartTip tip={tip.tip} />
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Campaign scale — days                                            *
 * ---------------------------------------------------------------- */

type Tip = ReturnType<typeof useChartTip>;

function CampaignScale({
  active,
  today,
  inRange,
  tip,
}: {
  active: ArtifactKey;
  today: number;
  inRange: boolean;
  tip: Tip;
}) {
  return (
    <div>
      {/* Phase bands are neutral tints: the bars above them already spend the
          page's only categorical scale, and two of those on one axis is one
          too many. */}
      <div className="relative mb-1.5 flex h-[18px] overflow-hidden rounded-[4px] text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span
          className="flex items-center justify-center"
          style={{ width: `${dayPos(0)}%`, background: PHASE_TINT.przed }}
        >
          przed
        </span>
        <span
          className="flex items-center justify-center"
          style={{ width: `${dayPos(1) - dayPos(0)}%`, background: PHASE_TINT.dzien }}
        />
        <span
          className="flex flex-1 items-center justify-center"
          style={{ background: PHASE_TINT.po }}
        >
          po
        </span>
      </div>

      <div className="relative">
        {/* Today. A solid rule, not a dash: it is a threshold, and dashing on an
            axis reads as "projected". Drawn only while it falls inside the window. */}
        {inRange && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-10 w-[2px]"
            style={{ left: `${dayPos(today)}%`, background: INK.strong }}
          />
        )}

        <ul className="space-y-1">
          {ARTIFACTS.map((a) => {
            const on = a.key === active;
            const left = dayPos(a.fromDay);
            const width = Math.max(dayPos(a.dueDay) - left, 0);
            return (
              <li key={a.key} className="rounded-[6px] py-0.5 transition-colors hover:bg-slate-50">
                {/*
                 * Below 640 px the label sits above its own bar rather than in a
                 * column. Hiding it there — which is what a `sm:block` column
                 * alone does — left seven anonymous bars and no way to tell
                 * which family any of them belonged to.
                 */}
                <span
                  className={`mb-0.5 block text-[11px] font-bold leading-tight sm:hidden ${
                    on ? 'text-chamber-navy' : 'text-slate-400'
                  }`}
                >
                  {a.label}
                </span>
                <span className="flex items-center gap-2.5">
                <span
                  className={`hidden w-[146px] shrink-0 text-right text-[11px] font-bold leading-tight sm:block ${
                    on ? 'text-chamber-navy' : 'text-slate-400'
                  }`}
                >
                  {a.label}
                </span>
                <span
                  tabIndex={0}
                  role="img"
                  aria-label={`${a.label}: produkcja od ${tLabel(a.fromDay)} do ${tLabel(a.dueDay)}`}
                  className="relative flex-1 cursor-default outline-none"
                  style={{ height: 14 }}
                  onPointerEnter={(e) =>
                    tip.show(
                      e,
                      [
                        { label: 'start', value: tLabel(a.fromDay), color: MEDIUM_COLOR[a.medium] },
                        { label: 'termin', value: a.due },
                        { label: 'jednostek', value: a.unitLabel },
                      ],
                      a.label,
                      a.what
                    )
                  }
                  onFocus={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    tip.show(
                      { clientX: r.left + r.width / 2, clientY: r.top },
                      [
                        { label: 'start', value: tLabel(a.fromDay), color: MEDIUM_COLOR[a.medium] },
                        { label: 'termin', value: a.due },
                        { label: 'jednostek', value: a.unitLabel },
                      ],
                      a.label,
                      a.what
                    );
                  }}
                  onPointerLeave={tip.hide}
                  onBlur={tip.hide}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-[5px] left-0 w-full rounded-[2px]"
                    style={{ background: INK.track }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-y-0 rounded-[4px] transition-opacity duration-300"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      minWidth: 10,
                      background: MEDIUM_COLOR[a.medium],
                      opacity: on ? 1 : 0.24,
                    }}
                  />
                </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Axis. Every milestone gets a tick; five get a name. */}
      <div className="relative mt-2 sm:ml-[156px]">
        <div className="h-px w-full" style={{ background: INK.grid }} />
        {MILESTONES.map((m) => (
          <span
            key={m.day}
            aria-hidden
            className="absolute top-0 w-px"
            style={{ left: `${dayPos(m.day)}%`, height: LABELLED.has(m.day) ? 7 : 4, background: INK.dim }}
          />
        ))}
        <div className="relative h-[15px]">
          {MILESTONES.filter((m) => LABELLED.has(m.day)).map((m) => {
            const p = dayPos(m.day);
            return (
              <span
                key={m.day}
                className={`absolute top-[7px] whitespace-nowrap font-mono text-[10px] font-bold text-slate-400 ${edgeAnchor(p)}`}
                style={{ left: `${p}%` }}
              >
                {m.label}
              </span>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-[11.5px] leading-[1.6] text-slate-500">
        {inRange ? (
          <>
            Pionowa kreska to <b className="text-chamber-navy">dziś — {tLabel(today)}</b> względem edycji{' '}
            2026. Okno dystrybucji tej edycji zamyka się w T+35.
          </>
        ) : (
          <>Dzisiejsza data wypada poza oknem tej edycji, więc znacznik „dziś” nie jest rysowany.</>
        )}{' '}
        Oś jest liniowa w dniach: dziewięć z trzynastu punktów kalendarza mieści się w trzech tygodniach
        wokół dnia zero i dlatego zagęszcza się po prawej stronie.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Day zero — minutes                                               *
 * ---------------------------------------------------------------- */

function DayZeroScale({ active, tip }: { active: ArtifactKey; tip: Tip }) {
  const onAxis = DAY_ZERO.filter((s) => s.minutes <= DAY_ZERO_AXIS_MAX);
  const offAxis = DAY_ZERO.filter((s) => s.minutes > DAY_ZERO_AXIS_MAX);
  const ticks = [0, 30, 60, 90];

  return (
    <div>
      <ul className="space-y-1.5">
        {[...onAxis]
          .sort((a, b) => a.minutes - b.minutes)
          .map((s) => {
            const a = artifactByKey(s.artifact);
            const on = s.artifact === active;
            const fill = MEDIUM_COLOR[a.medium];
            return (
              <li key={s.label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                <span
                  className={`break-words text-[12px] font-bold leading-snug sm:w-[186px] sm:shrink-0 sm:text-right ${
                    on ? 'text-chamber-navy' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
                <span className="flex items-center gap-3 sm:contents">
                  <span
                    tabIndex={0}
                    role="img"
                    aria-label={`${s.label}: ${s.minutes} minut od momentu „${s.trigger}”`}
                    className="relative flex-1 cursor-default outline-none"
                    style={{ height: 14 }}
                    onPointerEnter={(e) =>
                      tip.show(
                        e,
                        [
                          { label: 'termin', value: `${s.minutes} min`, color: fill },
                          { label: 'liczone od', value: s.trigger },
                          { label: 'rodzina', value: a.label },
                        ],
                        s.label
                      )
                    }
                    onFocus={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      tip.show(
                        { clientX: r.left + 40, clientY: r.top },
                        [
                          { label: 'termin', value: `${s.minutes} min`, color: fill },
                          { label: 'liczone od', value: s.trigger },
                          { label: 'rodzina', value: a.label },
                        ],
                        s.label
                      );
                    }}
                    onPointerLeave={tip.hide}
                    onBlur={tip.hide}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-[5px] left-0 w-full rounded-[2px]"
                      style={{ background: INK.track }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 rounded-[0_4px_4px_0] transition-opacity duration-300"
                      style={{
                        width: `${Math.max((s.minutes / DAY_ZERO_AXIS_MAX) * 100, 2)}%`,
                        background: fill,
                        opacity: on ? 1 : 0.24,
                      }}
                    />
                  </span>
                  <span className="w-[86px] shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-500">
                    {s.minutes === 0 ? 'w tej minucie' : `${s.minutes} min`}
                  </span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 sm:hidden">od: {s.trigger}</span>
              </li>
            );
          })}
      </ul>

      <div className="relative mt-2 sm:ml-[198px] sm:mr-[98px]">
        <div className="h-px w-full" style={{ background: INK.grid }} />
        <div className="relative h-[15px]">
          {/* The unit rides on the last tick. As a separate right-anchored label
              it printed on top of the „90”, because that tick sits at 100 %. */}
          {ticks.map((t, i) => {
            const p = (t / DAY_ZERO_AXIS_MAX) * 100;
            return (
              <span key={t} className="absolute top-0" style={{ left: `${p}%` }}>
                <span aria-hidden className="absolute top-0 h-[5px] w-px" style={{ background: INK.dim }} />
                <span
                  className={`absolute top-[7px] whitespace-nowrap font-mono text-[10px] font-bold text-slate-400 ${edgeAnchor(p)}`}
                >
                  {t}
                  {i === ticks.length - 1 ? ' min' : ''}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {offAxis.map((s) => (
        <div
          key={s.label}
          className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[8px] border border-dashed border-slate-200 px-3 py-2"
        >
          <span className="text-[12px] font-bold text-chamber-navy">{s.label}</span>
          <span className="font-mono text-[11px] font-bold text-slate-400">
            ok. {Math.round(s.minutes / 60)} h od momentu „{s.trigger}”
          </span>
        </div>
      ))}

      <p className="mt-3 text-[11.5px] leading-[1.6] text-slate-500">
        Każdy termin liczy się <b className="text-slate-600">od własnego zdarzenia</b>, nie od początku
        dnia: zdjęcie podpisu ma trzydzieści minut od podpisu, pierwszy kadr z sali sześćdziesiąt od
        otwarcia drzwi. Dopiero tak zapisany termin da się wyegzekwować. Podsumowanie dnia nie mieści się
        na tej osi — rozciągnięcie jej do sześciuset minut zgniotłoby wszystkie pozostałe terminy w
        pierwszej siódmej części szerokości, więc stoi osobno zamiast udawać, że jest porównywalne.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Table twin                                                       *
 * ---------------------------------------------------------------- */

function TimelineTable() {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-[12.5px]">
          <caption className="mb-2 text-left font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Oś kampanii
          </caption>
          <thead>
            <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="py-1.5 pr-3 font-bold">Termin</th>
              <th className="py-1.5 pr-3 font-bold">Punkt</th>
              <th className="py-1.5 pr-3 font-bold">Co się dzieje</th>
              <th className="py-1.5 font-bold">Rodziny</th>
            </tr>
          </thead>
          <tbody>
            {MILESTONES.map((m) => (
              <tr key={m.day} className="border-b border-slate-100 align-top last:border-0">
                <td className="py-2 pr-3 font-mono font-bold text-chamber-navy">{m.label}</td>
                <td className="py-2 pr-3 font-bold text-chamber-navy">{m.title}</td>
                <td className="py-2 pr-3 text-slate-600">{m.what}</td>
                <td className="py-2 text-slate-600">
                  {m.artifacts.map((k) => artifactByKey(k).label).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-[12.5px]">
          <caption className="mb-2 text-left font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Dzień zero
          </caption>
          <thead>
            <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="py-1.5 pr-3 font-bold">Materiał</th>
              <th className="py-1.5 pr-3 text-right font-bold">Minut</th>
              <th className="py-1.5 pr-3 font-bold">Liczone od</th>
              <th className="py-1.5 font-bold">Rodzina</th>
            </tr>
          </thead>
          <tbody>
            {[...DAY_ZERO]
              .sort((a, b) => a.minutes - b.minutes)
              .map((s) => (
                <tr key={s.label} className="border-b border-slate-100 align-top last:border-0">
                  <td className="py-2 pr-3 font-bold text-chamber-navy">{s.label}</td>
                  <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">{s.minutes}</td>
                  <td className="py-2 pr-3 text-slate-600">{s.trigger}</td>
                  <td className="py-2 text-slate-600">{artifactByKey(s.artifact).label}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
