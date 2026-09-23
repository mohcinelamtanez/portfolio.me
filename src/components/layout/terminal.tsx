"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { siteConfig } from "@/config/site";

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

function runCommand(raw: string, close: () => void): string[] {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "") return [];

  if (cmd === "help") {
    return [
      "Available commands:",
      ...COMMANDS.filter((c) => c !== "help").map((c) => `  ${c}`),
    ];
  }

  if (cmd === "whoami") {
    return [
      `${siteConfig.name} — ${siteConfig.role} · ${siteConfig.roleDetail}`,
      siteConfig.tagline,
      siteConfig.location,
    ];
  }

  if (cmd === "resume") {
    window.open(siteConfig.resumeUrl, "_blank");
    return ["Opening resume.pdf…"];
  }

  if (cmd === "github") {
    window.open(siteConfig.social.github, "_blank");
    return [`Opening ${siteConfig.social.github}…`];
  }

  if (cmd === "clear") {
    return ["__CLEAR__"];
  }

  if (cmd in routes) {
    const target = document.querySelector(routes[cmd]!);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      close();
      return [`Navigating to #${cmd}…`];
    }
  }

  return [`command not found: ${cmd} — type "help" for a list of commands`];
}

export function Terminal({ open, onOpenChange }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: "output", text: `${siteConfig.name.toLowerCase().replace(" ", "-")} — interactive shell` },
    { type: "output", text: 'type "help" to see available commands' },
  ]);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const submit = (override?: string) => {
    const value = override ?? input;
    const output = runCommand(value, () => onOpenChange(false));

    if (output[0] === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory((h) => [
        ...h,
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
          <Dialog.Title className="sr-only">Command terminal</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type a command to navigate the site, e.g. &quot;projects&quot; or &quot;contact&quot;.
          </Dialog.Description>

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
            {history.map((line, i) => (
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
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted/60"
                placeholder="type a command…"
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
