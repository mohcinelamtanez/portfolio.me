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
      "Concevoir et développer TeamTrackingApp, une application web répondant à un besoin opérationnel concret, afin de digitaliser l’affectation des tâches, centraliser leur suivi et améliorer la visibilité sur l’activité quotidienne.",
      "Piloter le traitement des demandes et commandes B2B, en assurant le suivi des différents flux de travail et la résolution efficace des problématiques opérationnelles.",
      "Analyser les processus métier et identifier les points de friction, afin de proposer des améliorations favorisant une meilleure organisation, traçabilité et efficacité opérationnelle.",
    ],
  },

  "telus-optimisation": {
    role: "Support Technique B2B & Optimisation des Processus",
    start: "2025-07",
    end: "2026-05",
    location: "Casablanca, Maroc",
    highlights: [
      "Diagnostiquer et résoudre les incidents techniques B2B, de l’analyse initiale jusqu’à la résolution ou l’escalade vers les équipes spécialisées.",
      "Garantir la fiabilité des traitements et la qualité du support, avec validation des demandes et suivi rigoureux des dossiers techniques.",
      "Accompagner les équipes au Maroc dans la résolution des cas complexes et contribuer à la montée en qualité des opérations.",
      "Optimiser les workflows de traitement des incidents et identifier les tâches répétitives pouvant être automatisées.",
      "Exploiter Excel et les données opérationnelles pour assurer le suivi des activités, des indicateurs et du reporting.",
    ],
  },

  zynerator: {
    role: "Stagiaire - Développeur Full Stack Java / React",
    start: "2024-04",
    end: "2024-06",
    location: "Maroc",
    highlights: [
      "Développer une plateforme Full Stack Spring Boot & React.js intégrant une solution de génération automatique de code.",
      "Concevoir des API REST fiables pour structurer les échanges et la gestion des données.",
      "Développer un frontend responsive et contribuer à l’architecture, aux tests et à la qualité du code.",
    ],
  },

  radeema: {
    role: "Stagiaire - Développeur Full Stack Java / Angular",
    start: "2023-04",
    end: "2023-06",
    location: "Maroc",
    highlights: [
      "Développer une application de gestion des achats et fournisseurs avec Spring Boot & Angular, intégrant des API REST.",
      "Contribuer au développement en environnement Agile/Scrum, en garantissant qualité du code et respect des objectifs de sprint.",
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
