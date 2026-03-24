"use client";

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { supabase } from '@/utils/supabaseclient';
import { AnkietaFormData, ColorScheme } from '../types';
import { getThemeClasses } from './theme';

interface Step3DebtProps {
    onNext: () => void;
    onPrev: () => void;
    colorScheme?: ColorScheme;
}

type FieldConfig = {
    id: keyof AnkietaFormData;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'radio_tiles' | 'checkbox_tiles';
    placeholder?: string;
    options?: { value: string, label: string }[];
};

export default function Step3Debt({ onNext, onPrev, colorScheme = 'red' }: Step3DebtProps) {
    const theme = getThemeClasses(colorScheme);
    const { register, handleSubmit, setValue, getValues, trigger, control } = useFormContext<AnkietaFormData>();
    
    // Reactivity via useWatch
    const clientType = useWatch({ control, name: 'clientType' });
    const farmForm = useWatch({ control, name: 'farmForm' });
    const linkedToCompany = useWatch({ control, name: 'linkedToCompany' });
    const maritalSeparation = useWatch({ control, name: 'maritalSeparation' });
    const sharesInCompanies = useWatch({ control, name: 'sharesInCompanies' });
    const arimrSubsidies = useWatch({ control, name: 'arimrSubsidies' });
    const debtTypes = useWatch({ control, name: 'debtTypes' }) || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data: AnkietaFormData) => {
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const payload = {
                client_type: data.clientType,
                contact_info: {
                    first_name: data.firstName || '',
                    last_name: data.lastName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    voivodeship: data.voivodeship || '',
                    city: data.city || null,
                    company_city: data.companyCity || null,
                    company_name: data.companyName || null,
                    nip: data.nip || null,
                    krs: data.krs || null
                },
                assets_info: {
                    status: data.status || null,
                    private_assets: data.privateAssets || [],
                    estimated_private_value: data.estimatedPrivateAssetsValue || null,
                    other_private_asset_details: data.otherAssetPrivateDetails || null,
                    firm_assets: data.firmAssets || [],
                    estimated_firm_value: data.estimatedFirmAssetsValue || null,
                    other_firm_asset_details: data.otherAssetFirmDetails || null,
                    farm_area: data.farmArea || null,
                    has_bailiff: data.hasBailiff || null,
                    total_debt: data.totalDebtAmount || null
                },
                debt_details: {
                    debt_types: data.debtTypes || [],
                    other_debt_details: data.otherDebtDetails || null,
                    monthly_income: data.monthlyIncome || null,
                    marital_separation: data.maritalSeparation || null,
                    marital_separation_date: data.maritalSeparationDate || null,
                    dependents_description: data.dependentsDescription || null,
                    financial_result: data.financialResult || null,
                    linked_to_company: data.linkedToCompany || null,
                    linked_company_krs: data.linkedCompanyKrs || null,
                    shares_in_companies: data.sharesInCompanies || null,
                    shares_details: data.sharesDetails || null,
                    arimr_subsidies: data.arimrSubsidies || null,
                    arimr_subsidies_amount: data.arimrSubsidiesAmount || null,
                    arimr_subsidies_details: data.arimrSubsidiesDetails || null,
                    krs_reports_filed: data.krsReportsFiled || null,
                    private_guarantees: data.privateGuarantees || null,
                    additional_info: data.additionalInfo || null
                },
                created_at: new Date().toISOString()
            };

            const safePayload = JSON.parse(JSON.stringify(payload));

            const { data: insertedData, error } = await supabase
                .from('submissions')
                .insert([safePayload])
                .select();

            if (error) {
                console.error("Supabase insert log:", JSON.stringify(error, null, 2));
                setErrorMsg(`Błąd zapisu danych: ${error.message}. Upewnij się, że tabela 'submissions' istnieje i ma wyłączone RLS dla anonimów lub dodano odpowiednie polityki.`);
            }

            if (insertedData && insertedData[0]) {
                setValue('submissionId', insertedData[0].id);
            }

            onNext();
        } catch (err: unknown) {
            console.error(err);
            onNext();
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDebtTypes = () => {
        if (clientType === 'osoba_fizyczna') return ['Kredyty bankowe', 'Chwilówki', 'Leasing konsumencki', 'Inne'];
        if (clientType === 'jdg') return ['Kredyty bankowe', 'Leasing', 'ZUS', 'US', 'Kontrahenci', 'Inne'];
        if (clientType === 'rolnik') return ['Bankowe', 'Preferencyjne rolnicze', 'Leasing maszyn', 'KRUS', 'US', 'Kontrahenci', 'Inne'];
        return ['Bankowe', 'Leasingi', 'ZUS', 'US', 'Kontrahenci', 'Inne'];
    };

    const getIncomeOptions = () => {
        if (clientType === 'osoba_fizyczna') {
            return [
                { value: 'brak', label: 'Brak dochodu' },
                { value: 'do_3000', label: 'do 3000 zł' },
                { value: '3000_7000', label: '3000 – 7000 zł' },
                { value: 'powyzej_7000', label: 'Powyżej 7000 zł' }
            ];
        }
        return [
            { value: 'strata', label: 'Przynosi stratę' },
            { value: 'do_10k', label: 'Dochód do 10 000 PLN' },
            { value: '10k_30k', label: 'Dochód 10 000 - 30 000 PLN' },
            { value: 'powyzej_30k', label: 'Dochód powyżej 30 000 PLN' }
        ];
    };

    const getFields = (): FieldConfig[] => {
        const fields: FieldConfig[] = [];

        // 1. Zobowiązania - zaktualizowany tekst i obsługa opcji "Inne"
        fields.push({
            id: 'debtTypes', label: 'Zaznacz rodzaje posiadanych zobowiązań (możesz wybrać kilka)', type: 'checkbox_tiles',
            options: getDebtTypes().map(opt => ({ value: opt, label: opt }))
        });

        if (debtTypes.includes('Inne')) {
            fields.push({ id: 'otherDebtDetails', label: 'Podaj jakie to inne zobowiązania', type: 'text', placeholder: 'np. Pożyczki prywatne od rodziny' });
        }

        // 2. Osoba fizyczna
        if (clientType === 'osoba_fizyczna') {
            fields.push({
                id: 'linkedToCompany', label: 'Czy posiadasz udziały w spółce lub pełnisz funkcję w jej zarządzie?', type: 'radio_tiles',
                options: [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }]
            });
            if (linkedToCompany === 'tak') {
                fields.push({ id: 'linkedCompanyKrs', label: 'Podaj numer KRS spółki', type: 'text', placeholder: 'Wpisz KRS...' });
            }

            fields.push({
                id: 'monthlyIncome', label: 'Jaki jest Twój miesięczny dochód netto?', type: 'radio_tiles',
                options: getIncomeOptions()
            });

            fields.push({
                id: 'maritalSeparation', label: 'Czy posiadasz rozdzielność majątkową (intercyzę)?', type: 'radio_tiles',
                options: [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }]
            });
            if (maritalSeparation === 'tak') {
                fields.push({ id: 'maritalSeparationDate', label: 'Podaj datę ustanowienia rozdzielności', type: 'date' });
            }

            fields.push({ id: 'dependentsDescription', label: 'Dzieci na utrzymaniu (wiek, liczba) - opcjonalnie', type: 'text', placeholder: 'Np. 2 dzieci, 5 i 12 lat' });
        }

        // 3. JDG i Rolnik - dochody
        if (clientType === 'jdg' || clientType === 'rolnik') {
            fields.push({
                id: 'monthlyIncome', label: 'Jaki jest średni miesięczny dochód/zyski?', type: 'radio_tiles',
                options: getIncomeOptions()
            });
        }

        // 4. JDG oraz Rolnik prowadzący JDG - udziały w innych spółkach
        if (clientType === 'jdg' || (clientType === 'rolnik' && farmForm === 'dzialalnosc_rolnicza_i_gospodarcza')) {
            fields.push({
                id: 'sharesInCompanies', label: 'Czy posiadasz udziały w spółce lub pełnisz funkcję w jej zarządzie?', type: 'radio_tiles',
                options: [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }]
            });
            if (sharesInCompanies === 'tak') {
                fields.push({ id: 'sharesDetails', label: 'Opisz szczegóły (rodzaj spółki, charakter udziału, nazwa, numer KRS)', type: 'textarea', placeholder: 'Napisz tutaj...' });
            }
        }

        // 5. Dopłaty dla rolników
        if (clientType === 'rolnik') {
            fields.push({
                id: 'arimrSubsidies', label: 'Czy korzystasz z dopłat?', type: 'radio_tiles',
                options: [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }]
            });
            if (arimrSubsidies === 'tak') {
                fields.push({ id: 'arimrSubsidiesAmount', label: 'Podaj kwotę dopłat', type: 'text', placeholder: 'Podaj kwotę...' });
            }
        }

        // 6. Spółki
        if (clientType === 'sp_zoo' || clientType === 'sp_osobowa') {
            fields.push({
                id: 'financialResult', label: 'Jaki jest aktualny wynik finansowy?', type: 'radio_tiles',
                options: getIncomeOptions()
            });
            fields.push({
                id: 'privateGuarantees', label: 'Czy zarząd / wspólnicy podpisali prywatne poręczenia?', type: 'radio_tiles',
                options: [{ value: 'tak', label: 'Tak' }, { value: 'nie', label: 'Nie' }]
            });
        }

        if (clientType === 'sp_zoo') {
            fields.push({
                id: 'krsReportsFiled', label: 'Czy sprawozdania finansowe w KRS są składane terminowo?', type: 'radio_tiles',
                options: [
                    { value: 'tak', label: 'Tak' },
                    { value: 'nie', label: 'Nie' },
                    { value: 'nie_wiem', label: 'Nie wiem / Nie jestem pewien' }
                ]
            });
        }

        // 7. Opcjonalny opis na końcu (wspólny dla wszystkich)
        fields.push({ id: 'additionalInfo', label: 'Opcjonalnie: opisz krótko genezę swoich problemów finansowych', type: 'textarea', placeholder: 'Napisz nam więcej o swojej sytuacji...' });

        return fields;
    };

    const fields = getFields();
    const safeIndex = Math.min(currentIndex, fields.length > 0 ? fields.length - 1 : 0);
    const currentField = fields[safeIndex];
    const isLastField = safeIndex === fields.length - 1;
    const currentVal = useWatch({ control, name: currentField?.id as keyof AnkietaFormData });

    const handleCheckboxToggle = (v: string) => {
        const currentVals = (getValues(currentField.id as keyof AnkietaFormData) as string[]) || [];
        let newVals = [...currentVals];
        if (newVals.includes(v)) {
            newVals = newVals.filter(v_ => v_ !== v);
        } else {
            newVals.push(v);
        }
        setValue(currentField.id, newVals as never, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    };

    const handleNextField = async () => {
        const valid = await trigger(currentField.id as keyof AnkietaFormData);
        const isOpt = currentField.id === 'additionalInfo' || currentField.id === 'dependentsDescription' || currentField.id === 'otherDebtDetails';

        if (valid || isOpt) {
            if (!isLastField) {
                setCurrentIndex(prev => prev + 1);
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
                                setValue(currentField.id, opt.value as never, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
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

        if (currentField.type === 'checkbox_tiles') {
            const selectedArr = val || [];
            return (
                <div className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentField.options?.map(opt => {
                            const isSelected = selectedArr.includes(opt.value);
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleCheckboxToggle(opt.value)}
                                    className={`p-5 border rounded-2xl transition-all duration-200 text-center hover:-translate-y-1 hover:shadow-sm active:scale-95
                                        ${isSelected
                                        ? `${theme.borderPrimary} ${theme.bgLight} ring-2 ${theme.ring} ring-opacity-50 shadow-sm`
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                >
                                    <span className={`font-semibold text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {opt.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (currentField.type === 'textarea') {
            return (
                <div className="mt-8" key={currentField.id}>
                    <textarea
                        {...register(currentField.id, { required: currentField.id !== 'additionalInfo' && currentField.id !== 'dependentsDescription' && currentField.id !== 'sharesDetails' })}
                        className={`block w-full max-w-2xl mx-auto rounded-xl border-gray-300 shadow-sm focus:${theme.borderPrimary.replace('border-', 'border-')} focus:${theme.ring.replace('ring-', 'ring-')} text-lg p-5 border transition-all bg-white`}
                        placeholder={currentField.placeholder}
                        rows={4}
                        autoFocus
                    />
                </div>
            );
        }

        return (
            <div className="mt-8" key={currentField.id}>
                <input
                    type={currentField.type}
                    {...register(currentField.id, { required: currentField.id !== 'additionalInfo' && currentField.id !== 'dependentsDescription' && currentField.id !== 'otherDebtDetails' })}
                    className={`block w-full max-w-md mx-auto rounded-xl border-gray-300 shadow-sm focus:${theme.borderPrimary.replace('border-', 'border-')} focus:${theme.ring.replace('ring-', 'ring-')} text-xl p-5 border text-center transition-all bg-white`}
                    placeholder={currentField.placeholder}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (!isLastField) handleNextField();
                        }
                    }}
                />
            </div>
        );
    };

    return (
        <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[40vh] py-8 w-full max-w-4xl mx-auto">
            <div className="w-full text-center">
                <p className={`text-sm font-semibold ${theme.textPrimary} uppercase tracking-wide mb-2`}>Krok 3: Zadłużenie i szczegóły ({safeIndex + 1}/{fields.length})</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight px-4">
                    {currentField.label}
                </h2>
                <div className="w-full mt-4">
                    {renderInput()}
                </div>
                {errorMsg && (
                    <div className="text-red-500 text-sm mt-4 p-3 bg-red-50 rounded-md border border-red-100 max-w-md mx-auto">
                        {errorMsg}
                    </div>
                )}
            </div>

            <div className="mt-12 w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={handlePrevField} disabled={isSubmitting} className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors disabled:opacity-50">
                    Wróć
                </button>
                {isLastField ? (
                    <div className="w-full sm:w-auto text-center sm:text-right">
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-8 py-4 bg-gray-900 border border-transparent rounded-xl text-lg font-bold text-white shadow-xl hover:bg-gray-800 hover:shadow-2xl focus:outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[280px]"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Przetwarzanie...
                                </span>
                            ) : (
                                "Przekazuję dane do analizy"
                            )}
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Przechodząc dalej, akceptujesz warunki i zgody RODO.</p>
                    </div>
                ) : (
                        <button
                            type="button"
                            onClick={handleNextField}
                            disabled={isSubmitting}
                            className={`w-full sm:w-auto px-8 py-3 ${theme.primary} border border-transparent rounded-xl text-base font-bold text-white shadow-lg ${theme.primaryHover} focus:outline-none transition-all hover:scale-105`}
                        >
                            Dalej
                        </button>
                )}
            </div>

            <div className="w-full bg-gray-100 h-2 rounded-full mt-8 overflow-hidden">
                <div
                    className={`${theme.primary} h-full transition-all duration-300 ease-out`}
                    style={{ width: `${((safeIndex + 1) / fields.length) * 100}%` }}
                />
            </div>
        </div>
    );
}