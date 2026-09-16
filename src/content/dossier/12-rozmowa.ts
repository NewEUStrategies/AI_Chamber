import type { DossierPage } from './types';

export const pageRozmowa: DossierPage = {
  id: 'rozmowa',
  num: '12',
  navLabel: "Pytania na rozmowę",
  group: "Przygotowanie",
  eyebrow: "12 · Przygotowanie",
  title: `Pytania na rozmowę`,
  lead: `Dwa zestawy: pytania, które warto zadać pracodawcy (z uzasadnieniem, czego szukać w odpowiedzi), oraz pytania, których można się spodziewać - w tym krytyczne - z propozycją krótkich odpowiedzi. W tej rekrutacji pytania kandydata mają szczególne znaczenie, bo cztery kluczowe parametry roli (cennik, cel, pipeline, prowizja) nie są jawne<sup class="fn" tabindex="0" role="button" aria-label="Przypis 10, 11, 19 — pokaż źródło" data-refs="10,11,19" data-fn="221">10,11,19<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em><br><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em><br><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup>.`,
  blocks: [
    {
      kind: 'tabs',
      group: 'rz',
      tabs: [
        { id: 'rz-1', label: "Pytania, które zadam", html: `
          <p class="axis-intro">Trzydzieści dwa pytania w ośmiu grupach. Każde z krótkim uzasadnieniem po myślniku - wskazuje, czego słuchać w odpowiedzi. Pytania z grup „Cele i mierniki” oraz „Produkt i cennik” są najważniejsze: bez nich nie da się ocenić ani realności celów, ani wartości prowizji.</p>
          <div class="card">
            <div class="matters-title">Rola i oczekiwania</div>
            <ul class="matters">
              <li>Czy stanowisko jest nowe, czy zastępuje kogoś, i co chcecie robić inaczej niż dotychczas? - kluczowe: decyduje, czy przejmuję gotowy pipeline, czy buduję od zera.</li>
              <li>Jak rozkłada się oczekiwany czas pracy między akwizycję członków MŚP a partnerstwa korporacyjne? - dwa różne procesy sprzedaży o różnej długości cyklu.</li>
              <li>Komu stanowisko raportuje i kto podejmuje decyzje o warunkach współpracy? - ścieżka decyzyjna przy domykaniu rozmów.</li>
              <li>Co zostanie uznane za sukces po trzech, sześciu i dwunastu miesiącach? - kryteria oceny wyrażone konkretnie.</li>
            </ul>
            <div class="matters-title">Cele i mierniki</div>
            <ul class="matters">
              <li>Ilu nowych członków przystąpiło do izby w ostatnich dwunastu miesiącach? - punkt wyjścia i realność celu.</li>
              <li>Jaki jest obecny wskaźnik odnowień i czy mierzycie go osobno dla pierwszego roku członkostwa? - w organizacjach członkowskich retencja pierwszoroczna jest zwykle najsłabszym ogniwem.</li>
              <li>Jaki jest cel na najbliższy rok - liczba członków, wartość składek czy liczba partnerstw korporacyjnych? - determinuje, czy priorytetem jest liczba, czy wartość.</li>
              <li>Czy cele są przypisane do rynków, do sektorów, czy nie są rozbite? - wpływa na sposób budowy pipeline'u.</li>
              <li>Jaka jest średnia długość cyklu od pierwszego kontaktu do przystąpienia? - pozwala policzyć, ile rozmów trzeba rozpocząć.</li>
            </ul>
            <div class="matters-title">Produkt, cennik i decyzyjność</div>
            <ul class="matters">
              <li>Jakie są poziomy składek dla pakietów BASIC, PRO i PREMIUM? - pytanie zadawane wprost, bo cennik nie jest publiczny<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="222">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup>.</li>
              <li>Czy istnieje przestrzeń negocjacyjna i kto zatwierdza odstępstwo od stawki? - zakres samodzielności w domykaniu rozmów.</li>
              <li>Jak wyceniane są partnerstwa korporacyjne - istnieje karta pakietów czy każda umowa jest budowana od nowa? - powtarzalność procesu.</li>
              <li>Dlaczego cennik nie jest publiczny - czy to decyzja strategiczna, czy stan przejściowy? - odpowiedź powie, czy jest mandat na uporządkowanie tego obszaru.</li>
              <li>Czy jest przestrzeń na projektowanie nowych formatów członkostwa, na przykład dla funduszy VC lub uczelni? - dziś te segmenty są niemal nieobecne w bazie.</li>
            </ul>
            <div class="matters-title">Pipeline, proces i narzędzia</div>
            <ul class="matters">
              <li>Jaki CRM jest w użyciu i jaki jest stan danych w bazie kontaktów? - punkt startowy pracy operacyjnej.</li>
              <li>Skąd pochodzą dziś leady - z wydarzeń, sieci obu rad, inbound czy outbound? - wskazuje najskuteczniejszy kanał do skalowania.</li>
              <li>Jakie są najczęstsze powody odmowy przystąpienia do izby? - lista obiekcji do przygotowania.</li>
              <li>Czy istnieje proces onboardingu nowego członka po podpisaniu deklaracji? - jeśli nie, to najtańsze źródło wzrostu netto.</li>
              <li>Czy jest zdefiniowany proces przekazywania kontaktu z wydarzenia do pipeline'u? - dziś wydarzenia są mocnym aktywem izby.</li>
            </ul>
            <div class="matters-title">Zespół i współpraca</div>
            <ul class="matters">
              <li>Kto obecnie zajmuje się członkostwem i partnerstwami i jak zostanie podzielona odpowiedzialność? - unikanie nakładania się zakresów.</li>
              <li>Jak wygląda współpraca z Public Policy Director - czy zespół policy dostarcza argumenty sprzedażowe? - advocacy jest głównym argumentem przy MŚP.</li>
              <li>W jaki sposób wykorzystujecie Board of Advisors i Board of Directors w akwizycji? - te rady są najmocniejszym aktywem, warto wiedzieć, czy są używane.</li>
              <li>Jak zespół pracuje w modelu rozproszonym i jak wygląda rytm spotkań? - dopasowanie do pracy zdalnej.</li>
            </ul>
            <div class="matters-title">Wydarzenia i region</div>
            <ul class="matters">
              <li>Jaką rolę w pozyskiwaniu partnerów odgrywa CEE AI Summit 2026 w Pradze i czy są wobec niego cele sprzedażowe?<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="223">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup> - najbliższy duży termin po zatrudnieniu.</li>
              <li>Które rynki CEE są priorytetem na najbliższy rok? - dziś sześć z dziewięciu krajów ma reprezentację symboliczną<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="224">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>.</li>
              <li>Czy planujecie lokalnych przedstawicieli lub oddziały w krajach regionu? - determinuje, czy ekspansja jest zdalna, czy wspierana lokalnie.</li>
              <li>Czy jest budżet na podróże i udział w wydarzeniach zagranicznych? - realne możliwości networkingu wskazanego w ofercie.</li>
              <li>Jak izba pozycjonuje się wobec organizacji krajowych w innych państwach regionu? - kwestia konkurencji o tych samych członków.</li>
            </ul>
            <div class="matters-title">Wynagrodzenie i warunki</div>
            <ul class="matters">
              <li>Jak skonstruowana jest prowizja - od czego jest liczona, kiedy wypłacana i czy obejmuje odnowienia? - bez tego nie da się ocenić realnej wartości oferty.</li>
              <li>Jakie są proporcje wynagrodzenia zasadniczego do części prowizyjnej?<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="225">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup> - punkt odniesienia: przy długim cyklu rynek plasuje ten podział bliżej 70/30<sup class="fn" tabindex="0" role="button" aria-label="Przypis 29, 30 — pokaż źródło" data-refs="29,30" data-fn="226">29,30<span class="fc" role="note"><b>29.</b> Hays Poland, „Salary Guide 2026”, 2026 r. - 80% firm podniosło wynagrodzenia, w większości o 2,5-5%. <em>M2</em><br><b>30.</b> Antal, raport płacowy, 2025/2026 - średnia dla stanowisk specjalistycznych i menedżerskich około 15 700 zł brutto; kategoria szeroka, nieodnosząca się do tej konkretnej roli. <em>M2</em></span></sup>.</li>
              <li>Czy przy modelu części etatu proporcje ulegają zmianie? - przy part-time właściwe jest podniesienie stawki prowizyjnej, nie bazy.</li>
              <li>Jaka jest forma współpracy - umowa o pracę, zlecenie czy kontrakt B2B? - determinuje przeliczenie kwoty netto.</li>
              <li>Czy wynagrodzenie jest rozliczane w złotych czy w euro? - istotne przy organizacji działającej regionalnie.</li>
            </ul>
            <div class="matters-title">Dalsze kroki</div>
            <ul class="matters">
              <li>Jak wygląda dalszy proces rekrutacji i jego harmonogram? - przewidywalność decyzji.</li>
              <li>Czy przewidziane jest zadanie próbne, a jeśli tak, jaki ma zakres? - okazja do pokazania planu z zakładki 14.</li>
              <li>Czy w moim profilu widzą Państwo obszar wymagający uzupełnienia? - szansa na rozwianie wątpliwości od razu, zamiast po rozmowie.</li>
            </ul>
          </div>
        ` },
        { id: 'rz-2', label: "Pytania do mnie (+ odpowiedzi)", html: `
          <p class="axis-intro">Pytania, których można się spodziewać, w tym krytyczne (oznaczone). Odpowiedzi w punktach, gotowe do wykorzystania; pozycje oznaczone jako „do uzupełnienia” wymagają dobrania własnego przykładu lub liczby.</p>
          <div class="card">
            <div class="matters-title">Pytania standardowe</div>
            <h4 style="font-size:13px;margin-top:8px">Dlaczego chce Pan pracować w AI Chamber?</h4>
            <ul class="matters">
              <li>To rzadkie połączenie: organizacja komercyjna, w której produktem jest wpływ na regulacje i dostęp do decydentów, a jednocześnie temat, którym zajmuję się zawodowo poza pracą.</li>
              <li>Prowadzę think tank zajmujący się geopolityką i technologią, więc AI Act, polityka cyfrowa Unii i pozycja CEE to nie są dla mnie hasła z ogłoszenia.</li>
              <li>Izba jest w fazie, w której pracuję najlepiej: około 90 członków, brak ustandaryzowanego procesu sprzedaży i wyraźny zapas wzrostu wobec odpowiedników z Niemiec i Francji.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Co Pan wie o naszej organizacji?</h4>
            <ul class="matters">
              <li>Izba gospodarcza z Warszawy, wpisana do KRS w sierpniu 2024<sup class="fn" tabindex="0" role="button" aria-label="Przypis 1 — pokaż źródło" data-refs="1" data-fn="227">1<span class="fc" role="note"><b>1.</b> Krajowy Rejestr Sądowy, wpis podmiotu AI Chamber, KRS 0001108700, NIP 7011219059, REGON 529432945, rejestracja 21 sierpnia 2024 r.; odczyt za pośrednictwem rejestr.io, sierpień 2026. <em>M1</em></span></sup> po publicznej inauguracji w kwietniu tego samego roku<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 26 — pokaż źródło" data-refs="26" data-fn="228">26<span class="fc" role="note"><b>26.</b> Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em></span></sup>; około 90 firm członkowskich z dziewięciu krajów regionu<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="229">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>.</li>
              <li>Członkostwo zarezerwowane dla MŚP w trzech pakietach<sup class="fn" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="230">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup>, duże firmy obsługiwane osobną ścieżką Corporate Partnerships na warunkach indywidualnych<sup class="fn" tabindex="0" role="button" aria-label="Przypis 11 — pokaż źródło" data-refs="11" data-fn="231">11<span class="fc" role="note"><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em></span></sup>.</li>
              <li>Dorobek: raport o adopcji AI w MŚP na próbie ponad 3 200 pracowników z 11 krajów<sup class="fn" tabindex="0" role="button" aria-label="Przypis 14 — pokaż źródło" data-refs="14" data-fn="232">14<span class="fc" role="note"><b>14.</b> AI Chamber, „How do SMEs in CEE find their way in the world of AI?”, raport z badania ponad 3 200 pracowników z 11 krajów, lipiec 2025 r. <em>M1</em></span></sup>, CEE AI Action Plan w pięciu filarach<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 13 — pokaż źródło" data-refs="13" data-fn="233">13<span class="fc" role="note"><b>13.</b> AI Chamber, „CEE AI Action Plan”, dokument programowy zaprezentowany w Gdańsku podczas prezydencji Polski w Radzie Unii Europejskiej, 2025 r. - pięć filarów oraz dane o adopcji AI w regionie na poziomie 4-6%. <em>M1</em></span></sup>, Open Letter w sprawie Digital Omnibus z dwunastoma innymi organizacjami<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 17 — pokaż źródło" data-refs="17" data-fn="234">17<span class="fc" role="note"><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></sup>, konsultacje w Ministerstwie Cyfryzacji i w Komisji Europejskiej<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="235">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup>.</li>
              <li>Board of Advisors z byłymi ministrami i wiceministrami z Bułgarii, Litwy, Czech i Słowenii<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="236">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>; w bazie członkowskiej ElevenLabs i ICEYE<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="237">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>.</li>
              <li>Najbliższy duży termin: CEE AI Summit 3 września 2026 w Pradze, pod auspicjami czeskiego Ministerstwa Przemysłu i Handlu<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="238">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Jak zbudowałby Pan pipeline od zera?</h4>
            <ul class="matters">
              <li>Zaczynam od tego, co już działa: analiza obecnej bazy pod kątem tego, skąd przyszli dotychczasowi członkowie i które segmenty konwertują najszybciej.</li>
              <li>Następnie segmentacja rynku docelowego według dwóch osi: presji regulacyjnej (MedTech, FinTech, sektor publiczny) i rynku geograficznego, z priorytetem na Czechy przed szczytem w Pradze.</li>
              <li>Źródła kontaktów: sieć obu rad izby, uczestnicy wydarzeń, listy członków organizacji partnerskich z koalicji Digital Omnibus, bazy firm AI w regionie; narzędziowo Sales Navigator, Crunchbase, GetProspect.</li>
              <li>Rytm pracy: tygodniowy cel liczby nowych rozmów, cotygodniowy przegląd pipeline'u w CRM, miesięczny raport konwersji po etapach.</li>
              <li>Zasada: wchodzę z danymi o rynku rozmówcy z raportu izby, nie z prezentacją o izbie.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Jak sprzedałby Pan członkostwo firmie, która mówi, że nie ma na to czasu ani budżetu?</h4>
            <ul class="matters">
              <li>Nie zaczynam od obrony ceny, tylko od pytania o konkretny problem regulacyjny - większość firm AI w regionie ma dziś realny kłopot z ustaleniem, które obowiązki AI Act ich dotyczą i od kiedy.</li>
              <li>Pokazuję asymetrię: firma o pięciu czy dwudziestu pracownikach nie wpłynie samodzielnie na kształt regulacji unijnej, a koalicja trzynastu organizacji z regionu już to robiła<sup class="fn" tabindex="0" role="button" aria-label="Przypis 17 — pokaż źródło" data-refs="17" data-fn="239">17<span class="fc" role="note"><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></sup>.</li>
              <li>Przekładam składkę na alternatywę: koszt jednej opinii prawnej dotyczącej klasyfikacji systemu wysokiego ryzyka wobec rocznego dostępu do aktualizacji, webinarów i grup roboczych.</li>
              <li>Jeśli budżet naprawdę nie istnieje, proponuję niższy pakiet i termin powrotu do rozmowy, zamiast tracić kontakt - w produkcie subskrypcyjnym „nie teraz” jest innym wynikiem niż „nie”.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Jak mierzy Pan skuteczność działań w tej roli?</h4>
            <ul class="matters">
              <li>Wskaźniki wyniku: liczba nowych członków w podziale na pakiety, liczba i wartość umów partnerstwa korporacyjnego, wartość nowych składek.</li>
              <li>Wskaźniki procesu: liczba rozpoczętych rozmów, konwersja między etapami lejka, długość cyklu sprzedaży, liczba spotkań z prospektami.</li>
              <li>Retencja: wskaźnik odnowień ogólny oraz osobno dla pierwszego roku członkostwa - w organizacjach członkowskich mediana retencji sięga 84%, ale w pierwszym roku spada do 74-75%<sup class="fn" tabindex="0" role="button" aria-label="Przypis 22 — pokaż źródło" data-refs="22" data-fn="240">22<span class="fc" role="note"><b>22.</b> Marketing General Incorporated, „2025 Membership Marketing Benchmarking Report”, 2025 r. - mediana odnowień 84%, organizacje branżowe 85-89%, retencja pierwszoroczna 74-75%, 52% nieodnowień z powodu braku zaangażowania; dane dotyczą rynku amerykańskiego. <em>M2</em></span></sup>, więc te dwie liczby trzeba śledzić rozdzielnie.</li>
              <li>Zaangażowanie jako wskaźnik wyprzedzający odejście: udział członków w webinarach, wydarzeniach i grupach roboczych; skoro 52% nieodnowień wynika z braku zaangażowania<sup class="fn" tabindex="0" role="button" aria-label="Przypis 22 — pokaż źródło" data-refs="22" data-fn="241">22<span class="fc" role="note"><b>22.</b> Marketing General Incorporated, „2025 Membership Marketing Benchmarking Report”, 2025 r. - mediana odnowień 84%, organizacje branżowe 85-89%, retencja pierwszoroczna 74-75%, 52% nieodnowień z powodu braku zaangażowania; dane dotyczą rynku amerykańskiego. <em>M2</em></span></sup>, spadek aktywności jest sygnałem ostrzegawczym wcześniejszym niż sama decyzja o rezygnacji.</li>
              <li>Wydarzenia: liczba kontaktów pozyskanych na wydarzeniu i konwersja kontakt - rozmowa - członek, mierzona osobno dla każdego wydarzenia.</li>
              <li>Wszystko prowadzone w CRM z jednym standardem etapów, żeby raport pokazywał stan pipeline'u, a nie samą aktywność.</li>
            </ul>
            <p class="note" style="margin:2px 0 0">Wartości benchmarkowe pochodzą z raportu dotyczącego organizacji członkowskich i opisują rynek amerykański - na rozmowie warto podać je jako punkt odniesienia, nie jako cel dla izby.</p>
            <h4 style="font-size:13px;margin-top:14px">Jak wyglądałby Pana plan na pierwsze 90 dni?</h4>
            <ul class="matters">
              <li>Pierwsze trzydzieści dni: audyt bazy i CRM, rozmowy z dwudziestoma obecnymi członkami o tym, za co realnie płacą, ustalenie poziomów cenowych i procesu decyzyjnego.</li>
              <li>Dni 30-60: uruchomienie ustandaryzowanego procesu outreachu na dwóch segmentach priorytetowych, przygotowanie materiału sprzedażowego opartego na danych z raportu izby, plan obecności partnerskiej na szczycie w Pradze.</li>
              <li>Dni 60-90: pierwsze domknięcia, wdrożenie procesu onboardingu nowego członka i przygotowanie kampanii retencyjnej pod termin wypowiedzenia 31 grudnia<sup class="fn" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="242">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup>.</li>
              <li>Pełna wersja planu z podziałem na pięć obszarów znajduje się w zakładce 14.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Jak radzi sobie Pan z odmową i brakiem odpowiedzi?</h4>
            <ul class="matters">
              <li>Traktuję odmowę jako informację o dopasowaniu i momencie, nie o sobie - przy pozyskiwaniu partnerów kongresu większość pierwszych kontaktów nie kończyła się porozumieniem.</li>
              <li>Rozdzielam „nie” od „nie teraz” i dla drugiej kategorii ustalam konkretny termin powrotu, zapisany w CRM.</li>
              <li>Pracuję na wolumenie i rytmie, nie na pojedynczych rozmowach - to jedyny sposób, by wynik nie zależał od nastroju.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Jak pracuje Pan z CRM?</h4>
            <ul class="matters">
              <li>Praktyka w HubSpot i Pipedrive; w EFC wdrażałem CRM od zera wraz z marketing automation.</li>
              <li>Zasada: CRM ma odwzorowywać realny proces, a nie odwrotnie - dlatego zaczynam od zdefiniowania etapów lejka, a potem ustawiam narzędzie.</li>
              <li>Buduję trackery i raporty, żeby dane w CRM służyły do decyzji o priorytetach, nie tylko do sprawozdawczości.</li>
              <li>Projektując własną platformę Merydian z modułem CRM, przeszedłem tę logikę od strony konstrukcji systemu.</li>
            </ul>
            <div class="matters-title" style="margin-top:8px">Pytania krytyczne</div>
            <h4 style="font-size:13px;margin-top:8px">Nie ma Pan doświadczenia w sprzedaży, a szukamy osoby z pięcioletnim stażem w business development. <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Nie miałem stanowiska nazwanego sprzedażą, natomiast od 2021 roku wykonuję czynności, które opisuje Państwa ogłoszenie: identyfikuję podmioty, inicjuję kontakt, prowadzę rozmowy o zakresie współpracy i domykam porozumienia.</li>
              <li>Efekty są policzalne: 14 partnerów i sponsorów kongresu EFC, 25 partnerów trzech edycji własnej konferencji, ponad 100 osób pozyskanych do rad i grona eksperckiego fundacji.</li>
              <li>Wolę być oceniany po tych liczbach niż po nazwie stanowiska - w tej roli i tak rozlicza się wynik, nie tytuł z poprzedniej pracy.</li>
              <li>Jeśli formalny staż w BD jest warunkiem twardym, chcę to wiedzieć teraz, żeby nie tracić Państwa czasu.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Nigdy nie sprzedawał Pan członkostwa w izbie - skąd przekonanie, że to się uda? <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Znam ten produkt z drugiej strony stołu: sam projektowałem i wyceniałem ofertę świadczeń własnej fundacji, więc wiem, za co organizacja członkowska realnie pobiera opłatę.</li>
              <li>Rozumiem też jego specyfikę: odnowienie jest automatyczne, jeśli nie ma wypowiedzenia do 31 grudnia, co czyni czwarty kwartał najważniejszym momentem roku dla retencji.</li>
              <li>Wiem, gdzie ten model najczęściej zawodzi - w organizacjach członkowskich retencja pierwszoroczna spada do 74-75%, a ponad połowa nieodnowień wynika z braku zaangażowania, nie z ceny<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 22 — pokaż źródło" data-refs="22" data-fn="243">22<span class="fc" role="note"><b>22.</b> Marketing General Incorporated, „2025 Membership Marketing Benchmarking Report”, 2025 r. - mediana odnowień 84%, organizacje branżowe 85-89%, retencja pierwszoroczna 74-75%, 52% nieodnowień z powodu braku zaangażowania; dane dotyczą rynku amerykańskiego. <em>M2</em></span></sup>. To znaczy, że sprzedaż bez onboardingu jest sprzedażą jednorazową.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Nie ma Pan sieci kontaktów w Czechach, Rumunii ani na Węgrach. <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Nie mam i nie będę tego udawać. Mam natomiast doświadczenie wchodzenia na rynki, na których marka nie była rozpoznawalna - w Niczuku pracowałem nad komunikacją sprzedażową dla Rumunii, Węgier, Litwy i Grecji.</li>
              <li>Izba ma aktywa, których ja nie mam, a które można wykorzystać systematycznie: Board of Advisors z byłymi decydentami z czterech krajów regionu<sup class="fn" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="244">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>, koalicję trzynastu organizacji z Open Letter<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 17 — pokaż źródło" data-refs="17" data-fn="245">17<span class="fc" role="note"><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></sup> oraz szczyt w Pradze jako naturalne wejście na rynek czeski<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="246">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>.</li>
              <li>Moja propozycja to nie obietnica gotowej sieci, ale metoda jej budowy - i pierwszym testem tej metody byłby wrzesień w Pradze.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Pana profil wygląda marketingowo - czy nie szuka Pan tak naprawdę roli marketingowej? <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Nazwy moich stanowisk były marketingowe, ale najbardziej satysfakcjonujące rezultaty pochodzą z pozyskiwania ludzi i organizacji, nie z prowadzenia kampanii.</li>
              <li>W zespole kilkunastoosobowym<sup class="fn" tabindex="0" role="button" aria-label="Przypis 33 — pokaż źródło" data-refs="33" data-fn="247">33<span class="fc" role="note"><b>33.</b> RocketReach, szacunkowa wielkość zespołu AI Chamber (około 12 osób) oraz część nazwisk niepotwierdzonych na stronie „Meet The Team”; dostęp: sierpień 2026. <em>M4</em></span></sup> ten podział i tak jest umowny - Państwa ogłoszenie wprost wymaga współpracy nad kampaniami i strategiami zaangażowania<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="248">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup>.</li>
              <li>Kompetencje marketingowe są tu przewagą operacyjną: potrafię sam zasilać własny pipeline, zamiast czekać na leady z zewnątrz.</li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Prowadzi Pan własną fundację i pracuje w innej firmie - czy to nie konflikt czasowy? <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Fundację prowadzę w trybie zarządczym, opierając się na zespole i delegowaniu zadań operacyjnych.</li>
              <li>Nie ma konfliktu przedmiotowego: NES zajmuje się analizą geopolityczną, nie reprezentowaniem interesów firm technologicznych - warto to jednak przedyskutować wprost, bo obie organizacje działają w obszarze polityki publicznej.</li>
              <li>Model części etatu wskazany w ofercie jest z mojej perspektywy zaletą, a nie problemem, i jestem gotów rozmawiać o obu wariantach.</li>
              <li><span class="pill cyan">do uzupełnienia realną dostępnością godzinową i decyzją co do obecnej pracy</span></li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Jakie są Pana oczekiwania finansowe? <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Zanim podam liczbę, potrzebuję dwóch informacji: poziomów składek i cen partnerstw oraz celu na pierwszy rok. Bez nich nie da się ocenić, ile realnie warta jest część prowizyjna.</li>
              <li>Co do konstrukcji: przy produkcie o długim cyklu sprzedaży i bez ustandaryzowanego procesu rynek plasuje podział bazy do prowizji bliżej 70/30, z przesunięciem w stronę 60/40 po ustabilizowaniu procesu<sup class="fn" tabindex="0" role="button" aria-label="Przypis 29, 30 — pokaż źródło" data-refs="29,30" data-fn="249">29,30<span class="fc" role="note"><b>29.</b> Hays Poland, „Salary Guide 2026”, 2026 r. - 80% firm podniosło wynagrodzenia, w większości o 2,5-5%. <em>M2</em><br><b>30.</b> Antal, raport płacowy, 2025/2026 - średnia dla stanowisk specjalistycznych i menedżerskich około 15 700 zł brutto; kategoria szeroka, nieodnosząca się do tej konkretnej roli. <em>M2</em></span></sup>.</li>
              <li>Przy modelu części etatu proponuję proporcjonalną bazę, ale wyższą stawkę prowizyjną - płacą Państwo wtedy za wynik, nie za dostępność.</li>
              <li><span class="pill cyan">do uzupełnienia własną kwotą po ustaleniu formy współpracy i poziomów cenowych</span></li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Proszę podać przykład relacji lub rozmowy, która się nie udała, i wyciągnięty wniosek. <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Wskazać realny przypadek partnera lub prospektu, który nie wszedł we współpracę albo z niej wypadł.</li>
              <li>Nazwać przyczynę po swojej stronie (na przykład zbyt wczesne przejście do rozmowy o warunkach, niedopasowana propozycja wartości, brak follow-upu w odpowiednim momencie) bez zrzucania winy na okoliczności.</li>
              <li>Pokazać zmianę procesu, która z tego wynikła - na przykład wprowadzenie zapisu terminu powrotu do rozmowy w CRM albo kwalifikacji przed prezentacją oferty.</li>
              <li><span class="pill cyan">do uzupełnienia realnym przykładem</span></li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Dlaczego chce Pan odejść z obecnej roli? <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Chcę pracować tam, gdzie mój wynik jest mierzony liczbą pozyskanych organizacji, a nie zasięgiem publikacji.</li>
              <li>Szukam tematu, który pokrywa się z tym, czym zajmuję się poza pracą - AI, technologia i polityka publiczna to obszar mojej fundacji.</li>
              <li><span class="pill cyan">do uzupełnienia osobistym motywem, bez krytyki obecnego pracodawcy</span></li>
            </ul>
            <h4 style="font-size:13px;margin-top:14px">Dlaczego mielibyśmy wybrać Pana zamiast kandydata z dziesięcioletnim stażem w sprzedaży B2B? <span class="pill warn">krytyczne</span></h4>
            <ul class="matters">
              <li>Handlowiec z dziesięcioletnim stażem sprzeda produkt, którego mechanikę mu Państwo opiszą. Ja rozumiem ten produkt, bo sam budowałem organizację żyjącą z partnerstw i utrzymywania relacji z setką interesariuszy.</li>
              <li>Rozumiem też, co Państwo sprzedają: AI Act<sup class="fn" tabindex="0" role="button" aria-label="Przypis 3 — pokaż źródło" data-refs="3" data-fn="250">3<span class="fc" role="note"><b>3.</b> Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2024/1689 z dnia 13 czerwca 2024 r. ustanawiające zharmonizowane przepisy dotyczące sztucznej inteligencji (akt w sprawie sztucznej inteligencji), Dziennik Urzędowy Unii Europejskiej, seria L, 2024/1689. <em>M1</em></span></sup>, polityka cyfrowa Unii i pozycja CEE to obszar, który śledzę zawodowo i o którym potrafię rozmawiać z klientem na jego poziomie merytorycznym, a nie tylko na poziomie oferty.</li>
              <li>Wnoszę dodatkowo warsztat analityczny i marketingowy - potrafię sam zbudować materiał sprzedażowy i policzyć, co w pipeline'ie działa.</li>
              <li>Jeśli szukają Państwo wyłącznie wolumenu rozmów, lepszy będzie doświadczony handlowiec. Jeśli szukają Państwo osoby, która przy okazji uporządkuje proces i ofertę, to jest moja przewaga.</li>
            </ul>
          </div>
        ` },
      ],
    },
  ],
};
