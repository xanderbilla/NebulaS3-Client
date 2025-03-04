import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBucket } from "@/services/bucketService";

interface CreateBucketProps {
  onBucketCreated: () => void;
}
export const CreateBucket: React.FC<CreateBucketProps> = ({
  onBucketCreated,
}) => {
  const [bucketName, setBucketName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateBucketName = (name: string) => /^[a-zA-Z0-9-]+$/.test(name);

  const handleSubmit = async () => {
    if (!validateBucketName(bucketName)) {
      toast.error("Invalid bucket name. Use only letters, numbers, and '-'.");
      return;
    }

    setIsLoading(true);
    try {
      await createBucket(bucketName);
      toast.success("Bucket created successfully!");
      setIsDialogOpen(false);
      setBucketName("");
      onBucketCreated();
    } catch (err) {
      console.error("Bucket creation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          title="Create Bucket"
          className="bg-primary hover:bg-primary/90 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
        >
          Create Bucket
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Create a New Bucket
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Enter a unique bucket name.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="bucket-name" className="dark:text-gray-300">
          Bucket Name
        </Label>
        <Input
          id="bucket-name"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white transition-colors"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
