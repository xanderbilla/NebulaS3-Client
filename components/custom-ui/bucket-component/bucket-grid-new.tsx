"use client";

import { useState } from "react";
import { Eye, Trash2, TrashIcon } from "lucide-react";
import { BoxIcon } from "lucide-react";
import ActionMenu, { ActionItem } from "@/components/layout/ActionMenu";
import ConfirmDialog from "@/components/layout/ConfirmDialog";
import ItemCard from "@/components/layout/ItemCard";
import { CardBadge } from "@/types/item-card";
import type { Bucket } from "@/types/bucket";

export interface BucketGridNewProps {
  buckets: Bucket[];
  onDelete: (id: string) => void;
  onEmpty?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  loadDetails?: (bucketName: string) => Promise<void>;
  isLoading?: boolean;
  className?: string;
  gridClassName?: string;
}

export default function BucketGridNew({
  buckets,
  onDelete,
  onEmpty,
  onViewDetails,
  loadDetails,
  isLoading = false,
  className = "",
  gridClassName = "",
}: BucketGridNewProps) {
  const [bucketToDelete, setBucketToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (bucketToDelete) {
      onDelete(bucketToDelete);
      setBucketToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ${gridClassName}`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[150px] glass-card animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <ConfirmDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this bucket? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Yes, Delete"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ${gridClassName}`}
      >
        {buckets.map((bucket) => {
          // Create a unique ID if not provided
          const bucketId = bucket.id || bucket.bucketName;
          
          // Create badges for region and size
          const badges: CardBadge[] = [];
          
          if (bucket.region) {
            badges.push({ label: bucket.region, color: "green" });
          }
          
          if (bucket.size) {
            badges.push({ label: bucket.size, color: "blue" });
          }

          // Build action menu items
          const actionItems: ActionItem[] = [
            {
              icon: <Eye className="h-4 w-4" />,
              label: "View Details",
              onClick: () => {
                if (loadDetails) {
                  loadDetails(bucket.bucketName);
                } else if (onViewDetails) {
                  onViewDetails(bucketId);
                }
              },
            },
          ];

          if (onEmpty) {
            actionItems.push({
              icon: <TrashIcon className="h-4 w-4" />,
              label: "Empty Bucket",
              onClick: () => onEmpty(bucketId),
            });
          }

          actionItems.push({
            icon: <Trash2 className="h-4 w-4" />,
            label: "Delete Bucket",
            danger: true,
            onClick: () => {
              setBucketToDelete(bucketId);
              setDialogOpen(true);
            },
          });

          // Convert date string to Date object if needed
          const createdDate = typeof bucket.createdOn === 'string' 
            ? new Date(bucket.createdOn) 
            : bucket.createdOn;

          return (
            <ItemCard
              key={bucketId}
              title={bucket.bucketName}
              linkHref={`/buckets/${bucket.bucketName}`}
              icon={<BoxIcon className="h-5 w-5 glass-text opacity-60" />}
              badges={badges}
              date={createdDate}
              actions={<ActionMenu items={actionItems} />}
            />
          );
        })}
      </div>
    </div>
  );
}
