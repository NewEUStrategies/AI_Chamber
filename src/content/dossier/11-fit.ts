import type { DossierPage } from './types';

export const pageFit: DossierPage = {
  id: 'fit',
  num: '11',
  navLabel: "Dopasowanie do oferty",
  group: "Przygotowanie",
  eyebrow: "11 · Przygotowanie",
  title: `Dopasowanie do oferty`,
  lead: `Zestawienie profilu kandydata<sup class="fn" tabindex="0" role="button" aria-label="Przypis 34 — pokaż źródło" data-refs="34" data-fn="205">34<span class="fc" role="note"><b>34.</b> Igor Miasnikow, CV oraz portfolio projektów - dane własne kandydata, 2026 r. <em>M1</em></span></sup> z wymaganiami ogłoszenia na stanowisko Partnerships &amp; Membership Growth Manager<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="206">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup> - obszary mocne, luki wraz z kontrargumentami oraz historie sukcesu przypisane do konkretnych zapisów oferty.`,
  blocks: [
    {
      kind: 'tabs',
      group: 'ft',
      tabs: [
        { id: 'ft-1', label: "Dopasowanie", html: `
          <div class="verdict block">
            <h4>Analiza dopasowania</h4>
            <p>Oferta opiera się na czterech filarach: proaktywnym pozyskiwaniu podmiotów, prowadzeniu pełnego cyklu relacji, komunikowaniu wartości oferty oraz samodzielnej pracy na pipeline'ie z raportowaniem w CRM. We wszystkich czterech profil kandydata ma udokumentowane rezultaty, choć osiągnięte w rolach nazwanych inaczej niż business development. Dwa punkty wyraźnie przewyższają wymóg: angielski C1<sup class="fn" tabindex="0" role="button" aria-label="Przypis 34 — pokaż źródło" data-refs="34" data-fn="207">34<span class="fc" role="note"><b>34.</b> Igor Miasnikow, CV oraz portfolio projektów - dane własne kandydata, 2026 r. <em>M1</em></span></sup> wobec „very good written and spoken” oraz merytoryczne zaplecze w AI, technologii i polityce publicznej, które ogłoszenie wskazuje jedynie jako atut dodatkowy<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="208">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup>. Trzeci wyróżnik jest subtelniejszy, ale w tej roli istotny: kandydat projektował i wyceniał ofertę świadczeń własnej organizacji, więc rozumie produkt członkowski od strony konstrukcji wartości, a nie tylko jej sprzedaży.</p>
          </div>
          <div class="card" style="margin-top:16px">
            <table class="data">
              <thead><tr><th>Obszar wymagań<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="209">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup></th><th>Dowód z doświadczenia<sup class="fn" tabindex="0" role="button" aria-label="Przypis 34 — pokaż źródło" data-refs="34" data-fn="210">34<span class="fc" role="note"><b>34.</b> Igor Miasnikow, CV oraz portfolio projektów - dane własne kandydata, 2026 r. <em>M1</em></span></sup></th><th>Siła</th></tr></thead>
              <tbody>
                <tr><td>Pozyskiwanie partnerów i sponsorów</td><td>14 partnerów i sponsorów dla EFC; 25 partnerów trzech edycji konferencji</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>Zarządzanie relacjami z interesariuszami</td><td>Sieć 100+ współpracowników, rad programowych i ekspertów zagranicznych w NES</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>Prowadzenie własnego pipeline'u</td><td>Sekwencje lead nurturing w LinkedIn Sales Navigator dla działów eksportu (Elektronika)</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>CRM i raportowanie działań</td><td>HubSpot, Pipedrive; wdrożenie CRM i marketing automation w EFC; własne trackery</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>Konstruowanie i wycena oferty</td><td>Oferta świadczeń NES wraz z wyceną, biznesplan i strategia realizacji</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>Networking na wydarzeniach</td><td>Trzy edycje konferencji własnej, kongres EFC, przygotowanie udziału w URC 2026 w Gdańsku</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>Znajomość AI, technologii i polityki publicznej</td><td>Think tank geopolityczny, własna platforma SaaS, praca magisterska z geostrategii</td><td><span class="pill pos">przewyższa</span></td></tr>
                <tr><td>Język angielski</td><td>Poziom C1; dodatkowo hiszpański C1 i praca na rynkach hiszpańskojęzycznych</td><td><span class="pill pos">przewyższa</span></td></tr>
                <tr><td>Praca w środowisku B2B</td><td>Eksport przemysłowy, doradztwo korporacyjne, rynek finansowy</td><td><span class="pill pos">mocna</span></td></tr>
                <tr><td>Rynki międzynarodowe CEE</td><td>Strategia sprzedażowa dla Rumunii, Węgier, Litwy i Grecji; kampania rumuńska</td><td><span class="pill">standardowa</span></td></tr>
                <tr><td>Działania retencyjne</td><td>Automatyzacja i segmentacja bazy, wzrost subskrybentów o 43% r/r</td><td><span class="pill">standardowa</span></td></tr>
                <tr><td>Formalne doświadczenie sprzedażowe z kwotą</td><td>Brak roli nazwanej sales lub business development</td><td><span class="pill warn">luka</span></td></tr>
              </tbody>
            </table>
          </div>
          <div class="verdict cyan block" style="margin-top:16px">
            <h4>Argument syntetyczny</h4>
            <p>Kandydat nie przychodzi z doświadczeniem sprzedawcy członkostwa, ale z doświadczeniem osoby, która zbudowała organizację żyjącą z pozyskiwania partnerów i utrzymywania relacji z setką interesariuszy. To zmienia rozmowę: nie chodzi o to, czy potrafi wykonywać czynności z listy obowiązków - te wykonywał - ale o to, czy zniesie presję celu liczbowego. Odpowiedź na to pytanie leży w liczbach, które już dostarczył: 14 partnerów kongresu, 25 partnerów konferencji, 267 tys. odbiorców za 950 PLN na nowym rynku. Każdy z tych wyników wymagał domknięcia rozmowy, nie tylko jej prowadzenia.</p>
          </div>
        ` },
        { id: 'ft-2', label: "Luki i kontrargumenty", html: `
          <div class="verdict cyan block">
            <h4>Luki i kontrargumenty</h4>
            <p>Sześć obszarów wymaga zaadresowania. Poniżej realny stan oraz argument, który można postawić na swoją korzyść. Zasada obowiązująca w całym dossier: nie ukrywać luki, lecz pokazać najkrótszą ścieżkę jej domknięcia oraz przewagę, która ją równoważy. W rozmowie o roli sprzedażowej udawanie doświadczenia, którego nie ma, jest szczególnie ryzykowne - rozmówca z piętnastoletnim stażem w business development wychwyci to natychmiast.</p>
          </div>
          <div class="card" style="margin-top:16px">
            <table class="data">
              <thead><tr><th>Luka / wymóg<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="211">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup></th><th>Realny stan<sup class="fn" tabindex="0" role="button" aria-label="Przypis 34 — pokaż źródło" data-refs="34" data-fn="212">34<span class="fc" role="note"><b>34.</b> Igor Miasnikow, CV oraz portfolio projektów - dane własne kandydata, 2026 r. <em>M1</em></span></sup></th><th>Argument na swoją korzyść</th></tr></thead>
              <tbody>
                <tr><td>Ponad 5 lat w business development</td><td>Około czterech lat aktywności rozwojowej liczonej od EFC (2021); nazwa stanowiska nigdy nie brzmiała BD</td><td>Wymóg opisuje czynności, nie tytuły. Pozyskiwanie sponsorów i partnerów honorowych, budowa rad programowych, tworzenie i wycena oferty oraz wejścia na nowe rynki to dokładnie ten zakres - wykonywany od 2021 roku równolegle w kilku organizacjach.</td></tr>
                <tr><td>Ponad 3 lata w sprzedaży</td><td>Brak roli sprzedażowej z kwotą i planem</td><td>Nie było kwoty, były rezultaty domknięte: 14 partnerów kongresu, 25 partnerów konferencji, sieć stu interesariuszy. Gotowość do pracy z celem liczbowym jest realna - w modelu z prowizją to warunek własnego wynagrodzenia, nie tylko oczekiwanie pracodawcy.</td></tr>
                <tr><td>Sprzedaż członkostwa w organizacji członkowskiej</td><td>Brak doświadczenia w tym konkretnym produkcie</td><td>Kandydat projektował ofertę świadczeń własnej fundacji wraz z wyceną, więc zna ten produkt od strony konstrukcji wartości. Rozumie też jego specyficzną mechanikę: automatyczne odnowienie z terminem 31 grudnia<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="213">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup> oraz fakt, że ponad połowa nieodnowień wynika z braku zaangażowania, a nie z ceny<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 22 — pokaż źródło" data-refs="22" data-fn="214">22<span class="fc" role="note"><b>22.</b> Marketing General Incorporated, „2025 Membership Marketing Benchmarking Report”, 2025 r. - mediana odnowień 84%, organizacje branżowe 85-89%, retencja pierwszoroczna 74-75%, 52% nieodnowień z powodu braku zaangażowania; dane dotyczą rynku amerykańskiego. <em>M2</em></span></sup>.</td></tr>
                <tr><td>Sieć kontaktów w CEE poza Polską</td><td>Kontakty zagraniczne w NES i obsługa rynków eksportowych; brak sieci sprzedażowej w Czechach, Rumunii i na Węgrach</td><td>Nie ma sensu tego udawać. Zamiast tego: konkretna ścieżka budowy sieci w oparciu o zasoby, które izba już posiada - Board of Advisors z byłymi decydentami z czterech krajów<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="215">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>, koalicja trzynastu organizacji z Open Letter<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 17 — pokaż źródło" data-refs="17" data-fn="216">17<span class="fc" role="note"><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></sup> oraz szczyt w Pradze jako punkt wejścia na rynek czeski<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="217">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>.</td></tr>
                <tr><td>Praca z celem prowizyjnym</td><td>Dotychczasowe wynagrodzenie nie było powiązane z wynikiem sprzedażowym</td><td>Prowadzenie własnej fundacji oznacza, że rezultat finansowy zależał bezpośrednio od pozyskanych partnerów i klientów. To bliżej modelu prowizyjnego niż typowa rola etatowa.</td></tr>
                <tr><td>Profil postrzegany jako marketingowy</td><td>Ostatnie stanowiska nazwane marketingowo (digital marketing, PR)</td><td>W organizacji o dwunastoosobowym zespole podział na marketing i sprzedaż jest umowny. Oferta wprost wymaga współpracy nad kampaniami i strategiami zaangażowania<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="218">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup> - kompetencje marketingowe są tu wartością dodaną, bo pozwalają samodzielnie zasilać własny pipeline, a nie czekać na leady z zewnątrz.</td></tr>
              </tbody>
            </table>
          </div>
          <p class="note" style="margin-top:14px">Uwaga taktyczna: przy sześciu lukach nie należy adresować wszystkich naraz. Na rozmowie warto przygotować odpowiedzi na trzy najprawdopodobniejsze (staż w BD, brak doświadczenia w sprzedaży członkostwa, brak sieci w regionie) i pozostałe trzymać w rezerwie.</p>
        ` },
        { id: 'ft-3', label: "Success stories", html: `
          <p class="axis-intro">Osiem historii sukcesu<sup class="fn" tabindex="0" role="button" aria-label="Przypis 34 — pokaż źródło" data-refs="34" data-fn="219">34<span class="fc" role="note"><b>34.</b> Igor Miasnikow, CV oraz portfolio projektów - dane własne kandydata, 2026 r. <em>M1</em></span></sup> w układzie punktowym (sytuacja, działanie, efekt, dopasowanie), każda przypisana do konkretnego zapisu z ogłoszenia<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="220">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup>. Format przygotowany do wykorzystania w odpowiedzi na pytanie behawioralne.</p>
          <div class="card">
            <h4>Pozyskanie 14 partnerów i sponsorów kongresu (EFC) <span class="pill cyan">akwizycja partnerów</span></h4>
            <ul class="matters">
              <li>Sytuacja: European Financial Congress potrzebował sponsorów oraz partnerów medialnych i honorowych dla edycji kongresu, przy ograniczonym rozpoznaniu wśród części potencjalnych podmiotów.</li>
              <li>Działanie: identyfikacja podmiotów o dopasowanym profilu, samodzielne inicjowanie kontaktu, prowadzenie rozmów o zakresie współpracy i domykanie porozumień; równolegle budowa infrastruktury do obsługi tych relacji przez wdrożenie CRM.</li>
              <li>Efekt: 14 pozyskanych partnerów w jednym cyklu kongresowym, obejmujących sponsorów oraz partnerów medialnych i honorowych.</li>
              <li>Dopasowanie: rozwijanie bazy partnerskiej przez proaktywny outreach, prowadzenie pełnego cyklu zaangażowania, prezentowanie oferty i komunikowanie wartości.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Budowa sieci 100+ interesariuszy (NES) <span class="pill cyan">stakeholder engagement</span></h4>
            <ul class="matters">
              <li>Sytuacja: nowa fundacja bez rozpoznania, bez zaplecza eksperckiego i bez dorobku, potrzebująca wiarygodności, którą można zbudować wyłącznie ludźmi.</li>
              <li>Działanie: systematyczne pozyskiwanie osób do Rady Fundacji, rad programowych poszczególnych specjalizacji oraz grona analityków i ekspertów zagranicznych - w praktyce sprzedaż udziału w projekcie ludziom, którzy mieli już własną pozycję zawodową.</li>
              <li>Efekt: ponad 100 osób współpracujących, utrzymywanych w relacji w trybie ciągłym, oraz działający system organizacji pracy fundacji.</li>
              <li>Dopasowanie: budowanie i utrzymywanie relacji z interesariuszami, prowadzenie pełnego cyklu od identyfikacji do przystąpienia, działania retencyjne.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>25 partnerów konferencji „Geopolityczna Gra Mocarstw” <span class="pill cyan">wydarzenia jako lejek</span></h4>
            <ul class="matters">
              <li>Sytuacja: budowa cyklicznej marki konferencyjnej od zera, bez historii i bez bazy partnerów.</li>
              <li>Działanie: koncepcja i pozycjonowanie wydarzenia, strategia marketingowa i PR, kampanie digitalowe, koordynacja prelegentów i partnerów, organizacja formatu stacjonarnego i online.</li>
              <li>Efekt: 25 partnerów, trzy edycje stacjonarne z ponad 900 uczestnikami i 20 prelekcjami oraz edycja online z ponad 75 000 wyświetleń, 48 prelekcjami i 12 debatami; łączny zasięg 1,9 mln.</li>
              <li>Dopasowanie: wspieranie lead generation i networkingu podczas wydarzeń, współpraca nad inicjatywami wzrostowymi i kampaniami.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Konstrukcja i wycena oferty świadczeń (NES) <span class="pill cyan">komunikowanie wartości</span></h4>
            <ul class="matters">
              <li>Sytuacja: fundacja bez zdefiniowanego produktu, potrzebująca oferty, którą można przedstawić partnerowi i za którą można pobrać wynagrodzenie.</li>
              <li>Działanie: opracowanie katalogu świadczeń wraz z wyceną, wpisanego w kompleksowy biznesplan i strategię realizacji; zdefiniowanie, za co konkretnie płaci partner.</li>
              <li>Efekt: gotowa, wyceniona oferta stanowiąca podstawę rozmów z partnerami instytucjonalnymi.</li>
              <li>Dopasowanie: prezentowanie oferty członkowskiej i partnerskiej oraz jasne komunikowanie jej wartości - z tą różnicą, że kandydat tworzył taką ofertę, a nie tylko ją przedstawiał.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Sekwencje lead nurturing dla eksportu (Elektronika S.A.) <span class="pill cyan">pipeline</span></h4>
            <ul class="matters">
              <li>Sytuacja: dział eksportu bez ustrukturyzowanego procesu pozyskiwania kontaktów na rynkach zagranicznych.</li>
              <li>Działanie: zaprojektowanie i prowadzenie sekwencji lead nurturing w LinkedIn Sales Navigator, treść wspierająca proces oraz szkolenia wewnętrzne z social sellingu i employee advocacy dla działów eksportu i marketingu.</li>
              <li>Efekt: uporządkowany lejek dla eksportu i wzrost obserwujących na LinkedIn o 145% w rok.</li>
              <li>Dopasowanie: zdolność do samodzielnej pracy i zarządzania własnym pipeline'em, proaktywny outreach, identyfikacja prospektów.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Wdrożenie CRM i marketing automation (EFC) <span class="pill cyan">CRM i raportowanie</span></h4>
            <ul class="matters">
              <li>Sytuacja: obsługa partnerów, prelegentów i mediów prowadzona bez jednego systemu, z rozproszoną informacją o statusie kontaktów.</li>
              <li>Działanie: wdrożenie CRM oraz systemu marketing automation, uporządkowanie danych o kontaktach i automatyzacja komunikacji z bazą.</li>
              <li>Efekt: działający system rejestrowania i raportowania relacji, wykorzystywany następnie w pracy z partnerami i newsletterami.</li>
              <li>Dopasowanie: utrzymywanie danych w CRM i raportowanie wszystkich działań outreachowych - obowiązek wskazany wprost w ofercie.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Kampania wejścia na rynek rumuński (Thale / Niczuk) <span class="pill cyan">rynki CEE</span></h4>
            <ul class="matters">
              <li>Sytuacja: wejście marki na nowy rynek zagraniczny w regionie CEE przy minimalnym budżecie.</li>
              <li>Działanie: precyzyjnie targetowana kampania z bieżącą optymalizacją grup odbiorców i kreacji; równolegle praca nad strategią komunikacji sprzedażowej dla czterech rynków (Rumunia, Węgry, Litwa, Grecja).</li>
              <li>Efekt: 267 tys. odbiorców w 13 dni przy koszcie 950 PLN.</li>
              <li>Dopasowanie: praca w organizacji działającej w regionie CEE, generowanie zainteresowania na rynkach, na których marka nie była rozpoznawalna.</li>
            </ul>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Utrzymanie i rozwój bazy kontaktów (Thale / Niczuk) <span class="pill cyan">retencja</span></h4>
            <ul class="matters">
              <li>Sytuacja: rozproszona, prowadzona ręcznie komunikacja z bazą kontaktów, bez segmentacji i bez regularnego rytmu.</li>
              <li>Działanie: wdrożenie automatyzacji wysyłek, segmentacji bazy oraz regularnego cyklu komunikacji dającego powtarzalny powód kontaktu.</li>
              <li>Efekt: wzrost bazy subskrybentów o 43% rok do roku oraz uporządkowany proces podtrzymywania zaangażowania.</li>
              <li>Dopasowanie: wdrażanie działań retencyjnych wzmacniających relacje długoterminowe - w organizacji członkowskiej to mechanizm bezpośrednio przekładający się na wskaźnik odnowień.</li>
            </ul>
          </div>
        ` },
      ],
    },
  ],
};
