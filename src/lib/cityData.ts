
// --- DEFINICJA TYPÓW DANYCH ---
interface FaqItem {
    question: string;
    answer: string;
}

interface CaseStudy {
    id: number;
    debtAmount: string;
    remissionPercentage: number;
    remissionAmount: string;
    repaymentPlan: string;
    description: string;
    client: string; // np. "Pani Gosia, 41 lat, Wrocław"
}

export interface CityData {
    slug: string;
    cityName: string; // np. "Wrocław"
    cityNameGenitive: string; // np. "Wrocławia" (dopełniacz)

    // SEO Meta
    metaTitle: string; // max 30-60 znaków
    metaDescription: string; // max 90-160 znaków

    // Treść strony
    heroTitle: string; // max 30 znaków
    heroDescription: string; // max 90 znaków
    localFaqs: FaqItem[];
    localCaseStudies: CaseStudy[];
}

// --- DANE DLA STATYSTYK (SĄ GLOBALNE) ---
// Przekazujemy 'iconName' jako string, aby uniknąć błędu "non-plain object"
export const nationalStats = [
    { value: '2000+', label: 'Rozwiązanych spraw', iconName: 'Scale' },
    { value: '18+', label: 'Lat doświadczenia', iconName: 'GraduationCap' },
    { value: '98%', label: 'Zadowolonych klientów', iconName: 'Percent' },
];

// --- GŁÓWNA BAZA DANYCH MIAST ---
const allCityData: CityData[] = [
    // 1. Wrocław
    {
        slug: 'wroclaw',
        cityName: 'Wrocław',
        cityNameGenitive: 'Wrocławia',
        metaTitle: 'Oddłużanie Wrocław | NPO', // 23 znaki
        metaDescription: 'Upadłość konsumencka i restrukturyzacja we Wrocławiu. Bezpłatna analiza. Pomoc NPO.', // 86 znaków
        heroTitle: 'Oddłużanie we Wrocławiu', // 22 znaki
        heroDescription: 'Jesteśmy na miejscu. Pomagamy mieszkańcom Wrocławia wyjść na prostą. Zacznij od nowa.', // 85 znaków
        localFaqs: [
            { question: 'Gdzie złożyć wniosek we Wrocławiu?', answer: 'Wnioski o upadłość konsumencką dla Wrocławia składa się do Sądu Rejonowego dla Wrocławia-Fabrycznej.' },
            { question: 'Ile kosztuje upadłość we Wrocławiu?', answer: 'Koszty sądowe są stałe. Nasze wynagrodzenie jest ustalane indywidualnie po bezpłatnej analizie.' },
            { question: 'Czy restrukturyzacja we Wrocławiu jest dla mnie?', answer: 'Jeśli masz firmę w tarapatach, restrukturyzacja może być lepsza niż upadłość. Skontaktuj się, przeanalizujemy to.' },
        ],
        localCaseStudies: [
            { id: 1, debtAmount: '96 tys.', remissionPercentage: 100, remissionAmount: '96 000 zł', repaymentPlan: 'brak planu spłaty', description: 'Po rozwodzie klientka została z długami zaciągniętymi wspólnie z byłym partnerem. Wychowując dwójkę dzieci bez stałej pracy, nie miała szans na regulowanie zobowiązań.', client: 'Pani Gosia, 41 lat, Wrocław' },
        ],
    },
    // 2. Warszawa
    {
        slug: 'warszawa',
        cityName: 'Warszawa',
        cityNameGenitive: 'Warszawy',
        metaTitle: 'Oddłużanie Warszawa | NPO', // 24 znaki
        metaDescription: 'Upadłość konsumencka i restrukturyzacja w Warszawie. Kancelaria NPO. Bezpłatna analiza.', // 89 znaków
        heroTitle: 'Oddłużanie w Warszawie', // 23 znaki
        heroDescription: 'Działamy w stolicy. Pomagamy mieszkańcom Warszawy w restrukturyzacji i upadłości.', // 87 znaków
        localFaqs: [
            { question: 'Który sąd w Warszawie jest właściwy?', answer: 'Właściwy jest Sąd Rejonowy dla m.st. Warszawy, XVIII Wydział Gospodarczy ds. Upadłościowych.' },
            { question: 'Czy mogę ogłosić upadłość w Warszawie?', answer: 'Tak. Nasi eksperci z Warszawy przeprowadzą Cię przez cały proces. Zacznij od analizy.' },
        ],
        localCaseStudies: [
            { id: 2, debtAmount: '142 tys.', remissionPercentage: 91, remissionAmount: '129 220 zł', repaymentPlan: '355 zł / 30 m-cy', description: 'Klient, emeryt z Warszawy, miał zajętą część świadczenia. Zadłużenie rosło latami. Po naszej analizie, sąd ogłosił upadłość i zatwierdził plan spłaty.', client: 'Pan Marian, 68 lat, Warszawa' },
        ],
    },
    // 3. Kraków
    {
        slug: 'krakow',
        cityName: 'Kraków',
        cityNameGenitive: 'Krakowa',
        metaTitle: 'Oddłużanie Kraków | NPO', // 22 znaki
        metaDescription: 'Upadłość konsumencka i restrukturyzacja w Krakowie. Skuteczna pomoc NPO. Bezpłatna analiza.', // 90 znaków
        heroTitle: 'Oddłużanie w Krakowie', // 21 znaki
        heroDescription: 'Twoja kancelaria w Krakowie. Oferujemy pomoc w upadłości gospodarczej i konsumenckiej.', // 87 znaków
        localFaqs: [
            { question: 'Jak zacząć oddłużanie w Krakowie?', answer: 'Skontaktuj się z nami. Przeprowadzimy analizę i przygotujemy wniosek do sądu w Krakowie.' },
        ],
        localCaseStudies: [
            { id: 4, debtAmount: '290 tys.', remissionPercentage: 90, remissionAmount: '261 200 zł', repaymentPlan: '800 zł / 36 m-cy', description: 'Klient po pandemii musiał zamknąć działalność gospodarczą. Został z niespłaconymi leasingami.', client: 'Pan Marcin, 39 lat, Kraków' },
        ],
    },

    // --- SZABLONY DLA POZOSTAŁYCH MIAST ---
    // Uzupełnij je unikalną treścią dla "hiper SEO"

    { slug: 'lodz', cityName: 'Łódź', cityNameGenitive: 'Łodzi', metaTitle: 'Oddłużanie Łódź | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Łodzi. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Łodzi', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Łodzi i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'poznan', cityName: 'Poznań', cityNameGenitive: 'Poznania', metaTitle: 'Oddłużanie Poznań | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Poznaniu. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Poznaniu', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Poznaniu i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'gdansk', cityName: 'Gdańsk', cityNameGenitive: 'Gdańska', metaTitle: 'Oddłużanie Gdańsk | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Gdańsku. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Gdańsku', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Gdańsku i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'szczecin', cityName: 'Szczecin', cityNameGenitive: 'Szczecina', metaTitle: 'Oddłużanie Szczecin | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Szczecinie. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Szczecinie', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Szczecinie i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'bydgoszcz', cityName: 'Bydgoszcz', cityNameGenitive: 'Bydgoszczy', metaTitle: 'Oddłużanie Bydgoszcz | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Bydgoszczy. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Bydgoszczy', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Bydgoszczy i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'lublin', cityName: 'Lublin', cityNameGenitive: 'Lublina', metaTitle: 'Oddłużanie Lublin | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Lublinie. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Lublinie', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Lublinie i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'bialystok', cityName: 'Białystok', cityNameGenitive: 'Białegostoku', metaTitle: 'Oddłużanie Białystok | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Białymstoku. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Białymstoku', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Białymstoku i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'katowice', cityName: 'Katowice', cityNameGenitive: 'Katowic', metaTitle: 'Oddłużanie Katowice | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Katowicach. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Katowicach', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Katowicach i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'gdynia', cityName: 'Gdynia', cityNameGenitive: 'Gdyni', metaTitle: 'Oddłużanie Gdynia | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Gdyni. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Gdyni', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Gdyni i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'czestochowa', cityName: 'Częstochowa', cityNameGenitive: 'Częstochowy', metaTitle: 'Oddłużanie Częstochowa | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Częstochowie. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Częstochowie', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Częstochowie i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'radom', cityName: 'Radom', cityNameGenitive: 'Radomia', metaTitle: 'Oddłużanie Radom | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Radomiu. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Radomiu', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Radomiu i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'sosnowiec', cityName: 'Sosnowiec', cityNameGenitive: 'Sosnowca', metaTitle: 'Oddłużanie Sosnowiec | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Sosnowcu. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Sosnowcu', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Sosnowcu i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'torun', cityName: 'Toruń', cityNameGenitive: 'Torunia', metaTitle: 'Oddłużanie Toruń | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Toruniu. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Toruniu', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Toruniu i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'kielce', cityName: 'Kielce', cityNameGenitive: 'Kielc', metaTitle: 'Oddłużanie Kielce | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Kielcach. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Kielcach', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Kielcach i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'rzeszow', cityName: 'Rzeszów', cityNameGenitive: 'Rzeszowa', metaTitle: 'Oddłużanie Rzeszów | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Rzeszowie. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Rzeszowie', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Rzeszowie i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'gliwice', cityName: 'Gliwice', cityNameGenitive: 'Gliwic', metaTitle: 'Oddłużanie Gliwice | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Gliwicach. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Gliwicach', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Gliwicach i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'zabrze', cityName: 'Zabrze', cityNameGenitive: 'Zabrza', metaTitle: 'Oddłużanie Zabrze | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Zabrzu. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Zabrzu', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Zabrzu i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'olsztyn', cityName: 'Olsztyn', cityNameGenitive: 'Olsztyna', metaTitle: 'Oddłużanie Olsztyn | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Olsztynie. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Olsztynie', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Olsztynie i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'bielsko-biala', cityName: 'Bielsko-Biała', cityNameGenitive: 'Bielska-Białej', metaTitle: 'Oddłużanie Bielsko-Biała | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Bielsku-Białej. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Bielsku-Białej', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Bielsku-Białej i okolicach.', localFaqs: [], localCaseStudies: [] },
    { slug: 'bytom', cityName: 'Bytom', cityNameGenitive: 'Bytomia', metaTitle: 'Oddłużanie Bytom | NPO', metaDescription: 'Upadłość konsumencka i restrukturyzacja w Bytomiu. Bezpłatna analiza NPO.', heroTitle: 'Oddłużanie w Bytomiu', heroDescription: 'Skuteczna pomoc prawna w oddłużaniu. Działamy w Bytomiu i okolicach.', localFaqs: [], localCaseStudies: [] },
];

// --- FUNKCJE POMOCNICZE ---
export function getCityData(slug: string): CityData | undefined {
    return allCityData.find(city => city.slug === slug);
}

export const ALL_CITY_SLUGS = allCityData.map(city => ({
    miasto: city.slug,
}));