// HeroSection.jsx
'use client'; // Musi być komponentem klienckim dla GSAP

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import StandardImage from './StandardImage';
import Link from 'next/link';

/**
 * Komponent HeroSection (Nagłówek) z animacjami GSAP.
 * @param {object} props - Właściwości komponentu.
 * @param {string} props.specialistImageSrc - Ścieżka do obrazka specjalisty.
 */
const HeroSection = ({ specialistImageSrc }) => {
    // Referencje do elementów DOM, które będziemy animować
    const textContainerRef = useRef(null);
    const imageRef = useRef(null);
    const bgSkewRef = useRef(null);

    // Używamy useLayoutEffect dla animacji, aby uniknąć "mignięcia"
    useLayoutEffect(() => {
        // Używamy gsap.context() dla bezpiecznego czyszczenia animacji
        const ctx = gsap.context(() => {

            // 1. Ustawiamy stan początkowy (przed animacją)

            // Tekst jest przesunięty w dół i przezroczysty
            gsap.set(textContainerRef.current.children, {
                opacity: 0,
                y: 30
            });

            // Obraz jest "zamaskowany" (zwinięty do lewej krawędzi)
            gsap.set(imageRef.current, {
                clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)'
            });

            // Czerwone tło jest przesunięte poza ekran w prawo
            gsap.set(bgSkewRef.current, {
                xPercent: 100
            });

            // 2. Tworzymy oś czasu (timeline) dla sekwencji animacji
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out', duration: 1.2 }
            });

            tl
                // Krok 1: Wjeżdża czerwone tło
                .to(bgSkewRef.current, {
                    xPercent: 0
                })
                // Krok 2: Odsłaniamy obraz (z lekkim opóźnieniem)
                .to(imageRef.current, {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }, "-=0.8") // Rozpocznij 0.8s przed końcem poprzedniej animacji
                // Krok 3: Wjeżdża tekst (element po elemencie)
                .to(textContainerRef.current.children, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15, // Odstęp 0.15s między każdym elementem
                    duration: 0.8
                }, "-=0.7"); // Rozpocznij 0.7s przed końcem odsłaniania obrazu

        }, textContainerRef); // Ograniczamy kontekst do głównego kontenera

        // Funkcja czyszcząca
        return () => ctx.revert();
    }, []); // Pusta tablica zależności = uruchom tylko raz przy montowaniu

    return (
        <section className="w-full min-h-[100vh] bg-white overflow-hidden  lg:py-0  flex items-center">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[70vh] justify-center items-center">

                    {/* Lewa kolumna: Treść nagłówka */}
                    <div className="w-full p-0 lg:p-8 flex flex-col justify-center lg:items-end items-center z-10 text-center lg:text-left order-2 lg:order-1 pt-8 lg:pt-0">
                        {/* Dodajemy ref do kontenera z tekstem */}
                        <div className="max-w-2xl" ref={textContainerRef}>
                            {/* Tag "TWOI" (będzie 1. dzieckiem) */}
                            <div className="flex justify-center lg:justify-start">
                                <p className="text-sm font-bold bg-red-800 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                                    TWOI
                                </p>
                            </div>

                            {/* Główny tytuł (będzie 2. dzieckiem) */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900 mt-2 mb-4">
                                Specjaliści od <span className="block lg:inline">ciężkich przypadków</span>
                            </h1>

                            {/* Podtytuł/opis (będzie 3. dzieckiem) */}
                            <p className="text-lg text-gray-600 mb-8">
                                Nie jesteś tylko kolejną sprawą, słuchamy pomagamy tworzymy lepsze jutro
                            </p>

                            {/* Przyciski CTA (będą 4. dzieckiem) */}
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/kontakt"
                                    className="px-6 py-3 text-white bg-red-800 hover:bg-white hover:text-red-900 transition duration-300 font-medium rounded-xl shadow-md border border-red-800 text-sm sm:text-base whitespace-nowrap"
                                >
                                    Umów darmową konsultację
                                </Link>
                                <Link
                                    href="#counter" // Zmienione na /about_us dla lepszego UX
                                    className="px-6 py-3 text-red-800 bg-white hover:bg-red-800 hover:text-white transition duration-300 font-medium rounded-xl border border-red-800 text-sm sm:text-base whitespace-nowrap"
                                >
                                    Czytaj dalej
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Prawa kolumna: Grafika */}
                    <div className="relative w-full flex justify-center lg:justify-end items-center order-1 lg:order-2 **hidden lg:flex**">
                        {/* Dodajemy ref do czerwonego tła */}
                        <div
                            ref={bgSkewRef}
                            className="hidden lg:block absolute top-0 right-[-25vw] h-full w-[60vw] bg-red-900 transform skew-x-[-15deg] origin-right pointer-events-none z-0"
                        ></div>

                        {/* Dodajemy ref do kontenera z obrazem */}
                        <div
                            ref={imageRef}
                            className="relative w-full h-[60vh] lg:h-[100vh] z-20 my-auto lg:p-0 hidden lg:block"
                        >
                            <div
                                className="w-full h-full hidden items-center justify-center text-gray-500 text-sm rounded-3xl lg:flex"
                            >
                                <StandardImage
                                    src={specialistImageSrc}
                                    alt="Portret specjalisty"
                                    // Przywróciłem te propy z Twojego pliku, są kluczowe dla layoutu

                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;