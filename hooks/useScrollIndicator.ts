"use client";

import { useEffect, useRef } from "react";

export function useScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Add scrolling class to show the scrollbar
      container.classList.add("scrolling");

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Hide scrollbar after scrolling stops
      scrollTimeout = setTimeout(() => {
        container.classList.remove("scrolling");
      }, 1500);
    };

    const handleMouseEnter = () => {
      container.classList.add("hover-scroll");
    };

    const handleMouseLeave = () => {
      container.classList.remove("hover-scroll");
      container.classList.remove("scrolling");
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return containerRef;
}
