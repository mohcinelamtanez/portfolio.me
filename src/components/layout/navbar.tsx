"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useI18n } from "@/i18n/language-provider";

const navSections = ["about", "projects", "skills", "experience", "contact"] as const;

export function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { t } = useI18n();
  const navItems = navSections.map((id) => ({ href: `#${id}`, label: t.nav[id] }));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The command palette opens with Cmd+K on Apple devices and Ctrl+K elsewhere.
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(navigator.userAgent)) setShortcut("⌘K");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav className="container-narrow flex h-16 items-center justify-between gap-4" aria-label={t.nav.primary}>
        <Link
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
          aria-label={t.nav.home}
        >
          lm<span className="text-accent">.</span>dev
        </Link>

        <ul className="hidden items-center gap-5 md:flex lg:gap-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button
            variant="outline"
            size="sm"
            className="gap-2 font-mono"
            onClick={onOpenTerminal}
            aria-label={t.nav.openTerminal}
          >
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>{shortcut}</span>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label={t.nav.githubProfile}>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer noopener">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label={t.nav.linkedinProfile}>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer noopener">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="container-narrow flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-md px-2 py-2.5 text-sm text-muted hover:bg-surface-hover hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
