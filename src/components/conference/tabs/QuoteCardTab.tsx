import { useState } from 'react';
import { Quote } from 'lucide-react';
import { INK, STATUS } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import { artifactByKey } from '@/content/conference/artifacts';
import { sessionByKey, timecode } from '@/content/conference/event';
import { CARD_CAP, QUOTE_CARDS } from '@/content/conference/quotes';
import type { QuoteCard } from '@/content/conference/types';
import { GateList, Meter, Panel } from '../primitives';
import { MEDIUM_COLOR } from '../tokens';

const ARTIFACT = artifactByKey('grafika');
const FILL = MEDIUM_COLOR.cytat;

const figures = QUOTE_CARDS.filter((c) => c.kind === 'liczba');
const slots = QUOTE_CARDS.filter((c) => c.kind === 'cytat');

/** Slots are budgets, not drafts: an empty slot has consumed no characters. */
const used = (c: QuoteCard) => (c.kind === 'liczba' ? c.text.length : 0);

/**
 * The quote card.
 *
 * Two things are visualised here and neither is a chart. The first is the
 * artefact itself, drawn at both required proportions — a card is a geometry
 * problem before it is a copy problem, and the only way to see whether a line
 * survives the square crop is to set it in the square. The second is the
 * character budget, which is the constraint that decides it.
 *
 * The four cards carrying a figure are written out, because a number the
 * chamber has already published is a fact and can be typeset before anyone
 * speaks. The four carrying a quote are slots: the format is decided, the
 * sentence is not. Nothing here puts words in a named person's mouth.
 */
export function QuoteCardTab() {
  const [pick, setPick] = useState(QUOTE_CARDS[0].id);
  const card = QUOTE_CARDS.find((c) => c.id === pick) ?? QUOTE_CARDS[0];

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Kart z jednego dnia" value={String(QUOTE_CARDS.length)} sub={`${figures.length} z liczbą, ${slots.length} na cytat ze sceny`} accent={FILL} />
        <StatTile label="Minut od wypowiedzi do publikacji" value="30" sub="dlatego karta musi być złożona przed wydarzeniem" accent={FILL} />
        <StatTile label="Znaków w formacie kwadratowym" value={String(CARD_CAP.square.chars)} sub={`w pionie ${CARD_CAP.portrait.chars} — kwadrat jest wąskim gardłem`} />
        <StatTile label="Formatów na kartę" value="2" sub="1200×1200 i 1080×1350, oba w pakiecie amplifikacyjnym" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <Panel
          kicker="Budżet znaków"
          title="Co się mieści, zanim ktokolwiek zacznie mówić"
          lead={
            <>
              Kwadrat jest ciaśniejszy od pionu, więc to on rozstrzyga. Zdanie napisane do{' '}
              {CARD_CAP.portrait.chars} znaków wychodzi w jednym formacie i wraca do składu w drugim — a
              to jest dokładnie ta poprawka, której trzydziestominutowy termin nie wchłonie.
            </>
          }
          note={
            <>
              <b className="text-slate-600">Slot ma zużycie zero, nie brak danych.</b> Karta z liczbą
              pokazuje faktyczną długość tekstu; karta na cytat pokazuje pusty budżet, bo zdanie zdejmuje
              się z nagrania. Pasek liczy znaki treści cytatu — podpis i stopka źródłowa mają własne pola.
            </>
          }
        >
          <ul className="space-y-1">
            {QUOTE_CARDS.map((c) => {
              const on = c.id === pick;
              const n = used(c);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setPick(c.id)}
                    aria-pressed={on}
                    className={`w-full rounded-[10px] px-2.5 py-2 text-left outline-none transition-colors ${
                      on ? 'bg-chamber-navy/[0.05]' : 'hover:bg-slate-50 focus-visible:bg-slate-50'
                    }`}
                  >
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: c.kind === 'liczba' ? FILL : INK.muted }}>
                        {c.kind === 'liczba' ? 'liczba' : 'slot na cytat'}
                      </span>
                      <span className="text-[12px] font-bold text-chamber-navy">{c.attribution}</span>
                      <span className="font-mono text-[10px] font-bold text-slate-300">
                        {timecode(c.at)} · S{sessionByKey(c.session)?.no}
                      </span>
                    </span>
                    <span className="mt-1.5 block space-y-1">
                      <Meter value={n} limit={CARD_CAP.square.chars} color={FILL} label="1:1" unit=" zn." />
                      <Meter value={n} limit={CARD_CAP.portrait.chars} color={FILL} label="4:5" unit=" zn." />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          kicker="Makieta"
          title="Ta sama treść w obu wymaganych formatach"
          lead="Podgląd w proporcjach 1:1 i 4:5. Przerywana ramka to pole bezpieczne — poza nim kadr przycina się w podglądzie na telefonie."
          note={
            card.note ? (
              <>
                <b className="text-slate-600">Uwaga do tej karty:</b> {card.note}
              </>
            ) : (
              <>
                Stopka źródłowa jest częścią makiety, nie dodatkiem. Liczba bez podanego źródła daje się
                podważyć jednym zdaniem, a karta krąży dalej niż post, w którym wyszła.
              </>
            )
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Canvas card={card} shape="square" />
            <Canvas card={card} shape="portrait" />
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Protokół amplifikacji"
          title="Co jedzie do prelegenta dobę przed publikacją"
          lead="Tagowany podmiot, który dostaje gotowy materiał, podaje dalej znacznie częściej niż ten, który ma sobie coś sam wyciąć. Czy taki pakiet dziś wychodzi, z zewnątrz nie widać."
        >
          <ul className="space-y-2.5">
            {[
              { n: '1', what: 'Grafika w obu formatach', why: '1200×1200 i 1080×1350 — gotowe do wstawienia bez przycinania.' },
              { n: '2', what: 'Trzy gotowe zdania do wyboru', why: 'Nie jedno. Wybór podnosi szansę, że ktoś w ogóle użyje któregoś.' },
              { n: '3', what: 'Bezpośredni link', why: 'Do postu, nie do strony głównej.' },
              { n: '4', what: 'Wysyłka T-24h', why: 'Dobę przed publikacją, mailem, imiennie — do każdego tagowanego podmiotu.' },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-extrabold text-white" style={{ background: FILL }}>
                  {s.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{s.what}</span>
                  <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{s.why}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          kicker="Warunki"
          title="Próg publikacji"
          note={
            <>
              Karta cytatowa mieści się w zakresie uzgodnionym z zarządem przed wydarzeniem, więc
              w dniu zero nie czeka na osobną decyzję. Pojedynczo zatwierdzane zostaje to, co wiąże izbę
              na zewnątrz: stanowisko, cytat imienny i liczba.
            </>
          }
        >
          <GateList items={ARTIFACT.gate} title="" />
        </Panel>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * The artefact, drawn                                              *
 * ---------------------------------------------------------------- */

function Canvas({ card, shape }: { card: QuoteCard; shape: 'square' | 'portrait' }) {
  const spec = CARD_CAP[shape];
  const slot = card.kind === 'cytat';
  return (
    <figure className="m-0">
      <div
        className={`relative overflow-hidden rounded-[10px] bg-chamber-navy ${
          shape === 'square' ? 'aspect-square' : 'aspect-[4/5]'
        }`}
      >
        {/* Safe area. Dashed on purpose: it is a boundary, not a gridline. */}
        <div aria-hidden className="absolute inset-[7%] rounded-[6px] border border-dashed border-white/20" />
        <div className="absolute inset-[11%] flex flex-col">
          <Quote aria-hidden className="h-4 w-4 shrink-0 text-chamber-green" />
          <p
            className={`mt-2 flex-1 font-display font-extrabold leading-[1.28] ${
              slot ? 'text-white/40' : 'text-white'
            } ${shape === 'square' ? 'text-[12.5px]' : 'text-[13px]'}`}
          >
            {card.text}
          </p>
          <div className="shrink-0">
            <span aria-hidden className="mb-2 block h-[2px] w-8 rounded-full bg-chamber-green" />
            <p className="text-[10.5px] font-bold leading-snug text-white">{card.attribution}</p>
            {card.source && (
              <p className="mt-0.5 text-[8.5px] font-semibold leading-snug text-white/55">Źródło: {card.source}</p>
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-1.5 flex items-center justify-between font-mono text-[10px] font-bold text-slate-400">
        <span>{spec.label}</span>
        <span style={{ color: slot ? STATUS.nieznane.fill : FILL }}>
          {slot ? `budżet ${spec.chars} zn.` : `${card.text.length} / ${spec.chars} zn.`}
        </span>
      </figcaption>
    </figure>
  );
}
