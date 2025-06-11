"use client";

import { useState } from "react";
import { Eye, Trash2, TrashIcon, BoxIcon } from "lucide-react";
import ActionMenu, { ActionItem } from "@/components/layout/ActionMenu";
import ConfirmDialog from "@/components/layout/ConfirmDialog";
import ItemCard from "@/components/layout/ItemCard";
import { CardBadge } from "@/types/ui";
import type { Bucket } from "@/types/bucket";
import { useDeleteBucket, useEmptyBucket } from "@/hooks/useBuckets";
import BucketGridSkeleton from "@/components/custom-ui/skeleton/bucket-grid-skeleton";

export interface BucketGridProps {
  readonly buckets: Bucket[];
  readonly onDelete: (id: string) => void;
  readonly onEmpty?: (id: string) => void;
  readonly onViewDetails?: (id: string) => void;
  readonly loadDetails?: (bucketName: string) => Promise<void>;
  readonly isLoading?: boolean;
  readonly className?: string;
  readonly gridClassName?: string;
  // External filter state
  readonly externalSearchTerm?: string;
  readonly externalActiveFilter?: "size" | "date" | null;
  readonly externalSelectedRegion?: string | null;
}

export default function BucketGrid({
  buckets,
  onDelete,
  onEmpty,
  onViewDetails,
  loadDetails,
  isLoading = false,
  className = "",
  gridClassName = "",
  // External filter state (directly used, no internal state needed)
  externalSearchTerm = "",
  externalActiveFilter = null,
  externalSelectedRegion = null,
}: BucketGridProps) {
  const [bucketToDelete, setBucketToDelete] = useState<string | null>(null);
  const [bucketToEmpty, setBucketToEmpty] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [emptyDialogOpen, setEmptyDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // React Query mutations
  const deleteBucketMutation = useDeleteBucket();
  const emptyBucketMutation = useEmptyBucket();

  // Helper function to parse size for proper sorting
  const parseSize = (sizeStr: string): number => {
    const regex = /([0-9.]+)\s*(GB|MB|KB|B)/i;
    const match = regex.exec(sizeStr);

    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    switch (unit) {
      case "GB":
        return value * 1024 * 1024 * 1024;
      case "MB":
        return value * 1024 * 1024;
      case "KB":
        return value * 1024;
      case "B":
        return value;
      default:
        return 0;
    }
  };

  // Apply filters to buckets
  const filteredBuckets = buckets
    .filter((bucket) => {
      // Search term filter
      if (
        externalSearchTerm &&
        !bucket.bucketName
          .toLowerCase()
          .includes(externalSearchTerm.toLowerCase())
      ) {
        return false;
      }

      // Region filter
      if (
        externalSelectedRegion &&
        bucket.region.toUpperCase() !== externalSelectedRegion.toUpperCase()
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting based on active filter
      if (externalActiveFilter === "date") {
        const dateA = new Date(a.createdOn).getTime();
        const dateB = new Date(b.createdOn).getTime();
        return dateB - dateA; // newest first
      }

      if (externalActiveFilter === "size") {
        const sizeA = parseSize(a.size);
        const sizeB = parseSize(b.size);
        return sizeB - sizeA; // largest first
      }

      // Default sort by name
      return a.bucketName.localeCompare(b.bucketName);
    });

  const handleDelete = (bucketId: string): void => {
    setBucketToDelete(bucketId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (bucketToDelete) {
      try {
        await deleteBucketMutation.mutateAsync(bucketToDelete);
        onDelete(bucketToDelete);
      } catch (error) {
        console.error("Failed to delete bucket:", error);
      } finally {
        setDeleteDialogOpen(false);
        setBucketToDelete(null);
      }
    }
  };

  const handleEmpty = (bucketId: string): void => {
    setBucketToEmpty(bucketId);
    setEmptyDialogOpen(true);
  };

  const confirmEmpty = async (): Promise<void> => {
    if (bucketToEmpty && onEmpty) {
      try {
        await emptyBucketMutation.mutateAsync(bucketToEmpty);
        onEmpty(bucketToEmpty);
      } catch (error) {
        console.error("Failed to empty bucket:", error);
      } finally {
        setEmptyDialogOpen(false);
        setBucketToEmpty(null);
      }
    }
  };

  const handleViewDetails = (bucketId: string, bucketName: string): void => {
    if (onViewDetails) {
      setActionLoading(bucketId);
      // Using setTimeout to avoid the Promise return warning
      setTimeout(() => {
        if (loadDetails) {
          loadDetails(bucketName).finally(() => {
            onViewDetails(bucketId);
            setActionLoading(null);
          });
        } else {
          onViewDetails(bucketId);
          setActionLoading(null);
        }
      }, 0);
    }
  };

  const getActionItems = (bucket: Bucket): ActionItem[] => [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: () => handleViewDetails(bucket.id, bucket.bucketName),
      className:
        actionLoading === bucket.id ? "opacity-50 pointer-events-none" : "",
    },
    {
      label: "Empty Bucket",
      icon: <TrashIcon className="h-4 w-4" />,
      onClick: () => handleEmpty(bucket.id),
      className:
        actionLoading === bucket.id ||
        bucket.numberOfObjects === 0 ||
        emptyBucketMutation.isPending
          ? "opacity-50 pointer-events-none"
          : "",
    },
    {
      label: "Delete Bucket",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDelete(bucket.id),
      danger: true,
      className:
        actionLoading === bucket.id || deleteBucketMutation.isPending
          ? "opacity-50 pointer-events-none"
          : "",
    },
  ];

  const getBadges = (bucket: Bucket): CardBadge[] => {
    const badges: CardBadge[] = [
      {
        label: bucket.region.toUpperCase(),
        color: "blue",
      },
    ];

    return badges;
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="text-center py-12 mt-6">
      <BoxIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground mb-2">
        {externalSearchTerm || externalSelectedRegion
          ? "No matching buckets found"
          : "No buckets found"}
      </h3>
      <p className="text-sm text-muted-foreground">
        {externalSearchTerm || externalSelectedRegion
          ? "Try adjusting your filters"
          : "Create your first S3 bucket to get started."}
      </p>
    </div>
  );

  // Render bucket grid
  const renderBucketGrid = () => (
    <div
      className={`grid gap-4 mt-6 ${gridClassName} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
    >
      {filteredBuckets.map((bucket) => {
        const createdDate = new Date(bucket.createdOn);

        return (
          <ItemCard
            key={bucket.id}
            title={bucket.bucketName}
            linkHref={`/buckets/${bucket.bucketName}`}
            icon={<BoxIcon className="h-5 w-5 glass-text opacity-60" />}
            description={`${bucket.size} • ${bucket.numberOfObjects} files`}
            badges={getBadges(bucket)}
            date={createdDate}
            dateFormat={{
              year: "numeric",
              month: "short",
              day: "numeric",
            }}
            actions={<ActionMenu items={getActionItems(bucket)} />}
            className={actionLoading === bucket.id ? "opacity-70" : ""}
          />
        );
      })}
    </div>
  );

  return (
    <div className={className}>
      {isLoading ? (
        <BucketGridSkeleton count={8} />
      ) : (
        <>
          {filteredBuckets.length === 0 && renderEmptyState()}
          {filteredBuckets.length > 0 && renderBucketGrid()}
        </>
      )}

      {/* Delete Bucket Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Bucket"
        description={
          bucketToDelete
            ? `Are you sure you want to delete "${
                buckets.find((b) => b.id === bucketToDelete)?.bucketName
              }"? This action cannot be undone.`
            : "Are you sure you want to delete this bucket?"
        }
        onConfirm={confirmDelete}
        variant="destructive"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Empty Bucket Confirmation Dialog */}
      <ConfirmDialog
        open={emptyDialogOpen}
        onOpenChange={setEmptyDialogOpen}
        title="Empty Bucket"
        description={
          bucketToEmpty
            ? `Are you sure you want to empty "${
                buckets.find((b) => b.id === bucketToEmpty)?.bucketName
              }"? All objects in this bucket will be permanently deleted.`
            : "Are you sure you want to empty this bucket?"
        }
        onConfirm={confirmEmpty}
        variant="destructive"
        confirmText="Empty Bucket"
        cancelText="Cancel"
      />
    </div>
  );
}
