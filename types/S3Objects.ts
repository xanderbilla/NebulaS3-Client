interface S3File {
  name: string;
  location: string;
  size: string;
  lastModified: string;
  extension: string;
  etag: string;
  type: "document" | "compressed" | "image" | "audio" | "video" | "unknown";
}

interface S3Folder {
  name: string;
  location: string;
  type: "folder";
  itemCount: number;
  folders: S3Folder[];
  files: S3File[];
}

interface S3Root {
  name: string;
  location: string;
  type: "folder";
  itemCount: number;
  folders: S3Folder[];
  files: S3File[];
}

export type { S3File, S3Folder, S3Root };
