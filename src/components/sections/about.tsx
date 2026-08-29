import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    title: "Keep it simple",
    body: "I prefer simple and well-understood solutions over unnecessary complexity. Good architecture should make a system easier to understand, maintain, and evolve.",
  },
  {
    title: "Design for maintainability",
    body: "I care about clean code, clear responsibilities, and well-defined interfaces. I try to build systems that remain easy to modify as requirements change.",
  },
  {
    title: "Learn, test, improve",
    body: "I believe good software comes from continuous improvement. I use testing, code reviews, debugging, and feedback to understand problems and progressively build better solutions.",
  },
];

export function About() {
  return (
    <section id="about" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 00 — about"
            title="Java Backend Engineer building reliable and maintainable backend systems"
            description="I build backend applications with Java and Spring Boot, focusing on clean architecture, REST APIs, databases, security, and maintainable software. I enjoy turning complex requirements into simple, reliable solutions."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-surface h-full p-6">
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
