'use client'; // Ten komponent jest interaktywny (useState, useRouter)

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DebtCalculator() {
    const [debtAmount, setDebtAmount] = useState('');
    const router = useRouter();

    const handleCalculate = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Przekierowujemy użytkownika do formularza, dodając kwotę jako parametr URL
        router.push(`/formularz?sumaDlugow=${debtAmount || 10000}`);
    };

    return (
        <section className="w-full bg-gradient-to-r from-red-400 to-red-200 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                <form
                    onSubmit={handleCalculate}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                    {/* Kolumna lewa: Tekst */}
                    <div className="text-center lg:text-left">
                        {/* Zgodnie z wytyczną: Nagłówek max 30 znaków */}
                        <h2 className="text-4xl font-bold">O ile cię oddłużymy?</h2>
                        <h3 className="text-4xl font-bold opacity-90">Zobacz sam</h3>
                        {/* Zgodnie z wytyczną: Tekst max 90 znaków */}
                        <p className="text-xs text-white/70 mt-4 italic max-w-md mx-auto lg:mx-0">
                            Kwota szacunkowa, nie uwzględnia odsetek. W 90% przypadków finalna kwota jest wyższa.
                        </p>
                    </div>

                    {/* Kolumna prawa: Formularz */}
                    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                        <label htmlFor="debtAmount" className="block text-lg font-semibold mb-2">
                            Wpisz kwotę zadłużenia
                        </label>
                        <input
                            type="text"
                            id="debtAmount"
                            value={debtAmount}
                            onChange={(e) => setDebtAmount(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border bg-white text-gray-950"
                            placeholder="np. 10000"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full mt-4 px-8 py-4 bg-red-800 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
                        >
                            Oblicz ugodę
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}