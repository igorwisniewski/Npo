"use client";

import { useFormContext, useWatch } from 'react-hook-form';
import { User, Building2, Tractor, Building, Users } from 'lucide-react';
import { AnkietaFormData, ClientType, ColorScheme } from '../types';
import { getThemeClasses } from './theme';

interface ClientTypeSelectionProps {
    onNext: () => void;
    allowedTypes?: ClientType[];
    colorScheme?: ColorScheme;
}

export default function ClientTypeSelection({ onNext, allowedTypes, colorScheme = 'red' }: ClientTypeSelectionProps) {
    const theme = getThemeClasses(colorScheme);
    const { setValue, control } = useFormContext<AnkietaFormData>();
    const selectedType = useWatch({
        control,
        name: 'clientType'
    });

    const handleSelect = (type: ClientType) => {
        setValue('clientType', type, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    };

    const allTypes: { id: ClientType, label: string, icon: React.ReactNode }[] = [
        { id: 'osoba_fizyczna', label: 'Osoba fizyczna', icon: <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" /> },
        { id: 'jdg', label: 'Jednoosobowa działalność gospodarcza (JDG)', icon: <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" /> },
        { id: 'rolnik', label: 'Gospodarstwo rolne', icon: <Tractor className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" /> },
        { id: 'sp_zoo', label: 'Spółka z o.o.', icon: <Building className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" /> },
        { id: 'sp_osobowa', label: 'Spółka cywilna / jawna', icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" /> },
    ];

    const types = allowedTypes 
        ? allTypes.filter(t => allowedTypes.includes(t.id))
        : allTypes;

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Jakiego typu klienta dotyczy zgłoszenie?</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {types.map((type) => (
                    <button
                        key={type.id}
                        type="button"
                        onClick={() => handleSelect(type.id)}
                        className={`flex flex-col items-center justify-center p-4 sm:p-6 border rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-center active:scale-95
                            ${selectedType === type.id 
                                ? `${theme.borderPrimary} ${theme.bgLight} ring-2 ${theme.ring} ring-opacity-50 shadow-md` 
                                : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
                            }`}
                    >
                        <span className="text-4xl sm:text-5xl mb-3 block">{type.icon}</span>
                        <span className="font-semibold text-sm sm:text-base text-gray-800 leading-tight">{type.label}</span>
                    </button>
                ))}
            </div>

            <div className="mt-12 flex justify-end pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!selectedType}
                    className={`px-8 py-3 ${theme.primary} border border-transparent rounded-xl text-base font-bold text-white shadow-lg ${theme.primaryHover} focus:outline-none transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100`}
                >
                    Dalej
                </button>
            </div>
        </div>
    );
}
