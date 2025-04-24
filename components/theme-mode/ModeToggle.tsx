"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import GithubIcon from "../icons/GithubIcon";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  readonly className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-sidebar-accent animate-pulse" />
        <div className="h-10 w-10 rounded-full bg-sidebar-accent animate-pulse" />
      </div>
    );
  }

  const baseButton =
    "w-10 h-10 flex items-center justify-center rounded-full transition-colors";

  return (
    <div className="flex items-center gap-2">
      {" "}
      <Link
        href="https://github.com/xanderbilla/nebulas3"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseButton, "glass-hover", className)}
      >
        <GithubIcon className="w-5 h-5 glass-text" />
        <span className="sr-only">GitHub repository</span>
      </Link>{" "}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        className={cn(baseButton, "glass-hover", className)}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-600" />
        )}
      </button>
    </div>
  );
}
