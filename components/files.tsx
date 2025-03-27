import React, { useState, useEffect } from "react";
import { s3Service } from "@/services/s3.service";
import { S3File, S3Folder } from "@/types/S3Objects";
import MediaPreview from "./files-component/media-preview";

interface FilesProps {
  bucketName: string;
  prefix?: string;
}

export const Files: React.FC<FilesProps> = ({ bucketName, prefix = "" }) => {
  const [files, setFiles] = useState<S3File[]>([]);
  const [folders, setFolders] = useState<S3Folder[]>([]);
  const [selectedFile, setSelectedFile] = useState<S3File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await s3Service.listObjects({
          bucketName,
          objectPrefix: prefix,
        });
        setFiles(response.data.files);
        setFolders(response.data.folders);
      } catch (err) {
        console.error("Error fetching objects:", err);
        setError(err instanceof Error ? err.message : "Failed to load files");
      } finally {
        setIsLoading(false);
      }
    };

    fetchObjects();
  }, [bucketName, prefix]);

  const handleFileClick = async (file: S3File) => {
    try {
      setSelectedFile(file);
      const url = await s3Service.getPresignedUrl(bucketName, file.key);
      setPreviewUrl(url);
    } catch (err) {
      console.error("Error getting presigned URL:", err);
      setError(err instanceof Error ? err.message : "Failed to load preview");
    }
  };

  const getFileType = (
    key: string
  ):
    | "document"
    | "compressed"
    | "image"
    | "audio"
    | "video"
    | "folder"
    | "unknown" => {
    if (key.endsWith("/")) return "folder";
    const ext = key.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext ?? ""))
      return "image";
    if (["mp4", "webm", "ogg"].includes(ext ?? "")) return "video";
    if (["mp3", "wav", "ogg"].includes(ext ?? "")) return "audio";
    if (["zip", "rar", "7z"].includes(ext ?? "")) return "compressed";
    if (["pdf", "doc", "docx", "txt"].includes(ext ?? "")) return "document";
    return "unknown";
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
          {folders.map((folder) => (
            <button
              key={folder.key}
              type="button"
              className="w-full text-left p-2 rounded cursor-pointer hover:bg-gray-100"
              aria-label={`Open folder ${folder.key}`}
            >
              <div className="flex items-center">
                <span className="mr-2">📁</span>
                <span>{folder.key}</span>
              </div>
              {folder.itemCount && (
                <div className="text-sm text-gray-500">
                  Items: {folder.itemCount}
                </div>
              )}
            </button>
          ))}
          {files.map((file) => (
            <button
              key={file.key}
              type="button"
              className={`w-full text-left p-2 rounded cursor-pointer hover:bg-gray-100 ${
                selectedFile?.key === file.key ? "bg-gray-200" : ""
              }`}
              onClick={() => handleFileClick(file)}
              aria-label={`Preview file ${file.key}`}
            >
              <div className="flex items-center">
                <span className="mr-2">📄</span>
                <span>{file.key}</span>
              </div>
              <div className="text-sm text-gray-500">Size: {file.size}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4 border-l">
        {selectedFile && previewUrl ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">{selectedFile.key}</h3>
            <div className="h-[calc(100vh-200px)]">
              <MediaPreview
                onClose={() => setPreviewUrl(null)}
                title={selectedFile.key}
                mediaUrl={previewUrl}
                type={getFileType(selectedFile.key)}
              />
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a file to preview</div>
        )}
      </div>
    </div>
  );
};
