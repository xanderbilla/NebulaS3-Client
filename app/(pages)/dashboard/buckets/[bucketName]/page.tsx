"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import dynamic from "next/dynamic";
import { S3File, S3Folder, S3Root } from "@/types/S3Objects";
import Breadcrumb from "@/components/bucket-component/breadcrumb";
import LoadingSkeleton from "@/components/bucket-component/loading-skeleton";
import FileTypeFilter from "@/components/bucket-component/file-type-filter";
import { s3Service } from "@/services/s3.service";

type FileType =
  | "document"
  | "compressed"
  | "image"
  | "audio"
  | "video"
  | "unknown"
  | "folder";

const Files = dynamic(() => import("@/components/files-component/files"));
const SearchBar = dynamic(() => import("@/components/bucket-component/search"));
const FilterButtons = dynamic(
  () => import("@/components/bucket-component/filter")
);

interface PageProps {
  params: Promise<{
    bucketName: string;
  }>;
}

interface FileData {
  name: string;
  itemCount?: number;
  size?: string;
  extension?: string;
  key?: string;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<
    "size" | "date" | null
  >(null);
  const [selectedType, setSelectedType] = React.useState("all");
  const [currentPath, setCurrentPath] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [fileData, setFileData] = React.useState<S3Root | null>(null);

  const fetchFiles = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await s3Service.listObjects({
        bucketName: resolvedParams.bucketName,
        objectPrefix: currentPath,
      });

      setFileData(response.data);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Error fetching files:", err);
        setError(err.message || "Failed to fetch files");
      }
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams.bucketName, currentPath]);

  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  React.useEffect(() => {
    return () => {
      s3Service.cancelAllRequests();
    };
  }, []);

  const handleFolderClick = (folder: S3Folder) => {
    setCurrentPath(folder.key);
  };

  const filteredAndSortedData = React.useMemo(() => {
    if (!fileData) return { files: [], folders: [] };

    const filterFiles = (files: S3File[] = []) => {
      return files.filter((file) => {
        const fileName = file.key.split("/").pop() || "";
        return fileName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };

    const filterFolders = (folders: S3Folder[] = []) => {
      return folders.filter((folder) => {
        const folderName = folder.key.replace(/\/$/, "");
        return folderName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };

    let filteredFiles = filterFiles(fileData.files || []);
    const filteredFolders = filterFolders(fileData.folders || []);

    if (selectedType !== "all") {
      filteredFiles = filteredFiles.filter(
        (file) => file.fileType.toLowerCase() === selectedType
      );
    }

    if (activeFilter === "date") {
      filteredFiles = [...filteredFiles].sort((a, b) => {
        return (
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
        );
      });
    } else if (activeFilter === "size") {
      const convertToBytes = (size: string) => {
        const num = parseFloat(size);
        if (size.includes("GB")) return num * 1024 * 1024 * 1024;
        if (size.includes("MB")) return num * 1024 * 1024;
        if (size.includes("KB")) return num * 1024;
        return num;
      };
      filteredFiles = [...filteredFiles].sort((a, b) => {
        return convertToBytes(b.size) - convertToBytes(a.size);
      });
    }

    return {
      files: filteredFiles,
      folders: filteredFolders,
    };
  }, [fileData, searchTerm, activeFilter, selectedType]);

  const mapS3FileToFileData = (file: S3File): FileData => ({
    name: file.key.split("/").pop() || "",
    size: file.size,
    extension: file.extension,
    key: file.key,
  });

  const mapS3FolderToFileData = (folder: S3Folder): FileData => ({
    name: folder.key.replace(/\/$/, ""),
    itemCount: 0,
    key: folder.key,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-red-500 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <div className="w-full sm:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex flex-row gap-2 sm:gap-4">
          <FilterButtons
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <FileTypeFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <Button
            variant="default"
            name="Upload"
            className="w-12 h-12 sm:w-auto sm:h-auto rounded-full sm:rounded-md fixed sm:static bottom-4 right-4 z-50 p-0 sm:p-2"
          >
            <Upload className="sm:hidden" />
            <Upload className="hidden sm:block" />
            <span className="hidden sm:inline mx-2">Upload</span>
          </Button>
        </div>
      </div>

      <Breadcrumb currentPath={currentPath} setCurrentPath={setCurrentPath} />

      <div className="relative">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex flex-wrap gap-6">
            {filteredAndSortedData.folders.map((folder) => (
              <div key={folder.key} className="w-[160px] h-[160px]">
                <Files
                  data={mapS3FolderToFileData(folder)}
                  type="folder"
                  onClick={() => handleFolderClick(folder)}
                />
              </div>
            ))}
            {filteredAndSortedData.files.map((file) => (
              <div key={file.key} className="w-[160px] h-[160px]">
                <Files
                  data={mapS3FileToFileData(file)}
                  type={file.fileType.toLowerCase() as FileType}
                  bucketName={resolvedParams.bucketName}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
