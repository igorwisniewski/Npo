'use client'; // Wymagane dla GSAP i hooków

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

// Usunęliśmy prop 'heroBackgroundStyle', ponieważ tło jest teraz częścią komponentu
export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Animacja dla tekstu (nagłówek i opis)
            gsap.from(".animate-hero-text", {
                opacity: 0,
                y: 20,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out',
            });

            // 2. Animacja dla ścieżek SVG w tle
            const paths = svgRef.current?.querySelectorAll('path');
            if (paths) {
                gsap.to(paths, {
                    scale: 1.05,
                    opacity: 0.3,
                    duration: 3,
                    stagger: {
                        each: 0.1,
                        from: "random", // Daje ładny, organiczny efekt
                        repeat: -1, // Pętla nieskończona
                        yoyo: true, // Animacja powrotna
                    },
                    ease: 'sine.inOut'
                });
            }
        }, sectionRef); // Ograniczenie kontekstu GSAP do tej sekcji

        return () => ctx.revert(); // Czyszczenie
    }, []);

    return (
        // SEKCJA 1: HERO (Lifting i nowe tło)
        // Używamy 'relative' i 'overflow-hidden' do pozycjonowania SVG
        <section
            ref={sectionRef}
            className="relative w-full h-[60vh] bg-gray-50
                       flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
        >
            {/* Animowane tło SVG.
              Jest umieszczone absolutnie, z niską przezroczystością.
            */}
            <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full z-0 opacity-10"
                width="100%" height="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="pattern-1"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(45)"
                    >
                        <path d="M 0 0 L 40 0 L 40 40 L 0 40 Z" fill="none" stroke="black" strokeWidth="1" />
                    </pattern>
                </defs>
                {/* Generujemy siatkę ścieżek (paths), które GSAP będzie animować.
                  To tylko prosty przykład, można tu wstawić dowolne skomplikowane SVG.
                */}
                <rect width="100%" height="100%" fill="url(#pattern-1)" />
                {Array.from({ length: 200 }).map((_, i) => {
                    const x = (i % 20) * 100;
                    const y = Math.floor(i / 20) * 100;
                    return (
                        <path
                            key={i}
                            d={`M ${x} ${y} l 50 0 l 0 50 l -50 0 Z`}
                            fill="white"
                            opacity="0.1"
                        />
                    );
                })}
            </svg>

            {/* Treść (umieszczona na wierzchu z z-10) */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="flex justify-center lg:justify-start">
                    <p className="animate-hero-text text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                        O nas
                    </p>
                </div>

                {/* Zgodność z SEO: Nagłówek 29 znaków (max 30) */}
                <h1 className="animate-hero-text text-4xl sm:text-6xl lg:text-7xl font-semibold text-gray-950 text-center mt-4">
                    Kim my w zasadzie jesteśmy?
                </h1>

                <br />

                {/* Zgodność z SEO: Tekst 71 znaków (max 90) */}
                <span className="animate-hero-text text-base sm:text-lg lg:text-xl max-w-3xl block text-center leading-relaxed  text-gray-900 px-4">
                    Napewno nie jesteśmy tylko kolejną kancelarią, słuchamy i pomagamy
                </span>
            </div>
        </section>
    );
}