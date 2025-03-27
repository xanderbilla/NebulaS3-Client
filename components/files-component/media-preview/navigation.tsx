import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
  readonly hasNext?: boolean;
  readonly hasPrev?: boolean;
}

export function Navigation({
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: NavigationProps) {
  return (
    <>
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white/80 hover:text-white transition-all duration-200 z-[9999]"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white/80 hover:text-white transition-all duration-200 z-[9999]"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
