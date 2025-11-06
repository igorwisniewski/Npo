// src/app/slowniczek/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    // Zgodnie z wytyczną: max 30 znaków
    title: 'Słowniczek Oddłużeń | NPO',
    // Zgodnie z wytyczną: max 90 znaków
    description: 'Kluczowe pojęcia prawne. Wyjaśniamy terminy związane z upadłością i restrukturyzacją.',
};

export default function SlowniczekHome() {
    // Pobieramy dane i sortujemy alfabetycznie (zgodnie z logiką w posts.ts)
    const allEntries = getSortedPostsData('slowniczek');

    return (
        <div className="bg-white min-h-screen">
            <main className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Słowniczek pojęć
                </h1>
                {/* Zgodnie z wytyczną: max 90 znaków */}
                <p className="text-lg text-gray-600 mb-12 border-b pb-8">
                    Masz wątpliwości? Wyjaśniamy kluczowe terminy prawne w prostych słowach.
                </p>

                <div className="space-y-6">
                    {allEntries.map(({ slug, title, description }) => (
                        <article key={slug}>
                            <Link href={`/slowniczek/${slug}`}>
                                <h2 className="text-2xl font-semibold text-red-700 hover:underline">
                                    {title}
                                </h2>
                            </Link>
                            <p className="text-base text-gray-700 mt-1">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}