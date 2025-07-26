'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { getTranslations, type Language } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  isHydrated: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Use useMemo to ensure translations are recalculated when language changes
  const t = useMemo(() => getTranslations(language), [language]);
  
  // Ensure hydration consistency
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage, isHydrated } = useI18n();
  
  // Don't render until hydrated to prevent SSR/client mismatch
  if (!isHydrated) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => setLanguage('zh')}
        className={`px-2 py-1 text-sm rounded ${language === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-sm rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        English
      </button>
    </div>
  );
} 