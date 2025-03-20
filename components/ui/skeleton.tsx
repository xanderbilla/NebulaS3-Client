import { cn } from "@/lib/utils";
import "@/styles/shimmer.css";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md shimmer", className)}
      {...props}
    />
  );
}

export { Skeleton };
