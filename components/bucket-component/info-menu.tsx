import { Bucket } from "@/types/bucket";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, Info } from "lucide-react";
import { toast } from "sonner";
import { deleteBucket } from "@/services/bucketService";

interface InfoMenuProps {
  bucket: Bucket;
  onBucketDelete: () => void;
}

export function InfoMenu({ bucket, onBucketDelete }: InfoMenuProps) {
  const handleDelete = async () => {
    try {
      const res = await deleteBucket(bucket.bucketName);
      onBucketDelete();
      toast.success(res.message);
    } catch (err) {
      console.log("Error deleting bucket:", err);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer transition-colors duration-200" />
      </SheetTrigger>
      <SheetContent className="dark:bg-gray-900/95 backdrop-blur-sm border-gray-800 overflow-y-auto max-h-screen">
        <SheetHeader className="w-full space-y-3">
          <SheetTitle className="dark:text-gray-100 text-xl font-bold">
            Bucket Information
          </SheetTitle>
          <SheetDescription className="dark:text-gray-400 text-sm">
            View and manage your bucket details and settings
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Info Section */}
          <div className="space-y-4 rounded-lg bg-gray-800/30 p-4">
            <h3 className="text-base font-medium dark:text-gray-300 mb-3">
              Basic Information
            </h3>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label
                htmlFor="Bucket"
                className="text-right dark:text-gray-400 text-sm"
                >
                Bucket
                </Label>
                <div className="col-span-3 w-48 overflow-hidden">
                <span 
                  className="inline-block truncate dark:text-gray-200 text-sm font-medium hover:animate-marquee hover:whitespace-nowrap"
                >
                  {bucket.bucketName}
                </span>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="region"
                className="text-right dark:text-gray-400 text-sm"
              >
                Region
              </Label>
              <span className="col-span-3 dark:text-gray-200 text-sm">
                {bucket.region.toUpperCase() || "N/A"}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="visibility"
                className="text-right dark:text-gray-400 text-sm"
              >
                Visibility
              </Label>
              <span className="col-span-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    bucket.isPublic
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {bucket.isPublic ? "Public" : "Private"}
                </span>
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-4 rounded-lg bg-gray-800/30 p-4">
            <h3 className="text-base font-medium dark:text-gray-300 mb-3">
              Storage Statistics
            </h3>
            <div className="flex flex-col gap-4 items-center">
              <div className="w-full space-y-3 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 flex gap-4 justify-between items-center">
                <div className="p-2.5 rounded-full bg-purple-500/20">
                  <svg
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Total Size</p>
                  <p className="dark:text-gray-200 font-medium text-base">
                    {bucket.size || "0 B"}
                  </p>
                </div>
              </div>
              <div className="w-full space-y-3 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 flex gap-4 justify-between items-center">
                <div className="p-2.5 rounded-full bg-blue-500/20">
                  <svg
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Files</p>
                  <p className="dark:text-gray-200 font-medium text-base">
                    {bucket.files || 0}
                  </p>
                </div>
              </div>
              <div className="w-full space-y-3 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 flex gap-4 justify-between items-center">
                <div className="p-2.5 rounded-full bg-green-500/20">
                  <svg
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Folders</p>
                  <p className="dark:text-gray-200 font-medium text-base">
                    {bucket.folders || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Creation Info */}
          <div className="space-y-4 rounded-lg bg-gray-800/30 p-4">
            <h3 className="text-base font-medium dark:text-gray-300 mb-3">
              Creation Details
            </h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Created On</p>
                <p className="dark:text-gray-200 text-sm">
                  {new Date(bucket.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 flex sm:flex-row sm:justify-end gap-3">
          <Button
            variant="destructive"
            className="w-full sm:w-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors duration-200"
            onClick={handleDelete}
          >
            Delete Bucket
          </Button>
          <SheetClose asChild>
            <Button
              type="button"
              className="w-full sm:w-auto bg-gray-700/50 hover:bg-gray-700/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 dark:text-gray-300 transition-colors duration-200"
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
