import { createContext, useState, useCallback, useEffect, useMemo, use, type ReactNode } from 'react';
import type { Language, Direction } from '@/types';
import { translations } from '@/data/translations';
import type { TranslationKey } from '@/data/translations';

interface I18nContextType {
  lang: Language;
  dir: Direction;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('hibiscus-lang');
    if (stored === 'ar' || stored === 'fr') return stored;
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ar') ? 'ar' : 'fr';
  });

  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem('hibiscus-lang', lang);
  }, [lang, dir]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  const ctxValue = useMemo(() => ({ lang, dir, toggleLanguage, t }), [lang, dir, toggleLanguage, t]);

  return (
    <I18nContext.Provider value={ctxValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = use(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
