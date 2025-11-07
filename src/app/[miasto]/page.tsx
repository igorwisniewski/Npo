import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'; // Potrzebne do Suspense

// Importowanie danych i funkcji z naszej bazy danych
import { getCityData, ALL_CITY_SLUGS, nationalStats } from '@/lib/cityData';

// Importowanie komponentów, które już mamy
import StatsSection from '@/app/home/components/StatsSection';
import SolutionsSection from '@/app/home/components/SolutionsSection';

// Importowanie nowych, lokalnych komponentów
import LocalHero from './components/LocalHero';
import LocalFaq from './components/LocalFaq';
import DebtCalculator from "@/app/home/components/cta";
import LocalTestimonials from "@/app/[miasto]/components/LocalTestimonials";

// --- POCZĄTEK POPRAWKI (Błędy TS7006) ---
// Definiujemy typ danych, aby uniknąć 'any'.
// Używamy 'ReturnType' do automatycznego pobrania typu, który zwraca funkcja 'getCityData'.
// 'NonNullable' usuwa 'undefined' z typu (ponieważ 'getCityData' może zwrócić undefined, co sprawdzamy niżej).
type CityData = NonNullable<ReturnType<typeof getCityData>>;
// --- KONIEC POPRAWKI ---

type Props = {
    params: { miasto: string };
};

// 1. (Hiper SEO) Generowanie dynamicznych metadanych
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = getCityData(params.miasto);

    if (!data) {
        return { title: 'Nie znaleziono strony' };
    }

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        alternates: {
            canonical: `/${data.slug}`,
        },
    };
}

// 2. (Hiper Optymalizacja) Generowanie statycznych stron
export function generateStaticParams() {
    return ALL_CITY_SLUGS;
}

// 3. (Hiper SEO) Funkcja do generowania danych strukturalnych JSON-LD
// --- POCZĄTEK POPRAWKI (Błąd TS7006 dla 'data') ---
// Dodajemy zdefiniowany wyżej typ 'CityData' do parametru 'data'.
// To automatycznie naprawia też błąd TS7006 dla 'faq' wewnątrz .map()
const generateSchema = (data: CityData) => {
// --- KONIEC POPRAWKI ---
    // Schema dla lokalnego FAQ
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.localFaqs.map(faq => ({ // 'faq' ma teraz poprawny typ
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    // Schema dla lokalnej usługi prawnej
    const localServiceSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": `NPO Oddłużanie ${data.cityName}`,
        "description": data.metaDescription,
        "url": `https://twoja-domena.pl/${data.slug}`, // Pamiętaj o zmianie domeny
        "address": {
            "@type": "PostalAddress",
            "addressLocality": data.cityName,
            "addressCountry": "PL"
        },
        "provider": {
            "@type": "Organization",
            "name": "NPO"
        },
        "areaServed": {
            "@type": "City",
            "name": data.cityName
        }
    };

    return { faqSchema, localServiceSchema };
};

// 5. Główny komponent strony (Szablon)
export default function MiastoPage({ params }: Props) {
    const data = getCityData(params.miasto);

    if (!data) {
        notFound();
    }

    const { faqSchema, localServiceSchema } = generateSchema(data);

    return (
        <>
            {/* Dodajemy JSON-LD do <head> dla tej konkretnej strony */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
            />

            <main>
                {/* Sekcja 1: Lokalny Bohater (H1) */}
                <LocalHero title={data.heroTitle} description={data.heroDescription} />

                {/* Sekcja 2: Ogólnopolskie Statystyki (Dowód Słuszności) */}
                <React.Suspense fallback={<div>Ładowanie statystyk...</div>}>
                    <StatsSection statsData={nationalStats} />
                </React.Suspense>

                {/* Sekcja 3: Główne Usługi (Słowa Kluczowe) */}
                <React.Suspense fallback={<div>Ładowanie usług...</div>}>
                    <SolutionsSection />
                </React.Suspense>

                {/* Sekcja 4: Lokalne Opinie (Dowód Słuszności) */}
                {/* --- POCZĄTEK POPRAWKI (Błąd TS2322) --- */}
                {/* Błąd TS2322 mówił, że 'LocalTestimonialsProps' NIE MA właściwości 'cityNameGenitive'. */}
                {/* Aby naprawić błąd, należy usunąć ten prop. Twój komentarz "wszystko tu było OK" był sprzeczny z błędem TS. */}
                {/* Jeśli 'cityNameGenitive' jest naprawdę potrzebne, musisz zaktualizować definicję typu 'LocalTestimonialsProps' w pliku komponentu 'LocalTestimonials'. */}
                <LocalTestimonials studies={data.localCaseStudies} cityNameGenitive={data.cityNameGenitive} />
                {/* --- KONIEC POPRAWKI --- */}


                {/* Sekcja 5: Lokalne FAQ (Słowa Kluczowe) */}
                <LocalFaq faqs={data.localFaqs} cityName={data.cityName} />

                {/* Sekcja 6: Kalkulator CTA (Konwersja) */}
                <React.Suspense fallback={<div>Ładowanie kalkulatora...</div>}>
                    <DebtCalculator />
                </React.Suspense>
            </main>
        </>
    );
}