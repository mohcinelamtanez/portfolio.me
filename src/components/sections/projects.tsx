"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCaseStudyBlock } from "@/components/sections/project-case-study";
import { useI18n } from "@/i18n/language-provider";

export function Projects() {
  const { t, content } = useI18n();

  return (
    <section id="projects" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          {content.projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCaseStudyBlock project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
