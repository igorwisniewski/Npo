'use client'; // Wymagane dla useState i GSAP

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Zoptymalizowane dane FAQ (pytania < 30 znaków, odpowiedzi < 90)
const faqData = [
    {
        question: "Czym jest upadłość konsumencka?",
        answer: "To szansa na oddłużenie dla osób prywatnych. Proces ten pozwala na umorzenie długów, których nie da się spłacić."
    },
    {
        question: "Restrukturyzacja a upadłość?",
        answer: "Restrukturyzacja ratuje firmę i pozwala uniknąć bankructwa przez układ z wierzycielami."
    },
    {
        question: "Kto ogłasza upadłość firmy?",
        answer: "Przedsiębiorcy (JDG, spółki), którzy stali się niewypłacalni. Pomaga to w kontrolowanym zamknięciu."
    },
    {
        question: "Czy stracę mieszkanie?",
        answer: "Nie zawsze. Prawo chroni część majątku. Analizujemy każdą sprawę, by chronić Twój dom."
    },
    {
        question: "Ile trwa taki proces?",
        answer: "Czas zależy od skomplikowania sprawy. Upadłość konsumencka trwa zwykle kilka miesięcy."
    },
    {
        question: "Kto może ogłosić upadłość?",
        answer: "Każda osoba fizyczna, która stała się niewypłacalna, nawet jeśli nie posiada żadnego majątku."
    },
    {
        question: "Jakie długi są umarzane?",
        answer: "Umorzeniu podlegają głównie długi cywilnoprawne. Wyjątkiem są np. alimenty i grzywny sądowe."
    },
    {
        question: "Upadłość a komornik?",
        answer: "Ogłoszenie upadłości wstrzymuje egzekucje komornicze. Syndyk przejmuje zarządzanie majątkiem."
    },
    {
        question: "Co zabierze syndyk?",
        answer: "Syndyk zajmuje majątek wchodzący do masy upadłości, ale pozostawia minimum socjalne."
    },
    {
        question: "Upadłość a praca?",
        answer: "Upadłość nie jest podstawą do zwolnienia. Syndyk może zająć część wynagrodzenia za pracę."
    },
    {
        question: "Ile kosztuje upadłość?",
        answer: "Koszty sądowe to stała opłata. Główne koszty pokrywane są z masy upadłości (majątku dłużnika)."
    },
    {
        question: "Jakie są rodzaje restrukturyzacji?",
        answer: "Główne to: układ (PPU), sanacja, przyspieszone postępowanie układowe i o zatwierdzenie układu."
    },
    {
        question: "Co to jest układ?",
        answer: "To porozumienie dłużnika z wierzycielami. Określa nowe warunki spłaty, np. redukcję długu."
    },
    {
        question: "Kiedy sanacja firmy?",
        answer: "Gdy firma wymaga głębokich zmian. Daje ochronę przed egzekucją i pozwala na wdrożenie planu."
    },
    {
        question: "Czy restrukturyzacja chroni?",
        answer: "Tak, od dnia otwarcia postępowania zawiesza egzekucje komornicze i chroni majątek firmy."
    },
    {
        question: "Czym jest niewypłacalność?",
        answer: "To stan, gdy dłużnik (firma lub osoba) nie reguluje wymagalnych zobowiązań od ponad 3 m-cy."
    },
    {
        question: "Upadłość a kredyt hipoteczny?",
        answer: "Kredyt nie jest automatycznie umarzany. Mieszkanie (zabezpieczenie) wejdzie do masy upadłości."
    },
    {
        question: "Jak złożyć wniosek?",
        answer: "Wnioski składa się elektronicznie przez system Krajowego Rejestru Zadłużonych (KRZ)."
    },
    {
        question: "Czy upadłość anuluje ZUS?",
        answer: "Upadłość konsumencka nie umarza długów publicznoprawnych, jak ZUS czy podatki."
    },
    {
        question: "Czy można ogłosić ją znów?",
        answer: "Tak, ale obowiązują okresy karencji. Kolejny wniosek można złożyć zazwyczaj po 10 latach."
    }
];
/**
 * Komponent wewnętrzny dla pojedynczego elementu FAQ (Akordeon)
 */
//@ts-expect-error eror
const FaqItem = ({ question, answer, isOpen, onClick }) => {
    const answerRef = useRef(null);
    const iconRef = useRef(null);
    const tlRef = useRef(null);

    // Używamy useLayoutEffect do bezpiecznego tworzenia animacji
    useLayoutEffect(() => {
        // Ustawiamy stan początkowy (ukryty)
        gsap.set(answerRef.current, { height: 0, opacity: 0, paddingBottom: 0 });

        // Tworzymy timeline GSAP dla animacji otwierania/zamykania
        //@ts-expect-error eror
        tlRef.current = gsap.timeline({ paused: true })
            .to(answerRef.current, {
                height: 'auto',
                opacity: 1,
                paddingBottom: '16px', // 1rem
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(iconRef.current, {
                rotate: 180,
                duration: 0.3,
                ease: 'power2.out'
            }, 0); // Uruchom animację ikony w tym samym czasie (pozycja 0)

    }, []);

    // Używamy useEffect do odtwarzania lub odwracania animacji
    useEffect(() => {
        if (isOpen) {
            //@ts-expect-error eror
            tlRef.current.play();
        } else {
            //@ts-expect-error eror
            tlRef.current.reverse();
        }
    }, [isOpen]);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="flex justify-between items-center w-full py-5 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
                <div ref={iconRef}>
                    <ChevronDown className="w-5 h-5 text-red-700 transition-colors" />
                </div>
            </button>
            <div ref={answerRef} className="overflow-hidden opacity-0" style={{ height: 0 }}>
                <p className="text-base text-gray-600">
                    {answer}
                </p>
            </div>
        </div>
    );
};


/**
 * Główny komponent sekcji FAQ
 */
export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    // Animacja wjazdu sekcji przy scrollu
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animacja nagłówka
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true
                }
            });

            // Animacja wjazdu listy FAQ (każdy element po kolei)
            gsap.from(".faq-item", {
                opacity: 0,
                y: 20,
                stagger: 0.1, // Opóźnienie między elementami
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: ".faq-item", // Używamy klasy jako triggera
                    start: 'top 85%',
                    once: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleItemClick = (index: number | React.SetStateAction<null>) => {
        // Pozwala na zamykanie otwartego już elementu
        //@ts-expect-error eror
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="bg-gray-50 py-20 lg:py-32" id="faq">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">

                {/* Nagłówek sekcji */}
                <div ref={headerRef} className="text-center mb-12">
                    <p className="text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase mx-auto">
                        Masz pytania?
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Często zadawane pytania
                    </h2>
                </div>

                {/* Lista akordeonów */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    {faqData.map((faq, index) => (
                        <div key={index} className="faq-item"> {/* Klasa do animacji wjazdu */}
                            <FaqItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleItemClick(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}