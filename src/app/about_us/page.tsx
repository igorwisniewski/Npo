// AboutUs.jsx
import React from 'react';
import HeroSection from './components/hero';
import MissionValuesSection from './components/missionValues';
import AchievementsSection from './components/Achievements';
import ProcessTimeline from "@/app/about_us/components/ProcessTimeline";
import FaqSection from "@/app/about_us/components/FAQ";
import DebtCalculator from "@/app/home/components/cta";




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




            <AchievementsSection />
            <FaqSection />
            <DebtCalculator/>



        </main>
    )
}
