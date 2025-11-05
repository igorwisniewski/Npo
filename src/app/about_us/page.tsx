// AboutUs.jsx
import React from 'react';
import HeroSection from './components/hero';
import MissionValuesSection from './components/missionValues';
import AchievementsSection from './components/achievements';
import DevelopmentTimeline from './components/developmentTimeline'; // Zmieniono nazwę z Timeline



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
            <AchievementsSection 
                customColor={defaultColor} 
            />
            
            {/* SEKCJA 4: PLANY NA ROZWÓJ */}
            <DevelopmentTimeline 
                customColor={defaultColor} 
            />
            
        </main>
    )
}