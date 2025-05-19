import { Skeleton } from "@/components/ui/skeleton";
import "@/styles/shimmer.css";

export default function HomeHeroSkeleton() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 pb-20 sm:p-20 relative z-10 mt-16 sm:mt-0">
      {/* Background decorative elements for skeleton */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-12 w-full max-w-5xl mx-auto">
        {/* Left: Main Content */}
        <div className="flex flex-col gap-8 items-center sm:items-start flex-1 relative">
          {/* Logo Skeleton with pulsing glow effect */}
          <div className="relative">
            <Skeleton className="h-16 w-16 rounded-full shimmer relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-xl animate-pulse" />
          </div>

          {/* Description Text Skeleton with varied widths for realism */}
          <div className="flex flex-col gap-2 w-full max-w-xl">
            <Skeleton className="h-4 w-full rounded-md shimmer" />
            <Skeleton className="h-4 w-11/12 rounded-md shimmer" />
            <Skeleton className="h-4 w-full rounded-md shimmer" />
            <Skeleton className="h-4 w-4/5 rounded-md shimmer" />
            <Skeleton className="h-4 w-3/4 rounded-md shimmer" />
          </div>

          {/* Health Check Skeleton with pulsing effect */}
          <div className="relative">
            <Skeleton className="h-8 w-32 rounded-md shimmer" />
            <div className="absolute top-1/2 -translate-y-1/2 left-3 w-2 h-2 bg-green-500/50 rounded-full animate-ping" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Skeleton className="h-10 w-36 rounded-full shimmer bg-gradient-to-r from-accent/70 to-accent" />
            <Skeleton className="h-10 w-36 rounded-full shimmer glass-card border border-white/20" />
          </div>
        </div>

        {/* Right: Animated S3 Bucket SVG Skeleton */}
        <div className="flex-1 flex items-center justify-center min-w-[180px] z-10">
          <div className="relative w-64 h-64">
            {/* Base container with subtle animation */}
            <Skeleton className="absolute inset-0 rounded-lg shimmer opacity-60" />

            {/* Bucket elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Bucket body */}
              <div className="w-40 h-32 relative">
                <Skeleton className="absolute inset-0 rounded-md shimmer" />
                <Skeleton className="absolute top-0 left-0 right-0 h-6 rounded-t-md shimmer bg-accent/80" />
              </div>

              {/* Data representation inside bucket */}
              <div className="flex gap-2 mt-4 px-4">
                <Skeleton className="h-12 w-6 rounded-sm shimmer opacity-80" />
                <Skeleton className="h-16 w-6 rounded-sm shimmer opacity-90" />
                <Skeleton className="h-10 w-6 rounded-sm shimmer opacity-70" />
                <Skeleton className="h-14 w-6 rounded-sm shimmer opacity-85" />
              </div>
            </div>

            {/* Cloud elements floating around */}
            <div className="absolute -top-8 -right-4">
              <Skeleton className="w-12 h-6 rounded-full shimmer opacity-30" />
            </div>
            <div className="absolute top-1/4 -left-6">
              <Skeleton className="w-10 h-5 rounded-full shimmer opacity-30" />
            </div>
            <div className="absolute -bottom-4 right-1/4">
              <Skeleton className="w-14 h-7 rounded-full shimmer opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
