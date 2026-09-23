"use client";

import { GitFork, Star } from "lucide-react";
import type { GithubProfile, GithubRepo } from "@/lib/github";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ContributionGraph } from "@/components/sections/contribution-graph";
import { useI18n } from "@/i18n/language-provider";

function RepoCard({ repo }: { repo: GithubRepo }) {
  const { t, formatDate } = useI18n();

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="card-surface flex flex-col gap-3 p-5 transition-colors hover:border-accent/40"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-sm text-foreground">{repo.name}</span>
        {repo.language ? (
          <Badge variant="outline" className="shrink-0">
            {repo.language}
          </Badge>
        ) : null}
      </div>
      <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted">
        {repo.description ?? t.github.noDescription}
      </p>
      <div className="flex items-center gap-4 font-mono text-2xs text-muted">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3 w-3" /> {repo.forks_count}
        </span>
        <span className="ml-auto">{t.github.updated(formatDate(repo.updated_at))}</span>
      </div>
    </a>
  );
}

interface GithubViewProps {
  pinnedRepos: GithubRepo[];
  latestRepos: GithubRepo[];
  profile: GithubProfile | null;
}

export function GithubView({ pinnedRepos, latestRepos, profile }: GithubViewProps) {
  const { t, formatDate } = useI18n();

  return (
    <section id="github" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow={t.github.eyebrow}
            title={t.github.title}
            description={
              profile
                ? t.github.stats(profile.public_repos, profile.followers)
                : t.github.fallbackDescription
            }
          />
        </Reveal>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pinnedRepos.map((repo) => (
            <Reveal key={repo.id}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] max-lg:[&>*]:min-w-0">
          <Reveal>
            <ContributionGraph />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card-surface p-6">
              <h3 className="mb-4 font-mono text-2xs uppercase tracking-wide text-muted">
                {t.github.recentlyPushed}
              </h3>
              <ul className="flex flex-col divide-y divide-border">
                {latestRepos.map((repo) => (
                  <li key={repo.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate font-mono text-sm text-foreground link-underline"
                    >
                      {repo.name}
                    </a>
                    <span className="shrink-0 font-mono text-2xs text-muted">
                      {formatDate(repo.updated_at)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
