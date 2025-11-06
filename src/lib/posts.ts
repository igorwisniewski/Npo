// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

// Funkcja do pobierania danych dla Bloga lub Słowniczka
export function getSortedPostsData(type: 'blog' | 'slowniczek') {
    const postsDirectory = path.join(contentDirectory, type);
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            ...(matterResult.data as { title: string; date: string; description: string }),
        };
    });

    // Sortuj posty po dacie (dla bloga)
    if (type === 'blog') {
        return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
    }

    // Sortuj alfabetycznie (dla słowniczka)
    return allPostsData.sort((a, b) => a.title.localeCompare(b.title));
}

// Funkcja do pobierania wszystkich slugów (dla generateStaticParams)
export function getAllPostSlugs(type: 'blog' | 'slowniczek') {
    const postsDirectory = path.join(contentDirectory, type);
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
    }));
}

// Funkcja do pobierania danych pojedynczego wpisu
export async function getPostData(type: 'blog' | 'slowniczek', slug: string) {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...(matterResult.data as { title: string; date: string; description: string }),
    };
}