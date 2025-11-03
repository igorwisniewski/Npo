// AboutUs.jsx
import React from 'react';
import HeroSection from './components/hero';
import MissionValuesSection from './components/missionValues';
import AchievementsSection from './components/achievements';
import DevelopmentTimeline from './components/developmentTimeline'; // Zmieniono nazwę z Timeline

// Stała przechowująca niestandardowy kolor marki.
const customColor = '#700806';

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
                customColor={customColor} 
            />
            
            {/* SEKCJA 2: MISJA I WARTOŚCI */}
            <MissionValuesSection 
                customColor={customColor} 
            />
            
            {/* SEKCJA 3: NASZE OSIĄGNIĘCIA */}
            <AchievementsSection 
                customColor={customColor} 
            />
            
            {/* SEKCJA 4: PLANY NA ROZWÓJ */}
            <DevelopmentTimeline 
                customColor={customColor} 
            />
            
        </main>
    )
}