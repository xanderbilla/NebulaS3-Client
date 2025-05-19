import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import DashboardNavSkeleton from "@/components/custom-ui/skeleton/DashboardNavSkeleton";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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

const DashboardNav = dynamic(() => import("@/components/layout/DashboardNav"), {
  loading: () => <DashboardNavSkeleton />,
});

export default function BucketsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundShape variant="default" />
      <DashboardNav />
      <main className="container mx-auto px-4 py-6 relative z-5">
        {children}
      </main>
    </div>
  );
}
