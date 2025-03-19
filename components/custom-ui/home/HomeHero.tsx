"use client";

import dynamic from "next/dynamic";
import { Book } from "lucide-react";
import Link from "next/link";
import S3BucketClip from "../../icons/S3BucketClip";
import { useState, useEffect } from "react";

// Dynamic imports with optimized loading
const DashboardBtn = dynamic(() => import("@/components/DashboardButton"), {
  ssr: false,
});
const HealthCheck = dynamic(() => import("@/components/HealthCheck"), {
  ssr: false,
});
const Logo = dynamic(() => import("@/components/Logo"), {
  ssr: false,
});
const HomeHeroSkeleton = dynamic(
  () => import("@/components/custom-ui/skeleton/HomeHeroSkeleton"),
  { ssr: false }
);

export default function HomeHero() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state briefly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Show skeleton for 1.2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <HomeHeroSkeleton />;
  }

  // Show actual content when loaded
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 pb-20 sm:p-20 relative z-10 mt-16 sm:mt-0">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-12 w-full max-w-5xl mx-auto">
        {/* Left: Main Content */}
        <div className="flex flex-col gap-8 items-center sm:items-start flex-1">
          <Logo className="text-4xl sm:text-5xl md:text-6xl" size={64} />
          <div className="text-sm sm:text-base md:text-lg text-center sm:text-left font-[family-name:var(--font-geist-mono)] max-w-xl glass-text leading-relaxed">
            NebulaS3 is a modern application that transforms how users interact
            with Amazon S3, offering a sophisticated web interface with enhanced
            capabilities.
          </div>
          <HealthCheck />
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <DashboardBtn />
            <Link
              className="rounded-full border border-solid border-white/20 dark:border-white/10 glass-card glass-hover flex items-center justify-center gap-2 text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4 sm:min-w-36"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Book className="size-4" />
              Documentation
            </Link>
          </div>
        </div>
        {/* Right: Animated S3 Bucket SVG */}
        <div className="flex-1 flex items-center justify-center min-w-[180px] z-10">
          <S3BucketClip />
        </div>
      </div>
    </main>
  );
}
