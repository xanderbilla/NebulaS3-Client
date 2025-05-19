"use client";
import { X } from "lucide-react";

export default function SlideNavCloseButton({
  onClick,
}: {
  readonly onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full glass-hover hover:shadow-sm hover:shadow-purple-300/20 dark:hover:shadow-purple-800/10 transition-all duration-300"
      aria-label="Close menu"
    >
      <X className="h-6 w-6 glass-text" />
    </button>
  );
}
