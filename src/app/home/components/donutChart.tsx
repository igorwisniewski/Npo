"use client";

import React, { useRef, useLayoutEffect } from 'react'; // Zmieniono importy React
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DonutChartProps {
    percentage: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ percentage }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressCircleRef = useRef<SVGCircleElement>(null);
    const textRef = useRef<SVGTextElement>(null);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    // Końcowa wartość przesunięcia dla paska postępu
    const finalOffset = circumference - (percentage / 100) * circumference;

    // Używamy useLayoutEffect zamiast useGSAP
    useLayoutEffect(() => {
        // Tworzymy kontekst GSAP, aby bezpiecznie zarządzać animacjami
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });

            // 1. Animacja licznika numerycznego
            const counter = { value: 0 };
            tl.to(counter, {
                value: percentage,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                    if(textRef.current) {
                        textRef.current.textContent = `${Math.round(counter.value)}%`;
                    }
                }
            });

            // 2. Animacja koła SVG
            tl.fromTo(progressCircleRef.current, {
                strokeDashoffset: circumference,
            }, {
                strokeDashoffset: finalOffset,
                duration: 1.5,
                ease: 'power2.out',
            }, "<"); // "<" uruchamia tę animację w tym samym czasie co poprzednią

            // 3. Animacja "pop" na końcu
            tl.to(containerRef.current, {
                scale: 1.1,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
            });

        }, containerRef); // Zakres kontekstu

        // Funkcja czyszcząca
        return () => ctx.revert();

        // Dodajemy zależności do hooka
    }, [percentage, circumference, finalOffset]);

    return (
        <div ref={containerRef} className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-red-800/10"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    ref={progressCircleRef}
                    className="text-red-800 -rotate-90 origin-center"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <text
                    ref={textRef}
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-2xl font-bold fill-current text-red-800"
                >
                    0%
                </text>
            </svg>
        </div>
    );
};

export default DonutChart;