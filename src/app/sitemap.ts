// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

const CITIES = [
    'warszawa', 'krakow', 'wroclaw', 'lodz', 'poznan', 'gdansk',
    'szczecin', 'bydgoszcz', 'lublin', 'bialystok', 'katowice', 'gdynia',
    'czestochowa', 'radom', 'sosnowiec', 'torun', 'kielce', 'rzeszow',
    'gliwice', 'zabrze', 'olsztyn', 'bielsko-biala', 'bytom'
];
const BASE_URL = 'https://twoja-domena.pl'; // Zmień na właściwy URL

export default function sitemap(): MetadataRoute.Sitemap {
    const blogPosts = getSortedPostsData('blog').map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
    }));

    const slowniczekEntries = getSortedPostsData('slowniczek').map((entry) => ({
        url: `${BASE_URL}/slowniczek/${entry.slug}`,
        lastModified: new Date(), // Ustaw datę modyfikacji
    }));

    const cityPages = CITIES.map((city) => ({
        url: `${BASE_URL}/${city}`,
        lastModified: new Date(),
    }));

    return [
        { url: BASE_URL, lastModified: new Date() },
        { url: `${BASE_URL}/about_us`, lastModified: new Date() },
        { url: `${BASE_URL}/contact`, lastModified: new Date() },
        ...blogPosts,
        ...slowniczekEntries,
        ...cityPages,
    ];
}