import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bucketService } from "@/lib/services/buckets";
import type {
  BucketListParams,
  BucketListResponse,
  Bucket,
} from "@/types/bucket";
import type { ApiResponse } from "@/types/api";

// Query Keys - Centralized for consistency
export const bucketKeys = {
  all: ["buckets"] as const,
  lists: () => [...bucketKeys.all, "list"] as const,
  list: (params: BucketListParams) => [...bucketKeys.lists(), params] as const,
  details: () => [...bucketKeys.all, "detail"] as const,
  detail: (id: string) => [...bucketKeys.details(), id] as const,
  stats: () => [...bucketKeys.all, "stats"] as const,
  activity: () => [...bucketKeys.all, "activity"] as const,
} as const;

// Real API functions
const bucketApi = {
  getBuckets: async (params: BucketListParams): Promise<BucketListResponse> => {
    return bucketService.getBuckets(params);
  },

  getBucketDetails: async (bucketName: string): Promise<Bucket> => {
    // Note: This would need to be implemented in the backend
    // For now, we'll get it from the bucket list
    const response = await bucketService.getBuckets({ search: bucketName });
    const bucket = response.data?.content?.find(
      (b) => b.bucketName === bucketName
    );
    if (!bucket) throw new Error(`Bucket ${bucketName} not found`);
    return bucket;
  },

  deleteBucket: async (bucketName: string): Promise<ApiResponse> => {
    return bucketService.deleteBucket(bucketName);
  },

  emptyBucket: async (bucketName: string): Promise<ApiResponse> => {
    return bucketService.emptyBucket(bucketName);
  },

  createBucket: async (bucketName: string): Promise<ApiResponse> => {
    return bucketService.createBucket(bucketName);
  },
};

// Hook to fetch buckets with filters and pagination
export function useBuckets(params: BucketListParams = {}) {
  return useQuery({
    queryKey: bucketKeys.list(params),
    queryFn: () => bucketApi.getBuckets(params),
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Hook to fetch single bucket details
export function useBucketDetails(bucketName: string) {
  return useQuery({
    queryKey: bucketKeys.detail(bucketName),
    queryFn: () => bucketApi.getBucketDetails(bucketName),
    enabled: !!bucketName,
  });
}

// Mutation hook for creating buckets
export function useCreateBucket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bucketApi.createBucket,
    onSuccess: () => {
      // Invalidate and refetch bucket lists
      queryClient.invalidateQueries({ queryKey: bucketKeys.lists() });
      // Note: Toast notifications are handled in the UI components
    },
    onError: (error: unknown) => {
      console.error("Create bucket failed:", error);
      // Note: Error toast notifications are handled in the UI components
    },
  });
}

// Mutation hook for deleting buckets
export function useDeleteBucket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bucketApi.deleteBucket,
    onSuccess: () => {
      // Invalidate and refetch bucket lists
      queryClient.invalidateQueries({ queryKey: bucketKeys.lists() });
      // Note: Toast notifications are handled in the UI components
    },
    onError: (error: unknown) => {
      console.error("Delete bucket failed:", error);
      // Note: Error toast notifications are handled in the UI components
    },
  });
}

// Mutation hook for emptying buckets
export function useEmptyBucket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bucketApi.emptyBucket,
    onSuccess: () => {
      // Invalidate and refetch bucket lists
      queryClient.invalidateQueries({ queryKey: bucketKeys.lists() });
      // Note: Toast notifications are handled in the UI components
    },
    onError: (error: unknown) => {
      console.error("Empty bucket failed:", error);
      // Note: Error toast notifications are handled in the UI components
    },
  });
}

// Optimistic update hook for better UX
export function useOptimisticBucketUpdate() {
  const queryClient = useQueryClient();

  const updateBucketInCache = (
    bucketName: string,
    updater: (bucket: Bucket) => Bucket
  ) => {
    queryClient.setQueriesData(
      { queryKey: bucketKeys.lists() },
      (oldData: BucketListResponse | undefined) => {
        if (!oldData?.data?.content) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            content: oldData.data.content.map((bucket) =>
              bucket.bucketName === bucketName ? updater(bucket) : bucket
            ),
          },
        };
      }
    );
  };

  return { updateBucketInCache };
}
