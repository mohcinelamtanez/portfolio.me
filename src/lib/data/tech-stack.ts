import type { TechCategory } from "@/types/content";

export const techStack: TechCategory[] = [
  {
    category: "Product & delivery",
    items: [
      { name: "Turning needs into roles, workflows & rules" },
      { name: "MVP scoping & prioritisation" },
      { name: "Technical decisions & trade-offs" },
      { name: "Technical documentation" },
      { name: "Agile / Scrum", note: "internship" },
    ],
  },

  {
    category: "Backend & APIs",
    items: [
      { name: "Spring Boot", note: "primary" },
      { name: "Spring Security · JWT" },
      { name: "Spring Data JPA / Hibernate" },
      { name: "REST API design" },
      { name: "Django REST Framework" },
      { name: "Flask" },
      { name: "Celery · Redis", note: "background jobs" },
      { name: "Jakarta EE · Servlets / JSP" },
    ],
  },

  {
    category: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js", note: "this site" },
      { name: "Angular" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "HTML / CSS" },
    ],
  },

  {
    category: "Languages & data",
    items: [
      { name: "Java", note: "primary" },
      { name: "TypeScript / JavaScript" },
      { name: "Python", note: "APIs & ML" },
      { name: "SQL · MySQL · PostgreSQL" },
      { name: "Oracle SQL · H2" },
      { name: "C" },
    ],
  },

  {
    category: "AI & ML",
    items: [
      { name: "ML model integration", note: "microservices" },
      { name: "scikit-learn", note: "training & serving" },
      { name: "AI-assisted development", note: "daily workflow" },
      { name: "Prompting for code & debugging" },
      { name: "LLM integration & agents", note: "exploring" },
    ],
  },

  {
    category: "Quality & tooling",
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
