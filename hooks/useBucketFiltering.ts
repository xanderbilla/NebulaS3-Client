import { useMemo } from "react";
import { Bucket } from "@/types/bucket";

interface UseBucketFilteringProps {
  buckets: Bucket[];
  searchTerm: string;
  activeFilter: "size" | "date" | null;
}

export function useBucketFiltering({
  buckets,
  searchTerm,
  activeFilter,
}: UseBucketFilteringProps) {
  const filteredBuckets = useMemo(() => {
    let data = [...buckets];

    // Apply search filter
    if (searchTerm) {
      data = data.filter((bucket) =>
        bucket.bucketName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (activeFilter === "size") {
      data = data.sort((a, b) => {
        const sizeToBytes = (size: string) => {
          const [value, unit] = size.split(" ");
          const numValue = parseFloat(value);
          switch (unit?.toUpperCase()) {
            case "KB":
              return numValue * 1024;
            case "MB":
              return numValue * 1024 * 1024;
            case "GB":
              return numValue * 1024 * 1024 * 1024;
            case "TB":
              return numValue * 1024 * 1024 * 1024 * 1024;
            default:
              return numValue;
          }
        };
        return sizeToBytes(b.size || "0") - sizeToBytes(a.size || "0");
      });
    } else if (activeFilter === "date") {
      data = data.sort(
        (a, b) =>
          new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    }

    return data;
  }, [buckets, searchTerm, activeFilter]);

  return filteredBuckets;
}
