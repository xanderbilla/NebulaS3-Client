import { Skeleton } from "@/components/ui/skeleton";

export default function NavActionsSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-9 w-9 rounded-full" />
      <Skeleton className="h-9 w-24 hidden md:block" />
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-9 rounded-full md:hidden" />
    </div>
  );
}
