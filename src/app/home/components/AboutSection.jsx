// AboutSection.jsx
'use client'; // Wymagane dla GSAP i hooków

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StandardImage from './StandardImage';
import Link from 'next/link'

// Rejestrujemy wtyczkę ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Komponent AboutSection ("O nas").
 * * @param {object} props - Właściwości komponentu.
 * @param {string} props.officeImageSrc - Ścieżka do obrazka biura.
 */
const AboutSection = ({ officeImageSrc }) => {
    // Referencje do elementów, które będziemy animować
    const sectionRef = useRef(null);
    const imageColRef = useRef(null);
    const textColRef = useRef(null);

    useLayoutEffect(() => {
        // Używamy gsap.context() dla bezpiecznego czyszczenia animacji
        const ctx = gsap.context(() => {

            // 1. Ustawiamy stan początkowy (przed animacją)

            // Kolumna z obrazem będzie wjeżdżać z lewej
            gsap.set(imageColRef.current, { opacity: 0, x: -50 });

            // Dzieci kolumny tekstowej (h2, p, p, a) będą wjeżdżać z dołu
            gsap.set(textColRef.current.children, { opacity: 0, y: 30 });

            // 2. Tworzymy oś czasu (timeline)
            const tl = gsap.timeline({
                // Używamy ScrollTrigger do uruchomienia animacji
                scrollTrigger: {
                    trigger: sectionRef.current, // Element wyzwalający
                    start: 'top 80%',         // Rozpocznij, gdy 80% sekcji jest widoczne
                    once: true,              // Uruchom tylko raz
                },
                defaults: { ease: 'power3.out', duration: 1 }
            });

            tl
                // Krok 1: Animuj wjazd obrazu
                .to(imageColRef.current, {
                    opacity: 1,
                    x: 0
                })
                // Krok 2: Animuj wjazd tekstu (element po elemencie)
                .to(textColRef.current.children, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15, // Odstęp 0.15s między każdym elementem
                    duration: 0.8
                }, "-=0.7"); // Rozpocznij 0.7s przed końcem animacji obrazu

        }, sectionRef); // Ograniczamy kontekst GSAP do tej sekcji

        // Funkcja czyszcząca
        return () => ctx.revert();
    }, []); // Pusta tablica zależności = uruchom tylko raz

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col-reverse lg:flex-row items-center lg:space-x-12">

                    {/* Lewa kolumna (na desktopie): Obrazek biura */}
                    {/* Dodajemy ref={imageColRef} */}
                    <div ref={imageColRef} className="w-full lg:w-1/2 mb-10 lg:mb-0 order-2 lg:order-1">
                        <div className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] relative rounded-3xl overflow-hidden shadow-2xl">
                            <div
                                className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm"
                            >
                                <StandardImage
                                    src={officeImageSrc}
                                    alt="Sala konferencyjna kancelarii"
                                    fill={true}
                                    style={{ objectFit: 'cover' }}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Prawa kolumna (na desktopie): Treść "Parę słów o nas" */}
                    {/* Dodajemy ref={textColRef} */}
                    <div ref={textColRef} className="w-full lg:w-1/2 order-1 lg:order-2">
                        {/* h2, p, p, a staną się 'children' dla animacji stagger */}
                        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
                            Parę słów o nas
                        </h2>

                        <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                            Nie jesteśmy tylko kolejną kancelarią.
                        </p>

                        <p className="text-base text-gray-700 mb-4 leading-relaxed">
                            Jesteśmy Siecią Kancelarii Prawnych o zasięgu globalnym, aczkolwiek z absolutnie polskimi korzeniami i z siedzibą główną w Polsce, reprezentującą naszych Klientów w bardzo szerokim pojmowaniu tego słowa.
                            Pozyskujemy naszym klientom dotacje unijne oraz prowadzimy procesy prywatnych inwestycji kapitałowych (Fundusze z Polski, krajów pozaunijnych, oraz krajów Beneluksu). Pomagamy w zakupach nieruchomości, sprzedaży, doinwestowaniu firm oraz tworzeniu biznesplanów.
                        </p>

                        {/* Przycisk "Dowiedz się więcej" */}
                        <Link
                            href="/about_us"
                            className="mt-9 px-6 py-3  text-white bg-red-800 hover:bg-white hover:text-red-900 transition duration-300 font-medium rounded-xl shadow-md border border-red-800 text-sm sm:text-base whitespace-nowrap"
                        >
                            Dowiedz się więcej
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;