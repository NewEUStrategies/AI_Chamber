import { INK, plInt } from '@/components/marketing/palette';
import { BarRows, StatTile } from '@/components/marketing/primitives';
import { artifactByKey } from '@/content/conference/artifacts';
import { TRANSCRIPT_SHAPE, TRANSCRIPT_UNLOCKS } from '@/content/conference/assets';
import { RECORDING, SESSIONS, WORDS_PER_MINUTE, timecode } from '@/content/conference/event';
import { GateList, Panel, UnlockRow } from '../primitives';
import { MEDIUM_COLOR } from '../tokens';

const ARTIFACT = artifactByKey('transkrypcja');
const FILL = MEDIUM_COLOR.tekst;

const words = (minutes: number) => Math.round(minutes * WORDS_PER_MINUTE);

/**
 * The transcript.
 *
 * The number that matters is not how long the recording is but how much text
 * it contains, so the tab converts one into the other in the open, at a stated
 * speech rate, and then shows where that text sits. Language is a chip, never a
 * colour: one hue per medium is the page's only categorical scale, and a
 * second one here would make green mean two things.
 */
export function TranscriptTab() {
  const rows = SESSIONS.map((s) => ({
    label: `S${s.no} · ${s.title}`,
    value: words(s.minutes),
    detail: [
      { label: 'długość', value: `${s.minutes} min` },
      { label: 'język', value: s.lang.toUpperCase() },
      { label: 'timecode', value: `${timecode(s.start)}–${timecode(s.start + s.minutes)}` },
    ],
    note: s.yield,
  }));

  const en = SESSIONS.filter((s) => s.lang === 'en').length;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Słów zapisu z jednego dnia" value={plInt(RECORDING.words)} sub={`przy tempie ${WORDS_PER_MINUTE} słów na minutę`} accent={FILL} />
        <StatTile label="Stron tekstu po sformatowaniu" value={String(Math.round(RECORDING.words / 250))} sub="licząc 250 słów na stronę" accent={FILL} />
        <StatTile label="Sesji po angielsku" value={`${en} z ${SESSIONS.length}`} sub="wersja polska powstaje jako tłumaczenie, nie streszczenie" />
        <StatTile label="Fraz z pozycją w wyszukiwarce dziś" value="7" sub="tyle ma cały serwis, razem z frazami o mini golfie" tone="bad" />
      </div>

      <Panel
        kicker="Objętość"
        title="Ile tekstu leży w każdej sesji"
        lead={
          <>
            Przeliczenie minut na słowa jest jawne: {WORDS_PER_MINUTE} słów na minutę mowy, jedna stała dla
            całej strony. Wolę podać założenie i pozwolić je podważyć, niż podać liczbę bez metody.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Język jest etykietą, nie barwą.</b> Na tej stronie hue niesie
            wyłącznie nośnik — wideo, tekst, cytat, foto. Dołożenie drugiej skali kategorialnej dla pary
            PL i EN sprawiłoby, że zieleń oznaczałaby raz „tekst”, a raz „polski”.
          </>
        }
      >
        <BarRows data={rows} color={FILL} unit=" słów" labelWidth={248} tableCols={['Sesja', 'Słów']} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Format"
          title="Jak wygląda jeden wpis"
          lead="Cztery pola, ta sama kolejność w każdym akapicie. Poniżej makieta — treść zdejmuje się z nagrania, tu stoi tylko kształt."
        >
          <dl className="space-y-2.5">
            {TRANSCRIPT_SHAPE.map((f) => (
              <div key={f.field} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:w-[76px] sm:shrink-0 sm:pt-[3px] sm:text-right">
                  {f.field}
                </dt>
                <dd className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{f.example}</span>
                  <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{f.why}</span>
                </dd>
              </div>
            ))}
          </dl>

          {/* A rendering of the artefact itself. The bracketed line is a slot:
              nothing here invents a sentence anybody has to stand behind. */}
          <div className="mt-5 overflow-hidden rounded-[10px] border border-slate-200">
            <p className="border-b border-slate-200 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400" style={{ background: INK.track }}>
              Makieta wpisu · sesja 2, panel rządowy
            </p>
            <div className="space-y-3 px-3.5 py-3">
              {[
                { at: 54, who: 'Karel Havlíček', role: 'wicepremier, minister przemysłu i handlu (Czechy)' },
                { at: 57, who: 'Krzysztof Gawkowski', role: 'wicepremier, minister cyfryzacji (Polska)' },
              ].map((l) => (
                <div key={l.at}>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-mono text-[11px] font-extrabold tabular-nums" style={{ color: FILL }}>
                      {timecode(l.at)}
                    </span>
                    <span className="text-[12px] font-bold text-chamber-navy">{l.who}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{l.role}</span>
                    <span className="font-mono text-[10px] font-bold text-slate-300">EN</span>
                  </p>
                  <p className="mt-1 text-[12.5px] leading-[1.65] text-slate-400">
                    [akapit 40–90 słów, zdjęty z nagrania w całości — bez skracania i bez parafrazy]
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel
            kicker="Po co"
            title="Co odblokowuje tekst, czego nie odblokowuje plik wideo"
            lead="Praca jest ta sama — ktoś i tak wrzuca materiał. Różnica jest w tym, czy tekst ląduje w formie, którą maszyna umie przeczytać."
          >
            <ul className="space-y-3">
              {TRANSCRIPT_UNLOCKS.map((u) => (
                <UnlockRow key={u.what} {...u} />
              ))}
            </ul>
          </Panel>

          <Panel kicker="Warunki" title="Próg publikacji">
            <GateList items={ARTIFACT.gate} title="" />
          </Panel>
        </div>
      </div>
    </div>
  );
}
