// MissionValuesSection.jsx
import React from 'react';

export default function MissionValuesSection() {
    // Klasy dla przycisku z ramką w kolorze customColor.
    const borderedButtonClasses = `border-red-700 border-2 text-red-700 hover:bg-red-50 font-bold py-3 px-6 rounded-sm shadow-lg transition duration-300 ease-in-out cursor-pointer`;

    return (
        // SEKCJA 2: MISJA I WARTOŚCI
        <div className="w-[80%] bg-white py-20 px-6 lg:px-12 xl:px-24 flex flex-col-reverse lg:flex-row items-center m-auto justify-center gap-10 md:gap-10">
            
            {/* Lewa Kolumna: Tekst i Przyciski */}
            <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start justify-center gap-6 sm:gap-8 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
                    Nasza misja i wartości
                </h2>
                
                <span className="text-base sm:text-lg text-gray-600 max-w-xl lg:max-w-none">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </span>
                
                <div className="flex gap-4 mt-4">
                    <button className={`bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-sm shadow-lg transition duration-300 ease-in-out cursor-pointer`}>Zadzwoń</button>
                    <button className={borderedButtonClasses}>Sprawdź</button>
                </div>
            </div>

            {/* Prawa Kolumna: Obraz */}
            <div className="w-full lg:w-[40%] flex justify-center items-center mt-10 lg:mt-0">
                <img 
                    src="./person.webp" 
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-4xl shadow-2xl object-cover" 
                    alt="Osoba z kierownictwa firmy"
                />
            </div>
        </div>
    );
}