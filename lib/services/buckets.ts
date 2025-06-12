import { apiClient } from "@/lib/api-client";
import { BucketListParams, BucketListResponse } from "@/types/bucket";
import { ApiResponse } from "@/types/api";

// Request types for bucket operations
export interface CreateBucketRequest {
  bucketName: string;
  region: string;
}

export interface BucketOperationRequest {
  bucketName: string;
}

export const bucketService = {
  getBuckets: async (
    params?: BucketListParams
  ): Promise<BucketListResponse> => {
    const searchParams = new URLSearchParams();

    // Only add params if they have values
    if (params) {
      if (params.page !== undefined)
        searchParams.append("page", params.page.toString());
      if (params.size !== undefined)
        searchParams.append("size", params.size.toString());
      if (params.sortBy) searchParams.append("sortBy", params.sortBy);
      if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
      if (params.search) searchParams.append("search", params.search);
      if (params.storageClass)
        searchParams.append("storageClass", params.storageClass);
      if (params.versioningEnabled !== undefined) {
        searchParams.append(
          "versioningEnabled",
          params.versioningEnabled.toString()
        );
      }
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/s3/buckets?${queryString}` : "/s3/buckets";

    return apiClient.get<BucketListResponse>(url);
  },

  createBucket: async (bucketName: string): Promise<ApiResponse> => {
    const request: CreateBucketRequest = {
      bucketName,
      region: "ap-south-1", // Hardcoded as per requirements
    };

    return apiClient.post<ApiResponse>("/s3/buckets", request);
  },

  emptyBucket: async (bucketName: string): Promise<ApiResponse> => {
    const request: BucketOperationRequest = { bucketName };
    return apiClient.post<ApiResponse>("/s3/buckets/empty", request);
  },

  deleteBucket: async (bucketName: string): Promise<ApiResponse> => {
    const request: BucketOperationRequest = { bucketName };
    return apiClient.delete<ApiResponse>("/s3/buckets", {
      data: request,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
