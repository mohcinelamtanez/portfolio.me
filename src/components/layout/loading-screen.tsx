"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = setTimeout(() => setVisible(false), reduceMotion ? 0 : 650);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 font-mono text-sm text-muted">
            <span className="text-accent">$</span>
            <span>booting portfolio</span>
            <span className="inline-block w-2 animate-blink text-accent">_</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
