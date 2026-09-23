import type { GithubRepo } from "@/lib/github";

/**
 * Shown when the GitHub REST API is unreachable or rate-limited (60 req/hr
 * unauthenticated), so the section never renders empty in production.
 * Star and fork counts are left at 0 rather than guessed.
 */
export const fallbackRepos: GithubRepo[] = [
  {
    id: 1,
    name: "BanqueApp-SpringBoot",
    full_name: "mohcinelamtanez/BanqueApp-SpringBoot",
    html_url: "https://github.com/mohcinelamtanez/BanqueApp-SpringBoot",
    description:
      "Full-stack lending platform: loan applications, repayment schedules, role-based access, and ML credit-risk scoring.",
    stargazers_count: 0,
    forks_count: 0,
    language: "Java",
    updated_at: new Date().toISOString(),
    topics: ["spring-boot", "react", "jwt", "machine-learning"],
  },
  {
    id: 2,
    name: "medPredict",
    full_name: "mohcinelamtanez/medPredict",
    html_url: "https://github.com/mohcinelamtanez/medPredict",
    description:
      "Medical practice management with AI-assisted diagnosis suggestions, automatic reminders, and a patient portal.",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
    topics: ["django", "react", "celery", "scikit-learn"],
  },
];
