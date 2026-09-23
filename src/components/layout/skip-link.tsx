"use client";

import { useI18n } from "@/i18n/language-provider";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
    >
      {t.common.skipToContent}
    </a>
  );
}
