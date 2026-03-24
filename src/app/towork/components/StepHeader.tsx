"use client";

import { useFormContext, useWatch } from 'react-hook-form';
import { AnkietaFormData, ClientType, ColorScheme } from '../types';
import { getThemeClasses } from './theme';

interface StepHeaderProps {
    currentStep: number;
    colorScheme?: ColorScheme;
}

export default function StepHeader({ currentStep, colorScheme = 'red' }: StepHeaderProps) {
    const theme = getThemeClasses(colorScheme);
    const { control } = useFormContext<AnkietaFormData>();
    const clientType = useWatch({ control, name: 'clientType' });
    const getClientTypeLabel = (type: ClientType | null) => {
        switch (type) {
            case 'osoba_fizyczna': return 'Osoby fizycznej';
            case 'jdg': return 'Jednoosobowej działalności gospodarczej';
            case 'rolnik': return 'Gospodarstwa rolnego';
            case 'sp_zoo': return 'Spółki z o.o.';
            case 'sp_osobowa': return 'Spółki osobowej';
            default: return 'Osoby fizycznej / Jednoosobowej działalności gosp. / Gospodarstwa rolnego / Spółki handlowej';
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 md:p-8 rounded-t-2xl text-center">
            <p className="text-gray-300 text-sm md:text-base font-semibold italic mb-2">
                Rozmawiasz właśnie z naszym opiekunem prawnym...
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 uppercase leading-tight">
                DOKOŃCZ ZGŁOSZENIE DO ANALIZY ZADŁUŻENIA <br className="hidden md:block" />
                <span className={`${theme.textPrimary} normal-case`}>{getClientTypeLabel(clientType)}</span>.
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 border-t border-gray-700 pt-5 mt-2">

                <div className="flex items-center text-sm text-gray-400 font-medium">
                    <svg className={`w-5 h-5 mr-2 ${theme.textPrimary} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Wypełnienie formularza... 3 min...
                </div>
                <div className="text-sm font-medium bg-gray-800 px-4 py-2 rounded-full border border-gray-700 text-gray-200 text-center">
                    Twój opiekun prawny czeka na dane...
                </div>
            </div>
        </div>
    );
}