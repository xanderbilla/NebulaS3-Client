"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useCreateBucket } from "@/hooks/useBuckets";
import { toast } from "sonner";

interface CreateBucketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateBucket?: (bucketName: string, region: string) => void;
}

const regions = [
  { value: "ap-south-1", label: "AP-SOUTH-1" },
  { value: "us-east-1", label: "US-EAST-1" },
];

export default function CreateBucketDialog({
  open,
  onOpenChange,
  onCreateBucket,
}: Readonly<CreateBucketDialogProps>) {
  const [bucketName, setBucketName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("ap-south-1");
  const { mutate: createBucket, isPending } = useCreateBucket();

  const handleCreate = async () => {
    if (!bucketName.trim()) return;

    createBucket(bucketName.trim(), {
      onSuccess: (data) => {
        // Show success toast with API message
        toast.success(data.message ?? "Bucket created successfully");

        // Call the prop callback if provided
        if (onCreateBucket) {
          onCreateBucket(bucketName.trim(), selectedRegion);
        }
        // Reset form
        setBucketName("");
        setSelectedRegion("ap-south-1");
        onOpenChange(false);
      },
      onError: (error: unknown) => {
        // Extract error message from API response
        let errorMessage = "Failed to create bucket";
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

        toast.error("Create Failed", {
          description: errorMessage,
          duration: 5000,
        });
      },
    });
  };

  const handleCancel = () => {
    setBucketName("");
    setSelectedRegion("ap-south-1");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card backdrop-blur-3xl backdrop-saturate-200 border border-white/20 dark:border-white/10 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl glass-card-title flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Create New Bucket
          </DialogTitle>
          <DialogDescription className="glass-card-description">
            Enter a unique bucket name and select a region to create your new S3
            bucket.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="bucket-name"
              className="text-sm font-medium glass-card-title"
            >
              Bucket Name
            </Label>
            <Input
              id="bucket-name"
              placeholder="my-awesome-bucket"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              className="glass-card border-white/30 dark:border-white/10 focus:border-blue-400 dark:focus:border-blue-400"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Bucket names must be globally unique and follow AWS naming
              conventions.
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="region"
              className="text-sm font-medium glass-card-title"
            >
              Region
            </Label>
            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
              disabled={true} // Disabled as requested
            >
              <SelectTrigger className="glass-card border-white/30 dark:border-white/10 opacity-60">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent className="glass-card backdrop-blur-xl border-white/20 dark:border-white/10">
                {regions.map((region) => (
                  <SelectItem
                    key={region.value}
                    value={region.value}
                    className="glass-card-hover"
                  >
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Region selection is currently disabled. Default: AP-SOUTH-1
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
            className="glass-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!bucketName.trim() || isPending}
            className="glass-button bg-blue-500/80 hover:bg-blue-600/80 text-white border-blue-400/30"
          >
            {isPending ? "Creating..." : "Create Bucket"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
