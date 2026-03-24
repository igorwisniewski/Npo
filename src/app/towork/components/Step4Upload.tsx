"use client";

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { supabase } from '@/utils/supabaseclient';
import { AnkietaFormData, ColorScheme } from '../types';
import { getThemeClasses } from './theme';

interface Step4UploadProps {
    onNext: () => void;
    colorScheme?: ColorScheme;
}

export default function Step4Upload({ onNext, colorScheme = 'red' }: Step4UploadProps) {
    const theme = getThemeClasses(colorScheme);
    const { watch } = useFormContext<AnkietaFormData>();
    const clientType = watch('clientType');
    const submissionId = watch('submissionId') || 'unknown';

    const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
    const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
    const [showWarning, setShowWarning] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const getRequiredDocs = () => {
        if (clientType === 'osoba_fizyczna') {
            return [
                'BIK prywatny',
                'Dokumentacja windykacyjna i komornicza'
            ];
        }
        if (clientType === 'jdg') {
            return [
                'BIK prywatny',
                'BIK firmowy (jeśli są zobowiązania)',
                'PIT 2025',
                'KPiR / Ewidencja Przychodów 2026',
                'Dokumentacja windykacyjna'
            ];
        }
        if (clientType === 'rolnik') {
            return [
                'BIK prywatny',
                'Decyzje ARiMR',
                'Korespondencja (windykacyjna / komornicza)'
            ];
        }
        if (clientType === 'sp_zoo') {
            return [
                'BIK firmowy',
                'CIT 2025',
                'RZiS 2026',
                'Korespondencja (windykacyjna / komornicza)'
            ];
        }
        if (clientType === 'sp_osobowa') {
            return [
                'Raport BIK prywatny - Wspólnik 1',
                'Raport BIK prywatny - Wspólnik 2',
                'Raport BIK firmowy - Wspólnik 1',
                'Raport BIK firmowy - Wspólnik 2',
                'PIT 2025 - Wspólnik 1',
                'PIT 2025 - Wspólnik 2',
                'Korespondencja windykacyjna / komornicza',
                'KPiR / Ewidencja Przychodu'
            ];
        }
        return [];
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingDoc(docName);
        setShowWarning(false);
        setUploadError(null);
        try {
            if (!submissionId || submissionId === 'unknown') {
                throw new Error('Brak identyfikatora zgłoszenia. Spróbuj cofnąć się i zapisać dane ponownie.');
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${submissionId}/${docName.replace(/\W+/g, '_')}_${Date.now()}.${fileExt}`;

            const { error } = await supabase.storage
                .from('iwp')
                .upload(fileName, file);

            if (error) {
                console.warn('Błąd przesyłania:', error);
                setUploadError(`Błąd przesyłania: ${error.message}. Upewnij się, że bucket 'iwp' istnieje w Supabase Storage.`);
                return;
            }

            setUploadedDocs(prev => ({ ...prev, [docName]: true }));
        } catch (error: unknown) {
            console.error(error);
            const msg = error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd podczas przesyłania.';
            setUploadError(msg);
        } finally {
            setUploadingDoc(null);
        }
    };

    const handleNext = () => {
        const filesCount = Object.values(uploadedDocs).filter(v => v === true).length;
        if (filesCount === 0) {
            alert('UWAGA: Bez wgranych dokumentów (np. raportu BIK) nie będziemy w stanie dokonać pełnej analizy. Jeśli masz problem z ich pobraniem, zgłoś to swojemu opiekunowi prawnemu.');
            setShowWarning(true);
            return;
        } else if (filesCount < getRequiredDocs().length) {
            alert('Dziękujemy za przesłanie części dokumentów. Pamiętaj, aby dostarczyć pozostałe - link do załączenia wyślemy Ci na maila oraz SMS.');
        }
        onNext();
    };

    const docs = getRequiredDocs();

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Dokumenty do analizy</h2>
            <p className="mb-6 text-gray-600 text-sm">
                Twoje zgłoszenie zostało przesłane do systemu. Prosimy o załączenie poniższych dokumentów.
                Możesz pobrać raport BIK na stronie <a href="https://www.bik.pl" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">www.bik.pl</a>.
            </p>

            <div className="space-y-4">
                {docs.map(doc => (
                    <div key={doc} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center mb-3 sm:mb-0">
                            {uploadedDocs[doc] ? (
                                <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            )}
                            <span className={`font-medium ${uploadedDocs[doc] ? 'text-green-700' : 'text-gray-800'}`}>{doc}</span>
                        </div>

                        <div>
                            <input
                                type="file"
                                id={`file-${doc}`}
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, doc)}
                                disabled={uploadingDoc !== null}
                            />
                            <label
                                htmlFor={`file-${doc}`}
                                className={`inline-flex px-4 py-2 border rounded-md text-sm font-medium focus:outline-none transition-colors cursor-pointer text-center
                                    ${uploadedDocs[doc]
                                    ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                                    : uploadingDoc === doc
                                        ? 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                }`}
                            >
                                {uploadingDoc === doc ? 'Przesyłam...' : uploadedDocs[doc] ? 'Zmień plik' : 'Załącz plik'}
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            {uploadError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    <strong>Błąd:</strong> {uploadError}
                </div>
            )}

            {showWarning && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 text-sm">
                    <strong>Pamiętaj:</strong> Analiza bez dokumentów nie będzie możliwa. Jeśli nadal chcesz kontynuować, zgłoś brak możliwości załączenia dokumentów swojemu opiekunowi prawnemu i kliknij przycisk Zakończ.
                </div>
            )}

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
                <button
                    type="button"
                    onClick={handleNext}
                    className={`px-6 py-3 ${theme.primary} border border-transparent rounded-lg text-base font-bold text-white shadow-sm ${theme.primaryHover} focus:outline-none transition-colors`}
                >
                    Zakończ i przejdź do podsumowania
                </button>
            </div>
        </div>
    );
}