import type { DossierPage } from './types';

export const pageZrodla: DossierPage = {
  id: 'zrodla',
  num: '08',
  navLabel: "Źródła",
  group: "Weryfikowalność",
  eyebrow: "08 · Weryfikowalność",
  title: `Źródła`,
  lead: `Trzydzieści cztery pozycje w zapisie chicagowskim, ponumerowane na stałe i pogrupowane według rodzaju źródła. Numery odpowiadają odsyłaczom górnym umieszczonym przy danych w całym dossier - najechanie kursorem lub przejście klawiszem Tab na odsyłacz wyświetla pełny opis bibliograficzny. Numeracja jest przypisana do źródła, a nie do kolejności wystąpienia, ponieważ dokument ma układ zakładkowy i nie jest czytany liniowo. Przy każdej pozycji podano poziom wiarygodności w skali M1-M5.`,
  blocks: [
    { kind: 'html', html: `<div class="card block">
        <div class="src-num">
          <span class="g first">Rejestry publiczne i akty prawne</span>
          <div class="i" id="zrodlo-1" data-src="1"><span class="n">1.</span><span class="t">Krajowy Rejestr Sądowy, wpis podmiotu AI Chamber, KRS 0001108700, NIP 7011219059, REGON 529432945, rejestracja 21 sierpnia 2024 r.; odczyt za pośrednictwem rejestr.io, sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-2" data-src="2"><span class="n">2.</span><span class="t">Krajowy Rejestr Sądowy, wpis Fundacji AI CEE, KRS 0001064000, rejestracja 17 października 2023 r.; odczyt za pośrednictwem rejestr.io, sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-3" data-src="3"><span class="n">3.</span><span class="t">Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2024/1689 z dnia 13 czerwca 2024 r. ustanawiające zharmonizowane przepisy dotyczące sztucznej inteligencji (akt w sprawie sztucznej inteligencji), Dziennik Urzędowy Unii Europejskiej, seria L, 2024/1689. <em>M1</em></span></div>
          <div class="i" id="zrodlo-4" data-src="4"><span class="n">4.</span><span class="t">Komisja Europejska, pakiet Digital Omnibus - propozycja uproszczenia przepisów cyfrowych i przesunięcia terminów stosowania obowiązków, listopad 2025 r. <em>M1</em></span></div>
          <div class="i" id="zrodlo-5" data-src="5"><span class="n">5.</span><span class="t">Ustawa o systemach sztucznej inteligencji: projekt przyjęty przez Radę Ministrów 31 marca 2026 r., uchwalony przez Sejm Rzeczypospolitej Polskiej głosami 421 posłów, podpisany przez Prezydenta RP, 2026 r. <em>M1</em></span></div>
          <span class="g">Źródła własne AI Chamber</span>
          <div class="i" id="zrodlo-6" data-src="6"><span class="n">6.</span><span class="t">AI Chamber, „About Us”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-7" data-src="7"><span class="n">7.</span><span class="t">AI Chamber, „Meet The Team”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-8" data-src="8"><span class="n">8.</span><span class="t">AI Chamber, „Board of Directors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-9" data-src="9"><span class="n">9.</span><span class="t">AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-10" data-src="10"><span class="n">10.</span><span class="t">AI Chamber, „How to become a member of the AI Chamber?”, aichamber.eu, dostęp: sierpień 2026 - pakiety BASIC, PRO i PREMIUM, mechanika składki, opłata rejestracyjna oraz termin wypowiedzenia 31 grudnia. <em>M1</em></span></div>
          <div class="i" id="zrodlo-11" data-src="11"><span class="n">11.</span><span class="t">AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em></span></div>
          <div class="i" id="zrodlo-12" data-src="12"><span class="n">12.</span><span class="t">AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></div>
          <div class="i" id="zrodlo-13" data-src="13"><span class="n">13.</span><span class="t">AI Chamber, „CEE AI Action Plan”, dokument programowy zaprezentowany w Gdańsku podczas prezydencji Polski w Radzie Unii Europejskiej, 2025 r. - pięć filarów oraz dane o adopcji AI w regionie na poziomie 4-6%. <em>M1</em></span></div>
          <div class="i" id="zrodlo-14" data-src="14"><span class="n">14.</span><span class="t">AI Chamber, „How do SMEs in CEE find their way in the world of AI?”, raport z badania ponad 3 200 pracowników z 11 krajów, lipiec 2025 r. <em>M1</em></span></div>
          <div class="i" id="zrodlo-15" data-src="15"><span class="n">15.</span><span class="t">AI Chamber, „Raport AI Chamber 2024. Rola AI w MŚP”, wrzesień 2024 r. <em>M1</em></span></div>
          <div class="i" id="zrodlo-16" data-src="16"><span class="n">16.</span><span class="t">AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></div>
          <div class="i" id="zrodlo-17" data-src="17"><span class="n">17.</span><span class="t">AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em></span></div>
          <div class="i" id="zrodlo-18" data-src="18"><span class="n">18.</span><span class="t">AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></div>
          <span class="g">Ogłoszenie rekrutacyjne</span>
          <div class="i" id="zrodlo-19" data-src="19"><span class="n">19.</span><span class="t">„Partnerships &amp; Membership Growth Manager”, ogłoszenie rekrutacyjne AI Chamber, 2026 r. - zakres obowiązków, wymagania, warunki współpracy oraz wymagania dodane przez publikującego ofertę. <em>M1</em></span></div>
          <span class="g">Dane statystyczne, rynkowe i benchmarki</span>
          <div class="i" id="zrodlo-20" data-src="20"><span class="n">20.</span><span class="t">Eurostat, „Use of artificial intelligence in enterprises”, dane za lata 2024 i 2025 - średnia 13,5%, Polska 8,36% wobec 5,9% w roku poprzednim, Bułgaria 8,55%, Rumunia 5,21%. <em>M2</em></span></div>
          <div class="i" id="zrodlo-21" data-src="21"><span class="n">21.</span><span class="t">Dealroom.co oraz Vestbee, dane o ekosystemie startupowym Europy Środkowo-Wschodniej, I kwartał 2025 r. - wartość 243 mld EUR, ponad 3 800 startupów, 275 scaleupów, 2,3 mld EUR kapitału VC w 2024 r. <em>M2</em></span></div>
          <div class="i" id="zrodlo-22" data-src="22"><span class="n">22.</span><span class="t">Marketing General Incorporated, „2025 Membership Marketing Benchmarking Report”, 2025 r. - mediana odnowień 84%, organizacje branżowe 85-89%, retencja pierwszoroczna 74-75%, 52% nieodnowień z powodu braku zaangażowania; dane dotyczą rynku amerykańskiego. <em>M2</em></span></div>
          <span class="g">Organizacje porównywalne i konkurencyjne</span>
          <div class="i" id="zrodlo-23" data-src="23"><span class="n">23.</span><span class="t">KI Bundesverband, informacja o liczbie członków (ponad 500), ki-verband.de, dostęp: sierpień 2026. <em>M2</em></span></div>
          <div class="i" id="zrodlo-24" data-src="24"><span class="n">24.</span><span class="t">Hub France IA, informacja o liczbie członków i partnerów (ponad 800, w tym ponad 200 organizacji, ponad 160 startupów i ponad 50 partnerów europejskich), hub-franceia.fr, dostęp: sierpień 2026. <em>M2</em></span></div>
          <div class="i" id="zrodlo-25" data-src="25"><span class="n">25.</span><span class="t">Digital Poland oraz European AI Forum, materiały własne organizacji, dostęp: sierpień 2026 - inicjatywa AIPoland, CEE Digital Coalition oraz skład założycielski forum europejskiego. <em>M2</em></span></div>
          <span class="g">Media branżowe</span>
          <div class="i" id="zrodlo-26" data-src="26"><span class="n">26.</span><span class="t">Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em></span></div>
          <div class="i" id="zrodlo-27" data-src="27"><span class="n">27.</span><span class="t">The Recursive, omówienie raportu AI Chamber o adopcji sztucznej inteligencji w małych i średnich przedsiębiorstwach, 2025 r. <em>M2</em></span></div>
          <div class="i" id="zrodlo-28" data-src="28"><span class="n">28.</span><span class="t">Polska Agencja Prasowa, CRN Polska, „Gazeta Prawna” oraz di.com.pl, komunikaty prasowe o powstaniu i działalności AI Chamber, 2024-2026. <em>M2</em></span></div>
          <span class="g">Raporty płacowe</span>
          <div class="i" id="zrodlo-29" data-src="29"><span class="n">29.</span><span class="t">Hays Poland, „Salary Guide 2026”, 2026 r. - 80% firm podniosło wynagrodzenia, w większości o 2,5-5%. <em>M2</em></span></div>
          <div class="i" id="zrodlo-30" data-src="30"><span class="n">30.</span><span class="t">Antal, raport płacowy, 2025/2026 - średnia dla stanowisk specjalistycznych i menedżerskich około 15 700 zł brutto; kategoria szeroka, nieodnosząca się do tej konkretnej roli. <em>M2</em></span></div>
          <span class="g">Profile zawodowe i agregatory</span>
          <div class="i" id="zrodlo-31" data-src="31"><span class="n">31.</span><span class="t">Profile zawodowe w serwisie LinkedIn: Tomasz Snażyk, Agnieszka Gosztyła, Marcin Olender, Monika Kalkusová, Paulina Król oraz członkowie Board of Directors i Board of Advisors; odczyt: sierpień 2026. <em>M3</em></span></div>
          <div class="i" id="zrodlo-32" data-src="32"><span class="n">32.</span><span class="t">„My Company Polska” oraz Wikipedia, biogram Tomasza Snażyka - SKM Legal, Fundacja Startup Poland (prezes od kwietnia 2020), rada nadzorcza Audioteki. <em>M3</em></span></div>
          <div class="i" id="zrodlo-33" data-src="33"><span class="n">33.</span><span class="t">RocketReach, szacunkowa wielkość zespołu AI Chamber (około 12 osób) oraz część nazwisk niepotwierdzonych na stronie „Meet The Team”; dostęp: sierpień 2026. <em>M4</em></span></div>
          <span class="g">Dane własne kandydata</span>
          <div class="i" id="zrodlo-34" data-src="34"><span class="n">34.</span><span class="t">Igor Miasnikow, CV oraz portfolio projektów - dane własne kandydata, 2026 r. <em>M1</em></span></div>
        </div>
      </div>
<div class="card block"><h3>Czego nie udało się ustalić <span class="mono">luki jawne</span></h3>
        <ul class="matters">
          <li><span class="pill warn">brak danych</span> Wysokość składek członkowskich (BASIC, PRO, PREMIUM) oraz cen partnerstw korporacyjnych - widoczne dopiero w deklaracji członkowskiej.</li>
          <li><span class="pill warn">brak danych</span> Sprawozdania finansowe izby i wysokość przychodów, także w podziale na strumienie.</li>
          <li><span class="pill warn">brak danych</span> Liczba obecnych partnerów korporacyjnych i pełna lista sponsorów wydarzeń.</li>
          <li><span class="pill warn">brak danych</span> Dokładna, oficjalna liczba członków oraz dynamika miesiąc do miesiąca; wartość około 90 to zliczenie z publicznej listy.</li>
          <li><span class="pill warn">brak danych</span> Liczba obserwujących profil izby na LinkedIn, Instagramie i Facebooku - do weryfikacji ręcznej po zalogowaniu.</li>
          <li><span class="pill warn">brak danych</span> Czy stanowisko jest nowe, czy zastępcze, oraz widełki wynagrodzenia - w ogłoszeniu nie podano ani jednego, ani drugiego.</li>
          <li><span class="pill cyan">rozbieżność</span> Data powstania: publiczna inauguracja w kwietniu 2024 wobec formalnego wpisu izby do KRS 21 sierpnia 2024. Warto znać obie daty.</li>
          <li><span class="pill cyan">do weryfikacji</span> Relacje organizacyjne i finansowe między AI Chamber, Fundacją AI CEE i Fundacją Startup Poland.</li>
        </ul>
        <p class="note" style="margin-top:16px">Dossier zagregowano w sierpniu 2026 roku. Dane rejestrowe i skład zespołu mogą się zmieniać - przed rozmową warto sprawdzić najświeższe wpisy KRS oraz aktualną listę członków na aichamber.eu. Wartości oznaczone jako szacunkowe (M4) i przypuszczenia analityczne (M5) nie powinny być cytowane na rozmowie jako fakty.</p>
      </div>` },
  ],
};
