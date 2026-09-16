import { useRef, type KeyboardEvent } from 'react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { INK, MARK, STATUS, plInt } from '@/components/marketing/palette';
import { StatusChip } from '@/components/marketing/primitives';
import { ARTIFACTS, CASCADE } from '@/content/conference/artifacts';
import { RECORDING } from '@/content/conference/event';
import type { ArtifactKey } from '@/content/conference/types';
import { MEDIUM_COLOR, SOURCE_COLOR } from './tokens';

const PEAK = Math.max(...ARTIFACTS.map((a) => a.units));

/**
 * The multiplication cascade — and the page's tab list, in one object.
 *
 * Splitting them would mean drawing the same seven rows twice: once as a
 * picture of how much each family yields, once as a row of pills to click.
 * Here the picture is the control. Each row carries its medium's colour, a
 * bar for the number of separately published items, its deadline and the
 * state the reconnaissance could establish — so choosing what to read is
 * itself the act of reading the distribution.
 *
 * Semantics are a plain vertical tablist: roving tabindex, arrows to move,
 * Home and End to jump. The visual is unusual; the keyboard contract is not.
 */
export function CascadeNav({
  active,
  onSelect,
}: {
  active: ArtifactKey;
  onSelect: (key: ArtifactKey) => void;
}) {
  const tip = useChartTip();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ARTIFACTS.map((a) => a.key);
    const i = keys.indexOf(active);
    let next = i;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % keys.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + keys.length) % keys.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = keys.length - 1;
    else return;
    e.preventDefault();
    onSelect(keys[next]);
    refs.current[keys[next]]?.focus();
  };

  return (
    <div className="rounded-[14px] border border-slate-200 bg-white p-4 shadow-card sm:p-5">
      <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
        Kaskada · jeden dzień, siedem rodzin materiału
      </p>
      <h2 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
        Co wychodzi z jednego nagrania
      </h2>

      {/* The source. Recessive ink: it is where the colour comes from, not one of the series. */}
      <div
        className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-[10px] px-3.5 py-2.5"
        style={{ background: INK.track }}
      >
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: SOURCE_COLOR }} />
        <span className="text-[12.5px] font-extrabold text-chamber-navy">Materiał źródłowy</span>
        <span className="text-[12px] font-semibold text-slate-500">
          {RECORDING.sessions} sesji · {RECORDING.minutes} minut nagrania · {RECORDING.chapters} rozdziałów ·{' '}
          {plInt(RECORDING.words)} słów transkrypcji
        </span>
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Rodziny materiału konferencyjnego"
        onKeyDown={move}
        className="mt-1"
      >
        {ARTIFACTS.map((a, i) => {
          const fill = MEDIUM_COLOR[a.medium];
          const on = a.key === active;
          return (
            <button
              key={a.key}
              ref={(el) => {
                refs.current[a.key] = el;
              }}
              role="tab"
              id={`kf-tab-${a.key}`}
              aria-selected={on}
              aria-controls={`kf-panel-${a.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => onSelect(a.key)}
              onPointerEnter={(e) =>
                tip.show(
                  e,
                  [
                    { label: 'nośnik', value: a.medium, color: fill },
                    { label: 'jednostek', value: a.unitLabel },
                    { label: 'termin', value: a.due },
                    { label: 'właściciel', value: a.owner },
                    { label: 'stan', value: STATUS[a.status].label, color: STATUS[a.status].fill },
                  ],
                  a.label,
                  a.what
                )
              }
              onPointerLeave={tip.hide}
              onBlur={tip.hide}
              className={`flex w-full items-stretch gap-0 rounded-[10px] text-left outline-none transition-colors ${
                on ? 'bg-chamber-navy/[0.05]' : 'hover:bg-slate-50 focus-visible:bg-slate-50'
              }`}
              style={{ minHeight: MARK.minHitTarget + 16 }}
            >
              {/*
               * The rail. A vertical hairline running past every row and a stub
               * into each one — the cheapest honest drawing of "these came from
               * that". It stops halfway down the last row so the line ends on
               * the last branch instead of hanging below it. Hidden under
               * 640 px, where twenty-two pixels of chrome cost more than the
               * derivation it draws.
               */}
              <span aria-hidden className="relative hidden w-[22px] shrink-0 self-stretch sm:block">
                <span
                  className="absolute left-[7px] top-0 w-px"
                  style={{ bottom: i === ARTIFACTS.length - 1 ? '50%' : 0, background: INK.grid }}
                />
                <span className="absolute left-[7px] top-1/2 h-px w-[11px]" style={{ background: INK.grid }} />
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-1.5 py-2 pl-1 pr-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="flex min-w-0 items-start gap-2 sm:w-[212px] sm:shrink-0">
                  <i
                    aria-hidden
                    className="mt-[3px] h-2.5 w-2.5 shrink-0 rounded-[3px]"
                    style={{ background: fill }}
                  />
                  <span className="min-w-0">
                    <span className="block break-words text-[12.5px] font-bold leading-snug text-chamber-navy">
                      {a.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-slate-400">
                      {a.unitLabel} · {a.owner}
                    </span>
                  </span>
                </span>

                <span className="flex flex-1 items-center gap-3">
                  <span className="relative min-w-[40px] flex-1" style={{ height: 10 }}>
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-full rounded-[3px]"
                      style={{ background: INK.track }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-out"
                      style={{
                        width: `${Math.max((a.units / PEAK) * 100, 4)}%`,
                        background: fill,
                        borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0`,
                      }}
                    />
                  </span>
                  <span className="w-[26px] shrink-0 text-right text-[12.5px] font-extrabold tabular-nums text-chamber-navy">
                    {a.units}
                  </span>
                  <span className="w-[62px] shrink-0 text-right font-mono text-[10.5px] font-bold text-slate-400">
                    {a.dueShort}
                  </span>
                  <StatusChip k={a.status} />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] leading-[1.6] text-slate-500">
        Pasek liczy <b className="text-slate-600">jednostki publikacyjne</b>, nie pliki: galeria stu
        osiemdziesięciu zdjęć to jedna publikacja, dwanaście klipów to dwanaście. Razem{' '}
        <b className="tabular-nums text-chamber-navy">{CASCADE.units}</b> z jednego dnia. Po edycji 2026
        rozpoznanie znajduje <b className="tabular-nums text-chamber-navy">{CASCADE.observedUnits}</b> —{' '}
        {CASCADE.observedNote}
      </p>

      <ChartTip tip={tip.tip} />
    </div>
  );
}
