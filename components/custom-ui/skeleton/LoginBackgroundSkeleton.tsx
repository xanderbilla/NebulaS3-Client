import { Skeleton } from "@/components/ui/skeleton";

export default function LoginBackgroundSkeleton() {
  return (
    <div className="relative hidden bg-muted dark:bg-muted/50 lg:block">
      <div className="absolute inset-0 h-full w-full">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />

        {/* Animated elements */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 gap-4 p-12 h-full">
            <div className="col-span-1 flex flex-col gap-3 items-center justify-center">
              <Skeleton className="h-24 w-24 rounded-full opacity-20" />
              <Skeleton className="h-3 w-20 rounded-full opacity-20" />
              <Skeleton className="h-2 w-16 rounded-full opacity-10" />
            </div>

            <div className="col-span-2 flex flex-col gap-4 items-center justify-center">
              <Skeleton className="h-16 w-3/4 rounded-lg opacity-10" />
              <div className="grid grid-cols-2 gap-3 w-full">
                <Skeleton className="h-32 rounded-md opacity-20" />
                <Skeleton className="h-32 rounded-md opacity-15" />
              </div>
              <Skeleton className="h-10 w-1/2 rounded-md opacity-20" />
            </div>
          </div>

          {/* Decorative elements with shimmer effect */}
          <div className="absolute bottom-12 right-12">
            <Skeleton className="h-40 w-40 rounded-full opacity-10" />
          </div>
          <div className="absolute top-24 left-24">
            <Skeleton className="h-16 w-16 rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
