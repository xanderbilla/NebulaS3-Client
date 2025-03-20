import LoginSkeleton from "@/components/custom-ui/skeleton/LoginSkeleton";
import LoginBackgroundSkeleton from "@/components/custom-ui/skeleton/LoginBackgroundSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthPageSkeleton() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Back Button Skeleton */}
        <div className="flex justify-start mt-4">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginSkeleton />
          </div>
        </div>
      </div>
      <LoginBackgroundSkeleton />
    </div>
  );
}
