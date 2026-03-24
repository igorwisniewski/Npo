// Plik: /app/polityka-prywatnosci/page.tsx
// Wersja zaktualizowana

import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

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
                        Twoja prywatność jest dla nas priorytetem. Poniżej wyjaśniamy, jakie dane zbieramy i jak je chronimy.
                    </p>

                    <div className="prose prose-lg prose-gray mt-14">
                        <h2>1. Informacje ogólne</h2>
                        <ol>
                            <li>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: <b>narodowyprogramoddluzen.pl lub pod adresem narodowyprogramoddluzan.pl lub pod adresem npo.cncg.pl</b></li>
                            <li>
                                Operatorem serwisu oraz Administratorem danych osobowych jest: NARODOWY PROGRAM ODDŁUŻEŃ SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ UL. WINCENTEGO WITOSA 3A / 9, 18-500 KOLNO (NIP: 2910236864).
                            </li>
                            <li>Adres kontaktowy poczty elektronicznej operatora: kontakt@narodowyprogramoddluzen.pl</li>
                            <li>
                                Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.
                            </li>
                            <li>
                                Serwis wykorzystuje dane osobowe w następujących celach:
                                <ul>
                                    <li>Obsługa zapytań przez formularz</li>
                                    <li>Realizacja zamówionych usług</li>
                                    <li>Prezentacja oferty lub informacji</li>
                                </ul>
                            </li>
                            <li>
                                Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:
                                <ol>
                                    <li>Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.</li>
                                    <li>Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. &bdquo;ciasteczka&rdquo;).</li>
                                </ol>
                            </li>
                        </ol>

                        <h2>2. Wybrane metody ochrony danych stosowane przez Operatora</h2>
                        <ol>
                            <li>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.</li>
                            <li>Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie posiadający Operator klucz może je odczytać. Dzięki temu dane są chronione na wypadek wykradzenia bazy danych z serwera.</li>
                            <li>Operator okresowo zmienia swoje hasła administracyjne.</li>
                            <li>W celu minimalizacji ryzyka nieuprawnionego dostępu od danych, Operator stosuje hasła złożone, zawierające małe i wielkie litery, cyfry oraz znaki specjalne, nie krótsze niż 8 znaków.</li>
                            <li>Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co w szczególności oznacza regularne aktualizacje komponentów programistycznych.</li>
                            <li>W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.</li>
                        </ol>

                        <h2>3. Hosting</h2>
                        <ol>
                            <li>Serwis jest hostowany (technicznie utrzymywany) na serwerze operatora: vercel</li>
                            <li>
                                Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:
                                <ul>
                                    <li>zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),</li>
                                    <li>czas nadejścia zapytania,</li>
                                    <li>czas wysłania odpowiedzi,</li>
                                    <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                                    <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                                    <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,</li>
                                    <li>informacje o przeglądarce użytkownika,</li>
                                    <li>informacje o adresie IP,</li>
                                    <li>informacje diagnostyczne związane z procesem samodzielnego zamawiania usług poprzez rejestratory na stronie,</li>
                                    <li>informacje związane z obsługą poczty elektronicznej kierowanej do Operatora oraz wysyłanej przez Operatora.</li>
                                </ul>
                            </li>
                        </ol>

                        <h2>4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</h2>
                        <ol>
                            <li>
                                W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:
                                <ul>
                                    <li>kancelarie prawne i windykatorzy</li>
                                    <li>upoważnieni pracownicy i współpracownicy, którzy korzystają z danych w celu realizacji celu działania strony</li>
                                    <li>firmy, świadczące usługi marketingu na rzecz Administratora</li>
                                </ul>
                            </li>
                            <li>Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.</li>
                            <li>
                                Przysługuje Ci prawo żądania od Administratora:
                                <ul>
                                    <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                                    <li>ich sprostowania,</li>
                                    <li>usunięcia,</li>
                                    <li>ograniczenia przetwarzania,</li>
                                    <li>oraz przenoszenia danych.</li>
                                </ul>
                            </li>
                            <li>Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.3 c) wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.</li>
                            <li>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</li>
                            <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</li>
                            <li>W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.</li>
                            <li>Dane osobowe są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że przesyłamy je poza teren Unii Europejskiej.</li>
                        </ol>

                        <h2>5. Informacje w formularzach</h2>
                        <ol>
                            <li>Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.</li>
                            <li>Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).</li>
                            <li>Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej formularz.</li>
                            <li>Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.</li>
                        </ol>

                        <h2>6. Logi Administratora</h2>
                        <ol>
                            <li>Informacje o zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.</li>
                        </ol>

                        <h2>7. Istotne techniki marketingowe</h2>
                        <ol>
                            <li>Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika. W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: https://www.google.com/ads/preferences/</li>
                            <li>Operator korzysta z piksela Facebooka. Ta technologia powoduje, że serwis Facebook (Facebook Inc. z siedzibą w USA) wie, że dana osoba w nim zarejestrowana korzysta z Serwisu. Bazuje w tym wypadku na danych, wobec których sam jest administratorem, Operator nie przekazuje od siebie żadnych dodatkowych danych osobowych serwisowi Facebook. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika.</li>
                            <li>Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie, co może dawać złudzenie, że dane osobowe użytkownika są wykorzystywane do jego śledzenia, jednak w praktyce nie dochodzi do przekazania żadnych danych osobowych od Operatora do operatorom reklam. Technologicznym warunkiem takich działań jest włączona obsługa plików cookie.</li>
                            <li>Operator stosuje rozwiązanie automatyzujące działanie Serwisu w odniesieniu do użytkowników, np. mogące przesłać maila do użytkownika po odwiedzeniu konkretnej podstrony, o ile wyraził on zgodę na otrzymywanie korespondencji handlowej od Operatora.</li>
                            <li>Operator może stosować profilowanie w rozumieniu przepisów o ochronie danych osobowych.</li>
                        </ol>

                        <h2>8. Informacja o plikach cookies</h2>
                        <ol>
                            <li>Serwis korzysta z plików cookies.</li>
                            <li>Pliki cookies (tzw. &bdquo;ciasteczka&rdquo;) stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</li>
                            <li>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</li>
                            <li>
                                Pliki cookies wykorzystywane są w następujących celach:
                                <ol>
                                    <li>utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                                    <li>realizacji celów określonych powyżej w części &bdquo;Istotne techniki marketingowe&rdquo;;</li>
                                </ol>
                            </li>
                            <li>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: &bdquo;sesyjne&rdquo; (session cookies) oraz &bdquo;stałe&rdquo; (persistent cookies). Cookies &bdquo;sesyjne&rdquo; są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). &bdquo;Stałe&rdquo; pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</li>
                            <li>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies. Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</li>
                            <li>Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</li>
                            <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA), Twitter (Twitter Inc. z siedzibą w USA).</li>
                        </ol>

                        <h2>9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</h2>
                        <ol>
                            <li>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www.</li>
                            <li>
                                W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:
                                <ul>
                                    <li><a href="https://support.microsoft.com/pl-pl/help/10607/microsoft-edge-view-delete-browser-history" target="_blank" rel="noopener noreferrer">Edge</a></li>
                                    <li><a href="https://support.microsoft.com/pl-pl/help/278835/how-to-delete-cookie-files-in-internet-explorer" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
                                    <li><a href="http://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                                    <li><a href="http://support.apple.com/kb/PH5042" target="_blank" rel="noopener noreferrer">Safari</a></li>
                                    <li><a href="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                                    <li><a href="http://help.opera.com/Windows/12.10/pl/cookies.html" target="_blank" rel="noopener noreferrer">Opera</a></li>
                                </ul>
                                <p className="mt-4 font-semibold">Urządzenia mobilne:</p>
                                <ul>
                                    <li><a href="http://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647" target="_blank" rel="noopener noreferrer">Android</a></li>
                                    <li><a href="http://support.apple.com/kb/HT1677?viewlocale=pl_PL" target="_blank" rel="noopener noreferrer">Safari (iOS)</a></li>
                                    <li><a href="http://www.windowsphone.com/pl-pl/how-to/wp7/web/changing-privacy-and-other-browser-settings" target="_blank" rel="noopener noreferrer">Windows Phone</a></li>
                                </ul>
                            </li>
                        </ol>

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
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
