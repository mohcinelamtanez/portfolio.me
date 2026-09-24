import type { EducationEntry, ExperienceEntry } from "@/types/content";

/** French text for each experience entry, keyed by id (see `src/lib/data/experience.ts`). */
export type ExperienceTranslation = Pick<
  ExperienceEntry,
  "role" | "start" | "end" | "location" | "summary" | "highlights" | "stack"
>;

export const experienceFr: Record<string, ExperienceTranslation> = {
  "telus-excellence": {
    role: "Support Technique B2B & Excellence Opérationnelle",
    start: "2026-06",
    end: "Présent",
    location: "Casablanca, Maroc",
    highlights: [
      "Concevoir TeamTrackingApp pour digitaliser l’affectation et le suivi des tâches opérationnelles.",
      "Piloter les demandes et flux B2B et contribuer à la résolution des problématiques opérationnelles.",
      "Optimiser les processus métier pour renforcer la traçabilité et l’efficacité des opérations.",
    ],
  },

  "telus-optimisation": {
    role: "Support Technique B2B & Optimisation des Processus",
    start: "2025-07",
    end: "2026-05",
    location: "Casablanca, Maroc",
    highlights: [
      "Diagnostiquer et résoudre les incidents B2B, assurer leur suivi et les escalades techniques.",
      "Accompagner les équipes et optimiser les workflows pour renforcer l’efficacité opérationnelle.",
      "Automatiser les tâches et piloter les KPI sous Excel via le reporting opérationnel.",
    ],
  },

  zynerator: {
    role: "Stagiaire - Développeur Full Stack Java / React",
    start: "2024-04",
    end: "2024-06",
    location: "Maroc",
    highlights: [
      "Développer une plateforme Full Stack Spring Boot/React.js avec génération automatique de code, API REST et frontend responsive, en garantissant qualité et fiabilité.",
    ],
  },

  radeema: {
    role: "Stagiaire - Développeur Full Stack Java / Angular",
    start: "2023-04",
    end: "2023-06",
    location: "Maroc",
    highlights: [
      "Développer une application de gestion des achats et fournisseurs sous Spring Boot/Angular avec API REST, en environnement Agile/Scrum.",
    ],
  },
};

/** French text for each education entry, keyed by id (see `src/lib/data/education.ts`). */
export type EducationTranslation = Pick<EducationEntry, "school" | "program" | "location" | "status">;

export const educationFr: Record<string, EducationTranslation> = {
  isga: {
    school: "ISGA Casablanca",
    program: "Cycle Ingénieur en Informatique — 5e année",
    location: "Casablanca, Maroc",
    status: "2025 – 2027 · En cours",
  },
  fstg: {
    school: "Faculté des Sciences et Techniques (FSTG) de Marrakech",
    program: "Licence en Informatique & Réseaux",
    location: "Marrakech, Maroc",
    status: "2020 – 2024",
  },
};
