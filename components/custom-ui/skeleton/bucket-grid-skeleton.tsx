import BucketCardSkeleton from "./bucket-card-skeleton";

export default function BucketGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: count }, (_, index) => (
        <BucketCardSkeleton key={index} />
      ))}
    </div>
  );
}
