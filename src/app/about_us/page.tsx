// AboutUs.jsx
import React from 'react';
import HeroSection from './components/hero';
import MissionValuesSection from './components/missionValues';
import ResultsSection from './components/results';
import DevelopmentTimeline from './components/developmentTimeline'; // Zmieniono nazwę z Timeline
import TeamSection from './components/TeamSection';
import AchievementsSection from './components/Achievements';


// Stała przechowująca niestandardowy kolor marki.
const defaultColor = '#700806';

// Główny komponent strony "O Nas".
export default function AboutUs() {
    
    // Definicja stylu tła dla sekcji Hero
    const heroBackgroundStyle = {
        backgroundImage: "url('/bg.jpg')",
    };
    
    return (
        <main className="font-sans antialiased">
            
            {/* SEKCJA 1: HERO */}
            <HeroSection 
                heroBackgroundStyle={heroBackgroundStyle}  
            />
            
            {/* SEKCJA 2: MISJA I WARTOŚCI */}
            <MissionValuesSection />
            
            {/* SEKCJA 3: NASZE OSIĄGNIĘCIA */}
            <ResultsSection />
            
            {/* SEKCJA 4: PLANY NA ROZWÓJ */}
            <DevelopmentTimeline 
                customColor={defaultColor} 
            />

            {/* SEKCJA 5: POZNAJ NASZĄ EKIPĘ */}
            <TeamSection />

            <AchievementsSection />
            
        </main>
    )
}