import type { BlogPost } from "@/types/content";

export const blogPosts: BlogPost[] = [
  {
    slug: "idempotency-keys-at-scale",
    title: "Idempotency keys at scale: what breaks past 10k req/sec",
    excerpt:
      "A unique constraint on an idempotency key column works fine until it doesn't. Notes on lock contention, TTL strategy, and the failure modes we hit in production.",
    date: "2026-03-14",
    readMinutes: 9,
    tags: ["Distributed Systems", "PostgreSQL"],
  },
  {
    slug: "kafka-streams-eos-v2",
    title: "Exactly-once semantics in Kafka Streams: a field guide",
    excerpt:
      "EOS v2 sounds like a checkbox, not a design decision. It isn't. A walkthrough of transactional producers, consumer rebalances, and where the guarantee actually ends.",
    date: "2025-11-02",
    readMinutes: 12,
    tags: ["Kafka", "Streaming"],
  },
  {
    slug: "materialized-views-vs-cqrs",
    title: "Materialized views vs. full CQRS: pick the smaller hammer",
    excerpt:
      "Most teams reach for event sourcing when a Postgres materialized view refreshed on trigger would have solved the read-scaling problem in an afternoon.",
    date: "2025-08-21",
    readMinutes: 7,
    tags: ["Architecture", "PostgreSQL"],
  },
  {
    slug: "on-call-runbooks-that-work",
    title: "On-call runbooks nobody reads at 3 a.m. — and how we fixed ours",
    excerpt:
      "MTTR dropped from 40 minutes to 6 after we stopped writing runbooks as documentation and started writing them as decision trees.",
    date: "2025-05-09",
    readMinutes: 6,
    tags: ["Reliability", "On-call"],
  },
];
