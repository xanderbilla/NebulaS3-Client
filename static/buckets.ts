import type {
  Bucket,
  BucketListResponse,
  BucketListParams,
} from "@/types/bucket";

// Mock buckets data based on real API response
export const mockBuckets: Bucket[] = [
  {
    id: "aws-logs-929910138721-ap-south-1",
    bucketName: "aws-logs-929910138721-ap-south-1",
    region: "ap-south-1",
    createdOn: "2025-04-26T06:06:31.000+00:00",
    size: "923.7 KB",
    numberOfFolders: 43,
    numberOfObjects: 132,
    lastUsed: "2025-04-26T06:26:09.000+00:00",
    versioningEnabled: false,
    storageClass: "STANDARD",
  },
  {
    id: "xanderbilla-bigdata",
    bucketName: "xanderbilla-bigdata",
    region: "ap-south-1",
    createdOn: "2025-04-26T06:02:48.000+00:00",
    size: "0 B",
    numberOfFolders: 0,
    numberOfObjects: 0,
    lastUsed: null,
    versioningEnabled: true,
    storageClass: "STANDARD",
  },
  {
    id: "h5lena",
    bucketName: "h5lena",
    region: "ap-south-1",
    createdOn: "2025-04-06T20:24:49.000+00:00",
    size: "16.9 MB",
    numberOfFolders: 0,
    numberOfObjects: 1,
    lastUsed: "2025-04-06T20:25:01.000+00:00",
    versioningEnabled: true,
    storageClass: "STANDARD",
  },
  {
    id: "elasticbeanstalk-ap-south-1-929910138721",
    bucketName: "elasticbeanstalk-ap-south-1-929910138721",
    region: "ap-south-1",
    createdOn: "2025-03-13T07:36:23.000+00:00",
    size: "69.7 KB",
    numberOfFolders: 2,
    numberOfObjects: 5,
    lastUsed: "2025-03-13T07:56:22.000+00:00",
    versioningEnabled: false,
    storageClass: "STANDARD",
  },
  {
    id: "xbnebulas3",
    bucketName: "xbnebulas3",
    region: "ap-south-1",
    createdOn: "2025-03-08T05:14:11.000+00:00",
    size: "34.4 MB",
    numberOfFolders: 3,
    numberOfObjects: 6,
    lastUsed: "2025-03-08T05:15:13.000+00:00",
    versioningEnabled: true,
    storageClass: "STANDARD",
  },
  {
    id: "terraform-state-bucket-myproject",
    bucketName: "terraform-state-bucket-myproject",
    region: "ap-south-1",
    createdOn: "2025-01-21T14:24:11.000+00:00",
    size: "182.0 B",
    numberOfFolders: 1,
    numberOfObjects: 1,
    lastUsed: "2025-02-05T05:03:48.000+00:00",
    versioningEnabled: false,
    storageClass: "STANDARD",
  },
  {
    id: "myproject-bdd0dd131e103f2909fbc40992c2514a",
    bucketName: "myproject-bdd0dd131e103f2909fbc40992c2514a",
    region: "us-east-1",
    createdOn: "2025-01-19T20:35:42.000+00:00",
    size: "0 B",
    numberOfFolders: 0,
    numberOfObjects: 0,
    lastUsed: null,
    versioningEnabled: false,
    storageClass: "STANDARD",
  },
  {
    id: "xanderbilla",
    bucketName: "xanderbilla",
    region: "ap-south-1",
    createdOn: "2024-11-10T14:05:59.000+00:00",
    size: "55.3 MB",
    numberOfFolders: 35,
    numberOfObjects: 175,
    lastUsed: "2025-05-01T10:52:02.000+00:00",
    versioningEnabled: true,
    storageClass: "STANDARD",
  },
  {
    id: "imggallery-st",
    bucketName: "imggallery-st",
    region: "ap-south-1",
    createdOn: "2024-11-09T22:24:49.000+00:00",
    size: "0 B",
    numberOfFolders: 0,
    numberOfObjects: 0,
    lastUsed: null,
    versioningEnabled: true,
    storageClass: "STANDARD",
  },
];

/**
 * Parse size string and convert to bytes for sorting
 */
function parseSize(sizeStr: string): number {
  const regex = /([0-9.]+)\s*(GB|MB|KB|B)/i;
  const match = regex.exec(sizeStr);

  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  switch (unit) {
    case "GB":
      return value * 1024 * 1024 * 1024;
    case "MB":
      return value * 1024 * 1024;
    case "KB":
      return value * 1024;
    case "B":
      return value;
    default:
      return 0;
  }
}

/**
 * Mock function to simulate bucket list API with query parameters
 */
export function getMockBucketList(
  params: BucketListParams = {}
): BucketListResponse {
  const {
    page = 0,
    size = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    search = "",
    storageClass,
    versioningEnabled,
  } = params;

  // Filter buckets
  const filteredBuckets = mockBuckets.filter((bucket) => {
    const matchesSearch =
      !search || bucket.bucketName.toLowerCase().includes(search.toLowerCase());
    const matchesStorageClass =
      !storageClass || bucket.storageClass === storageClass;
    const matchesVersioning =
      versioningEnabled === undefined ||
      bucket.versioningEnabled === versioningEnabled;

    return matchesSearch && matchesStorageClass && matchesVersioning;
  });

  // Sort buckets
  const sortedBuckets = [...filteredBuckets].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "createdAt": {
        const dateA = new Date(a.createdOn).getTime();
        const dateB = new Date(b.createdOn).getTime();
        comparison = dateA - dateB;
        break;
      }
      case "size": {
        const sizeA = parseSize(a.size);
        const sizeB = parseSize(b.size);
        comparison = sizeA - sizeB;
        break;
      }
      case "lastUpdated": {
        const dateA = a.lastUsed ? new Date(a.lastUsed).getTime() : 0;
        const dateB = b.lastUsed ? new Date(b.lastUsed).getTime() : 0;
        comparison = dateA - dateB;
        break;
      }
      default: {
        comparison = a.bucketName.localeCompare(b.bucketName);
        break;
      }
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });

  // Paginate
  const totalElements = sortedBuckets.length;
  const totalPages = Math.ceil(totalElements / size);
  const start = page * size;
  const end = start + size;
  const content = sortedBuckets.slice(start, end);

  return {
    statusCode: 200,
    message: "S3 buckets with details retrieved successfully",
    timestamp: new Date().toISOString(),
    data: {
      content,
      appliedFilters: {
        sortOrder,
        sortBy,
        search: search ?? null,
        storageClass: storageClass ?? null,
        versioningEnabled: versioningEnabled ?? null,
      },
      meta: {
        isFirst: page === 0,
        isLast: page >= totalPages - 1,
        totalPages,
        pageSize: size,
        hasPrevious: page > 0,
        hasNext: page < totalPages - 1,
        currentPage: page,
        totalElements,
      },
    },
    status: "SUCCESS",
  };
}

// Default mock response for backward compatibility
export const mockBucketListResponse: BucketListResponse = getMockBucketList();

// Helper function to get bucket statistics
export function getBucketStats() {
  const totalBuckets = mockBuckets.length;
  const totalObjects = mockBuckets.reduce(
    (sum, bucket) => sum + bucket.numberOfObjects,
    0
  );
  const totalFolders = mockBuckets.reduce(
    (sum, bucket) => sum + bucket.numberOfFolders,
    0
  );

  const totalStorageBytes = mockBuckets.reduce((sum, bucket) => {
    return sum + parseSize(bucket.size);
  }, 0);

  const uniqueRegions = new Set(mockBuckets.map((bucket) => bucket.region))
    .size;
  const versioningEnabledCount = mockBuckets.filter(
    (bucket) => bucket.versioningEnabled
  ).length;

  return {
    totalBuckets,
    totalObjects,
    totalFolders,
    totalStorageBytes,
    totalStorageGB: totalStorageBytes / (1024 * 1024 * 1024),
    uniqueRegions,
    versioningEnabledCount,
    emptyBuckets: mockBuckets.filter((bucket) => bucket.numberOfObjects === 0)
      .length,
  };
}

// Helper function to get recent activity
export function getRecentActivity() {
  return mockBuckets
    .filter((bucket) => bucket.lastUsed)
    .sort((a, b) => {
      const dateA = a.lastUsed ? new Date(a.lastUsed).getTime() : 0;
      const dateB = b.lastUsed ? new Date(b.lastUsed).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5)
    .map((bucket) => ({
      id: bucket.id,
      name: bucket.bucketName,
      action: "Object uploaded",
      timestamp: bucket.lastUsed!,
      size: bucket.size,
    }));
}
