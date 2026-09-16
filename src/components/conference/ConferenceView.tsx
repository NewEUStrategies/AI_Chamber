import { useMemo, useState, type ReactNode } from 'react';
import { StatTile } from '@/components/marketing/primitives';
import { ARTIFACTS, CASCADE, artifactByKey } from '@/content/conference/artifacts';
import { EVENT, RECORDING, dayOffset, tLabel } from '@/content/conference/event';
import { ROLES, SPEED_RULE } from '@/content/conference/production';
import type { ArtifactKey } from '@/content/conference/types';
import { CascadeNav } from './CascadeNav';
import { ProductionTimeline } from './ProductionTimeline';
import { ArtifactSpec } from './primitives';
import { MEDIUM_COLOR } from './tokens';
import { NewsletterTab } from './tabs/NewsletterTab';
import { MediaQuoteTab } from './tabs/MediaQuoteTab';
import { PhotosTab } from './tabs/PhotosTab';
import { QuoteCardTab } from './tabs/QuoteCardTab';
import { RecordingTab } from './tabs/RecordingTab';
import { ShortsTab } from './tabs/ShortsTab';
import { TranscriptTab } from './tabs/TranscriptTab';

const PANELS: Record<ArtifactKey, () => ReactNode> = {
  nagranie: () => <RecordingTab />,
  transkrypcja: () => <TranscriptTab />,
  setki: () => <ShortsTab />,
  grafika: () => <QuoteCardTab />,
  newsletter: () => <NewsletterTab />,
  mediapack: () => <MediaQuoteTab />,
  zdjecia: () => <PhotosTab />,
};

/**
 * Konferencje — one day of recordings, taken apart.
 *
 * The conference is the only event that generates the year's traffic on both
 * domains, and it is where most of the value is currently lost: the material
 * is produced once and published once. This view is the counter-proposal —
 * seven families cut from the same recording, each with its deadline, its
 * owner and its publication gate.
 *
 * The page keeps the cockpit's rule about evidence. Where the outside view can
 * settle the state of the 2026 edition it says so and names what it read;
 * where it cannot, it says `nieznane`. And where a slot would otherwise be
 * filled with an invented sentence from a named person, it stays a slot: the
 * constraint is designed in advance, the words are taken off the recording.
 */
export function ConferenceView() {
  const [active, setActive] = useState<ArtifactKey>('nagranie');
  const today = useMemo(() => dayOffset(), []);
  const artifact = artifactByKey(active);
  const multiple = Math.round(CASCADE.units / Math.max(CASCADE.observedUnits, 1));

  return (
    <div className="animate-fade-up">
      <header className="mb-7">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          Konferencje · {EVENT.name} · {EVENT.city}, {EVENT.dateLabel}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          Jeden dzień nagrań, siedem rodzin materiału
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          Konferencja jest jedynym wydarzeniem generującym roczny ruch obu domen — i miejscem, w którym
          dziś ginie najwięcej wartości, bo materiał powstaje raz i wychodzi raz. Ta strona rozkłada jedno
          nagranie na siedem rodzin publikacji, każdą z własnym terminem, właścicielem i progiem
          publikacji. Tam, gdzie z zewnątrz nie da się ustalić stanu edycji 2026, napisane jest{' '}
          <b>nieznane</b>. Tam, gdzie treścią miałoby być zdanie, którego nikt jeszcze nie powiedział,
          zostaje <b>slot</b> — z gotowym ograniczeniem formatu, bez zmyślonego cytatu.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Jednostek publikacyjnych z jednego dnia"
          value={String(CASCADE.units)}
          sub={`z ${RECORDING.minutes} minut nagrania, w ${CASCADE.toDay - CASCADE.fromDay} dni`}
          accent={MEDIUM_COLOR.wideo}
        />
        <StatTile
          label="Ślad edycji 2026 po jej zakończeniu"
          value={String(CASCADE.observedUnits)}
          sub={`jeden post ze zdjęciami — ${multiple} razy mniej, niż daje ten sam materiał`}
          tone="bad"
        />
        <StatTile
          label="Rodzin, których stan dało się ustalić"
          value={`${CASCADE.assessed} z ${ARTIFACTS.length}`}
          sub={`${CASCADE.missing} nie istnieją wcale, dwóch nie widać z zewnątrz`}
        />
        <StatTile
          label="Dziś względem edycji 2026"
          value={tLabel(today)}
          sub={`dzień zero: ${EVENT.dateLabel}, ${EVENT.venue}`}
          accent={MEDIUM_COLOR.foto}
        />
      </div>

      <div className="mt-5">
        <CascadeNav active={active} onSelect={setActive} />
      </div>

      <div
        role="tabpanel"
        id={`kf-panel-${active}`}
        aria-labelledby={`kf-tab-${active}`}
        tabIndex={0}
        className="mt-5 space-y-5 outline-none"
      >
        <ArtifactSpec artifact={artifact} />
        {PANELS[active]()}
      </div>

      <div className="mt-5">
        <ProductionTimeline active={active} />
      </div>

      <section className="mt-5 rounded-[14px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <p className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Warunek wstępny
        </p>
        <h3 className="font-display text-[17px] font-extrabold leading-tight text-chamber-navy">
          Cztery role i jedna reguła, bez których żaden termin wyżej nie jest prawdziwy
        </h3>
        <p className="mt-2 max-w-3xl text-[13px] leading-[1.7] text-slate-600">
          Role mogą łączyć się w osobach, ale nie mogą pozostać nieprzypisane. Nieprzypisana rola jest
          powodem, dla którego relacja z sali czeka trzy dni — i jedynym wyjaśnieniem różnicy między
          czterdziestoma dwiema jednostkami a jedną.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ul className="space-y-2.5">
            {ROLES.map((r) => (
              <li key={r.role} className="flex gap-3">
                <span className="w-[86px] shrink-0 text-right text-[12.5px] font-extrabold text-chamber-navy">
                  {r.role}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] leading-[1.6] text-slate-600">{r.does}</span>
                  <span className="mt-0.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {r.onSite ? 'na miejscu w dniu zero' : 'poza salą'}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="rounded-[10px] border border-slate-200 px-4 py-3.5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Reguła szybkości
            </p>
            <dl className="mt-2.5 space-y-2.5 text-[12.5px] leading-[1.6]">
              <div>
                <dt className="font-bold text-chamber-navy">Nie przechodzi przez akceptację zarządu</dt>
                <dd className="text-slate-600">{SPEED_RULE.skipsApproval.join(' · ')}</dd>
              </div>
              <div>
                <dt className="font-bold text-chamber-navy">Podlega zatwierdzeniu</dt>
                <dd className="text-slate-600">{SPEED_RULE.needsApproval.join(' · ')}</dd>
              </div>
            </dl>
            <p className="mt-3 border-t border-slate-100 pt-2.5 text-[12px] leading-[1.6] text-slate-500">
              Zatwierdzeniu podlega stanowisko, cytat imienny i liczba — nie post. Organizacja, w której
              relacja z sali czeka na akceptację, przegrywa z organizacją publikującą w godzinę, i żadna
              jakość tego nie nadrabia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
