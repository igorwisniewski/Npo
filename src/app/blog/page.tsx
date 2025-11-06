// src/app/blog/page.tsx
import Link from 'next/link';
// Zakładamy alias @/lib/... skonfigurowany w tsconfig.json
import { getSortedPostsData } from '@/lib/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    // Zgodnie z wytyczną: max 30 znaków
    title: 'Blog | NPO',
    // Zgodnie z wytyczną: max 90 znaków
    description: 'Aktualności i porady ekspertów NPO. Czytaj o oddłużaniu, upadłości i restrukturyzacji firmy.',
};

export default function BlogHome() {
    const allPosts = getSortedPostsData('blog');

    return (
        // Zakładam, że masz globalny layout.tsx z nawigacją i stopką
        <div className="bg-white min-h-screen">
            <main className="max-w-4xl mx-auto py-16 px-6">
                {/* Nagłówek pasujący do zrzutu ekranu 101904.png */}
                <h1 className="text-5xl font-bold text-gray-900 mb-12 border-b pb-4">
                    Blog
                </h1>

                <div className="space-y-12">
                    {allPosts.map(({ slug, title, description, date }) => (
                        <article key={slug} className="border-b border-gray-200 pb-8">

                            {/* Zgodnie z wytyczną: max 30 znaków (pobierane z .md) */}
                            <h2 className="text-3xl font-semibold text-gray-900 mb-2 hover:text-red-700 transition-colors">
                                <Link href={`/blog/${slug}`}>{title}</Link>
                            </h2>

                            {/* Zgodnie z wytyczną: max 90 znaków (pobierane z .md) */}
                            <p className="text-lg text-gray-600 mb-4">
                                {description}
                            </p>

                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">{date}</p>
                                <Link
                                    href={`/blog/${slug}`}
                                    className="text-sm text-red-700 font-medium hover:underline"
                                >
                                    Czytaj więcej...
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}