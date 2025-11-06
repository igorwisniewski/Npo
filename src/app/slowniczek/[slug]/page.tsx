// src/app/slowniczek/[slug]/page.tsx
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

// Generowanie metadanych SEO na podstawie pliku .md
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostData('slowniczek', params.slug);
    return {
        // Pamiętaj o limicie 30 znaków w .md
        title: `${post.title} | Słowniczek NPO`,
        // Pamiętaj o limicie 90 znaków w .md
        description: post.description,
    };
}

// Generowanie statycznych stron
export function generateStaticParams() {
    const paths = getAllPostSlugs('slowniczek');
    return paths;
}

export default async function Post({ params }: Props) {
    const post = await getPostData('slowniczek', params.slug);

    return (
        <main className="max-w-3xl mx-auto py-16 px-6">
            <article>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <div
                    // Używamy 'prose', aby Tailwind automatycznie ostylował treść z Markdown
                    className="prose lg:prose-xl max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
            </article>
        </main>
    );
}