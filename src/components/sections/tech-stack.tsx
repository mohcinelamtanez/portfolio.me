import { techStack } from "@/lib/data/tech-stack";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function TechStack() {
  return (
    <section id="skills" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 02 — skills"
            title="What I bring to a product"
            description="Grouped by capability, not ranked by proficiency. Everything listed is backed by a project or a role on this page, and what I'm still learning is marked as such."
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, i) => (
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
