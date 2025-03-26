import { cn } from "@/lib/utils";

interface BucketGridSkeletonProps {
  count?: number;
  className?: string;
  columnCount?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
}

export default function BucketGridSkeleton({
  count = 4,
  className,
  columnCount = {
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    "2xl": 5,
  },
}: BucketGridSkeletonProps) {
  // Generate dynamic grid columns class
  const gridColsClass = Object.entries(columnCount)
    .map(([breakpoint, count]) => {
      if (breakpoint === "sm") return `sm:grid-cols-${count}`;
      if (breakpoint === "md") return `md:grid-cols-${count}`;
      if (breakpoint === "lg") return `lg:grid-cols-${count}`;
      if (breakpoint === "xl") return `xl:grid-cols-${count}`;
      if (breakpoint === "2xl") return `2xl:grid-cols-${count}`;
      return "";
    })
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("grid grid-cols-1 gap-4", gridColsClass, className)}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {/* Menu button skeleton */}
          <div className="absolute top-4 right-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="pr-8 space-y-2">
            {/* Region and size badges skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Bucket name skeleton */}
            <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Creation date skeleton */}
            <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
