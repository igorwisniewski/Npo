import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Zakładam, że Navbar jest w /src/components/
import Footer from "@/components/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// --- POCZĄTEK OPTYMALIZACJI SEO ---

const siteConfig = {
    title: "NPO - Oddłużanie, Restrukturyzacja, Upadłość Konsumencka",
    // Zgodnie z wytyczną: Opis 89 znaków (max 90)
    description: "Skuteczna pomoc w oddłużaniu. Specjalizujemy się w upadłości konsumenckiej, gospodarczej oraz restrukturyzacji firm. Bezpłatna analiza.",
    url: "https://twoja-domena.pl", // WAŻNE: Zmień na swój prawdziwy adres URL
    ogImage: "https://twoja-domena.pl/og-image.png", // WAŻNE: Stwórz i prześlij ten obraz
    keywords: "upadłość konsumencka, upadłość gospodarcza, restrukturyzacja, oddłużanie, długi, kancelaria, NPO, pomoc prawna"
};

export const metadata: Metadata = {
    // Szablon tytułu dla podstron
    title: {
        default: siteConfig.title,
        template: `%s | NPO - Eksperci od Oddłużania`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,

    // Tagi dla robotów
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Link kanoniczny
    alternates: {
        canonical: siteConfig.url,
    },

    // Tagi Open Graph (dla Facebook, LinkedIn, etc.)
    openGraph: {
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: "NPO Oddłużanie",
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "NPO - Eksperci od Oddłużania i Restrukturyzacji",
            },
        ],
        locale: 'pl_PL',
        type: 'website',
    },

    // Tagi Twitter
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },
};

// --- KONIEC OPTYMALIZACJI SEO ---


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
        <head>
            {/* --- DANE STRUKTURALNE (JSON-LD) DLA GOOGLE --- */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LegalService", // Bardziej szczegółowe niż "Organization"
                        "name": "NPO",
                        "url": siteConfig.url,
                        "logo": siteConfig.ogImage, // Możesz zmienić na URL samego logo
                        "description": siteConfig.description,
                        "address": {
                            "@type": "PostalAddress",
                            // WAŻNE: Wprowadź prawdziwy adres
                            "streetAddress": "ul. Przykładowa 1",
                            "addressLocality": "Warszawa",
                            "postalCode": "00-001",
                            "addressCountry": "PL"
                        },
                        // WAŻNE: Wprowadź prawdziwy numer telefonu
                        "telephone": "+48123456789",
                        "areaServed": "PL", // Obszar działania: Polska
                        "keywords": "upadłość konsumencka, upadłość gospodarcza, restrukturyzacja"
                    })}}
            />

            {/* Style dla Słowniczka (zachowane) */}
            <style>{`
          .markdown-content h2 {
            font-size: 1.875rem; line-height: 2.25rem; font-weight: 700;
            color: #1f2937; margin-top: 2rem; margin-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;
          }
          .markdown-content h3 {
            font-size: 1.5rem; line-height: 2rem; font-weight: 600;
            color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.75rem;
          }
          .markdown-content p {
            font-size: 1.125rem; line-height: 1.75; color: #374151;
            margin-bottom: 1.5rem;
          }
          .markdown-content ul, .markdown-content ol {
            list-style-position: inside; margin-bottom: 1.5rem; padding-left: 1rem;
          }
          .markdown-content ul { list-style-type: disc; }
          .markdown-content ol { list-style-type: decimal; }
          .markdown-content li {
            font-size: 1.125rem; color: #374151; margin-bottom: 0.5rem;
            padding-left: 0.5rem;
          }
          .markdown-content li::marker { color: #b91c1c; }
          .markdown-content a { color: #b91c1c; text-decoration: underline; }
          .markdown-content a:hover { color: #991b1b; }
          .markdown-content strong { font-weight: 600; color: #111827; }
          .markdown-content blockquote {
            border-left: 4px solid #fecaca; padding-left: 1rem; margin-left: 0;
            margin-bottom: 1.5rem; font-style: italic; color: #1f2937;
          }
          .markdown-content blockquote p { margin-bottom: 0; }
        `}</style>
        </head>

        {/* Dodajemy flex-col i min-h-screen, aby stopka trzymała się dołu */}
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
        <Navbar />
        {/* Tag <main> jest ważny dla semantyki i SEO */}
        <main className="flex-grow">
            {children}
        </main>

        {/* Prosta, semantyczna stopka */}
        <Footer/>

        </body>
        </html>
    );
}