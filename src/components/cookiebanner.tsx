'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookiesAccepted');
        if (!accepted) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookiesAccepted', 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-700">
                    Ta strona używa plików cookies w celach statystycznych i funkcjonalnych.{" "}
                    <Link href="/polityka-prywatnosci" className="text-red-500 underline">
                        Dowiedz się więcej
                    </Link>
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition text-sm"
                    >
                        Odrzuć
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition text-sm"
                    >
                        Akceptuj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
