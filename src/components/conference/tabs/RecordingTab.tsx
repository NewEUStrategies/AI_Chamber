import { useState } from 'react';
import { INK, plInt } from '@/components/marketing/palette';
import { StatTile, ViewToggle } from '@/components/marketing/primitives';
import { CHAPTERS, RECORDING, SESSIONS, sessionByKey, timecode } from '@/content/conference/event';
import { artifactByKey } from '@/content/conference/artifacts';
import { GateList, Panel } from '../primitives';
import { SessionRibbon } from '../SessionRibbon';
import { MEDIUM_COLOR, ribbonPos } from '../tokens';

const ARTIFACT = artifactByKey('nagranie');

/**
 * The full recording.
 *
 * The strip is the tab: five hours of stage time, six segments, eighteen
 * chapter marks. Selecting a segment is what a viewer does to a recording
 * anyway, so selection drives the chapter list underneath instead of a
 * separate filter control.
 */
export function RecordingTab() {
  const [picked, setPicked] = useState<string | null>(null);
  const [table, setTable] = useState(false);
  const fill = MEDIUM_COLOR.wideo;
  const chapters = picked ? CHAPTERS.filter((c) => c.session === picked) : CHAPTERS;
  const session = picked ? sessionByKey(picked) : null;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Minut nagrania z jednego dnia" value={String(RECORDING.minutes)} sub={`${RECORDING.sessions} sesji na scenie`} accent={fill} />
        <StatTile label="Rozdziałów do opisu" value={String(RECORDING.chapters)} sub="tyle adresowalnych momentów zamiast jednego bloku" accent={fill} />
        <StatTile label="Sesji ze składem z zapowiedzi" value={`${RECORDING.confirmedSessions} z ${RECORDING.sessions}`} sub="reszta to szkielet produkcyjny do podmiany" />
        <StatTile label="Minut po polsku" value={String(RECORDING.polishMinutes)} sub="jedyny materiał pod bazę członkowską opartą na Polsce" tone="bad" />
      </div>

      <Panel
        kicker="Taśma"
        title="Pięć godzin sceny jako jedna oś"
        lead={
          <>
            Szerokość segmentu to rzeczywista długość sesji, białe włoski w środku to miejsca rozdziałów.
            Kliknij sesję, żeby zawęzić listę rozdziałów pod spodem; kliknij ponownie, żeby wrócić do
            całości.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Dlaczego jeden kolor:</b> pasmo jest ciągłe i czytane od lewej,
            więc kolejność sesji niesie już sama pozycja. Stopniowanie barwy po długości dołożyłoby drugą
            skalę do informacji, którą kształt podaje za darmo — a rozdziela segmenty dwupikselowa przerwa,
            tak samo jak w każdym innym wykresie w tym kokpicie.
          </>
        }
      >
        <SessionRibbon height={40} selected={picked} onSelect={(k) => setPicked((p) => (p === k ? null : k))} />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-[11.5px] font-semibold text-slate-500" role="status">
            {session ? (
              <>
                Sesja {session.no}: <b className="text-chamber-navy">{session.title}</b> ·{' '}
                {chapters.length} rozdziałów · {session.minutes} min · {session.lang.toUpperCase()}
              </>
            ) : (
              <>
                Wszystkie <b className="tabular-nums text-chamber-navy">{CHAPTERS.length}</b> rozdziałów z{' '}
                {RECORDING.sessions} sesji
              </>
            )}
          </p>
          <ViewToggle table={table} onChange={setTable} controls="kf-chapters" />
        </div>

        <div id="kf-chapters" className="mt-3">
          {table ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="py-1.5 pr-3 font-bold">Timecode</th>
                    <th className="py-1.5 pr-3 font-bold">Rozdział</th>
                    <th className="py-1.5 pr-3 font-bold">Sesja</th>
                    <th className="py-1.5 font-bold">Język</th>
                  </tr>
                </thead>
                <tbody>
                  {chapters.map((c) => {
                    const s = sessionByKey(c.session);
                    return (
                      <tr key={`${c.session}-${c.at}`} className="border-b border-slate-100 last:border-0">
                        <td className="py-1.5 pr-3 font-mono font-bold tabular-nums text-chamber-navy">
                          {timecode(c.at)}
                        </td>
                        <td className="py-1.5 pr-3 text-slate-600">{c.label}</td>
                        <td className="py-1.5 pr-3 text-slate-500">S{s?.no}</td>
                        <td className="py-1.5 text-slate-500">{s?.lang.toUpperCase()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <ol className="space-y-0.5">
              {chapters.map((c) => (
                <li key={`${c.session}-${c.at}`} className="flex items-baseline gap-3 rounded-[6px] px-1 py-1 hover:bg-slate-50">
                  <span className="w-[42px] shrink-0 text-right font-mono text-[11px] font-extrabold tabular-nums" style={{ color: fill }}>
                    {timecode(c.at)}
                  </span>
                  {/* Position in the recording, drawn where the value sits — the
                      list doubles as a distribution of where the day is dense. */}
                  <span aria-hidden className="relative hidden h-[3px] w-[76px] shrink-0 self-center rounded-full sm:block" style={{ background: INK.track }}>
                    <span className="absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${ribbonPos(c.at)}%`, background: fill }} />
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[12.5px] leading-snug text-slate-700">{c.label}</span>
                  <span className="shrink-0 font-mono text-[10px] font-bold text-slate-400">S{sessionByKey(c.session)?.no}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Sesje"
          title="Co się kryje w każdym paśmie"
          lead="Kolumna „skład” rozdziela to, co wiadomo z zapowiedzi, od tego, co jest szkieletem produkcyjnym do podmiany na rzeczywistą agendę."
        >
          <ul className="space-y-3">
            {SESSIONS.map((s) => (
              <li key={s.key} className="flex gap-3">
                <span className="mt-[2px] w-[26px] shrink-0 rounded-[4px] py-0.5 text-center font-mono text-[10px] font-extrabold text-white" style={{ background: fill }}>
                  S{s.no}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-[12.5px] font-bold leading-snug text-chamber-navy">{s.title}</span>
                  <span className="mt-0.5 block font-mono text-[10.5px] font-bold text-slate-400">
                    {timecode(s.start)}–{timecode(s.start + s.minutes)} · {s.minutes} min · {s.lang.toUpperCase()} ·{' '}
                    {s.confirmed ? 'skład z zapowiedzi' : 'szkielet produkcyjny'}
                  </span>
                  <span className="mt-1 block text-[12px] leading-[1.6] text-slate-600">{s.yield}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          kicker="Warunki"
          title="Czego nagranie potrzebuje, żeby w ogóle pracowało"
          lead="Plik wrzucony bez tych czterech rzeczy jest archiwum dla organizatora, a nie treścią dla nikogo innego."
          note={
            <>
              Transkrypcja wchodzi do opisu jako tekst, nie jako napisy wypalone w obrazie — wypalone
              napisy są pikselami i żadna wyszukiwarka ani model ich nie przeczyta. Pełny zapis stoi w
              osobnej zakładce, bo jest osobnym produktem, nie dodatkiem do pliku wideo.
            </>
          }
        >
          <GateList items={ARTIFACT.gate} />
          <div className="mt-5 rounded-[10px] px-3.5 py-3" style={{ background: INK.track }}>
            <p className="text-[12px] leading-[1.65] text-slate-600">
              <b className="text-chamber-navy">Skala materiału:</b> {RECORDING.minutes} minut na scenie to
              około <b className="tabular-nums">{plInt(RECORDING.words)}</b> słów zapisu przy tempie{' '}
              stu trzydziestu pięciu słów na minutę. Tyle treści o regulacji izba wytwarza w jeden dzień —
              i tyle dziś nie trafia nigdzie.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
