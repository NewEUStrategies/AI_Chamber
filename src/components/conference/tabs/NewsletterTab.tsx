import { INK, MARK } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import { artifactByKey } from '@/content/conference/artifacts';
import { MAIL_BLOCKS, MAIL_MOMENTS } from '@/content/conference/assets';
import { GateList, Meter, Panel } from '../primitives';
import { MEDIUM_COLOR } from '../tokens';

const ARTIFACT = artifactByKey('newsletter');
const FILL = MEDIUM_COLOR.tekst;

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const BUDGET = MAIL_BLOCKS.reduce((a, b) => a + b.budgetWords, 0);
const DRAFTED = MAIL_BLOCKS.reduce((a, b) => a + countWords(b.draft), 0);

const LAST_DAY = MAIL_MOMENTS[MAIL_MOMENTS.length - 1].day;

/**
 * The newsletter fragment.
 *
 * What is drawn here is the mail itself, block by block, with the word budget
 * of each one beside its draft. A briefing read by a ministry assistant is
 * read because it is predictable — same five blocks, same order, every issue —
 * so the anatomy is the visualisation, and the meters are what keep it that
 * way when somebody has a long week and a lot to say.
 *
 * The drafts are real copy against the chamber's own published figures. Square
 * brackets mark what has to be confirmed on the day; they are the only thing
 * standing between this draft and a send.
 */
export function NewsletterTab() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Słów w całym wydaniu" value={`${DRAFTED} z ${BUDGET}`} sub="budżet formatu, nie limit redakcyjny" accent={FILL} />
        <StatTile label="Bloków o stałej kolejności" value={String(MAIL_BLOCKS.length)} sub="ta sama struktura w każdym wydaniu" accent={FILL} />
        <StatTile label="Wezwań do działania" value="1" sub="jeden cel na mail — test: co odbiorca zrobi w pięć minut" />
        <StatTile label="Wejść konferencji do sekwencji" value={String(MAIL_MOMENTS.length)} sub={`dzień zero, T+1 i T+${LAST_DAY}`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Panel
          kicker="Anatomia"
          title="Wydanie konferencyjne, blok po bloku"
          lead={
            <>
              Kształt maila jest tu wizualizacją: pięć bloków i jedno wezwanie, zawsze w tej samej
              kolejności. Pasek przy każdym bloku pokazuje, ile z budżetu słów zjada wersja robocza.
            </>
          }
          note={
            <>
              <b className="text-slate-600">Nawiasy kwadratowe to nie styl.</b> Każdy oznacza liczbę,
              której nie da się potwierdzić przed dniem zero. Mail nie wychodzi, dopóki w tekście zostaje
              choć jeden — to jest cała lista rzeczy blokujących wysyłkę.
            </>
          }
        >
          {/* The artefact, drawn. Heights follow the content rather than the
              budget: a block sized to its word count would overflow its own box
              the moment a draft ran long, and a clipped draft is the one thing
              a copy spec must never show. */}
          <div className="overflow-hidden rounded-[10px] border border-slate-200">
            {MAIL_BLOCKS.map((b, i) => {
              const n = countWords(b.draft);
              const subject = b.key === 'subject';
              const cta = b.key === 'cta';
              return (
                <div
                  key={b.key}
                  className={`px-4 py-3 ${i > 0 ? 'border-t border-slate-100' : ''}`}
                  style={{ background: subject ? INK.track : undefined }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {b.label}
                    </p>
                    <span className="w-full max-w-[210px]">
                      <Meter value={n} limit={b.budgetWords} color={FILL} label="słów" />
                    </span>
                  </div>

                  {cta ? (
                    <p className="mt-2">
                      <span
                        className="inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-bold text-white"
                        style={{ background: FILL }}
                      >
                        {b.draft}
                      </span>
                    </p>
                  ) : (
                    <p
                      className={`mt-1.5 leading-[1.65] text-slate-700 ${
                        subject ? 'text-[13.5px] font-extrabold text-chamber-navy' : 'text-[12.5px]'
                      }`}
                    >
                      {b.draft}
                    </p>
                  )}

                  <p className="mt-1.5 text-[11.5px] leading-[1.55] text-slate-400">{b.purpose}</p>
                </div>
              );
            })}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel
            kicker="Sekwencja"
            title="Gdzie konferencja wchodzi do programu mailowego"
            lead="Trzy wejścia, trzy różne zadania i trzy różne listy odbiorców. Ostatnie jest jedynym momentem w roku, kiedy izba ma listę osób, które fizycznie przyjechały."
          >
            {/* A sequence, so the picture is an axis with three stops — the
                distance between them is the point: two land inside 24 hours,
                the third a month later. */}
            <div className="relative ml-1 mr-1">
              <span aria-hidden className="absolute left-0 right-0 top-[7px] h-px" style={{ background: INK.grid }} />
              <div className="relative h-4">
                {MAIL_MOMENTS.map((m) => (
                  <span
                    key={m.day}
                    aria-hidden
                    className="absolute top-[3px] h-[9px] w-[9px] -translate-x-1/2 rounded-full"
                    style={{
                      left: `${(m.day / LAST_DAY) * 100}%`,
                      background: FILL,
                      boxShadow: `0 0 0 ${MARK.ringWidth}px ${INK.surface}`,
                    }}
                  />
                ))}
              </div>
            </div>
            <ul className="mt-2 space-y-3">
              {MAIL_MOMENTS.map((m) => (
                <li key={m.day} className="flex gap-3">
                  <span className="w-[62px] shrink-0 text-right font-mono text-[10.5px] font-extrabold" style={{ color: FILL }}>
                    {m.label}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] leading-[1.6] text-slate-700">{m.what}</span>
                    <span className="mt-0.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      do: {m.to}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            kicker="Warunki"
            title="Próg wysyłki"
            note={
              <>
                Higiena techniczna jest warunkiem wstępnym całej reszty: bez SPF, DKIM i DMARC oraz osobnej
                subdomeny dla wysyłki masowej najlepszy tekst nie dociera do skrzynki odbiorczej.
              </>
            }
          >
            <GateList items={ARTIFACT.gate} title="" />
          </Panel>
        </div>
      </div>
    </div>
  );
}
