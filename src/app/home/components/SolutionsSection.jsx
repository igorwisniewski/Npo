// src/app/home/components/SolutionsSection.jsx
'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircleDollarSign, Landmark, CircleMinus, Briefcase, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Komponent karty nie potrzebuje już forwardRef
const ServiceCard = ({ icon: Icon, title, description, isPrimary = false, children, className = "", innerRef }) => {

    const cardBaseClasses = "rounded-2xl p-6 lg:p-6 shadow-lg";
    const cardVariantClasses = isPrimary
        ? "bg-red-800 text-white"
        : "bg-white text-gray-900";

    return (
        <div ref={innerRef} className={`${cardBaseClasses} ${cardVariantClasses} ${className} mt-12 `}>
            {Icon && (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPrimary ? 'bg-red-700' : 'bg-red-100'}`}>
                    <Icon className={`w-6 h-6 ${isPrimary ? 'text-white' : 'text-red-700'}`} />
                </div>
            )}
            <h3 className="text-2xl font-semibold mt-4 mb-2">{title}</h3>
            <p className={`text-sm ${isPrimary ? 'text-red-100' : 'text-gray-600'}`}>
                {description}
            </p>
            {children}
        </div>
    );
};

// Komponent HoverSwapCard nie używa już forwardRef
const HoverSwapCard = ({ frontCardProps, backCardProps }) => {
    // Zarządza własnymi referencjami wewnętrznie
    const containerRef = useRef(null);
    const frontRef = useRef(null);
    const backRef = useRef(null);
    const timelineRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(frontRef.current, { opacity: 1, scale: 1, y: 0 });
            gsap.set(backRef.current, {
                opacity: 0,
                scale: 0.95,
                y: -10,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            });

            const tl = gsap.timeline({ paused: true, reversed: true })
                .to(frontRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    y: 10,
                    duration: 0.2,
                    ease: 'power2.in'
                })
                .to(backRef.current, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                }, "-=0.1");

            timelineRef.current = tl;

            // Używamy referencji do kontenera, która na pewno nie jest null
            containerRef.current.addEventListener('mouseenter', () => tl.play());
            containerRef.current.addEventListener('mouseleave', () => tl.reverse());

        }, containerRef);

        return () => ctx.revert();
    }, []); // Usunięto 'ref' z tablicy zależności

    return (
        // Ten div ma teraz referencję 'containerRef'
        <div ref={containerRef} className="relative">
            <ServiceCard {...frontCardProps} innerRef={frontRef} />
            <ServiceCard {...backCardProps} innerRef={backRef} />
        </div>
    );
};

// Współdzielone właściwości dla karty "Skontaktuj się"
const backCardProps = {
    icon: Phone,
    isPrimary: true,
    title: "Skontaktuj się z nami",
    description: "I uzyskaj pomoc",
    children: (
        <Link
            href="/contact"
            className="inline-block mt-4 px-2 py-2 bg-white text-red-800 font-bold text-sm rounded-lg shadow-md transition-transform duration-300"
        >
            Skontaktuj się
        </Link>
    )
};

export default function SolutionsSection() {
    const sectionRef = useRef(null);
    const textColRef = useRef(null);
    const col1Ref = useRef(null);
    const col2Ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(textColRef.current.children, {
                opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
            });
            gsap.from([col1Ref.current, col2Ref.current], {
                opacity: 0, y: 100, stagger: 0.2, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
            });

            gsap.to(col1Ref.current, {
                yPercent: -10, ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top bottom', end: 'bottom top' }
            });
            gsap.to(col2Ref.current, {
                yPercent: 10, ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top bottom', end: 'bottom top' }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-32 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div ref={textColRef} className="max-w-lg">
                        <span className="text-red-700 font-semibold uppercase">Działamy razem</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                            Ochroń swój majątek z NPO!
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Utonąłeś w pętli chwilówek? A może firma utraciła płynność?
                            W NPO przeanalizujemy Twoją sytuację. Specjalizujemy się w
                            <strong> restrukturyzacji</strong> oraz <strong>upadłości gospodarczej</strong> i
                            <strong> konsumenckiej</strong>. Ochronimy Twój majątek i odzyskamy należne
                            Ci środki. Nie musisz posiadać wiedzy prawnej, aby walczyć o swoje prawa.
                        </p>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">

                            <div ref={col1Ref} className="flex flex-col gap-6 lg:gap-8">
                                <HoverSwapCard
                                    frontCardProps={{
                                        icon: CircleDollarSign,
                                        title: "Umorzenie długu",
                                        description: "Pomorze ci, ponownie wstać na nogi, zacząć nowy rozdział"
                                    }}
                                    backCardProps={backCardProps}
                                />
                                <HoverSwapCard
                                    frontCardProps={{
                                        icon: CircleMinus,
                                        title: "Zmniejszenie należności",
                                        description: "Pomorze ci, zmniejszyć ten ciężar długu czasami nawet o 3/4"
                                    }}
                                    backCardProps={backCardProps}
                                />
                            </div>

                            <div ref={col2Ref} className="flex flex-col gap-6 lg:gap-8 sm:mt-16">
                                <HoverSwapCard
                                    frontCardProps={{
                                        icon: Landmark,
                                        title: "Odroczenie spłat",
                                        description: "Pomorze ci, zmniejszyć ten ciężar długu czasami nawet o 3/4"
                                    }}
                                    backCardProps={backCardProps}
                                />
                                <HoverSwapCard
                                    frontCardProps={{
                                        icon: Briefcase,
                                        title: "Upadłość Gospodarcza",
                                        description: "Pomoc dla Twojej firmy w restrukturyzacji lub ogłoszeniu upadłości."
                                    }}
                                    backCardProps={backCardProps}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}