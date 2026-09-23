"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/language-provider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="hairline border-border">
      <div className="container-narrow flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-sm text-foreground">
            {siteConfig.name} <span className="text-muted">/ {t.hero.role}</span>
          </p>
          <p className="text-2xs font-mono text-muted">
            {t.footer.builtWith}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t.nav.githubProfile}
            className="text-muted transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t.nav.linkedinProfile}
            className="text-muted transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Twitter / X"
            className="text-muted transition-colors hover:text-foreground"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="hairline border-border">
        <div className="container-narrow flex flex-col gap-2 py-4 text-2xs font-mono text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.rights(new Date().getFullYear(), siteConfig.name)}</span>
          <span>
            {t.footer.status} <span className="text-success">{t.footer.operational}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
