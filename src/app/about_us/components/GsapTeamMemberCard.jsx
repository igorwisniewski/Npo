// src/app/about_us/components/GsapTeamMemberCard.jsx
'use client'; // Kluczowe dla GSAP

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function GsapTeamMemberCard({ name, title, description, imageUrl, altText }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;

        // Ustawiamy domyślny stan (poza hover)
        gsap.set(card, { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }); // shadow-lg
        gsap.set(image, { scale: 1 });

        // Animacja na wejście myszki (hover)
        const onMouseEnter = () => {
            gsap.to(card, {
                duration: 0.3,
                y: -4, // Zastępuje transform hover:-translate-y-1
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Zastępuje hover:shadow-2xl
                ease: 'power2.out',
            });
            gsap.to(image, {
                duration: 0.3,
                scale: 1.05, // Dodatkowy efekt zoomu na zdjęciu
                ease: 'power2.out',
            });
        };

        // Animacja na wyjście myszki (hover out)
        const onMouseLeave = () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                ease: 'power2.out',
            });
            gsap.to(image, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out',
            });
        };

        card.addEventListener('mouseenter', onMouseEnter);
        card.addEventListener('mouseleave', onMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', onMouseEnter);
            card.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        // Usuwamy klasy hover:shadow-2xl i hover:-translate-y-1 z article
        <article
            ref={cardRef}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className="aspect-w-1 aspect-h-1 w-full h-72 sm:h-80 overflow-hidden">
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt={altText || `Portret ${name}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                />
            </div>

            <div className="p-6 text-left">
                <h3 className="text-2xl font-extrabold mb-1 tracking-tight text-red-black">
                    {name}
                </h3>
                <p className="text-sm font-semibold text-red-700 mb-3 uppercase tracking-wider border-b pb-3 border-gray-200">
                    {title}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </article>
    );
}