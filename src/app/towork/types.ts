export type ClientType = 'osoba_fizyczna' | 'jdg' | 'rolnik' | 'sp_zoo' | 'sp_osobowa';
export type ColorScheme = 'red' | 'green' | 'yellow'; // Added yellow as well for backward compatibility/default

export interface AnkietaFormData {
    clientType: ClientType | null;

    // Krok 1: Dane identyfikacyjne
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    voivodeship: string;

    city?: string; // dla osoby fizycznej
    companyCity?: string; // oddzielne dla jdg/spółek by uniknąć kopiowania
    companyName?: string;
    nip?: string;
    krs?: string;
    activityStartDate?: string;
    farmLocation?: string;
    farmForm?: 'rolnik_indywidualny' | 'dzialalnosc_rolnicza_i_gospodarcza';

    // Krok 2: Sytuacja majątkowa
    status?: string;

    privateAssets?: string[];
    estimatedPrivateAssetsValue?: string;
    otherAssetPrivateDetails?: string;

    firmAssets?: string[];
    estimatedFirmAssetsValue?: string;
    otherAssetFirmDetails?: string;

    hasBailiff?: 'tak' | 'nie';
    totalDebtAmount?: string;
    farmArea?: string;

    // Krok 3: Zadłużenie i szczegóły zobowiązań
    debtTypes?: string[];
    otherDebtDetails?: string; // Nowe pole dla szczegółów innych długów
    linkedToCompany?: 'tak' | 'nie';
    linkedCompanyKrs?: string; // Zmiana z NIP na KRS
    monthlyIncome?: string;
    maritalSeparation?: 'nie' | 'tak';
    maritalSeparationDate?: string;
    dependentsDescription?: string;
    sharesInCompanies?: 'tak' | 'nie';
    sharesDetails?: string;
    arimrSubsidies?: 'tak' | 'nie';
    arimrSubsidiesAmount?: string;
    arimrSubsidiesDetails?: string;
    krsReportsFiled?: 'tak' | 'nie' | 'nie_wiem';
    privateGuarantees?: 'tak' | 'nie';
    financialResult?: 'strata' | 'niewielki_zysk' | 'stabilny_zysk';
    additionalInfo?: string;

    submissionId?: string;
}