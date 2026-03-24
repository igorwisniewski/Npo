"use client";

import AnkietaWizard from '../towork/components/AnkietaWizard';

export default function KonsumenciPage() {
    return (
        <main className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
            <AnkietaWizard
                allowedTypes={['osoba_fizyczna']}
                defaultType="osoba_fizyczna"
                title="Sytuacja finansowa - Osoby Fizyczne"
                colorScheme="red"
            />
        </main>
    );
}
