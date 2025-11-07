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
                Nasz Zespół
            </h2>

            <p className="text-lg text-gray-700 max-w-3xl text-center mb-12">
                Nasi prawnicy to klucz do Twojego sukcesu. Łączymy dogłębną wiedzę i wieloletnie doświadczenie, aby dostarczać skuteczne i spersonalizowane rozwiązania.
            </p>

            <div className="w-full max-w-6xl grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                <GsapTeamMemberCard
                    name="Łukasz Sankiewicz"
                    title="Ekspert prawa restrukturyzacyjnego."
                    description="Od 2000 r. przedsiębiorca, ekspert ds. restrukturyzacji i upadłości. Pomaga firmom, tworzy sieci, wdraża innowacje."
                    imageUrl="/images/lukasz.png"
                    altText="Portret Łukasza Sankiewicza, Radcy Prawnego, Partnera"
                />

                <GsapTeamMemberCard
                    name="Kamil Góra"
                    title="Ekspert prawa restrukturyzacyjnego "
                    description="Ekspert prawny specjalizuje się w restrukturyzacji. Łączy wiedzę z innowacją i empatią, budując zaufanie.."
                    imageUrl="/images/kamil.png"
                    altText="Portret Kamila Góry, Adwokata, Senior Associate"
                />

                <GsapTeamMemberCard
                    name="Łukasz Urbanek"
                    title="Specjalista ds. restrukturyzacji"
                    description="Artysta, świetny w relacjach, inspiruje, wyczuwa blokady. Zasadniczy, budzi zaufanie. Gitarzysta"
                    imageUrl="/images/urbanek.png"
                    altText="Portret Łukasz Urbanka, Prawnika i Doradcy"
                />
            </div>
        </section>
    );
}