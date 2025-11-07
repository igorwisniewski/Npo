// AboutUs.jsx
import React from 'react';
import HeroSection from './components/hero';
import MissionValuesSection from './components/missionValues';
import ResultsSection from './components/results';
import DevelopmentTimeline from './components/developmentTimeline'; // Zmieniono nazwę z Timeline
import TeamSection from './components/TeamSection';
import AchievementsSection from './components/Achievements';
import ProcessTimeline from "@/app/about_us/components/ProcessTimeline";
import FaqSection from "@/app/about_us/components/FAQ";
import DebtCalculator from "@/app/home/components/cta";


// Stała przechowująca niestandardowy kolor marki.
const defaultColor = '#700806';

// Główny komponent strony "O Nas".
export default function AboutUs() {



    return (
        <main className="font-sans bg-white ">

            {/* SEKCJA 1: HERO */}
            <HeroSection
            />

            {/* SEKCJA 2: MISJA I WARTOŚCI */}
            <MissionValuesSection />

            {/* SEKCJA 3: NASZE OSIĄGNIĘCIA */}
            <ProcessTimeline/>



            {/* SEKCJA 5: POZNAJ NASZĄ EKIPĘ */}
            <TeamSection />
            <AchievementsSection />
            <FaqSection />
            <DebtCalculator/>



        </main>
    )
}