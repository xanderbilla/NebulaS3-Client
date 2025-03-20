"use client";

import { Book } from "lucide-react";
import Link from "next/link";
import S3BucketClip from "../../icons/S3BucketClip";
import DashboardButton from "@/components/DashboardButton";
import HealthCheck from "@/components/HealthCheck";
import Logo from "@/components/Logo";
import { Suspense } from "react";

// Simple loading fallback components
function LogoFallback() {
  return <div className="w-64 h-16 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>;
}

function ButtonFallback() {
  return <div className="w-36 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>;
}

export default function HomeHero() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 pb-20 sm:p-20 relative z-10 mt-16 sm:mt-0">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-12 w-full max-w-5xl mx-auto">
        {/* Left: Main Content */}
        <div className="flex flex-col gap-8 items-center sm:items-start flex-1">
          <Suspense fallback={<LogoFallback />}>
            <Logo className="text-4xl sm:text-5xl md:text-6xl" size={64} />
          </Suspense>
          <div className="text-sm sm:text-base md:text-lg text-center sm:text-left font-[family-name:var(--font-geist-mono)] max-w-xl glass-text leading-relaxed">
            NebulaS3 is a modern application that transforms how users interact
            with Amazon S3, offering a sophisticated web interface with enhanced
            capabilities.
          </div>
          
          <Suspense fallback={<ButtonFallback />}>
            <HealthCheck />
          </Suspense>
          
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Suspense fallback={<ButtonFallback />}>
              <DashboardButton />
            </Suspense>
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
