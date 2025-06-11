"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import type { Bucket } from "@/types/bucket";
import BucketGridNew from "@/components/custom-ui/bucket-component/bucket-grid-new";
import { mockBuckets } from "@/static/buckets";

export default function TestPage() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [bucketDetails, setBucketDetails] = useState<Bucket | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Show welcome toast when component mounts
    toast({
      title: "S3 Bucket Test Page",
      description:
        "This page demonstrates the integration with hardcoded S3 bucket data.",
    });

    fetchBuckets();
  }, []);

  const fetchBuckets = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBuckets(mockBuckets);
      toast({
        title: "Success",
        description: `Loaded ${mockBuckets.length} buckets`,
        variant: "default",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch buckets";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBucketDetails = async (bucketName: string) => {
    setDetailsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Find the bucket details from mock data
      const bucket = mockBuckets.find((b) => b.bucketName === bucketName);
      if (bucket) {
        setBucketDetails({
          ...bucket,
          numberOfObjects: Math.floor(Math.random() * 1000) + 100,
          numberOfFolders: Math.floor(Math.random() * 50) + 10,
          versioningEnabled: Math.random() > 0.5,
          storageClass: ["STANDARD", "COLD", "GLACIER"][
            Math.floor(Math.random() * 3)
          ],
          lastUsed: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ), // Random date within last 30 days
        });
        setSelectedBucket(bucketName);
        toast({
          title: "Bucket Details Loaded",
          description: `Details for ${bucketName} retrieved successfully`,
          variant: "default",
        });
      } else {
        throw new Error("Bucket not found");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch bucket details";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error(err);
      setBucketDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    console.log(`Delete bucket with id: ${id}`);
    toast({
      title: "Delete Request",
      description: `Request to delete bucket with ID: ${id}`,
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {" "}
        <div>
          <h1 className="text-2xl font-bold">S3 Bucket Test Page</h1>
          <p className="text-sm text-gray-500">
            Using hardcoded S3 bucket data for demonstration
          </p>
        </div>
        <Button onClick={fetchBuckets} disabled={loading}>
          {loading ? "Loading..." : "Refresh Buckets"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Buckets List (JSON)</h2>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p>Loading buckets...</p>
              </div>
            ) : buckets.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p>No buckets found</p>
              </div>
            ) : (
              <div className="space-y-4">
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[300px]">
                  {JSON.stringify(buckets, null, 2)}
                </pre>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {buckets.map((bucket) => (
                    <Button
                      key={bucket.bucketName}
                      variant="outline"
                      className={
                        selectedBucket === bucket.bucketName
                          ? "bg-blue-100"
                          : ""
                      }
                      onClick={() => fetchBucketDetails(bucket.bucketName)}
                    >
                      {bucket.bucketName}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">
              Bucket Details (JSON)
            </h2>
            {!selectedBucket ? (
              <div className="h-[300px] flex items-center justify-center">
                <p>Select a bucket to view details</p>
              </div>
            ) : detailsLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p>Loading details...</p>
              </div>
            ) : bucketDetails ? (
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[300px]">
                {JSON.stringify(bucketDetails, null, 2)}
              </pre>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p>No details available</p>
              </div>
            )}
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Buckets Grid View</h2>
          <BucketGridNew
            buckets={buckets}
            onDelete={handleDelete}
            loadDetails={fetchBucketDetails}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
