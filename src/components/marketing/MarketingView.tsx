import { useState, type ReactNode } from 'react';
import { FUNNEL } from '@/content/marketing/funnel';
import { ROLES, SEGMENTS } from '@/content/marketing/icp';
import { ASSETS, CHANNELS, GAPS } from '@/content/marketing/channels';
import { ROADMAP } from '@/content/marketing/roadmap';
import { AssetLedger } from './AssetLedger';
import { ChannelMatrix } from './ChannelMatrix';
import { FunnelDiagram } from './FunnelDiagram';
import { IcpMap } from './IcpMap';
import { RoadmapBoard } from './RoadmapBoard';
import { Card, StatTile } from './primitives';
import { SERIES, STATUS } from './palette';

const SEGMENTS_NAV: { id: string; label: string; render: () => ReactNode }[] = [
  { id: 'lejek', label: 'Lejek', render: () => <FunnelSegment /> },
  { id: 'kim', label: 'Kim są i komu sprzedają', render: () => <IcpMap segments={SEGMENTS} roles={ROLES} /> },
  { id: 'kanaly', label: 'Kanały', render: () => <ChannelMatrix rows={CHANNELS} /> },
  { id: 'aktywa', label: 'Aktywa i luki', render: () => <AssetsSegment /> },
  { id: 'roadmapa', label: 'Roadmapa', render: () => <RoadmapBoard horizons={ROADMAP} /> },
];

/**
 * Marketing cockpit — the diagnostic that replaced the applications table.
 *
 * Split into segments rather than one long page because they are read in
 * different sittings: the funnel is the argument, the roadmap is the answer,
 * and the asset ledger is the part a reviewer will want to challenge.
 */
export function MarketingView() {
  const [active, setActive] = useState(SEGMENTS_NAV[0].id);
  const current = SEGMENTS_NAV.find((s) => s.id === active) ?? SEGMENTS_NAV[0];

  return (
    <div className="animate-fade-up">
      <header className="mb-7">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-chamber-green-deep">
          Kokpit marketingu · AI Chamber CEE
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[30px] font-extrabold leading-[1.12] text-chamber-navy sm:text-[38px]">
          Realny kapitał polityczny i lejek, którego nikt nie zbudował
        </h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-slate-600">
          Diagnoza marketingu izby oparta na danych z dossier: ruchu obu domen, profilu
          wyszukiwarkowego i siedemdziesięciu zrzutów obu kanałów społecznościowych. Tam, gdzie
          z zewnątrz nie da się nic ustalić, napisane jest <b>nieznane</b> — zamiast domysłu
          podanego jako wniosek. Ocen nie naciągam w żadną stronę: to, co działa, jest tu
          nazwane równie wyraźnie jak to, co nie działa.
        </p>
      </header>

      <nav className="mb-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Segmenty analizy">
        {SEGMENTS_NAV.map((s) => (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={active === s.id}
            aria-controls={`panel-${s.id}`}
            onClick={() => setActive(s.id)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
              active === s.id
                ? 'bg-chamber-navy text-white shadow-md shadow-chamber-navy/20'
                : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`}>
        {current.render()}
      </div>
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
        lead="Cztery etapy, od zasięgu po utrzymanie członka. Kliknij pasmo, żeby zobaczyć, co na danym etapie istnieje, czego brakuje i na jakim dowodzie oparta jest ocena."
        note={
          <>
            <b className="text-slate-600">Jak czytać szerokość pasm:</b> koduje ocenę siły etapu,
            <b> nie</b> zmierzony spadek konwersji. Bez dostępu do analityki przejścia między etapami
            są nieobserwowalne — narysowanie zwężającego się stożka sugerowałoby pomiar, którego nie
            ma. Dwa etapy oznaczone jako{' '}
            <span style={{ color: STATUS.nieznane.fill }} className="font-bold">nieznane</span> to
            uczciwa odpowiedź, nie ocena negatywna.
          </>
        }
      >
        <FunnelDiagram stages={FUNNEL} />
      </Card>
    </div>
  );
}

function AssetsSegment() {
  return (
    <Card
      kicker="Inwentarz"
      title="Lead magnety i aktywa treściowe"
      lead="Co istnieje, co przechwytuje kontakt, a czego nie ma wcale. Pod spodem lista tego, czego nie da się ustalić bez dostępu do panelu — z kosztem zdobycia każdej odpowiedzi."
    >
      <AssetLedger assets={ASSETS} gaps={GAPS} />
    </Card>
  );
}
