import { Bucket } from "@/types/bucket";
import dynamic from "next/dynamic";

const BucketCard = dynamic(
  () => import("@/components/bucket-component/bucket-card"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-40" />
    ),
  }
);

interface BucketGridProps {
  buckets: Bucket[];
  onBucketDelete: () => void;
}

export default function BucketGrid({
  buckets,
  onBucketDelete,
}: BucketGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {buckets.map((bucket) => (
        <BucketCard
          key={bucket.bucketName}
          bucket={bucket}
          onBucketDelete={onBucketDelete}
        />
      ))}
    </div>
  );
}
