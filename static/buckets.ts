import type { Bucket } from "@/types/bucket";

export const mockBuckets: Bucket[] = [
  {
    id: "1",
    bucketName: "my-backup-bucket",
    region: "us-east-1",
    createdOn: new Date("2024-01-01"),
    size: "2.5 GB",
  },
  {
    id: "2",
    bucketName: "website-assets",
    region: "eu-west-1",
    createdOn: new Date("2024-01-15"),
    size: "1.2 GB",
  },
  {
    id: "3",
    bucketName: "user-uploads",
    region: "ap-south-1",
    createdOn: new Date("2024-02-01"),
    size: "5.8 GB",
  },
];
