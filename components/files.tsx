import React, { useState, useEffect } from "react";
import { s3Service } from "@/services/s3.service";
import { S3Object } from "@/types/api";
import { MediaPreview } from "./media-preview";

interface FilesProps {
  bucketName: string;
  prefix?: string;
}

export const Files: React.FC<FilesProps> = ({ bucketName, prefix = "" }) => {
  const [objects, setObjects] = useState<S3Object[]>([]);
  const [selectedObject, setSelectedObject] = useState<S3Object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await s3Service.listObjects({
          bucketName,
          objectPrefix: prefix,
        });
        setObjects(response.objects);
      } catch (err) {
        console.error("Error fetching objects:", err);
        setError(err instanceof Error ? err.message : "Failed to load files");
      } finally {
        setIsLoading(false);
      }
    };

    fetchObjects();
  }, [bucketName, prefix]);

  const handleFileClick = (object: S3Object) => {
    setSelectedObject(object);
  };

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

  return (
    <div className="flex h-full">
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Files</h2>
        <div className="space-y-2">
          {objects.map((object) => (
            <div
              key={object.key}
              className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                selectedObject?.key === object.key ? "bg-gray-200" : ""
              }`}
              onClick={() => handleFileClick(object)}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  {object.key.endsWith("/") ? "📁" : "📄"}
                </span>
                <span>{object.key}</span>
              </div>
              <div className="text-sm text-gray-500">
                Size: {Math.round(object.size / 1024)} KB
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4 border-l">
        {selectedObject ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">{selectedObject.key}</h3>
            <div className="h-[calc(100vh-200px)]">
              <MediaPreview object={selectedObject} bucketName={bucketName} />
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a file to preview</div>
        )}
      </div>
    </div>
  );
};
