import React from 'react';
// Załóżmy, że ikony są importowane z biblioteki typu lucide-react,
// a prop 'icon' zawiera referencję do komponentu ikony, a NIE string.

/**
 * Komponent AchievementCard (Karta Osiągnięcia).
 * @param {object} props - Właściwości komponentu.
 * @param {string} props.title - Tytuł osiągnięcia.
 * @param {string} props.category - Kategoria (np. "Wyróżnienie", "Certyfikat").
 * @param {string} props.description - Opis osiągnięcia.
 * @param {React.ComponentType} props.icon - Komponent ikony (np. z lucide-react).
 * @param {number|string} props.year - Rok osiągnięcia.
 * @param {string} [props.customColor] - Opcjonalny kolor dla akcentu (border-top).
 */

// Zmieniamy definicję komponentu, aby przyjął komponent ikony
export default function AchievementCard({ title, category, description, icon: IconComponent, year, customColor }) {
    // Sprawdzamy, czy komponent ikony został przekazany
    const Icon = IconComponent;
    const accentColor = customColor || '#dc2626'; // Domyślny kolor: czerwony-700

    return (
        // Używamy <article> dla lepszej semantyki (pojedynczy, niezależny element)
        <article className="group w-[100%] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 p-6 flex md:flex-row flex-col items-center gap-6"
        >
            
            {/* Ikona Osiągnięcia - Używamy przekazanego komponentu */}
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center 
                            rounded-full transition-transform duration-500 group-hover:rotate-6 
                            bg-red-100 text-red-700"
            >
                {Icon && <Icon className="w-8 h-8" />} 
            </div>

            <div className="flex flex-col flex-grow">
                {/* Rok/Kategoria - dodaje kontekst i jest dobrym miejscem na tagi SEO */}
                <p className="text-sm font-bold text-red-700 uppercase tracking-widest mb-1 text-left">
                    {category} ({year})
                </p>

                {/* Tytuł - najważniejsza treść */}
                <h3 className="text-xl font-extrabold mb-2 text-gray-900 text-left">
                    {title}
                </h3>

                {/* Opis osiągnięcia - wartość merytoryczna */}
                <p className="text-gray-700 text-base leading-relaxed text-left">
                    {description}
                </p>
            </div>
            
        </article>
    );
}