import type { RoadmapItem } from './types';

export const ROADMAP_TRACKS: Record<RoadmapItem['track'], string> = {
  zasieg: 'Zasięg',
  popyt: 'Popyt',
  wiarygodnosc: 'Wiarygodność',
  produkt: 'Produkt członkowski',
};

export const ROADMAP: RoadmapItem[] = [
  {
    key: 'r1-pomiar',
    quarter: 'Q4 2026',
    title: 'Pomiar zastępuje domysły',
    track: 'popyt',
    done: true,
    detail: 'Wdrożony pulpit rekrutacyjny + notatki z odczytów SimilarWeb/Semrush jako jedno źródło prawdy o zasięgu i popycie.',
  },
  {
    key: 'r1-formularz',
    quarter: 'Q4 2026',
    title: 'Formularz aplikacyjny na aichamber.eu',
    track: 'popyt',
    detail: 'Jeden formularz zamiast e-maila: kwalifikacja segmentu, kraju i wielkości firmy przy wypełnianiu, nie przy rozmowie.',
  },
  {
    key: 'r2-farmy',
    quarter: 'Q1 2027',
    title: 'Dekomunika profilu linkowego',
    track: 'wiarygodnosc',
    detail: 'Większość linków zwrotnych to farmy i reklamy Telegram — disavow w Search Console i weryfikacja, czy profil nie szkodzi pozycjom marki.',
  },
  {
    key: 'r2-ai-search',
    quarter: 'Q1 2027',
    title: 'Strategia widoczności w AI',
    track: 'zasieg',
    detail: 'Dopisanie struktury tematycznej (AI Act, członkostwo, CEE) tak, aby modele językowe miały co cytować — dziś izba nie istnieje w odpowiedziach AI.',
  },
  {
    key: 'r2-newsletter-baza',
    quarter: 'Q1 2027',
    title: 'Newsletter jako baza adresowa',
    track: 'zasieg',
    detail: 'Przeniesienie AI Insights CEE z formatu LinkedIn na własną listę z open rate — retencja niezinwonowana żadnym algorytmem.',
  },
  {
    key: 'r3-karuzele',
    quarter: 'Q2 2027',
    title: 'Formaty pod garderobę AI',
    track: 'zasieg',
    detail: 'Karuzele 2× mocniejsze od grafik — stała seria „AI w CEE w liczbach" raz w miesiącu, reuse w newsletterze i AI search.',
  },
  {
    key: 'r3-aktywacja',
    quarter: 'Q2 2027',
    title: 'Outbound przez sieć członków',
    track: 'popyt',
    detail: 'Program polecenia: członkowie i rada doradca wprowadzają kandydatów — odblokowuje potencjał 11 krajów.',
  },
  {
    key: 'r4-product',
    quarter: 'Q3 2027',
    title: 'Produkt członkowski 2.0',
    track: 'produkt',
    detail: 'Pakiety segmentowe (scale-up vs korporacja) zamiast jednego programu — obiekcje cenowe rozwiązane przez strukturę, nie rabat.',
  },
];

export const ROADMAP_NOTE =
  'Plan czynnościowy w podziale na tory (zasięg, popyt, wiarygodność, produkt); kwartały to planowany cykl, nie obietnica dat.';
