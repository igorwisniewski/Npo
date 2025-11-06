// src/app/[miasto]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// 1. Lista 23 miast (na podstawie wyników wyszukiwania)
// To jest "źródło prawdy" dla lokalnego SEO
const CITIES: string[] = [
    'warszawa', 'krakow', 'wroclaw', 'lodz', 'poznan', 'gdansk',
    'szczecin', 'bydgoszcz', 'lublin', 'bialystok', 'katowice', 'gdynia',
    'czestochowa', 'radom', 'sosnowiec', 'torun', 'kielce', 'rzeszow',
    'gliwice', 'zabrze', 'olsztyn', 'bielsko-biala', 'bytom'
];

// 2. Funkcja pomocnicza do formatowania nazw miast (np. wroclaw -> Wrocław)
function capitalize(str: string): string {
    // Możemy dodać tu wyjątki dla polskich znaków
    if (str === 'wroclaw') return 'Wrocław';
    if (str === 'lodz') return 'Łódź';
    if (str === 'gdansk') return 'Gdańsk';
    if (str === 'poznan') return 'Poznań';
    // Domyślna kapitalizacja
    return str.charAt(0).toUpperCase() + str.slice(1);
}

type Props = {
    params: { miasto: string };
};

// 3. (Hiper SEO) Generowanie dynamicznych metadanych dla każdej strony
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const miastoParam = params.miasto.toLowerCase();

    if (!CITIES.includes(miastoParam)) {
        return {
            title: 'Nie znaleziono strony',
        };
    }

    const miasto = capitalize(miastoParam);

    // Zgodnie z Twoją wytyczną: Nagłówek max 30 znaków
    const title = `Oddłużanie ${miasto} | NPO`;
    // Zgodnie z Twoją wytyczną: Opis max 90 znaków
    const description = `Profesjonalna pomoc w oddłużaniu w ${miasto}. Kancelaria NPO oferuje upadłość i restrukturyzację.`;

    return {
        title,
        description,
        // Dodajemy link kanoniczny dla SEO
        alternates: {
            canonical: `/${miastoParam}`,
        },
    };
}

// 4. (Hiper Optymalizacja) Generowanie 23 statycznych stron na Vercelu
// To mówi Next.js, aby wygenerował /wroclaw, /warszawa itd. podczas budowania
export function generateStaticParams() {
    return CITIES.map((city) => ({
        miasto: city,
    }));
}

// 5. Główny komponent strony (Szablon)
export default function MiastoPage({ params }: Props) {
    const miastoParam = params.miasto.toLowerCase();

    // Jeśli ktoś wpisze URL miasta spoza listy (np. /paryz), pokaż 404
    if (!CITIES.includes(miastoParam)) {
        notFound();
    }

    const miasto = capitalize(miastoParam);

    // Treści SEO zgodne z wytycznymi (30/90 znaków)
    const h1 = `Oddłużanie w ${miasto}`;
    const p1 = `NPO to kancelaria blisko Ciebie. Pomagamy mieszkańcom ${miasto} wyjść z długów. Zacznij od nowa.`;
    const p2 = `Specjalizujemy się w upadłości konsumenckiej w ${miasto}. Oferujemy darmowe konsultacje dla Ciebie.`;

    return (
        // Zakładam, że Navbar i Footer są w głównym layout.tsx
        <main className="max-w-5xl mx-auto py-16 px-6">
            <section className="text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{h1}</h1>
                <p className="text-xl text-gray-700 mb-8">{p1}</p>
                <p className="text-lg text-gray-600">{p2}</p>

                {/* Przycisk CTA kierujący do głównej strony kontaktu */}
                <div className="mt-12">
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 text-white bg-red-800 hover:bg-red-900 transition duration-300 font-medium rounded shadow-lg"
                    >
                        Bezpłatna Konsultacja
                    </Link>
                </div>

                {/* Miejsce na mapę */}
                <div className="mt-12 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">[Miejsce na mapę Google dla {miasto}]</p>
                </div>
            </section>
        </main>
    );
}