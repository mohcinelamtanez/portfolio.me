export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeStorageKey = "portfolio-locale";

/** BCP 47 tags used for date formatting. */
export const dateLocales: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-FR",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
