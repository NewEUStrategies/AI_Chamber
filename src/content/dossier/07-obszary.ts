import type { DossierPage } from './types';

export const pageObszary: DossierPage = {
  id: 'obszary',
  num: '07',
  navLabel: "Obszary działania",
  group: "Działalność i pozycja",
  eyebrow: "07 · Obszary działania i produkty",
  title: `Siedem obszarów, z których dwa są przedmiotem rekrutacji`,
  lead: `Działalność izby ujęto w siedem zakładek: cztery obszary tworzące wartość dla członków (advocacy, badania, wydarzenia, edukacja), dwie ścieżki komercyjne (członkostwo MŚP, partnerstwa korporacyjne) oraz ekspansję regionalną. Zakładki piąta i szósta odpowiadają bezpośrednio zakresowi stanowiska.`,
  blocks: [
    {
      kind: 'tabs',
      group: 'ob',
      tabs: [
        { id: 'ob-1', label: "Advocacy i policy", html: `
          <p class="axis-intro">Rdzeń wartości członkostwa. Reprezentacja interesu firm technologicznych wobec instytucji krajowych i unijnych, z zapleczem w postaci Board of Advisors złożonego z byłych decydentów rządowych z czterech krajów regionu.</p>

          <div class="card spec">
            <h4>Konsultacje krajowe i unijne <span class="pill cyan">M. Olender · Public Policy Director</span></h4>
            <p>Udział w procesach legislacyjnych na obu poziomach: krajowym (Ministerstwo Cyfryzacji) i unijnym (Komisja Europejska). Public Policy Director spędził dekadę w zespole Public Policy CEE w Google i wcześniej pracował w Ministerstwie Administracji i Cyfryzacji<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 31, 7 — pokaż źródło" data-refs="31,7" data-fn="106">31,7<span class="fc" role="note"><b>31.</b> Profile zawodowe w serwisie LinkedIn: Tomasz Snażyk, Agnieszka Gosztyła, Marcin Olender, Monika Kalkusová, Paulina Król oraz członkowie Board of Directors i Board of Advisors; odczyt: sierpień 2026. <em>M3</em><br><b>7.</b> AI Chamber, „Meet The Team”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>, co daje izbie dostęp do sieci kontaktów po obu stronach stołu.</p>
            <div class="matters-title">Udokumentowane wystąpienia</div>
            <ul class="matters">
              <li>Oficjalne stanowisko w Ministerstwie Cyfryzacji wobec projektu ustawy o systemach sztucznej inteligencji<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 18, 5 — pokaż źródło" data-refs="18,5" data-fn="107">18,5<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em><br><b>5.</b> Ustawa o systemach sztucznej inteligencji: projekt przyjęty przez Radę Ministrów 31 marca 2026 r., uchwalony przez Sejm Rzeczypospolitej Polskiej głosami 421 posłów, podpisany przez Prezydenta RP, 2026 r. <em>M1</em></span></sup></li>
              <li>Stanowisko wobec dokumentu „Polityka rozwoju AI w Polsce do 2030 roku”<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="108">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
              <li>Konsultacje Komisji Europejskiej dotyczące klasyfikacji systemów wysokiego ryzyka według art. 6 AI Act<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 18, 3 — pokaż źródło" data-refs="18,3" data-fn="109">18,3<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em><br><b>3.</b> Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2024/1689 z dnia 13 czerwca 2024 r. ustanawiające zharmonizowane przepisy dotyczące sztucznej inteligencji (akt w sprawie sztucznej inteligencji), Dziennik Urzędowy Unii Europejskiej, seria L, 2024/1689. <em>M1</em></span></sup></li>
              <li>Konsultacje dotyczące prawa autorskiego i eksploracji tekstów i danych (TDM)<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="110">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
              <li>Open Letter w sprawie Digital Omnibus wspólnie z 12 organizacjami regionu<sup class="fn" tabindex="0" role="button" aria-label="Przypis 17 — pokaż źródło" data-refs="17" data-fn="111">17<span class="fc" role="note"><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></sup> <span class="v">12.2025</span></li>
              <li>Promocja wspólnego bidu CEE na AI Gigafactory (Polska, kraje bałtyckie, Czechy)<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="112">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
            </ul>
            <div class="matters-title">Zaplecze polityczne</div>
            <ul class="matters">
              <li>Board of Advisors: byli ministrowie i wiceministrowie z Bułgarii, Litwy, Czech i Słowenii<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="113">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup></li>
              <li>Jan Kavalirek jako CEE Ambassador for AI and New Technologies, gdzie izba pełni rolę wiodącą<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 9, 18 — pokaż źródło" data-refs="9,18" data-fn="114">9,18<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em><br><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
              <li>Ivo Emanuilov w grupach roboczych AI Office Komisji Europejskiej<sup class="fn" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="115">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup></li>
            </ul>
          </div>

          <div class="card spec">
            <h4>Dlaczego to sprzedaje się teraz <span class="pill warn">okno regulacyjne</span></h4>
            <p>Kumulacja obowiązków AI Act w latach 2026-2028<sup class="fn" tabindex="0" role="button" aria-label="Przypis 3, 4 — pokaż źródło" data-refs="3,4" data-fn="116">3,4<span class="fc" role="note"><b>3.</b> Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2024/1689 z dnia 13 czerwca 2024 r. ustanawiające zharmonizowane przepisy dotyczące sztucznej inteligencji (akt w sprawie sztucznej inteligencji), Dziennik Urzędowy Unii Europejskiej, seria L, 2024/1689. <em>M1</em><br><b>4.</b> Komisja Europejska, pakiet Digital Omnibus - propozycja uproszczenia przepisów cyfrowych i przesunięcia terminów stosowania obowiązków, listopad 2025 r. <em>M1</em></span></sup> oraz niepewność wokół polskiej ustawy o systemach AI i nowego organu nadzoru<sup class="fn" tabindex="0" role="button" aria-label="Przypis 5 — pokaż źródło" data-refs="5" data-fn="117">5<span class="fc" role="note"><b>5.</b> Ustawa o systemach sztucznej inteligencji: projekt przyjęty przez Radę Ministrów 31 marca 2026 r., uchwalony przez Sejm Rzeczypospolitej Polskiej głosami 421 posłów, podpisany przez Prezydenta RP, 2026 r. <em>M1</em></span></sup> tworzą realny, odczuwalny popyt na reprezentację i doradztwo regulacyjne. MŚP nie mają zasobów, by samodzielnie śledzić i wpływać na te procesy - to najmocniejszy argument w rozmowie o składce.</p>
            <p class="spec-note">Szczegółowy harmonogram obowiązków AI Act i status polskiej ustawy: zakładka 13.</p>
          </div>
        ` },
        { id: 'ob-2', label: "Badania", html: `
          <p class="axis-intro">Własne dane pierwotne jako fundament pozycji eksperckiej i narzędzie akwizycji. Izba nie tylko komentuje cudze analizy, ale prowadzi badania na próbach regionalnych.</p>

          <div class="card spec">
            <h4>Publikacje i raporty</h4>
            <p>Dorobek badawczy zbudowany w niespełna dwa lata od inauguracji, obejmujący badania ilościowe i dokumenty programowe.</p>
            <div class="matters-title">Pozycje udokumentowane</div>
            <ul class="matters">
              <li>„How do SMEs in CEE find their way in the world of AI?” - badanie ponad 3 200 pracowników z 11 krajów<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 14 — pokaż źródło" data-refs="14" data-fn="118">14<span class="fc" role="note"><b>14.</b> AI Chamber, „How do SMEs in CEE find their way in the world of AI?”, raport z badania ponad 3 200 pracowników z 11 krajów, lipiec 2025 r. <em>M1</em></span></sup> <span class="v">07.2025</span></li>
              <li>„Raport AI Chamber 2024 - Rola AI w MŚP” - pierwsza publikacja izby<sup class="fn" tabindex="0" role="button" aria-label="Przypis 15 — pokaż źródło" data-refs="15" data-fn="119">15<span class="fc" role="note"><b>15.</b> AI Chamber, „Raport AI Chamber 2024. Rola AI w MŚP”, wrzesień 2024 r. <em>M1</em></span></sup> <span class="v">09.2024</span></li>
              <li>CEE AI Action Plan - dokument programowy w pięciu filarach<sup class="fn" tabindex="0" role="button" aria-label="Przypis 13 — pokaż źródło" data-refs="13" data-fn="120">13<span class="fc" role="note"><b>13.</b> AI Chamber, „CEE AI Action Plan”, dokument programowy zaprezentowany w Gdańsku podczas prezydencji Polski w Radzie Unii Europejskiej, 2025 r. - pięć filarów oraz dane o adopcji AI w regionie na poziomie 4-6%. <em>M1</em></span></sup> <span class="v">2025</span></li>
              <li>Aktualizacje regulacyjne dla członków, w tym dotyczące AI Act (element pakietu Strategic Insights)<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 11 — pokaż źródło" data-refs="11" data-fn="121">11<span class="fc" role="note"><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em></span></sup></li>
            </ul>
            <div class="matters-title">Kluczowa liczba z dorobku</div>
            <ul class="matters">
              <li>Adopcja AI w Europie Zachodniej średnio 13,5%, w CEE nawet 4-6% - dane z CEE AI Action Plan<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 13, 20 — pokaż źródło" data-refs="13,20" data-fn="122">13,20<span class="fc" role="note"><b>13.</b> AI Chamber, „CEE AI Action Plan”, dokument programowy zaprezentowany w Gdańsku podczas prezydencji Polski w Radzie Unii Europejskiej, 2025 r. - pięć filarów oraz dane o adopcji AI w regionie na poziomie 4-6%. <em>M1</em><br><b>20.</b> Eurostat, „Use of artificial intelligence in enterprises”, dane za lata 2024 i 2025 - średnia 13,5%, Polska 8,36% wobec 5,9% w roku poprzednim, Bułgaria 8,55%, Rumunia 5,21%. <em>M2</em></span></sup> <span class="v">luka 2-3x</span></li>
              <li>Wskaźnik 13,5% pochodzi z badania Eurostatu z 2024 roku dotyczącego wykorzystania AI w przedsiębiorstwach<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 20 — pokaż źródło" data-refs="20" data-fn="123">20<span class="fc" role="note"><b>20.</b> Eurostat, „Use of artificial intelligence in enterprises”, dane za lata 2024 i 2025 - średnia 13,5%, Polska 8,36% wobec 5,9% w roku poprzednim, Bułgaria 8,55%, Rumunia 5,21%. <em>M2</em></span></sup></li>
              <li>Według Eurostatu Polska osiągnęła 8,36% w 2025 roku, wobec 5,9% w 2024<sup class="fn" tabindex="0" role="button" aria-label="Przypis 20 — pokaż źródło" data-refs="20" data-fn="124">20<span class="fc" role="note"><b>20.</b> Eurostat, „Use of artificial intelligence in enterprises”, dane za lata 2024 i 2025 - średnia 13,5%, Polska 8,36% wobec 5,9% w roku poprzednim, Bułgaria 8,55%, Rumunia 5,21%. <em>M2</em></span></sup> <span class="v">+2,46 p.p.</span></li>
            </ul>
          </div>

          <div class="card spec">
            <h4>Zastosowanie w sprzedaży członkostwa <span class="pill cyan">materiał dla kandydata</span></h4>
            <p>Raport z 11 krajów pozwala prowadzić rozmowę akwizycyjną w oparciu o dane dotyczące rynku rozmówcy, a nie o ogólne zapewnienia. To jednocześnie najprostszy sposób na zbudowanie pilności: firma widzi, gdzie stoi jej rynek wobec Europy Zachodniej.</p>
          </div>
        ` },
        { id: 'ob-3', label: "Wydarzenia", html: `
          <p class="axis-intro">Portfel wydarzeń od szczytu regionalnego po nieformalne spotkania społeczności. Oferta pracy wprost wskazuje wspieranie lead generation i networkingu podczas wydarzeń krajowych i międzynarodowych, więc ten obszar wchodzi w zakres stanowiska.</p>

          <div class="card spec">
            <h4>CEE AI Summit<sup class="fn" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="125">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup> <span class="pill cyan">wydarzenie flagowe</span></h4>
            <p>Edycja 2026 zaplanowana na 3 września w Pradze, w Martinic Palace przy Zamku Praskim, pod auspicjami czeskiego Ministerstwa Przemysłu i Handlu. Zapowiadani mówcy obejmują komisarza UE ds. startupów, badań i innowacji oraz wicepremierów Czech i Polski, a także sekretarzy stanu i ministrów z regionu.</p>
            <div class="matters-title">Znaczenie operacyjne</div>
            <ul class="matters">
              <li>Najbliższy duży termin po zatrudnieniu - naturalny cel pierwszej kampanii partnerskiej <span class="v">03.09.2026</span></li>
              <li>Ranga rządowa podnosi wartość pakietów sponsorskich i partnerskich</li>
              <li>Lokalizacja w Pradze wspiera akwizycję na rynku czeskim, dziś reprezentowanym symbolicznie</li>
            </ul>
          </div>

          <div class="card spec">
            <h4>Formaty mniejsze i cykliczne</h4>
            <div class="matters-title">Udokumentowane formaty</div>
            <ul class="matters">
              <li>Debaty oksfordzkie - m.in. „Czy AI może być artystą?”, Kino Kultura w Warszawie<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="126">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup> <span class="v">11.12.2025</span></li>
              <li>AI Chamber Hangout - nieformalne spotkania społeczności członkowskiej w Warszawie<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="127">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
              <li>Wydarzenie w Brukseli z NCBR na styku prezydencji polskiej i duńskiej<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="128">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup> <span class="v">07.2025</span></li>
              <li>Webinary tematyczne, w tym cykl „EU AI Act Essentials” dla członków<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="129">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup> <span class="v">08.2026</span></li>
              <li>Webinar z udziałem członka izby (Pleso Therapy) o dobrostanie psychicznym<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="130">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
              <li>Obecność marki na Forbes CEE Forum, Bled Strategic Forum i Digital Horizons w Sofii<sup class="fn" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="131">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
            </ul>
            <p class="spec-note">Portfel jest zróżnicowany, ale nie ustalono publicznie liczby uczestników poszczególnych wydarzeń ani modelu sprzedaży pakietów sponsorskich.</p>
          </div>
        ` },
        { id: 'ob-4', label: "Edukacja", html: `
          <p class="axis-intro">Filar Education i Access to Knowledge w praktyce: webinary, aktualizacje regulacyjne i szkolenia jako powtarzalny powód kontaktu z bazą członkowską.</p>

          <div class="card spec">
            <h4>Produkty wiedzowe dla członków</h4>
            <div class="matters-title">Elementy udokumentowane</div>
            <ul class="matters">
              <li>Cykl webinarów „EU AI Act Essentials” - przygotowanie członków do obowiązków regulacyjnych<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 18 — pokaż źródło" data-refs="18" data-fn="132">18<span class="fc" role="note"><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></li>
              <li>Strategic Insights w pakiecie Corporate Partnerships - raporty i aktualizacje AI Act<sup class="fn" tabindex="0" role="button" aria-label="Przypis 11 — pokaż źródło" data-refs="11" data-fn="133">11<span class="fc" role="note"><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em></span></sup></li>
              <li>Business Growth w pakiecie Corporate Partnerships - szkolenia i programy rozwojowe<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 11 — pokaż źródło" data-refs="11" data-fn="134">11<span class="fc" role="note"><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em></span></sup></li>
              <li>Grupy robocze i working groups deklarowane w ofercie członkowskiej<sup class="fn" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="135">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup></li>
            </ul>
          </div>

          <div class="card spec">
            <h4>Rola edukacji w retencji <span class="pill warn">obszar krytyczny</span></h4>
            <p>Benchmarki dla organizacji członkowskich wskazują, że 52% nieodnowień wynika z braku zaangażowania, a nie z ceny, przy retencji pierwszorocznej na poziomie 74-75%<sup class="fn" tabindex="0" role="button" aria-label="Przypis 22 — pokaż źródło" data-refs="22" data-fn="136">22<span class="fc" role="note"><b>22.</b> Marketing General Incorporated, „2025 Membership Marketing Benchmarking Report”, 2025 r. - mediana odnowień 84%, organizacje branżowe 85-89%, retencja pierwszoroczna 74-75%, 52% nieodnowień z powodu braku zaangażowania; dane dotyczą rynku amerykańskiego. <em>M2</em></span></sup>. Produkty wiedzowe są najtańszym mechanizmem podtrzymywania zaangażowania w pierwszym roku członkostwa, czyli dokładnie w okresie najwyższego ryzyka odejścia. Oferta wprost wymienia wdrażanie działań retencyjnych jako obowiązek na stanowisku<sup class="fn" tabindex="0" role="button" aria-label="Przypis 19 — pokaż źródło" data-refs="19" data-fn="137">19<span class="fc" role="note"><b>19.</b> „Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></sup>.</p>
          </div>
        ` },
        { id: 'ob-5', label: "Członkostwo MŚP", html: `
          <p class="axis-intro">Pierwsza z dwóch ścieżek objętych rekrutacją. Trzy pakiety dla firm do 250 pracowników, ceny niejawne, odnowienie automatyczne z terminem wypowiedzenia 31 grudnia.</p>

          <div class="card spec">
            <h4>Struktura pakietów<sup class="fn" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="138">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup> <span class="pill cyan">A. Gosztyła · Director of Growth &amp; Partnerships<sup class="fn" tabindex="0" role="button" aria-label="Przypis 31 — pokaż źródło" data-refs="31" data-fn="139">31<span class="fc" role="note"><b>31.</b> Profile zawodowe w serwisie LinkedIn: Tomasz Snażyk, Agnieszka Gosztyła, Marcin Olender, Monika Kalkusová, Paulina Król oraz członkowie Board of Directors i Board of Advisors; odczyt: sierpień 2026. <em>M3</em></span></sup></span></h4>
            <p>Segmentacja według liczby pracowników, z rosnącym zakresem widoczności, networkingu i zaangażowania w advocacy. Członkostwo dostępne wyłącznie dla MŚP - to świadome ograniczenie, które chroni ścieżkę korporacyjną przed kanibalizacją.</p>
            <div class="matters-title">Poziomy i progi</div>
            <ul class="matters">
              <li>BASIC - firmy do 5 pracowników; dostęp do wiedzy, społeczność, wspólny głos<sup class="fn" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="140">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup> <span class="v">do 5 os.</span></li>
              <li>PRO - firmy 6-50 pracowników; widoczność, networking, introdukcje biznesowe i inwestorskie<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="141">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup> <span class="v">6-50 os.</span></li>
              <li>PREMIUM - firmy 51-250 pracowników; priorytetowy dostęp, promocja, ekspozycja międzynarodowa<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 10 — pokaż źródło" data-refs="10" data-fn="142">10<span class="fc" role="note"><b>10.</b> AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></sup> <span class="v">51-250 os.</span></li>
            </ul>
            <div class="matters-title">Mechanika sprzedaży i rozliczeń</div>
            <ul class="matters">
              <li>Wysokość składki widoczna dopiero w deklaracji członkowskiej - brak publicznego cennika</li>
              <li>Składka roczna naliczana proporcjonalnie od miesiąca przystąpienia</li>
              <li>Jednorazowa opłata rejestracyjna powiększona o VAT</li>
              <li>Automatyczne odnowienie, jeśli brak pisemnego wypowiedzenia do 31 grudnia <span class="v">31.12</span></li>
            </ul>
            <p class="spec-note">Brak jawnego cennika oznacza dłuższy, negocjowany cykl sprzedaży, ale też przestrzeń na wycenę opartą na wartości i pakietowanie - obie rzeczy warto poruszyć na rozmowie.</p>
          </div>
        ` },
        { id: 'ob-6', label: "Corporate Partnerships", html: `
          <p class="axis-intro">Druga ścieżka objęta rekrutacją i obszar o najwyższej wartości jednostkowej kontraktu. Kontakt prowadzi bezpośrednio Director of Growth &amp; Partnerships, co wskazuje, gdzie w organizacji leży własność tego procesu.</p>

          <div class="card spec">
            <h4>Cztery obszary wartości dla partnera korporacyjnego<sup class="fn" tabindex="0" role="button" aria-label="Przypis 11 — pokaż źródło" data-refs="11" data-fn="143">11<span class="fc" role="note"><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em></span></sup></h4>
            <p>Duże przedsiębiorstwa nie wchodzą w standardowe członkostwo, lecz w indywidualnie skonstruowaną współpracę. Deklarowany pakiet obejmuje cztery filary, z których dwa pierwsze są trudne do skopiowania przez konkurencję.</p>
            <div class="matters-title">Składniki oferty</div>
            <ul class="matters">
              <li>Strategic Insights - raporty i aktualizacje regulacyjne, w tym dotyczące AI Act</li>
              <li>Premium Connections - roundtables i grupy robocze z udziałem decydentów <span class="v">rdzeń wartości</span></li>
              <li>Business Growth - szkolenia i programy rozwojowe</li>
              <li>Market Visibility - certyfikacja partnerska i digital badging</li>
            </ul>
            <div class="matters-title">Dźwignie sprzedażowe do wykorzystania</div>
            <ul class="matters">
              <li>Board of Advisors jako otwieracz drzwi do decydentów w czterech krajach regionu<sup class="fn" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="144">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup></li>
              <li>CEE AI Summit 2026 w Pradze pod auspicjami czeskiego ministerstwa jako produkt ekspozycyjny<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="145">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup></li>
              <li>Dorobek badawczy (raport z 11 krajów) jako materiał uzasadniający wartość Strategic Insights<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 14 — pokaż źródło" data-refs="14" data-fn="146">14<span class="fc" role="note"><b>14.</b> AI Chamber, „How do SMEs in CEE find their way in the world of AI?”, raport z badania ponad 3 200 pracowników z 11 krajów, lipiec 2025 r. <em>M1</em></span></sup></li>
              <li>Referencje z bazy: ElevenLabs i ICEYE jako dowód jakości środowiska<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="147">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup></li>
            </ul>
            <p class="spec-note">Nie ustalono liczby obecnych partnerów korporacyjnych ani poziomów cenowych. To pierwsze pytanie do zadania na rozmowie, bo determinuje punkt startowy i realność celów.</p>
          </div>
        ` },
        { id: 'ob-7', label: "Ekspansja CEE", html: `
          <p class="axis-intro">Narracja izby jest regionalna, baza członkowska w praktyce polska z przyczółkami w ośmiu krajach. Domknięcie tej luki jest jednym z naturalnych mierników sukcesu na stanowisku.</p>

          <div class="card spec">
            <h4>Stan obecny wobec deklaracji</h4>
            <p>Izba posługuje się nazwami AI Chamber, AI Chamber CEE oraz polską Izba AI i pozycjonuje się jako głos całego regionu<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 6 — pokaż źródło" data-refs="6" data-fn="148">6<span class="fc" role="note"><b>6.</b> AI Chamber, „About Us”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>. Baza członkowska pokrywa dziewięć krajów<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="149">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>, ale w sześciu z nich reprezentacja jest symboliczna (jeden do dwóch podmiotów).</p>
            <div class="matters-title">Aktywa wspierające ekspansję</div>
            <ul class="matters">
              <li>Board of Advisors z byłymi decydentami z Bułgarii, Litwy, Czech i Słowenii - gotowe wejścia rynkowe<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="150">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup></li>
              <li>Zespół rozproszony geograficznie, obejmujący Warszawę i Gdańsk, według źródeł wtórnych także Pragę i Lublanę<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 31, 33 — pokaż źródło" data-refs="31,33" data-fn="151">31,33<span class="fc" role="note"><b>31.</b> Profile zawodowe w serwisie LinkedIn: Tomasz Snażyk, Agnieszka Gosztyła, Marcin Olender, Monika Kalkusová, Paulina Król oraz członkowie Board of Directors i Board of Advisors; odczyt: sierpień 2026. <em>M3</em><br><b>33.</b> RocketReach, szacunkowa wielkość zespołu AI Chamber (około 12 osób) oraz część nazwisk niepotwierdzonych na stronie „Meet The Team”; dostęp: sierpień 2026. <em>M4</em></span></sup></li>
              <li>CEE AI Summit 2026 w Pradze jako platforma akwizycji na rynku czeskim<sup class="fn" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="152">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup></li>
              <li>Koalicja 13 organizacji z regionu przy Open Letter - sieć kontaktów organizacyjnych<sup class="fn" tabindex="0" role="button" aria-label="Przypis 17 — pokaż źródło" data-refs="17" data-fn="153">17<span class="fc" role="note"><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></sup></li>
              <li>Czechy wskazane przez CEO jako pierwotny cel ekspansji już w kwietniu 2024<sup class="fn" tabindex="0" role="button" aria-label="Przypis 26 — pokaż źródło" data-refs="26" data-fn="154">26<span class="fc" role="note"><b>26.</b> Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em></span></sup></li>
            </ul>
            <div class="matters-title">Bariery do zaadresowania</div>
            <ul class="matters">
              <li>Konkurencja krajowa w każdym z rynków docelowych (m.in. CroAI w Chorwacji)<sup class="fn" tabindex="0" role="button" aria-label="Przypis 25 — pokaż źródło" data-refs="25" data-fn="155">25<span class="fc" role="note"><b>25.</b> Digital Poland oraz European AI Forum, materiały własne organizacji, dostęp: sierpień 2026 - inicjatywa AIPoland, CEE Digital Coalition oraz skład założycielski forum europejskiego. <em>M2</em></span></sup></li>
              <li>Wartość advocacy jest odczuwalna lokalnie - argument unijny wymaga uzupełnienia lokalnym</li>
              <li>Brak lokalnych oddziałów oznacza sprzedaż zdalną, co przy relacyjnym modelu podnosi trudność</li>
            </ul>
          </div>
        ` },
      ],
    },
  ],
};
