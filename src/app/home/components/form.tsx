"use client";
import { useState, useMemo } from 'react'; // NOWOŚĆ: import useMemo do walidacji
// Importowanie ikon
import { FaHome, FaTimes, FaBuilding, FaGavel, FaFileInvoiceDollar, FaUniversity, FaQuestionCircle, FaReceipt } from 'react-icons/fa';
import ToggleButtonGroup from "@/app/home/components/ToggleBtn";
import RangeSlider from "@/app/home/components/Range";
import CounterCard from "@/app/home/components/Counter";
// Importowanie komponentów


// ZMIANA: Rozszerzona definicja stanu formularza
interface DetailedFormData {
    posiadaNieruchomosc: string;
    chronicPrzedZajeciem: string;
    sumaDlugow: number;
    ileMiesiecznie: number;
    czyObecnieSplacasz: string;
    rodzajeZadluzen: { [key: string]: number };
    pilnoscSprawy: number;
    // NOWOŚĆ: Pola dla kroku 2
    numerTelefonu: string;
    email: string;
    zgodaPolityka: boolean;
}

// Typ dla statusu wysyłki
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function SzczegolowyFormularz() {
    // NOWOŚĆ: Stan do zarządzania krokami formularza
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<DetailedFormData>({
        posiadaNieruchomosc: '',
        chronicPrzedZajeciem: '',
        sumaDlugow: 100000,
        ileMiesiecznie: 500,
        czyObecnieSplacasz: 'Nie',
        rodzajeZadluzen: {
            konsumenckie: 0, hipoteczne: 0, chwilowki: 0,
            alimenty: 0, zus: 0, inne: 0,
        },
        pilnoscSprawy: 7,
        // NOWOŚĆ: Inicjalizacja pól kroku 2
        numerTelefonu: '',
        email: '',
        zgodaPolityka: false,
    });

    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

    // Istniejące funkcje obsługi (bez zmian)
    const handleToggleChange = (name: keyof DetailedFormData, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: Number(value) }));
    };
    const handleCounterChange = (name: string, type: 'inc' | 'dec') => {
        setFormData(prev => {
            const currentCount = prev.rodzajeZadluzen[name];
            const newCount = type === 'inc' ? currentCount + 1 : Math.max(0, currentCount - 1);
            return {
                ...prev,
                rodzajeZadluzen: { ...prev.rodzajeZadluzen, [name]: newCount }
            };
        });
    };

    // NOWOŚĆ: Funkcje obsługi dla nowych pól
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    // Funkcja wysyłki (bez zmian, bo wysyła cały stan `formData`)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        try {
            const response = await fetch('https://formspree.io/f/xnnoeejy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmissionStatus('success');
            } else {
                throw new Error('Błąd podczas wysyłania formularza.');
            }
        } catch (error) {
            console.error(error);
            setSubmissionStatus('error');
        }
    };

    // NOWOŚĆ: Walidacja, aby aktywować przyciski
    const isStep1Valid = useMemo(() => {
        return formData.posiadaNieruchomosc !== '';
    }, [formData.posiadaNieruchomosc]);

    const isStep2Valid = useMemo(() => {
        // prosta walidacja emaila
        const emailRegex = /\S+@\S+\.\S+/;
        return formData.numerTelefonu.trim().length >= 9 && emailRegex.test(formData.email) && formData.zgodaPolityka;
    }, [formData.numerTelefonu, formData.email, formData.zgodaPolityka]);


    const formatCurrency = (value: number) => `${value.toLocaleString('pl-PL')} zł`;

    const opcjeNieruchomosc = [
        { value: 'Tak', label: 'Tak, mieszkam w niej', icon: FaHome },
        { value: 'Nie', label: 'Nie Posiadam', icon: FaTimes },
    ];
    const opcjeSplaty = [
        { value: 'Tak', label: 'Tak' },
        { value: 'Czesciowo', label: 'Częściowo' },
        { value: 'Nie', label: 'Nie' },
    ];

    // Widoki sukcesu i błędu (bez zmian)
    if (submissionStatus === 'success') { /* ... bez zmian ... */
        return (
            <div className="w-full max-w-2xl mx-auto p-8 text-center bg-white rounded-xl shadow-lg min-h-[80vh] content-center">
                <h3 className="text-3xl font-bold text-red-500">Dziękujemy!</h3>
                <p className="mt-4 text-slate-700 text-lg">Twoje zgłoszenie zostało pomyślnie wysłane. Wkrótce się z Tobą skontaktujemy.</p>
            </div>
        );
    }
    if (submissionStatus === 'error') { /* ... bez zmian ... */
        return (
            <div className="w-full max-w-2xl mx-auto p-8 text-center bg-white rounded-xl shadow-lg">
                <h3 className="text-3xl font-bold text-red-500">Coś poszło nie tak...</h3>
                <p className="mt-4 text-slate-700 text-lg">Wystąpił błąd podczas wysyłania formularza. Prosimy, spróbuj ponownie.</p>
                <button onClick={() => { setSubmissionStatus('idle'); setStep(1); }} className="mt-8 px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors">
                    Spróbuj jeszcze raz
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-4 sm:p-8 text-center rounded-xl space-y-12 shadow-lg rounded-2xl my-9 bg-white">

            {/* ZMIANA: Renderowanie warunkowe kroków */}
            {step === 1 && (
                <>
                    {/* --- KROK 1 --- */}
                    {/* Pytanie 1 */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">Opowiedz nam o sobie</h3>
                        <p className="text-sm text-slate-500 pb-4">Czy posiadasz nieruchomość?</p>
                        <ToggleButtonGroup options={opcjeNieruchomosc} selectedValue={formData.posiadaNieruchomosc} onChange={(v) => handleToggleChange('posiadaNieruchomosc', v)} />
                    </div>
                    {/* Pytanie 3 */}
                    <div className="space-y-2 text-slate-900">
                        <RangeSlider label="Suma twoich długów" min={10000} max={1000000} step={1000} value={formData.sumaDlugow} name="sumaDlugow" onChange={handleSliderChange} formatLabel={formatCurrency} />
                    </div>
                    {/* Pytanie 5 */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-slate-900">Czy obecnie spłacasz jakieś długi?</h3>
                        <ToggleButtonGroup options={opcjeSplaty} selectedValue={formData.czyObecnieSplacasz} onChange={(v) => handleToggleChange('czyObecnieSplacasz', v)} />
                    </div>
                    {/* Pytanie 6 */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-slate-900">Jakie rodzaje zadłużeń posiadasz?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CounterCard title="Kredyty konsumenckie" description="Kredyty gotówkowe, karty, limity" icon={FaFileInvoiceDollar} count={formData.rodzajeZadluzen.konsumenckie} onIncrement={() => handleCounterChange('konsumenckie', 'inc')} onDecrement={() => handleCounterChange('konsumenckie', 'dec')} />
                            <CounterCard title="Kredyt hipoteczny" description="Kredyty zabezpieczone na nieruchomości" icon={FaUniversity} count={formData.rodzajeZadluzen.hipoteczne} onIncrement={() => handleCounterChange('hipoteczne', 'inc')} onDecrement={() => handleCounterChange('hipoteczne', 'dec')} />
                            <CounterCard title="Chwilówki" description="Pożyczki krótkoterminowe, parabanki" icon={FaReceipt} count={formData.rodzajeZadluzen.chwilowki} onIncrement={() => handleCounterChange('chwilowki', 'inc')} onDecrement={() => handleCounterChange('chwilowki', 'dec')} />
                            <CounterCard title="Alimenty" description="Zaległe alimenty, fundusz alimentacyjny" icon={FaGavel} count={formData.rodzajeZadluzen.alimenty} onIncrement={() => handleCounterChange('alimenty', 'inc')} onDecrement={() => handleCounterChange('alimenty', 'dec')} />
                            <CounterCard title="ZUS / US" description="Zaległości podatkowe, składki ZUS" icon={FaBuilding} count={formData.rodzajeZadluzen.zus} onIncrement={() => handleCounterChange('zus', 'inc')} onDecrement={() => handleCounterChange('zus', 'dec')} />
                            <CounterCard title="Inne" description="Czynsz, polisy, telekomunikacja" icon={FaQuestionCircle} count={formData.rodzajeZadluzen.inne} onIncrement={() => handleCounterChange('inne', 'inc')} onDecrement={() => handleCounterChange('inne', 'dec')} />
                        </div>
                    </div>
                    {/* Pytanie 7 */}
                    <div className="space-y-2 pt-8 text-slate-900">
                        <RangeSlider label="Jak pilna jest twoja sprawa?" min={1} max={10} step={1} value={formData.pilnoscSprawy} name="pilnoscSprawy" onChange={handleSliderChange} formatLabel={(v) => v === 1 ? "Mam czas" : v === 10 ? "Zaraz komornik" : v.toString()} />
                    </div>
                    {/* ZMIANA: Przycisk "Dalej" */}
                    <div className="text-center pt-8">
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!isStep1Valid}
                            className="px-12 py-4 bg-red-700 font-bold text-white text-xl rounded-lg hover:bg-red-800 transition-colors shadow-lg shadow-red-900/30 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            Dalej
                        </button>
                    </div>
                </>
            )}

            {/* NOWOŚĆ: Krok 2 */}
            {step === 2 && (
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-slate-900">Krok 2/2: Prawie gotowe!</h3>
                    <p className="text-slate-600">Potrzebujemy Twoich danych kontaktowych, aby przedstawić Ci spersonalizowaną ofertę ugody.</p>

                    {/* Pole Email */}
                    <div className="text-left">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Adres e-mail</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="twoj@email.com" required />
                    </div>

                    {/* Pole Numer Telefonu */}
                    <div className="text-left">
                        <label htmlFor="numerTelefonu" className="block text-sm font-medium text-slate-700 mb-1">Numer telefonu</label>
                        <input type="tel" name="numerTelefonu" id="numerTelefonu" value={formData.numerTelefonu} onChange={handleInputChange} className="block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" placeholder="123 456 789" required />
                    </div>

                    {/* Pole Zgoda Polityka Prywatności */}
                    <div className="flex items-start text-left">
                        <div className="flex items-center h-5">
                            <input id="zgodaPolityka" name="zgodaPolityka" type="checkbox" checked={formData.zgodaPolityka} onChange={handleCheckboxChange} className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" required />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="zgodaPolityka" className="font-medium text-gray-700">
                                Akceptuję <a href="/polityka-prywatnosci" target="_blank" className="text-red-600 hover:text-red-800 underline">politykę prywatności</a>.*
                            </label>
                        </div>
                    </div>

                    {/* Przyciski nawigacyjne i wysyłki */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-12 py-4 bg-slate-200 font-bold text-slate-800 text-xl rounded-lg hover:bg-slate-300 transition-colors w-full sm:w-auto"
                        >
                            Wróć
                        </button>
                        <button
                            type="submit"
                            disabled={!isStep2Valid || submissionStatus === 'submitting'}
                            className="px-12 py-4 bg-red-600 font-bold text-white text-xl rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/30 disabled:bg-slate-400 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                            {submissionStatus === 'submitting' ? 'Wysyłanie...' : 'Wyślij i czekaj na kontakt'}
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}