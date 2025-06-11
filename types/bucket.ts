export interface Bucket {
  id?: string;
  bucketName: string;
  region?: string;
  createdOn: string | Date;
  size?: string;
  numberOfFolders?: number;
  numberOfObjects?: number;
  lastUsed?: string | Date;
  versioningEnabled?: boolean;
  storageClass?: string;
}