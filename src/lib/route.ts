import type { ArtifactKey } from '@/content/conference/types';
import type { AnalizaTab, RecruitmentTab, SladTab } from '@/content/dossier/split';

/**
 * Where a click goes.
 *
 * The Pulpit is a register of recommendations whose only job is to hand the
 * reader off to the place the detail lives, so a destination has to be
 * expressible as a value — not as "the Marketing view, and then find the
 * roadmap tab yourself". Every view that has internal tabs therefore accepts
 * its own coordinate here, and the union is exhaustive: adding a tab without
 * adding it to the type is a compile error, not a dead link.
 */
export type MarketingSegment = 'lejek' | 'kim' | 'kanaly' | 'aktywa' | 'roadmapa';

/** The proposed-actions channels on the conference page. */
export type PlanKey = 'social' | 'email' | 'www' | 'mediapack';

/** Sekcje kart stanowiskowych. */
export type StanowiskaTab =
  | 'przeglad'
  | 'karty'
  | 'macierz'
  | 'place'
  | 'specjalistyczne'
  | 'zrodla';

export type Route =
  | { view: 'pulpit' }
  | { view: 'marketing'; segment?: MarketingSegment }
  | { view: 'konferencje'; mode?: 'material'; tab?: ArtifactKey }
  | { view: 'konferencje'; mode: 'plan'; tab?: PlanKey }
  | { view: 'rekrutacja'; tab?: RecruitmentTab }
  | { view: 'analiza'; tab?: AnalizaTab }
  | { view: 'slad'; tab?: SladTab }
  | { view: 'stanowiska'; tab?: StanowiskaTab }
  /**
   * `refs` carries bibliography entries to reveal on arrival. The recruitment
   * pages keep their footnotes but the bibliography stays in the dossier, so a
   * marker there becomes a cross-view jump rather than a dead sup.
   */
  | { view: 'dossier'; page?: string; refs?: string[] };

export type ViewKey = Route['view'];

/**
 * A stable identity for a destination, used as the mounted view's React key.
 *
 * Deep links have to work the second time as well as the first: a reader who
 * opens the roadmap, clicks another tab inside it, returns to the Pulpit and
 * follows the same link again must land on the roadmap. Keeping the visit
 * counter in the key makes that a remount rather than a piece of
 * synchronisation logic that has to be right in every view separately.
 */
export function routeKey(route: Route, visit: number): string {
  const parts: string[] = [route.view];
  if (route.view === 'marketing') parts.push(route.segment ?? '');
  if (route.view === 'konferencje') parts.push(route.mode ?? '', route.tab ?? '');
  if (route.view === 'rekrutacja') parts.push(route.tab ?? '');
  if (route.view === 'analiza') parts.push(route.tab ?? '');
  if (route.view === 'slad') parts.push(route.tab ?? '');
  if (route.view === 'stanowiska') parts.push(route.tab ?? '');
  if (route.view === 'dossier') parts.push(route.page ?? '', (route.refs ?? []).join(','));
  return `${parts.join(':')}#${visit}`;
}

/** True when the two routes name the same view, whatever the coordinate. */
export const sameView = (a: Route, b: Route) => a.view === b.view;
