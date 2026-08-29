import type { ProjectCaseStudy } from "@/types/content";

export const projects: ProjectCaseStudy[] = [
  {
    slug: "ledgerkit",
    name: "LedgerKit",
    tagline: "An append-only double-entry ledger engine for financial applications.",
    problem:
      "Most in-house ledgers evolve into mutable-row accounting tables that silently drift from reality under concurrent writes. LedgerKit exists to make incorrect balances structurally impossible: every state change is an immutable, idempotent journal entry, and account balances are derived, never stored.",
    architectureSummary:
      "A stateless API layer accepts transaction intents, validates them against double-entry invariants, and writes immutable journal entries to Postgres inside a single serializable transaction. Balance reads are served from a materialized, incrementally-refreshed projection to avoid summing the full journal on every request. An outbox table publishes settlement events to Kafka for downstream consumers.",
    architectureDiagram: [
      "┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐",
      "│  Client / API │───▶│  Ledger Service    │───▶│  PostgreSQL        │",
      "│  (REST/gRPC)  │     │  (Spring Boot)     │     │  journal_entries   │",
      "└──────────────┘     │  - invariant check │     │  balances_mv       │",
      "                      │  - idempotency key │     └──────────────────┘",
      "                      └─────────┬──────────┘",
      "                                │ transactional outbox",
      "                                ▼",
      "                        ┌───────────────┐        ┌────────────────────┐",
      "                        │ Kafka topic    │───────▶│ Settlement workers  │",
      "                        │ ledger.events  │        │ (reconciliation,    │",
      "                        └───────────────┘        │  notifications)     │",
      "                                                  └────────────────────┘",
    ],
    decisions: [
      {
        title: "Append-only journal instead of mutable balances",
        detail:
          "Every debit/credit pair is written once and never updated. This trades some storage growth for the elimination of lost-update races and makes every historical balance reproducible by replay — critical for audits.",
      },
      {
        title: "Idempotency keys at the API boundary",
        detail:
          "Clients supply a UUID idempotency key per transaction intent, enforced via a unique constraint. Retried requests (common under network partition) return the original result instead of double-posting.",
      },
      {
        title: "Materialized balance projection, refreshed incrementally",
        detail:
          "Summing the journal per request doesn't scale past a few thousand entries per account. A trigger-maintained summary table keeps reads at O(1) while the journal remains the single source of truth.",
      },
      {
        title: "Transactional outbox over dual-write",
        detail:
          "Writing to Postgres and Kafka in the same request risked partial failure. The outbox pattern guarantees at-least-once delivery of settlement events without a distributed transaction.",
      },
    ],
    testing: [
      "Property-based tests (jqwik) assert the core invariant — sum of debits equals sum of credits — holds under randomized transaction sequences.",
      "Testcontainers spin up real Postgres and Kafka in CI; no mocked persistence layer.",
      "Concurrency tests fire parallel idempotent requests to confirm exactly-once posting under contention.",
      "Load-tested with k6 to 12k writes/sec sustained with p99 write latency under 35ms.",
    ],
    deployment: [
      "Packaged as a distroless Docker image (~90MB), deployed to Kubernetes with readiness/liveness probes tied to DB connectivity.",
      "Flyway-managed schema migrations run as a pre-deploy Kubernetes Job, gated on migration success before rollout.",
      "Blue/green rollout via Argo Rollouts with automatic rollback on error-rate SLO breach.",
    ],
    security: [
      "All monetary values stored as fixed-point integers (minor units) — no floating point in the money path.",
      "Row-level access enforced via Postgres RLS scoped to tenant ID, defense-in-depth beneath the application authorization layer.",
      "Every mutating endpoint requires a signed idempotency key and is rate-limited per API key via a token-bucket Redis implementation.",
    ],
    metrics: [
      { label: "Sustained throughput", value: "12k writes/sec" },
      { label: "p99 write latency", value: "35ms" },
      { label: "Test coverage", value: "94%" },
      { label: "Production incidents", value: "0 balance-drift" },
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Kafka", "Testcontainers", "Kubernetes"],
    github: "https://github.com/dkessler/ledgerkit",
    apiDocsUrl: "https://github.com/dkessler/ledgerkit/blob/main/docs/api.md",
    featured: true,
  },
  {
    slug: "throttlegate",
    name: "ThrottleGate",
    tagline: "A distributed rate limiter and API gateway plugin built on Netty.",
    problem:
      "Off-the-shelf rate limiters either live in a single process (useless across a fleet) or add a network hop to a central service on every request. ThrottleGate implements a gossip-synchronized token-bucket that keeps limiting decisions local while staying eventually consistent across nodes.",
    architectureSummary:
      "Each gateway node holds an in-memory token-bucket per API key, backed by a write-through Redis cluster for durability across restarts. Nodes gossip bucket deltas over a lightweight UDP protocol every 200ms so a burst against one node is visible fleet-wide within one gossip round, without a synchronous call on the request path.",
    architectureDiagram: [
      "┌───────────┐   ┌───────────┐   ┌───────────┐",
      "│  Node A    │   │  Node B    │   │  Node C    │   gossip (UDP, 200ms)",
      "│  buckets   │◀─▶│  buckets   │◀─▶│  buckets   │◀───────────────────▶",
      "└─────┬─────┘   └─────┬─────┘   └─────┬─────┘",
      "      │ write-through   │                 │",
      "      ▼                 ▼                 ▼",
      "              ┌────────────────────┐",
      "              │  Redis (durability, │",
      "              │  cold-start hydrate)│",
      "              └────────────────────┘",
    ],
    decisions: [
      {
        title: "Local decisions, async synchronization",
        detail:
          "Rate-limit checks never block on network I/O. A node may briefly over-admit during a burst, but converges within ~1 second — an acceptable trade for keeping the hot path in-process and sub-millisecond.",
      },
      {
        title: "UDP gossip over a coordination service",
        detail:
          "Considered etcd/ZooKeeper for shared state, but the consistency guarantees weren't needed for a rate limiter, and the operational cost of another stateful dependency wasn't justified.",
      },
      {
        title: "Redis as durability layer, not the hot path",
        detail:
          "Redis is only touched on writes for durability and on cold start to hydrate bucket state — never on the synchronous request path, so a Redis blip degrades gracefully instead of taking down the gateway.",
      },
    ],
    testing: [
      "Chaos tests kill random nodes mid-gossip-round and assert convergence within 2 rounds.",
      "Benchmark harness (JMH) validates per-request overhead stays under 8µs at the 99th percentile.",
      "Integration suite runs a 5-node Docker Compose cluster in CI to test real gossip behavior, not mocks.",
    ],
    deployment: [
      "Ships as a Netty channel handler, embeddable in any gateway, plus a standalone sidecar mode.",
      "Helm chart included for the sidecar deployment with configurable bucket capacity and refill rate.",
    ],
    security: [
      "Gossip messages are HMAC-signed to prevent a compromised node from forging bucket state.",
      "Redis credentials pulled from a mounted secret, never environment variables, to avoid leakage via process inspection.",
    ],
    metrics: [
      { label: "Sustained throughput", value: "200k req/sec/node" },
      { label: "p99 gateway overhead", value: "8µs" },
      { label: "Convergence time", value: "< 1s across fleet" },
    ],
    stack: ["Java 17", "Netty", "Redis", "Docker", "JMH"],
    github: "https://github.com/dkessler/throttlegate",
    featured: true,
  },
  {
    slug: "streamreconcile",
    name: "StreamReconcile",
    tagline: "Kafka Streams pipeline for real-time financial reconciliation.",
    problem:
      "Nightly batch reconciliation jobs meant discrepancies between internal records and payment-processor statements surfaced up to 24 hours late. StreamReconcile matches events in real time and flags mismatches within seconds of ingestion.",
    architectureSummary:
      "Two Kafka topics — internal transaction events and processor webhook events — are joined with a windowed stream-stream join keyed on transaction reference. Unmatched events after the window closes are emitted to a discrepancies topic consumed by an alerting service.",
    architectureDiagram: [
      "internal-tx-events ──┐",
      "                     ├──▶ windowed join (30 min) ──▶ matched-events",
      "processor-webhooks ──┘                      └──────▶ discrepancies ──▶ alerting",
    ],
    decisions: [
      {
        title: "Stream-stream windowed join over batch diffing",
        detail:
          "Events from the two sources rarely arrive in the same millisecond; a 30-minute join window absorbs processor latency while still detecting mismatches orders of magnitude faster than a nightly job.",
      },
      {
        title: "Exactly-once processing guarantees",
        detail:
          "Kafka Streams' EOS v2 was enabled to make reconciliation state changes atomic with output-topic writes, avoiding duplicate discrepancy alerts on rebalance.",
      },
    ],
    testing: [
      "TopologyTestDriver unit tests cover join, window-expiry, and out-of-order arrival scenarios without a running broker.",
      "Testcontainers-based integration tests verify EOS guarantees under simulated consumer rebalances.",
    ],
    deployment: [
      "Deployed as a Kafka Streams application on Kubernetes with standby replicas for fast state-store recovery.",
      "State stores backed by RocksDB with changelog topics for durability across pod restarts.",
    ],
    security: [
      "Consumes only from topics scoped via Kafka ACLs to the reconciliation service principal.",
      "PII fields in transaction events are tokenized upstream; this service never sees raw account numbers.",
    ],
    metrics: [
      { label: "Detection latency", value: "24h → 45s" },
      { label: "Events processed/day", value: "6M+" },
      { label: "False-positive rate", value: "< 0.02%" },
    ],
    stack: ["Java 21", "Spring Boot", "MySql", "Docker" , "Git" , "Github"],
    github: "https://github.com/mohcinelamtanez",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
