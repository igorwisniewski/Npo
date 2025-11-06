'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

// --- Komponent Logo (bez zmian) ---
const Logo = () => (
    <Link href="/" className="text-4xl font-extrabold text-red-700 tracking-tight">
        <Image src="/images/npopng.png" alt="logo" width="100" height="50" />
    </Link>
);

// --- Komponenty Linków (bez zmian) ---
const NavLink = ({ href, label }: { href: string, label: string }) => (
    <Link
        href={href}
        className="text-base font-semibold text-gray-700 hover:text-red-700 transition-colors h-full flex items-center"
    >
        {label}
    </Link>
);

const NavDropdownLink = ({ link, children }: { link: { href: string, label: string }, children: React.ReactNode }) => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Animacja GSAP (bez zmian)
    useEffect(() => {
        gsap.set(dropdownRef.current, {
            opacity: 0,
            visibility: 'hidden',
            y: -15,
        });

        timelineRef.current = gsap.timeline({ paused: true, reversed: true })
            .to(dropdownRef.current, {
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });

        const linkEl = linkRef.current;
        const dropdownEl = dropdownRef.current;

        const onMouseEnter = () => {
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
            timelineRef.current?.play();
        };
        const onMouseLeave = () => {
            leaveTimerRef.current = setTimeout(() => timelineRef.current?.reverse(), 100);
        };

        if (linkEl && dropdownEl) {
            linkEl.addEventListener('mouseenter', onMouseEnter);
            linkEl.addEventListener('mouseleave', onMouseLeave);
            dropdownEl.addEventListener('mouseenter', onMouseEnter);
            dropdownEl.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
            if (linkEl && dropdownEl) {
                linkEl.removeEventListener('mouseenter', onMouseEnter);
                linkEl.removeEventListener('mouseleave', onMouseLeave);
                dropdownEl.removeEventListener('mouseenter', onMouseEnter);
                dropdownEl.removeEventListener('mouseleave', onMouseLeave);
            }
            timelineRef.current?.kill();
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        };
    }, []);

    // Pozycjonowanie trójkąta (Careta) (bez zmian)
    useLayoutEffect(() => {
        const alignCaret = () => {
            if (linkRef.current && caretRef.current) {
                const linkRect = linkRef.current.getBoundingClientRect();
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
        <div className="h-full flex items-center">
            <Link
                href={link.href}
                ref={linkRef}
                className="flex items-center text-base font-semibold text-gray-700 hover:text-red-700 transition-colors"
            >
                {link.label}
                <ChevronDown className="w-4 h-4 ml-1" />
            </Link>

            <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 z-40 invisible"
            >
                <div className="h-0.5 bg-red-700 w-full"></div>
                <div
                    ref={caretRef}
                    className="absolute -top-2 w-0 h-0
                      border-l-8 border-l-transparent
                      border-r-8 border-r-transparent
                      border-b-8 border-b-red-700"
                />
                <div className="bg-white shadow-lg">
                    {/* Zmieniamy tylko zawartość tego diva */}
                    {children}
                </div>
            </div>
        </div>
    );
};


// ===================================================================
// === GŁÓWNY KOMPONENT NAVBAR (Zaktualizowany layout dropdownów) ===
// ===================================================================
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // --- Definicja zawartości dla "O nas" ---
    const oNasDropdown = (
        <div className="flex h-64">
            {/* KOLUMNA LEWA (tekst):
              Używamy paddingu i marginesów auto, aby wyrównać treść
              bezpośrednio pod strzałką.
            */}
            <div className="flex-shrink-0 w-1/2"> {/* Zmieniamy na flex-shrink-0 w-1/2 */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full"> {/* To jest kontener siatki */}
                    <div
                        className="h-full flex flex-col justify-center py-8" // Dodajemy padding-y, usuwamy px
                        // Usunąłem clipPath, ponieważ już nie będzie na nim obrazka
                        // style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
                    >

                        <h3 className="text-sm font-bold text-red-700 uppercase mb-4 pl-16">O nas</h3>
                        <nav className="flex flex-col space-y-3 pl-16"> {/* Padding lewy */}
                            <Link href="/about_us#kimjestesmy"
                                  className="text-lg font-semibold text-gray-800 hover:text-red-700">Kim Jesteśmy</Link>
                            <Link href="/about_us#proces"
                                  className="text-lg font-semibold text-gray-800 hover:text-red-700">Jak wygląda proces</Link>
                            <Link href="/about_us#faq"
                                  className="text-lg font-semibold text-gray-800 hover:text-red-700">FAQ</Link>
                            <Link href="/about_us"
                                  className="text-sm text-red-700 mt-4 pt-2 border-t hover:underline">
                                Zobacz całą stronę...
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* KOLUMNA PRAWA (Obraz):
              Zajmuje resztę miejsca (flex-1) i rozciąga się do prawej krawędzi EKRANU.
              Teraz ma pełne 50% szerokości, a obrazek jest w jej wnętrzu.
            */}
            <div
                className="flex-1 relative overflow-hidden bg-pink-100 flex items-end justify-start"> {/* Dodałem bg-pink-100 do podglądu */}
                <Image
                    src="/images/navabout.png" // ZMIEŃ NA OBRAZEK Z MENU
                    alt="Człowiek wskazujący"
                    layout="fill"
                    objectFit="cover" // Upewniamy się, że obrazek wypełnia dostępną przestrzeń
                    objectPosition="left bottom" // Ustawiamy pozycję obrazka w lewym dolnym rogu
                    className="z-0" // Upewniamy się, że obrazek jest pod overlayem
                />
            </div>
        </div>
    );

    // --- Definicja zawartości dla "Słownik" ---
    const slownikDropdown = (
        <div className="flex h-64">
            {/* Kolumna lewa (tekst, wyrównana pod strzałką) */}
            <div className="flex-shrink-0 w-1/2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="h-full flex flex-col justify-center py-8">
                        <h3 className="text-sm font-bold text-red-700 uppercase mb-4 pl-16">Słownik Pojęć</h3>
                        <nav className="flex flex-col space-y-3 pl-16"> {/* Padding lewy */}
                            <Link href="/slowniczek/restrukturyzacja" className="text-lg font-semibold text-gray-800 hover:text-red-700">Restrukturyzacja</Link>
                            <Link href="/slowniczek/upadlosc-konsumencka" className="text-lg font-semibold text-gray-800 hover:text-red-700">Upadłość konsumencka</Link>
                            <Link href="/slowniczek/upadlosc-gospodarcza" className="text-lg font-semibold text-gray-800 hover:text-red-700">Upadłość gospodarcza</Link>
                            <Link href="/slowniczek" className="text-sm text-red-700 mt-4 pt-2 border-t hover:underline">
                                Zobacz cały słownik...
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Kolumna prawa (obrazek full-bleed, tym razem ikonka książki) */}
            <div className="flex-1 relative bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/dicnav.png" // ZMIEŃ NA OBRAZEK Z MENU
                    alt="Człowiek wskazujący"
                    layout="fill"
                    objectFit="cover" // Upewniamy się, że obrazek wypełnia dostępną przestrzeń
                    objectPosition="left bottom" // Ustawiamy pozycję obrazka w lewym dolnym rogu
                    className="z-0" // Upewniamy się, że obrazek jest pod overlayem
                />
            </div>
        </div>
    );

    // --- Definicja zawartości dla "Blog" (bez zmian, bo nie ma obrazka full-bleed) ---
    const blogDropdown = (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full p-8 flex flex-col justify-center h-64">
                <h3 className="text-sm font-bold text-red-700 uppercase mb-4">Najnowsze wpisy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/blog/jak-wyjsc-z-dlugow-2026" className="group p-4 rounded-lg hover:bg-gray-50">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-red-700">Jak wyjść z długów w 2026?</h4>
                        <p className="text-sm text-gray-600 mt-1">Masz długi? Poznaj 5 sprawdzonych kroków, aby odzyskać kontrolę nad finansami.</p>
                    </Link>
                    <Link href="/blog/restrukturyzacja-firmy-krok-po-kroku" className="group p-4 rounded-lg hover:bg-gray-50">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-red-700">Restrukturyzacja firmy</h4>
                        <p className="text-sm text-gray-600 mt-1">Czy Twoja firma ma kłopoty? Restrukturyzacja to szansa, a nie koniec.</p>
                    </Link>
                    <Link href="/blog/upadlosc-konsumencka-fakty-i-mity" className="group p-4 rounded-lg hover:bg-gray-50">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-red-700">Upadłość konsumencka: Mity</h4>
                        <p className="text-sm text-gray-600 mt-1">Obalamy 3 najpopularniejsze mity na temat ogłaszania upadłości.</p>
                    </Link>
                </div>
                <Link href="/blog" className="text-sm text-red-700 mt-6 hover:underline self-start">
                    Zobacz wszystkie posty...
                </Link>
            </div>
        </div>
    );

    // === GŁÓWNY RENDER KOMPONENTU NAVBAR ===
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Lewa strona nawigacji */}
                    <div className="hidden lg:flex flex-1 items-center justify-start space-x-8">
                        <NavDropdownLink link={{ href: '/about_us', label: 'O nas' }}>
                            {oNasDropdown}
                        </NavDropdownLink>
                        <NavDropdownLink link={{ href: '/slowniczek', label: 'Słownik' }}>
                            {slownikDropdown}
                        </NavDropdownLink>
                    </div>

                    {/* Logo */}
                    <div className="hidden lg:flex flex-shrink-0">
                        <Logo />
                    </div>

                    {/* Prawa strona nawigacji */}
                    <div className="hidden lg:flex flex-1 items-center justify-end space-x-8">
                        <NavDropdownLink link={{ href: '/blog', label: 'Blog' }}>
                            {blogDropdown}
                        </NavDropdownLink>
                        <NavLink href="/contact" label="Kontakt" />
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

            {/* === ROZWIJANE MENU MOBILE (Bez zmian) === */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50">
                    <div className="flex flex-col px-6 py-6 space-y-4">
                        <Link href="/about_us" className="block text-lg font-medium text-gray-700 hover:text-red-700" onClick={() => setIsOpen(false)}>O nas</Link>
                        <Link href="/slowniczek" className="block text-lg font-medium text-gray-700 hover:text-red-700" onClick={() => setIsOpen(false)}>Słownik</Link>
                        <Link href="/blog" className="block text-lg font-medium text-gray-700 hover:text-red-700" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/contact" className="block text-lg font-medium text-gray-700 hover:text-red-700" onClick={() => setIsOpen(false)}>Kontakt</Link>

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