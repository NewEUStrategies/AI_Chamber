import { Megaphone } from 'lucide-react';
import { FUNNEL_STAGES } from '@/content/marketing/funnel';
import { CHANNELS } from '@/content/marketing/channels';
import { ASSETS } from '@/content/marketing/assets';
import { IcpMap } from './IcpMap';
import { FunnelDiagram } from './FunnelDiagram';
import { ChannelMatrix } from './ChannelMatrix';
import { RoadmapBoard } from './RoadmapBoard';
import { AssetLedger } from './AssetLedger';
import { MktHeading, MktStat } from './primitives';

/** Widok marketingowy — rozpoznawczy kokpit strategii dotarcia AI Chamber CEE. */
export function MarketingView() {
  const leadStage = FUNNEL_STAGES.find((s) => s.key === 'lead');
  const memberStage = FUNNEL_STAGES[FUNNEL_STAGES.length - 1];
  const running = CHANNELS.filter((c) => c.status === 'prowadzony').length;
  const planned = CHANNELS.filter((c) => c.status === 'planowany').length;

  return (
    <div className="space-y-8">
      <MktHeading
        eyebrow="Marketing"
        title="Kokpit strategii dotarcia"
      >
        Rozpoznawczy widok strategii marketingowej izby — od segmentów ICP, przez lejek
        konwersji i macierz kanałów, po plan czynnościowy i rejestr zasobów.
      </MktHeading>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MktStat
          value={String(leadStage?.value ?? '—')}
          label="Zapytania / kwartał"
          info="Zapytania o członkostwo z formularza i e-maila — start lejka popytu."
        />
        <MktStat
          value={String(memberStage.value)}
          label="Nowi członkowie / kwartał"
          info="Podpisani członkowie izby — finał lejka; przy tym kroku retencja > pozyskanie."
        />
        <MktStat
          value={`${running}`}
          label="Kanały prowadzone"
          info="Kanały aktywnie używane z pomiarem wyniku."
        />
        <MktStat
          value={`${planned}`}
          label="Kanały do uruchomienia"
          info="Kanały zaplanowane, ale jeszcze nieuruchomione — bez pomiaru do czasu startu."
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <IcpMap />
        <FunnelDiagram />
      </section>

      <ChannelMatrix />
      <RoadmapBoard />
      <AssetLedger />

      <footer className="flex items-center gap-2 text-xs text-slate-400">
        <Megaphone className="h-3.5 w-3.5 text-chamber-green-deep" />
        {ASSETS.length} zasobów w rejestrze · dane z odczytów SimilarWeb i Semrush z 15–16 września 2026
      </footer>
    </div>
  );
}
