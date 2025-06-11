import { Metadata } from "next";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/custom-ui/skeleton/DashboardSkeleton";
import DashboardContent from "@/components/custom-ui/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard | Nebula S3",
  description: "Manage your S3 buckets and objects with Nebula S3 dashboard",
  keywords: [
    "S3",
    "Storage", 
    "Dashboard",
    "Cloud Storage",
    "Bucket Management",
  ],
  authors: [{ name: "Nebula S3 Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nebula-s3.com/dashboard",
    title: "NEBULA S3 DASHBOARD",
    description: "Manage your S3 buckets and objects with Nebula S3 dashboard",
    siteName: "NEBULA S3",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEBULA S3 DASHBOARD",
    description: "Manage your S3 buckets and objects with Nebula S3 dashboard",
    creator: "@nebulas3",
  },
};

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-6 min-h-[calc(100vh-9rem)]">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
