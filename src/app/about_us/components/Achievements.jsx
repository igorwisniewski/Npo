// AchievementsSection.jsx (Ulepszona wersja SEO/UX)
import React from 'react';
import AchievementCard from './AchievementCard';
import { Award, Star, Zap } from 'lucide-react';

export default function AchievementsSection() {
    // Akcent kolorystyczny, pasujący do poprzedniej sekcji
    const primaryColor = '#700806'; 

    return (
        // Używamy <section> dla lepszej semantyki SEO
        <section 
            id="nasze-osiagniecia" // Dodajemy ID dla łatwego linkowania
            className="w-full bg-gray-50 py-16 sm:py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center"
        >
            <div className="flex justify-center lg:justify-start">
                <p className="text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                    Poznaj
                </p>
            </div>


            {/* Nagłówek H2 zorientowany na słowa kluczowe (np. 'potwierdzone sukcesy', 'nagrody branżowe') */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 text-center">
                Nasze osiągnięcia i Sukcesy
            </h2>
            
            {/* Opis sekcji pod kątem SEO/UX */}
            <p className="text-lg text-gray-700 max-w-3xl text-center mb-10">
                Jakość naszej pracy potwierdzają liczne nagrody branżowe, kluczowe zwycięstwa w sprawach oraz prestiżowe certyfikaty, które zdobywamy rokrocznie.
            </p>

            {/* Kontener kart - Ustawienia responsywności ulepszone */}
            <div className="w-full max-w-6xl gap-8 sm:gap-10 flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch">
                
                {/* PRZYKŁADOWE DANE OSIĄGNIĘĆ */}
                <AchievementCard 
                    title="Nagroda Prawnika Roku 2024"
                    category="Rankingi Branżowe"
                    description="Otrzymaliśmy prestiżowe wyróżnienie za innowacyjne podejście do fuzji i przejęć (M&A) w sektorze IT."
                    icon={Award} // Przykładowa ikona (wymaga biblioteki typu react-icons)
                    year="2024"
                    customColor={primaryColor}
                />

                <AchievementCard 
                    title="95% Wygranych Spraw Cywilnych"
                    category="Statystyki Kancelarii"
                    description="Statystyka za ostatnie 3 lata w kluczowych sprawach odszkodowawczych. Dowód na naszą skuteczność procesową."
                    icon={Star} 
                    year="2022-2024"
                    customColor={primaryColor}
                />

                <AchievementCard 
                    title="Certyfikat ISO 27001"
                    category="Bezpieczeństwo i Jakość"
                    description="Potwierdzenie najwyższych standardów w zakresie zarządzania bezpieczeństwem informacji i danymi klientów."
                    icon={Zap} 
                    year="2023"
                    customColor={primaryColor}
                />
            </div>
        </section>
    );
}