// App.jsx (Główny Plik)
import React from 'react';
// Importowanie ikon

// Importowanie wydzielonych komponentów
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import SolutionsSection from "@/app/home/components/SolutionsSection";
import CaseStudies from "@/app/home/components/CaseStudies";
import TestimonialsSection from "@/app/home/components/TestimonialsSection";
import DebtCalculator from "@/app/home/components/cta";


// Dane dla sekcji Usługi.
const servicesData = [
    {
        iconName: 'Briefcase', // Zamiast icon: Briefcase
        title: 'Restrukturyzacja',
        subtitle: 'Twoja szansa na stabilność',
        description: 'Znajdujemy przyczyny problemów i przygotowujemy wniosek do sądu wraz z propozycjami układu dla wierzycieli. Następnie prowadzimy negocjacje i reprezentujemy w sądzie, nadzorując wykonanie planu aż do odzyskania przez firmę stabilności finansowej.',
        buttonText: 'Umów konsultacje',
    },
    {
        iconName: 'Gavel', // Zamiast icon: Gavel
        title: 'Upadłość Konsumecka',
        subtitle: 'Twoja szansa na nowy start',
        description: 'Jako kancelaria wspieramy w procesie upadłości konsumenckiej. Pomagamy złożyć kompletny wniosek do sądu. Po ogłoszeniu upadłości przez sąd, Po jego wykonaniu sąd umarza resztę zobowiązań, dając szansę na nowy start.',
        buttonText: 'Umów konsultacje',
    },
    {
        iconName: 'TrendingUp', // Zamiast icon: TrendingUp
        title: 'Doradztwo strategiczne',
        subtitle: 'Twoja szansa na płynność finansową',
        description: 'Doradztwo strategiczne to pomoc dla firm w planowaniu ich przyszłości i podejmowaniu kluczowych decyzji. Chodzi o analizę rynku i konkurencji, aby ustalić najlepszy kierunek rozwoju i osiągnąć długoterminowe cele.',
        buttonText: 'Umów konsultacje',
    },
];

const statsData = [
    {
        value: '2000+',
        label: 'Rozwiązanych spraw',
        iconName: 'Scale', // Przekazujemy NAZWĘ jako string
    },
    {
        value: '18+',
        label: 'Lat doświadczenia',
        iconName: 'GraduationCap', // Przekazujemy NAZWĘ jako string
    },
    {
        value: '98%',
        label: 'Zadowolonych klientów',
        iconName: 'Percent', // Przekazujemy NAZWĘ jako string
    },
];

/**
 * Główny komponent strony (App).
 * Odpowiada za cały układ strony głównej, składając wszystkie sekcje i komponenty.
 */
const HomeSection = () => {
    // Ścieżki do obrazów używanych w sekcji Hero i O Nas.
    // UWAGA: W środowisku produkcyjnym ścieżki mogą wymagać poprawienia (np. użycia funkcji importu w Webpacku/Vite).

    const officeImageSrc = "/images/mainabout.png ";

    return (
        // Główny kontener strony.
        <div className="font-sans">

            {/* Sekcja 1: Hero (nagłówek) */}
            <HeroSection  />

            {/* Sekcja 2: Statystyki i Wyniki */}
            <StatsSection statsData={statsData} />

            {/* Sekcja 3: O nas (z obrazkiem biura) */}
            <AboutSection officeImageSrc={officeImageSrc} />

            {/* Sekcja 4: Usługi (z kartami ServiceCard) */}
            <ServicesSection servicesData={servicesData} />
            <SolutionsSection />
            <CaseStudies/>
            <TestimonialsSection />
            <DebtCalculator/>
        </div>
    );
};

// Eksport głównego komponentu strony.
export default HomeSection;