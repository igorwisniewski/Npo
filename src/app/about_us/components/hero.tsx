// HeroSection.jsx
import React from 'react';

interface HeroSectionProps {
    heroBackgroundStyle: React.CSSProperties;
}

export default function HeroSection({ heroBackgroundStyle }: HeroSectionProps) {
    // Klasa dla przycisku akcji.
    const buttonClasses = `bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-sm shadow-lg transition duration-300 ease-in-out cursor-pointer transform hover:scale-105`;

    return (
        // SEKCJA 1: HERO
        <div 
            className="w-full h-[60vh] bg-cover bg-center shadow-xl flex flex-col items-center justify-center py-20 px-4"
            style={heroBackgroundStyle}
        >
            <div className="flex justify-center lg:justify-start">
                <p className="text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                    O nas
                </p>
            </div>
            
            {/* Tytuł główny */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black text-center drop-shadow-lg">
                Kim my w zasadzie jesteśmy?
            </h1>

            <br />
            
            {/* Opis tekstowy */}
            <span className="text-base sm:text-lg lg:text-xl max-w-3xl block text-center leading-relaxed drop-shadow-lg text-black px-4">
                Napewno nie jesteśmy tylko kolejną kancelarią, słuchamy i pomagamy             
            </span>
        </div>
    );
}