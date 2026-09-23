"use client";

import { locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

// Each option is labelled in its own language so it stays recognisable
// whichever locale is active.
const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn(
        "inline-flex h-9 items-center rounded-md border border-border p-0.5 font-mono text-2xs",
        className
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            title={localeNames[l]}
            aria-label={localeNames[l]}
            aria-pressed={active}
            onClick={() => setLocale(l)}
            className={cn(
              "h-full rounded-[5px] px-2 uppercase tracking-wide transition-colors",
              active ? "bg-surface-hover text-foreground" : "text-muted hover:text-foreground"
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
