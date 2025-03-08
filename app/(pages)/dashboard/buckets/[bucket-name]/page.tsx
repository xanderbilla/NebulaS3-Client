"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Check, ChevronsUpDown } from "lucide-react";
import dynamic from "next/dynamic";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { S3File, S3Root } from "@/types/S3Objects";

type FileType =
  | "document"
  | "compressed"
  | "image"
  | "audio"
  | "video"
  | "unknown"
  | "folder";

const mockFileData: S3Root = {
  folders: [
    {
      folders: [],
      name: "compressed",
      files: [
        {
          extension: "rar",
          etag: '"dd9bb762731449c0e06a2c869b739db1"',
          size: "1.56 MB",
          type: "compressed",
          name: "lab.rar",
          location: "compressed/lab.rar",
          lastModified: "2025-03-08T05:15:12Z",
        },
      ],
      location: "compressed/",
      type: "folder",
      itemCount: 1,
    },
    {
      folders: [],
      name: "documents",
      files: [
        {
          extension: "pdf",
          etag: '"52e419c0508aaeea9213f513b84e8d73"',
          size: "9.17 KB",
          type: "document",
          name: "rptTimeTableStudent.pdf",
          location: "documents/rptTimeTableStudent.pdf",
          lastModified: "2025-03-08T05:15:11Z",
        },
      ],
      location: "documents/",
      type: "folder",
      itemCount: 1,
    },
    {
      folders: [],
      name: "videos",
      files: [
        {
          extension: "mp4",
          etag: '"447b7f6a669fc87a1e5c1d506474a7cb"',
          size: "1.12 MB",
          type: "video",
          name: "VID_4556446.mp4",
          location: "videos/VID_4556446.mp4",
          lastModified: "2025-03-08T05:15:12Z",
        },
        {
          extension: "mp4",
          etag: '"4aa28625598a7adfb7ec3fef5e44453b-2"',
          size: "31.48 MB",
          type: "video",
          name: "VID_5468553.mp4",
          location: "videos/VID_5468553.mp4",
          lastModified: "2025-03-08T05:15:11Z",
        },
      ],
      location: "videos/",
      type: "folder",
      itemCount: 2,
    },
  ],
  name: "root",
  files: [
    {
      extension: "jpg",
      etag: '"8aa445cbeca5119ec77c4e4bb760e12e"',
      size: "130.04 KB",
      type: "image",
      name: "IMG_2135545.jpg",
      location: "IMG_2135545.jpg",
      lastModified: "2025-03-08T05:15:13Z",
    },
    {
      extension: "jpg",
      etag: '"3ee4b3bb7fe145c77a883db5b201a172"',
      size: "93.66 KB",
      type: "image",
      name: "IMG_2135546.jpg",
      location: "IMG_2135546.jpg",
      lastModified: "2025-03-08T05:15:13Z",
    },
  ],
  location: "",
  type: "folder",
  itemCount: 5,
};

const fileTypes = [
  { value: "all", label: "All Files" },
  { value: "document", label: "Documents" },
  { value: "compressed", label: "Compressed" },
  { value: "image", label: "Images" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "folder", label: "Folders" },
];

const Files = dynamic(() => import("@/components/files-component/files"));
const SearchBar = dynamic(() => import("@/components/bucket-component/search"));
const FilterButtons = dynamic(
  () => import("@/components/bucket-component/filter")
);

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<
    "size" | "date" | null
  >(null);
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("all");

  const filteredAndSortedData = React.useMemo(() => {
    const filterItems = (items: S3File[] | S3Root["folders"]) => {
      return items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
  
    let filteredFiles = filterItems(mockFileData.files);
    const filteredFolders = filterItems(mockFileData.folders);
  
    // Apply type filter
    if (selectedType !== "all") {
      filteredFiles = filteredFiles.filter((file) => file.type === selectedType);
    }
  
    // Apply date or size filter only to files
    if (activeFilter === "date") {
      filteredFiles = [...filteredFiles].sort((a, b) => {
        if ('lastModified' in a && 'lastModified' in b) {
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        }
        return 0;
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
        if ('size' in a && 'size' in b) {
          return convertToBytes(b.size) - convertToBytes(a.size);
        }
        return 0;
      });
    }
  
    return {
      files: filteredFiles,
      folders: filteredFolders,
    };
  }, [searchTerm, activeFilter, selectedType]);
  

  
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full sm:w-[150px] justify-between dark:bg-gray-800 dark:text-gray-100"
              >
                {fileTypes.find((type) => type.value === selectedType)?.label}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0 dark:bg-gray-800 dark:border-gray-700">
              <Command className="dark:bg-gray-800">
                <CommandInput
                  placeholder="File Type"
                  className="dark:bg-gray-800 dark:text-gray-300"
                />
                <CommandList>
                  <CommandEmpty className="dark:text-gray-500">
                    No results found.
                  </CommandEmpty>
                  <CommandGroup>
                    {fileTypes.map((type) => (
                      <CommandItem
                        key={type.value}
                        value={type.value}
                        onSelect={(currentValue) => {
                          setSelectedType(currentValue);
                          setOpen(false);
                        }}
                        className="dark:text-gray-100 dark:hover:bg-gray-700"
                      >
                        {type.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedType === type.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            variant="default"
            name="Upload"
            className="w-12 h-12 sm:w-auto sm:h-auto rounded-full sm:rounded-md fixed sm:static bottom-4 right-4 z-50 p-0 sm:p-2 bg-primary hover:bg-primary/90 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
          >
            <Upload className="sm:hidden" />
            <Upload className="hidden sm:block" />
            <span className="hidden sm:inline mx-2">Upload</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center md:justify-normal">
        {filteredAndSortedData.folders.map((folder) => (
          <Files key={folder.name} data={folder} type="folder" />
        ))}
        {filteredAndSortedData.files.map((file) => (
          <Files key={file.name} data={file} type={file.type as FileType} />
        ))}
      </div>
    </div>
  );
}
