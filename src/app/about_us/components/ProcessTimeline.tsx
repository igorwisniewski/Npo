"use client";
import React, { useRef, useLayoutEffect } from 'react'; // Zmieniono importy
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        no: '1',
        name: 'Przygotowanie i złożenie wniosku – nawet w 24 godziny',
        description: 'Po otrzymaniu kompletu wymaganych dokumentów niezwłocznie opracowujemy wniosek o ogłoszenie upadłości. W większości spraw trafia on do sądu już w ciągu jednej doby.'
    },
    {
        no: '2',
        name: 'Decyzja sądu – nawet 48 godzin od złożenia',
        description: 'Sąd weryfikuje dokumentację i może wydać postanowienie o ogłoszeniu upadłości nawet w ciągu dwóch dni. Od tego momentu procedura formalnie rusza.'
    },
    {
        no: '3',
        name: 'Postępowanie syndyka – spokojnie i zdalnie',
        description: 'Syndyk obejmuje nadzór nad masą upadłości i ocenia Twoją sytuację finansową. W zdecydowanej większości przypadków kontakt odbywa się wyłącznie listownie, bez osobistych spotkań.'
    },
    {
        no: '4',
        name: 'Ustalenie planu spłat – dostosowanego do Twoich możliwości',
        description: 'Sąd określa warunki spłaty wierzycieli, uwzględniając Twoje realne dochody i koszty życia. To rozwiązanie, które ma być wykonalne i sprawiedliwe – nie represyjne.'
    },
    {
        no: '5',
        name: 'Umorzenie długów – nowy start',
        description: 'Po zrealizowaniu planu spłaty pozostałe zobowiązania zostają trwale umorzone. Odzyskujesz spokój, finansową wolność i możliwość rozpoczęcia nowego etapu życia bez długów.'
    },
];


export default function ProcessTimeline() {
    const container = useRef(null);

    // Używamy useLayoutEffect zamiast useGSAP
    useLayoutEffect(() => {
        // Tworzymy kontekst GSAP dla bezpiecznego zarządzania animacjami
        const ctx = gsap.context(() => {
            // Animacja linii
            gsap.from(".timeline-line", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
                scaleY: 0,
                transformOrigin: "top center",
                ease: "none",
            });

            // Animacja dla każdego elementu osi czasu
            const items = gsap.utils.toArray('.timeline-item');

            // Poprawiono błąd TypeScript: 'item: never' -> 'item: Element'
            //@ts-expect-error eror
            items.forEach((item: Element) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: 'play none none none',
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            });
        }, container); // Przekazujemy 'scope' do kontekstu

        // Zwracamy funkcję czyszczącą
        return () => ctx.revert();
    }, []); // Pusta tablica zależności

    return(
        <section ref={container} className="bg-slate-50 py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" id="proces">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Etapy Postępowania </h2>
                    <p className="mt-4 text-lg text-gray-600">Przeprowadzimy Cię bezpiecznie przez każdy z poniższych kroków.</p>
                </div>

                <div className="relative mt-20 flow-root">
                    <div className="timeline-line absolute left-6 top-2 h-full w-0.5 bg-red-800/20 lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true"></div>

                    <div className="relative flex flex-col gap-12">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={step.no} className="timeline-item">
                                    {/* --- UKŁAD MOBILNY (JEDNOSTRONNY) --- */}
                                    <div className="lg:hidden relative flex items-start">
                                        <div className="absolute left-6 top-1 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-white font-bold">
                                            {step.no}
                                        </div>
                                        <div className="ml-16 w-full flex-grow p-5 bg-white rounded-xl shadow-md">
                                            <h3 className="font-semibold text-gray-900">{step.name}</h3>
                                            <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* --- UKŁAD DESKTOPOWY (NAPRZEMIENNY) --- */}
                                    <div className={`hidden lg:grid grid-cols-2 gap-x-8 relative`}>
                                        {isEven ? (
                                            <div></div>
                                        ) : (
                                            <div className="p-6 bg-white rounded-xl shadow-lg text-right">
                                                <h3 className="font-semibold text-gray-900">{step.name}</h3>
                                                <p className="mt-1 text-gray-600">{step.description}</p>
                                            </div>
                                        )}
                                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-800 text-white font-bold text-xl shadow-md">{step.no}</div>
                                        </div>
                                        {isEven ? (
                                            <div className="p-6 bg-white rounded-xl shadow-lg text-left">
                                                <h3 className="font-semibold text-gray-900">{step.name}</h3>
                                                <p className="mt-1 text-gray-600">{step.description}</p>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}