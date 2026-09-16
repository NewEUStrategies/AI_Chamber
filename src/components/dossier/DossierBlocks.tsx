import type { DossierBlock } from '@/content/dossier';
import { DossierChart } from '@/components/dossier/DossierChart';
import { DossierHtml } from '@/components/dossier/DossierHtml';
import { DossierTabs } from '@/components/dossier/DossierTabs';

/** Renders a page's (or a tab's) block list. */
export function DossierBlocks({ blocks }: { blocks: DossierBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) =>
        block.kind === 'tabs' ? (
          <DossierTabs key={`${block.group}-${i}`} group={block.group} tabs={block.tabs} />
        ) : block.kind === 'component' ? (
          <DossierChart key={i} name={block.name} caption={block.caption} />
        ) : (
          <DossierHtml key={i} html={block.html} />
        )
      )}
    </div>
  );
}
