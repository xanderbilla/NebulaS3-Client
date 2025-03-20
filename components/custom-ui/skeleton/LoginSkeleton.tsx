import { Skeleton } from "@/components/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5 max-w-md mx-auto">
      {/* Form header skeleton */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Skeleton className="h-8 w-40 rounded-md" />
      </div>

      {/* Form fields skeleton */}
      <div className="grid gap-4">
        {/* First input group */}
        <div className="grid gap-1">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        {/* Second input group */}
        <div className="grid gap-1">
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        {/* Button skeleton with subtle gradient */}
        <Skeleton className="h-9 w-full rounded-md mt-2 bg-gradient-to-r from-accent/70 to-accent" />
      </div>

      {/* Optional skeleton for additional form elements */}
      <div className="flex justify-center mt-4">
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
    </div>
  );
}
