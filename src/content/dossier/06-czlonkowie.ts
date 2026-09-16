import type { DossierPage } from './types';

export const pageCzlonkowie: DossierPage = {
  id: 'czlonkowie',
  num: '06',
  navLabel: "Członkowie i partnerzy",
  group: "Działalność i pozycja",
  eyebrow: "06 · Baza członkowska",
  title: `Członkowie i partnerzy`,
  lead: `Około 90 firm z dziewięciu krajów CEE na publicznej liście członków<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="89">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>. Poniżej rozkład geograficzny i sektorowy, rozpoznawalne nazwy oraz - najistotniejsze dla stanowiska - segmenty niedoreprezentowane, czyli miejsca, w których leży najbliższy wzrost.`,
  blocks: [
    { kind: 'html', html: `<div class="metrics c4 block">
        <div class="metric amber"><div class="n">~90</div><div class="l">firm na publicznej liście członków<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="90">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup></div></div>
        <div class="metric cyan"><div class="n">9</div><div class="l">krajów reprezentowanych w bazie<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="91">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup></div></div>
        <div class="metric"><div class="n">~50</div><div class="l">firm na starcie w kwietniu 2024<sup class="fn" tabindex="0" role="button" aria-label="Przypis 26 — pokaż źródło" data-refs="26" data-fn="92">26<span class="fc" role="note"><b>26.</b> Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em></span></sup></div></div>
        <div class="metric green"><div class="n">4x</div><div class="l">wzrost zadeklarowany przez CEO na pierwszy rok<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 26 — pokaż źródło" data-refs="26" data-fn="93">26<span class="fc" role="note"><b>26.</b> Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em></span></sup></div></div>
      </div>
<div class="block"><h3 class="sh">Rozpoznawalne nazwy w bazie<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="94">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup></h3>
        <div class="awards">
          <div class="award"><b>ElevenLabs</b><span>Globalna firma voice-AI o statusie unicorna; najmocniejsza referencja w portfelu członkowskim.</span></div>
          <div class="award"><b>ICEYE</b><span>Scaleup sektora kosmicznego; jego Sales Director zasiada w Board of Directors izby<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 8 — pokaż źródło" data-refs="8" data-fn="95">8<span class="fc" role="note"><b>8.</b> AI Chamber, „Board of Directors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>.</span></div>
          <div class="award"><b>Dronehub</b><span>Firma dronowa, której założyciel Vadym Melnyk jest członkiem Board of Directors<sup class="fn" tabindex="0" role="button" aria-label="Przypis 8 — pokaż źródło" data-refs="8" data-fn="96">8<span class="fc" role="note"><b>8.</b> AI Chamber, „Board of Directors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>.</span></div>
          <div class="award"><b>Oxylabs</b><span>Litewska firma z obszaru danych i infrastruktury sieciowej - dowód realnej regionalności bazy.</span></div>
        </div>
        <p class="note">Pozostałe rozpoznawalne podmioty na liście: Comtegra, Neoteric, SoftwareMill, ABR SESTA, RK Legal.</p>
      </div>
<div class="card block"><h3>Rozkład geograficzny<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="97">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup> <span class="mono">dominacja Polski, obecność regionalna</span></h3>
        <table class="data" style="margin-top:10px">
          <thead><tr><th>Kraj</th><th>Przykładowi członkowie</th><th>Nasycenie</th></tr></thead>
          <tbody>
            <tr><td>Polska</td><td>ElevenLabs, ICEYE, Dronehub, Comtegra, Neoteric, SoftwareMill</td><td><span class="pill pos">rdzeń bazy</span></td></tr>
            <tr><td>Litwa</td><td>Oxylabs, AIDARIUS, Sigli, MB 6 vijos</td><td><span class="pill">obecność</span></td></tr>
            <tr><td>Bułgaria</td><td>Ethermind, Headway Technologies, Kikimora, AugforM, ILAC</td><td><span class="pill">obecność</span></td></tr>
            <tr><td>Czechy</td><td>KARDI AI, O&amp;L Consulting</td><td><span class="pill warn">symboliczna</span></td></tr>
            <tr><td>Rumunia</td><td>Intellectum Lab, LEXTERS</td><td><span class="pill warn">symboliczna</span></td></tr>
            <tr><td>Węgry</td><td>iLex, SellWithMI</td><td><span class="pill warn">symboliczna</span></td></tr>
            <tr><td>Chorwacja</td><td>Datum</td><td><span class="pill warn">symboliczna</span></td></tr>
            <tr><td>Estonia</td><td>Together Alone Ventures</td><td><span class="pill warn">symboliczna</span></td></tr>
            <tr><td>Słowenia</td><td>Spisek</td><td><span class="pill warn">symboliczna</span></td></tr>
          </tbody>
        </table>
        <p class="note">Czechy są jednocześnie krajem pierwotnie wskazanym przez CEO jako cel ekspansji<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 26 — pokaż źródło" data-refs="26" data-fn="98">26<span class="fc" role="note"><b>26.</b> Sifted, materiał o inauguracji AI Chamber, 24 kwietnia 2024 r. - baza startowa blisko 50 firm, deklaracja czterokrotnego wzrostu w ciągu roku, Czechy jako pierwszy cel ekspansji. <em>M2</em></span></sup>, gospodarzem CEE AI Summit 2026<sup class="fn" tabindex="0" role="button" aria-label="Przypis 16 — pokaż źródło" data-refs="16" data-fn="99">16<span class="fc" role="note"><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup> i rynkiem o symbolicznej reprezentacji w bazie<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="100">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>. To najbardziej oczywista luka do zaadresowania.</p>
      </div>
<div class="card block"><h3>Rozkład sektorowy<sup class="fn" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="101">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup></h3>
        <table class="data" style="margin-top:10px">
          <thead><tr><th>Sektor</th><th>Przykładowi członkowie</th></tr></thead>
          <tbody>
            <tr><td>AI i Data Science</td><td>trzon bazy, największa grupa</td></tr>
            <tr><td>Legal i LegalTech</td><td>RK Legal, CORE Law, Creativa Legal, LexTool AI, Lubasz i Wspólnicy</td></tr>
            <tr><td>Healthcare i MedTech</td><td>Migam, Pleso Therapy, RheumaNext, Evispine, Sidly</td></tr>
            <tr><td>HR Tech</td><td>Econsulting, Next Technology, Sowelo, Square One</td></tr>
            <tr><td>Space</td><td>ICEYE, AstroFarms</td></tr>
            <tr><td>Cybersecurity</td><td>NVT, Vigil Guard, Kikimora</td></tr>
          </tbody>
        </table>
      </div>
<div class="card block"><h3>Partnerzy instytucjonalni i wydarzeń<sup class="fn" tabindex="0" role="button" aria-label="Przypis 14, 16, 17, 18 — pokaż źródło" data-refs="14,16,17,18" data-fn="102">14,16,17,18<span class="fc" role="note"><b>14.</b> AI Chamber, „How do SMEs in CEE find their way in the world of AI?”, raport z badania ponad 3 200 pracowników z 11 krajów, lipiec 2025 r. <em>M1</em><br><b>16.</b> AI Chamber, zapowiedź „CEE AI Summit 2026”, Praga, Martinic Palace, 3 września 2026 r., pod auspicjami Ministerstwa Przemysłu i Handlu Republiki Czeskiej; aichamber.eu, dostęp: sierpień 2026. <em>M1</em><br><b>17.</b> AI Chamber wraz z dwunastoma innymi organizacjami regionu, list otwarty w sprawie pakietu Digital Omnibus, grudzień 2025 r. <em>M1</em><br><b>18.</b> AI Chamber, działy „News” i „Events”, aichamber.eu, dostęp: sierpień 2026 - wydarzenie w Brukseli z Narodowym Centrum Badań i Rozwoju (lipiec 2025), debaty oksfordzkie, AI Chamber Hangout, cykl webinarów „EU AI Act Essentials”, stanowiska konsultacyjne. <em>M1</em></span></sup></h3>
        <div class="chips" style="margin-top:12px"><span class="chip">NCBR <span class="pill" style="margin-left:6px">raport MŚP</span></span><span class="chip">Ministerstwo Przemysłu i Handlu Czech <span class="pill" style="margin-left:6px">CEE AI Summit 2026</span></span><span class="chip">Ambasada RP w Paryżu <span class="pill" style="margin-left:6px">AI Action Summit</span></span><span class="chip">12 organizacji regionu <span class="pill" style="margin-left:6px">Open Letter</span></span></div>
        <p class="note">Nie ustalono pełnej listy partnerów korporacyjnych ani sponsorów wydarzeń - izba nie publikuje jej w formie zbiorczej<sup class="fn" tabindex="0" role="button" aria-label="Przypis 11, 12 — pokaż źródło" data-refs="11,12" data-fn="103">11,12<span class="fc" role="note"><b>11.</b> AI Chamber, „Cooperation - Corporate Partnerships”, aichamber.eu, dostęp: sierpień 2026 - filary Strategic Insights, Premium Connections, Business Growth i Market Visibility oraz adres kontaktowy. <em>M1</em><br><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>. To jedno z pytań do zadania na rozmowie, ponieważ determinuje punkt startowy pipeline'u partnerskiego.</p>
      </div>
<div class="verdict block"><h4>Segmenty niedoreprezentowane - cele akwizycji</h4>
        <p>Analiza publicznej listy członków wskazuje cztery obszary o największym zapasie wzrostu. Pierwszy: korporacje i duzi integratorzy przez ścieżkę Corporate Partnerships, bo baza to dziś głównie mikro i małe firmy, a wartość jednostkowa kontraktu korporacyjnego jest wielokrotnie wyższa. Drugi: rynki CEE poza Polską - Czechy, Rumunia, Węgry, Chorwacja, Estonia i Słowenia mają reprezentację symboliczną, przy jednoczesnej narracji regionalnej izby. Trzeci: fundusze VC i uczelnie, niemal nieobecne na liście<sup class="fn r" tabindex="0" role="button" aria-label="Przypis 12 — pokaż źródło" data-refs="12" data-fn="104">12<span class="fc" role="note"><b>12.</b> AI Chamber, „Members”, aichamber.eu, dostęp: sierpień 2026 - publiczna lista firm członkowskich; liczba około 90 pochodzi ze zliczenia własnego. <em>M1</em></span></sup>, choć w Board of Advisors są już Akademia Leona Koźmińskiego, PAN i board EIT<sup class="fn p" tabindex="0" role="button" aria-label="Przypis 9 — pokaż źródło" data-refs="9" data-fn="105">9<span class="fc" role="note"><b>9.</b> AI Chamber, „Board of Advisors”, aichamber.eu, dostęp: sierpień 2026. <em>M1</em></span></sup>, co daje gotowy punkt zaczepienia dla członkostwa instytucjonalnego. Czwarty: wertykały pod presją regulacyjną, czyli MedTech, FinTech i sektor publiczny, dla których compliance z AI Act ma najwyższą wartość odczuwalną.</p>
      </div>` },
  ],
};
