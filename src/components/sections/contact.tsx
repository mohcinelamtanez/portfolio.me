"use client";

import { useState, type FormEvent } from "react";
import { Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="hairline">
      <div className="container-narrow py-24">
        <Reveal>
          <SectionHeading
            eyebrow="// 05 — contact"
            title="Let's talk"
            description="Open to junior Product Engineer and Software Engineer roles, internships, and projects where understanding the problem matters as much as the code. I read everything that comes through here."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="card-surface flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm text-foreground">{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                className="card-surface flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
              >
                <Github className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm text-foreground">
                  github.com/{siteConfig.social.githubUsername}
                </span>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="card-surface flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
              >
                <Linkedin className="h-4 w-4 text-accent" />
                <span className="font-mono text-sm text-foreground">LinkedIn profile</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} className="card-surface flex flex-col gap-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-2xs uppercase tracking-wide text-muted">Name</span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-2xs uppercase tracking-wide text-muted">Email</span>
                  <input
                    required
                    name="email"
                    type="email"
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-accent"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-2xs uppercase tracking-wide text-muted">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-accent"
                />
              </label>

              <Button type="submit" disabled={status === "loading"} className="w-fit gap-2">
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send message
              </Button>

              {status === "success" ? (
                <p className="font-mono text-2xs text-success" role="status">
                  Message sent — I&apos;ll reply within a day or two.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="font-mono text-2xs text-danger" role="alert">
                  Something went wrong. Email me directly at {siteConfig.email}.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
