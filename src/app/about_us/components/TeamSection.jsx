import React from 'react';
import GsapTeamMemberCard from "@/app/about_us/components/GsapTeamMemberCard";

export default function TeamSection() {
    return (
        <section 
            id="nasz-zespol"
            className="w-full bg-red-100 py-16 sm:py-20 px-6 lg:px-12 xl:px-24 flex flex-col items-center justify-center"
        >
            <div className="flex justify-center lg:justify-start">
                <p className="text-sm font-bold bg-red-700 pt-1 pb-1 pl-5 pr-5 w-fit rounded-2xl text-white uppercase">
                    Oto
                </p>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 text-center">
                Nasza ekipa
            </h2>

            <p className="text-lg text-gray-700 max-w-3xl text-center mb-12">
                Nasi prawnicy to klucz do Twojego sukcesu. Łączymy dogłębną wiedzę i wieloletnie doświadczenie, aby dostarczać skuteczne i spersonalizowane rozwiązania.
            </p>

            <div className="w-full max-w-6xl grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                <GsapTeamMemberCard
                    name="Anna Kowalska"
                    title="Radca Prawny / Partner"
                    description="Specjalistka w prawie handlowym i obsłudze korporacyjnej. Ponad 15 lat doświadczenia w międzynarodowych transakcjach."
                    imageUrl="./anna_kowalska.jpg" 
                    altText="Portret Anny Kowalskiej, Radcy Prawnego, Partnera"
                />

                <GsapTeamMemberCard
                    name="Piotr Nowak"
                    title="Adwokat / Senior Associate"
                    description="Ekspert od postępowań sądowych i arbitrażowych, zwłaszcza w sprawach z zakresu prawa cywilnego i budowlanego."
                    imageUrl="./piotr_nowak.jpg" 
                    altText="Portret Piotra Nowaka, Adwokata, Senior Associate"
                />

                <GsapTeamMemberCard
                    name="Magdalena Wiśniewska"
                    title="Prawnik / Doradca"
                    description="Koncentruje się na prawie pracy i ochronie danych osobowych (RODO). Zawsze dba o zgodność z najnowszymi regulacjami."
                    imageUrl="./magdalena_wisniewska.jpg" 
                    altText="Portret Magdaleny Wiśniewskiej, Prawnika i Doradcy"
                />
            </div>
        </section>
    );
}