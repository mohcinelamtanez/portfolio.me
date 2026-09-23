"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dateLocales, defaultLocale, isLocale, localeStorageKey, type Locale } from "@/i18n/config";
import { en, type Dictionary } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { getContent, type Content } from "@/i18n/content";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI copy for the active locale. */
  t: Dictionary;
  /** Long-form content (projects, experience…) for the active locale. */
  content: Content;
  /** Formats an ISO date string for the active locale. */
  formatDate: (date: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The server always renders the default locale; a saved preference is
  // applied right after hydration to keep server and client markup in sync.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(localeStorageKey);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      // Storage unavailable (private mode, blocked cookies): keep the default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(localeStorageKey, next);
    } catch {
      // Preference simply won't persist.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      content: getContent(locale),
      formatDate: (date: string) =>
        new Date(date).toLocaleDateString(dateLocales[locale], {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useI18n must be used within a LanguageProvider");
  return context;
}
