import React from 'react';
// Importowanie ikon z biblioteki lucide-react, używanych do reprezentowania usług i statystyk.
import { Briefcase, Gavel, TrendingUp, Scale, GraduationCap, Percent } from 'lucide-react';

// Dane dla sekcji Usługi. Jest to tablica obiektów, gdzie każdy obiekt opisuje jedną usługę.
const servicesData = [
  {
    // Ikona dla usługi.
    icon: Briefcase,
    // Główny tytuł usługi.
    title: 'Restrukturyzacja',
    // Krótki podtytuł, hasło reklamowe.
    subtitle: 'Twoja szansa na stabilność',
    // Szczegółowy opis usługi.
    description: 'Znajdujemy przyczyny problemów i przygotowujemy wniosek do sądu wraz z propozycjami układu dla wierzycieli. Następnie prowadzimy negocjacje i reprezentujemy w sądzie, nadzorując wykonanie planu aż do odzyskania przez firmę stabilności finansowej.',
    // Tekst przycisku CTA (Call to Action).
    buttonText: 'Umów konsultacje',
  },
  {
    icon: Gavel,
    title: 'Upadłość Konsumecka',
    subtitle: 'Twoja szansa na nowy start',
    description: 'Jako kancelaria wspieramy w procesie upadłości konsumenckiej. Pomagamy złożyć kompletny wniosek do sądu. Po ogłoszeniu upadłości przez sąd, Po jego wykonaniu sąd umarza resztę zobowiązań, dając szansę na nowy start.',
    buttonText: 'Umów konsultacje',
  },
  {
    icon: TrendingUp,
    title: 'Doradztwo strategiczne',
    subtitle: 'Twoja szansa na płynność finansową',
    description: 'Doradztwo strategiczne to pomoc dla firm w planowaniu ich przyszłości i podejmowaniu kluczowych decyzji. Chodzi o analizę rynku i konkurencji, aby ustalić najlepszy kierunek rozwoju i osiągnąć długoterminowe cele.',
    buttonText: 'Umów konsultacje',
  },
];

/**
 * Komponent ServiceCard (Karta Usługi).
 * Wyświetla pojedynczą kartę z informacjami o usłudze.
 * @param {object} props - Właściwości komponentu.
 * @param {React.ComponentType} props.icon - Komponent ikony (z lucide-react).
 * @param {string} props.title - Tytuł usługi.
 * @param {string} props.subtitle - Podtytuł/hasło usługi.
 * @param {string} props.description - Opis usługi.
 * @param {string} props.buttonText - Tekst na przycisku CTA.
 */
const ServiceCard = ({ icon: Icon, title, subtitle, description, buttonText }) => (
  // Główny kontener karty z responsywnym stylem i efektem hover.
  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-t-4 border-red-700">
    {/* Sekcja ikony i tytułu */}
    <div className="flex items-center mb-4">
      {/* Kontener ikony w czerwonym kółku */}
      <div className="p-3 bg-red-800 rounded-lg mr-4 shadow-md">
        {/* Renderowanie dynamicznie przekazanej ikony */}
        <Icon className="text-white w-6 h-6" />
      </div>
      {/* Tytuł usługi */}
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    
    {/* Podtytuł usługi */}
    <p className="text-base font-bold text-red-700 mb-2">{subtitle}</p>
    
    {/* Opis usługi */}
    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
      {description}
    </p>
    
    {/* Przycisk CTA (Call to Action). Adres URL generowany na podstawie tytułu. */}
    <a 
      href={`/${title.toLowerCase().replace(/\s+/g, '-')}`} // Dynamicznie tworzy ścieżkę (np. /restrukturyzacja)
      className="block w-full text-center px-6 py-3 text-white bg-red-800 hover:bg-red-900 transition duration-300 font-medium rounded-lg shadow-lg"
    >
      {buttonText}
    </a>
  </div>
);

// Dane dla sekcji Statystyk.
const statsData = [
  {
    value: '2000+',
    label: 'Rozwiązanych spraw',
    icon: Scale, // Ikona wagi
  },
  {
    value: '18+',
    label: 'Lat doświadczenia',
    icon: GraduationCap, // Ikona czapki
  },
  {
    value: '98%',
    label: 'Zadowolonych klientów',
    icon: Percent, // Ikona procentu
  },
];

/**
 * Komponent StatCard (Karta Statystyki).
 * Wyświetla pojedynczą statystykę z wartością, etykietą i dużą ikoną w tle.
 * @param {object} props - Właściwości komponentu.
 * @param {string} props.value - Wartość statystyki (np. "2000+").
 * @param {string} props.label - Etykieta statystyki.
 * @param {React.ComponentType} props.icon - Komponent ikony (z lucide-react) do tła.
 */
const StatCard = ({ value, label, icon: Icon }) => (
  <div 
    className="bg-white p-6 sm:p-8 min-h-[200px] flex justify-center items-center rounded-lg border border-gray-100 shadow-md transition-shadow duration-300 hover:shadow-xl relative overflow-hidden text-center"
  >
    {/* Warstwa z dużą, przezroczystą ikoną w tle dla efektu wizualnego */}
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
      {/* Ikona zajmująca dużą część karty z niską przezroczystością */}
      {Icon && <Icon className="w-[80%] h-[80vh] text-red-50 opacity-80" />}
    </div>

    {/* Zawartość karty (wartość i etykieta) umieszczona na wierzchu (z-10) */}
    <div className="relative z-10">
      {/* Wartość statystyki (np. 2000+) */}
      <p className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2">
        {value}
      </p>
      {/* Etykieta statystyki */}
      <p className="text-base font-medium text-gray-600 border-t border-red-200 pt-3">
        {label}
      </p>
    </div>
  </div>
);

/**
 * Komponent StandardImage.
 * Prosty komponent do wyświetlania obrazów, używający tagu <img>.
 * Implementuje logikę "fill" dla object-fit.
 */
const StandardImage = ({ src, alt, fill, style, className }) => {
    // Określenie, czy obraz ma wypełniać kontener (cover) czy mieścić się (contain/inne).
    const objectFit = fill ? 'cover' : (style?.objectFit || 'contain');

    return (
      <img
        src={src}
        alt={alt}
        // Ustawienie szerokości, wysokości i objectFit w stylu.
        style={{ ...style, width: '100%', height: '100%', objectFit }}
        className={className}
      />
    );
  };

/**
 * Główny komponent strony (App).
 * Odpowiada za cały układ strony głównej, składając wszystkie sekcje i komponenty.
 */
const App = () => {
  // Ścieżki do obrazów używanych w sekcji Hero i O Nas.
  const specialistImageSrc = "/hero.png";
  const officeImageSrc = "/home.webp ";

  return (
    // Główny kontener strony.
    <div className="font-sans">
      
      {/* Sekcja 1: Hero (nagłówek) */}
      <section className="w-full h-[100vh] mx-auto flex flex-col lg:flex-row min-h-[500px] bg-white overflow-hidden shadow-xl">
        
        {/* Lewa kolumna: Treść nagłówka */}
        <div className="flex-1 w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center z-10 text-center lg:text-left">
          
          {/* Tag "TWOI" */}
          <div className="flex justify-center lg:justify-start">
            <p className="text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
              TWOI
            </p>
          </div>
          
          {/* Główny tytuł */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900 mt-2 mb-4">
            Specjaliści od <span className="block lg:inline">ciężkich przypadków</span>
          </h1>
          
          {/* Podtytuł/opis */}
          <p className="text-lg text-gray-600 mb-8">
            Nie jesteś tylko kolejną sprawą, słuchamy pomagamy tworzymy lepsze jutro
          </p>
          
          {/* Przyciski CTA */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a 
              href="/konsultacja" 
              className="px-6 py-3 text-white bg-red-700 hover:bg-red-800 transition duration-300 font-medium rounded shadow-md border border-red-700 text-sm sm:text-base whitespace-nowrap"
            >
              Umów darmową konsultację
            </a>
            <a 
              href="/czytaj-dalej" 
              className="px-6 py-3 text-red-700 bg-white hover:bg-red-50 transition duration-300 font-medium rounded border border-red-700 text-sm sm:text-base whitespace-nowrap"
            >
              Czytaj dalej
            </a>
          </div>
        </div>
        
        {/* Prawa kolumna: Grafika (ukryta na małych ekranach, widoczna od lg) */}
        <div className="hidden lg:relative lg:w-1/2 md:w-1/2 lg:flex justify-center lg:justify-end items-center lg:h-[100vh]">
          
          {/* Warstwa geometryczna w tle (skośny prostokąt dla efektu wizualnego) */}
          <div className="absolute inset-0 bg-[#A37F7F] transform skew-x-[-15deg] translate-x-1/3 origin-top-left z-10"></div>

          {/* Kontener na obrazek specjalisty */}
          <div className="relative w-[100%] h-[80vh] lg:h-[100vh] z-20 my-auto">
              <div 
                  className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                <StandardImage
                    src={specialistImageSrc} 
                    alt="Portret specjalisty" 
                    fill={true} 
                    style={{ objectFit: 'cover' }}
                    className="object-cover"
                />
                 
              </div>
          </div>
        </div>
      </section>

      {/* Sekcja 2: Statystyki i Wyniki */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Tag "Warto" */}
          <p className="inline-block text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 text-white rounded-2xl uppercase">
            Warto
          </p>
          {/* Tytuł sekcji statystyk */}
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-12">
            Poznaj nasze wyniki
          </h2>

          {/* Siatka kart statystyk. Mapowanie po danych statsData. */}
          <div 
            className="grid gap-6 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {statsData.map((stat, index) => (
              <StatCard 
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja 3: O nas (z obrazkiem biura) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Układ dwukolumnowy (odwrócony na małych ekranach) */}
          <div className="flex flex-col-reverse lg:flex-row items-center lg:space-x-12">
            
            {/* Lewa kolumna (na desktopie): Obrazek biura */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 order-2 lg:order-1">
              <div className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] relative rounded-3xl overflow-hidden shadow-2xl">
                <div 
                    className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm"
                >
                    <StandardImage
                        src={officeImageSrc} 
                        alt="Sala konferencyjna kancelarii" 
                        fill={true} 
                        style={{ objectFit: 'cover' }}
                        className="object-cover"
                    />
                </div>
              </div>
            </div>

            {/* Prawa kolumna (na desktopie): Treść "Parę słów o nas" */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
                Parę słów o nas
              </h2>
              
              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                Nie jesteśmy tylko kolejną kancelarią.
                Jesteśmy Siecią Kancelarii Prawnych o zasięgu globalnym, aczkolwiek z absolutnie polskimi korzeniami i z siedzibą główną w Polsce, reprezentującą naszych Klientów w bardzo szerokim pojmowaniu tego słowa.
              </p>
              
              <p className="text-base text-gray-700 mb-8 leading-relaxed">
                Pozyskujemy naszym klientom dotacje unijne oraz prowadzimy procesy prywatnych inwestycji kapitałowych (Fundusze z Polski, krajów pozaunijnych, oraz krajów Beneluksu). Pomagamy w zakupach nieruchomości, sprzedaży, doinwestowaniu firm oraz tworzeniu biznesplanów.
              </p>
              
              {/* Przycisk "Dowiedz się więcej" */}
              <a 
                href="/o-nas" 
                className="inline-block px-8 py-3 text-white bg-red-800 hover:bg-red-900 transition duration-300 font-medium rounded shadow-lg"
              >
                Dowiedz się więcej
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sekcja 4: Usługi (z kartami ServiceCard) */}
      <section 
        className="py-16 md:py-24 bg-[#FCEFEE] min-h-[500px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Tag sekcji */}
          <p className="inline-block text-sm font-bold bg-red-800 pt-1 pb-1 pl-5 pr-5 text-white rounded-md uppercase tracking-wider">
            Twoje wyjście na prostą
          </p>
          
          {/* Tytuł sekcji usług */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 mb-3">
            Stosujemy rozwiązania które działają
          </h2>

          {/* Opis sekcji */}
          <p className="text-base text-gray-600 mb-12">
            To nie są puste obietnice a realne sposoby na pomoc, tobie twojej firmie i rodzinie <br className="hidden sm:inline" />
            Przeczytaj, zobacz i napisz do nas
          </p>

          {/* Siatka kart usług. Mapowanie po servicesData. */}
          <div 
            className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10"
          >
            {servicesData.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                buttonText={service.buttonText}
              />
            ))}
          </div>
          
          {/* Link do pełnej oferty */}
          <a 
            href="/oferta" 
            className="inline-block text-base font-semibold text-gray-700 hover:text-red-700 transition duration-300 border-b-2 border-transparent hover:border-red-700 mt-6"
          >
            Zobacz więcej
          </a>

        </div>
      </section>


    </div>
  );
};

// Eksport głównego komponentu strony.
export default App;
