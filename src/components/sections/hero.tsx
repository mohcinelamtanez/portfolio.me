"use client";

import { ArrowRight, Github, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/language-provider";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="container-narrow relative grid gap-12 pb-24 pt-40 sm:pt-48 md:grid-cols-[1fr_auto] md:items-start">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Badge variant="accent" className="w-fit gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {t.hero.availability}
            </Badge>
            <p className="font-mono text-sm text-muted">
              <span className="text-foreground">{t.hero.role}</span>
              <span className="text-accent"> · </span>
              {t.hero.roleDetail}
            </p>
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
            {t.hero.tagline}
          </h1>

          <p className="max-w-xl text-balance text-[15px] leading-relaxed text-muted sm:text-base">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="gap-2">
              <a href="#projects">
                {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
                {t.hero.ctaResume}
              </a>
            </Button>
          </div>

          <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-mono text-2xs text-muted">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <dt className="sr-only">{t.hero.locationLabel}</dt>
              <dd>{t.hero.location}</dd>
            </div>
            <Link
              href={siteConfig.social.github}
              target="_blank"
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              <span>github.com/{siteConfig.social.githubUsername}</span>
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>{t.hero.linkedin}</span>
            </Link>
          </dl>
        </div>

        <div className="relative mx-auto w-44 shrink-0 sm:w-56 md:mx-0 md:mt-6 md:w-64 lg:w-72 xl:w-80">
          <div
            className="pointer-events-none absolute -inset-8 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative aspect-square rounded-full bg-gradient-to-br from-accent via-accent/20 to-accent/70 p-[3px] shadow-2xl shadow-black/50">
            <div className="h-full w-full rounded-full bg-background p-[5px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
                <Image
                  src="/profile.jpg"
                  alt={siteConfig.name}
                  fill
                  sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 224px, 176px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
