import type { Locale } from "@/i18n/config";
import { projects } from "@/lib/data/projects";
import { experience } from "@/lib/data/experience";
import { education } from "@/lib/data/education";
import { techStack } from "@/lib/data/tech-stack";
import { projectsFr } from "@/i18n/content/fr/projects";
import { educationFr, experienceFr } from "@/i18n/content/fr/experience";
import { techStackFr } from "@/i18n/content/fr/tech-stack";

/**
 * Long-form portfolio content for a locale. English is the source of truth in
 * `src/lib/data`; French entries only override language-dependent fields and
 * fall back to English if a translation is missing.
 */
export function getContent(locale: Locale) {
  if (locale === "en") {
    return { projects, experience, education, techStack };
  }

  return {
    projects: projects.map((p) => ({ ...p, ...projectsFr[p.slug] })),
    experience: experience.map((e) => ({ ...e, ...experienceFr[e.id] })),
    education: education.map((e) => ({ ...e, ...educationFr[e.id] })),
    techStack: techStackFr,
  };
}

export type Content = ReturnType<typeof getContent>;
