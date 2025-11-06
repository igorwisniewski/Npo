// AchievementsSection.jsx
import React from 'react';
import ResultsCard from './ResultsCard';

export default function ResultsSection() {
    return (
        // SEKCJA 3: NASZE OSIĄGNIĘCIA
        <div className="w-full bg-gray-50 py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center">
            <div className="flex justify-center lg:justify-start">
                <p className="text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                    Poznaj
                </p>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 sm:mb-16 text-center">
                Nasze wyniki
            </h2>
            
            {/* Kontener kart */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                <ResultsCard 
                    title="2000+ Spraw"
                    description="Reprezentowaliśmy naszych Klientów w ponad 2000 sprawach, z wysokim wskaźnikiem pozytywnych rozstrzygnięć."
                />

                <ResultsCard 
                    title="18+ Lat"
                    description="Ponad 18 lat doświadczenia na rynku polskim i międzynarodowym. Jesteśmy gotowi na każde wyzwanie prawne."
                />

                <ResultsCard 
                    title="98% Zadowolenia"
                    description="Nasi Klienci cenią nas za profesjonalizm, dyskrecję i skuteczne podejście. Świadczy o tym 98% zadowolonych Klientów."
                />
            </div>
        </div>
    );
}