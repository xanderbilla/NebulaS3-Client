import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import DashboardNavSkeleton from "@/components/custom-ui/skeleton/DashboardNavSkeleton";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";
import Footer from "@/components/layout/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DASHBOARD | NEBULA S3",
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

const DashboardNav = dynamic(() => import("@/components/layout/DashboardNav"), {
  loading: () => <DashboardNavSkeleton />,
});

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundShape variant="default" />
      <DashboardNav />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
