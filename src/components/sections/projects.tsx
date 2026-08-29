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
            eyebrow="// 03 — projects"
            title="Selected engineering work"
            description="Each project below is a full case study: the problem, the architecture, the trade-offs I made, and how it's tested and deployed — not just a screenshot and a tech-tag list."
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
