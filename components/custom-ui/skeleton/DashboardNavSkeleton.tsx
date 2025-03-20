import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardNavSkeleton() {
  return (
    <div className="glass-nav sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-6 w-24 hidden md:block" />
          <div className="hidden md:flex items-center gap-4 ml-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-24 hidden md:block" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9 rounded-full md:hidden" />
        </div>
      </div>
    </div>
  );
}
