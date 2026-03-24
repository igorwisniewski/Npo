"use client";

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AnkietaFormData, ColorScheme } from '../types';
import { getThemeClasses } from './theme';

interface Step1IdentifyProps {
    onNext: () => void;
    onPrev: () => void;
    colorScheme?: ColorScheme;
}

type FieldConfig = {
    id: keyof AnkietaFormData;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'date' | 'radio_tiles';
    placeholder?: string;
    options?: { value: string, label: string }[];
};

export default function Step1Identify({ onNext, onPrev, colorScheme = 'red' }: Step1IdentifyProps) {
    const theme = getThemeClasses(colorScheme);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { register, trigger, setValue, control } = useFormContext<AnkietaFormData>();
    const clientType = useWatch({ control, name: 'clientType' });

    const getFields = (): FieldConfig[] => {
        const common: FieldConfig[] = [
            { id: 'firstName', label: 'Jak masz na imię?', type: 'text', placeholder: 'np. Jan' },
            { id: 'lastName', label: 'Podaj swoje nazwisko', type: 'text', placeholder: 'np. Kowalski' },
            { id: 'phone', label: 'Podaj numer telefonu (do kontaktu z opiekunem prawnym)', type: 'tel', placeholder: 'np. +48 000 000 000' },
            { id: 'email', label: 'Jaki jest Twój adres e-mail?', type: 'email', placeholder: 'np. jan@example.com' },
            {
                id: 'voivodeship', label: 'Wybierz województwo', type: 'select',
                options: [
                    'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie',
                    'Łódzkie', 'Małopolskie', 'Mazowieckie', 'Opolskie',
                    'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
                    'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
                ].map(v => ({ value: v, label: v }))
            }
        ];

        if (clientType === 'osoba_fizyczna') {
            return [...common, { id: 'city', label: 'Podaj swoje miasto', type: 'text', placeholder: 'np. Warszawa' }];
        }
        if (clientType === 'jdg') {
            return [
                ...common,
                { id: 'companyName', label: 'Nazwa Twojej działalności', type: 'text', placeholder: 'np. Moja Firma Jan Kowalski' },
                { id: 'nip', label: 'Podaj numer NIP', type: 'text', placeholder: 'np. 1234567890' },
                { id: 'activityStartDate', label: 'Data rozpoczęcia działalności', type: 'date' },
                { id: 'companyCity', label: 'Miasto prowadzenia działalności', type: 'text', placeholder: 'np. Kraków' }
            ];
        }
        if (clientType === 'rolnik') {
            return [
                ...common,
                { id: 'farmLocation', label: 'Miejscowość prowadzenia gospodarstwa', type: 'text', placeholder: 'np. Wieś pod Lasem' },
                {
                    id: 'farmForm', label: 'Rodzaj działalności', type: 'radio_tiles',
                    options: [
                        { value: 'rolnik_indywidualny', label: 'Rolnik indywidualny' },
                        { value: 'dzialalnosc_rolnicza_i_gospodarcza', label: 'Działalność rolnicza + jednoosobowa działalność gospodarcza' }
                    ]
                }
            ];
        }
        if (clientType === 'sp_zoo') {
            return [
                ...common,
                { id: 'companyName', label: 'Pełna nazwa spółki', type: 'text', placeholder: 'np. Firma Sp. z o.o.' },
                { id: 'krs', label: 'Numer KRS spółki', type: 'text', placeholder: 'np. 0000000000' },
                { id: 'companyCity', label: 'Miasto (siedziba spółki)', type: 'text', placeholder: 'np. Poznań' }
            ];
        }
        if (clientType === 'sp_osobowa') {
            return [
                ...common,
                { id: 'companyName', label: 'Nazwa spółki', type: 'text', placeholder: 'np. Firma s.c.' },
                { id: 'krs', label: 'Numer KRS spółki', type: 'text', placeholder: 'np. 0000000000' },
                { id: 'companyCity', label: 'Miasto (siedziba spółki)', type: 'text', placeholder: 'np. Gdańsk' }
            ];
        }
        return common;
    };

    const fields = getFields();
    const currentField = fields[currentIndex];
    const currentVal = useWatch({ control, name: currentField?.id as any });

    const validateField = (id: string, value: string) => {
        if (!value) return false;
        if (id === 'nip') {
            const nipReg = /^[0-9]{10}$/;
            return nipReg.test(value);
        }
        if (id === 'krs') {
            const krsReg = /^[0-9]{10}$/; // KRS ma 10 cyfr
            return krsReg.test(value);
        }
        if (id === 'phone') {
            const phoneReg = /^[0-9\+\-\s]{9,15}$/;
            return phoneReg.test(value);
        }
        if (id === 'email') {
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailReg.test(value);
        }
        return true;
    };

    const handleNextField = async () => {
        const val = currentVal;

        if (!validateField(currentField.id, val)) {
            alert(`Proszę podać poprawne dane w polu: ${currentField.label}`);
            return;
        }

        const valid = await trigger(currentField.id as keyof AnkietaFormData);

        if (valid) {
            if (currentIndex < fields.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onNext();
            }
        }
    };

    const handlePrevField = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            onPrev();
        }
    };

    const renderInput = () => {
        const val = currentVal;

        if (currentField.type === 'radio_tiles') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {currentField.options?.map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                setValue(currentField.id, opt.value as any, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                            }}
                            className={`p-6 border rounded-2xl transition-all duration-200 text-center hover:-translate-y-1 hover:shadow-lg active:scale-95
                                ${val === opt.value
                                ? `${theme.borderPrimary} ${theme.bgLight} ring-2 ${theme.ring} ring-opacity-50 shadow-sm`
                                : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
                            }`}
                        >
                            <span className="font-semibold text-lg text-gray-800">{opt.label}</span>
                        </button>
                    ))}
                </div>
            );
        }

        if (currentField.type === 'select') {
            return (
                <div className="mt-8">
                    <select
                        {...register(currentField.id, { required: true })}
                        className={`block w-full rounded-xl border-gray-300 shadow-sm focus:${theme.borderPrimary.replace('border-', 'border-')} focus:${theme.ring.replace('ring-', 'ring-')} text-lg p-5 border bg-white text-center`}
                    >
                        <option value="">Wybierz...</option>
                        {currentField.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            );
        }

        return (
            <div className="mt-8" key={currentField.id}>
                <input
                    type={currentField.type}
                    {...register(currentField.id, { required: true })}
                    className={`block w-full max-w-md mx-auto rounded-xl border-gray-300 shadow-sm focus:${theme.borderPrimary.replace('border-', 'border-')} focus:${theme.ring.replace('ring-', 'ring-')} text-xl p-5 border text-center transition-all bg-white`}
                    placeholder={currentField.placeholder}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleNextField();
                        }
                    }}
                />
            </div>
        );
    };

    return (
        <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[40vh] py-8 w-full max-w-3xl mx-auto">
            <div className="w-full text-center">
                <p className={`text-sm font-semibold ${theme.textPrimary} uppercase tracking-wide mb-2`}>Krok 1: Dane identyfikacyjne ({currentIndex + 1}/{fields.length})</p>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {currentField.label}
                </h2>
                <div className="w-full flex justify-center mt-4">
                    {renderInput()}
                </div>
            </div>

            <div className="mt-12 w-full flex justify-between pt-6 border-t border-gray-100">
                <button type="button" onClick={handlePrevField} className="px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors">
                    Wróć
                </button>
                <button
                    type="button"
                    onClick={handleNextField}
                    className={`px-8 py-3 ${theme.primary} border border-transparent rounded-xl text-base font-bold text-white shadow-lg ${theme.primaryHover} focus:outline-none transition-all hover:scale-105`}
                >
                    Dalej
                </button>
            </div>

            <div className="w-full bg-gray-100 h-2 rounded-full mt-8 overflow-hidden">
                <div className={`${theme.primary} h-full transition-all duration-300 ease-out`} style={{ width: `${((currentIndex + 1) / fields.length) * 100}%` }} />
            </div>
        </div>
    );
}