import React, { useState, useEffect } from "react";
import { s3Service } from "@/services/s3.service";
import { S3Object } from "@/types/api";
import Image from "next/image";

interface MediaPreviewProps {
  object: S3Object;
  bucketName: string;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  object,
  bucketName,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = await s3Service.getPresignedUrl(bucketName, object.key);
        setPreviewUrl(url);
        console.log("Preview URL:", url);
      } catch (err) {
        console.error("Error fetching preview URL:", err);
        setError(err instanceof Error ? err.message : "Failed to load preview");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreviewUrl();
  }, [object.key, bucketName]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!previewUrl) {
    return (
      <div className="p-4 text-gray-500">
        <p>No preview available</p>
      </div>
    );
  }

  const fileType = object.key.split(".").pop()?.toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
    fileType || ""
  );
  const isVideo = ["mp4", "webm", "ogg"].includes(fileType || "");

  return (
    <div className="w-full h-full">
      {isImage && (
        <Image
          src={previewUrl}
          alt={object.key}
          className="max-w-full max-h-full object-contain"
          onError={() => setError("Failed to load image")}
        />
      )}
      {isVideo && (
        <video
          controls
          className="max-w-full max-h-full"
          onError={() => setError("Failed to load video")}
        >
          <source src={previewUrl} type={`video/${fileType}`} />
          Your browser does not support the video tag.
        </video>
      )}
      {!isImage && !isVideo && (
        <div className="p-4 text-gray-500">
          <p>Preview not available for this file type</p>
        </div>
      )}
    </div>
  );
};
