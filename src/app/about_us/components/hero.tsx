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
            className="w-full min-h-screen bg-cover bg-center shadow-xl flex flex-col items-center justify-center gap-10 sm:gap-16 py-20 px-4"
            style={heroBackgroundStyle}
        >
            
            {/* Tytuł główny */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white text-center drop-shadow-lg">
                O nas
            </h1>
            
            {/* Opis tekstowy */}
            <span className="text-base sm:text-lg lg:text-xl max-w-3xl block text-center leading-relaxed drop-shadow-lg text-white px-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </span>

            {/* Przycisk akcji */}
            <button className={buttonClasses}>
                Czytaj więcej...
            </button>
        </div>
    );
}