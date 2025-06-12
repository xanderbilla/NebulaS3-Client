"use client";

import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBucketDialog from "./create-bucket-dialog";

interface BucketHeaderProps {
  onRefresh?: () => void;
  onCreateBucket?: (bucketName: string, region: string) => void;
  isLoading?: boolean;
}

export default function BucketHeader({
  onRefresh,
  onCreateBucket,
  isLoading = false,
}: BucketHeaderProps = {}) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreateBucket = (bucketName: string, region: string) => {
    if (onCreateBucket) {
      onCreateBucket(bucketName, region);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight glass-text">
            Buckets
          </h2>
          <p className="text-sm glass-card-description">
            Manage your S3 buckets and their contents
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {onRefresh && (
            <Button
              size="sm"
              variant="outline"
              className="w-full md:w-auto"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          )}
          <Button
            size="sm"
            className="w-full md:w-auto"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Bucket
          </Button>
        </div>
      </div>

      <CreateBucketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateBucket={handleCreateBucket}
      />
    </>
  );
}
