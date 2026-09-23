import type { EducationEntry, ExperienceEntry } from "@/types/content";

/** French text for each experience entry, keyed by id (see `src/lib/data/experience.ts`). */
export type ExperienceTranslation = Pick<
  ExperienceEntry,
  "role" | "start" | "end" | "location" | "summary" | "highlights" | "stack"
>;

export const experienceFr: Record<string, ExperienceTranslation> = {
  telus: {
    role: "Spécialiste support technique",
    start: "2025",
    end: "Aujourd'hui",
    location: "Casablanca, Maroc",
    summary:
      "Accompagner des clients B2B dans les télécoms m'a appris à partir du problème de l'utilisateur : comprendre ce qu'il vit, diagnostiquer la cause et travailler avec des ingénieurs expérimentés pour résoudre les cas techniques complexes.",
    highlights: [
      "Analyse et résolution d'incidents techniques à partir des demandes clients, des informations de service et des systèmes internes, dans le respect des procédures de diagnostic établies.",
      "Escalade des incidents complexes ou non résolus vers des ingénieurs expérimentés, avec des éléments de diagnostic clairs et le contexte du dossier pour faciliter une résolution rapide.",
      "Promu pour accompagner et intégrer les nouveaux membres de l'équipe, en les familiarisant avec les outils internes, les workflows techniques, les procédures de diagnostic et les processus opérationnels.",
      "Traitement de demandes clients B2B dans un environnement technique structuré, alliant résolution de problèmes, communication, documentation et rigueur.",
    ],
    stack: ["Outils techniques internes", "Diagnostic", "Gestion des incidents", "Télécoms B2B"],
  },

  zynerator: {
    role: "Stagiaire développeur full stack",
    start: "avr. 2024",
    end: "juin 2024",
    location: "Maroc",
    summary:
      "Contribution à une plateforme en ligne qui met en relation les entreprises avec une solution de génération automatique de code, développée avec Spring Boot et React.",
    highlights: [
      "Développement et intégration d'APIs REST avec Spring Boot pour gérer la communication entre services et les flux de données.",
      "Développement d'un frontend React responsive, centré sur une expérience utilisateur intuitive.",
      "Contribution à l'architecture de l'application et à la stratégie de test, côté frontend comme côté backend.",
    ],
    stack: ["Java", "Spring Boot", "React", "APIs REST"],
  },

  radeema: {
    role: "Stagiaire développeur full stack",
    start: "avr. 2023",
    end: "juin 2023",
    location: "Marrakech, Maroc",
    summary:
      "Développement d'une application de gestion des demandes d'achat pour faciliter la coordination avec les fournisseurs et simplifier le traitement des demandes.",
    highlights: [
      "Développement des fonctionnalités backend avec Spring Boot et mise en place d'APIs REST pour la logique métier et la persistance des données.",
      "Réalisation et intégration du frontend Angular avec les APIs backend, pour offrir une interface web de gestion des demandes d'achat.",
      "Participation aux cérémonies Agile/Scrum et collaboration avec l'équipe pour livrer des fonctionnalités alignées sur les objectifs de sprint tout en maintenant la qualité du code.",
    ],
    stack: ["Java", "Spring Boot", "Angular", "APIs REST"],
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
