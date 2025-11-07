'use client';
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface LocalHeroProps {
    title: string;
    description: string;
}

export default function LocalHero({ title, description }: LocalHeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animacja wjazdu dla tekstu
            // @ts-ignore
            gsap.from(heroRef.current.children, {
                opacity: 0,
                y: 20,
                stagger: 0.2, // Tytuł, opis, przycisk - jeden po drugim
                duration: 0.8,
                ease: 'power2.out',
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-gradient-to-r from-red-900 to-red-800 py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div ref={heroRef} className="max-w-3xl text-center mx-auto">
                    {/* Zgodne z SEO: H1 < 30 znaków */}
                    <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                        {title}
                    </h1>
                    {/* Zgodne z SEO: Opis < 90 znaków */}
                    <p className="mt-6 text-lg sm:text-xl text-red-100">
                        {description}
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/formularz"
                            className="inline-block px-8 py-3 text-white bg-white/10 hover:bg-white/20 transition duration-300 font-medium rounded-lg shadow-lg"
                        >
                            Bezpłatna Konsultacja
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}