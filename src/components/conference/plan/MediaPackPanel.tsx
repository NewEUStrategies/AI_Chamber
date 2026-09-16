import { Phone } from 'lucide-react';
import { INK, MARK } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import { EMBARGO, SPOKESPERSON_SLA, TIERS } from '@/content/conference/quotes';
import { FRAMING, MEDIAPACK_WATCH, PACK_CONTENTS, SPONSOR_PACK } from '@/content/plan/mediapack';
import { Panel } from '../primitives';
import { PLAN_ACCENT } from '../tokens';
import { DefCard, Steps, WatchBlock } from './primitives';

/** Contact effort per tier — a word, because it is not a measured quantity. */
const EFFORT: Record<string, string> = {
  A: 'kontakt osobisty',
  B: 'wysyłka zbiorcza pod embargo',
  C: 'komunikat masowy',
};

const PEAK_SLA = Math.max(...SPOKESPERSON_SLA.map((s) => s.hours));

/**
 * Media pack.
 *
 * The tier-by-step matrix is deliberately not repeated here — it lives with
 * the conference material, where the embargo is actually executed. This tab
 * carries what the pack itself contains, which is the part that decides
 * whether any of that sequencing produces a published piece.
 */
export function MediaPackPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Elementów pakietu" value={String(PACK_CONTENTS.length)} sub="każdy skraca drogę od maila do tekstu" accent={PLAN_ACCENT} />
        <StatTile label="Poziomów listy" value={String(TIERS.length)} sub={FRAMING.tieringRule} accent={PLAN_ACCENT} />
        <StatTile label="Godzin na odpowiedź rzecznika" value={`${SPOKESPERSON_SLA[0].hours} / ${SPOKESPERSON_SLA[1].hours}`} sub="dzień roboczy / dzień konferencji" accent={PLAN_ACCENT} />
        <StatTile label="Pomiar dziś" value="brak" sub="ani listy akredytacyjnej, ani publikacji per poziom" tone="bad" />
      </div>

      <Panel
        kicker="Ramowanie"
        title={FRAMING.whatItIs}
        lead={
          <>
            Nie {FRAMING.whatItIsNot.toLowerCase()} Test dla każdego elementu poniżej jest jeden: czy skraca
            dziennikarzowi drogę od maila do opublikowanego tekstu. Cokolwiek go nie skraca, jest ozdobą — a
            ozdoba jest powodem, dla którego pakiet zostaje nieotwarty.
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.key} className="rounded-[10px] border px-3.5 py-3" style={{ borderColor: `${PLAN_ACCENT}33` }}>
              <p className="flex items-baseline gap-2">
                <span className="font-display text-[15px] font-extrabold text-chamber-navy">Tier {t.key}</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t.size}
                </span>
              </p>
              <p className="mt-1 text-[12px] font-bold leading-snug text-chamber-navy">{t.who}</p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-slate-600">{t.how}</p>
              <p className="mt-2 border-t border-slate-100 pt-2 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: PLAN_ACCENT }}>
                {EFFORT[t.key]}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        kicker="Mechanika embarga"
        title="Cała wartość leży w kolejności"
        lead={
          <>
            Pełny raport trafia do Tier A i B na T-7, z jasno podaną datą i godziną zdjęcia embarga. Jednej
            redakcji z Tier A dajemy ekskluzywność wcześniejszą o kilkadziesiąt godzin w zamian za materiał
            w dniu zero. Jeden taki tekst pracuje mocniej niż komunikat rozesłany szeroko, a reszta rynku i
            tak go podejmie.
          </>
        }
        note={
          <>
            Macierz „kto dostaje materiał na którym kroku” nie jest tu powtórzona — stoi po stronie materiału
            konferencyjnego, w zakładce <b className="text-slate-600">cytat do media packu</b>, bo tam jest
            wykonywana. Ta zakładka odpowiada na pytanie, co w tym pakiecie jest.
          </>
        }
      >
        <ol className="space-y-2.5">
          {EMBARGO.map((e) => (
            <li key={e.key} className="flex gap-3">
              <span className="w-[102px] shrink-0 text-right font-mono text-[10.5px] font-extrabold" style={{ color: PLAN_ACCENT }}>
                {e.atLabel}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{e.what}</span>
                <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{e.why}</span>
              </span>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel
        kicker="Zawartość pakietu"
        title="Dziewięć elementów"
        lead="Kolejność jest kolejnością, w jakiej dziennikarz je otwiera. Pozycja druga jest tą, którą pakiety najczęściej mylą: dziennikarz potrzebuje kąta, nie agendy."
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {PACK_CONTENTS.map((p, i) => (
            <div key={p.what} className="flex gap-3 rounded-[10px] border border-slate-200 px-3.5 py-3">
              <span
                className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-extrabold text-white"
                style={{ background: PLAN_ACCENT }}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-extrabold leading-snug text-chamber-navy">{p.what}</span>
                <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{p.detail}</span>
                <span className="mt-1 block text-[11.5px] leading-[1.55] text-slate-500">{p.why}</span>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="SLA rzecznika"
          title="Dwie godziny, cztery w dniu konferencji"
          lead="Jedna osoba z numerem telefonu podanym w pakiecie. To różnica między byciem cytowanym a byciem pominiętym przy zamknięciu numeru."
        >
          <ul className="space-y-2">
            {SPOKESPERSON_SLA.map((s) => (
              <li key={s.when} className="flex items-center gap-3" style={{ minHeight: MARK.minHitTarget - 10 }}>
                <span className="w-[140px] shrink-0 text-right text-[12px] font-bold text-chamber-navy">
                  {s.when}
                </span>
                <span className="relative flex-1" style={{ height: 10 }}>
                  <span aria-hidden className="absolute inset-0 rounded-[3px]" style={{ background: INK.track }} />
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${(s.hours / PEAK_SLA) * 100}%`,
                      background: PLAN_ACCENT,
                      borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0`,
                    }}
                  />
                </span>
                <span className="w-[46px] shrink-0 text-right text-[11px] font-extrabold tabular-nums text-chamber-navy">
                  {s.hours} h
                </span>
              </li>
            ))}
          </ul>
          <p
            className="mt-4 flex items-start gap-2 rounded-[8px] px-3 py-2.5 text-[12px] leading-[1.6] text-slate-600"
            style={{ background: INK.track }}
          >
            <Phone aria-hidden className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: PLAN_ACCENT }} />
            Numer telefonu, nie adres skrzynki ogólnej. Akredytacja jest przy okazji lejkiem — daje listę
            dziennikarzy na cały rok, nie tylko na jeden dzień.
          </p>
        </Panel>

        <Panel
          kicker="Pakiet sponsorski"
          title="Osobny dokument, inny kupujący"
          lead={`Dla partnerów korporacyjnych. ${SPONSOR_PACK.why}`}
        >
          <Steps items={SPONSOR_PACK.answers.map((what) => ({ what }))} />
          <p className="mt-4 rounded-[8px] px-3 py-2.5 text-[12px] leading-[1.6] text-slate-600" style={{ background: INK.track }}>
            Cztery odpowiedzi, cztery pytania, które partner i tak zada — z tą różnicą, że zadane po
            wydarzeniu brzmią jak reklamacja, a odpowiedziane przed nim są ofertą.
          </p>
          <div className="mt-4">
            <DefCard title="Czego dokument nie zawiera" accent>
              <p>
                Cen. Przy niejawnych stawkach partnerstw dokument opisuje zakres, a kwota zostaje w rozmowie
                — inaczej pierwszy wyciek cennika ustawia negocjacje wszystkim kolejnym partnerom.
              </p>
            </DefCard>
          </div>
        </Panel>
      </div>

      <WatchBlock baseline={MEDIAPACK_WATCH.baseline} watch={MEDIAPACK_WATCH.watch} />
    </div>
  );
}
