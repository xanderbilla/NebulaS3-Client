import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BucketHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="space-y-1">
        {" "}
        <h2 className="text-2xl font-bold tracking-tight glass-text">
          Buckets
        </h2>
        <p className="text-sm glass-card-description">
          Manage your S3 buckets and their contents
        </p>
      </div>
      <Button size="sm" className="w-full md:w-auto">
        <Plus className="mr-2 h-4 w-4" />
        Create Bucket
      </Button>
    </div>
  );
}
