import { BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/data/certifications";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Certifications() {
  return (
    <section id="certifications" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading eyebrow="// 05 — certifications" title="Certifications" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.04}>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="card-surface flex items-start gap-4 p-5 transition-colors hover:border-accent/40"
              >
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-medium text-foreground">{cert.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {cert.issuer} · {cert.date}
                  </p>
                  {cert.id ? (
                    <p className="mt-1.5 font-mono text-2xs text-muted">ID: {cert.id}</p>
                  ) : null}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
