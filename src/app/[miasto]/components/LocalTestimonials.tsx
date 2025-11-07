'use client';
import React, { useRef, useLayoutEffect } from 'react';
import { StarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Typy zdefiniowane lokalnie
interface CaseStudy {
    id: number;
    description: string;
    client: string;
}
interface LocalTestimonialsProps {
    studies: CaseStudy[];
    cityNameGenitive: string; // <-- POPRAWKA 1: Zmiana z 'cityName' na 'cityNameGenitive'
}

const StarRating = () => (
    <div className="flex items-center text-yellow-400">
        <StarIcon className="h-5 w-5" /><StarIcon className="h-5 w-5" />
        <StarIcon className="h-5 w-5" /><StarIcon className="h-5 w-5" />
        <StarIcon className="h-5 w-5" />
    </div>
);

// --- POPRAWKA 2: Zmiana 'cityName' na 'cityNameGenitive' w propsach ---
export default function LocalTestimonials({ studies, cityNameGenitive }: LocalTestimonialsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                opacity: 0, y: 50, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    if (!studies || studies.length === 0) {
        return null; // Nie renderuj sekcji, jeśli nie ma opinii dla tego miasta
    }

    return (
        <section ref={sectionRef} className="bg-white py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
                    {/* POPRAWKA 3: Ta linia jest teraz poprawna */}
                    Prawdziwe historie z {cityNameGenitive}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {studies.map((study) => (
                        <div key={study.id} className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col h-full">
                            <StarRating />
                            <p className="text-base text-gray-700 my-4 flex-grow italic">
                                "{study.description}"
                            </p>
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                                <UserCircleIcon className="h-6 w-6 text-red-700" />
                                <span className="text-sm font-semibold text-gray-800">{study.client}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}