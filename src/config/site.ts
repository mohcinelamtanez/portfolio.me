export const siteConfig = {
  name: "Mohcine Lamtanez",
  role: "Java Backend Engineer",
  tagline: "Building reliable and maintainable backend systems.",
  description:
    "Java Backend Engineer focused on building robust backend applications with Java, Spring Boot, REST APIs, databases, and clean software architecture.",
  url: "https://MohcineLamtanez.dev",
  ogImage: "/og-image.png",
  email: "lamtanezmohcine95@gmail.com",
  location: "Casablanca, Morocco · Open to Remote",
  availability: "Open to Java Backend Engineer roles",

  social: {
    github: "https://github.com/mohcinelamtanez",
    linkedin: "https://www.linkedin.com/in/mohcine-lamtanez-046b13359/",
    twitter: "https://x.com/lamtanez_m",
    githubUsername: "mohcinelamtanez",
  },

  resumeUrl: "/resume.pdf",

  keywords: [
    "Java Backend Engineer",
    "Java Developer",
    "Spring Boot",
    "Spring",
    "REST API",
    "JPA",
    "Hibernate",
    "SQL",
    "MySQL",
    "Oracle",
    "Git",
    "Maven",
    "Software Engineer",
  ],
} as const;

export type SiteConfig = typeof siteConfig;