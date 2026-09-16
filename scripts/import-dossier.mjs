/**
 * One-off importer that ported the AI Chamber dossier document into
 * `src/content/dossier/*.ts`. Kept in the repo so the generated modules stay
 * reproducible and reviewable — they are generated, not hand-written.
 *
 *   node scripts/import-dossier.mjs <source.html>
 *
 * What it does:
 *  - slices the source document into its 15 pages,
 *  - lifts page heads, heroes, tab groups and the two charts out of the markup,
 *  - tags every footnote marker with `data-refs` so the UI can jump to the
 *    matching bibliography entry, and anchors those entries with `data-src`,
 *  - emits one TypeScript module per page plus an ordered index.
 *
 * The visual layer lives in `src/styles/dossier.css`; nothing here carries the
 * source document's original (dark) styling.
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = process.argv[2];
if (!SRC) {
  console.error('usage: node scripts/import-dossier.mjs <source.html>');
  process.exit(1);
}
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/content/dossier');
const html = readFileSync(SRC, 'utf8');
const lines = html.split('\n');

/* ============ generic helpers ============ */
const VOID = new Set(['input', 'br', 'hr', 'img', 'meta', 'link', 'source', 'col']);

function topLevelChildren(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const lt = src.indexOf('<', i);
    if (lt === -1) break;
    if (src.startsWith('<!--', lt)) { i = src.indexOf('-->', lt) + 3; continue; }
    const m = /^<([a-zA-Z][\w-]*)/.exec(src.slice(lt, lt + 40));
    if (!m) { i = lt + 1; continue; }
    const tag = m[1].toLowerCase();
    const openEnd = src.indexOf('>', lt);
    if (VOID.has(tag) || src[openEnd - 1] === '/') {
      out.push({ tag, html: src.slice(lt, openEnd + 1), inner: '' });
      i = openEnd + 1;
      continue;
    }
    let depth = 0, cursor = lt, closeIdx = -1;
    const openRe = new RegExp(`<${tag}(?=[\\s>/])`, 'gi');
    const closeRe = new RegExp(`</${tag}\\s*>`, 'gi');
    while (cursor < src.length) {
      openRe.lastIndex = cursor; closeRe.lastIndex = cursor;
      const o = openRe.exec(src);
      const c = closeRe.exec(src);
      if (!c) break;
      if (o && o.index < c.index) { depth++; cursor = o.index + 1; continue; }
      depth--; cursor = c.index + c[0].length;
      if (depth === 0) { closeIdx = cursor; break; }
    }
    if (closeIdx === -1) { out.push({ tag, html: src.slice(lt), inner: '' }); break; }
    out.push({ tag, html: src.slice(lt, closeIdx), inner: src.slice(openEnd + 1, closeIdx - (`</${tag}>`).length) });
    i = closeIdx;
  }
  return out;
}
const clsOf = (n) => (n.html.match(/^<[a-zA-Z][\w-]*[^>]*?\sclass="([^"]*)"/) || [, ''])[1].split(/\s+/);
const attrOf = (n, name) => (n.html.match(new RegExp(`^<[a-zA-Z][\\w-]*[^>]*?\\s${name}="([^"]*)"`)) || [, ''])[1];
const innerOf = (h, tag) => h.slice(h.indexOf('>') + 1, h.length - (`</${tag}>`).length);

/* ============ nav metadata (from the artifact sidebar) ============ */
const navHtml = html.slice(html.indexOf('<nav class="nav">'), html.indexOf('</nav>'));
const nav = [];
let group = '';
for (const m of navHtml.matchAll(/<div class="grp">([^<]+)<\/div>|<label for="pg-([a-z]+)"><span class="idx">(\d+)<\/span>([^<]+)<\/label>/g)) {
  if (m[1]) group = m[1];
  else nav.push({ id: m[2], num: m[3], label: m[4], group });
}

/* ============ page slicing ============ */
const starts = [];
lines.forEach((l, i) => {
  const m = l.match(/^\s*<div class="page" id="page-([a-z]+)">\s*$/);
  if (m) starts.push({ id: m[1], line: i });
});
const rawPages = starts.map((s, idx) => {
  const hardEnd = idx + 1 < starts.length ? starts[idx + 1].line : lines.length;
  let end = hardEnd - 1;
  while (end > s.line && lines[end].trim() !== '</div>') end--;
  return { id: s.id, html: lines.slice(s.line + 1, end).join('\n') };
});

/* ============ HTML → platform markup transforms ============ */
let fnSeq = 0;
function transform(h) {
  // 1. footnote markers become focusable, clickable references into the bibliography
  h = h.replace(
    /<sup class="fn([^"]*)" tabindex="0">([\d,\s]+)<span class="fc">/g,
    (_, mods, refs) => {
      fnSeq += 1;
      const list = refs.split(',').map((r) => r.trim()).filter(Boolean);
      return `<sup class="fn${mods}" tabindex="0" role="button" aria-label="Przypis ${list.join(', ')} — pokaż źródło" data-refs="${list.join(',')}" data-fn="${fnSeq}">${refs}<span class="fc" role="note">`;
    }
  );

  // bibliography entries get stable anchors so footnotes can jump to them
  h = h.replace(
    /<div class="i"><span class="n">(\d+)\.<\/span>/g,
    (_, n) => `<div class="i" id="zrodlo-${n}" data-src="${n}"><span class="n">${n}.</span>`
  );

  // numeric table cells: platform uses tabular figures, not a mono face
  h = h.replace(/class="num"/g, 'class="num tabnum"');

  return h;
}

/* ============ per-page structure ============ */
const pages = [];
for (const page of rawPages) {
  const kids = topLevelChildren(page.html);
  const out = { id: page.id, eyebrow: null, title: '', lead: null, hero: null, blocks: [] };
  let pendingTabs = null;

  const pushHtml = (h) => {
    const last = out.blocks[out.blocks.length - 1];
    if (last && last.kind === 'html') last.html += '\n' + h;
    else out.blocks.push({ kind: 'html', html: h });
  };

  for (const node of kids) {
    const c = clsOf(node);
    if (c.includes('pager')) continue;
    if (node.tag === 'input' && c.includes('tab-radio')) continue;

    if (c.includes('page-head')) {
      const hk = topLevelChildren(node.inner);
      const eb = hk.find((n) => n.tag === 'span' && clsOf(n).includes('eyebrow'));
      const h2 = hk.find((n) => n.tag === 'h2');
      const lead = hk.find((n) => n.tag === 'p' && clsOf(n).includes('lead'));
      out.eyebrow = eb ? innerOf(eb.html, 'span') : null;
      out.title = h2 ? innerOf(h2.html, 'h2') : '';
      out.lead = lead ? transform(innerOf(lead.html, 'p')) : null;
      continue;
    }

    if (c.includes('hero')) {
      const hk = topLevelChildren(node.inner);
      const tag = hk.find((n) => n.tag === 'span' && clsOf(n).includes('tag'));
      const h2 = hk.find((n) => n.tag === 'h2');
      const decks = hk.find((n) => n.tag === 'p' && clsOf(n).includes('decks'));
      out.hero = {
        tag: tag ? innerOf(tag.html, 'span').replace(/<span class="dot"><\/span>/, '').trim() : '',
        title: h2 ? innerOf(h2.html, 'h2') : '',
        lead: decks ? transform(innerOf(decks.html, 'p')) : '',
      };
      continue;
    }

    if (c.includes('graph-wrap')) {
      out.blocks.push({ kind: 'component', name: 'structure-graph' });
      continue;
    }

    if (c.includes('chart-card')) {
      const note = /<p class="note">([\s\S]*?)<\/p>/.exec(node.inner);
      if (!note) throw new Error('chart card without caption on ' + page.id);
      out.blocks.push({ kind: 'component', name: 'members-chart', caption: transform(note[1]) });
      continue;
    }

    if (c.includes('tabs')) {
      pendingTabs = [...node.inner.matchAll(/<label for="([^"]+)">([\s\S]*?)<\/label>/g)].map((m) => ({
        id: m[1],
        label: m[2].trim(),
      }));
      continue;
    }

    if (c.includes('tabwrap')) {
      const panes = topLevelChildren(node.inner).filter((p) => clsOf(p).includes('tabpane'));
      if (!pendingTabs || pendingTabs.length !== panes.length) {
        throw new Error(`tab mismatch on ${page.id}`);
      }
      out.blocks.push({
        kind: 'tabs',
        group: pendingTabs[0].id.split('-')[0],
        tabs: pendingTabs.map((t, i) => ({ id: t.id, label: t.label, html: transform(panes[i].inner) })),
      });
      pendingTabs = null;
      continue;
    }

    pushHtml(transform(node.html));
  }
  pages.push(out);
}

/* ============ emit TypeScript modules ============ */
const lit = (s) => '`' + s + '`';
const fileFor = (p) => {
  const meta = nav.find((n) => n.id === p.id);
  const parts = [];
  parts.push(`import type { DossierPage } from './types';\n`);
  parts.push(`export const ${camel(p.id)}: DossierPage = {`);
  parts.push(`  id: '${p.id}',`);
  parts.push(`  num: '${meta.num}',`);
  parts.push(`  navLabel: ${JSON.stringify(meta.label)},`);
  parts.push(`  group: ${JSON.stringify(meta.group)},`);
  parts.push(`  eyebrow: ${p.eyebrow ? JSON.stringify(p.eyebrow) : 'null'},`);
  parts.push(`  title: ${lit(p.title)},`);
  parts.push(`  lead: ${p.lead ? lit(p.lead) : 'null'},`);
  if (p.hero) {
    parts.push(`  hero: {`);
    parts.push(`    tag: ${lit(p.hero.tag)},`);
    parts.push(`    title: ${lit(p.hero.title)},`);
    parts.push(`    lead: ${lit(p.hero.lead)},`);
    parts.push(`  },`);
  }
  parts.push(`  blocks: [`);
  for (const b of p.blocks) {
    if (b.kind === 'html') parts.push(`    { kind: 'html', html: ${lit(b.html)} },`);
    else if (b.kind === 'component')
      parts.push(
        b.caption
          ? `    { kind: 'component', name: '${b.name}', caption: ${lit(b.caption)} },`
          : `    { kind: 'component', name: '${b.name}' },`
      );
    else {
      parts.push(`    {`);
      parts.push(`      kind: 'tabs',`);
      parts.push(`      group: '${b.group}',`);
      parts.push(`      tabs: [`);
      for (const t of b.tabs) {
        parts.push(`        { id: '${t.id}', label: ${JSON.stringify(t.label)}, html: ${lit(t.html)} },`);
      }
      parts.push(`      ],`);
      parts.push(`    },`);
    }
  }
  parts.push(`  ],`);
  parts.push(`};\n`);
  return parts.join('\n');
};
function camel(id) { return 'page' + id.charAt(0).toUpperCase() + id.slice(1); }

/* types.ts and overlays.ts are hand-written — keep them while replacing the rest. */
for (const f of readdirSync(OUT).filter((f) => /^\d\d-.*\.ts$/.test(f) || f === 'index.ts')) {
  rmSync(`${OUT}/${f}`);
}
mkdirSync(OUT, { recursive: true });

for (const p of pages) {
  const meta = nav.find((n) => n.id === p.id);
  writeFileSync(`${OUT}/${meta.num}-${p.id}.ts`, fileFor(p));
}

const index = [
  `import type { DossierPage } from './types';`,
  `import { applyOverlays } from './overlays';`,
  ...pages.map((p) => {
    const meta = nav.find((n) => n.id === p.id);
    return `import { ${camel(p.id)} } from './${meta.num}-${p.id}';`;
  }),
  ``,
  `/** Pełna treść dossier — 15 stron, ${fnSeq} odsyłaczy, 34 pozycje bibliograficzne. */`,
  `const SOURCE_PAGES: DossierPage[] = [`,
  ...pages.map((p) => `  ${camel(p.id)},`),
  `];`,
  ``,
  `/** Generated pages plus the hand-written additions from ./overlays. */`,
  `export const DOSSIER_PAGES: DossierPage[] = applyOverlays(SOURCE_PAGES);`,
  ``,
  `export const DOSSIER_GROUPS: { group: string; pages: DossierPage[] }[] = DOSSIER_PAGES.reduce(`,
  `  (acc, page) => {`,
  `    const last = acc[acc.length - 1];`,
  `    if (last && last.group === page.group) last.pages.push(page);`,
  `    else acc.push({ group: page.group, pages: [page] });`,
  `    return acc;`,
  `  },`,
  `  [] as { group: string; pages: DossierPage[] }[]`,
  `);`,
  ``,
  `export * from './types';`,
  `export { DOSSIER_OVERLAYS } from './overlays';`,
  ``,
].join('\n');
writeFileSync(`${OUT}/index.ts`, index);

console.log('pages written:', pages.length);
console.log('footnotes tagged:', fnSeq);
console.log('nav:', nav.map((n) => `${n.num} ${n.label}`).join(' | '));
