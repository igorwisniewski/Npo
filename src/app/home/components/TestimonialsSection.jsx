// src/app/home/components/TestimonialsSection.jsx
'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
// Używamy 'solid' dla wypełnionych gwiazdek, zgodnie ze zrzutem ekranu
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dane dla głównej recenzji
const featuredTestimonial = {
    name: 'Karol Ptasznik',
    initial: 'K',
    rating: 5,
    time: '1 miesiąc temu',
    text: "Chciałbym serdecznie polecić usługi kancelarii. Od początku do końca współpraca przebiegała na najwyższym poziomie. Profesjonalizm, zaangażowanie i skuteczność to cechy, które najlepiej opisują ich podejście do klienta. Szczególne podziękowania kieruję do pana Kamila, którego konkretny i pozytywny kontakt sprawił, że cały proces był niezwykle sprawny i bezstresowy. Dziękuję za pomoc i z pełnym przekonaniem polecam!"
};

// Dane do slidera
const sliderTestimonials = [
    {
        id: 1,
        name: 'Piotr',
        initial: 'P',
        rating: 5,
        time: '1 miesiąc temu',
        text: 'Znakomita współpraca i pełne zaangażowanie. Od początku widać, że pracują tam ludzie, którzy naprawdę chcą pomóc.'
    },
    {
        id: 2,
        name: 'Wojciech',
        initial: 'W',
        rating: 5,
        time: '1 miesiąc temu',
        text: 'Witam serdecznie moja opinia jest na 5 gwiazdek polecam osobom w trudnej sytuacji bardzo miła obsługa i fachowa pomoc .'
    },
    {
        id: 3,
        name: 'Beata',
        initial: 'B',
        rating: 5,
        time: '1 miesiąc temu',
        text: 'Bardzo polecam wszystkim znajdującym się w trudnej sytuacji. Kancelaria jest godna polecenia, udowadniają, że nie ma drogi bez wyjścia.'
    },
    {
        id: 4,
        name: 'Anna',
        initial: 'A',
        rating: 5,
        time: '2 miesiące temu',
        text: 'Pełen profesjonalizm i ogromne wsparcie na każdym etapie. Czułam się bezpiecznie, wiedząc, że moją sprawą zajmują się eksperci.'
    }
];

// Komponent do renderowania gwiazdek
const StarRating = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(rating)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
        ))}
    </div>
);

// Karta dla slidera
const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col">
        <div className="flex items-center mb-2">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-red-800 text-gray-50 font-bold text-xl">
                {testimonial.initial}
            </span>
            <div className="ml-3">
                <p className="text-base font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.time}</p>
            </div>
        </div>
        <StarRating rating={testimonial.rating} />
        <p className="text-sm text-gray-600 mt-3 flex-grow">{testimonial.text}</p>
    </div>
);


export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const featuredCardRef = useRef(null);
    const manImageRef = useRef(null);
    const sliderRef = useRef(null);

    // Logika slidera (1 na mobilce, 3 na desktopie)
    const [step, setStep] = useState(1);

    useLayoutEffect(() => {
        const updateStep = () => {
            const newStep = window.innerWidth < 768 ? 1 : 3;
            setStep(newStep);
        };
        updateStep(); // Ustaw na starcie
        window.addEventListener('resize', updateStep); // Aktualizuj przy zmianie rozmiaru
        return () => window.removeEventListener('resize', updateStep);
    }, []);

    const numPages = Math.ceil(sliderTestimonials.length / step);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % numPages);
    };
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + numPages) % numPages);
    };

    // Animacje GSAP
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%',
                    once: true
                }
            });

            gsap.from(featuredCardRef.current, {
                opacity: 0,
                x: -50,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: featuredCardRef.current,
                    start: 'top 85%',
                    once: true
                }
            });

            gsap.from(manImageRef.current, {
                opacity: 0,
                x: 50,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: featuredCardRef.current,
                    start: 'top 85%',
                    once: true
                }
            });

            gsap.from(sliderRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sliderRef.current,
                    start: 'top 90%',
                    once: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Aktualizacja transformacji slidera
    const sliderTransform = -currentIndex * (100 / numPages) * (numPages / (sliderTestimonials.length / step));

    return (
        <section ref={sectionRef} className="py-16 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Nagłówki */}
                <div ref={headerRef} className="text-center max-w-2xl mx-auto">
                    <p className="inline-block text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                        Tak nas oceniają
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-3">
                        Przeczytaj co sądzą inni
                    </h2>
                    <p className="text-lg text-gray-600">
                        Prawdziwe historie, wygrane sprawy, ocalony spokój
                    </p>
                </div>

                {/* Sekcja Głównej Recenzji */}
                <div className="relative mt-16 lg:mt-24 ">


                    <div
                        ref={featuredCardRef}
                        className="relative lg:w-3/4 xl:w-2/3 bg-red-200 p-8 md:p-12 rounded-3xl shadow-lg m-auto "
                    >
                        <div className="flex items-center mb-4">
                            <span className="flex items-center justify-center h-16 w-16 rounded-full bg-red-700 text-white font-bold text-4xl">
                                {featuredTestimonial.initial}
                            </span>
                            <div className="ml-4">
                                <h3 className="text-2xl font-bold text-gray-900">{featuredTestimonial.name}</h3>
                                <StarRating rating={featuredTestimonial.rating} />
                            </div>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed">
                            {featuredTestimonial.text}
                        </p>
                        <p className="text-sm text-gray-500 mt-4 italic">
                            {featuredTestimonial.time}
                        </p>
                    </div>



                </div>

                {/* Slider mniejszych recenzji */}
                <div ref={sliderRef} className="mt-16">
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                // Logika slidera: przesuwamy o % szerokości strony
                                style={{ transform: `translateX(-${currentIndex * (100 / step)}%)` }}
                            >
                                {/* Mapujemy wszystkie karty, szerokość ustawi kontener flex */}
                                {sliderTestimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        // Ustawiamy bazową szerokość (100% / 1 na mobilce, 100% / 3 na desktopie)
                                        className="flex-shrink-0 w-full md:w-1/3 px-3"
                                    >
                                        <TestimonialCard testimonial={testimonial} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Przyciski nawigacyjne (tylko desktop) */}
                        <button
                            onClick={handlePrev}
                            className="hidden lg:block absolute top-1/2 -left-6 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
                            aria-label="Poprzednia opinia"
                        >
                            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
                            aria-label="Następna opinia"
                        >
                            <ArrowRightIcon className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Kropki nawigacyjne (widoczne zawsze) */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[...Array(numPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full ${currentIndex === i ? 'bg-red-700' : 'bg-gray-300'} transition-colors`}
                                aria-label={`Pokaż stronę ${i + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}