'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Gavel, TrendingUp, ChevronDown } from 'lucide-react';
import Link from 'next/link'
gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    Briefcase: Briefcase,
    Gavel: Gavel,
    TrendingUp: TrendingUp,
};

/**
 * Komponent ServiceCard (Karta Usługi).
 * Zaktualizowany o flexbox, aby wyrównać wysokość.
 */
const ServiceCard = ({ icon: Icon, title, subtitle, description, buttonText }) => {

    const cardRef = useRef(null);

    useLayoutEffect(() => {
        const card = cardRef.current;

        gsap.set(card, { opacity: 0, y: 50 });

        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
            }
        });

        const tlHover = gsap.timeline({ paused: true })
            .to(card, {
                y: -4,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                duration: 0.3,
                ease: 'power2.out'
            });

        card.addEventListener('mouseenter', () => tlHover.play());
        card.addEventListener('mouseleave', () => tlHover.reverse());

        return () => {
            card.removeEventListener('mouseenter', () => tlHover.play());
            card.removeEventListener('mouseleave', () => tlHover.reverse());
        };

    }, []);

    return (
        // === ZMIANY W TEJ LINII ===
        // 1. Dodajemy 'h-full' (aby karta wypełniła komórkę siatki)
        // 2. Dodajemy 'flex flex-col' (aby umożliwić elastyczne rozciąganie)
        <div ref={cardRef} className="bg-white p-6 sm:p-8 rounded-xl shadow-xl h-full flex flex-col">

            {/* Nagłówek (bez zmian) */}
            <div className="flex items-center mb-4">
                <div className="p-3 bg-red-800 rounded-lg mr-4 shadow-md">
                    <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>

            {/* === ZMIANA: Dodajemy 'div' z 'flex-grow' === */}
            {/* Ten kontener "wypchnie" przycisk na sam dół karty */}
            <div className="flex-grow">
                <p className="text-base text-left font-bold text-red-700 mb-2">{subtitle}</p>
                <p className="text-gray-600 text-left mb-6 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Przycisk (bez zmian, ale teraz będzie na dole) */}
            <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 text-white bg-red-800 hover:bg-red-900 transition duration-300 font-medium rounded-lg shadow-lg"
            >
                {buttonText}
            </Link>
        </div>
    );
};

/**
 * Komponent ServicesSection (bez zmian w logice).
 */
const ServicesSection = ({ servicesData }) => {

    const textContentRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textContentRef.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: textContentRef.current,
                    start: 'top 80%',
                    once: true,
                }
            });
        }, textContentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            className="flex justify-center items-center py-16 md:py-24 bg-[#FCEFEE] min-h-[100vh] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <div ref={textContentRef}>
                    <p className="inline-block text-sm font-bold bg-red-800 pt-1 pb-1 pl-5 pr-5 text-white rounded-md uppercase tracking-wider">
                        Twoje wyjście na prostą
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 mb-3">
                        Stosujemy rozwiązania które działają
                    </h2>
                    <p className="text-base text-gray-600 mb-12">
                        To nie są puste obietnice a realne sposoby na pomoc, tobie twojej firmie i rodzinie <br className="hidden sm:inline" />
                        Przeczytaj, zobacz i napisz do nas
                    </p>
                </div>

                {/* Siatka kart usług */}
                <div
                    className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10"
                >
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={iconMap[service.iconName]}
                            title={service.title}
                            subtitle={service.subtitle}
                            description={service.description}
                            buttonText={service.buttonText}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;