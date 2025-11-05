// StatsSection.jsx
import React from 'react';

/**
 * Komponent StatCard (Karta Statystyki).
 * @param {object} props - Właściwości komponentu.
 * @param {string} props.value - Wartość statystyki (np. "2000+").
 * @param {string} props.label - Etykieta statystyki.
 * @param {React.ComponentType} props.icon - Komponent ikony (z lucide-react) do tła.
 */
const StatCard = ({ value, label, icon: Icon }) => (
    <div 
        className="bg-white p-6 sm:p-8 h-[40vh] w-[100%] flex justify-center items-center rounded-lg border border-gray-100 shadow-md transition-shadow duration-300 hover:shadow-xl relative overflow-hidden text-center"
    >
        {/* Warstwa z dużą, przezroczystą ikoną w tle dla efektu wizualnego */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            {/* Ikona zajmująca dużą część karty z niską przezroczystością */}
            {Icon && <Icon className="w-[80%] h-[80vh] text-red-100 opacity-80" />}
        </div>

        {/* Zawartość karty (wartość i etykieta) umieszczona na wierzchu (z-10) */}
        <div className="relative z-10">
            {/* Wartość statystyki (np. 2000+) */}
            <p className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2">
                {value}
            </p>
            {/* Etykieta statystyki */}
            <p className="text-base font-medium text-gray-600  pt-3">
                {label}
            </p>
        </div>
    </div>
);


/**
 * Komponent StatsSection.
 * @param {object} props - Właściwości komponentu.
 * @param {Array<object>} props.statsData - Tablica danych statystyk.
 */
const StatsSection = ({ statsData }) => (
    <section className="pt-10 flex justify-center items-center min-h-[80vh]">
        <div className="w-[80%] mx-auto text-center">
            
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
);

export default StatsSection;