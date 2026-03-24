"use client";

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';
import { AnkietaFormData, ClientType, ColorScheme } from '../types';
import StepHeader from './StepHeader';
import ClientTypeSelection from './ClientTypeSelection';
import Step1Identify from './Step1Identify';
import Step2Assets from './Step2Assets';
import Step3Debt from './Step3Debt';
import Step4Upload from './Step4Upload';
import Step5ThankYou from './Step5ThankYou';

const COOKIE_KEY = 'ankieta_form_data';

interface AnkietaWizardProps {
    allowedTypes?: ClientType[];
    defaultType?: ClientType;
    title?: string;
    colorScheme?: ColorScheme;
}

export default function AnkietaWizard({ 
    allowedTypes, 
    defaultType,
    title,
    colorScheme = 'red'
}: AnkietaWizardProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const methods = useForm<AnkietaFormData>({
        defaultValues: {
            clientType: defaultType || null,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            voivodeship: '',
            privateAssets: [],
            firmAssets: [],
            debtTypes: [],
        }
    });

    // Load from cookies on mount
    useEffect(() => {
        setIsMounted(true);
        const savedData = Cookies.get(COOKIE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Only reset if it matches allowed types or if no types restricted
                if (!allowedTypes || (parsed.clientType && allowedTypes.includes(parsed.clientType))) {
                    methods.reset(parsed);
                    if (parsed.clientType) {
                        setCurrentStep(1);
                    }
                }
            } catch (e) {
                console.error("Failed to parse form cookies", e);
            }
        } else if (defaultType) {
            methods.setValue('clientType', defaultType);
            setCurrentStep(1);
        }
    }, [methods, allowedTypes, defaultType]);

    // Save to cookies on change
    useEffect(() => {
        if (!isMounted) return;
        const subscription = methods.watch((value) => {
            Cookies.set(COOKIE_KEY, JSON.stringify(value), { expires: 7 });
        });
        return () => subscription.unsubscribe();
    }, [methods, isMounted]);

    if (!isMounted) return <div className="min-h-[50vh] flex items-center justify-center">Ładowanie...</div>;

    const nextStep = () => {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(0, prev - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <FormProvider {...methods}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {currentStep < 5 && <StepHeader currentStep={currentStep} colorScheme={colorScheme} />}
                <div className="p-6 md:p-10">
                    {currentStep === 0 && (
                        <ClientTypeSelection 
                            onNext={nextStep} 
                            allowedTypes={allowedTypes} 
                            colorScheme={colorScheme}
                        />
                    )}
                    {currentStep === 1 && <Step1Identify onNext={nextStep} onPrev={prevStep} colorScheme={colorScheme} />}
                    {currentStep === 2 && <Step2Assets onNext={nextStep} onPrev={prevStep} colorScheme={colorScheme} />}
                    {currentStep === 3 && <Step3Debt onNext={nextStep} onPrev={prevStep} colorScheme={colorScheme} />}
                    {currentStep === 4 && <Step4Upload onNext={nextStep} colorScheme={colorScheme} />}
                    {currentStep === 5 && <Step5ThankYou colorScheme={colorScheme} />}
                </div>
            </div>
        </FormProvider>
    );
}
