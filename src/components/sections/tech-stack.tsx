"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/i18n/language-provider";

export function TechStack() {
  const { t, content } = useI18n();

  return (
    <section id="skills" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            description={t.skills.description}
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {content.techStack.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05}>
              <div className="h-full bg-surface p-6">
                <h3 className="mb-4 font-mono text-2xs uppercase tracking-widest text-muted">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-foreground">{item.name}</span>
                      {item.note ? (
                        <span className="font-mono text-2xs text-muted">{item.note}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
