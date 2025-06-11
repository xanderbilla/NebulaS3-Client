import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMockBucketList,
  mockBuckets,
  getBucketStats,
  getRecentActivity,
} from "@/static/buckets";
import type {
  BucketListParams,
  BucketListResponse,
  Bucket,
} from "@/types/bucket";

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

// Simulated API functions (replace with real API calls when backend is ready)
const bucketApi = {
  getBuckets: async (params: BucketListParams): Promise<BucketListResponse> => {
    // Reduced delay for better UX - only show loading for actual network requests
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getMockBucketList(params);
  },

  getBucketDetails: async (bucketName: string): Promise<Bucket> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const bucket = mockBuckets.find((b) => b.bucketName === bucketName);
    if (!bucket) throw new Error(`Bucket ${bucketName} not found`);
    return bucket;
  },

  deleteBucket: async (bucketName: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Reduced from 1500ms
    // Simulate deletion - in real app, this would call the API
    console.log(`Deleting bucket: ${bucketName}`);
  },

  emptyBucket: async (bucketName: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Reduced from 2000ms
    // Simulate emptying - in real app, this would call the API
    console.log(`Emptying bucket: ${bucketName}`);
  },

  getStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Reduced from 300ms
    return getBucketStats();
  },

  getRecentActivity: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Reduced from 400ms
    return getRecentActivity();
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

// Hook to fetch bucket statistics
export function useBucketStats() {
  return useQuery({
    queryKey: bucketKeys.stats(),
    queryFn: bucketApi.getStats,
    staleTime: 60 * 1000, // 1 minute
  });
}

// Hook to fetch recent activity
export function useRecentActivity() {
  return useQuery({
    queryKey: bucketKeys.activity(),
    queryFn: bucketApi.getRecentActivity,
    staleTime: 30 * 1000, // 30 seconds
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
      queryClient.invalidateQueries({ queryKey: bucketKeys.stats() });
      queryClient.invalidateQueries({ queryKey: bucketKeys.activity() });
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
      queryClient.invalidateQueries({ queryKey: bucketKeys.stats() });
      queryClient.invalidateQueries({ queryKey: bucketKeys.activity() });
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
        if (!oldData) return oldData;

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
