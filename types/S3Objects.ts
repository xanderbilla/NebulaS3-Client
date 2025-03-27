export interface S3File {
  extension: string;
  size: string;
  etag: string;
  lastModified: string;
  key: string;
  fileType: string;
  name?: string;
  type?: string;
}

export interface S3Folder {
  etag: string | null;
  lastModified: string | null;
  key: string;
  itemCount?: number;
}

export interface S3Root {
  filesCount: number;
  folders: S3Folder[];
  files: S3File[];
  currentFolder: string;
  etag: string | null;
  lastModified: string | null;
  foldersCount: number;
}
