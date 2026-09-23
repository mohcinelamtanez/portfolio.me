"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/language-provider";

export function NotFoundContent() {
  const { t } = useI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="font-mono text-2xs uppercase tracking-widest text-accent">{t.notFound.eyebrow}</span>
      <h1 className="font-mono text-2xl text-foreground">{t.notFound.title}</h1>
      <p className="max-w-sm text-sm text-muted">{t.notFound.body}</p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
      >
        {t.notFound.home}
      </Link>
    </main>
  );
}
