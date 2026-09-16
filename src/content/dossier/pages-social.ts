import { g } from './glossary';
import { plNum } from './analytics';
import { CHANNELS, FB, LI, LINKEDIN_POSTS, SOCIAL_DERIVED } from './social';
import type { DossierPage } from './types';

/**
 * Page 19 — social media, built on the seventy screenshots of the LinkedIn and
 * Facebook feeds archived in `research/screenshots/` (bibliography entry 44).
 */

const FN: Record<string, string> = {
  '37': 'SimilarWeb, „Website Analysis: aichamber.eu”, raport za okres marzec-sierpień 2026, odczyt 16 września 2026 r. - ruch, zaangażowanie, kanały pozyskania, geografia i wyszukiwarka. <em>M2</em>',
  '42': 'Semrush, „Pozycje organiczne”, aichamber.eu, baza danych Polska, odczyt panelu z 16 września 2026 r. - siedem fraz z pozycją, wolumeny, trudność i adresy docelowe. <em>M2</em>',
  '44': 'Zrzuty ekranu profili AI Chamber CEE na LinkedIn (linkedin.com/company/ai-chamber-cee) i Facebooku (facebook.com/AIChamberCEE), odczyt z 16 września 2026 r., siedemdziesiąt plików w katalogu <b>research/screenshots</b> - treści postów, formaty, grafiki, liczby reakcji, komentarzy i udostępnień oraz liczba obserwujących. <em>M1</em>',
};

let seq = 900;

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

const pl1 = (n: number) => n.toLocaleString('pl-PL', { maximumFractionDigits: 1 });

/* ---------------------------------------------------------------- */

const INTRO = `<div class="verdict block"><h4>Teza w jednym zdaniu</h4><p>Izba prowadzi jeden działający kanał i jeden martwy. LinkedIn z ${plNum(
  CHANNELS.linkedin.followers
)} obserwujących zbiera medianę ${LI.median} reakcji na post${fn(
  '44'
)}; Facebook — medianę ${FB.median} i od ${SOCIAL_DERIVED.fbSilentDays} dni nie opublikował nic, w tym ani słowa o własnym szczycie w Pradze. Wewnątrz LinkedIna widać wyraźny wzorzec: trzy posty pokazujące prawdziwych ludzi zebrały ${Math.round(
  SOCIAL_DERIVED.humanShare
)}% wszystkich reakcji kanału, a najczęściej produkowany format — pojedyncza grafika — wypada najsłabiej. To nie jest problem zasięgu. To problem tego, co i gdzie się publikuje.</p></div>`;

const METHOD = `<div class="card block"><h3>Jak czytać tę zakładkę</h3>
  <p>Wszystkie pojęcia branżowe mają podpowiedź: najedź kursorem albo przejdź klawiszem Tab na podkreślony skrót. Pełny słownik jest w ostatniej zakładce.</p>
  <ul class="matters">
    <li>Liczby pochodzą z siedemdziesięciu zrzutów ekranu obu profili${fn(
      '44'
    )}, odczytanych z wyrenderowanych kart postów. Pliki źródłowe są w repozytorium. <span class="v">weryfikowalne</span></li>
    <li>Zapis „X i N innych osób" przeliczam na N+1. Brak licznika komentarzy lub udostępnień oznacza zero — obie platformy ukrywają licznik przy wartości zerowej. <span class="v">metoda</span></li>
    <li><b>${g('zasieg', 'Zasięgów')} i ${g(
  'impresje'
)} tu nie ma.</b> Widzi je wyłącznie administrator strony. Wszystko poniżej liczone jest od reakcji i od bazy obserwujących. <span class="v">ograniczenie</span></li>
    <li>LinkedIn pokazuje przybliżony wiek posta („2 mies."), Facebook — dokładną datę. Dlatego precyzyjny kalendarz mam tylko dla słabszego kanału. <span class="v">asymetria danych</span></li>
    <li>Próba obejmuje ${LI.posts} postów z LinkedIna i ${FB.posts} z Facebooka, od maja do 16 września 2026. <span class="v">${
  LI.posts + FB.posts
} postów</span></li>
  </ul>
</div>`;

const FB_CASE = `<div class="card block"><h3>Facebook — anatomia martwego kanału</h3>
  <p>Strona istnieje, jest podlinkowana z witryny i z profilu LinkedIn, ma adres, telefon kontaktowy i wypełnione dane. Nie ma tylko jednego: odbiorców.</p>
  <div class="matters-title">Fakty</div>
  <ul class="matters">
    <li><b>Ostatni post: 6 sierpnia.</b> Odczyt z 16 września — ${SOCIAL_DERIVED.fbSilentDays} dni ciszy${fn(
  '44'
)}. <span class="v">${SOCIAL_DERIVED.fbSilentDays} dni</span></li>
    <li><b>W tej ciszy zmieścił się CEE AI Summit.</b> Szczyt 3 września, Deklaracja Praska podpisana przez dziewięć państw, komisarz Komisji Europejskiej na scenie, ponad 250 uczestników. Na Facebooku ani słowa. Na LinkedIn ten sam materiał dał ${
  LI.max
} reakcji — najlepszy post w całej próbie. <span class="v">0 vs ${LI.max}</span></li>
    <li><b>Mediana ${FB.median} reakcji.</b> Najlepszy post w historii kanału zebrał ${
  FB.max
} reakcje. Pięć postów z dwunastu ma zero. <span class="v">mediana ${FB.median}</span></li>
    <li><b>Zero opinii.</b> Strona ma włączone recenzje i ani jednej oceny. <span class="v">0 opinii</span></li>
    <li><b>Treść jest przeklejana.</b> W poście z 5 sierpnia hashtag wyrenderował się jako <code>hashtag#AIChamber</code> — to ślad kopiowania z LinkedIna, gdzie znacznik ma inną składnię. Nikt tego nie przeczytał po wklejeniu. <span class="v">${g(
  'cross-posting'
)}</span></li>
  </ul>
  <div class="matters-title" style="margin-top:16px">Dlaczego to kosztuje, mimo że nic nie kosztuje</div>
  <p>Utrzymanie tej strony nie wymaga budżetu, więc łatwo uznać ją za neutralną. Nie jest. Izba linkuje do niej z własnej witryny. Potencjalny członek, który sprawdza organizację przed zapłaceniem składki, klika i widzi kanał milczący od sześciu tygodni, z jednocyfrowymi reakcjami i zerem opinii. Dla organizacji, która sprzedaje przynależność do społeczności, to dowód przeciwko własnej ofercie.</p>
</div>`;

const CONCLUSIONS = `<div class="card block"><h3>Wnioski</h3>
  <ul class="matters">
    <li><b>Ludzie biją produkcję ${pl1(SOCIAL_DERIVED.humanLift)}-krotnie.</b> Zdjęcia z sali i transmisje na żywo: średnio ${pl1(
  SOCIAL_DERIVED.humanMean
)} reakcji. Wszystko inne: ${pl1(
  SOCIAL_DERIVED.producedMean
)}. Trzy posty z twarzami dały ${Math.round(
  SOCIAL_DERIVED.humanShare
)}% wyniku całego kanału. <span class="v">${pl1(SOCIAL_DERIVED.humanLift)}×</span></li>
    <li><b>Rozmowa dzieje się tylko na żywo.</b> Dwie transmisje zebrały ${
  SOCIAL_DERIVED.liveComments
} z ${LINKEDIN_POSTS.reduce(
  (n, p) => n + p.comments,
  0
)} komentarzy w całym kanale. Reszta publikacji generuje reakcje, nie dyskusję. <span class="v">${
  SOCIAL_DERIVED.liveComments
} z ${LINKEDIN_POSTS.reduce((n, p) => n + p.comments, 0)}</span></li>
    <li><b>Najsłabszy format jest najczęstszy.</b> Pojedyncza grafika to najliczniejsza grupa w kanale i przedostatnie miejsce w skuteczności. Zasoby idą w to, co nie działa. <span class="v">odwrotna alokacja</span></li>
    <li><b>Polski działa, a go nie ma.</b> Transmisja po polsku o wpływie AI na psychikę zebrała 9 komentarzy — drugi wynik w kanale. Postów po polsku jest ${
  SOCIAL_DERIVED.polishPosts
} na ${
  LI.posts
}. Jednocześnie w polskim wyszukiwaniu izba ma sześć wizyt organicznych miesięcznie${fn(
  '42',
  'r'
)}. Kanał polskojęzyczny jest jednocześnie sprawdzony i niewykorzystany. <span class="v">${
  SOCIAL_DERIVED.polishPosts
} z ${LI.posts}</span></li>
    <li><b>Marka rozpada się na dwie.</b> ${SOCIAL_DERIVED.visualFamilies} konwencji wizualnych, w tym dwie równoległe identyfikacje — granatowa izby i zielona szczytu. Trzy posty to niezaadaptowane kreacje partnerów. <span class="v">${
  SOCIAL_DERIVED.visualFamilies
} konwencji</span></li>
    <li><b>Baza obserwujących jest mała jak na ambicje.</b> ${plNum(
      CHANNELS.linkedin.followers
    )} obserwujących przy deklarowanej roli głosu regionu. Dla porównania Startup Poland, fundacja tego samego założyciela, ma ${plNum(
  SOCIAL_DERIVED.startupPolandFollowers
)}${fn('44')} — ${pl1(
  SOCIAL_DERIVED.startupPolandFollowers / CHANNELS.linkedin.followers
)} raza więcej. <span class="v">${plNum(CHANNELS.linkedin.followers)} vs ${plNum(
  SOCIAL_DERIVED.startupPolandFollowers
)}</span></li>
    <li><b>Ruch z social media do witryny jest marginalny.</b> Przy tej wielkości bazy i tym poziomie zaangażowania kanały społecznościowe nie są i nie będą istotnym źródłem ruchu${fn(
      '37'
    )} — chyba że zmieni się skala. <span class="v">kontekst M2</span></li>
  </ul>
</div>`;

const RECOMMENDATIONS = `<div class="card block"><h3>Rekomendacje</h3>
  <p>Uporządkowane według stosunku efektu do kosztu. Pierwsze trzy nie wymagają budżetu — tylko decyzji.</p>

  <div class="matters-title">1. Rozstrzygnąć los Facebooka — w tym tygodniu</div>
  <p>Dwie opcje, obie lepsze od obecnej. <b>Zamknąć</b>: usunąć link z witryny, zarchiwizować stronę, przekierować ruch na LinkedIn. Albo <b>przypisać właściciela i minimalny rytm</b>: jeden post tygodniowo, treść pisana pod Facebooka, nie przeklejana. Trzeciej opcji — zostawić jak jest — nie ma, bo milcząca strona linkowana z witryny pracuje przeciwko sprzedaży członkostwa. Rekomendacja: <b>zamknąć</b>. Grupa docelowa izby, czyli decydenci i kadra zarządzająca firm technologicznych, jest na LinkedIn.</p>

  <div class="matters-title">2. Odwrócić proporcje formatów</div>
  <p>Dziś kanał produkuje najwięcej pojedynczych grafik, a te wypadają najsłabiej. Cel na kwartał: <b>co najmniej jedna relacja zdjęciowa i jedna transmisja na żywo miesięcznie</b>. Materiał już powstaje — izba organizuje szczyt, golf, debaty i webinary. Brakuje decyzji, żeby fotograf był na miejscu i żeby zdjęcia trafiały do feedu tego samego dnia, a nie tydzień później.</p>

  <div class="matters-title">3. Wprowadzić polskojęzyczną ścieżkę</div>
  <p>Sprawdzona: jedyna polska transmisja dała drugi wynik komentarzowy w kanale. Propozycja: <b>co druga transmisja po polsku</b>, tematy z pogranicza technologii i praktyki zarządczej, a nie regulacji. Osobno rozwiązuje to lukę pokazaną w zakładce o wyszukiwarce — izba nie istnieje w polskim wyszukiwaniu${fn(
    '42'
  )}, a jej członkowie i potencjalni członkowie to firmy z Polski.</p>

  <div class="matters-title">4. Ujednolicić warstwę wizualną</div>
  <p>Dwie identyfikacje mogą współistnieć, ale muszą mieć wspólny mianownik — jeden układ logotypu, jedna rodzina krojów, jedna reguła dla zdjęć. Materiały partnerów przepuszczać przez własny szablon ramki. Wycofać kompozyty generowane z postów o polityce publicznej: powołanie do forum doradczego Komisji Europejskiej zasługuje na zdjęcie z podpisu albo na kartę ekspercką, nie na ilustrację ze stocku.</p>

  <div class="matters-title">5. Rozbudować format, który już działa najlepiej jakościowo</div>
  <p>Karty eksperckie z <b>Rzeczpospolitą</b>, <b>wirtualnemedia</b>, <b>My Company Polska</b> i <b>dlahandlu.pl</b> to jedyny format, który jednocześnie buduje pozycję członka i izby. Użyty cztery razy. Przy bazie około dziewięćdziesięciu firm członkowskich to zasób na kilkanaście miesięcy publikacji — i argument sprzedażowy przy pozyskiwaniu kolejnych.</p>

  <div class="matters-title">6. Zacząć mierzyć to, czego dziś nie widać</div>
  <p>Cała powyższa analiza opiera się na tym, co widzi osoba niezalogowana. ${g(
    'zasieg',
    'Zasięgi'
  )}, ${g(
  'impresje'
)}, współczynnik klikalności i źródła obserwujących są w panelu administratora. Bez nich nie da się odpowiedzieć, czy słabe posty mają słaby zasięg, czy dobry zasięg i słabą treść — a to dwa różne problemy z dwoma różnymi rozwiązaniami.</p>
</div>`;

const CAVEAT = `<div class="card block"><h3>Czego ta analiza nie mówi</h3>
  <ul class="matters">
    <li>Nie znam zasięgów ani wyświetleń. Wszystkie wnioski dotyczą <b>zaangażowania widocznego publicznie</b>, nie dotarcia. <span class="v">ograniczenie</span></li>
    <li>Nie znam liczby obserwujących strony na Facebooku — licznik nie jest publiczny w tym widoku. Dlatego dla Facebooka nie liczę ${g(
      'ER'
    )}. <span class="v">brak mianownika</span></li>
    <li>Próba z LinkedIna to ${
      LI.posts
    } postów z około trzech miesięcy. Jeśli w tym czasie wypadły posty, których zrzuty nie objęły, mediana może się nieco przesunąć — kierunek wniosków nie. <span class="v">próba</span></li>
    <li>Nie wiem, ile z tych publikacji było promowanych płatnie. Post z płatnym wsparciem i post organiczny wyglądają w feedzie tak samo. <span class="v">nieznane</span></li>
    <li>Nie analizowałem Instagrama ani X — izba nie linkuje do nich z witryny ani z profilu na Facebooku. <span class="v">poza zakresem</span></li>
  </ul>
</div>`;

const pageSocial: DossierPage = {
  id: 'social',
  num: '19',
  navLabel: 'Kanały społecznościowe',
  group: 'Ślad cyfrowy',
  eyebrow: '19 · Ślad cyfrowy',
  title: 'Jeden kanał żyje, drugi milczy od sześciu tygodni',
  lead: `Analiza komunikacji AI Chamber CEE na LinkedIn i Facebooku, na podstawie siedemdziesięciu zrzutów obu profili z 16 września 2026 roku${fn(
    '44'
  )}. ${LI.posts} postów z LinkedIna i ${FB.posts} z Facebooka: formaty, treści, grafiki, reakcje, komentarze i udostępnienia. Wszystkie skróty branżowe mają rozwinięcia pod kursorem.`,
  blocks: [
    { kind: 'html', html: INTRO },
    {
      kind: 'tabs',
      group: 'sm',
      tabs: [
        { id: 'sm-1', label: 'Kokpit kanałów', blocks: [{ kind: 'component', name: 'social-cockpit' }, { kind: 'html', html: METHOD }] },
        { id: 'sm-2', label: 'Wszystkie posty', blocks: [{ kind: 'component', name: 'post-ledger' }] },
        { id: 'sm-3', label: 'Co działa', blocks: [{ kind: 'component', name: 'format-impact' }] },
        { id: 'sm-4', label: 'Warstwa wizualna', blocks: [{ kind: 'component', name: 'visual-system' }] },
        { id: 'sm-5', label: 'Przypadek Facebooka', blocks: [{ kind: 'html', html: FB_CASE }] },
        { id: 'sm-6', label: 'Wnioski i rekomendacje', blocks: [{ kind: 'html', html: CONCLUSIONS }, { kind: 'html', html: RECOMMENDATIONS }, { kind: 'html', html: CAVEAT }] },
        { id: 'sm-7', label: 'Słownik', blocks: [{ kind: 'component', name: 'social-glossary' }] },
      ],
    },
  ],
};

export const SOCIAL_PAGES: DossierPage[] = [pageSocial];
