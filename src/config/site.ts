export const siteConfig = {
  name: "Mohcine Lamtanez",
  role: "Product Engineer",
  roleDetail: "Software Engineering background",
  tagline: "I start with the problem, then build the software that solves it.",
  description:
    "Early-career Product Engineer with a software engineering foundation in Java, Spring Boot and React. I work across the whole product: clarifying the need, deciding what's worth building first, designing the API and data model, and shipping something secure and maintainable. I use AI where it genuinely adds value.",
  url: "https://mohcinelamtanez.vercel.app",
  ogImage: "/og-image.png",
  email: "lamtanezmohcine95@gmail.com",
  location: "Casablanca, Morocco · Open to Remote",
  availability: "Open to junior Product / Software Engineer roles",

  social: {
    github: "https://github.com/mohcinelamtanez",
    linkedin: "https://www.linkedin.com/in/mohcine-lamtanez-046b13359/",
    twitter: "https://x.com/lamtanez_m",
    twitterHandle: "@lamtanez_m",
    githubUsername: "mohcinelamtanez",
  },

  // Repositories shown as pinned in the GitHub section, in this order.
  pinnedRepos: ["TeamTrackingApp", "BanqueApp-SpringBoot", "medPredict", "portfolio.me"],

  resumeUrl: "/Mohcine_Lamtanez_CV.pdf",

  keywords: [
    "Product Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "Java",
    "Spring Boot",
    "Spring Security",
    "REST API",
    "React",
    "TypeScript",
    "Django",
    "PostgreSQL",
    "MySQL",
    "Machine Learning Integration",
    "AI-assisted development",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
