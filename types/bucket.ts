import {
  ApiResponse,
  PaginationParams,
  FilterParams,
  PaginatedResponse,
} from "./api";

// Core Bucket Interface
export interface Bucket {
  id: string;
  bucketName: string;
  region: string;
  createdOn: string | Date;
  size: string;
  numberOfFolders: number;
  numberOfObjects: number;
  lastUsed: string | Date | null;
  versioningEnabled: boolean;
  storageClass: string;
}

// Query Parameters
export interface BucketListParams extends PaginationParams, FilterParams {
  sortBy?: "createdAt" | "lastUpdated" | "size";
  storageClass?: string;
  versioningEnabled?: boolean;
}

// Applied Filters (matches API response structure)
export interface BucketAppliedFilters {
  sortOrder: string;
  sortBy: string;
  search: string | null;
  storageClass: string | null;
  versioningEnabled: boolean | null;
  [key: string]: string | number | boolean | null;
}

// Bucket List Response Data
export interface BucketListData extends Omit<PaginatedResponse<Bucket>, 'appliedFilters'> {
  appliedFilters: BucketAppliedFilters;
}

// API Response Types
export type BucketListResponse = ApiResponse<BucketListData>;
