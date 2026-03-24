export interface ThemeClasses {
    primary: string;
    primaryHover: string;
    bgLight: string;
    ring: string;
    textPrimary: string;
    borderPrimary: string;
}

export const getThemeClasses = (scheme: 'red' | 'green' | 'yellow' = 'red'): ThemeClasses => {
    switch (scheme) {
        case 'green':
            return {
                primary: 'bg-emerald-600',
                primaryHover: 'hover:bg-emerald-700',
                bgLight: 'bg-emerald-50',
                ring: 'ring-emerald-500',
                textPrimary: 'text-emerald-700',
                borderPrimary: 'border-emerald-500'
            };
        case 'yellow':
            return {
                primary: 'bg-yellow-500',
                primaryHover: 'hover:bg-yellow-400',
                bgLight: 'bg-yellow-50',
                ring: 'ring-yellow-500',
                textPrimary: 'text-yellow-500',
                borderPrimary: 'border-yellow-500'
            };
        case 'red':
        default:
            return {
                primary: 'bg-red-700',
                primaryHover: 'hover:bg-red-800',
                bgLight: 'bg-red-50',
                ring: 'ring-red-500',
                textPrimary: 'text-red-700',
                borderPrimary: 'border-red-500'
            };
    }
};
