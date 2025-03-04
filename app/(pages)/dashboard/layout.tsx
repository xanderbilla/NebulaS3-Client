export const metadata:Metadata = {
  title: "NebulaS3 Dashboard - Manage Your AWS S3 Buckets Effortlessly",
  description:
    "Access your NebulaS3 dashboard to manage AWS S3 buckets with advanced features, secure authentication, and seamless cloud storage integration.",
  keywords: [
    "NebulaS3 Dashboard",
    "AWS S3 Management",
    "S3 Cloud Storage",
    "Secure S3 Access",
    "Amazon S3 Buckets",
    "Cloud Storage Dashboard",
    "AWS S3 SaaS",
    "S3 File Management",
  ],
  openGraph: {
    title: "NebulaS3 Dashboard - Manage Your AWS S3 Buckets",
    description:
      "Easily manage and organize your AWS S3 storage with NebulaS3's secure and intuitive dashboard.",
    url: "https://nebulas3.vercel.app/dashboard",
    type: "website",
    images: [
      {
        url: "https://nebulas3.vercel.app/images/dashboard-og.jpg",
        width: 1200,
        height: 630,
        alt: "NebulaS3 Dashboard - AWS S3 Management",
      },
    ],
  },
};

import { Metadata } from "next";
import DashboardLayout from "./DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
