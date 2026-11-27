'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { languageToLocale, translations, type Language, type TranslationKey } from '@/lib/i18n/translations';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: Language = 'en-GB';

interface LanguageContextValue {
  language: Language;
  /** BCP 47 locale for dates and numbers, e.g. "hu-HU". */
  locale: string;
  /** False until the saved language has been read on the client. */
  isLoaded: boolean;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// The saved language lives in localStorage; these let React subscribe to it.
const CHANGE_EVENT = 'planner:language';

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function readSavedLanguage(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved && saved in translations ? (saved as Language) : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // On the server and during hydration there is no saved language yet (null).
  const saved = useSyncExternalStore<Language | null>(subscribe, readSavedLanguage, () => null);
  const language = saved ?? DEFAULT_LANGUAGE;
  const isLoaded = saved !== null;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const t = useCallback((key: TranslationKey) => translations[language][key] ?? key, [language]);

  const value = useMemo(
    () => ({ language, locale: languageToLocale[language], isLoaded, setLanguage, t }),
    [language, isLoaded, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
