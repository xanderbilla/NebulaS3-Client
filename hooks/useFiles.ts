import { useState, useEffect, useMemo } from "react";
import { FileType, FilterType } from "@/types/fileTypes";

interface File {
  name: string;
  type: FileType;
  size: number;
  lastModified: Date;
  path: string;
}

interface Folder {
  name: string;
  path: string;
}

interface UseFilesProps {
  bucketName: string;
  path?: string;
}

interface S3Object {
  name: string;
  type: FileType;
  size: number;
  lastModified: string;
  path: string;
}

export const useFiles = ({ bucketName, path = "" }: UseFilesProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [selectedType, setSelectedType] = useState<string>("all");

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8080/s3/list-objects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bucketName,
          prefix: path,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const data = (await response.json()) as { objects: S3Object[] };

      // Process files and folders from the response
      const newFiles: File[] = [];
      const newFolders: Folder[] = [];

      data.objects.forEach((obj: S3Object) => {
        if (obj.type === "folder") {
          newFolders.push({
            name: obj.name,
            path: obj.path,
          });
        } else {
          newFiles.push({
            name: obj.name,
            type: obj.type,
            size: obj.size,
            lastModified: new Date(obj.lastModified),
            path: obj.path,
          });
        }
      });

      setFiles(newFiles);
      setFolders(newFolders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [bucketName, path]);

  const filteredAndSortedData = useMemo(() => {
    let filteredFiles = [...files];
    let filteredFolders = [...folders];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredFiles = filteredFiles.filter((file) =>
        file.name.toLowerCase().includes(term)
      );
      filteredFolders = filteredFolders.filter((folder) =>
        folder.name.toLowerCase().includes(term)
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      filteredFiles = filteredFiles.filter(
        (file) => file.type === selectedType
      );
    }

    // Apply sorting
    if (activeFilter) {
      filteredFiles.sort((a, b) => {
        switch (activeFilter) {
          case "size":
            return b.size - a.size;
          case "date":
            return b.lastModified.getTime() - a.lastModified.getTime();
          default:
            return 0;
        }
      });
    }

    return {
      files: filteredFiles,
      folders: filteredFolders,
    };
  }, [files, folders, searchTerm, activeFilter, selectedType]);

  return {
    ...filteredAndSortedData,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    selectedType,
    setSelectedType,
    refresh: fetchFiles,
  };
};
