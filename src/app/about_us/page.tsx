import React from 'react';

// Główny komponent strony "O Nas".
export default function AboutUs() {
    
    // Definicja stylu tła dla sekcji Hero, wskazująca na lokalny plik 'bg.jpg'.
    const heroBackgroundStyle = {
        backgroundImage: "url('/bg.jpg')",
    };
    
    // Stała przechowująca niestandardowy kolor marki (#700806), używana dla spójności.
    const customColor = '#700806';

    return (
        <main className="font-sans antialiased">
            
            {/* SEKCJA 1: HERO - Tytułowa sekcja "O Nas" z tłem i wezwaniem do działania. */}
            <div 
                className="w-full min-h-screen bg-cover bg-center shadow-xl flex flex-col items-center justify-center gap-10 sm:gap-16 py-20 px-4"
                style={heroBackgroundStyle}
            >
                
                {/* Tytuł główny - responsywne rozmiary czcionki i cień dla czytelności na tle obrazu. */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white text-center drop-shadow-lg">
                    O nas
                </h1>
                
                
                {/* Opis tekstowy - ograniczony maksymalną szerokością. */}
                <span className="text-base sm:text-lg lg:text-xl max-w-3xl block text-center leading-relaxed drop-shadow-lg text-white px-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </span>

                
                {/* Przycisk akcji - używa customColor, z efektem hover i skalowania. */}
                <button className="bg-[#700806] hover:bg-[#5a0604] text-white font-bold py-3 px-6 rounded-sm shadow-lg transition duration-300 ease-in-out cursor-pointer transform hover:scale-105">
                    Czytaj więcej...
                </button>
            </div>

            
            {/* SEKCJA 2: MISJA I WARTOŚCI - Sekcja dwukolumnowa (tekst i obraz) z responsywnym odwróceniem kolejności. */}
            <div className="w-full bg-white py-20 px-6 lg:px-12 xl:px-24 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 md:gap-16">
                
                
                {/* Lewa Kolumna: Tekst i Przyciski (na desktopie po lewej, na mobile na dole). */}
                <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start justify-center gap-6 sm:gap-8 text-center lg:text-left">
                    
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
                        Nasza misja i wartości
                    </h2>
                    
                    
                    <span className="text-base sm:text-lg text-gray-600 max-w-xl lg:max-w-none">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </span>
                    
                    
                    <div className="flex gap-4 mt-4">
                        <button className="bg-[#700806] hover:bg-[#5a0604] text-white font-bold py-3 px-6 rounded-sm shadow-lg transition duration-300 ease-in-out cursor-pointer">Zadzwoń</button>
                        {/* Przycisk z ramką w kolorze customColor. */}
                        <button className="border-[#700806] border-2 text-[#700806] hover:bg-red-50 font-bold py-3 px-6 rounded-sm shadow-lg transition duration-300 ease-in-out cursor-pointer">Sprawdź</button>
                    </div>
                </div>

                
                {/* Prawa Kolumna: Obraz (na desktopie po prawej, na mobile na górze). */}
                <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
                    <img 
                        src="./person.webp" 
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-4xl shadow-2xl object-cover" 
                        alt="Osoba z kierownictwa firmy"
                    />
                </div>
            </div>

            
            {/* SEKCJA 3: NASZE OSIĄGNIĘCIA - Prezentacja kluczowych wskaźników w postaci kart. */}
            <div className="w-full bg-gray-50 py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 sm:mb-16 text-center">
                    Poznaj nasze wyniki
                </h2>
                
                
                {/* Kontener kart - użycie grid z responsywną zmianą liczby kolumn (1, 2, 3). */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    
                    
                    <AchievementCard 
                        title="2000+ Spraw"
                        description="Reprezentowaliśmy naszych Klientów w ponad 2000 skomplikowanych sprawach, z wysokim wskaźnikiem pozytywnych rozstrzygnięć."
                        customColor={customColor}
                    />

                    
                    <AchievementCard 
                        title="18+ Lat"
                        description="Ponad 18 lat doświadczenia na rynku polskim i międzynarodowym. Jesteśmy gotowi na każde wyzwanie prawne."
                        customColor={customColor}
                    />

                    
                    <AchievementCard 
                        title="98% Zadowolenia"
                        description="Nasi Klienci cenią nas za profesjonalizm, dyskrecję i skuteczne podejście. Świadczy o tym 98% zadowolonych Klientów."
                        customColor={customColor}
                    />

                </div>
            </div>

            
            {/* SEKCJA 4: PLANY NA ROZWÓJ - Wizualizacja przyszłych działań na osi czasu. */}
            <div className="w-full bg-white py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 sm:mb-16 text-center">
                    Plany na rozwój
                </h2>
                <Timeline customColor={customColor} />
            </div>
        </main>
    )
}

// Komponent osi czasu (Timeline). Wyświetla listę planów w responsywnym układzie.
const Timeline = ({ customColor }) => {
    // Lista planów rozwojowych
    const plans = [
        { id: 1, title: "Ekspansja na nowe rynki", description: "Wprowadzenie naszych usług prawnych na rynki Europy Zachodniej, z naciskiem na Niemcy i Francję." },
        { id: 2, title: "Wdrożenie AI w analizie", description: "Zintegrowanie zaawansowanych systemów sztucznej inteligencji do szybszej i dokładniejszej analizy dokumentacji prawnej." },
        { id: 3, title: "Budowa nowej siedziby", description: "Projektowanie i budowa nowoczesnej, ekologicznej siedziby kancelarii, sprzyjającej innowacyjnej pracy zespołowej." },
        { id: 4, title: "Program Pro Bono Plus", description: "Rozszerzenie programu bezpłatnych porad prawnych dla organizacji non-profit i osób w trudnej sytuacji materialnej." },
        { id: 5, title: "Cyfryzacja i automatyzacja", description: "Pełna cyfryzacja procesów wewnętrznych, eliminująca papierowy obieg dokumentów i skracająca czas obsługi Klienta." },
        { id: 6, title: "Partnerstwo akademickie", description: "Nawiązanie strategicznego partnerstwa z czołowymi uniwersytetami w celu wspierania badań nad prawem przyszłości." },
    ];

    return (
        
        // Kontener osi czasu: używa grid z 3 kolumnami na desktopie (treść | linia | treść)
        // Oraz 2 kolumnami na mobile (linia/kropka | treść).
        <div className="w-full max-w-4xl grid md:grid-cols-[1fr_auto_1fr] grid-cols-[auto_1fr] md:gap-x-12 divide-y md:divide-y-0">
            {plans.map((item, index) => {
                const isOdd = index % 2 === 0; // Sprawdza parzystość do określenia strony (lewa/prawa) na desktopie.
                
                // Klasy grid dla naprzemiennego pozycjonowania na desktopie.
                const gridClasses = `
                    ${isOdd ? 'md:col-start-1 md:col-end-2' : 'md:col-start-3 md:col-end-4'} 
                    col-start-2 col-end-3 md:col-span-1
                `;

                
                return (
                    <div key={item.id} className="contents">
                        
                        {/* Wersja mobilna: Stack pionowy (kropka i linia po lewej, treść po prawej). */}
                        <div className="contents md:hidden">
                            <div className="col-start-1 col-end-2 relative flex flex-col items-center mr-4">
                                
                                <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-white ring-2 ring-white relative z-10`} style={{ backgroundColor: customColor }}>
                                    {item.id}
                                </div>
                                
                                {index < plans.length - 1 && (
                                    <div className={`h-full w-0.5 absolute top-6 bottom-0`} style={{ backgroundColor: customColor }}></div>
                                )}
                            </div>
                            <div className="col-start-2 col-end-3 py-4 pl-0 pr-4 -mt-2"> 
                                <h3 className="text-base sm:text-lg font-bold mb-0.5 text-gray-900">{item.title}</h3> 
                                <p className="text-xs text-gray-600">{item.description}</p> 
                            </div>
                        </div>

                        
                        {/* Wersja desktop: Naprzemienny układ (treść po lewej/prawej, linia centralna). */}
                        <div className="hidden md:contents">
                            
                            {/* Treść Pozycja 1 (Lewa) - wyświetla się tylko dla parzystych indeksów. */}
                            {isOdd ? <div className={`py-6 pr-12 text-right ${gridClasses}`}>
                                <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div> : <div className="md:col-start-1 md:col-end-2"></div>}
                            
                            {/* Linia i kropka centralna (kolumna środkowa). */}
                            <div className="md:col-start-2 md:col-end-3 relative flex items-center justify-center">
                                
                                {index < plans.length && (
                                    <div className={`h-full w-0.5 absolute top-0 bottom-0`} style={{ backgroundColor: customColor }}></div>
                                )}
                                
                                {/* Kropka/znacznik kroku na osi czasu. */}
                                <div className={`w-15 lg:h-15 rounded-full shadow-lg flex items-center justify-center text-sm font-bold text-white ring-4 ring-white relative z-10`} style={{ backgroundColor: customColor }}>
                                    {item.id}
                                </div>
                            </div>

                            
                            {/* Treść Pozycja 2 (Prawa) - wyświetla się tylko dla nieparzystych indeksów. */}
                            {!isOdd ? <div className={`py-6 pl-12 text-left ${gridClasses}`}>
                                <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div> : <div className="md:col-start-3 md:col-end-4"></div>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Komponent AchievementCard - formatuje osiągnięcia firmy w postaci kart.
const AchievementCard = ({ title, description, customColor }) => {
    return (
        // Karta z cieniem w kolorze customColor i efektem hover.
        <div className="p-8 h-[30vh] sm:h-[30vh] sm:p-10 rounded-xl shadow-md transition duration-300 ease-in-out hover:shadow-xl shadow-[#700806] border border-gray-100 flex flex-col justify-around items-center text-center">
            
            {/* Opis wskaźnika (np. "Spraw", "Lat", "Zadowolenia"). */}
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                {title.split(' ').slice(1).join(' ') || title}
            </p>
            
            {/* Wyróżniona Liczba/Wskaźnik (np. "2000+", "18+", "98%"). */}
            <h3 className="text-4xl sm:text-5xl font-extrabold mb-2" style={{ color: customColor }}>
                {title.split(' ')[0]} 
            </h3>
            
            {/* Szczegółowy opis osiągnięcia. */}
            <p className="text-sm text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    );
};
