import { GitFork, Star } from "lucide-react";
import { getGithubProfile, getLatestRepos, getPinnedRepos, type GithubRepo } from "@/lib/github";
import { fallbackRepos } from "@/lib/data/github-fallback";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ContributionGraph } from "@/components/sections/contribution-graph";
import { formatDate } from "@/lib/utils";

function RepoCard({ repo }: { repo: GithubRepo }) {
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
        {repo.description ?? "No description provided."}
      </p>
      <div className="flex items-center gap-4 font-mono text-2xs text-muted">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3 w-3" /> {repo.forks_count}
        </span>
        <span className="ml-auto">updated {formatDate(repo.updated_at)}</span>
      </div>
    </a>
  );
}

export async function GithubIntegration() {
  const [pinned, latest, profile] = await Promise.all([
    getPinnedRepos(3),
    getLatestRepos(3),
    getGithubProfile(),
  ]);

  const pinnedRepos = pinned.length ? pinned : fallbackRepos;
  const latestRepos = latest.length ? latest : fallbackRepos.slice(0, 3);

  return (
    <section id="github" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 04 — github"
            title="Live from GitHub"
            description={
              profile
                ? `${profile.public_repos} public repositories · ${profile.followers} followers — pulled live via the GitHub API.`
                : "Pinned and recently active repositories, pulled live via the GitHub API."
            }
          />
        </Reveal>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {pinnedRepos.map((repo) => (
            <Reveal key={repo.id}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ContributionGraph />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card-surface p-6">
              <h3 className="mb-4 font-mono text-2xs uppercase tracking-wide text-muted">
                Recently pushed
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
