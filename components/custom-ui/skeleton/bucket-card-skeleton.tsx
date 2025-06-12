import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BucketCardSkeleton() {
  return (
    <Card className="p-6 border rounded-lg shadow-sm relative glass-card">
      <div className="absolute top-4 right-4">
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="pr-8 space-y-4">
        {/* Icon and badges */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {/* Bucket name */}
        <Skeleton className="h-4 w-3/4" />

        <div className="space-y-1">
          {/* Description (size and files) */}
        <Skeleton className="h-3 w-2/3" />

        {/* Date */}
        <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </Card>
  );
}
