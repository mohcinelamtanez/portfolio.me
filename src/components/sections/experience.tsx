"use client";

import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/i18n/language-provider";

export function Experience() {
  const { t, content } = useI18n();

  return (
    <section id="experience" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            description={t.experience.description}
          />
        </Reveal>

        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {content.education.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.06}>
              <div className="card-surface flex h-full items-start gap-4 p-5">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-medium text-foreground">{entry.program}</h3>
                  <p className="mt-0.5 text-sm text-muted">{entry.school}</p>
                  <p className="mt-1.5 font-mono text-2xs text-muted">
                    {entry.status} · {entry.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <ol className="relative flex flex-col gap-12 border-l border-border pl-8 sm:pl-10">
          {content.experience.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.06}>
              <li className="relative">
                <span
                  className="absolute -left-[41px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent sm:-left-[49px]"
                  aria-hidden="true"
                />

                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-medium text-foreground">
                    {entry.role} <span className="text-muted">· {entry.company}</span>
                  </h3>
                  <span className="font-mono text-2xs text-muted">
                    {entry.start} — {entry.end} · {entry.location}
                  </span>
                </div>

                {entry.summary ? (
                  <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted">{entry.summary}</p>
                ) : null}

                <ul className="mb-4 flex flex-col gap-2">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {entry.stack?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.stack.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
