import { useId, useMemo, useState } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { INK, MARK } from '@/components/marketing/palette';
import { StatTile, ViewToggle } from '@/components/marketing/primitives';
import { artifactByKey } from '@/content/conference/artifacts';
import { dayOffset, sessionByKey, timecode } from '@/content/conference/event';
import { SHORTS, SHORTS_WINDOW, SHORT_KINDS } from '@/content/conference/shorts';
import type { ShortKind } from '@/content/conference/types';
import { GateList, Panel } from '../primitives';
import { SessionRibbon } from '../SessionRibbon';
import { MEDIUM_COLOR, clock, edgeAnchor, ribbonPos } from '../tokens';

const ARTIFACT = artifactByKey('setki');
const FILL = MEDIUM_COLOR.wideo;

const PUB_FROM = SHORTS_WINDOW.from;
const PUB_TO = SHORTS_WINDOW.to;
/** Publication day → percent of the bottom axis. */
const pubPos = (day: number) => ((day - PUB_FROM) / (PUB_TO - PUB_FROM)) * 100;

const TICKS = [14, 21, 28, 35];

/**
 * The cut map.
 *
 * Two axes that are both time but not the same time: across the top, position
 * inside the recording; across the bottom, the day the clip goes out. The line
 * between them is the only thing on the page that draws the actual claim —
 * that three weeks of publication already exist inside one afternoon, and the
 * marginal cost of each one is an edit.
 *
 * Kind is a highlight, never a hue. The medium already owns blue here; a
 * second categorical scale would make the same colour mean "wideo" in the
 * cascade and "gorąca" in this chart.
 */
export function ShortsTab() {
  const tip = useChartTip();
  const uid = useId();
  const bodyId = `${uid}-body`;
  const [kind, setKind] = useState<ShortKind | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [table, setTable] = useState(false);
  const today = useMemo(() => dayOffset(), []);

  const counts = useMemo(() => {
    const out = {} as Record<ShortKind, number>;
    for (const k of SHORT_KINDS) out[k.key] = SHORTS.filter((s) => s.kind === k.key).length;
    return out;
  }, []);

  const lit = (id: string, k: ShortKind) => (hover ? hover === id : kind === null || kind === k);
  const ahead = SHORTS.filter((s) => s.publishDay >= today).length;

  const chip = (on: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-bold outline-none transition-colors ${
      on
        ? 'border-chamber-navy bg-chamber-navy/[0.06] text-chamber-navy'
        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-chamber-navy'
    }`;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Klipów z jednego nagrania" value={String(SHORTS.length)} sub="bez jednego dnia zdjęciowego więcej" accent={FILL} />
        <StatTile label="Tygodni publikacji" value={String(Math.round((PUB_TO - PUB_FROM) / 7))} sub={`od T+${PUB_FROM} do T+${PUB_TO}`} accent={FILL} />
        <StatTile label="Minut materiału do zmontowania" value={String(Math.round(SHORTS_WINDOW.seconds / 60))} sub={`${SHORTS_WINDOW.seconds} sekund łącznie, z ${ARTIFACT.dueShort}`} />
        <StatTile label="Klipów z tej serii po edycji 2026" value="0" sub="w próbie 27 postów LinkedIna nie ma ani jednego" tone="bad" />
      </div>

      <Panel
        kicker="Mapa cięć"
        title="Skąd w nagraniu i na kiedy"
        lead={
          <>
            Góra to nagranie, dół to kalendarz publikacji, linia łączy jedno z drugim. Najeźdź na kropkę
            albo przejdź do niej klawiszem tabulacji, żeby zobaczyć timecode, długość i mówcę.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Dwie osie, dwa różne czasy.</b> U góry minuty wewnątrz nagrania,
            u dołu dni po wydarzeniu. Nie da się ich połączyć w jedną skalę, więc linia przechodzi między
            nimi zamiast udawać ciągłość. Dziś jest {today >= 0 ? `T+${today}` : `T${today}`} —{' '}
            {ahead === SHORTS.length
              ? 'cała seria jest jeszcze przed nami'
              : ahead === 0
                ? 'okno tej edycji już się zamknęło'
                : `${ahead} z ${SHORTS.length} klipów ma datę nie wcześniejszą niż dzisiejsza`}
            .
          </>
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div role="group" aria-label="Wyróżnij rodzaj setki" className="flex flex-wrap items-center gap-1.5">
            <button type="button" onClick={() => setKind(null)} aria-pressed={kind === null} aria-controls={bodyId} className={chip(kind === null)} style={{ minHeight: MARK.minHitTarget }}>
              wszystkie
              <span className="font-mono text-[10px] font-bold text-slate-400">{SHORTS.length}</span>
            </button>
            {SHORT_KINDS.map((k) => (
              <button
                key={k.key}
                type="button"
                onClick={() => setKind((c) => (c === k.key ? null : k.key))}
                aria-pressed={kind === k.key}
                aria-controls={bodyId}
                className={chip(kind === k.key)}
                style={{ minHeight: MARK.minHitTarget }}
              >
                {k.key}
                <span className="font-mono text-[10px] font-bold text-slate-400">{counts[k.key]}</span>
              </button>
            ))}
          </div>
          <ViewToggle table={table} onChange={setTable} controls={bodyId} />
        </div>

        <div id={bodyId} className="mt-4">
          {table ? (
            <ShortsTable />
          ) : (
            <>
              <SessionRibbon height={28} showChapters={false} />

              {/* Connector band. The SVG stretches on both axes, so the strokes
                  are marked non-scaling to keep their weight at any width; the
                  dots are HTML for the same reason — a stretched circle is an
                  ellipse, and an ellipse would read as an encoding. */}
              <div className="relative" style={{ height: 96 }}>
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  {SHORTS.map((s) => {
                    const sx = ribbonPos(s.at);
                    const px = pubPos(s.publishDay);
                    return (
                      <path
                        key={s.id}
                        d={`M ${sx} 0 C ${sx} 42, ${px} 58, ${px} 100`}
                        fill="none"
                        stroke={FILL}
                        strokeWidth={hover === s.id ? 2 : 1}
                        vectorEffect="non-scaling-stroke"
                        opacity={lit(s.id, s.kind) ? 0.75 : 0.12}
                      />
                    );
                  })}
                </svg>
              </div>

              {/*
               * Publication axis. The dots at T+14 and T+35 sit exactly on the
               * ends, so their hit targets — deliberately wider than the 9 px
               * mark — reach a few pixels past this box and into the card's own
               * padding. Nothing clips them and the page does not scroll; the
               * alternative, insetting the axis, would offset every curve from
               * the point in the recording it is supposed to start at.
               */}
              <div className="relative" style={{ height: 30 }}>
                <span aria-hidden className="absolute left-0 right-0 top-[7px] h-px" style={{ background: INK.grid }} />
                {SHORTS.map((s) => {
                  const on = lit(s.id, s.kind);
                  const session = sessionByKey(s.session);
                  const rows = [
                    { label: 'rodzaj', value: s.kind, color: FILL },
                    { label: 'w nagraniu', value: `${timecode(s.at)} · sesja ${session?.no}` },
                    { label: 'długość', value: clock(s.seconds) },
                    { label: 'publikacja', value: `T+${s.publishDay}` },
                    { label: 'mówca', value: s.speakerSlot },
                  ];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className="absolute top-0 -translate-x-1/2 outline-none"
                      style={{ left: `${pubPos(s.publishDay)}%`, width: MARK.minHitTarget, height: MARK.minHitTarget, marginTop: -5 }}
                      aria-label={`Setka ${s.kind}, publikacja T+${s.publishDay}: ${s.thesis}`}
                      onPointerEnter={(e) => {
                        setHover(s.id);
                        tip.show(e, rows, `T+${s.publishDay} · setka ${s.kind}`, s.thesis);
                      }}
                      onFocus={(e) => {
                        setHover(s.id);
                        const r = e.currentTarget.getBoundingClientRect();
                        tip.show({ clientX: r.left + r.width / 2, clientY: r.top }, rows, `T+${s.publishDay} · setka ${s.kind}`, s.thesis);
                      }}
                      onPointerLeave={() => {
                        setHover(null);
                        tip.hide();
                      }}
                      onBlur={() => {
                        setHover(null);
                        tip.hide();
                      }}
                    >
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-[12px] h-[9px] w-[9px] -translate-x-1/2 rounded-full transition-opacity"
                        style={{ background: FILL, boxShadow: `0 0 0 ${MARK.ringWidth}px ${INK.surface}`, opacity: on ? 1 : 0.18 }}
                      />
                    </button>
                  );
                })}
                {TICKS.map((t) => {
                  const p = pubPos(t);
                  return (
                    <span
                      key={t}
                      className={`absolute top-[19px] font-mono text-[10px] font-bold text-slate-400 ${edgeAnchor(p)}`}
                      style={{ left: `${p}%` }}
                    >
                      T+{t}
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Cztery odmiany"
          title="Każda robi coś innego"
          lead="Rodzaj decyduje o długości, o tym, kto stoi przed kamerą, i o tym, na co klip pracuje. Kliknięcie w wykresie wyżej podświetla tylko jedną z nich."
        >
          <ul className="space-y-3.5">
            {SHORT_KINDS.map((k) => (
              <li key={k.key}>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[12.5px] font-extrabold text-chamber-navy">setka {k.key}</span>
                  <span className="font-mono text-[10.5px] font-bold text-slate-400">{k.length}</span>
                  <span className="font-mono text-[10.5px] font-bold" style={{ color: FILL }}>
                    {counts[k.key]} szt.
                  </span>
                </p>
                <p className="mt-0.5 text-[12px] leading-[1.6] text-slate-600">{k.brief}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          kicker="Warunki"
          title="Próg publikacji"
          note={
            <>
              Klip idzie do sieci prelegenta, nie tylko izby — dlatego tag mówcy jest warunkiem, a nie
              uprzejmością. Profil człowieka ma strukturalnie wyższy zasięg niż strona firmowa, więc każdy
              nieotagowany klip zostawia zasięg na stole.
            </>
          }
        >
          <GateList items={ARTIFACT.gate} title="" />
        </Panel>
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}

function ShortsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-[12.5px]">
        <thead>
          <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
            <th className="py-1.5 pr-3 font-bold">Publikacja</th>
            <th className="py-1.5 pr-3 font-bold">Rodzaj</th>
            <th className="py-1.5 pr-3 font-bold">W nagraniu</th>
            <th className="py-1.5 pr-3 text-right font-bold">Długość</th>
            <th className="py-1.5 pr-3 font-bold">Mówca</th>
            <th className="py-1.5 pr-3 font-bold">Format</th>
            <th className="py-1.5 font-bold">O czym</th>
          </tr>
        </thead>
        <tbody>
          {[...SHORTS]
            .sort((a, b) => a.publishDay - b.publishDay)
            .map((s) => (
              <tr key={s.id} className="border-b border-slate-100 align-top last:border-0">
                <td className="py-2 pr-3 font-mono font-bold text-chamber-navy">T+{s.publishDay}</td>
                <td className="py-2 pr-3 font-semibold text-slate-600">{s.kind}</td>
                <td className="py-2 pr-3 font-mono tabular-nums text-slate-500">
                  {timecode(s.at)} · S{sessionByKey(s.session)?.no}
                </td>
                <td className="py-2 pr-3 text-right font-bold tabular-nums text-chamber-navy">{clock(s.seconds)}</td>
                <td className="py-2 pr-3 text-slate-600">{s.speakerSlot}</td>
                <td className="py-2 pr-3 font-mono text-[11px] text-slate-500">{s.formats.join(' · ')}</td>
                <td className="py-2 text-slate-600">{s.thesis}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
