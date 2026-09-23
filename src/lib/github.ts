import { siteConfig } from "@/config/site";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const GITHUB_API = "https://api.github.com";
const username = siteConfig.social.githubUsername;

/**
 * Returns the repositories listed in `siteConfig.pinnedRepos`, in that order,
 * topped up with the most-starred remaining repos (the GitHub GraphQL API is
 * required for true pins and needs an authenticated token — this REST
 * approach works with zero config).
 * Results are cached at the Next.js data-cache layer and revalidated hourly.
 */
export async function getPinnedRepos(limit = 6): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const repos: GithubRepo[] = await res.json();

    const pinnedNames: readonly string[] = siteConfig.pinnedRepos;
    const pinned = pinnedNames
      .map((name) => repos.find((repo) => repo.name === name))
      .filter((repo): repo is GithubRepo => repo !== undefined);
    const others = repos
      .filter((repo) => !repo.name.startsWith(username) && !pinnedNames.includes(repo.name))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return [...pinned, ...others].slice(0, limit);
  } catch {
    return [];
  }
}

export async function getLatestRepos(limit = 4): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=created&per_page=${limit}&type=owner`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export interface GithubProfile {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
