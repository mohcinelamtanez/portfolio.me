import type { GithubRepo } from "@/lib/github";

/**
 * Shown when the GitHub REST API is unreachable or rate-limited (60 req/hr
 * unauthenticated), so the section never renders empty in production.
 */
export const fallbackRepos: GithubRepo[] = [
  {
    id: 1,
    name: "ledgerkit",
    full_name: "dkessler/ledgerkit",
    html_url: "https://github.com/dkessler/ledgerkit",
    description: "Append-only double-entry ledger engine for financial applications.",
    stargazers_count: 342,
    forks_count: 41,
    language: "Java",
    updated_at: new Date().toISOString(),
    topics: ["java", "spring-boot", "postgresql", "fintech"],
  },
  {
    id: 2,
    name: "throttlegate",
    full_name: "dkessler/throttlegate",
    html_url: "https://github.com/dkessler/throttlegate",
    description: "Distributed rate limiter and API gateway plugin built on Netty.",
    stargazers_count: 198,
    forks_count: 22,
    language: "Java",
    updated_at: new Date().toISOString(),
    topics: ["netty", "rate-limiting", "distributed-systems"],
  },
  {
    id: 3,
    name: "streamreconcile",
    full_name: "dkessler/streamreconcile",
    html_url: "https://github.com/dkessler/streamreconcile",
    description: "Kafka Streams pipeline for real-time financial reconciliation.",
    stargazers_count: 87,
    forks_count: 9,
    language: "Java",
    updated_at: new Date().toISOString(),
    topics: ["kafka", "kafka-streams", "streaming"],
  },
];
