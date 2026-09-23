import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const approach = [
  {
    step: "01",
    title: "Understand the need",
    body: "Before choosing a framework, I figure out who will use the software, what they are trying to get done, and which rules the product has to respect: roles, workflows, edge cases.",
  },
  {
    step: "02",
    title: "Scope and design",
    body: "I decide which features matter for a first version and design just enough architecture to support them: the data model, the API contract, and where each business rule belongs.",
  },
  {
    step: "03",
    title: "Build end to end",
    body: "I connect every layer myself: React interfaces, Spring Boot or Django APIs, relational databases, and external services such as ML models, background jobs, or email.",
  },
  {
    step: "04",
    title: "Make it last",
    body: "Security, tests, and documentation are part of the product, not a final step. I keep solutions simple enough to understand and easy to change when the need evolves.",
  },
];

export function About() {
  return (
    <section id="about" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 00 — about"
            title="Product Engineer with a software engineering foundation"
            description="For me, product engineering means owning the path from a need to a working solution. I'm a 5th-year student at ISGA Casablanca, and I learn best by building complete products: understanding who they're for, choosing what to build first, and shipping every layer with care for security and maintainability. AI is part of how I work, inside products when it solves a real problem, and in my daily workflow to prototype, explore, and debug faster."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-surface h-full p-6">
                <span className="mb-3 block font-mono text-2xs text-accent">{p.step}</span>
                <h3 className="mb-2 text-sm font-medium text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
