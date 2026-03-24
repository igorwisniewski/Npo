"use client";

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AnkietaFormData, ColorScheme } from '../types';
import { getThemeClasses } from './theme';

interface Step2AssetsProps {
    onNext: () => void;
    onPrev: () => void;
    colorScheme?: ColorScheme;
}

type FieldConfig = {
    id: keyof AnkietaFormData;
    label: string;
    type: 'text' | 'number' | 'radio_tiles' | 'checkbox_tiles';
    placeholder?: string;
    options?: { value: string, label: string }[];
};

export default function Step2Assets({ onNext, onPrev, colorScheme = 'red' }: Step2AssetsProps) {
    const theme = getThemeClasses(colorScheme);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { register, trigger, setValue, getValues, control } = useFormContext<AnkietaFormData>();
    const clientType = useWatch({ control, name: 'clientType' });
    const privateAssets = useWatch({ control, name: 'privateAssets' }) || [];
    const firmAssets = useWatch({ control, name: 'firmAssets' }) || [];

    const getPrivateAssetsOptions = () => ['Dom', 'Mieszkanie', 'Działka', 'Samochód', 'Gotówka / Oszczędności', 'Brak majątku prywatnego', 'Inne'];

    const getFirmAssetsOptions = () => {
        if (clientType === 'jdg') return ['Nieruchomość firmowa', 'Maszyny i sprzęt', 'Samochody firmowe', 'Towar i magazyn', 'Brak majątku firmowego', 'Inne'];
        if (clientType === 'rolnik') return ['Grunty rolne własne', 'Grunty dzierżawione', 'Budynki gospodarcze', 'Maszyny rolnicze', 'Ciągniki', 'Brak majątku', 'Inne'];
        return ['Nieruchomości firmowe', 'Maszyny i sprzęt', 'Pojazdy firmowe', 'Towar i magazyn', 'Brak majątku firmowego', 'Inne'];
    };

    const getFields = (): FieldConfig[] => {
        const fields: FieldConfig[] = [];

        // 1. Majątek Prywatny
        fields.push({
            id: 'privateAssets', label: 'ZAZNACZ POSIADANY MAJĄTEK PRYWATNY', type: 'checkbox_tiles',
            options: getPrivateAssetsOptions().map(opt => ({ value: opt, label: opt }))
        });

        if (privateAssets.includes('Inne')) {
            fields.push({ id: 'otherAssetPrivateDetails', label: 'Opisz krótko inny majątek prywatny', type: 'text', placeholder: 'np. Biżuteria, dzieła sztuki' });
        }
        if (privateAssets.length > 0 && !privateAssets.includes('Brak majątku prywatnego')) {
            fields.push({ id: 'estimatedPrivateAssetsValue', label: 'Szacunkowa wartość majątku prywatnego (PLN)', type: 'text', placeholder: 'np. 500 000 zł' });
        }

        // 2. Majątek Firmowy
        if (clientType !== 'osoba_fizyczna') {
            fields.push({
                id: 'firmAssets', label: 'ZAZNACZ POSIADANY MAJĄTEK FIRMOWY', type: 'checkbox_tiles',
                options: getFirmAssetsOptions().map(opt => ({ value: opt, label: opt }))
            });

            if (firmAssets.includes('Inne')) {
                fields.push({ id: 'otherAssetFirmDetails', label: 'Opisz krótko inny majątek firmowy', type: 'text', placeholder: 'np. Wyposażenie biura' });
            }
            if (firmAssets.length > 0 && !firmAssets.includes('Brak majątku firmowego')) {
                fields.push({ id: 'estimatedFirmAssetsValue', label: 'Szacunkowa wartość majątku firmowego (PLN)', type: 'text', placeholder: 'np. 200 000 zł' });
            }
        }

        // 3. Statusy
        if (clientType === 'jdg') {
            fields.push({
                id: 'status', label: 'Jaki jest obecny status działalności?', type: 'radio_tiles',
                options: [
                    { value: 'prowadzona', label: 'Działalność prowadzona' },
                    { value: 'zawieszona', label: 'Działalność zawieszona' },
                    { value: 'zakonczona', label: 'Działalność zakończona' },
                    { value: 'restrukturyzacyjne', label: 'Postępowanie restrukturyzacyjne' },
                    { value: 'upadlosciowe', label: 'Postępowanie upadłościowe' }
                ]
            });
        }
        if (clientType === 'sp_zoo' || clientType === 'sp_osobowa') {
            fields.push({
                id: 'status', label: 'Jaki jest obecny status spółki?', type: 'radio_tiles',
                options: [
                    { value: 'prowadzi', label: 'Spółka prowadzi działalność' },
                    { value: 'zawieszona', label: 'Działalność zawieszona' },
                    { value: 'likwidacja', label: 'Spółka w likwidacji' },
                    { value: 'zakonczona', label: 'Spółka zakończyła działalność' },
                    { value: 'restrukturyzacja_upadlosc', label: 'Spółka w restrukturyzacji lub upadłości' }
                ]
            });
        }
        if (clientType === 'rolnik') {
            fields.push({
                id: 'status', label: 'Jaki jest obecny status działalności rolniczej?', type: 'radio_tiles',
                options: [
                    { value: 'prowadzone', label: 'Gospodarstwo prowadzone' },
                    { value: 'wstrzymana', label: 'Produkcja rolnicza wstrzymana' },
                    { value: 'restrukturyzacja', label: 'Gospodarstwo w restrukturyzacji' },
                    { value: 'upadlosc', label: 'Postępowanie upadłościowe' },
                    { value: 'zakonczone', label: 'Gospodarstwo zakończyło działalność' }
                ]
            });
            fields.push({ id: 'farmArea', label: 'Podaj powierzchnię gospodarstwa (w hektarach)', type: 'number', placeholder: 'np. 15.5' });
        }

        fields.push({
            id: 'hasBailiff', label: 'Czy sprawą zajmuje się już komornik?', type: 'radio_tiles',
            options: [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }]
        });

        fields.push({
            id: 'totalDebtAmount', label: 'Jaka jest szacunkowa łączna kwota zadłużenia?', type: 'radio_tiles',
            options: (clientType === 'sp_zoo' || clientType === 'sp_osobowa') ? [
                { value: 'do_100k', label: 'do 100 tys.' }, { value: '100k_500k', label: '100–500 tys.' }, { value: '500k_1m', label: '500 tys. – 1 mln' }, { value: '1m_5m', label: '1 mln – 5 mln' }, { value: 'powyzej_5m', label: 'powyżej 5 mln' }
            ] : [
                { value: 'do_50k', label: 'do 50 tys.' }, { value: '50k_200k', label: '50–200 tys.' }, { value: '200k_500k', label: '200–500 tys.' }, { value: '500k_1m', label: '500 tys. – 1 mln' }, { value: 'powyzej_1m', label: 'powyżej 1 mln' }
            ]
        });

        return fields;
    };

    const fields = getFields();
    const currentField = fields[Math.min(currentIndex, fields.length - 1)];
    const val = useWatch({ control, name: currentField.id as keyof AnkietaFormData });

    const handleCheckboxToggle = (v: string) => {
        const currentVals = (getValues(currentField.id as keyof AnkietaFormData) as string[]) || [];
        const isNone = v === 'Brak majątku' || v === 'Brak majątku firmowego' || v === 'Brak majątku prywatnego';

        if (isNone) {
            setValue(currentField.id, (currentVals.includes(v) ? [] : [v]) as never, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
            return;
        }

        let newVals = currentVals.filter(v_ => v_ !== 'Brak majątku' && v_ !== 'Brak majątku firmowego' && v_ !== 'Brak majątku prywatnego');
        if (newVals.includes(v)) {
            newVals = newVals.filter(v_ => v_ !== v);
        } else {
            newVals.push(v);
        }
        setValue(currentField.id, newVals as never, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    };

    const handleNextField = async () => {
        // Zabezpieczenie przed przejściem bez wybrania checkboxów, jeśli są wymagane
        if (currentField.type === 'checkbox_tiles') {
            if (!val || val.length === 0) {
                alert('Proszę zaznaczyć przynajmniej jedną opcję.');
                return;
            }
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

    const handlePrevField = () => currentIndex > 0 ? setCurrentIndex(prev => prev - 1) : onPrev();

    const renderInput = () => {

        if (currentField.type === 'radio_tiles') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {currentField.options?.map(opt => (
                        <button key={opt.value} type="button" onClick={() => { setValue(currentField.id, opt.value as never, { shouldValidate: true, shouldDirty: true, shouldTouch: true }); }}
                                className={`p-6 border rounded-2xl transition-all duration-200 text-center hover:-translate-y-1 hover:shadow-lg active:scale-95 ${val === opt.value ? `${theme.borderPrimary} ${theme.bgLight} ring-2 ${theme.ring} ring-opacity-50 shadow-sm` : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'}`}>
                            <span className="font-semibold text-lg text-gray-800">{opt.label}</span>
                        </button>
                    ))}
                </div>
            );
        }

        if (currentField.type === 'checkbox_tiles') {
            const selectedArr = val || [];
            return (
                <div className="mt-6 flex flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {currentField.options?.map(opt => {
                            const isSelected = selectedArr.includes(opt.value);
                            return (
                                <button key={opt.value} type="button" onClick={() => handleCheckboxToggle(opt.value)}
                                        className={`p-5 border rounded-2xl transition-all duration-200 text-center hover:-translate-y-1 hover:shadow-sm active:scale-95 ${isSelected ? `${theme.borderPrimary} ${theme.bgLight} ring-2 ${theme.ring} ring-opacity-50 shadow-sm` : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                                    <span className={`font-semibold text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="mt-8" key={currentField.id}>
                <input type={currentField.type} {...register(currentField.id, { required: true })}
                       className={`block w-full max-w-md mx-auto rounded-xl border-gray-300 shadow-sm focus:${theme.borderPrimary.replace('border-', 'border-')} focus:${theme.ring.replace('ring-', 'ring-')} text-xl p-5 border text-center transition-all bg-white`}
                       placeholder={currentField.placeholder} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNextField(); } }} />
            </div>
        );
    };

    return (
        <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[40vh] py-8 w-full max-w-4xl mx-auto">
            <div className="w-full text-center">
                <p className={`text-sm font-semibold ${theme.textPrimary} uppercase tracking-wide mb-2`}>Krok 2: Sytuacja majątkowa ({currentIndex + 1}/{fields.length})</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight px-4">{currentField.label}</h2>
                <div className="w-full mt-4">{renderInput()}</div>
            </div>

            <div className="mt-12 w-full flex justify-between items-center pt-6 border-t border-gray-100">
                <button type="button" onClick={handlePrevField} className="px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors">Wróć</button>
                <button type="button" onClick={handleNextField} className={`px-8 py-3 ${theme.primary} border border-transparent rounded-xl text-base font-bold text-white shadow-lg ${theme.primaryHover} focus:outline-none transition-all hover:scale-105`}>Dalej</button>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-8 overflow-hidden"><div className={`${theme.primary} h-full transition-all duration-300 ease-out`} style={{ width: `${((currentIndex + 1) / fields.length) * 100}%` }}/></div>
        </div>
    );
}