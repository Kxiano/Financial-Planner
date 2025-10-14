// lib/hooks/useLanguage.ts

'use client';

import { useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n/translations';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('pt-BR');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && translations[saved]) {
        setLanguageState(saved);
      }
      setIsLoaded(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    setTimeout(() => {
    window.location.reload();
  }, 100);
  };

  const t = (key: keyof typeof translations['pt-BR']): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t, isLoaded };
}
