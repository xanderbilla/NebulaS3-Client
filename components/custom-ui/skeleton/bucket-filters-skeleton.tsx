import { Skeleton } from "@/components/ui/skeleton";

export default function BucketFiltersSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex-1 w-full">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
