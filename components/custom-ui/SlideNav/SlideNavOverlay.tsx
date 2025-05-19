"use client";
import { cn } from "@/lib/utils";

export default function SlideNavOverlay({
  isOpen,
  onClick,
}: {
  readonly isOpen: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Close menu overlay"
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-xl z-40 transition-opacity duration-300 appearance-none border-none p-0 m-0 cursor-pointer",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClick}
    />
  );
}
