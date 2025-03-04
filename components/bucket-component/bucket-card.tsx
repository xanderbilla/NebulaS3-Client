import { Bucket } from "@/types/bucket";
import Link from "next/link";
import { InfoMenu } from "./info-menu";
import { BoxIcon } from "lucide-react";

interface Props {
  bucket: Bucket;
  onBucketDelete: () => void;
}

const BucketCard = ({ bucket, onBucketDelete }: Props) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute top-4 right-4">
        <InfoMenu bucket={bucket} onBucketDelete={onBucketDelete} />
      </div>
      <div className="pr-8 space-y-2">
        <div className="flex items-center gap-3">
          <BoxIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <span className="inline-flex items-center truncate rounded-full bg-green-50 dark:bg-green-900/30 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-700/10 dark:ring-green-500/20">
            {bucket.region || "N/A"}
          </span>
          <span className="inline-flex items-center truncate rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-500/20">
            {bucket.size ?? 0}
          </span>
        </div>
        <Link
          href={`/dashboard/buckets/${bucket.bucketName}`}
          className="block font-medium hover:underline hover:underline-offset-4 transition-all"
          title={bucket.bucketName}
        >
          <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {bucket.bucketName}
          </h3>
        </Link>
        <div className="text-xs font-light text-gray-500 dark:text-gray-400">
          <p className="truncate">
            Created on{" "}
            {new Date(bucket.createdOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BucketCard;
