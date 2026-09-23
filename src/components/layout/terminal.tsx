"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useI18n } from "@/i18n/language-provider";

interface TerminalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface HistoryLine {
  type: "input" | "output";
  text: string;
}

const routes: Record<string, string> = {
  about: "#about",
  projects: "#projects",
  skills: "#skills",
  experience: "#experience",
  contact: "#contact",
  top: "#top",
};

const COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "resume",
  "github",
  "whoami",
  "clear",
];

function runCommand(raw: string, close: () => void, t: Dictionary): string[] {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "") return [];

  if (cmd === "help") {
    return [
      t.terminal.available,
      ...COMMANDS.filter((c) => c !== "help").map((c) => `  ${c}`),
    ];
  }

  if (cmd === "whoami") {
    return [
      `${siteConfig.name} — ${t.hero.role} · ${t.hero.roleDetail}`,
      t.hero.tagline,
      t.hero.location,
    ];
  }

  if (cmd === "resume") {
    window.open(siteConfig.resumeUrl, "_blank");
    return [t.terminal.openingResume];
  }

  if (cmd === "github") {
    window.open(siteConfig.social.github, "_blank");
    return [t.terminal.opening(siteConfig.social.github)];
  }

  if (cmd === "clear") {
    return ["__CLEAR__"];
  }

  if (cmd in routes) {
    const target = document.querySelector(routes[cmd]!);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      close();
      return [t.terminal.navigating(cmd)];
    }
  }

  return [t.terminal.notFound(cmd)];
}

export function Terminal({ open, onOpenChange }: TerminalProps) {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  // null = untouched session: the intro follows the active language until
  // the first command is run or the history is cleared.
  const [history, setHistory] = useState<HistoryLine[] | null>(null);
  const lines: HistoryLine[] = history ?? [
    { type: "output", text: t.terminal.intro(siteConfig.name.toLowerCase().replace(" ", "-")) },
    { type: "output", text: t.terminal.helpHint },
  ];
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines.length]);

  const submit = (override?: string) => {
    const value = override ?? input;
    const output = runCommand(value, () => onOpenChange(false), t);

    if (output[0] === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory([
        ...lines,
        { type: "input", text: value },
        ...output.map((line): HistoryLine => ({ type: "output", text: line })),
      ]);
    }

    if (value.trim()) setCommandLog((log) => [...log, value]);
    setLogIndex(null);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandLog.length) return;
      const nextIndex = logIndex === null ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= commandLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-24 z-[91] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-surface shadow-2xl focus:outline-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">{t.terminal.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{t.terminal.description}</Dialog.Description>

          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-3 font-mono text-2xs text-muted">
              guest@{siteConfig.social.githubUsername}: ~
            </span>
          </div>

          <div
            ref={scrollRef}
            className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={line.type === "input" ? "text-foreground" : "text-muted"}
              >
                {line.type === "input" ? (
                  <span>
                    <span className="text-accent">$</span> {line.text}
                  </span>
                ) : (
                  line.text
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 pt-1">
              <span className="text-accent">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label={t.terminal.inputLabel}
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted/60"
                placeholder={t.terminal.placeholder}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2.5">
            {["projects", "experience", "resume", "contact"].map((c) => (
              <button
                key={c}
                onClick={() => submit(c)}
                className="rounded border border-border px-2 py-1 font-mono text-2xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                {c}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
