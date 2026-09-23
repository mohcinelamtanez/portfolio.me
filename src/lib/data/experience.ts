import type { ExperienceEntry } from "@/types/content";

// English version. The French text lives in src/i18n/content/fr/experience.ts (same ids).
export const experience: ExperienceEntry[] = [
  {
    id: "telus-excellence",
    company: "TELUS International",
    role: "B2B Technical Support & Operational Excellence",
    start: "2026-06",
    end: "Present",
    location: "Casablanca, Morocco",
    highlights: [
      "Design and develop TeamTrackingApp, a web application that answers a concrete operational need: digitalising task assignment, centralising its tracking and improving visibility on daily activity.",
      "Lead the handling of B2B requests and orders, following the different work streams and resolving operational issues efficiently.",
      "Analyse business processes and identify friction points in order to propose improvements that support better organisation, traceability and operational efficiency.",
    ],
  },
  {
    id: "telus-optimisation",
    company: "TELUS International",
    role: "B2B Technical Support & Process Optimization",
    start: "2025-07",
    end: "2026-05",
    location: "Casablanca, Morocco",
    highlights: [
      "Diagnosed and resolved B2B technical incidents, from the initial analysis through to resolution or escalation to specialised teams.",
      "Ensured reliable processing and support quality, validating requests and rigorously following up technical cases.",
      "Supported the teams in Morocco in resolving complex cases and contributed to raising the quality of operations.",
      "Optimised incident-handling workflows and identified repetitive tasks that could be automated.",
      "Used Excel and operational data to track activity, indicators and reporting.",
    ],
  },
  {
    id: "zynerator",
    company: "ZYNERATOR",
    role: "Intern – Full Stack Developer Java / React",
    start: "2024-04",
    end: "2024-06",
    location: "Morocco",
    highlights: [
      "Developed a full-stack Spring Boot & React.js platform integrating an automatic code generation solution.",
      "Designed reliable REST APIs to structure data exchanges and data management.",
      "Developed a responsive frontend and contributed to the architecture, testing and code quality.",
    ],
  },
  {
    id: "radeema",
    company: "RADEEMA",
    role: "Intern – Full Stack Developer Java / Angular",
    start: "2023-04",
    end: "2023-06",
    location: "Morocco",
    highlights: [
      "Developed a purchasing and supplier management application with Spring Boot & Angular, integrating REST APIs.",
      "Contributed to development in an Agile/Scrum environment, ensuring code quality and meeting sprint objectives.",
    ],
  },
];
