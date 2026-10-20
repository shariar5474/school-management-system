/**
 * Internationalization (i18n) module
 * Uses zustand store for language state management
 * Provides useTranslation hook for consuming components
 */
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import bn, { type TranslationKeys } from './bn';
import en from './en';

type Locale = 'bn' | 'en';

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

/** Zustand store for language preference (persisted in localStorage) */
export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: 'bn',
      setLocale: (locale: Locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === 'bn' ? 'en' : 'bn' }),
    }),
    {
      name: 'school-i18n',
    }
  )
);

const translations: Record<Locale, TranslationKeys> = {
  bn,
  en: en as unknown as TranslationKeys,
};

/**
 * Hook for accessing translated strings
 * @returns object with `t` (translations object) and `locale` (current locale)
 */
export function useTranslation() {
  const { locale, setLocale, toggleLocale } = useI18nStore();
  const t = translations[locale];

  return {
    t,
    locale,
    setLocale,
    toggleLocale,
    isBengali: locale === 'bn',
  };
}
