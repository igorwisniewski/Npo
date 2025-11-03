// AchievementCard.jsx
import React from 'react';

// Komponent AchievementCard - formatuje osiągnięcia firmy w postaci kart.
export default function AchievementCard({ title, description, customColor }) {
    // Wyróżniona Liczba/Wskaźnik (np. "2000+", "18+", "98%") to pierwsza część title.
    const numericPart = title.split(' ')[0];
    // Opis wskaźnika (np. "Spraw", "Lat", "Zadowolenia") to reszta title.
    const textPart = title.split(' ').slice(1).join(' ') || title;

    return (
        // Karta z cieniem w kolorze customColor i efektem hover.
        <div className="p-8 h-[30vh] sm:h-[30vh] sm:p-10 rounded-xl shadow-md transition duration-300 ease-in-out hover:shadow-xl shadow-[#700806] border border-gray-100 flex flex-col justify-around items-center text-center">
            
            {/* Opis wskaźnika */}
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                {textPart}
            </p>
            
            {/* Wyróżniona Liczba/Wskaźnik */}
            <h3 className="text-4xl sm:text-5xl font-extrabold mb-2" style={{ color: customColor }}>
                {numericPart} 
            </h3>
            
            {/* Szczegółowy opis osiągnięcia */}
            <p className="text-sm text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    );
};