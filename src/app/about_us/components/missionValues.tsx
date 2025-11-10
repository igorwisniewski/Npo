'use client'; // Wymagane dla GSAP i hooków

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Rejestrujemy wtyczkę ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function MissionValuesSection() {
    // Referencje do animowanych elementów
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Animacja dla kolumny tekstowej (wjazd z dołu)
            // Celujemy w dzieci kontenera, aby animowały się jedno po drugim
            //@ts-expect-error eror
            gsap.from(textRef.current.children, {
                opacity: 0,
                y: 30, // Przesunięcie z dołu
                stagger: 0.15, // Opóźnienie między każdym elementem (h2, p, p, div)
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%', // Zacznij animację, gdy 80% sekcji jest widoczne
                    once: true // Uruchom tylko raz
                }
            });

            // 2. Animacja dla obrazu (wjazd z prawej)
            gsap.from(imageRef.current, {
                opacity: 0,
                x: 50, // Przesunięcie z prawej
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true
                }
            });

        }, sectionRef); // Ograniczenie kontekstu GSAP do tej sekcji

        return () => ctx.revert(); // Czyszczenie
    }, []);

    return (
        // SEKCJA 2: MISJA I WARTOŚCI (Nowy layout)
        <section ref={sectionRef} className="bg-white py-20 lg:py-32 overflow-hidden" id="kimjestesmy">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Lewa Kolumna: Treść tekstowa (zgodna ze zrzutem) */}
                    <div ref={textRef} className="text-center lg:text-left">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                            Od czego to się zaczęło?
                        </h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Na początku była nicość a potem...
                        </p>
                        <p className="mt-6 text-base text-gray-700 leading-relaxed">
                            Jesteśmy globalną Siecią Kancelarii Prawnych z polskimi korzeniami, działającą w unikalnym stylu concierge. Łączymy wszechstronne usługi prawne z kompleksowym wsparciem biznesowym, finansowym i inwestycyjnym. Pomagamy w pozyskiwaniu dotacji, optymalizacji podatkowej i windykacji. Obsługujemy ponad 1800 podmiotów, pilotując kontrakty międzynarodowe i procesy inwestycyjne. Dynamiczny rozwój pozwolił nam stworzyć wyspecjalizowane działy: Concierge Art, Nieruchomości, NPO oraz Virtual.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/contact" // Możesz zmienić link na /about_us#historia itp.
                                className="inline-block px-8 py-3 text-white bg-red-800 hover:bg-red-900 transition duration-300 font-medium rounded-lg shadow-lg"
                            >
                                Dowiedz się więcej
                            </Link>
                        </div>
                    </div>

                    {/* Prawa Kolumna: Obraz (zgodny ze starym plikiem /public/person.webp) */}
                    <div ref={imageRef} className="w-full flex justify-center lg:justify-end">
                        {/* Używamy obrazu /person.webp, który już masz w projekcie */}
                        <div className="relative w-[320px] h-[480px] sm:w-[400px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/history.jpg"
                                alt="Kamil Góra NPO"
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 ease-out hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}