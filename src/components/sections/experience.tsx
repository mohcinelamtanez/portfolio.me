import { experience } from "@/lib/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section id="experience" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 01 — experience"
            title="Where I've worked"
            description="Chronological record — each role scoped by what shipped and what it moved, not job-title inflation."
          />
        </Reveal>

        <ol className="relative flex flex-col gap-12 border-l border-border pl-8 sm:pl-10">
          {experience.map((entry, i) => (
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

                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted">{entry.summary}</p>

                <ul className="mb-4 flex flex-col gap-2">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {entry.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
