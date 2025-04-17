import BucketGridRefactored from "./bucket-grid-refactored";
import type { Bucket } from "@/types/bucket";

interface Props {
  buckets: Bucket[];
  onDelete: (id: string) => void;
}

export default function BucketGrid({ buckets, onDelete }: Props) {
  // This is a wrapper around the refactored component to maintain backwards compatibility
  return <BucketGridRefactored buckets={buckets} onDelete={onDelete} />;
}
