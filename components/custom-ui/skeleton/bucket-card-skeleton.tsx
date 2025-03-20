import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BucketCardSkeleton() {
  return (
    <Card className="p-6 border rounded-lg shadow-sm relative bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
      <div className="absolute top-4 right-4">
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="pr-8 space-y-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  );
}
export function BucketCardSkeleton() { return <div className="skeleton">Loading...</div> }
