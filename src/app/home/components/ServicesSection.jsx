// ServicesSection.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react'; // Importujemy ikonę dla linku

/**
 * Komponent ServiceCard (Karta Usługi).
 * @param {object} props - Właściwości komponentu.
 * @param {React.ComponentType} props.icon - Komponent ikony (z lucide-react).
 * @param {string} props.title - Tytuł usługi.
 * @param {string} props.subtitle - Podtytuł/hasło usługi.
 * @param {string} props.description - Opis usługi.
 * @param {string} props.buttonText - Tekst na przycisku CTA.
 */
const ServiceCard = ({ icon: Icon, title, subtitle, description, buttonText }) => (
    // Główny kontener karty z responsywnym stylem i efektem hover.
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Sekcja ikony i tytułu */}
        <div className="flex items-center mb-4">
            {/* Kontener ikony w czerwonym kółku */}
            <div className="p-3 bg-red-800 rounded-lg mr-4 shadow-md">
                {/* Renderowanie dynamicznie przekazanej ikony */}
                <Icon className="text-white w-6 h-6" />
            </div>
            {/* Tytuł usługi */}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        
        {/* Podtytuł usługi */}
        <p className="text-base text-left font-bold text-red-700 mb-2">{subtitle}</p>
        
        {/* Opis usługi */}
        <p className="text-gray-600 text-left mb-6 text-sm leading-relaxed">
            {description}
        </p>
        
        {/* Przycisk CTA (Call to Action). Adres URL generowany na podstawie tytułu. */}
        <a 
            href={`/${title.toLowerCase().replace(/\s+/g, '-')}`} // Dynamicznie tworzy ścieżkę (np. /restrukturyzacja)
            className="block w-full text-center px-6 py-3 text-white bg-red-800 hover:bg-red-900 transition duration-300 font-medium rounded-lg shadow-lg"
        >
            {buttonText}
        </a>
    </div>
);

/**
 * Komponent ServicesSection.
 * @param {object} props - Właściwości komponentu.
 * @param {Array<object>} props.servicesData - Tablica danych usług.
 */
const ServicesSection = ({ servicesData }) => (
    <section 
        className="flex justify-center items-center py-16 md:py-24 bg-[#FCEFEE] min-h-[100vh]"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Tag sekcji */}
            <p className="inline-block text-sm font-bold bg-red-800 pt-1 pb-1 pl-5 pr-5 text-white rounded-md uppercase tracking-wider">
                Twoje wyjście na prostą
            </p>
            
            {/* Tytuł sekcji usług */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 mb-3">
                Stosujemy rozwiązania które działają
            </h2>

            {/* Opis sekcji */}
            <p className="text-base text-gray-600 mb-12">
                To nie są puste obietnice a realne sposoby na pomoc, tobie twojej firmie i rodzinie <br className="hidden sm:inline" />
                Przeczytaj, zobacz i napisz do nas
            </p>

            {/* Siatka kart usług. Mapowanie po servicesData. */}
            <div 
                className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10"
            >
                {servicesData.map((service, index) => (
                    <ServiceCard 
                        key={index}
                        icon={service.icon}
                        title={service.title}
                        subtitle={service.subtitle}
                        description={service.description}
                        buttonText={service.buttonText}
                    />
                ))}
            </div>
            
            {/* Link do pełnej oferty */}
            <a 
                href="." 
                className="flex flex-col items-center justify-center text-base font-semibold text-gray-700 hover:text-red-700 transition duration-300 border-b-2 border-transparent mt-6"
            >
                Zobacz więcej
                <ChevronDown className="w-8 h-8 text-red-700" />
            </a>

        </div>
    </section>
);

export default ServicesSection;