
// Plik: /app/polityka-prywatnosci/page.tsx
// Wersja zaktualizowana o dane Kancelarii Concierge

import { Metadata } from 'next';
import Link from 'next/link';
import { PencilSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Polityka Prywatności | Kancelaria Concierge',
    description: 'Polityka Prywatności Kancelarii Concierge. Poznaj zasady przetwarzania i ochrony Twoich danych osobowych.',
};

const getCurrentDate = () => {
    return new Date().toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const PrivacyPolicyPage = () => {
    const lastUpdateDate = getCurrentDate();

    return (
        <div>
            <main className="bg-white py-16 sm:py-24 text-black">

                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Polityka Prywatności
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-gray-600">
                        Twoja prywatność jest dla nas priorytetem. Poniżej wyjaśniamy, jakie dane zbieramy i jak je chronimy w serwisie <strong>Narodowy Program Oddłużania</strong>.
                    </p>

                    <div className="prose prose-lg prose-gray mt-14">

                        <h2 id="informacje-ogolne">1. Informacje ogólne</h2>
                        <p>
                            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem przez nich z usług serwisu <strong>Fundacja Lepsza Przyszłość</strong> (dalej jako &#34;Serwis&#34;).
                        </p>

                        <h2 id="administrator">2. Administrator danych osobowych</h2>
                        <div className="my-6 rounded-lg border border-amber-300 bg-amber-50 p-6 not-prose">
                            <div className="flex items-center gap-x-3">
                                <PencilSquareIcon className="h-7 w-7 text-amber-500" aria-hidden="true" />
                                <h3 className="text-lg font-semibold text-amber-900">
                                    Dane Administratora
                                </h3>
                            </div>
                            <dl className="mt-4 space-y-3 text-base text-amber-800">
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
                                    <dt className="font-medium text-amber-900">Administrator:</dt>
                                    <dd className="sm:col-span-3">Narodowy Program Oddłużania Kamil Góra</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
                                    <dt className="font-medium text-amber-900">Adres:</dt>
                                    <dd className="sm:col-span-3">Wincentego Witosa 3a/9, 18-500 Kolno, Polska</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
                                    <dt className="font-medium text-amber-900">E-mail:</dt>
                                    <dd className="sm:col-span-3">
                                        <a href="mailto:kontakt@narodowyprogramoddluzan.pl" className="font-medium text-amber-900 underline hover:text-amber-700">
                                            kontakt@narodowyprogramoddluzan.pl
                                        </a>
                                    </dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
                                    <dt className="font-medium text-amber-900">NIP:</dt>
                                    <dd className="sm:col-span-3">2910236864</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
                                    <dt className="font-medium text-amber-900">REGON:</dt>
                                    <dd className="sm:col-span-3">543318138</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
                                    <dt className="font-medium text-amber-900">Telefon:</dt>
                                    <dd className="sm:col-span-3">+48 793 055 911</dd>
                                </div>
                            </dl>
                        </div>



                        <h2 id="cele">3. Cele i podstawy przetwarzania danych</h2>
                        <p>Administrator przetwarza dane osobowe w następujących celach:</p>
                        <ul>
                            <li>Realizacja umowy (art. 6 ust. 1 lit. b RODO).</li>
                            <li>Marketing własnych produktów lub usług (art. 6 ust. 1 lit. f RODO).</li>
                            <li>Analiza ruchu i statystyki w Serwisie (art. 6 ust. 1 lit. f RODO).</li>
                        </ul>

                        {/* ... reszta sekcji pozostaje bez zmian ... */}

                        <h2 id="okres-przechowywania">4. Okres przechowywania danych</h2>
                        <ul>
                            <li><strong>Realizacja umowy:</strong> przez czas jej trwania i do czasu przedawnienia roszczeń.</li>
                            <li><strong>Marketing i statystyki:</strong> do czasu wniesienia skutecznego sprzeciwu.</li>
                        </ul>

                        <h2 id="odbiorcy">5. Odbiorcy danych</h2>
                        <p>Odbiorcami danych mogą być podmioty przetwarzające dane na nasze zlecenie oraz podmioty uprawnione do tego na podstawie prawa.</p>

                        <h2 id="prawa">6. Prawa Użytkowników</h2>
                        <p>W związku z przetwarzaniem danych, przysługują Ci następujące prawa:</p>
                        <ul>
                            <li>Prawo dostępu do swoich danych oraz otrzymania ich kopii.</li>
                            <li>Prawo do sprostowania (poprawiania) swoich danych.</li>
                            <li>Prawo do usunięcia danych i ograniczenia przetwarzania.</li>
                            <li>Prawo do wniesienia sprzeciwu wobec przetwarzania.</li>
                            <li>Prawo do przenoszenia danych.</li>
                            <li>Prawo do wniesienia skargi do Prezesa UODO.</li>
                        </ul>

                        <h2 id="dobrowolnosc">7. Dobrowolność podania danych</h2>
                        <p>Podanie danych jest dobrowolne, ale może być niezbędne do korzystania z usług Serwisu.</p>

                        <h2 id="profilowanie">8. Zautomatyzowane podejmowanie decyzji</h2>
                        <p>Twoje dane osobowe nie podlegają profilowaniu ani zautomatyzowanemu podejmowaniu decyzji.</p>

                        <h2 id="zabezpieczenia">9. Zabezpieczenie danych</h2>
                        <p>Stosujemy środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych.</p>

                        <h2 id="zmiany">10. Zmiany w Polityce Prywatności</h2>
                        <p>Zastrzegamy sobie prawo do zmiany niniejszej Polityki. Aktualna wersja będzie zawsze dostępna na tej stronie.</p>

                        <h2 id="kontakt">13. Kontakt</h2>
                        <p>W sprawach związanych z danymi osobowymi prosimy o kontakt pod adresem e-mail: <a href="mailto:kontakt@narodowyprogramoddluzan.pl" className="font-semibold text-sky-600 hover:text-sky-500">kontakt@narodowyprogramoddluzan.pl</a>.</p>
                    </div>

                    <div className="mt-16 flex items-center justify-end gap-x-2 border-t border-gray-900/10 pt-8 text-sm text-gray-500">
                        <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />
                        <span>Data ostatniej aktualizacji: {lastUpdateDate}</span>
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/" className="rounded-md bg-gray-800 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
                            &larr; Wróć na stronę główną
                        </Link>
                    </div>
                </div>
            </main></div>
    );
};

export default PrivacyPolicyPage;