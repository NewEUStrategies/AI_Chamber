import { plNum } from './analytics';
import { g } from './glossary';
import { DOMAIN_HEALTH, SEO_DERIVED } from './seo';
import type { DossierPage } from './types';

/**
 * Page 18 — search visibility, built on the Semrush and Answer the Public
 * exports archived in `research/exports/` (bibliography entries 40–43).
 */

const FN: Record<string, string> = {
  '12': 'AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em>',
  '19': '„Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em>',
  '37': 'SimilarWeb, „Website Analysis: aichamber.eu”, raport za okres marzec-sierpień 2026, odczyt 16 września 2026 r. - ruch, zaangażowanie, kanały pozyskania, geografia i wyszukiwarka. <em>M2</em>',
  '40': 'Semrush, „Linki zwrotne: Przegląd”, aichamber.eu, domena główna, eksport z 16 września 2026 r. - Authority Score, domeny odsyłające, atrybuty i typy linków, rozkład Authority Score domen odsyłających, rozkład końcówek domen, kraje oraz anchory z datami pierwszego i ostatniego wystąpienia. <em>M2</em>',
  '41': 'Semrush, „Lista linków zwrotnych”, aichamber.eu, eksport stu pozycji z 16 września 2026 r. - adresy stron linkujących, anchory, atrybuty i Authority Score poszczególnych podstron. <em>M2</em>',
  '42': 'Semrush, „Pozycje organiczne”, aichamber.eu, baza danych Polska, odczyt panelu z 16 września 2026 r. - siedem fraz z pozycją, wolumeny, trudność i adresy docelowe. <em>M2</em>',
  '43': 'Answer the Public, prompty AI dla aichamber.eu, język polski, Polska, eksport z 16 września 2026 r. - dwadzieścia pięć zapytań przypisanych do ChatGPT i Gemini wraz z klasyfikacją intencji. <em>M2</em>',
};

let seq = 800;

function fn(refs: string, variant = ''): string {
  const list = refs.split(',').map((r) => r.trim());
  const cls = ['fn', variant].filter(Boolean).join(' ');
  const body = list.map((n) => `<b>${n}.</b> ${FN[n]}`).join('<br>');
  seq += 1;
  return (
    `<sup class="${cls}" tabindex="0" role="button"` +
    ` aria-label="Przypis ${list.join(', ')} — pokaż źródło"` +
    ` data-refs="${list.join(',')}" data-fn="${seq}">${list.join(',')}` +
    `<span class="fc" role="note">${body}</span></sup>`
  );
}

/* ---------------------------------------------------------------- */

const INTRO = `<div class="verdict block"><h4>Teza w jednym zdaniu</h4><p>Domena izby ma ${plNum(
  DOMAIN_HEALTH.backlinks
)} ${g('link zwrotny', 'linków zwrotnych')} z ${plNum(
  DOMAIN_HEALTH.referringDomains
)} ${g('domena odsyłająca', 'domen odsyłających')}${fn(
  '40'
)}, ale ${g('AS')} na poziomie ${DOMAIN_HEALTH.authorityScore} punktów i ${SEO_DERIVED.spamShare.toLocaleString(
  'pl-PL'
)}% profilu złożonego z ogłoszeń handlarzy linkami sprawiają, że ten dorobek nie pracuje. W Polsce domena rankuje na siedem fraz, z czego cztery dotyczą pola golfowego${fn(
  '42',
  'r'
)}. W odpowiedziach modeli językowych nazwa organizacji nie pada ani razu${fn(
  '40'
)}. To nie jest problem treści - to problem infrastruktury widoczności, której nikt nie zbudował.</p></div>`;

const HOW_TO_READ = `<div class="card block"><h3>Jak czytać tę zakładkę</h3>
  <p>Wszystkie pojęcia branżowe mają podpowiedź: najedź kursorem albo przejdź klawiszem Tab na podkreślony skrót. Pełny słownik jest w ostatniej zakładce.</p>
  <ul class="matters">
    <li>Dane pochodzą z Semrush, nie z Ahrefs${fn(
      '40,41,42'
    )}. To ważne przy rozmowie: ${g('AS')} i ${g('DR')} to różne metryki różnych firm i nie wolno ich mieszać. <span class="v">Semrush</span></li>
    <li>Eksporty źródłowe są w repozytorium, w katalogu <b>research/exports</b> - każdą liczbę da się sprawdzić u źródła. <span class="v">weryfikowalne</span></li>
    <li>Pozycje organiczne odczytano z bazy polskiej. Wcześniejszy zrzut dotyczył bazy amerykańskiej i pokazywał zupełnie inne, nieistotne frazy. <span class="v">baza PL</span></li>
    <li>Prompty AI to model tego, o co pytają użytkownicy w tym obszarze tematycznym${fn(
      '43'
    )} - nie są pomiarem rzeczywistych zapytań, tylko rekonstrukcją popytu. <span class="v">poziom M2</span></li>
  </ul>
</div>`;

const SPAM_ANALYSIS = `<div class="card block"><h3>Szum czy atak - rozstrzygnięcie</h3>
  <p>W poprzednim odczycie zostawiłem dwie hipotezy: ${g(
    'negatywne SEO'
  )} albo kupowane pozycjonowanie. Pełny eksport z datami pozwala je rozdzielić.</p>
  <div class="matters-title">Co przemawia za szumem, a nie za atakiem ani zakupem</div>
  <ul class="matters">
    <li><b>Pięciu różnych sprzedawców, nie jeden.</b> Anchory reklamują konkurencyjne kanały: @seo_anomaly, @bhs_links w dwóch wariantach adresu, @seo_cartel oraz bezimienną usługę ${g(
      'PBN'
    )}${fn(
  '40'
)}. Kto kupuje linki, kupuje u jednego dostawcy. <span class="v">5 źródeł</span></li>
    <li><b>Rozłożenie w czasie na jedenaście miesięcy.</b> Pierwszy anchor pojawił się 25 października 2025, kolejne w lutym, maju, czerwcu i lipcu 2026${fn(
      '40'
    )}. Atak wygląda jak jeden skok, nie jak równomierny przyrost. <span class="v">X 2025 – VII 2026</span></li>
    <li><b>Anchory nie opisują izby.</b> Reklamują sprzedawcę i jego kanał na Telegramie. Farma linkuje do losowych domen, żeby jej własne strony wyglądały na aktywne - domena docelowa jest tu przypadkowa. <span class="v">treść reklamy</span></li>
    <li><b>Katalogi generowane automatycznie.</b> W eksporcie widać wpisy typu „seo domain research" na domenach knows.sbs i takes.sbs${fn(
      '41'
    )} - to serwisy tworzące po jednej podstronie na każdą skanowaną domenę. Trafia tam każdy, kto istnieje. <span class="v">automat</span></li>
    <li><b>Prawie wszystko jest ${g(
      'nofollow'
    )}.</b> Siedem na dziesięć linków w całym profilu nie przekazuje autorytetu${fn(
  '40'
)}. Kupowane pozycjonowanie polega na linkach ${g('follow')} - inaczej nie ma za co płacić. <span class="v">69,1% nofollow</span></li>
  </ul>
  <div class="verdict cyan" style="margin-top:18px"><h4>Wniosek</h4><p>Najbardziej prawdopodobne wyjaśnienie to tło ekosystemu: farmy linkowe i automatyczne katalogi SEO linkują masowo do wszystkiego, co znajdą. Nie ma śladów ani celowego ataku, ani zakupu. Problem nie polega na tym, że ktoś coś izbie zrobił - tylko na tym, że jej własny dorobek linkowy jest na tyle mały (${plNum(
    SEO_DERIVED.brandBacklinks
  )} linków z nazwą organizacji), że szum go liczebnie przykrywa. To jednak nie znaczy, że można to zignorować: profil zdominowany przez ${g(
  'PBN'
)} obniża ${g('AS')} i jest ryzykiem przy każdej aktualizacji algorytmu.</p></div>
  <div class="matters-title" style="margin-top:16px">Co z tym zrobić - konkretnie</div>
  <ul class="matters">
    <li>Sprawdzić w Google Search Console, czy istnieje ${g(
      'disavow'
    )}. Jeśli nie - przygotować go dla domen na końcówkach .xyz i .site oraz dla wszystkich hostów <b>*-links-bhs.xyz</b>. <span class="v">${SEO_DERIVED.cheapTldDomains} domen</span></li>
    <li>Nie usuwać linków ręcznie ani nie pisać do właścicieli farm - to strata czasu, zgłoszenie do Google wystarcza.</li>
    <li>Zbudować przeciwwagę: każdy realny link z branżowego serwisu waży więcej niż setka linków z farmy. Materiał na to izba ma - raport o MŚP obiegł kilkanaście krajów.</li>
    <li>Monitorować kwartalnie. Przy 416 domenach odsyłających i rosnącym udziale śmieci koszt zaniedbania rośnie szybciej niż koszt reakcji.</li>
  </ul>
</div>`;

const PL_CONCLUSION = `<div class="verdict block"><h4>Co mówi polska widoczność</h4><p>Domena izby jest w Polsce niewidoczna na wszystko, co ma znaczenie dla jej działalności. Najmocniejsza fraza w portfolio - „golf park józefów", ${plNum(
  2400
)} wyszukiwań miesięcznie - prowadzi na stronę miejsca, w którym izba zorganizowała kiedyś wydarzenie${fn(
  '42'
)}. To nie jest błąd ani włamanie: strona lokalizacji zaindeksowała się i zaczęła odpowiadać na zapytania o pole golfowe, bo nic innego na tej domenie nie odpowiada na żadne zapytanie. Cały ruch organiczny z Polski to ${SEO_DERIVED.totalPlTraffic} wizyt miesięcznie${fn(
  '42',
  'r'
)}, a jedyna fraza, która go generuje, to nazwisko dyrektora ds. polityki publicznej. Dla stanowiska objętego rekrutacją${fn(
  '19'
)} wniosek jest ten sam, co z analizy ruchu: kanał wyszukiwarkowy nie przyprowadzi ani jednego członka i nie ma podstaw sądzić, że przyprowadzi w perspektywie roku.</p></div>`;

const VERDICT = `<div class="verdict cyan block"><h4>Wnioski dla stanowiska</h4><p>Po pierwsze: rozmowa o wynikach nie powinna dotyczyć SEO. Przy ${SEO_DERIVED.totalPlTraffic} wizytach organicznych miesięcznie${fn(
  '42'
)} i ${plNum(
  894
)} wizytach ze wszystkich kanałów${fn(
  '37'
)} żaden realistyczny scenariusz optymalizacji nie zmieni liczby pozyskanych członków w horyzoncie rocznym. Po drugie: jest tu jednak konkretny, tani projekt do zaproponowania na rozmowie - uporządkowanie profilu linkowego i zbudowanie kilkunastu stron odpowiadających na zapytania, które modele językowe już dziś wiążą z tym obszarem${fn(
  '43'
)}. To praca na kwartał, nie na rok, i daje efekt mierzalny. Po trzecie: największa nieoczywista wartość leży w tym, że izba jest cytowana przez modele${fn(
  '40'
)} i przez media branżowe - Euronews, Euractiv, 150sec${fn(
  '41'
)} - ale bez wymienienia nazwy. Zamiana cytowań na wzmianki marki jest zadaniem komunikacyjnym, nie technicznym, i mieści się w zakresie stanowiska. Po czwarte: kandydat, który przychodzi z tą diagnozą i gotowym planem naprawczym, wchodzi do rozmowy jako ktoś, kto już wykonał pracę - a nie jako ktoś, kto pyta o strategię.</p></div>`;

const GAPS = `<p class="note">Nie ustalono: czy istnieje ${g(
  'disavow'
)} w Google Search Console izby, jak wygląda profil linkowy domeny ceeaisummit.eu, jakie są pozycje organiczne poza Polską i Stanami Zjednoczonymi oraz czy spadek ${g(
  'AS'
)} z dwudziestu do czternastu punktów we wrześniu 2026 to korekta metodyki Semrush, czy realna utrata linków${fn(
  '40'
)}. Wszystkie liczby na tej stronie pochodzą z eksportów zarchiwizowanych w repozytorium i dają się odtworzyć.</p>`;

export const pageSeo: DossierPage = {
  id: 'seo',
  num: '18',
  navLabel: 'Widoczność w wyszukiwarce',
  group: 'Ślad cyfrowy',
  eyebrow: '18 · Ślad cyfrowy',
  title: 'Tysiąc trzysta linków, czternaście punktów autorytetu, siedem fraz',
  lead: `Analiza widoczności wyszukiwarkowej domeny aichamber.eu na podstawie dwóch eksportów Semrush${fn(
    '40,41'
  )}, odczytu pozycji organicznych z bazy polskiej${fn(
    '42'
  )} oraz zestawu promptów AI z Answer the Public${fn(
    '43'
  )}. Wszystkie skróty branżowe mają rozwinięcia pod kursorem; pełny słownik zamyka zakładkę.`,
  blocks: [
    { kind: 'html', html: INTRO },
    {
      kind: 'tabs',
      group: 'se',
      tabs: [
        {
          id: 'se-1',
          label: 'Kondycja domeny',
          blocks: [{ kind: 'component', name: 'seo-health' }, { kind: 'html', html: HOW_TO_READ }],
        },
        { id: 'se-2', label: 'Jakość linków', blocks: [{ kind: 'component', name: 'link-quality' }] },
        { id: 'se-3', label: 'Anchory i najmocniejsze linki', blocks: [{ kind: 'component', name: 'anchor-profile' }] },
        { id: 'se-4', label: 'Szum czy atak', blocks: [{ kind: 'html', html: SPAM_ANALYSIS }] },
        {
          id: 'se-5',
          label: 'Pozycje w Polsce',
          blocks: [{ kind: 'component', name: 'pl-positions' }, { kind: 'html', html: PL_CONCLUSION }],
        },
        { id: 'se-6', label: 'Widoczność w AI', blocks: [{ kind: 'component', name: 'ai-prompts' }] },
        { id: 'se-7', label: 'Słownik', blocks: [{ kind: 'component', name: 'glossary-panel' }] },
      ],
    },
    { kind: 'html', html: VERDICT },
    { kind: 'html', html: GAPS },
  ],
};

export const SEO_PAGES: DossierPage[] = [pageSeo];
