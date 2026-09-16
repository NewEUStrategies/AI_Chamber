import { AlertTriangle } from 'lucide-react';
import { INK, STATUS, plInt } from '@/components/marketing/palette';
import { StatTile } from '@/components/marketing/primitives';
import {
  CITABILITY,
  CONVERSION_TOOLS,
  FRAMING,
  SECTIONS,
  TECH_FIXES,
  WEBSITE_WATCH,
} from '@/content/plan/website';
import { Panel } from '../primitives';
import { PLAN_ACCENT } from '../tokens';
import { DefCard, Steps, WatchBlock } from './primitives';

/**
 * The website.
 *
 * The first thing this tab does is refuse the usual framing. At the measured
 * traffic the site is not a lead generator and treating it as one produces a
 * redesign that changes nothing. It is a credibility proof and a record of
 * what the chamber has done — and the one place the search channel can
 * deliver anything is the regulatory hub, so that is where the weight goes.
 */
export function WebsitePanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Wizyt miesięcznie" value={plInt(FRAMING.monthlyVisits)} sub="przy tej skali strona jest dowodem, nie lejkiem" accent={PLAN_ACCENT} />
        <StatTile label="Wizyt organicznych z Polski" value="6" sub="miesięcznie, z siedmiu fraz z pozycją" tone="bad" />
        <StatTile label="Sekcji do zbudowania" value={String(SECTIONS.length)} sub="hub, rejestr, newsroom, archiwum" accent={PLAN_ACCENT} />
        <StatTile label="Napraw w pierwszym tygodniu" value={String(TECH_FIXES.length)} sub="bez budżetu i bez przebudowy serwisu" accent={PLAN_ACCENT} />
      </div>

      <Panel
        kicker="Ramowanie"
        title="Czym ta strona jest, a czym nie jest"
        lead={
          <>
            Przy {plInt(FRAMING.monthlyVisits)} wizytach miesięcznie strona jest{' '}
            <b className="text-chamber-navy">{FRAMING.what}</b>, nie {FRAMING.notWhat}. Rozstrzygnięcie tego
            na wstępie oszczędza przebudowy, która i tak niczego by nie zmieniła.
          </>
        }
        note={FRAMING.where}
      >
        <div
          className="flex items-start gap-3 rounded-[10px] px-4 py-3"
          style={{ background: `${STATUS.kuleje.fill}0f` }}
        >
          <AlertTriangle aria-hidden className="mt-[2px] h-4 w-4 shrink-0" style={{ color: STATUS.kuleje.fill }} />
          <p className="text-[12.5px] leading-[1.65] text-slate-600">
            Wniosek praktyczny: nie ma sensu optymalizować konwersji na ruchu, którego nie ma. Kolejność jest
            odwrotna — najpierw hub regulacyjny, który ten ruch w ogóle wytworzy, potem bramki, które go
            przechwycą.
          </p>
        </div>
      </Panel>

      <Panel
        kicker="Pierwszy tydzień"
        title="Naprawa techniczna"
        lead="Trzy rzeczy, z których żadna nie wymaga budżetu ani zgody na przebudowę. Trzecia jest pytaniem, bez odpowiedzi na które dwie pierwsze są zgadywaniem."
      >
        <Steps
          items={TECH_FIXES.map((f) => ({
            what: f.what,
            detail: f.why,
            extra: f.do,
          }))}
        />
      </Panel>

      <Panel
        kicker="Cztery sekcje"
        title="Co zbudować i po co"
        lead="Każda odpowiada innemu odbiorcy: hub wyszukiwarce i modelom, rejestr analitykowi, newsroom dziennikarzowi, archiwum sponsorowi. Żadna nie jest sekcją „o nas”."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <div key={s.name} className="rounded-[10px] border border-slate-200 px-4 py-3.5">
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] font-extrabold" style={{ color: PLAN_ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[15px] font-extrabold leading-tight text-chamber-navy">
                  {s.name}
                </span>
              </p>
              <p className="mt-1.5 text-[12.5px] leading-[1.65] text-slate-600">{s.what}</p>
              <p className="mt-2 border-t border-slate-100 pt-2 text-[12px] leading-[1.6]" style={{ color: PLAN_ACCENT }}>
                {s.why}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Warstwa techniczna"
          title="Co decyduje o cytowalności"
          lead="Pięć pozycji, które rozstrzygają, czy treść zbudowana wyżej zostanie w ogóle rozpoznana jako wypowiedź konkretnej organizacji."
          note="Ostatnia jest najczęściej łamana i najdroższa w skutkach: dokument, który zmienia adres, przestaje być cytowany, a odzyskanie cytowań zajmuje więcej niż ich zdobycie."
        >
          <ul className="space-y-2.5">
            {CITABILITY.map((c) => (
              <li key={c.what} className="flex gap-2.5">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PLAN_ACCENT }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold leading-snug text-chamber-navy">{c.what}</span>
                  <span className="mt-0.5 block text-[12px] leading-[1.6] text-slate-600">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          kicker="Konwersja"
          title="Trzy narzędzia, które zamieniają ruch w kontakt"
          lead="Dwa zbierają adres, trzecie odpowiada na pytanie dyrektora finansowego, który płaci składkę i nie ma dziś czym uzasadnić kosztu."
        >
          <div className="space-y-3">
            {CONVERSION_TOOLS.map((t) => (
              <DefCard key={t.name} title={t.name} accent>
                <p>{t.what}</p>
                <p style={{ color: PLAN_ACCENT }}>{t.how}</p>
              </DefCard>
            ))}
          </div>
          <p className="mt-4 rounded-[8px] px-3 py-2.5 text-[12px] leading-[1.6] text-slate-600" style={{ background: INK.track }}>
            Bramka nie musi być twarda. Trzy pola — e-mail, kraj i wielkość firmy — wystarczą, żeby
            segmentacja z zakładki mailowej miała czym działać, a streszczenie zostaje otwarte, żeby nie
            stracić cytowalności w mediach.
          </p>
        </Panel>
      </div>

      <WatchBlock baseline={WEBSITE_WATCH.baseline} watch={WEBSITE_WATCH.watch} />
    </div>
  );
}
