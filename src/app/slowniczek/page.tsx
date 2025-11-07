import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts'; // Załóżmy, że lib/posts istnieje
import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
    // Nagłówek max 30 znaków
    title: 'Słowniczek Oddłużeń | NPO',
    // Opis max 90 znaków
    description: 'Kluczowe pojęcia prawne. Wyjaśniamy terminy związane z upadłością i restrukturyzacją.',
};

export default function SlowniczekHome() {
    const allEntries = getSortedPostsData('slowniczek');

    return (
        <div className="bg-white min-h-screen">
            {/* Sekcja Hero dla Słowniczka */}
            <header className="bg-gray-50 py-16 text-center border-b border-gray-200">
                <BookOpen className="h-12 w-12 text-red-700 mx-auto" />
                <h1 className="text-5xl font-bold text-gray-900 mt-4">
                    Słowniczek pojęć
                </h1>
                <p className="text-xl text-gray-600 mt-2 max-w-2xl mx-auto">
                    Masz wątpliwości? Wyjaśniamy kluczowe terminy prawne w prostych słowach, aby pomóc Ci zrozumieć Twoją sytuację.
                </p>
            </header>

            {/* Lista definicji */}
            <main className="max-w-4xl mx-auto py-16 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allEntries.map(({ slug, title, description }) => (
                        <article key={slug} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <Link href={`/slowniczek/${slug}`}>
                                <h2 className="text-2xl font-semibold text-red-700 hover:text-red-800 transition-colors">
                                    {title}
                                </h2>
                            </Link>
                            {/* Zgodność z SEO: Opis max 90 znaków */}
                            <p className="text-base text-gray-700 mt-2">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}