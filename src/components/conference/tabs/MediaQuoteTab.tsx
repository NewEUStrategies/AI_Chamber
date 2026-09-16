import { Check, Phone } from 'lucide-react';
import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { INK, MARK, STATUS } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import { artifactByKey } from '@/content/conference/artifacts';
import { EMBARGO, MEDIA_QUOTES, SPOKESPERSON_SLA, TIERS } from '@/content/conference/quotes';
import type { Tier } from '@/content/conference/types';
import { GateList, Panel } from '../primitives';
import { MEDIUM_COLOR } from '../tokens';

const ARTIFACT = artifactByKey('mediapack');
const FILL = MEDIUM_COLOR.cytat;

const RELEASE_TONE = {
  zwolniony: STATUS.dziala,
  'do autoryzacji': STATUS.kuleje,
  slot: STATUS.nieznane,
} as const;

/**
 * The media-pack quote.
 *
 * The mechanism here is order, not duration: who gets the material, and in
 * what sequence. So the picture is a matrix of tier against step rather than a
 * time axis — on a proportional axis the last three steps of the embargo fall
 * inside the final tenth of the width and become unreadable, which would hide
 * exactly the part that matters.
 *
 * Tier identity rides on row position. The page spends its one categorical
 * hue on the medium, and a three-step ramp for A, B and C would put a second
 * scale on the same picture.
 */
export function MediaQuoteTab() {
  const tip = useChartTip();
  const exclusive = EMBARGO.find((e) => e.key === 'e3');

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Cytatów w pakiecie" value={String(MEDIA_QUOTES.length)} sub={`${MEDIA_QUOTES.filter((q) => q.authorised === 'zwolniony').length} zwolnione od godziny otwarcia`} accent={FILL} />
        <StatTile label="Poziomów listy" value={String(TIERS.length)} sub="wysyłka do wszystkich jest wysyłką do nikogo" accent={FILL} />
        <StatTile label="Godzin na odpowiedź rzecznika" value={`${SPOKESPERSON_SLA[0].hours} / ${SPOKESPERSON_SLA[1].hours}`} sub="dzień roboczy / dzień konferencji" />
        <StatTile label="Godzin przewagi dla Tier A" value="~48" sub={exclusive?.what ?? ''} />
      </div>

      <Panel
        kicker="Embargo"
        title="Kto dostaje materiał i w jakiej kolejności"
        lead={
          <>
            Wiersz to poziom listy, kolumna to krok procedury. Wypełnione pole oznacza, że w tym kroku ten
            poziom dostaje materiał. Cała wartość embarga leży w kolejności, dlatego oś jest ciągiem
            kroków, a nie proporcjonalną osią czasu.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Dlaczego nie oś czasu:</b> przy proporcjonalnym rozłożeniu dni
            trzy ostatnie kroki — T-2, godzina otwarcia i T+1 — wypadłyby w ostatniej dziesiątej części
            szerokości i zlały się w jedną kreskę. Data każdego kroku stoi w nagłówku kolumny, więc nic nie
            ginie; ginie tylko złudzenie, że odstępy coś znaczą.
          </>
        }
      >
        <div className="overflow-x-auto">
          <div className="min-w-[620px]">
            {/* Column heads: the step, its date, and what happens. */}
            <div className="flex gap-2 pl-[132px]">
              {EMBARGO.map((e) => (
                <div key={e.key} className="flex-1">
                  <p className="font-mono text-[10px] font-extrabold uppercase tracking-wider" style={{ color: FILL }}>
                    {e.atLabel}
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold leading-snug text-chamber-navy">{e.what}</p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 space-y-1.5">
              {TIERS.map((t) => (
                <div key={t.key} className="flex items-stretch gap-2">
                  <div className="w-[124px] shrink-0 pr-2 text-right">
                    <p className="text-[12px] font-extrabold text-chamber-navy">Tier {t.key}</p>
                    <p className="text-[10.5px] font-semibold leading-snug text-slate-400">{t.size}</p>
                  </div>
                  {EMBARGO.map((e) => {
                    const on = e.tiers.includes(t.key as Tier);
                    return (
                      <div
                        key={e.key}
                        tabIndex={0}
                        role="img"
                        aria-label={`Tier ${t.key}, ${e.atLabel}: ${on ? e.what : 'bez wysyłki na tym kroku'}`}
                        className="flex flex-1 cursor-default items-center justify-center rounded-[6px] outline-none"
                        style={{
                          minHeight: MARK.minHitTarget,
                          background: on ? FILL : INK.track,
                        }}
                        onPointerEnter={(ev) =>
                          tip.show(
                            ev,
                            [
                              { label: 'poziom', value: `Tier ${t.key}`, color: FILL },
                              { label: 'krok', value: e.atLabel },
                              { label: 'dostaje', value: on ? 'tak' : 'nie' },
                            ],
                            on ? e.what : `Tier ${t.key} nie dostaje materiału na tym kroku`,
                            on ? e.why : undefined
                          )
                        }
                        onFocus={(ev) => {
                          const r = ev.currentTarget.getBoundingClientRect();
                          tip.show(
                            { clientX: r.left + r.width / 2, clientY: r.top },
                            [
                              { label: 'poziom', value: `Tier ${t.key}`, color: FILL },
                              { label: 'krok', value: e.atLabel },
                              { label: 'dostaje', value: on ? 'tak' : 'nie' },
                            ],
                            on ? e.what : `Tier ${t.key} nie dostaje materiału na tym kroku`,
                            on ? e.why : undefined
                          );
                        }}
                        onPointerLeave={tip.hide}
                        onBlur={tip.hide}
                      >
                        {on && <Check aria-hidden className="h-3.5 w-3.5 text-white" />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
          {TIERS.map((t) => (
            <li key={t.key} className="flex gap-3">
              <span className="w-[52px] shrink-0 text-right text-[12px] font-extrabold text-chamber-navy">
                Tier {t.key}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{t.who}</span>
                <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{t.how}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Cytaty"
          title="Cztery cytaty, trzy stany zwolnienia"
          lead="Dwa własne można złożyć i zautoryzować przed wydarzeniem. Dwa pozostałe zależą od biur prasowych, których izba nie kontroluje — i dlatego są slotami, nie treścią."
          note={
            <>
              Treść cytatu zdejmuje się z nagrania albo dostaje po autoryzacji. To, co jest gotowe przed
              dniem zero, to funkcja mówcy, rola cytatu w tekście i godzina zwolnienia — czyli wszystko,
              czego dziennikarzowi trzeba, żeby zaplanować materiał.
            </>
          }
        >
          <ul className="space-y-2.5">
            {MEDIA_QUOTES.map((q) => {
              const tone = RELEASE_TONE[q.authorised];
              return (
                <li key={q.id} className="rounded-[10px] border border-slate-200 px-3.5 py-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="text-[12.5px] font-extrabold text-chamber-navy">{q.who}</p>
                    <span
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold"
                      style={{ background: `${tone.fill}14`, color: tone.fill }}
                    >
                      <i aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: tone.fill }} />
                      {q.authorised}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-[1.6] text-slate-600">{q.purpose}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>{q.release}</span>
                    <span>
                      poziomy: {q.tiers.join(' · ')}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="space-y-5">
          <Panel
            kicker="SLA rzecznika"
            title="Dwie godziny, cztery w dniu konferencji"
            lead="Jedna osoba z numerem telefonu podanym w pakiecie. To różnica między byciem cytowanym a pominiętym przy zamknięciu numeru."
          >
            <ul className="space-y-2">
              {SPOKESPERSON_SLA.map((s) => (
                <li key={s.when} className="flex items-center gap-3">
                  <span className="w-[140px] shrink-0 text-right text-[12px] font-bold text-chamber-navy">
                    {s.when}
                  </span>
                  <span className="relative flex-1" style={{ height: 10 }}>
                    <span aria-hidden className="absolute inset-0 rounded-[3px]" style={{ background: INK.track }} />
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: `${(s.hours / 4) * 100}%`,
                        background: FILL,
                        borderRadius: `0 ${MARK.barRadius}px ${MARK.barRadius}px 0`,
                      }}
                    />
                  </span>
                  <span className="w-[54px] shrink-0 text-right text-[11px] font-extrabold tabular-nums text-chamber-navy">
                    {s.hours} h
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 rounded-[8px] px-3 py-2 text-[12px] leading-[1.6] text-slate-600" style={{ background: INK.track }}>
              <Phone aria-hidden className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: FILL }} />
              Numer telefonu w pakiecie, nie adres skrzynki ogólnej. Akredytacja jest przy okazji lejkiem —
              daje listę dziennikarzy na cały rok, nie tylko na jeden dzień.
            </p>
          </Panel>

          <Panel kicker="Warunki" title="Próg wysyłki">
            <GateList items={ARTIFACT.gate} title="" />
          </Panel>
        </div>
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}
