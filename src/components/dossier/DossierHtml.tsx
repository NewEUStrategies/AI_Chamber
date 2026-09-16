/**
 * Renders a ported content block. The markup is static, first-party dossier
 * content (no user input), so injecting it directly is safe; `src/styles/dossier.css`
 * gives it the platform's look.
 */
export function DossierHtml({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
