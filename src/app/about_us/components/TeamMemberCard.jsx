import React from 'react';

export default function TeamMemberCard({ name, title, description, imageUrl, altText }) {
    return (
        <article className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
            
            {/* Zdjęcie pracownika z optymalizacją */}
            <div className="aspect-w-1 aspect-h-1 w-full h-72 sm:h-80 overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={altText || `Portret ${name}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                />
            </div>

            {/* Treść karty - hierarchia i czytelność */}
            <div className="p-6 text-left">
                <h3 
                    className="text-2xl font-extrabold mb-1 tracking-tight text-red-black"
                >
                    {name}
                </h3>
                {/* Tytuł jako rola (ważny dla SEO) */}
                <p className="text-sm font-semibold text-red-700 mb-3 uppercase tracking-wider border-b pb-3 border-gray-200">
                    {title}
                </p>
                {/* Opis jako kluczowe kompetencje */}
                <p className="text-gray-700 text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </article>
    );
}