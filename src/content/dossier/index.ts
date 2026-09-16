import type { DossierPage } from './types';
import { applyOverlays } from './overlays';
import { pagePrzeglad } from './01-przeglad';
import { pageStruktura } from './02-struktura';
import { pageOrganizacja } from './03-organizacja';
import { pageModel } from './04-model';
import { pageDorobek } from './05-dorobek';
import { pageCzlonkowie } from './06-czlonkowie';
import { pageObszary } from './07-obszary';
import { pageZrodla } from './08-zrodla';
import { pageCv } from './09-cv';
import { pageOferta } from './10-oferta';
import { pageFit } from './11-fit';
import { pageRozmowa } from './12-rozmowa';
import { pageRynek } from './13-rynek';
import { pagePlan } from './14-plan';
import { pagePitch } from './15-pitch';

/** Pełna treść dossier — 15 stron, 357 odsyłaczy, 34 pozycje bibliograficzne. */
const SOURCE_PAGES: DossierPage[] = [
  pagePrzeglad,
  pageStruktura,
  pageOrganizacja,
  pageModel,
  pageDorobek,
  pageCzlonkowie,
  pageObszary,
  pageZrodla,
  pageCv,
  pageOferta,
  pageFit,
  pageRozmowa,
  pageRynek,
  pagePlan,
  pagePitch,
];

/** Generated pages plus the hand-written additions from ./overlays. */
export const DOSSIER_PAGES: DossierPage[] = applyOverlays(SOURCE_PAGES);

export const DOSSIER_GROUPS: { group: string; pages: DossierPage[] }[] = DOSSIER_PAGES.reduce(
  (acc, page) => {
    const last = acc[acc.length - 1];
    if (last && last.group === page.group) last.pages.push(page);
    else acc.push({ group: page.group, pages: [page] });
    return acc;
  },
  [] as { group: string; pages: DossierPage[] }[]
);

export * from './types';
export { DOSSIER_OVERLAYS } from './overlays';
