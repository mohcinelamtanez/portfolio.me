import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function Blog() {
  return (
    <section id="blog" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Writing"
            title="Technical writing"
            description="Notes from production — the parts that don't make it into the postmortem summary."
          />
        </Reveal>

        <div className="flex flex-col divide-y divide-border border-t border-border">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.04}>
              <a
                href={post.externalUrl ?? `/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-2xs text-muted">
                      {formatDate(post.date)} · {post.readMinutes} min read
                    </span>
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-base font-medium text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
