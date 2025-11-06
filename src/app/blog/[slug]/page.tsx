// src/app/blog/[slug]/page.tsx
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

// Generowanie metadanych dla SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostData('blog', params.slug);
    return {
        title: post.title,
        description: post.description,
    };
}

// Generowanie statycznych stron (Hiper Optymalizacja)
export function generateStaticParams() {
    const paths = getAllPostSlugs('blog');
    return paths;
}

export default async function Post({ params }: Props) {
    const post = await getPostData('blog', params.slug);

    return (
        // <Navbar />
        <main className="max-w-3xl mx-auto py-16 px-6">
            <article>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
                <p className="text-gray-500 mb-4">{post.date}</p>
                <div
                    className="prose lg:prose-xl" // Tailwind 'prose' ładnie ostyluje HTML
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
            </article>
        </main>
        // <Footer />
    );
}