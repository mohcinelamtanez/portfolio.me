"use client";

import { useId, useState } from "react";
import { ChevronDown, ExternalLink, FileText, Github } from "lucide-react";
import type { ProjectCaseStudy } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

export function ProjectCaseStudyBlock({ project }: { project: ProjectCaseStudy }) {
  const { t } = useI18n();
  // Details (features + engineering tabs) stay collapsed so the three projects can be scanned quickly.
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = useId();

  return (
    <article id={project.slug} className="card-surface overflow-hidden scroll-mt-24">
      <div className="flex flex-col gap-6 border-b border-border p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
              {project.collaboration ? <Badge>{project.collaboration}</Badge> : null}
            </div>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{project.tagline}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a href={project.github} target="_blank" rel="noreferrer">
                <Github className="h-3.5 w-3.5" /> {t.projects.source}
              </a>
            </Button>
            {project.apiDocsUrl ? (
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <a href={project.apiDocsUrl} target="_blank" rel="noreferrer">
                  <FileText className="h-3.5 w-3.5" /> {t.projects.apiDocs}
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" /> {t.projects.live}
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-mono text-2xs uppercase tracking-wide text-muted">
              {t.projects.need}
            </h4>
            <p className="text-sm leading-relaxed text-foreground/90">{project.problem}</p>
          </div>
          <div>
            <h4 className="mb-2 font-mono text-2xs uppercase tracking-wide text-muted">
              {t.projects.solution}
            </h4>
            <p className="text-sm leading-relaxed text-foreground/90">{project.solution}</p>
          </div>
        </div>

        <h4 className="-mb-3 font-mono text-2xs uppercase tracking-wide text-muted">
          {t.projects.builtWith}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>

        <div className="border-l-2 border-accent pl-4">
          <h4 className="mb-1.5 font-mono text-2xs uppercase tracking-wide text-muted">
            {t.projects.result}
          </h4>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground">{project.outcome}</p>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-2xs uppercase tracking-wide text-muted">{m.label}</dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-6 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => setDetailsOpen((open) => !open)}
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          className="flex items-center gap-2 font-mono text-2xs uppercase tracking-wide text-muted transition-colors hover:text-accent"
        >
          {detailsOpen ? t.projects.hideDetails : t.projects.showDetails}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform duration-200", detailsOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        {detailsOpen ? (
          <Tabs id={detailsId} defaultValue="features" className="pb-4 pt-5">
            <TabsList>
              <TabsTrigger value="features">{t.projects.tabs.features}</TabsTrigger>
              <TabsTrigger value="architecture">{t.projects.tabs.architecture}</TabsTrigger>
              <TabsTrigger value="decisions">{t.projects.tabs.decisions}</TabsTrigger>
              <TabsTrigger value="testing">{t.projects.tabs.testing}</TabsTrigger>
              <TabsTrigger value="security">{t.projects.tabs.security}</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <div className="grid gap-3 sm:grid-cols-2">
                {project.features.map((group) => (
                  <div key={group.area} className="rounded-md border border-border p-4">
                    <h5 className="mb-2 text-sm font-medium text-foreground">{group.area}</h5>
                    <ul className="flex flex-col gap-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="architecture">
              <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted">
                {project.architectureSummary}
              </p>
              <pre className="overflow-x-auto rounded-md border border-border bg-background p-4 font-diagram text-[11px] leading-relaxed text-foreground/80">
                <code>{project.architectureDiagram.join("\n")}</code>
              </pre>
            </TabsContent>

            <TabsContent value="decisions">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.decisions.map((d) => (
                  <div key={d.title} className="rounded-md border border-border p-4">
                    <h4 className="mb-1.5 text-sm font-medium text-foreground">{d.title}</h4>
                    <p className="text-sm leading-relaxed text-muted">{d.detail}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testing">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-mono text-2xs uppercase tracking-wide text-muted">
                    {t.projects.testingStrategy}
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {project.testing.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-mono text-2xs uppercase tracking-wide text-muted">
                    {t.projects.deployment}
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {project.deployment.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <ul className="flex flex-col gap-2.5">
                {project.security.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        ) : null}
      </div>
    </article>
  );
}
