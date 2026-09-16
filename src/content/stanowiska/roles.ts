import type { Role } from './types';

/**
 * Pięć kart, od zarządczej po operacyjną.
 *
 * Widełki w polu `izba` to **decyzja zamawiającego**, nie odczyt rynku.
 * Materiał źródłowy rekomendował korektę w dół o 15–25 procent wobec rynku
 * rekrutacyjnego, typową dla organizacji członkowskich. Ta wersja tę korektę
 * porzuca i kotwiczy widełki w prognozie RocketJobs na 2026 — bo to są
 * pieniądze, które organizacja realnie zamierza zapłacić, a nie oszacowanie
 * tego, ile zwykle płacą podobne podmioty. Różnica jest widoczna na wykresie
 * i opisana przy każdej karcie.
 */
export const ROLES: Role[] = [
  {
    key: 'dyr',
    letter: 'A',
    title: 'Dyrektor ds. marketingu',
    english: 'Marketing Director / Head of Marketing / CMO',
    level: 'Zarządczy',
    oneLine: 'ustalenie, dokąd idziemy i za ile',
    purpose:
      'Odpowiada za strategię marketingu i komunikacji całej organizacji oraz za przełożenie celów zarządu na mierzalne cele marketingowe. W organizacji członkowskiej celem nadrzędnym nie jest sprzedaż produktu, lecz wzrost i utrzymanie bazy członków, przychód ze składek i sponsoringu oraz siła głosu organizacji w debacie publicznej.',
    facts: [
      { label: 'Podlega', value: 'prezes zarządu' },
      { label: 'Zarządza', value: 'cały dział, zwykle przez managera' },
      { label: 'Doświadczenie', value: '8–12 lat, w tym 3–5 menedżersko' },
      { label: 'Wykształcenie', value: 'wyższe; MBA i certyfikaty podnoszą wynagrodzenie o 15–20 procent' },
      { label: 'Język', value: 'angielski C1' },
    ],
    duties: [
      {
        title: 'Strategia i marka',
        items: [
          'Definiowanie strategii marketingu i komunikacji: plan roczny oraz kierunek trzyletni',
          'Pozycjonowanie, architektura marki, tone of voice, standardy wizualne',
          'Zatwierdzanie narracji organizacji i kluczowych komunikatów',
        ],
      },
      {
        title: 'Budżet i relacja z zarządem',
        items: [
          'Budowa i obrona rocznego budżetu marketingowego przed zarządem i radą',
          'Raportowanie wyników na poziomie biznesowym, nie kampanijnym',
          'Umowy i sponsoringi powyżej progu, patronaty medialne',
        ],
      },
      {
        title: 'Struktura i ludzie',
        items: [
          'Projektowanie struktury działu i decyzje o etatach',
          'Rekrutacja na kluczowe role, ocena roczna, plany rozwoju',
          'Ustalanie zakresów odpowiedzialności między rolami',
        ],
      },
      {
        title: 'Wzrost: członkostwo i przychód',
        items: [
          'Strategia pozyskiwania i utrzymania członków, projekt lejka',
          'Współtworzenie oferty pakietów członkowskich i sponsoringowych',
          'Wsparcie sprzedaży: argumentacja wartości, historie wdrożeń',
        ],
      },
      {
        title: 'Komunikacja i relacje zewnętrzne',
        items: [
          'Nadzór nad relacjami z mediami i budowaniem pozycji eksperckiej',
          'Komunikacja kryzysowa',
          'Spójność komunikacji marketingowej z linią merytoryczną organizacji',
        ],
      },
      {
        title: 'Dane i technologia',
        items: [
          'Wybór i nadzór nad stackiem: CRM, marketing automation, analityka',
          'Standard raportowania wyników do zarządu',
          'Polityka danych: zgody, dane własne, zgodność z RODO',
        ],
      },
    ],
    decides: [
      'Alokacja budżetu w ramach zatwierdzonej puli',
      'Dobór kanałów, taktyk i miksu marketingowego',
      'Rekrutacja i struktura zespołu w ramach przyznanych etatów',
      'Wybór dostawcy do ustalonego progu kwotowego',
      'Kształt marki, tone of voice, standardy wizualne',
      'Zatwierdzanie treści publikowanych przez dział',
    ],
    needsApproval: [
      'Wysokość rocznego budżetu marketingowego',
      'Umowy i sponsoringi powyżej progu',
      'Zmiana pozycjonowania i strategii marki',
      'Cennik składek i pakietów członkowskich',
      'Oficjalne stanowiska publiczne organizacji',
      'Nowe etaty poza zatwierdzoną strukturą',
    ],
    outOfScope: [
      'Codzienna egzekucja kampanii: konfiguracja reklam, publikacja postów',
      'Bieżące zarządzanie pracą zespołu i plan kwartalny — to zadanie managera',
      'Projektowanie grafik i produkcja materiałów',
      'Logistyka operacyjna wydarzeń',
      'Merytoryka regulacyjna i treść stanowisk publicznych — to zadanie zespołu policy. Dyrektor odpowiada za ich komunikację, nie za treść',
      'Administracja fakturami i zamówieniami',
    ],
    delegationErrors: [
      'Dyrektor-wykonawca: wciąganie w bieżącą operację, przez co strategia i budżet powstają po godzinach',
      'Zatrudnianie dyrektora do zespołu trzy- lub czteroosobowego. Wtedy realnie potrzebny jest manager, a tytuł dyrektora podnosi koszt bez dodania wartości',
      'Rozliczanie z liczby działań zamiast z wyniku',
      'Powierzanie roli rzecznika merytorycznego w sprawach regulacyjnych',
    ],
    focus: [
      { label: 'Strategia i planowanie', pct: 35 },
      { label: 'Budżet i zarząd', pct: 25 },
      { label: 'Relacje zewnętrzne', pct: 20 },
      { label: 'Nadzór nad zespołem', pct: 20 },
    ],
    metrics: [
      'Przyrost netto liczby członków i wskaźnik odejść',
      'Przychód ze składek oraz ze sponsoringu',
      'Koszt pozyskania członka',
      'Udział w głosie w mediach i w debacie branżowej',
      'Frekwencja i ocena wydarzeń flagowych',
      'Zwrot z budżetu marketingowego',
      'Realizacja planu rocznego',
    ],
    hardSkills: [
      'Strategia marketingu i marki',
      'Zarządzanie budżetem',
      'Marketing B2B i marketing członkowski',
      'Analityka i modelowanie wskaźników',
      'CRM i marketing automation',
      'Relacje z mediami',
    ],
    softSkills: [
      'Przywództwo',
      'Komunikacja z zarządem',
      'Negocjacje',
      'Myślenie strategiczne',
      'Zarządzanie interesariuszami',
    ],
    tools: ['GA4', 'CRM', 'Looker Studio', 'platforma eventowa', 'narzędzia AI'],
    path: 'Awans z roli marketing managera lub head of marketing. Dalej: CMO, VP Marketing, dyrektor generalny.',
    pay: {
      base: { q1: 15050, med: 21470, q3: 30300 },
      baseSrc: 'wyn_dyr',
      rec: [25000, 42000],
      recNote:
        'Hays: górne widełki marketing directora sięgają 42 000 zł, a digital marketing directora 36 500 zł. RocketJobs: dyrektor i CMO 28 000–45 000 zł i więcej.',
      izba: [26000, 34000],
    },
  },

  {
    key: 'mgr',
    letter: 'B',
    title: 'Manager marketingu',
    english: 'Marketing Manager / Team Leader',
    level: 'Menedżerski',
    oneLine: 'doprowadzenie zespołu tam, gdzie ustalono',
    purpose:
      'Przekłada strategię na plan i doprowadza go do wyniku. Odpowiada za realizację celów marketingowych: planowanie kampanii, budżet operacyjny, pracę zespołu specjalistów i rozliczenie efektów. Spotykają się tu trzy obszary: strategia, zarządzanie i analiza.',
    facts: [
      { label: 'Podlega', value: 'dyrektor ds. marketingu, a bez dyrektora wprost zarządowi' },
      { label: 'Zarządza', value: 'zespół 2–6 specjalistów, agencje, dostawcy' },
      { label: 'Doświadczenie', value: '5–8 lat, w tym 2+ z zespołem' },
      { label: 'Wykształcenie', value: 'wyższe, marketing lub zarządzanie' },
      { label: 'Język', value: 'angielski C1 przy pracy międzynarodowej' },
    ],
    duties: [
      {
        title: 'Planowanie i realizacja',
        items: [
          'Przełożenie strategii i celów biznesowych na plan roczny i kwartalny',
          'Planowanie i koordynacja kampanii dla organizacji, marki lub linii produktowej',
          'Priorytetyzacja: co robimy w tym kwartale i czego świadomie nie robimy',
        ],
      },
      {
        title: 'Zespół',
        items: [
          'Zarządzanie zespołem specjalistów: cele, podział zadań, bieżąca ocena',
          'Rozwój kompetencji, rekrutacja wspólnie z dyrektorem',
          'Usuwanie blokad i zapewnienie zasobów',
        ],
      },
      {
        title: 'Budżet operacyjny i dostawcy',
        items: [
          'Zarządzanie budżetem kampanijnym w ramach puli przyznanej przez dyrektora',
          'Negocjacje i umowy z dostawcami, kontrola kosztów',
          'Nadzór nad produkcją materiałów marketingowych i promocyjnych',
        ],
      },
      {
        title: 'Rynek i konkurencja',
        items: [
          'Monitorowanie rynku, działań organizacji podobnych i potrzeb grup docelowych',
          'Przekładanie wniosków z monitoringu na korektę planu',
        ],
      },
      {
        title: 'Analiza i raportowanie',
        items: [
          'Analiza efektów działań, raporty dla dyrektora i zarządu',
          'Decyzje o kontynuacji, korekcie lub wygaszeniu inicjatyw',
        ],
      },
      {
        title: 'W organizacji członkowskiej',
        items: [
          'Operacyjne prowadzenie programu członkowskiego: kalendarz komunikacji, cykl odnowień składek',
          'Koordynacja portfela wydarzeń jako całości, a nie pojedynczego wydarzenia',
          'Uzgodnienie celów i definicji wartościowego kontaktu z zespołem sprzedaży',
        ],
      },
    ],
    decides: [
      'Plan kwartalny i podział zadań w zespole',
      'Alokacja budżetu kampanijnego w ramach przyznanej puli',
      'Wybór i negocjacje z dostawcami do progu ustalonego przez dyrektora',
      'Kontynuacja, korekta lub wygaszenie kampanii',
      'Zatwierdzanie treści operacyjnych',
      'Bieżąca ocena pracy zespołu',
    ],
    needsApproval: [
      'Strategia, pozycjonowanie i roczny budżet',
      'Zatrudnienie i zwolnienie w zespole',
      'Wydatki powyżej ustalonego progu',
      'Wejście w nowy kanał lub nowy format wydarzenia',
      'Oficjalne stanowiska i wystąpienia w imieniu organizacji',
    ],
    outOfScope: [
      'Ustalanie strategii organizacji i architektury marki — to zadanie dyrektora',
      'Obrona budżetu przed zarządem i radą',
      'Decyzje o strukturze działu i liczbie etatów',
      'Cennik składek i pakietów, który należy do zarządu',
      'Samodzielna egzekucja kampanii cyfrowych — to zadanie specjalisty digital',
      'Logistyka wydarzeń — to zadanie koordynatora',
      'Merytoryka regulacyjna',
    ],
    delegationErrors: [
      'Zatrudnianie managera i dyrektora do zespołu trzy- lub czteroosobowego. Warstwa zarządcza robi się grubsza niż wykonawcza',
      'Tytuł managera bez zespołu i bez budżetu. To wtedy starszy specjalista, a nie manager, i płaca powinna to odzwierciedlać',
      'Porównywanie ofert po nazwie stanowiska. Ten sam tytuł oznacza w dwóch organizacjach zupełnie inny poziom odpowiedzialności, więc porównuj zakres',
      'Rozliczanie z wyniku kampanii bez oddania kontroli nad budżetem kampanijnym',
    ],
    focus: [
      { label: 'Planowanie i priorytety', pct: 30 },
      { label: 'Prowadzenie zespołu', pct: 30 },
      { label: 'Budżet i dostawcy', pct: 20 },
      { label: 'Analiza i raportowanie', pct: 20 },
    ],
    metrics: [
      'Realizacja planu kwartalnego',
      'Wykonanie budżetu wobec planu',
      'Wyniki kampanii: kontakty, konwersje, frekwencja',
      'Rotacja i rozwój zespołu',
      'Czas od briefu do startu kampanii',
      'Jakość współpracy ze sprzedażą i rozwojem członkostwa',
    ],
    hardSkills: [
      'Planowanie marketingowe',
      'Zarządzanie budżetem',
      'Zarządzanie zespołem',
      'Analityka i raportowanie',
      'Negocjacje z dostawcami',
      'Kanały B2B',
    ],
    softSkills: [
      'Delegowanie',
      'Priorytetyzacja',
      'Komunikacja międzydziałowa',
      'Coaching zespołu',
      'Odporność na presję terminów',
    ],
    tools: ['narzędzia do zarządzania projektami', 'CRM', 'GA4', 'Looker Studio', 'budżet w arkuszu lub systemie'],
    path:
      'Awans ze starszego specjalisty lub team leada. Dalej: dyrektor marketingu, a w strukturach międzynarodowych odpowiedzialność regionalna. Ścieżka nie musi prowadzić do dyrektora: część managerów rozwija się w głąb specjalizacji.',
    pay: {
      base: { q1: 9000, med: 11250, q3: 14940 },
      baseSrc: 'wyn_kier',
      rec: [14500, 27000],
      recNote:
        'Goldman Recruitment Salary Survey 2026: 14 500 zł dolny poziom, 16 500 zł mediana, 19 000 zł górny poziom. Hays: górne widełki do 30 000 zł. RocketJobs: Marketing Manager / Team Leader 18 000–27 000 zł i więcej.',
      izba: [18000, 24000],
      gold: 16500,
    },
  },

  {
    key: 'senior',
    letter: 'C',
    title: 'Starszy specjalista ds. marketingu',
    english: 'Senior Marketing Specialist',
    level: 'Ekspercki',
    oneLine: 'to, żeby zrobić to dobrze',
    purpose:
      'Samodzielnie planuje, prowadzi i optymalizuje działania w powierzonym obszarze — treści, marki, członkostwa lub kampanii efektywnościowych — i odpowiada za wynik tego obszaru. Jest merytorycznym punktem odniesienia dla mniej doświadczonych osób w zespole.',
    facts: [
      { label: 'Podlega', value: 'manager marketingu' },
      { label: 'Zarządza', value: 'brak podwładnych, prowadzi merytorycznie juniorów' },
      { label: 'Doświadczenie', value: '4–6 lat' },
      { label: 'Wykształcenie', value: 'wyższe plus certyfikaty branżowe' },
      { label: 'Język', value: 'angielski C1' },
    ],
    duties: [
      {
        title: 'Samodzielne prowadzenie działań',
        items: [
          'Kampanie i projekty od briefu przez realizację po rozliczenie',
          'Odpowiedzialność za wynik obszaru, nie tylko za wykonanie zadań',
          'Praca bez bieżącego nadzoru, z raportowaniem po kamieniach milowych',
        ],
      },
      {
        title: 'Taktyka i optymalizacja',
        items: [
          'Rekomendacje do planu rocznego i kwartalnego',
          'Hipotezy, testy A/B, iteracyjna poprawa wyników',
          'Standardy jakości i szablony dla działań powtarzalnych',
        ],
      },
      {
        title: 'Treści i pozycja ekspercka',
        items: [
          'Strategia treści, plan redakcyjny, redakcja materiałów merytorycznych',
          'Przekładanie raportów i stanowisk na komunikaty dla różnych grup odbiorców',
          'Prowadzenie formatów cyklicznych: newsletter tematyczny, seria komentarzy',
        ],
      },
      {
        title: 'Członkostwo i wsparcie sprzedaży',
        items: [
          'Kampanie pozyskania i utrzymania członków, komunikacyjny onboarding',
          'Materiały sprzedażowe: prezentacje, opisy pakietów, historie wdrożeń',
        ],
      },
      {
        title: 'Analityka i prowadzenie merytoryczne',
        items: [
          'Pogłębiona analiza wyników i atrybucji',
          'Wnioski i rekomendacje dla managera oraz raporty dla zarządu',
          'Wsparcie juniorów i koordynatora, przegląd treści przed publikacją',
          'Wdrażanie nowych narzędzi, w tym narzędzi AI',
        ],
      },
    ],
    decides: [
      'Taktyka i sposób realizacji w swoim obszarze',
      'Dobór narzędzi i metod w ramach istniejącego stacku',
      'Bieżąca optymalizacja i przesunięcia mniejszych budżetów kampanijnych w ramach planu',
      'Treści robocze i rekomendacje redakcyjne',
      'Harmonogram prac w swoim obszarze',
    ],
    needsApproval: [
      'Strategia i budżet całościowy',
      'Publikacja materiałów sygnowanych nazwą organizacji',
      'Nowe narzędzia generujące koszt stały',
      'Zmiany w pozycjonowaniu i komunikacji kluczowej',
      'Wystąpienia w imieniu organizacji',
    ],
    outOfScope: [
      'Zarządzanie zespołem i decyzje kadrowe',
      'Plan kwartalny dla całego działu — to zadanie managera',
      'Ustalanie strategii organizacji i jej oficjalnych stanowisk',
      'Czysta administracja i logistyka — to zadanie koordynatora',
      'Merytoryka regulacyjna',
      'Negocjowanie umów sponsoringowych',
    ],
    delegationErrors: [
      'Przeciążanie pracą administracyjną i produkcyjną, przez co traci się wartość ekspercką tej roli',
      'Odpowiedzialność za wynik bez wpływu na budżet i priorytety',
      'Brak formalnego uznania roli mentorskiej w ocenie i w wynagrodzeniu',
      'Nazywanie tej roli managerem bez oddania zespołu i budżetu',
    ],
    focus: [
      { label: 'Ekspercka realizacja', pct: 65 },
      { label: 'Analiza i taktyka', pct: 22 },
      { label: 'Prowadzenie juniorów', pct: 13 },
    ],
    metrics: [
      'Wyniki obszaru: kontakty, konwersje, zasięgi, pozycje w wyszukiwarce, otwarcia newslettera',
      'Jakość kontaktów członkowskich, nie tylko ich liczba',
      'Zwrot z kampanii w obszarze',
      'Tempo i skuteczność optymalizacji',
      'Postęp rozwojowy prowadzonych juniorów',
    ],
    hardSkills: [
      'Głęboka specjalizacja w jednym obszarze',
      'Zaawansowana analityka',
      'Zarządzanie kampanią i jej budżetem',
      'Strategia treści',
      'Marketing automation',
      'Praca z narzędziami AI',
    ],
    softSkills: [
      'Samodzielność',
      'Myślenie analityczne',
      'Dzielenie się wiedzą',
      'Komunikacja z osobami spoza marketingu',
    ],
    tools: ['GA4', 'Google Ads', 'LinkedIn Ads', 'Ahrefs lub Semrush', 'HubSpot lub ActiveCampaign', 'CRM'],
    path:
      'Awans ze stanowiska specjalisty. Dalej dwie ścieżki: menedżerska, czyli manager marketingu, albo ekspercka, czyli head of content lub performance lead.',
    pay: {
      base: { q1: 7780, med: 9320, q3: 11980 },
      baseSrc: 'nfj',
      rec: [14500, 20000],
      recNote:
        'RocketJobs: Senior Marketing Specialist 14 500–20 000 zł. CRP: senior 11 000–16 000 zł, mediana warszawska ok. 11 000 zł wobec 9 200–9 800 zł w innych dużych miastach. Hays: marketing specialist do 14 000 zł.',
      izba: [14500, 18000],
      target: [15000, 16000],
      targetNote: 'Punkt docelowy zamawiającego: 15 000–16 000 zł, czyli dolna trzecia część pasma RocketJobs.',
    },
  },

  {
    key: 'digital',
    letter: 'D',
    title: 'Specjalista ds. digital marketingu',
    english: 'Marketing Specialist (mid) / Digital Marketing Specialist',
    level: 'Wykonawczy specjalistyczny',
    oneLine: 'kanały cyfrowe i ich skuteczność',
    purpose:
      'Uruchamia, prowadzi i optymalizuje działania w kanałach cyfrowych: kampanie płatne, SEO, e-mail, social media i analitykę. Przekłada plan marketingowy na ruch, zapisy i pozyskane kontakty.',
    facts: [
      { label: 'Podlega', value: 'manager marketingu' },
      { label: 'Prowadzenie merytoryczne', value: 'starszy specjalista' },
      { label: 'Doświadczenie', value: '2–4 lata' },
      { label: 'Wykształcenie', value: 'certyfikaty ważniejsze niż dyplom' },
      { label: 'Język', value: 'angielski B2+' },
    ],
    duties: [
      {
        title: 'Kampanie płatne',
        items: [
          'Konfiguracja, prowadzenie i optymalizacja Google Ads, LinkedIn Ads i Meta Ads',
          'Zarządzanie budżetem mediowym w ramach zatwierdzonej puli',
          'Targetowanie, kampanie na listy kont w B2B, remarketing',
        ],
      },
      {
        title: 'SEO i serwis',
        items: [
          'Audyt i optymalizacja treści na stronie, dobór fraz',
          'Współpraca przy SEO technicznym, wskaźnikach Core Web Vitals i strukturze serwisu',
          'Optymalizacja pod wyszukiwanie konwersacyjne i odpowiedzi generowane przez AI',
          'Strony docelowe pod kampanie i rejestracje na wydarzenia',
        ],
      },
      {
        title: 'E-mail marketing i automatyzacja',
        items: [
          'Budowa i wysyłka newsletterów, segmentacja odbiorców',
          'Sekwencje dogrzewające kontakty',
          'Automatyzacje cyklu życia członka: powitanie, przypomnienie o składce, reaktywacja',
        ],
      },
      {
        title: 'Social media i wydarzenia',
        items: [
          'Realizacja planu publikacji, formaty natywne, moderacja i odpowiedzi',
          'Wsparcie profili osobistych liderów organizacji',
          'Kampanie rejestracyjne, przypomnienia i komunikacja po wydarzeniu',
        ],
      },
      {
        title: 'Analityka i raportowanie',
        items: [
          'GA4, Google Tag Manager, w tym tagowanie po stronie serwera, Consent Mode',
          'Modele atrybucji, panele wynikowe, rekomendacje optymalizacyjne',
        ],
      },
    ],
    decides: [
      'Bieżąca optymalizacja kampanii: stawki, grupy odbiorców, warianty kreacji w ramach zatwierdzonej linii',
      'Dobór słów kluczowych i grup docelowych',
      'Harmonogram publikacji w ramach kalendarza',
      'Testy A/B w ramach przyznanego budżetu',
    ],
    needsApproval: [
      'Wysokość budżetu mediowego i wejście w nowy kanał',
      'Nowe narzędzia z kosztem stałym',
      'Kreacje i komunikaty sygnowane marką',
      'Zmiany na stronie głównej i w strukturze serwisu',
      'Wysyłka do całej bazy członkowskiej',
    ],
    outOfScope: [
      'Strategia całego marketingu i budżet działu',
      'Plan kwartalny i priorytety zespołu',
      'Decyzje o pozycjonowaniu marki',
      'Logistyka wydarzeń i administracja fakturami',
      'Merytoryka regulacyjna',
      'Negocjacje sponsoringowe',
    ],
    delegationErrors: [
      'Mylenie roli ze specjalistą social media i pozbawianie jej komponentu analitycznego. Hays wskazuje trudniejszy rynek dla kandydatów z tradycyjnego SEO, social mediów i e-mail marketingu, czyli obszarów podlegających automatyzacji. Brak kompetencji AI-native obniża widełki o 20–30 procent',
      'Rozliczanie z liczby pozyskanych kontaktów bez wpływu na jakość oferty i na budżet',
      'Oczekiwanie kompetencji programistycznych bez zaplecza technicznego',
    ],
    focus: [
      { label: 'Kampanie i kanały', pct: 55 },
      { label: 'Produkcja treści cyfrowych', pct: 25 },
      { label: 'Analityka i raportowanie', pct: 20 },
    ],
    metrics: [
      'Koszt pozyskania kontaktu i koszt akcji',
      'Liczba i jakość kontaktów kwalifikowanych marketingowo',
      'Konwersja rejestracji na wydarzenia',
      'Ruch organiczny i pozycje kluczowych fraz',
      'Otwarcia i kliknięcia newslettera',
      'Zwrot z wydatku reklamowego',
      'Zaangażowanie na LinkedIn',
    ],
    hardSkills: [
      'Google Ads, LinkedIn Ads i Meta Ads',
      'SEO i SEM',
      'GA4 i Google Tag Manager',
      'Marketing automation',
      'Podstawy HTML i pracy w CMS',
    ],
    softSkills: ['Analityczność', 'Dbałość o szczegóły', 'Samodzielność w rutynie', 'Ciekawość narzędziowa'],
    tools: ['GA4', 'Google Ads', 'LinkedIn Campaign Manager', 'Semrush lub Ahrefs', 'Looker Studio', 'narzędzie do mailingu'],
    path:
      'Awans z juniora lub z koordynatora. Dalej: starszy specjalista, performance manager, albo specjalizacja jako SEO lead lub paid media manager.',
    pay: {
      base: { q1: 6430, med: 7960, q3: 10110 },
      baseSrc: 'wyn_spec',
      rec: [9500, 15000],
      recNote:
        'RocketJobs: Marketing Specialist (mid) 9 500–14 000 zł. Hays: digital marketing specialist do 15 000 zł. Indeed: średnia warszawska 8 488 zł.',
      izba: [11000, 14000],
      target: [12000, 12000],
      targetNote: 'Punkt docelowy zamawiającego: 12 000 zł, czyli środek pasma RocketJobs dla poziomu mid.',
    },
  },

  {
    key: 'koord',
    letter: 'E',
    title: 'Koordynator marketingu',
    english: 'Marketing Coordinator',
    level: 'Operacyjny',
    oneLine: 'to, żeby zadziało się na czas',
    purpose:
      'Zapewnia, że zaplanowane działania są realizowane terminowo, sprawnie i zgodnie ze standardem. Spina projekty, wydarzenia, dostawców i materiały. To rola wykonawczo-organizacyjna, zwykle bez podwładnych.',
    facts: [
      { label: 'Podlega', value: 'manager marketingu' },
      { label: 'Zarządza', value: 'brak podwładnych, koordynuje dostawców' },
      { label: 'Doświadczenie', value: '1–3 lata' },
      { label: 'Wykształcenie', value: 'wyższe lub w trakcie studiów' },
      { label: 'Język', value: 'angielski B2+' },
    ],
    duties: [
      {
        title: 'Koordynacja projektów i kampanii',
        items: [
          'Harmonogramy, listy zadań, statusy, pilnowanie terminów i zależności',
          'Briefy dla wykonawców, zbieranie i konsolidacja uwag',
          'Prowadzenie kalendarza marketingowego i redakcyjnego',
        ],
      },
      {
        title: 'Operacja wydarzeń',
        items: [
          'Rejestracje uczestników, listy gości, identyfikatory, materiały konferencyjne',
          'Koordynacja dostawców: sala, catering, druk, foto i wideo, tłumaczenia',
          'Wsparcie na miejscu oraz działania po wydarzeniu',
        ],
      },
      {
        title: 'Produkcja i publikacja',
        items: [
          'Publikacja treści według zatwierdzonego planu',
          'Aktualizacja strony i podstron wydarzeń w CMS',
          'Przygotowanie i wysyłka newslettera na gotowym szablonie',
        ],
      },
      {
        title: 'Administracja marketingu',
        items: [
          'Zamówienia, faktury, ewidencja wydatków, rozliczenia z dostawcami',
          'Porządek w bazach: CRM, listy mailingowe, repozytorium plików i zdjęć',
          'Stany materiałów promocyjnych',
        ],
      },
      {
        title: 'Raportowanie operacyjne',
        items: [
          'Zestawienia statusów projektów i raporty po wydarzeniach',
          'Podstawowy monitoring mediów i aktywności organizacji podobnych',
        ],
      },
    ],
    decides: [
      'Organizacja własnej pracy i kolejność zadań w ramach terminów',
      'Bieżące ustalenia z dostawcami w granicach zatwierdzonego zakresu i budżetu',
      'Dobór terminu publikacji w ramach kalendarza',
      'Drobne korekty redakcyjne i formatowanie',
    ],
    needsApproval: [
      'Treści publikowane w imieniu organizacji',
      'Każdy wydatek poza zatwierdzonym budżetem projektu',
      'Zmiana zakresu lub terminu projektu',
      'Kontakt z mediami i wypowiedzi zewnętrzne',
      'Wybór nowego dostawcy',
    ],
    outOfScope: [
      'Tworzenie strategii marketingowej i decyzje o pozycjonowaniu',
      'Zarządzanie budżetem działu i decyzje kadrowe',
      'Konfiguracja i optymalizacja kampanii płatnych',
      'Zaawansowana analityka i atrybucja',
      'Samodzielne reprezentowanie organizacji na zewnątrz',
      'Negocjowanie umów sponsoringowych',
    ],
    delegationErrors: [
      'Nazwanie roli koordynatorem przy jednoczesnym oczekiwaniu kompetencji i odpowiedzialności managera. To najczęstszy błąd rynkowy przy tym tytule',
      'Rozliczanie z wyników kampanii bez dania uprawnień i narzędzi do ich optymalizacji',
      'Traktowanie roli jako zbioru zadań, które zostały. Zakres rozmywa się i rola przestaje być mierzalna',
    ],
    focus: [
      { label: 'Koordynacja projektów', pct: 35 },
      { label: 'Operacja wydarzeń', pct: 30 },
      { label: 'Administracja', pct: 20 },
      { label: 'Wsparcie treści', pct: 15 },
    ],
    metrics: [
      'Terminowość zadań, czyli udział zadań wykonanych w terminie',
      'Sprawność organizacji wydarzeń: brak incydentów, rozliczenie w budżecie',
      'Kompletność i aktualność CRM oraz baz kontaktowych',
      'Czas reakcji na zgłoszenia wewnętrzne',
      'Poprawność rozliczeń z dostawcami',
    ],
    hardSkills: [
      'Zarządzanie projektami',
      'Obsługa CMS',
      'Narzędzia do harmonogramowania publikacji',
      'Podstawy analityki',
      'Podstawy redakcji tekstu',
      'Arkusze kalkulacyjne',
    ],
    softSkills: ['Skrupulatność', 'Wielozadaniowość', 'Komunikatywność', 'Proaktywność', 'Odporność na zmienny priorytet'],
    tools: ['Asana, Trello lub Monday', 'Canva', 'CMS strony', 'narzędzie do mailingu', 'CRM', 'platforma rejestracji'],
    path:
      'Awans z asystenta lub ze stażu. Dalej: specjalista ds. marketingu, następnie starszy specjalista i manager. Alternatywna specjalizacja: event marketing manager.',
    pay: {
      base: { q1: 9000, med: 11250, q3: 14940 },
      baseSrc: 'wyn_kier',
      baseNote: 'Agregat „kierownik plus koordynator”, zawyżony wobec roli operacyjnej.',
      rec: [7500, 11000],
      recNote:
        'RocketJobs: poziom junior 6 000–9 000 zł. Zarabiaj.pl: średnia koordynatora 10 865 zł, ale pod tym tytułem kryją się też role menedżerskie.',
      izba: [8000, 11000],
    },
  },
];

export const roleByKey = (key: string): Role => ROLES.find((r) => r.key === key) ?? ROLES[0];
