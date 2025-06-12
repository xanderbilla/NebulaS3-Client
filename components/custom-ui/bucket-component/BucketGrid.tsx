"use client";

import { useState } from "react";
import { Eye, Trash2, TrashIcon, BoxIcon } from "lucide-react";
import { toast } from "sonner";
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
}: BucketGridProps) {
  const [bucketToDelete, setBucketToDelete] = useState<string | null>(null);
  const [bucketToEmpty, setBucketToEmpty] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [emptyDialogOpen, setEmptyDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // React Query mutations
  const deleteBucketMutation = useDeleteBucket();
  const emptyBucketMutation = useEmptyBucket();

  // Display buckets directly since filtering is handled server-side
  const displayBuckets = buckets;

  const handleDelete = (bucketId: string): void => {
    const bucket = buckets.find((b) => b.id === bucketId);
    if (!bucket) return;

    // Check if bucket has content and show warning
    // A bucket is considered non-empty if it has objects OR significant size
    const hasObjects = bucket.numberOfObjects > 0;
    const hasSize =
      bucket.size &&
      bucket.size !== "0 B" &&
      bucket.size !== "0B" &&
      bucket.size !== "0";

    if (hasObjects || hasSize) {
      toast.error("Cannot delete bucket with content", {
        description:
          "You can't delete a bucket with content. Please empty the bucket first.",
        duration: 5000,
      });
      return;
    }

    setBucketToDelete(bucket.bucketName); // Store bucket name instead of ID
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (bucketToDelete) {
      try {
        await deleteBucketMutation.mutateAsync(bucketToDelete);
        onDelete(bucketToDelete);
        toast.success(`Bucket "${bucketToDelete}" deleted successfully`);
      } catch (error) {
        // Extract error message from API response
        let errorMessage = "Failed to delete bucket";
        if (error && typeof error === "object") {
          const apiError = error as {
            response?: { data?: { message?: string } };
            message?: string;
          };
          if (apiError.response?.data?.message) {
            errorMessage = apiError.response.data.message;
          } else if (apiError.message) {
            errorMessage = apiError.message;
          }
        }

        toast.error("Delete Failed", {
          description: errorMessage,
          duration: 5000,
        });
      } finally {
        setDeleteDialogOpen(false);
        setBucketToDelete(null);
      }
    }
  };

  const handleEmpty = (bucketId: string): void => {
    const bucket = buckets.find((b) => b.id === bucketId);
    if (!bucket) return;

    // Check if bucket is already empty
    // A bucket is considered empty if it has no objects AND no significant size
    const hasObjects = bucket.numberOfObjects > 0;
    const hasSize =
      bucket.size &&
      bucket.size !== "0 B" &&
      bucket.size !== "0B" &&
      bucket.size !== "0";

    if (!hasObjects && !hasSize) {
      toast.info("Bucket is already empty", {
        description: "This bucket doesn't contain any objects.",
      });
      return;
    }

    setBucketToEmpty(bucket.bucketName); // Store bucket name instead of ID
    setEmptyDialogOpen(true);
  };

  const confirmEmpty = async (): Promise<void> => {
    if (bucketToEmpty && onEmpty) {
      try {
        await emptyBucketMutation.mutateAsync(bucketToEmpty);
        onEmpty(bucketToEmpty);
        toast.success(`Bucket "${bucketToEmpty}" emptied successfully`);
      } catch (error) {
        // Extract error message from API response
        let errorMessage = "Failed to empty bucket";
        if (error && typeof error === "object") {
          const apiError = error as {
            response?: { data?: { message?: string } };
            message?: string;
          };
          if (apiError.response?.data?.message) {
            errorMessage = apiError.response.data.message;
          } else if (apiError.message) {
            errorMessage = apiError.message;
          }
        }

        toast.error("Empty Failed", {
          description: errorMessage,
          duration: 5000,
        });
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

  const getActionItems = (bucket: Bucket): ActionItem[] => {
    // Determine if bucket is empty using the same logic as validation
    const hasObjects = bucket.numberOfObjects > 0;
    const hasSize =
      bucket.size &&
      bucket.size !== "0 B" &&
      bucket.size !== "0B" &&
      bucket.size !== "0";
    const isEmpty = !hasObjects && !hasSize;

    return [
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
          isEmpty ||
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
  };

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
        No buckets found
      </h3>
      <p className="text-sm text-muted-foreground">
        Create your first S3 bucket to get started.
      </p>
    </div>
  );

  // Render bucket grid
  const renderBucketGrid = () => (
    <div
      className={`grid gap-4 mt-6 ${gridClassName} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
    >
      {displayBuckets.map((bucket) => {
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
          {displayBuckets.length === 0 && renderEmptyState()}
          {displayBuckets.length > 0 && renderBucketGrid()}
        </>
      )}

      {/* Delete Bucket Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Bucket"
        description={
          bucketToDelete
            ? `Are you sure you want to delete "${bucketToDelete}"? This action cannot be undone.`
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
            ? `Are you sure you want to empty "${bucketToEmpty}"? All objects in this bucket will be permanently deleted.`
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
