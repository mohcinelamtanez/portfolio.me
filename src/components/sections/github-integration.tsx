import { getGithubProfile, getLatestRepos, getPinnedRepos } from "@/lib/github";
import { fallbackRepos } from "@/lib/data/github-fallback";
import { GithubView } from "@/components/sections/github-view";

/** Fetches GitHub data on the server; rendering (and translation) happens in `GithubView`. */
export async function GithubIntegration() {
  const [pinned, latest, profile] = await Promise.all([
    getPinnedRepos(4),
    getLatestRepos(3),
    getGithubProfile(),
  ]);

  const pinnedRepos = pinned.length ? pinned : fallbackRepos;
  const latestRepos = latest.length ? latest : fallbackRepos.slice(0, 3);

  return <GithubView pinnedRepos={pinnedRepos} latestRepos={latestRepos} profile={profile} />;
}
