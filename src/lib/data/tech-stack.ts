import type { TechCategory } from "@/types/content";

export const techStack: TechCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Java", note: "primary" },
      { name: "SQL" },
      { name: "JavaScript" },
      { name: "C" },
      { name: "TypeScript" },
      { name: "Python", note: "ML & scripting" },
    ],
  },

  {
    category: "Backend & Frameworks",
    items: [
      { name: "Spring Boot" },
      { name: "Spring Security" },
      { name: "Spring Data JPA" },
      { name: "Hibernate / JPA" },
      { name: "Jakarta EE" },
      { name: "Servlets / JSP" },
      { name: "REST APIs" },
    ],
  },

  {
    category: "Databases",
    items: [
      { name: "MySQL" },
      { name: "Oracle SQL" },
      { name: "H2" },
    ],
  },

  {
    category: "Testing & Quality",
    items: [
      { name: "JUnit 5" },
      { name: "Mockito" },
      { name: "Postman" },
    ],
  },

  {
    category: "DevOps & Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Maven" },
      { name: "Docker" },
      { name: "Linux" },
    ],
  },

  {
    category: "Frontend",
    items: [
      { name: "React" },
      { name: "Angular" },
      { name: "HTML / CSS" },
    ],
  },
];