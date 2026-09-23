"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <nav className="container-narrow flex h-16 items-center justify-between" aria-label="Primary">
        <Link
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
          aria-label={`${siteConfig.name} — home`}
        >
          lm<span className="text-accent">.</span>dev
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
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
          <Button
            variant="outline"
            size="sm"
            className="gap-2 font-mono"
            onClick={onOpenTerminal}
            aria-label="Open command palette"
          >
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>⌘L</span>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="GitHub profile">
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer noopener">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="LinkedIn profile">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer noopener">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <button
          className="p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
