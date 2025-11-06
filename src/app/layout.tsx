import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Zaimportuj komponent (załóżmy alias @/*)

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Npo",
    description: "...",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`} // Dodałem domyślne tło
        >
        <Navbar /> {/* 2. Dodaj Navbar tutaj */}
        {children}
        {/* TODO: Dodaj tutaj komponent <Footer /> */}
        </body>
        </html>
    );
}