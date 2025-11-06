'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

// --- Komponent Logo (bez zmian) ---
const Logo = () => (
    <Link href="/" className="text-4xl font-extrabold text-red-700 tracking-tight">
        NPO
    </Link>
);

// --- Definicje Linków (bez zmian) ---
const navLinks = [
    {
        href: '/about_us',
        label: 'O nas',
        subLinks: [
            { href: '/about_us#nasz-zespol', label: 'Nasz Zespół' },
            { href: '/about_us#historia', label: 'Nasz Historia' },
            { href: '/about_us#kim-jestesmy', label: 'Kim jesteśmy' },
        ]
    },
    { href: '/slowniczek', label: 'Słownik' },
];

const rightNavLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Kontakt' },
];

// --- Główny Komponent Navbar ---
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Referencje (bez zmian)
    const oNasLinkRef = useRef<HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // === NOWA ZMIANA: Ref dla timera opóźniającego ===
    const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Animacja GSAP
    useEffect(() => {
        gsap.set(dropdownRef.current, {
            opacity: 0,
            visibility: 'hidden',
            y: -15,
        });

        // Inicjalizacja timeline (bez zmian)
        timelineRef.current = gsap.timeline({ paused: true, reversed: true })
            .to(dropdownRef.current, {
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });

        // === ZMIENIONA LOGIKA HOVER ===

        const oNasLink = oNasLinkRef.current;
        const dropdown = dropdownRef.current;

        // Funkcja otwierająca menu
        const onMouseEnter = () => {
            // Anuluj timer zamykania, jeśli istnieje
            if (leaveTimerRef.current) {
                clearTimeout(leaveTimerRef.current);
                leaveTimerRef.current = null;
            }
            // Odtwórz animację otwierania
            timelineRef.current?.play();
        };

        // Funkcja zamykająca menu (z opóźnieniem)
        const onMouseLeave = () => {
            // Ustaw timer, który zamknie menu po 100ms
            leaveTimerRef.current = setTimeout(() => {
                timelineRef.current?.reverse();
            }, 100); // 100ms czasu na przejście kursorem
        };

        // Przypisz listenery do OBU elementów (linku "O nas" i całego dropdownu)
        if (oNasLink && dropdown) {
            oNasLink.addEventListener('mouseenter', onMouseEnter);
            oNasLink.addEventListener('mouseleave', onMouseLeave);
            dropdown.addEventListener('mouseenter', onMouseEnter);
            dropdown.addEventListener('mouseleave', onMouseLeave);
        }

        // Sprzątanie
        return () => {
            if (oNasLink && dropdown) {
                oNasLink.removeEventListener('mouseenter', onMouseEnter);
                oNasLink.removeEventListener('mouseleave', onMouseLeave);
                dropdown.removeEventListener('mouseenter', onMouseEnter);
                dropdown.removeEventListener('mouseleave', onMouseLeave);
            }
            timelineRef.current?.kill();
            if (leaveTimerRef.current) {
                clearTimeout(leaveTimerRef.current);
            }
        };
    }, []);

    // Pozycjonowanie trójkąta (Careta) - bez zmian
    useLayoutEffect(() => {
        const alignCaret = () => {
            if (oNasLinkRef.current && caretRef.current) {
                const linkRect = oNasLinkRef.current.getBoundingClientRect();
                const linkCenter = linkRect.left + linkRect.width / 2;
                gsap.set(caretRef.current, {
                    left: linkCenter,
                    x: '-50%'
                });
            }
        };

        alignCaret();
        window.addEventListener('resize', alignCaret);
        return () => window.removeEventListener('resize', alignCaret);
    }, []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            {/* Kontener centrujący */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* === WIDOK DESKTOP === */}
                    <div className="hidden lg:flex flex-1 items-center justify-start space-x-8">
                        {navLinks.map((link) => (
                            link.subLinks ? (
                                // === SEKCJA "O NAS" ===
                                // Zmieniliśmy 'div' na 'Link', aby sam link był refem
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    ref={oNasLinkRef} // Ref bezpośrednio na linku
                                    className="h-full flex items-center text-base font-semibold text-gray-700 hover:text-red-700 transition-colors"
                                >
                                    {link.label}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Link>
                            ) : (
                                // Linki bez dropdownu (np. Słownik)
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-base font-semibold text-gray-700 hover:text-red-700 transition-colors h-full flex items-center"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* === Reszta (Logo, Prawe linki) === */}
                    <div className="hidden lg:flex flex-shrink-0"><Logo /></div>
                    <div className="hidden lg:flex flex-1 items-center justify-end space-x-8">
                        {rightNavLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-base font-semibold text-gray-700 hover:text-red-700 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* === WIDOK MOBILE (Bez zmian) === */}
                    <div className="lg:hidden flex flex-1 justify-between items-center">
                        <Logo />
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation" aria-expanded={isOpen}>
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ===============================================
      === "UKRYTA SEKCJA" (MEGA MENU) - 100% WIDOKU ===
      ===============================================
      */}
            <div
                ref={dropdownRef} // Ten element dostaje teraz mouseenter/mouseleave
                className="absolute top-full left-0 right-0 z-40 invisible"
            >
                {/* Czerwona linia (100% szerokości) */}
                <div className="h-0.5 bg-red-700 w-full"></div>

                {/* Trójkąt (Caret) */}
                <div
                    ref={caretRef}
                    className="absolute -top-2 w-0 h-0
                      border-l-8 border-l-transparent
                      border-r-8 border-r-transparent
                      border-b-8 border-b-red-700"
                />

                {/* Tło menu (100% szerokości) */}
                <div className="bg-white shadow-lg">
                    {/* Kontener centrujący treść menu */}
                    <div className=" mx-auto pl-4 sm:pl-6 lg:pl-8">
                        <div className="flex overflow-hidden h-64">

                            {/* Lewa Kolumna (Linki) */}
                            <div
                                className="w-1/3 bg-white p-8 flex flex-col justify-center m-3"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
                            >
                                <nav className="items-center">
                                <div className="flex flex-col space-y-4 ">
                                    {navLinks[0].subLinks?.map((sub, index) => (
                                        <Link
                                            key={sub.label}
                                            href={sub.href}
                                            className={`text-2xl font-bold hover:text-red-700 transition-colors`}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                                </nav>
                            </div>

                            {/* Prawa Kolumna (Obraz) */}
                            <div className="w-2/3 relative overflow-hidden bg-blue-500">
                                <Image
                                    src="/images/navabout.png" // ZMIEŃ NA OBRAZEK Z MENU
                                    alt="Nasza misja"
                                    layout="fill"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* === KONIEC "UKRYTEJ SEKCJI" === */}

            {/* === ROZWIJANE MENU MOBILE (Bez zmian) === */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50">
                    <div className="flex flex-col px-6 py-6 space-y-4">
                        {[...navLinks, ...rightNavLinks].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-lg font-medium text-gray-700 hover:text-red-700"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="w-full text-center px-4 py-3 mt-4 bg-red-700 text-white rounded-md font-bold hover:bg-red-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Skontaktuj się z nami
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}