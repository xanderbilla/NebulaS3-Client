export type FileType =
  | "document"
  | "compressed"
  | "image"
  | "audio"
  | "video"
  | "unknown"
  | "folder";

export type FilterType = "size" | "date" | null;

export interface FileTypeOption {
  value: string;
  label: string;
}

export const FILE_TYPES: FileTypeOption[] = [
  { value: "all", label: "All Files" },
  { value: "document", label: "Documents" },
  { value: "compressed", label: "Compressed" },
  { value: "image", label: "Images" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "folder", label: "Folders" },
];
