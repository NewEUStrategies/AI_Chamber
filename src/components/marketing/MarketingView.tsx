import { useState } from 'react';
import { FUNNEL } from '@/content/marketing/funnel';
import { FunnelDiagram } from './FunnelDiagram';
import { Card, StatTile } from './primitives';
import { SERIES, STATUS } from './palette';

interface Segment {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

/**
 * Marketing cockpit — the diagnostic that replaced the applications table.
 *
 * Segments are tabs rather than one long page because the audience reads them
 * in different sittings: the funnel is the argument, the roadmap is the answer.
 */
export function MarketingView() {
  const segments: Segment[] = [
    { id: 'lejek', label: 'Lejek', render: () => <FunnelSegment /> },
  ];
  const [active, setActive] = useState(segments[0].id);
  const current = segments.find((s) => s.id === active) ?? segments[0];

  return (
    <div className="animate-fade-up">
      <header className="mb-7">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          Kokpit marketingu · AI Chamber CEE
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          Organizacja z realnym kapitałem politycznym i lejkiem, którego nikt nie zbudował
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          Diagnoza marketingu izby na podstawie danych zebranych w dossier: ruchu obu domen,
          profilu wyszukiwarkowego i siedemdziesięciu zrzutów obu kanałów społecznościowych.
          Tam, gdzie z zewnątrz nie da się nic ustalić, jest napisane „nieznane" — a nie
          domysł podany jako wniosek.
        </p>
      </header>

      {segments.length > 1 && (
        <nav className="mb-6 flex flex-wrap gap-1.5" role="tablist">
          {segments.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === s.id}
              onClick={() => setActive(s.id)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                active === s.id
                  ? 'bg-chamber-navy text-white'
                  : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      )}

      <div role="tabpanel">{current.render()}</div>
    </div>
  );
}

function FunnelSegment() {
  const known = FUNNEL.filter((s) => s.status !== 'nieznane').length;
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Etapy lejka z ustalonym stanem" value={`${known} z ${FUNNEL.length}`} sub="dwa pozostają niewidoczne z zewnątrz" accent={SERIES.chamber} />
        <StatTile label="Wizyty organiczne z Polski" value="6" sub="miesięcznie, z siedmiu fraz" tone="bad" />
        <StatTile label="Obserwujący na LinkedIn" value="3 067" sub="mediana 14 reakcji na post" accent={SERIES.green} />
        <StatTile label="Dni ciszy na Facebooku" value="41" sub="w tym własny szczyt w Pradze" tone="bad" />
      </div>

      <Card
        kicker="Diagnoza"
        title="Lejek etap po etapie"
        lead={
          <>
            Cztery etapy, od zasięgu po utrzymanie członka. Kliknij pasmo, żeby zobaczyć, co na
            danym etapie istnieje, czego brakuje i na jakim dowodzie oparta jest ocena.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Jak czytać szerokość pasm:</b> koduje ocenę siły etapu,
            <b> nie</b> zmierzony spadek konwersji. Bez dostępu do analityki przejścia między
            etapami są nieobserwowalne — narysowanie zwężającego się stożka sugerowałoby pomiar,
            którego nie ma. Dwa etapy oznaczone jako{' '}
            <span style={{ color: STATUS.nieznane.fill }} className="font-bold">nieznane</span>{' '}
            to uczciwa odpowiedź, nie ocena negatywna.
          </>
        }
      >
        <FunnelDiagram stages={FUNNEL} />
      </Card>
    </div>
  );
}
