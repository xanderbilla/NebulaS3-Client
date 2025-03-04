export interface Bucket {
  bucketName: string;
  size: string;
  createdOn: Date;
  region: string;
  files: number;
  folders: number;
  isPublic: boolean;
}