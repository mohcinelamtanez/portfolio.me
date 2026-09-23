import { projects } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCaseStudyBlock } from "@/components/sections/project-case-study";

export function Projects() {
  return (
    <section id="projects" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 01 — projects"
            title="Products I've built"
            description="Each project starts with the need it answers, then what was built and why. The engineering details (architecture, decisions, testing, and security) are one tab away."
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCaseStudyBlock project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
