"use client";

// 1. Dodano 'useLayoutEffect' do importu
import React, {useState, useRef, useEffect, useLayoutEffect, useCallback} from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CheckBadgeIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// 2. Usunięto 'useGSAP'
// import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DonutChart from "@/app/home/components/donutChart";

gsap.registerPlugin(ScrollTrigger);

const caseStudiesData = [
    {
        id: 1,
        debtAmount: '115 tys.',
        remissionPercentage: 100,
        remissionAmount: '115 000 zł',
        repaymentPlan: 'brak planu spłaty',
        description: 'Klientka po burzliwym rozstaniu została z kredytami konsumpcyjnymi, które brała na remont mieszkania partnera. Samotne wychowywanie trójki dzieci i praca na pół etatu uniemożliwiały spłatę. Sąd uznał jej trudną sytuację i umorzył całość długu bez ustalania rat.',
        client: 'Pani Anna, 38 lat, Łódź'
    },
    {
        id: 2,
        debtAmount: '89 tys.',
        remissionPercentage: 92,
        remissionAmount: '81 800 zł',
        repaymentPlan: '300 zł / 24 m-ce',
        description: 'Emeryt wpadł w pętlę kredytową, próbując pomóc finansowo rodzinie. Komornik zajmował znaczną część jego emerytury. Dzięki upadłości wstrzymano egzekucję, a sąd ustalił niską ratę, którą senior jest w stanie spłacać bez wyrzeczeń.',
        client: 'Pan Tadeusz, 71 lat, Bydgoszcz'
    },
    {
        id: 3,
        debtAmount: '54 tys.',
        remissionPercentage: 100,
        remissionAmount: '54 000 zł',
        repaymentPlan: 'brak planu spłaty',
        description: 'Przewlekła choroba uniemożliwiła klientce wykonywanie zawodu, co doprowadziło do zaciągania "chwilówek" na leki i życie. Przedstawiliśmy w sądzie pełną dokumentację medyczną. Sąd odstąpił od ustalania planu spłaty i oddłużył klientkę w 100%.',
        client: 'Pani Katarzyna, 45 lat, Szczecin'
    },
    {
        id: 4,
        debtAmount: '310 tys.',
        remissionPercentage: 92,
        remissionAmount: '284 800 zł',
        repaymentPlan: '700 zł / 36 m-cy',
        description: 'Klient prowadził firmę transportową, która upadła przez wzrost cen paliw i brak zleceń. Został z niespłaconymi leasingami. Obecnie pracuje na etacie. Sąd zgodził się na plan spłaty dostosowany do jego pensji kierowcy, umarzając większość długu.',
        client: 'Pan Tomasz, 42 lata, Gdynia'
    },
    {
        id: 5,
        debtAmount: '185 tys.',
        remissionPercentage: 96,
        remissionAmount: '177 800 zł',
        repaymentPlan: '200 zł / 36 m-cy',
        description: 'Nieudany start-up technologiczny wpędził młodego programistę w długi. Przez stres związany z windykacją nie mógł efektywnie pracować. Sąd przychylił się do wniosku o upadłość, ustalając symboliczną ratę, co pozwoliło klientowi wrócić do równowagi.',
        client: 'Pan Krystian, 31 lat, Rzeszów'
    },
    {
        id: 6,
        debtAmount: '520 tys.',
        remissionPercentage: 93,
        remissionAmount: '484 000 zł',
        repaymentPlan: '1000 zł / 36 m-cy',
        description: 'Klient po zamknięciu dużej firmy budowlanej został z ogromnymi zobowiązaniami bankowymi. Groziła mu utrata domu rodzinnego. Skuteczna strategia pozwoliła zachować nieruchomość i zredukować dług o prawie pół miliona złotych.',
        client: 'Pan Marek, 58 lat, Lublin'
    },
];

export default function CaseStudies() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const container = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

// Logika slidera
    const step = typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
    const numPages = Math.ceil(caseStudiesData.length / step);

// 1. Używamy useCallback do memoizacji funkcji
//    Dodajemy wszystkie wartości (props, state, zmienne),
//    których funkcja używa do odczytu.
    const handleNext = useCallback(() => {
        const nextIndex = currentIndex + step;
        setCurrentIndex(nextIndex >= caseStudiesData.length ? 0 : nextIndex);
    }, [currentIndex]); // <-- Zależności dla handleNext

    const handlePrev = useCallback(() => {
        let prevIndex = currentIndex - step;
        if (prevIndex < 0) {
            prevIndex = (numPages - 1) * step;
            if (prevIndex >= caseStudiesData.length) {
                prevIndex = Math.max(0, caseStudiesData.length - step);
            }
        }
        setCurrentIndex(prevIndex);
    }, [currentIndex, numPages]); // <-- Zależności dla handlePrev

// Handlery dotyku również opakowujemy, aby były stabilne
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    }, []); // Pusta tablica, bo nie ma zależności

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    }, []); // Pusta tablica

    const handleTouchEnd = useCallback(() => {
        if (touchStartX.current - touchEndX.current > 75) handleNext();
        if (touchStartX.current - touchEndX.current < -75) handlePrev();
    }, [handleNext, handlePrev]); // <-- Ten handler zależy od innych memoizowanych handlerów

// 2. Aktualizujemy useEffect dla timera
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 7000);
        return () => clearInterval(timer);
    }, [handleNext]); // <-- Zmieniono z [currentIndex] na [handleNext]

// useLayoutEffect dla GSAP (bez zmian)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: container.current, start: "top 80%", toggleActions: "play none none none" }
            });
            tl.from(".animate-casestudy-header", { opacity: 0, y: 40, duration: 0.6, stagger: 0.2 })
                .from(".animate-slider-body", { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, "-=0.4");
        }, container);

        return () => ctx.revert();
    }, []);
    return (
        <section ref={container} className="bg-slate-50 py-8 sm:py-8 mb-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="animate-casestudy-header flex items-center justify-center gap-2 text-sm font-semibold text-primary">
                        <CheckBadgeIcon className="h-6 w-6 text-red-800"/>
                        <span>Zakończone sprawy</span>
                    </div>
                    <h2 className="animate-casestudy-header mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Wyróżnia nas wysoka skuteczność
                    </h2>
                </div>

                <div className="animate-slider-body">
                    <div
                        className="relative overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / step)}%)` }}
                        >
                            {caseStudiesData.map((caseData) => (
                                <div key={caseData.id} className="flex-shrink-0 w-full md:w-1/2 px-2 md:px-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-lg p-8 h-full">
                                        <div className="flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500">ZADŁUŻENIE</p>
                                                <p className="text-4xl font-bold text-gray-900">{caseData.debtAmount} <span className="text-3xl">zł</span></p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-4">
                                                <DonutChart percentage={caseData.remissionPercentage} />
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-500">UMORZENIE</p>
                                                    <p className="text-base text-gray-700">({caseData.remissionAmount})</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mt-4">PLAN SPŁATY</p>
                                                <p className="text-lg font-semibold text-gray-900">{caseData.repaymentPlan}</p>
                                            </div>
                                        </div>
                                        <div className="pt-6 lg:pt-0 lg:pl-8 flex flex-col">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500">OPIS SPRAWY</p>
                                                <p className="mt-2 text-gray-600 flex-grow">{caseData.description}</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                                                <UserCircleIcon className="h-5 w-5"/>
                                                <span>{caseData.client}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={handlePrev} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
                            <ArrowLeftIcon className="h-6 w-6 text-gray-700"/>
                        </button>
                        <button onClick={handleNext} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
                            <ArrowRightIcon className="h-6 w-6 text-gray-700"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}