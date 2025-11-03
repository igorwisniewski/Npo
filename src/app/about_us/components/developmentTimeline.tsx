// DevelopmentTimeline.jsx
import React from 'react';
import PropTypes from 'prop-types';

DevelopmentTimeline.propTypes = {
    /** Kolor akcentujący, np. '#007AFF'. Wymagany ciąg znaków. */
    customColor: PropTypes.string.isRequired,
};


// Komponent osi czasu (Timeline). Wyświetla listę planów w responsywnym układzie.
export default function DevelopmentTimeline({ customColor }) {
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
        // SEKCJA 4: PLANY NA ROZWÓJ
        <div className="w-full bg-white py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 sm:mb-16 text-center">
                Plany na rozwój
            </h2>
            
            {/* Kontener osi czasu: używa grid z 3 kolumnami na desktopie i 2 na mobile. */}
            <div className="w-full max-w-4xl grid md:grid-cols-[1fr_auto_1fr] grid-cols-[auto_1fr] md:gap-x-12 divide-y md:divide-y-0">
                {plans.map((item, index) => {
                    const isOdd = index % 2 === 0; // Określa stronę na desktopie.
                    
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
                                {/* Treść Pozycja 1 (Lewa) */}
                                {isOdd ? <div className={`py-6 pr-12 text-right ${gridClasses}`}>
                                    <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div> : <div className="md:col-start-1 md:col-end-2"></div>}
                                
                                {/* Linia i kropka centralna */}
                                <div className="md:col-start-2 md:col-end-3 relative flex items-center justify-center">
                                    {index < plans.length && (
                                        <div className={`h-full w-0.5 absolute top-0 bottom-0`} style={{ backgroundColor: customColor }}></div>
                                    )}
                                    <div className={`w-15 lg:h-15 rounded-full shadow-lg flex items-center justify-center text-sm font-bold text-white ring-4 ring-white relative z-10`} style={{ backgroundColor: customColor }}>
                                        {item.id}
                                    </div>
                                </div>

                                {/* Treść Pozycja 2 (Prawa) */}
                                {!isOdd ? <div className={`py-6 pl-12 text-left ${gridClasses}`}>
                                    <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div> : <div className="md:col-start-3 md:col-end-4"></div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};