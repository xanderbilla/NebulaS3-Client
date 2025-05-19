"use client";

import { Eye, Trash2, TrashIcon } from "lucide-react";
import { BoxIcon } from "lucide-react";
import { useState } from "react";
import ActionMenu, { ActionItem } from "@/components/layout/ActionMenu";
import ConfirmDialog from "@/components/layout/ConfirmDialog";
import ItemCard from "@/components/layout/ItemCard";
import { CardBadge } from "@/types/item-card";

import type { Bucket } from "@/types/bucket";
export interface BucketGridProps {
  buckets: Bucket[];
  onDelete: (id: string) => void;
  onEmpty?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
  gridClassName?: string;
}

export default function BucketGrid({
  buckets,
  onDelete,
  onEmpty,
  onViewDetails,
  className = "",
  gridClassName = "",
}: BucketGridProps) {
  const [bucketToDelete, setBucketToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (bucketToDelete) {
      onDelete(bucketToDelete);
      setBucketToDelete(null);
    }
  };

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
          // Create badges for region and size
          const badges: CardBadge[] = [
            { label: bucket.region || "N/A", color: "green" },
            { label: bucket.size, color: "blue" },
          ];

          // Build action menu items
          const actionItems: ActionItem[] = [
            {
              icon: <Eye className="h-4 w-4" />,
              label: "View Details",
              onClick: () => onViewDetails && onViewDetails(bucket.id),
            },
            {
              icon: <TrashIcon className="h-4 w-4" />,
              label: "Empty Bucket",
              onClick: () => onEmpty && onEmpty(bucket.id),
            },
            {
              icon: <Trash2 className="h-4 w-4" />,
              label: "Delete Bucket",
              danger: true,
              onClick: () => {
                setBucketToDelete(bucket.id);
                setDialogOpen(true);
              },
            },
          ];

          return (
            <ItemCard
              key={bucket.id}
              title={bucket.bucketName}
              linkHref={`/buckets/${bucket.bucketName}`}
              icon={<BoxIcon className="h-5 w-5 glass-text opacity-60" />}
              badges={badges}
              date={bucket.createdOn}
              actions={<ActionMenu items={actionItems} />}
            />
          );
        })}
      </div>
    </div>
  );
}
