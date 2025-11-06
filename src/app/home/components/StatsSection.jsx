// src/app/home/components/StatsSection.jsx
'use client'; // Oznaczamy jako Komponent Kliencki

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Importujemy ikony z lucide-react (zgodnie z page.tsx)
import { Scale, GraduationCap, Percent } from 'lucide-react';

// Rejestrujemy wtyczkę ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Tworzymy mapę (obiekt) do wyszukiwania ikon na podstawie nazwy
const iconMap = {
    Scale: Scale,
    GraduationCap: GraduationCap,
    Percent: Percent,
};

/**
 * Komponent StatCard (Karta Statystyki) z animowanym licznikiem.
 */
const StatCard = ({ value, label, icon: Icon }) => {
    const cardRef = useRef(null);
    const valueRef = useRef(null); // Referencja do tekstu licznika

    useLayoutEffect(() => {
        const card = cardRef.current;
        const p = valueRef.current;

        // "2000+" -> 2000
        const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
        // "2000+" -> "+" (lub "98%" -> "%")
        const suffix = value.replace(/[0-9.,]/g, '');

        // Obiekt licznika, który będziemy animować od 0
        let counter = { val: 0 };

        const ctx = gsap.context(() => {

            // Animacja 1: Płynne pojawienie się karty
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%', // Rozpocznij, gdy 85% karty jest widoczne
                    once: true,      // Uruchom tylko raz
                },
            });

            // Animacja 2: Counter (Licznik)
            gsap.to(counter, {
                val: numericValue, // Animuj do wartości docelowej
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true,
                },
                // Ta funkcja odpala się na każdej klatce animacji
                onUpdate: () => {
                    // Aktualizujemy tekst, zaokrąglając wartość i dodając suffix
                    p.textContent = Math.round(counter.val) + suffix;
                },
            });

        }, cardRef);

        return () => ctx.revert();

    }, [value]); // Uruchom ponownie, jeśli zmieni się 'value'

    return (
        <div
            ref={cardRef}
            className="bg-white p-6 sm:p-8 min-h-[40vh] w-[100%] flex justify-center items-center rounded-lg border border-gray-100 shadow-md transition-shadow duration-300 hover:shadow-xl relative overflow-hidden text-center"
        >
            <div className="absolute inset-0 flex items-center justify-center z-0 px-7 pointer-events-none">
                {Icon && <Icon className="w-[80%] h-[80vh] text-red-100 opacity-80" />}
            </div>
            <div className="relative z-10">
                <p
                    ref={valueRef} // Dodajemy ref do liczby
                    className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2"
                >
                    {/* Zaczynamy od 0 i dodajemy suffix */}
                    0{value.replace(/[0-9.,]/g, '')}
                </p>
                <p className="text-base font-medium text-gray-600 pt-3">
                    {label}
                </p>
            </div>
        </div>
    );
};


/**
 * Komponent StatsSection.
 */
const StatsSection = ({ statsData }) => (
    // Dodajemy id="counter", aby link "Czytaj dalej" z HeroSection działał
    <section id="counter" className="pt-10 flex justify-center items-center min-h-[80vh]">
        <div className="w-[80%] mx-auto text-center">

            <p className="inline-block text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 text-white rounded-2xl uppercase">
                Warto
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-12">
                Poznaj nasze wyniki
            </h2>

            <div
                className="grid gap-6 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        value={stat.value}
                        label={stat.label}
                        // Wybieramy ikonę z mapy używając 'iconName'
                        icon={iconMap[stat.iconName]}
                    />
                ))}
            </div>
        </div>
    </section>
);

export default StatsSection;