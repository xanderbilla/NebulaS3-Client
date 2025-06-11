import BucketGridNew from "./bucket-grid-new";
import type { Bucket } from "@/types/bucket";

interface Props {
  buckets: Bucket[];
  onDelete: (id: string) => void;
  onEmpty?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  loadDetails?: (bucketName: string) => Promise<void>;
  isLoading?: boolean;
}

export default function BucketGrid({ 
  buckets, 
  onDelete,
  onEmpty,
  onViewDetails,
  loadDetails,
  isLoading
}: Props) {
  // This is a wrapper around the refactored component to maintain backwards compatibility
  return (
    <BucketGridNew 
      buckets={buckets} 
      onDelete={onDelete}
      onEmpty={onEmpty}
      onViewDetails={onViewDetails}
      loadDetails={loadDetails}
      isLoading={isLoading}
    />
  );
}
