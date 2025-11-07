'use client';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Typy zdefiniowane lokalnie
interface FaqItem {
    question: string;
    answer: string;
}
interface FaqItemProps {
    item: FaqItem;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, isOpen, onClick }) => {
    const answerRef = useRef(null);
    const iconRef = useRef(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        gsap.set(answerRef.current, { height: 0, opacity: 0, paddingBottom: 0 });
        tlRef.current = gsap.timeline({ paused: true })
            .to(answerRef.current, { height: 'auto', opacity: 1, paddingBottom: '16px', duration: 0.3, ease: 'power2.out' })
            .to(iconRef.current, { rotate: 180, duration: 0.3, ease: 'power2.out' }, 0);
    }, []);

    useEffect(() => {
        if (isOpen) tlRef.current?.play();
        else tlRef.current?.reverse();
    }, [isOpen]);

    return (
        <div className="border-b border-gray-200">
            <button onClick={onClick} className="flex justify-between items-center w-full py-5 text-left" aria-expanded={isOpen}>
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                <div ref={iconRef}><ChevronDown className="w-5 h-5 text-red-700" /></div>
            </button>
            <div ref={answerRef} className="overflow-hidden opacity-0" style={{ height: 0 }}>
                <p className="text-base text-gray-600">{item.answer}</p>
            </div>
        </div>
    );
};

interface LocalFaqProps {
    faqs: FaqItem[];
    cityName: string;
}

export default function LocalFaq({ faqs, cityName }: LocalFaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                opacity: 0, y: 50, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section ref={sectionRef} className="bg-gray-50 py-20 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
                    Pytania o oddłużanie w {cityName}
                </h2>
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            item={faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}