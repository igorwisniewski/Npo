"use client";

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { ColorScheme } from '../types';

interface Step5ThankYouProps {
    colorScheme?: ColorScheme;
}

export default function Step5ThankYou({ colorScheme = 'red' }: Step5ThankYouProps) {
    // Kiedy użytkownik trafia na podziękowanie, formularz jest gotowy - można usunąć cookies (żeby nie odtwarzało wypełnionego).
    useEffect(() => {
        Cookies.remove('ankieta_form_data');
    }, []);

    return (
        <div className="text-center py-12 animate-fade-in-up">
            <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Dziękujemy za przesłanie informacji!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Twój opiekun prawny otrzymał dane. Po przeanalizowaniu dokumentów skontaktujemy się w celu omówienia możliwych rozwiązań.
            </p>
            
            <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 shadow-sm transition-colors">
                Wróć na stronę główną
            </a>
        </div>
    );
}
