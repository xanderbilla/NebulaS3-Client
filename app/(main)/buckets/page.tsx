import { Metadata } from "next";
import BucketManagement from "@/components/custom-ui/bucket-component/bucket-management";

export const metadata: Metadata = {
  title: "Buckets | Nebula S3",
  description:
    "Manage and organize your S3 buckets with Nebula S3. Create, monitor, and maintain your cloud storage buckets efficiently.",
  keywords: [
    "S3 Buckets",
    "Cloud Storage", 
    "Bucket Management",
    "Storage Organization",
    "Cloud Infrastructure",
    "Data Storage",
    "Bucket Monitoring",
    "Storage Analytics",
  ],
  authors: [{ name: "Nebula S3 Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nebula-s3.com/buckets",
    title: "NEBULA S3 BUCKETS",
    description:
      "Manage and organize your S3 buckets with Nebula S3. Create, monitor, and maintain your cloud storage buckets efficiently.",
    siteName: "NEBULA S3",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEBULA S3 BUCKETS", 
    description:
      "Manage and organize your S3 buckets with Nebula S3. Create, monitor, and maintain your cloud storage buckets efficiently.",
    creator: "@nebulas3",
  },
};

export default function BucketsPage() {
  return <BucketManagement />;
}
