import type { DossierComponent } from '@/content/dossier';
import { MembersChart } from '@/components/dossier/charts/MembersChart';
import { StructureGraph } from '@/components/dossier/charts/StructureGraph';

/** Charts that replaced the source document's inline SVGs. */
export function DossierChart({ name, caption }: { name: DossierComponent; caption?: string }) {
  if (name === 'structure-graph') return <StructureGraph />;
  return (
    <div className="card p-6 sm:p-7">
      <MembersChart />
      {caption && <p className="note" dangerouslySetInnerHTML={{ __html: caption }} />}
    </div>
  );
}
