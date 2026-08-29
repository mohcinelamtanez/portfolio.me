import { ArrowRight, Github, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="container-narrow relative flex flex-col gap-8 pb-24 pt-40 sm:pt-48">
        <Badge variant="accent" className="w-fit gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {siteConfig.availability}
        </Badge>

        <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          {siteConfig.tagline}
        </h1>

        <p className="max-w-xl text-balance text-[15px] leading-relaxed text-muted sm:text-base">
          {siteConfig.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg" className="gap-2">
            <a href="#projects">
              View engineering work <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
              Download résumé
            </a>
          </Button>
        </div>

        <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-mono text-2xs text-muted">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <dt className="sr-only">Location</dt>
            <dd>{siteConfig.location}</dd>
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
            <span>linkedin</span>
          </Link>
        </dl>
      </div>
    </section>
  );
}
