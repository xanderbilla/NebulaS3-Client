import { Skeleton } from "@/components/ui/skeleton";

export default function NavLinksSkeleton() {
  return (
    <div className="hidden md:flex items-center gap-4 ml-4">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
}
