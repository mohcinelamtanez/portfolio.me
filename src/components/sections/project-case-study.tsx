"use client";

import { ExternalLink, FileText, Github } from "lucide-react";
import type { ProjectCaseStudy } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectCaseStudyBlock({ project }: { project: ProjectCaseStudy }) {
  return (
    <article id={project.slug} className="card-surface overflow-hidden scroll-mt-24">
      <div className="flex flex-col gap-6 border-b border-border p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{project.tagline}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a href={project.github} target="_blank" rel="noreferrer">
                <Github className="h-3.5 w-3.5" /> Source
              </a>
            </Button>
            {project.apiDocsUrl ? (
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <a href={project.apiDocsUrl} target="_blank" rel="noreferrer">
                  <FileText className="h-3.5 w-3.5" /> API docs
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <p className="max-w-3xl text-sm leading-relaxed text-foreground/90">{project.problem}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
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

      <div className="p-6 sm:p-8">
        <Tabs defaultValue="architecture">
          <TabsList>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="decisions">Decisions</TabsTrigger>
            <TabsTrigger value="testing">Testing &amp; Deploy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture">
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted">
              {project.architectureSummary}
            </p>
            <pre className="overflow-x-auto rounded-md border border-border bg-background p-4 font-mono text-[11px] leading-relaxed text-foreground/80">
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
                  Testing strategy
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {project.testing.map((t) => (
                    <li key={t} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-success" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-mono text-2xs uppercase tracking-wide text-muted">
                  Deployment
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {project.deployment.map((t) => (
                    <li key={t} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <ul className="flex flex-col gap-2.5">
              {project.security.map((t) => (
                <li key={t} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </article>
  );
}
