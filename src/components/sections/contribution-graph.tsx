"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-surface-hover",
  1: "bg-success/25",
  2: "bg-success/45",
  3: "bg-success/70",
  4: "bg-success",
};

function generateSyntheticYear(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Deterministic pseudo-random pattern so SSR/CSR stay in sync visually.
    const seed = (d.getDate() * 7 + d.getMonth() * 13) % 10;
    const level = (seed > 7 ? 4 : seed > 5 ? 3 : seed > 3 ? 2 : seed > 1 ? 1 : 0) as 0 | 1 | 2 | 3 | 4;
    days.push({ date: d.toISOString().slice(0, 10), count: level * 3, level });
  }
  return days;
}

export function ContributionGraph() {
  const [days, setDays] = useState<ContributionDay[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://github-contributions-api.jogruber.de/v4/${siteConfig.social.githubUsername}?y=last`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { contributions: ContributionDay[] }) => {
        if (!cancelled && data?.contributions?.length) {
          setDays(data.contributions.slice(-365));
        } else if (!cancelled) {
          setDays(generateSyntheticYear());
        }
      })
      .catch(() => {
        if (!cancelled) setDays(generateSyntheticYear());
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks: ContributionDay[][] = [];
  if (days) {
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
  }

  return (
    <div className="card-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-2xs uppercase tracking-wide text-muted">
          Contribution activity
        </h3>
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-2xs text-accent hover:underline"
        >
          view profile →
        </a>
      </div>

      {!days ? (
        <div className="h-[104px] animate-pulse rounded-md bg-surface-hover" aria-hidden="true" />
      ) : (
        <div className="flex gap-1 overflow-x-auto pb-1" role="img" aria-label="GitHub contribution graph for the past year">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.date}: ${day.count} contributions`}
                  className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_COLORS[day.level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-2xs text-muted">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_COLORS[l]}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
