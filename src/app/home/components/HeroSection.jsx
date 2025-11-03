// HeroSection.jsx
import React from 'react';
import StandardImage from './StandardImage'; // Załóżmy, że plik jest w tym samym katalogu

/**
 * Komponent HeroSection (Nagłówek).
 * * @param {object} props - Właściwości komponentu.
 * @param {string} props.specialistImageSrc - Ścieżka do obrazka specjalisty.
 */
const HeroSection = ({ specialistImageSrc }) => (
    <section className="w-full h-[100vh] bg-white overflow-hidden shadow-xl py-16 lg:py-0 lg:min-h-[800px] flex items-center">
        {/* Ograniczamy szerokość do max-w-7xl i centrujemy */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* Kontener dla treści i obrazu z układem flex */}
            <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[70vh] items-center">
                
                {/* Lewa kolumna: Treść nagłówka */}
                <div className="w-full lg:w-5/12 p-0 lg:p-8 flex flex-col justify-center z-10 text-center lg:text-left order-2 lg:order-1 pt-8 lg:pt-0">
                    
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
                
                {/* Prawa kolumna: Grafika */}
                <div className="relative w-full lg:w-7/12 flex justify-center lg:justify-end items-center order-1 lg:order-2 **hidden lg:flex**">
                    
                    {/* Warstwa geometryczna w tle */}
                    <div className="absolute inset-0 bg-red-800 transform skew-x-[-20deg] translate-x-1/3 origin-top-left z-10 hidden lg:block"></div>
                    {/* Kontener na obrazek specjalisty */}
                    <div className="relative w-full h-[60vh] lg:h-[100vh] z-20 my-auto lg:p-0 hidden lg:block">
                        <div 
                            className="w-full h-full hidden items-center justify-center text-gray-500 text-sm rounded-3xl lg:flex"
                        >
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
            </div>
        </div>
    </section>
);

export default HeroSection;