// AboutSection.jsx
import React from 'react';
import StandardImage from './StandardImage'; // Załóżmy, że plik jest w tym samym katalogu

/**
 * Komponent AboutSection ("O nas").
 * * @param {object} props - Właściwości komponentu.
 * @param {string} props.officeImageSrc - Ścieżka do obrazka biura.
 */
const AboutSection = ({ officeImageSrc }) => (
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
                    
                    <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                        Nie jesteśmy tylko kolejną kancelarią.
                    </p>

                    <p className="text-base text-gray-700 mb-4 leading-relaxed">
                        Jesteśmy Siecią Kancelarii Prawnych o zasięgu globalnym, aczkolwiek z absolutnie polskimi korzeniami i z siedzibą główną w Polsce, reprezentującą naszych Klientów w bardzo szerokim pojmowaniu tego słowa.
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
);

export default AboutSection;