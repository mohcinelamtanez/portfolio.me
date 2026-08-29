# Backend Engineer Portfolio

A production-grade portfolio template for backend engineers, built to read like an
engineering artifact — not a student project. Design language inspired by Stripe,
Linear, GitHub, and Vercel: dark, minimal, monospace-accented, fast.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS ·
shadcn/ui primitives (Radix-based) · Framer Motion · Lucide icons

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 18.17+.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # eslint
npm run typecheck  # tsc --noEmit
```

> **Note on fonts:** this template uses `next/font/google` (Inter + JetBrains Mono),
> which fetches font files at build time and therefore requires network access to
> `fonts.googleapis.com` during `next build`. This works out of the box on Vercel,
> GitHub Actions, or any CI/dev machine with normal internet access. If you're
> building in a fully offline/sandboxed environment, swap the import in
> `src/app/layout.tsx` for `next/font/local` with self-hosted font files, or use
> system-font stubs temporarily.
>
> For an exact Vercel-style look, swap in **Geist Sans / Geist Mono** via the
> `geist` npm package instead of Inter/JetBrains Mono — same integration pattern.

---

## Customize your content

Everything you need to personalize lives in a handful of files — no need to touch
component code for a standard update:

| What                          | File                                    |
| ------------------------------ | ---------------------------------------- |
| Name, role, bio, social links   | `src/config/site.ts`                     |
| Work experience timeline        | `src/lib/data/experience.ts`             |
| Tech stack categories           | `src/lib/data/tech-stack.ts`             |
| Project case studies            | `src/lib/data/projects.ts`               |
| Certifications                  | `src/lib/data/certifications.ts`         |
| Blog posts                      | `src/lib/data/blog.ts`                   |
| GitHub username (for live data) | `siteConfig.social.githubUsername`       |
| Resume file                     | replace `public/resume.pdf`              |
| Favicon / OG image              | replace files in `public/`               |

Each project in `projects.ts` follows the `ProjectCaseStudy` type
(`src/types/content.ts`) — problem statement, architecture summary + ASCII
diagram, engineering decisions with rationale, testing strategy, deployment
notes, security notes, and headline metrics. This is what turns a project list
into something an engineering manager will actually read.

---

## Architecture notes

- **App Router, server components by default.** Data-heavy sections (GitHub
  integration) are `async` server components that fetch at request time with
  a 1-hour revalidation window (`next: { revalidate: 3600 }`), so the GitHub
  API is never hit on every page load.
- **Client components are scoped tightly** — the terminal, contact form,
  contribution graph, navbar, and scroll-reveal wrapper are the only
  `"use client"` boundaries. Everything else ships zero client JS.
- **GitHub integration degrades gracefully.** If the GitHub REST API is
  unreachable or rate-limited (60 req/hr unauthenticated), the pinned/latest
  repo sections fall back to static data in `src/lib/data/github-fallback.ts`
  rather than rendering empty. To raise the rate limit or use GraphQL for true
  "pinned repos" (not just most-starred), add a GitHub token server-side in
  `src/lib/github.ts`.
- **Contact form** posts to `src/app/api/contact/route.ts`, an Edge API route
  with validation. Wire up a transactional email provider (Resend, Postmark,
  SES) in the marked block — kept provider-agnostic so the template builds
  without requiring secrets.
- **SEO:** `src/app/sitemap.ts` and `src/app/robots.ts` generate
  `/sitemap.xml` and `/robots.txt` dynamically from `next-sitemap`'s
  MetadataRoute API. `layout.tsx` emits Open Graph, Twitter Card, and
  JSON-LD (`Person` + `WebSite`) structured data.
- **Accessibility:** skip-to-content link, visible focus rings
  (`:focus-visible`), semantic landmarks, `prefers-reduced-motion` respected
  globally (see `globals.css`), alt text and ARIA labels on icon-only
  controls.

---

## Deployment

Optimized for Vercel (zero-config), but this is a standard Next.js app and
deploys anywhere that supports Node.js 18+ or the Edge runtime:

```bash
vercel deploy
```

Set `siteConfig.url` in `src/config/site.ts` to your production domain before
deploying — it feeds canonical URLs, OG tags, and the sitemap.

---

## What's intentionally not included

- No CMS — content is TypeScript data files, which is faster to maintain for
  a single-owner portfolio and gives you type safety on every field.
- No analytics vendor wired in by default. Add Vercel Analytics
  (`@vercel/analytics`) or Plausible/Umami by dropping their script/component
  into `src/app/layout.tsx`.
- No skill percentage bars, by design — they don't convey signal to an
  engineering manager. Depth is demonstrated through the project case studies
  instead.
