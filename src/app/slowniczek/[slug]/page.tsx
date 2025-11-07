import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import React from 'react';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostData('slowniczek', params.slug);
    return {
        title: `${post.title} | NPO`,
        description: post.description,
    };
}

export async function generateStaticParams() {
    const paths = await getAllPostSlugs('slowniczek');
    return paths;
}

export default async function Post({ params }: Props) {
    const post = await getPostData('slowniczek', params.slug);

    return (
        <>
            {/* *** USUNIĘTO BLOK <style jsx global> STĄD ***
        Style zostaną załadowane z głównego pliku layout.tsx
      */}

            <main className="bg-white py-16 sm:py-24">
                <div className="max-w-3xl mx-auto px-6">

                    <Link href="/slowniczek" className="inline-flex items-center text-red-700 hover:text-red-900 font-semibold text-sm group mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Wróć do słowniczka
                    </Link>

                    <div className="flex items-center mb-4">
                        <BookOpen className="w-8 h-8 text-red-700 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
                    </div>
                    <p className="text-lg text-gray-600 border-b border-gray-200 pb-8 mb-8">
                        {post.description}
                    </p>

                    {/* Ten div będzie teraz stylizowany przez style w layout.tsx */}
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                </div>
            </main>
        </>
    );
}