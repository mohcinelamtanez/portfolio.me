"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Terminal } from "@/components/layout/terminal";

export function SiteShell({ children }: { children: ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <LoadingScreen />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <Terminal open={terminalOpen} onOpenChange={setTerminalOpen} />
      {children}
    </>
  );
}
