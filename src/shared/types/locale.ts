export type Locale = keyof typeof LANGUAGES;
export interface LocalizationProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export const LANGUAGES = {
    uk: "uk",
    en: "en",
} as const;

export const locales: Locale[] = Object.values(LANGUAGES);
