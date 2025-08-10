export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';

export const i18nConfig = {
  locales,
  defaultLocale,
};
