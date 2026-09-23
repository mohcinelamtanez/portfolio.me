import { siteConfig } from "@/config/site";

/**
 * English UI copy — the reference dictionary. `fr.ts` must provide every key
 * defined here (enforced by the `Dictionary` type). Long-form content such as
 * projects or experience lives in `src/lib/data` (English) and
 * `src/i18n/content/fr` (French).
 */
export const en = {
  common: {
    skipToContent: "Skip to content",
    booting: "booting portfolio",
  },

  language: {
    label: "Language",
  },

  nav: {
    primary: "Primary",
    home: `${siteConfig.name} — home` as string,
    about: "About",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    openTerminal: "Open command palette",
    githubProfile: "GitHub profile",
    linkedinProfile: "LinkedIn profile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    availability: siteConfig.availability as string,
    role: siteConfig.role as string,
    roleDetail: siteConfig.roleDetail as string,
    tagline: siteConfig.tagline as string,
    description: siteConfig.description as string,
    ctaPrimary: "See what I've built",
    ctaResume: "Download résumé",
    locationLabel: "Location",
    location: siteConfig.location as string,
    linkedin: "linkedin",
  },

  about: {
    eyebrow: "// 00 — about",
    title: "Product Engineer with a software engineering foundation",
    description:
      "For me, product engineering means owning the path from a need to a working solution. I'm a 5th-year student at ISGA Casablanca, and I learn best by building complete products: understanding who they're for, choosing what to build first, and shipping every layer with care for security and maintainability. AI is part of how I work, inside products when it solves a real problem, and in my daily workflow to prototype, explore, and debug faster.",
    approach: [
      {
        step: "01",
        title: "Understand the need",
        body: "Before choosing a framework, I figure out who will use the software, what they are trying to get done, and which rules the product has to respect: roles, workflows, edge cases.",
      },
      {
        step: "02",
        title: "Scope and design",
        body: "I decide which features matter for a first version and design just enough architecture to support them: the data model, the API contract, and where each business rule belongs.",
      },
      {
        step: "03",
        title: "Build end to end",
        body: "I connect every layer myself: React interfaces, Spring Boot or Django APIs, relational databases, and external services such as ML models, background jobs, or email.",
      },
      {
        step: "04",
        title: "Make it last",
        body: "Security, tests, and documentation are part of the product, not a final step. I keep solutions simple enough to understand and easy to change when the need evolves.",
      },
    ],
  },

  projects: {
    eyebrow: "// 01 — projects",
    title: "Products I've built",
    description:
      "Each project starts with the need it answers, then what was built and why. The engineering details (architecture, decisions, testing, and security) are one tab away.",
    source: "Source",
    apiDocs: "API docs",
    live: "Live",
    need: "01 · The need",
    solution: "02 · The solution",
    built: "03 · What was built",
    builtWith: "04 · Built with",
    result: "05 · The result",
    engineeringDetails: "Engineering details",
    tabs: {
      architecture: "Architecture",
      decisions: "Decisions",
      testing: "Testing & Deploy",
      security: "Security",
    },
    testingStrategy: "Testing strategy",
    deployment: "Deployment",
  },

  skills: {
    eyebrow: "// 02 — skills",
    title: "What I bring to a product",
    description:
      "Grouped by capability, not ranked by proficiency. Everything listed is backed by a project or a role on this page, and what I'm still learning is marked as such.",
  },

  experience: {
    eyebrow: "// 03 — experience",
    title: "Experience & education",
    description:
      "Two full-stack internships, two successive B2B roles at TELUS International, and a 5th year of computer science studies in progress.",
  },

  github: {
    eyebrow: "// 04 — github",
    title: "Live from GitHub",
    stats: (repos: number, followers: number) =>
      `${repos} public repositories · ${followers} followers — pulled live via the GitHub API.`,
    fallbackDescription: "Pinned and recently active repositories, pulled live via the GitHub API.",
    noDescription: "No description provided.",
    updated: (date: string) => `updated ${date}`,
    recentlyPushed: "Recently pushed",
    contributions: {
      title: "Contribution activity",
      viewProfile: "view profile →",
      graphLabel: "GitHub contribution graph for the past year",
      day: (date: string, count: number) => `${date}: ${count} contributions`,
      less: "Less",
      more: "More",
    },
  },

  contact: {
    eyebrow: "// 05 — contact",
    title: "Let's talk",
    description:
      "Open to junior Product Engineer and Software Engineer roles, internships, and projects where understanding the problem matters as much as the code. I read everything that comes through here.",
    linkedinProfile: "LinkedIn profile",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    success: "Message sent — I'll reply within a day or two.",
    error: (email: string) => `Something went wrong. Email me directly at ${email}.`,
    rateLimited: (email: string) =>
      `You've sent several messages in a short time. Please try again in a few minutes, or email me at ${email}.`,
  },

  footer: {
    builtWith: "Built with Next.js, TypeScript & Tailwind — source on GitHub.",
    rights: (year: number, name: string) => `© ${year} ${name}. All rights reserved.`,
    status: "Status:",
    operational: "● operational",
  },

  terminal: {
    title: "Command terminal",
    description: 'Type a command to navigate the site, e.g. "projects" or "contact".',
    intro: (name: string) => `${name} — interactive shell`,
    helpHint: 'type "help" to see available commands',
    available: "Available commands:",
    openingResume: "Opening résumé…",
    opening: (target: string) => `Opening ${target}…`,
    navigating: (section: string) => `Navigating to #${section}…`,
    notFound: (cmd: string) => `command not found: ${cmd} — type "help" for a list of commands`,
    inputLabel: "Terminal command input",
    placeholder: "type a command…",
  },

  notFound: {
    eyebrow: "error 404",
    title: "route not found",
    body: "The page you're looking for doesn't exist, or the endpoint moved. Try the command terminal (⌘K) instead.",
    home: "cd ~/home",
  },
};

export type Dictionary = typeof en;
