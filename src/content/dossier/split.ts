import { DOSSIER_PAGES } from './index';
import type { DossierPage } from './types';

/**
 * Które strony dossier stoją jako osobne pozycje menu.
 *
 * Plik istnieje osobno z tego samego powodu co `overlays.ts`: `01-*.ts` …
 * `15-*.ts` i `index.ts` są regenerowane przez `scripts/import-dossier.mjs`
 * i tracą wszystko, co się w nie wpisze. Podział trzymany tutaj przeżywa
 * regenerację.
 *
 * Trzy sekcje wychodzą z dossier, bo odpowiadają na inne pytanie niż reszta:
 * dossier jest rozpoznaniem organizacji, a te są kolejno przygotowaniem do
 * rozmowy, analizą rynku i pomiarem obecności w sieci. Bibliografia zostaje
 * w dossier, bo obsługuje wszystkie strony naraz.
 */
export const SOURCES_PAGE_ID = 'zrodla';

export type SectionKey = 'rekrutacja' | 'analiza' | 'slad';

export interface DossierSection {
  key: SectionKey;
  /** Etykieta w menu głównym. */
  navLabel: string;
  kicker: string;
  title: string;
  lead: string;
  /** Kolejność zakładek jest kolejnością czytania. */
  ids: readonly string[];
  /**
   * Zakładki za hasłem. Puste wszędzie poza rekrutacją: tam dwie strony
   * opisują przebieg konkretnej rozmowy i nie mają być czytane przypadkiem.
   */
  restricted?: readonly string[];
  password?: string;
}

export const SECTIONS: readonly DossierSection[] = [
  {
    key: 'rekrutacja',
    navLabel: 'Rekrutacja',
    kicker: 'Rekrutacja · przygotowanie do rozmowy',
    title: 'Pięć stron, które czyta się przed rozmową',
    lead:
      'Wydzielone z dossier, bo odpowiadają na inne pytanie: dossier jest rozpoznaniem organizacji, to jest przygotowaniem do rozmowy z nią. Kolejność zakładek jest kolejnością czytania.',
    ids: ['cv', 'oferta', 'fit', 'rozmowa', 'pitch'],
    restricted: ['rozmowa', 'pitch'],
    password: 'RozmowAI+',
  },
  {
    key: 'analiza',
    navLabel: 'Analiza rynkowa',
    kicker: 'Analiza rynkowa · rynek i kierunek',
    title: 'Gdzie stoi izba i dokąd może pójść',
    lead:
      'Dwie strony, które patrzą na zewnątrz organizacji: kto jeszcze zajmuje to miejsce w regionie i co z tego wynika dla planu wzrostu. Reszta dossier opisuje izbę samą w sobie — tu jest kontekst, w którym ona działa.',
    ids: ['rynek', 'plan'],
  },
  {
    key: 'slad',
    navLabel: 'Ślad cyfrowy',
    kicker: 'Ślad cyfrowy · co widać z zewnątrz',
    title: 'Wszystko, co dało się zmierzyć bez dostępu do panelu',
    lead:
      'Cztery odczyty obecności w sieci: ruch obu domen, szczyt w Pradze, widoczność w wyszukiwarce i kanały społecznościowe. To jedyna część materiału oparta wyłącznie na pomiarze — i dlatego to na nią powołuje się rejestr rekomendacji.',
    ids: ['kokpit', 'summit', 'seo', 'social'],
  },
] as const;

export const sectionByKey = (key: SectionKey): DossierSection =>
  SECTIONS.find((s) => s.key === key) ?? SECTIONS[0];

/* ---------------------------------------------------------------- *
 * Rozdział stron                                                   *
 * ---------------------------------------------------------------- */

const byId = (id: string) => DOSSIER_PAGES.find((p) => p.id === id);

/**
 * Nieistniejący identyfikator kończy się wyjątkiem, zamiast po cichu
 * wyrenderować sekcję z brakującą zakładką: taki brak jest dokładnie tym,
 * czego nikt nie zauważa w diffie, a importer może zmienić identyfikator.
 */
function resolve(section: DossierSection): DossierPage[] {
  return section.ids.map((id) => {
    const page = byId(id);
    if (!page) {
      throw new Error(
        `Strona „${id}” z sekcji „${section.key}” nie istnieje w DOSSIER_PAGES — sprawdź, czy importer nie zmienił identyfikatora.`
      );
    }
    return page;
  });
}

export const SECTION_PAGES: Record<SectionKey, DossierPage[]> = {
  rekrutacja: resolve(sectionByKey('rekrutacja')),
  analiza: resolve(sectionByKey('analiza')),
  slad: resolve(sectionByKey('slad')),
};

const MOVED = new Set<string>(SECTIONS.flatMap((s) => [...s.ids]));

/** Co zostaje w dossier po wyprowadzeniu trzech sekcji. */
export const DOSSIER_REMAINING: DossierPage[] = DOSSIER_PAGES.filter((p) => !MOVED.has(p.id));

/** Przegrupowane po podziale, żeby opróżniona grupa nie zostawiła nagłówka. */
export const DOSSIER_REMAINING_GROUPS: { group: string; pages: DossierPage[] }[] =
  DOSSIER_REMAINING.reduce(
    (acc, page) => {
      const last = acc[acc.length - 1];
      if (last && last.group === page.group) last.pages.push(page);
      else acc.push({ group: page.group, pages: [page] });
      return acc;
    },
    [] as { group: string; pages: DossierPage[] }[]
  );

/* Zachowane dla czytelności miejsc, które pytają wprost o rekrutację. */
export const RECRUITMENT_IDS = sectionByKey('rekrutacja').ids;
export type RecruitmentTab = (typeof RECRUITMENT_IDS)[number];
export const RECRUITMENT_PAGES = SECTION_PAGES.rekrutacja;

export type AnalizaTab = (typeof SECTIONS)[1]['ids'][number];
export type SladTab = (typeof SECTIONS)[2]['ids'][number];
