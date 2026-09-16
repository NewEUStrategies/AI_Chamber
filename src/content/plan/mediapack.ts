/**
 * Media pack.
 *
 * Not a brochure. The test for every element below is whether it shortens a
 * journalist's path from the e-mail to a published piece — anything that does
 * not is decoration, and decoration is what makes a pack go unread.
 *
 * The tiering, the embargo sequence and the spokesperson SLA live with the
 * conference material (`@/content/conference/quotes`), because that is where
 * they are executed. This file carries what the pack itself contains.
 */

export const FRAMING = {
  whatItIs: 'Narzędzie skracające dziennikarzowi drogę od maila do opublikowanego tekstu.',
  whatItIsNot: 'Broszura.',
  tieringRule: 'Wysyłka do wszystkich jest wysyłką do nikogo.',
};

/** Nine elements. The order is the order a journalist opens them in. */
export const PACK_CONTENTS = [
  {
    what: 'Arkusz faktów na jednej stronie',
    detail: 'Data, miejsce, ranga patronatu, liczba uczestników, kraje, format.',
    why: 'Wszystko, co trafia do pierwszego akapitu, bez szukania.',
  },
  {
    what: 'Trzy tematy prasowe',
    detail: 'Sformułowane jako gotowe leady artykułu, nie jako opis paneli.',
    why: 'Dziennikarz potrzebuje kąta, nie agendy. To jest pozycja, którą pakiety najczęściej mylą.',
  },
  {
    what: 'Prelegenci',
    detail: 'Biogramy i portrety w wysokiej rozdzielczości, z podziałem na poziom: Komisja, rząd, biznes, nauka.',
    why: 'Podział na poziomy decyduje, kogo redakcja wybierze do tytułu.',
  },
  {
    what: 'Raport pod embargo w całości',
    detail: 'Pełny dokument, nie streszczenie.',
    why: 'Z podsumowania nie da się napisać tekstu — da się przepisać komunikat.',
  },
  {
    what: 'Zestaw liczb do zacytowania',
    detail: 'Z metodą i próbą podanymi przy każdej.',
    why: 'Liczba bez metody jest liczbą, którą redakcja wytnie na etapie faktcheckingu.',
  },
  {
    what: 'Cytaty do autoryzacji',
    detail: 'Po jednym od prezesa i od dyrektora ds. polityki publicznej, zwolnione od godziny otwarcia.',
    why: 'Gotowy cytat to różnica między wzmianką a wypowiedzią.',
  },
  {
    what: 'Akredytacja',
    detail: 'Zasady, formularz, termin.',
    why: 'Akredytacja jest lejkiem — daje listę dziennikarzy na cały rok, nie tylko na jeden dzień.',
  },
  {
    what: 'Zasady wideo i foto',
    detail: 'Lokalizacja strefy wywiadów, osoba odpowiedzialna za dostęp do prelegentów.',
    why: 'Ekipa, która nie wie, gdzie wolno stanąć, nie przyjedzie drugi raz.',
  },
  {
    what: 'Pakiet do udostępnienia',
    detail: 'Dla prelegentów i partnerów, zgodny z protokołem amplifikacji T-24h.',
    why: 'Ten sam materiał obsługuje media i kaskadę profili osobistych.',
  },
];

/** A separate document, for a different buyer. */
export const SPONSOR_PACK = {
  whoFor: 'partnerzy korporacyjni',
  answers: [
    'Co dokładnie kupują w warstwie ekspozycji.',
    'Ile materiałów wideo z ich udziałem powstanie.',
    'Jakie materiały dostaną po wydarzeniu.',
    'W jakim terminie.',
  ],
  why: 'Przy niejawnych cenach partnerstw to jedyny sposób uzasadnienia kwoty.',
};

export const MEDIAPACK_WATCH = {
  baseline: 'brak pomiaru',
  watch: [
    'Liczba akredytacji.',
    'Publikacje per poziom listy.',
    'Materiały cytujące raport z podaniem nazwy izby.',
  ],
};
