import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
    title: "NebulaS3 Buckets - Manage Your AWS S3 Buckets Easily",
    description:
      "Effortlessly create, list, and manage your AWS S3 buckets with NebulaS3. Securely store and organize your cloud storage using advanced AWS integrations.",
    keywords: [
      "NebulaS3 Buckets",
      "AWS S3 Bucket Management",
      "Create S3 Bucket",
      "List S3 Buckets",
      "Manage AWS Storage",
      "Cloud Storage Buckets",
      "S3 Object Storage",
      "AWS Cloud Storage",
    ],
    openGraph: {
      title: "NebulaS3 Buckets - Manage Your AWS S3 Buckets",
      description:
        "Simplify your AWS S3 bucket management with NebulaS3's powerful and secure interface.",
      url: "https://nebulas3.vercel.app/dashboard/buckets",
      type: "website",
      images: [
        {
          url: "https://nebulas3.vercel.app/images/buckets-og.jpg",
          width: 1200,
          height: 630,
          alt: "NebulaS3 Buckets - AWS S3 Management",
        },
      ],
    },
  };
  

export default function BucketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
