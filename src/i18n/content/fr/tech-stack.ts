import type { TechCategory } from "@/types/content";

/** French version of `src/lib/data/tech-stack.ts` — keep both lists in the same order. */
export const techStackFr: TechCategory[] = [
  {
    category: "Produit & delivery",
    items: [
      { name: "Traduire un besoin en rôles, workflows et règles" },
      { name: "Cadrage de MVP & priorisation" },
      { name: "Décisions techniques & compromis" },
      { name: "Documentation technique" },
      { name: "Agile / Scrum", note: "stage" },
    ],
  },

  {
    category: "Backend & APIs",
    items: [
      { name: "Spring Boot", note: "principal" },
      { name: "Spring Security · JWT" },
      { name: "Spring Data JPA / Hibernate" },
      { name: "Conception d'APIs REST" },
      { name: "Django REST Framework" },
      { name: "Flask" },
      { name: "Celery · Redis", note: "tâches asynchrones" },
      { name: "Jakarta EE · Servlets / JSP" },
    ],
  },

  {
    category: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js", note: "ce site" },
      { name: "Angular" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "HTML / CSS" },
    ],
  },

  {
    category: "Langages & données",
    items: [
      { name: "Java", note: "principal" },
      { name: "TypeScript / JavaScript" },
      { name: "Python", note: "APIs & ML" },
      { name: "SQL · MySQL · PostgreSQL" },
      { name: "Oracle SQL · H2" },
      { name: "C" },
    ],
  },

  {
    category: "IA & ML",
    items: [
      { name: "Intégration de modèles ML", note: "microservices" },
      { name: "scikit-learn", note: "entraînement & exposition" },
      { name: "Développement assisté par l'IA", note: "au quotidien" },
      { name: "Prompting pour le code & le débogage" },
      { name: "Intégration de LLM & agents", note: "en exploration" },
    ],
  },

  {
    category: "Qualité & outillage",
    items: [
      { name: "JUnit 5 · Mockito" },
      { name: "Postman · Swagger / OpenAPI" },
      { name: "Git · GitHub" },
      { name: "Docker · Compose" },
      { name: "Maven" },
      { name: "Linux" },
    ],
  },
];
