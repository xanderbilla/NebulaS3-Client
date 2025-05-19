import BucketCardSkeleton from "./bucket-card-skeleton";

export default function BucketGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <BucketCardSkeleton key={index} />
      ))}
    </div>
  );
}