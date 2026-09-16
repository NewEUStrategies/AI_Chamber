import type { FC } from 'react';
import type { DossierComponent } from '@/content/dossier';
import { ChannelMix } from '@/components/dossier/charts/ChannelMix';
import { DomainDetail } from '@/components/dossier/charts/DomainDetail';
import { DomainFlow } from '@/components/dossier/charts/DomainFlow';
import { MembersChart } from '@/components/dossier/charts/MembersChart';
import { StructureGraph } from '@/components/dossier/charts/StructureGraph';
import { SummitSpeakers } from '@/components/dossier/charts/SummitSpeakers';
import { TrafficCockpit } from '@/components/dossier/charts/TrafficCockpit';
import { TrafficTimeline } from '@/components/dossier/charts/TrafficTimeline';
import { AiPrompts } from '@/components/dossier/charts/AiPrompts';
import { AnchorProfile } from '@/components/dossier/charts/AnchorProfile';
import { GlossaryPanel } from '@/components/dossier/charts/GlossaryPanel';
import { LinkQuality } from '@/components/dossier/charts/LinkQuality';
import { PlPositions } from '@/components/dossier/charts/PlPositions';
import { SeoHealth } from '@/components/dossier/charts/SeoHealth';

/** Components that bring their own card frame. */
const SELF_FRAMED: DossierComponent[] = [
  'structure-graph',
  'domain-flow',
  'domain-detail-chamber',
  'domain-detail-summit',
  'summit-speakers',
  'traffic-cockpit',
  'seo-health',
  'link-quality',
  'anchor-profile',
  'pl-positions',
  'ai-prompts',
  'glossary-panel',
];

const COMPONENTS: Record<DossierComponent, FC> = {
  'structure-graph': StructureGraph,
  'members-chart': MembersChart,
  'traffic-cockpit': TrafficCockpit,
  'traffic-timeline': TrafficTimeline,
  'channel-mix': ChannelMix,
  'domain-flow': DomainFlow,
  'domain-detail-chamber': () => <DomainDetail which="chamber" />,
  'domain-detail-summit': () => <DomainDetail which="summit" />,
  'summit-speakers': SummitSpeakers,
  'seo-health': SeoHealth,
  'link-quality': LinkQuality,
  'anchor-profile': AnchorProfile,
  'pl-positions': PlPositions,
  'ai-prompts': AiPrompts,
  'glossary-panel': GlossaryPanel,
};

/** Charts and panels that replace or extend the source document's figures. */
export function DossierChart({ name, caption }: { name: DossierComponent; caption?: string }) {
  const Component = COMPONENTS[name];
  if (!Component) return null;
  if (SELF_FRAMED.includes(name) && !caption) return <Component />;
  return (
    <div className={SELF_FRAMED.includes(name) ? undefined : 'card p-6 sm:p-7'}>
      <Component />
      {caption && <p className="note" dangerouslySetInnerHTML={{ __html: caption }} />}
    </div>
  );
}
