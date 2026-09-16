import {
  CHAMBER,
  CHAMBER_COUNTRIES,
  CHAMBER_TERMS,
  CHANNELS,
  DERIVED,
  plNum,
  SUMMIT,
} from './analytics';
import type { DossierPage } from './types';

/**
 * Two hand-written pages built on the SimilarWeb exports (sources 37–39).
 * They live outside the generated modules because they did not come from the
 * source dossier document — see `overlays.ts`.
 */

const FN: Record<string, string> = {
  '12': 'AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em>',
  '16': 'AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em>',
  '19': '„Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em>',
  '26': 'Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em>',
  '35': 'AI Chamber, „Membership Application” - formularz członkowski, 2026 r. - jednorazowa opłata rejestracyjna 20 EUR oraz składki roczne BASIC 150 EUR, PRO 500 EUR i PREMIUM 1 500 EUR; wybór waluty PLN albo EUR; progi zatrudnienia 1-5, 6-50, 51-250 i powyżej 250 osób. <em>M1</em>',
  '37': 'SimilarWeb, „Website Analysis: aichamber.eu”, raport za okres marzec-sierpień 2026, odczyt 16 września 2026 r. - ruch, zaangażowanie, kanały pozyskania, geografia i wyszukiwarka. <em>M2</em>',
  '38': 'SimilarWeb, „Website Analysis: ceeaisummit.eu”, raport za okres marzec-sierpień 2026, odczyt 16 września 2026 r. - ruch, zaangażowanie, kanały pozyskania, geografia i wyszukiwarka. <em>M2</em>',
  '39': 'ceeaisummit.eu, zapowiedź prelegentów CEE AI Summit 2026 - odczyt z podglądu strony zamieszczonego w raporcie SimilarWeb, sierpień 2026 r. <em>M2</em>',
};

let seq = 700;

/** Footnote markup identical in structure to the generated references. */
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

const pl = plNum;

/* ================================================================== *
 * 16 · Kokpit ruchu                                                   *
 * ================================================================== */

const COCKPIT_INTRO = `<div class="verdict block"><h4>Skala w jednym zdaniu</h4><p>Przez pół roku obie witryny zebrały łącznie ${pl(
  CHAMBER.totalVisits + SUMMIT.totalVisits
)} wizyt - mniej, niż średniej wielkości sklep internetowy notuje w tydzień. Izba zajmuje ${pl(
  CHAMBER.globalRank
)}. miejsce w rankingu globalnym${fn('37')}, summit ${pl(
  SUMMIT.globalRank
)}${fn('38', 'r')}. Wniosek dla stanowiska objętego rekrutacją jest bezpośredni: ruch przychodzący nie jest i w tej perspektywie nie będzie kanałem pozyskania członków. Sprzedaż musi być wychodząca, a witryna pełni funkcję materiału potwierdzającego wiarygodność, a nie źródła leadów.</p></div>`;

const COCKPIT_READING = `<div class="card block"><h3>Jak czytać te liczby</h3>
  <ul class="matters">
    <li>Okres obserwacji to sześć miesięcy: marzec-sierpień 2026${fn('37,38')}. Wydarzenie odbywa się 3 września 2026${fn(
  '16'
)}, więc dane kończą się dokładnie w przeddzień szczytu sezonu. <span class="v">III-VIII 2026</span></li>
    <li>SimilarWeb szacuje ruch modelowo, na podstawie panelu i danych dostawców. Przy witrynach o ruchu rzędu setek wizyt miesięcznie błąd względny jest największy - te wartości są rzędem wielkości, nie pomiarem. <span class="v">poziom M2</span></li>
    <li>Wartości miesięczne z wykresu „Visits over time" odczytano z wykresu i są przybliżone; sumy sześciomiesięczne pochodzą wprost z raportu i to je należy cytować. <span class="v">odczyt M4</span></li>
    <li>Rankingi branżowe nie są dostępne dla żadnej z witryn, co oznacza, że ruch jest zbyt mały, by SimilarWeb przypisał je do kategorii. <span class="v">brak danych</span></li>
  </ul>
</div>`;

const TIMELINE_NOTE = `Obie krzywe na jednej osi, bo mierzą to samo: liczbę wizyt miesięcznie. Czerwiec 2026 to miesiąc, w którym izba zanotowała ${DERIVED.chamberJuneShare}% całego półrocznego ruchu, a summit po raz pierwszy pojawił się w pomiarze. Sierpień to ${DERIVED.summitAugustShare}% całego ruchu summitu${fn(
  '37,38',
  'r'
)}.`;

const CURVE_ANALYSIS = `<div class="card block"><h3>Co mówi kształt krzywych</h3>
  <ul class="matters">
    <li>Serwis summitu nie istniał w pomiarze do maja 2026. Pierwszy mierzalny ruch to czerwiec - około ${pl(
      SUMMIT.monthly[3]
    )} wizyt - a potem wzrost do około ${pl(SUMMIT.monthly[5])} w sierpniu${fn(
  '38'
)}. To krzywa startu, nie krzywa marki. <span class="v">start VI 2026</span></li>
    <li>Izba ma inny profil: stabilne 300-500 wizyt miesięcznie od marca do maja, gwałtowny skok w czerwcu do około ${pl(
      CHAMBER.monthly[3]
    )}, korekta w lipcu i ponowny wzrost w sierpniu${fn('37')}. Skok i odbicie zbiegają się w czasie z uruchomieniem komunikacji o summicie. <span class="v">skok VI</span></li>
    <li>Ostatni miesiąc obu witryn rośnie: izba ${
      CHAMBER.changeUp ? '+' : '-'
    }${CHAMBER.changePct.toLocaleString('pl-PL')}%, summit ${
  SUMMIT.changeUp ? '+' : '-'
}${SUMMIT.changePct.toLocaleString('pl-PL')}% miesiąc do miesiąca${fn(
  '37,38'
)}. Dynamika jest wysoka, ale liczy się od bardzo niskiej bazy. <span class="v">+${SUMMIT.changePct.toLocaleString(
  'pl-PL'
)}%</span></li>
    <li>Ponieważ dane urywają się na sierpniu, nie widać ani szczytu wrześniowego, ani tego, co dzieje się po wydarzeniu. To pierwsza rzecz, o którą warto zapytać na rozmowie. <span class="v">luka</span></li>
  </ul>
</div>`;

const ENGAGEMENT = `<div class="card block"><h3>Zaangażowanie: dwa różne wzorce zachowania</h3>
  <p>Przy zbliżonym współczynniku odrzuceń (${CHAMBER.bounceRatePct.toLocaleString(
    'pl-PL'
  )}% wobec ${SUMMIT.bounceRatePct.toLocaleString(
  'pl-PL'
)}%) użytkownicy obu witryn zachowują się odwrotnie${fn('37,38')}.</p>
  <ul class="matters">
    <li>Na stronie izby wizyta trwa ${CHAMBER.visitDurationLabel}, czyli ${DERIVED.durationRatio.toLocaleString(
  'pl-PL'
)} raza dłużej niż na stronie summitu (${SUMMIT.visitDurationLabel}) - przy mniejszej liczbie odwiedzonych stron. To wzorzec czytania. <span class="v">${DERIVED.durationRatio.toLocaleString(
  'pl-PL'
)}×</span></li>
    <li>Na stronie summitu wizyta jest krótka, ale obejmuje więcej podstron (${SUMMIT.pagesPerVisit.toLocaleString(
      'pl-PL'
    )} wobec ${CHAMBER.pagesPerVisit.toLocaleString(
  'pl-PL'
)}). To wzorzec przeglądania agendy i listy prelegentów. <span class="v">${SUMMIT.pagesPerVisit.toLocaleString(
  'pl-PL'
)} str.</span></li>
    <li>Konsekwencja praktyczna: materiały merytoryczne warto publikować na domenie izby, bo tam ludzie faktycznie czytają. Summit jest kanałem konwersji na rejestrację, nie na treść. <span class="v">wniosek M5</span></li>
  </ul>
</div>`;

const inbound = (key: 'chamber' | 'summit') =>
  Number(
    CHANNELS.filter((c) => c.key === 'direct' || c.key === 'organic')
      .reduce((sum, c) => sum + c[key], 0)
      .toFixed(2)
  );
const paid = (key: 'chamber' | 'summit') =>
  Number(
    CHANNELS.filter((c) => c.key.startsWith('paid-'))
      .reduce((sum, c) => sum + c[key], 0)
      .toFixed(2)
  );

const CHANNEL_NOTE = `Miks kana\u0142\u00f3w obu witryn jest niemal identyczny: wej\u015bcia bezpo\u015brednie i wyszukiwarka organiczna daj\u0105 razem ${inbound(
  'chamber'
).toLocaleString('pl-PL')}% ruchu izby i ${inbound('summit').toLocaleString(
  'pl-PL'
)}% ruchu summitu${fn('37,38', 'r')}. Kana\u0142y p\u0142atne praktycznie nie istniej\u0105 - \u0142\u0105cznie ${paid(
  'chamber'
).toLocaleString('pl-PL')}% i ${paid('summit').toLocaleString('pl-PL')}%.`;

const SEARCH_ANALYSIS = `<div class="card block"><h3>Wyszukiwarka: summit wyszukuje się lepiej niż izba</h3>
  <p>Zestawienie zapytań organicznych to najmocniejszy pojedynczy wniosek z całego raportu.</p>
  <ul class="matters">
    <li>W zapytaniach ogólnych kierujących na stronę <b>izby</b> fraza „ai summit prague" odpowiada za ${CHAMBER_TERMS[0].sharePct.toLocaleString(
      'pl-PL'
    )}% ruchu, a razem z „cee ai summit prague" - za ${DERIVED.chamberSummitTermShare.toLocaleString(
  'pl-PL'
)}%${fn('37')}. Innymi słowy: prawie sześć na dziesięć osób trafiających na stronę izby z ogólnego wyszukiwania szuka w istocie summitu. <span class="v">${DERIVED.chamberSummitTermShare.toLocaleString(
  'pl-PL'
)}%</span></li>
    <li>Po stronie <b>summitu</b> warianty nazwy wydarzenia dają ${DERIVED.summitNameTermShare.toLocaleString(
      'pl-PL'
    )}% zapytań ogólnych${fn(
  '38'
)}. Poza nazwą własną nie ma tam praktycznie żadnego popytu tematycznego. <span class="v">${DERIVED.summitNameTermShare.toLocaleString(
  'pl-PL'
)}%</span></li>
    <li>Udział zapytań markowych odwraca obraz: izba ${CHAMBER.brandedPct}% wobec ${SUMMIT.brandedPct}% summitu${fn(
  '37,38'
)}. Izba jest wyszukiwana z nazwy przez tych, którzy już ją znają; summit dopiero jest odkrywany. <span class="v">${CHAMBER.brandedPct}% / ${SUMMIT.brandedPct}%</span></li>
    <li>W zapytaniach na stronę izby pojawia się też „when did musk predict agi?" (${CHAMBER_TERMS[1].sharePct.toLocaleString(
      'pl-PL'
    )}%) oraz literówka „aiczamber"${fn(
  '37',
  'r'
)}. Pierwsze to ruch przypadkowy z treści bloga, drugie - dowód, że nazwa marki bywa błędnie zapisywana. <span class="v">ruch przypadkowy</span></li>
  </ul>
  <p class="note">Wniosek operacyjny: to summit generuje popyt wyszukiwarkowy, a izba go przechwytuje. Odwrotnie niż zakłada intuicja, w której wydarzenie jest produktem organizacji. W komunikacji warto to wykorzystać: nazwa wydarzenia jest dziś mocniejszym hasłem niż nazwa izby.</p>
</div>`;

const GEO_ANALYSIS = `<div class="card block"><h3>Geografia: izba regionalna z ruchem krajowym</h3>
  <ul class="matters">
    <li>Ruch izby to w ${CHAMBER_COUNTRIES[0].sharePct.toLocaleString('pl-PL')}% Polska, dalej ${CHAMBER_COUNTRIES.slice(1)
      .map((c) => `${c.country} (${c.sharePct.toLocaleString('pl-PL')}%)`)
      .join(', ')}${fn(
      '37'
    )}. Organizacja opisuje się jako regionalna, a mierzalne zainteresowanie ma w praktyce jednokrajowe. <span class="v">83,97% PL</span></li>
    <li>Na liście nie ma Czech - kraju, w którym odbywa się flagowe wydarzenie${fn(
      '16'
    )} i który w 2024 roku wskazano jako pierwszy cel ekspansji${fn(
  '26',
  'r'
)}. <span class="v">brak CZ</span></li>
    <li>Cały mierzalny ruch summitu również pochodzi z Polski${fn(
      '38'
    )}. Wydarzenie w Pradze, pod auspicjami czeskiego ministerstwa, nie ma jeszcze czeskiej publiczności online. <span class="v">100% PL</span></li>
    <li>Ruch z Niemiec spadł o 66,22% miesiąc do miesiąca, podczas gdy polski wzrósł o 99,81%${fn(
      '37',
      'r'
    )}. Koncentracja na rynku krajowym się pogłębia, zamiast maleć. <span class="v">↓66,22% DE</span></li>
  </ul>
  <p class="note">To jest materiał na konkretne zdanie w rozmowie: rozpoznawalność regionalna jest dziś deklaracją, nie faktem mierzalnym - i to właśnie ta luka uzasadnia zatrudnienie osoby od rozwoju członkostwa i partnerstw.</p>
</div>`;

const COCKPIT_VERDICT = `<div class="verdict cyan block"><h4>Wnioski dla stanowiska</h4><p>Po pierwsze: lejek przychodzący nie istnieje. Przy ${pl(
  CHAMBER.monthlyVisits
)} wizytach miesięcznie i ${pl(
  CHAMBER.uniqueVisitors
)} unikalnych użytkownikach${fn(
  '37'
)} żaden realistyczny współczynnik konwersji nie da liczby członków, która miałaby znaczenie dla wyniku - przy bazie około 90 firm${fn(
  '12',
  'r'
)}. Rola jest z definicji wychodząca. Po drugie: najmocniejszym aktywem marketingowym izby jest wydarzenie, nie ona sama - to nazwa summitu przyciąga wyszukiwania, a strona izby je przejmuje. Po trzecie: wrzesień 2026 jest jedynym momentem w roku, w którym uwaga rynku faktycznie rośnie, więc kalendarz pozyskiwania członków i sponsorów powinien być zbudowany wokół tej daty, a nie rozłożony równomiernie. Po czwarte: brak Czech i szerzej brak regionu w danych to nie jest problem komunikacji, tylko brak sieci - dokładnie ten, który ma zasypać osoba na tym stanowisku${fn(
  '19',
  'r'
)}.</p></div>`;

const COCKPIT_GAPS = `<p class="note">Nie ustalono: ruchu po wydarzeniu (dane kończą się na sierpniu 2026), liczby rejestracji na summit, konwersji z odwiedzin na zgłoszenie członkowskie, wielkości bazy mailingowej ani zasięgów w kanałach społecznościowych - SimilarWeb nie znalazł dopasowania dla ruchu społecznościowego żadnej z witryn${fn(
  '37,38'
)}. Wszystkie wartości procentowe dotyczą udziału w ruchu, nie liczby osób.</p>`;

export const pageKokpit: DossierPage = {
  id: 'kokpit',
  num: '16',
  navLabel: 'Kokpit ruchu',
  group: 'Ślad cyfrowy',
  eyebrow: '16 · Ślad cyfrowy',
  title: 'Dwie domeny, sześć miesięcy, siedem tysięcy wizyt',
  lead: `Porównanie mierzalnej obecności online obu inicjatyw: izby i tworzonego przez nią summitu. Dane pochodzą z dwóch raportów SimilarWeb za okres marzec-sierpień 2026${fn(
    '37,38'
  )}. Kokpit poniżej zestawia je metryka po metryce, a kolejne zakładki rozbierają każdą z witryn osobno, pokazują miks kanałów i opisują przepływ ruchu między domenami.`,
  blocks: [
    { kind: 'component', name: 'traffic-cockpit' },
    { kind: 'html', html: COCKPIT_INTRO },
    {
      kind: 'tabs',
      group: 'tr',
      tabs: [
        {
          id: 'tr-1',
          label: 'Dynamika',
          blocks: [
            { kind: 'component', name: 'traffic-timeline', caption: TIMELINE_NOTE },
            { kind: 'html', html: CURVE_ANALYSIS },
            { kind: 'html', html: ENGAGEMENT },
          ],
        },
        {
          id: 'tr-2',
          label: 'aichamber.eu',
          blocks: [
            { kind: 'component', name: 'domain-detail-chamber' },
            { kind: 'html', html: GEO_ANALYSIS },
          ],
        },
        {
          id: 'tr-3',
          label: 'ceeaisummit.eu',
          blocks: [{ kind: 'component', name: 'domain-detail-summit' }],
        },
        {
          id: 'tr-4',
          label: 'Kanały',
          blocks: [
            { kind: 'component', name: 'channel-mix', caption: CHANNEL_NOTE },
            { kind: 'html', html: SEARCH_ANALYSIS },
          ],
        },
        {
          id: 'tr-5',
          label: 'Przepływ',
          blocks: [{ kind: 'component', name: 'domain-flow' }],
        },
        {
          id: 'tr-6',
          label: 'Jak czytać',
          blocks: [{ kind: 'html', html: COCKPIT_READING }],
        },
      ],
    },
    { kind: 'html', html: COCKPIT_VERDICT },
    { kind: 'html', html: COCKPIT_GAPS },
  ],
};

/* ================================================================== *
 * 17 · CEE AI Summit 2026                                             *
 * ================================================================== */

const SUMMIT_FACTS = `<div class="card block"><h3>Wydarzenie w faktach${fn('16')}</h3>
  <table class="data" style="margin-top:10px">
    <tbody>
      <tr><td>Nazwa</td><td>CEE AI Summit 2026</td></tr>
      <tr><td>Data</td><td class="num tabnum">3 września 2026</td></tr>
      <tr><td>Miejsce</td><td>Martinic Palace, Praga</td></tr>
      <tr><td>Patronat</td><td>Ministerstwo Przemysłu i Handlu Republiki Czeskiej</td></tr>
      <tr><td>Organizator</td><td>AI Chamber</td></tr>
      <tr><td>Domena</td><td>ceeaisummit.eu (osobna od aichamber.eu)</td></tr>
      <tr><td>Pierwszy mierzalny ruch</td><td class="num tabnum">czerwiec 2026${fn('38')}</td></tr>
    </tbody>
  </table>
  <p class="note">Wydarzenie jest jedynym przedsięwzięciem izby z własną domeną i własną tożsamością marketingową. To decyzja o konsekwencjach mierzalnych: buduje markę wydarzenia kosztem rozproszenia autorytetu domeny organizacji.</p>
</div>`;

const SUMMIT_WHY = `<div class="card block"><h3>Dlaczego to najważniejszy produkt izby</h3>
  <ul class="matters">
    <li>Gromadzi kapitał polityczny, którego izba nie jest w stanie zbudować komunikacją: komisarz UE, dwóch wicepremierów, dwóch ministrów i sekretarz stanu z pięciu krajów${fn(
      '39'
    )}. <span class="v">6 nazwisk</span></li>
    <li>Generuje popyt wyszukiwarkowy dla całej organizacji - to fraza „ai summit prague" prowadzi ludzi również na stronę izby${fn(
      '37'
    )}. <span class="v">50,66%</span></li>
    <li>Tworzy jedyny w roku moment naturalnej koncentracji uwagi, który daje pretekst do rozmowy sprzedażowej bez zimnego wejścia. <span class="v">wrzesień</span></li>
    <li>Jest naturalnym nośnikiem sponsoringu, czyli strumienia przychodu niezależnego od składek - a te, jak pokazuje zakładka 04, nie finansują organizacji. <span class="v">sponsoring</span></li>
    <li>Odbywa się w Czechach, czyli na rynku wskazanym jako pierwszy cel ekspansji już w 2024 roku${fn(
      '26',
      'r'
    )}, a jednocześnie nieobecnym w danych o ruchu${fn('37')}. <span class="v">test CZ</span></li>
  </ul>
</div>`;

const SUMMIT_RISKS = `<div class="card block"><h3>Ryzyka widoczne w danych</h3>
  <ul class="matters">
    <li><span class="pill warn">koncentracja</span> Cały mierzalny ruch na stronę wydarzenia pochodzi z Polski${fn(
      '38'
    )}. Wydarzenie w Pradze sprzedawane głównie polskiej publiczności to ryzyko frekwencyjne i wizerunkowe wobec czeskiego patrona.</li>
    <li><span class="pill warn">zależność</span> Trzy czwarte odesłań przychodzących pochodzi z jednej domeny - aichamber.eu${fn(
      '38'
    )}. Poza własnym kanałem izby summit nie ma dystrybucji.</li>
    <li><span class="pill warn">krótka wizyta</span> Średnia wizyta trwa ${SUMMIT.visitDurationLabel}${fn(
  '38'
)}. Przy sprzedaży biletów i pakietów sponsorskich to za mało, by strona zrobiła robotę - decyzja zapada poza nią.</li>
    <li><span class="pill cyan">brak danych</span> Nie znamy liczby rejestracji ani struktury uczestników. Bez tego nie da się ocenić, czy ruch przekłada się na frekwencję.</li>
    <li><span class="pill cyan">okno czasowe</span> Serwis zaczął istnieć w pomiarze na trzy miesiące przed wydarzeniem${fn(
      '38'
    )}. Przy edycji 2027 ten sam start dałby ten sam wynik - o ile nie zostanie zbudowana lista adresowa, która przetrwa między edycjami.</li>
  </ul>
</div>`;

const SUMMIT_PLAYBOOK = `<div class="card block"><h3>Jak to wykorzystać na stanowisku</h3>
  <div class="axis-intro">Poniższe punkty są sformułowane jako gotowe elementy odpowiedzi na rozmowie - łączą dane o ruchu z zakresem obowiązków z ogłoszenia${fn(
    '19'
  )}.</div>
  <div class="steps">
    <div class="step"><div class="lbl">Przed wydarzeniem</div><h4>Sprzedawać obecność, nie członkostwo</h4><p>Lista prelegentów rangi ministerialnej${fn(
      '39'
    )} jest argumentem, którego nie da się podrobić. Dla firmy technologicznej z regionu wartość to dostęp do tych osób, a nie sama przynależność do izby. Kolejność rozmowy: wydarzenie, potem członkostwo.</p></div>
    <div class="step"><div class="lbl">W Pradze</div><h4>Traktować wrzesień jako test rynku czeskiego</h4><p>Brak Czech w danych o ruchu${fn(
      '37'
    )} przy czeskim patronacie wydarzenia oznacza, że sieć lokalna dopiero powstaje. Wydarzenie jest jedyną okazją, by zbudować ją w dwa dni zamiast w rok.</p></div>
    <div class="step"><div class="lbl">Po wydarzeniu</div><h4>Przechwycić uwagę, zanim opadnie</h4><p>Sierpień dał ${DERIVED.summitAugustShare}% półrocznego ruchu summitu${fn(
  '38'
)}. Wrzesień będzie wyższy. Jeśli kontakt po wydarzeniu nie nastąpi w ciągu dwóch tygodni, kolejna naturalna okazja przypada za rok.</p></div>
    <div class="step"><div class="lbl">Na cały rok</div><h4>Zbudować kanał, który przetrwa między edycjami</h4><p>Ruch bezpośredni i organiczny dają ponad sześćdziesiąt procent wejść na obu witrynach${fn(
      '37,38'
    )}, a e-mail poniżej sześciu. Lista adresowa zbudowana wokół wydarzenia jest najtańszym sposobem, by wrzesień pracował przez dwanaście miesięcy.</p></div>
  </div>
</div>`;

const SUMMIT_VERDICT = `<div class="verdict block"><h4>Teza o summicie</h4><p>CEE AI Summit jest dziś mocniejszą marką niż organizacja, która go tworzy - wyszukiwania kierujące na stronę izby dotyczą w większości wydarzenia, nie izby${fn(
  '37'
)}. To jednocześnie największe aktywo i największe ryzyko: przedsięwzięcie o rozpoznawalności skoncentrowanej w jednym tygodniu roku i w jednym kraju, zasilane ruchem z jednego źródła. Dla kandydata oznacza to prostą strategię: użyć wydarzenia jako drzwi wejściowych do rozmowy o członkostwie i partnerstwie, a równolegle budować to, czego wydarzeniu brakuje - dystrybucję poza domeną izby i obecność na rynku czeskim, który formalnie jest gospodarzem, a w danych nie istnieje.</p></div>`;

export const pageSummit: DossierPage = {
  id: 'summit',
  num: '17',
  navLabel: 'CEE AI Summit 2026',
  group: 'Ślad cyfrowy',
  eyebrow: '17 · Inicjatywa flagowa',
  title: 'Wydarzenie, które wyszukuje się lepiej niż jego organizator',
  lead: `Flagowa konferencja izby zaplanowana na 3 września 2026 roku w Martinic Palace w Pradze, pod auspicjami czeskiego Ministerstwa Przemysłu i Handlu${fn(
    '16'
  )}. Zakładka łączy to, co o wydarzeniu wiadomo z zapowiedzi, z tym, co widać w danych o ruchu jego własnej domeny${fn(
    '38'
  )} - łącznie ze składem prelegentów, którego rangi nie widać nigdzie indziej w dossier.`,
  blocks: [
    { kind: 'component', name: 'summit-speakers' },
    { kind: 'html', html: SUMMIT_FACTS },
    {
      kind: 'tabs',
      group: 'sm',
      tabs: [
        { id: 'sm-1', label: 'Dlaczego jest kluczowy', blocks: [{ kind: 'html', html: SUMMIT_WHY }] },
        { id: 'sm-2', label: 'Ryzyka', blocks: [{ kind: 'html', html: SUMMIT_RISKS }] },
        { id: 'sm-3', label: 'Ruch własnej domeny', blocks: [{ kind: 'component', name: 'domain-detail-summit' }] },
        { id: 'sm-4', label: 'Jak to rozegrać', blocks: [{ kind: 'html', html: SUMMIT_PLAYBOOK }] },
      ],
    },
    { kind: 'html', html: SUMMIT_VERDICT },
  ],
};

export const TRAFFIC_PAGES: DossierPage[] = [pageKokpit, pageSummit];
