"use client";

import AnkietaWizard from './components/AnkietaWizard';

export default function AnkietaPage() {
    return (
        <main className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
            <AnkietaWizard 
                allowedTypes={['jdg', 'sp_zoo', 'sp_osobowa']}
                title="Analiza dla Firm i Spółek"
            />
        </main>
    );
}