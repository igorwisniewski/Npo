// AchievementsSection.jsx
import React from 'react';
import AchievementCard from './AchievementCard'; // Zakładamy import

export default function AchievementsSection({ customColor }) {
    return (
        // SEKCJA 3: NASZE OSIĄGNIĘCIA
        <div className="w-full bg-gray-50 py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 sm:mb-16 text-center">
                Poznaj nasze wyniki
            </h2>
            
            {/* Kontener kart */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                <AchievementCard 
                    title="2000+ Spraw"
                    description="Reprezentowaliśmy naszych Klientów w ponad 2000 skomplikowanych sprawach, z wysokim wskaźnikiem pozytywnych rozstrzygnięć."
                    customColor={customColor}
                />

                <AchievementCard 
                    title="18+ Lat"
                    description="Ponad 18 lat doświadczenia na rynku polskim i międzynarodowym. Jesteśmy gotowi na każde wyzwanie prawne."
                    customColor={customColor}
                />

                <AchievementCard 
                    title="98% Zadowolenia"
                    description="Nasi Klienci cenią nas za profesjonalizm, dyskrecję i skuteczne podejście. Świadczy o tym 98% zadowolonych Klientów."
                    customColor={customColor}
                />
            </div>
        </div>
    );
}