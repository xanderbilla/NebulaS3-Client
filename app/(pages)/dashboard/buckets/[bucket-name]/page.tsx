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
import Image from "next/image";

type FileType =
  | "document"
  | "compressed"
  | "image"
  | "audio"
  | "video"
  | "folder";

interface MockFile {
  title: string;
  size?: string;
  itemCount?: number;
  type: FileType;
  createdAt: Date;
}

const mockFileData: MockFile[] = [
  {
    title: "Explorer.docx",
    size: "2.1GB",
    type: "document",
    createdAt: new Date("2024-01-14"),
  },
  {
    title: "Movies",
    itemCount: 5,
    type: "folder",
    size: "5.1GB",
    createdAt: new Date("2024-01-13"),
  },
  {
    title: "Never Gonna Give You Up.mp3",
    size: "5.1MB",
    type: "audio",
    createdAt: new Date("2024-01-12"),
  },
  {
    title: "Rick Astley Video.mp4",
    size: "1.2GB",
    type: "video",
    createdAt: new Date("2024-01-11"),
  },
  {
    title: "1955772247.jpg",
    size: "1.8MB",
    type: "image",
    createdAt: new Date("2024-01-10"),
  },
  {
    title: "Rick Astley Archive.zip",
    size: "536MB",
    type: "compressed",
    createdAt: new Date("2024-01-09"),
  },
];

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

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFile(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const filteredAndSortedData = React.useMemo(() => {
    let filtered = mockFileData.filter((file) =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((file) => file.type === selectedType);
    }

    if (activeFilter === "date") {
      filtered = [...filtered].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } else if (activeFilter === "size") {
      const convertToBytes = (size: string | undefined) => {
        if (!size) return 0;
        const num = parseFloat(size);
        if (size.includes("GB")) return num * 1024 * 1024 * 1024;
        if (size.includes("MB")) return num * 1024 * 1024;
        if (size.includes("KB")) return num * 1024;
        return num;
      };
      filtered = [...filtered].sort((a, b) => {
        const sizeA = convertToBytes(a.size);
        const sizeB = convertToBytes(b.size);
        return sizeB - sizeA;
      });
    }

    return filtered;
  }, [searchTerm, activeFilter, selectedType]);

  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);

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
            title="Upload"
            className="w-12 h-12 sm:w-auto sm:h-auto rounded-full sm:rounded-md fixed sm:static bottom-4 right-4 z-50 p-0 sm:p-2 bg-primary hover:bg-primary/90 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
          >
            <Upload className="sm:hidden" />
            <Upload className="hidden sm:block" />
            <span className="hidden sm:inline mx-2">Upload</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center md:justify-normal">
        {filteredAndSortedData.map((file, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => setSelectedFile(file.title)}
          >
            <Files data={file} type={file.type} />
            {selectedFile === file.title && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/90 dark:bg-black/95 z-[9999]">
                <React.Fragment>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSelectedFile(null);
                      }
                    }}
                    className="absolute top-8 right-8 bg-white/50 hover:bg-white/75 dark:bg-gray-800/50 dark:hover:bg-gray-800/75 border-0 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Button>
                  {selectedFile && (
                    <div
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setSelectedFile(null);
                        }
                      }}
                      className="focus:outline-none"
                    />
                  )}
                </React.Fragment>
                <div className="relative">
                  {file.type === "image" ? (
                    <Image
                      width={500}
                      height={500}
                      src={`/files/${file.title}`}
                      alt={file.title}
                      className="max-w-xl max-h-[80vh] object-contain"
                    />
                  ) : file.type === "video" ? (
                    <video controls className="max-w-xl max-h-[80vh]">
                      <source src={`/files/${file.title}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="bg-black dark:bg-gray-800 text-white px-4 py-2 rounded max-w-xl text-center">
                      {file.title}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedFile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
}
