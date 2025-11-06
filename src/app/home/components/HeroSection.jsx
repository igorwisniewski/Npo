// HeroSection.jsx
import React from 'react';
import StandardImage from './StandardImage'; // Załóżmy, że plik jest w tym samym katalogu

/**
 * Komponent HeroSection (Nagłówek).
 * * @param {object} props - Właściwości komponentu.
 * @param {string} props.specialistImageSrc - Ścieżka do obrazka specjalisty.
 */
const HeroSection = ({ specialistImageSrc }) => (
    <section className="w-full h-[100vh] bg-white overflow-hidden  py-16 lg:py-0 lg:min-h-[800px] flex items-center">
        {/* Ograniczamy szerokość do max-w-7xl i centrujemy */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* Kontener dla treści i obrazu z układem flex */}
            <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[70vh] justify-center items-center">
                
                {/* Lewa kolumna: Treść nagłówka */}
                <div className="w-full p-0 lg:p-8 flex flex-col justify-center lg:items-end items-center z-10 text-center lg:text-left order-2 lg:order-1 pt-8 lg:pt-0">
                    <div className="max-w-2xl">
                        {/* Tag "TWOI" */}
                        <div className="flex justify-center lg:justify-start">
                            <p className="text-sm font-bold bg-red-800 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
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
                                href="/kontakt"
                                className="px-6 py-3 text-white bg-red-800 hover:bg-white hover:text-red-900 transition duration-300 font-medium rounded-xl shadow-md border border-red-800 text-sm sm:text-base whitespace-nowrap"
                            >
                                Umów darmową konsultację
                            </a>
                            <a 
                                href="#counter"
                                className="px-6 py-3 text-red-800 bg-white hover:bg-red-800 hover:text-white transition duration-300 font-medium rounded-xl border border-red-800 text-sm sm:text-base whitespace-nowrap"
                            >
                                Czytaj dalej
                            </a>
                        </div>
                    </div>
                </div>
                {/* Prawa kolumna: Grafika */}
                <div className="relative w-full flex justify-center lg:justify-end items-center order-1 lg:order-2 **hidden lg:flex**">
                    <div className="hidden lg:block absolute top-0 right-[-25vw] h-full w-[60vw] bg-red-900 transform skew-x-[-15deg] origin-right pointer-events-none z-0"></div>

                    {/* Warstwa geometryczna w tle */}
                    {/* Kontener na obrazek specjalisty */}
                    <div className="relative w-full h-[60vh] lg:h-[100vh] z-20 my-auto lg:p-0 hidden lg:block">
                        <div 
                            className="w-full h-full hidden items-center justify-center text-gray-500 text-sm rounded-3xl lg:flex"
                        >
                            <StandardImage
                                src={specialistImageSrc} 
                                alt="Portret specjalisty" 


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