import { Metadata } from "next";
import React from "react";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Contact NebulaS3 - Get in Touch for Support & Inquiries",
  description:
    "Reach out to NebulaS3 for support, partnership opportunities, or general inquiries. Our team is ready to assist you with AWS S3 management solutions.",
  keywords: [
    "Contact NebulaS3",
    "NebulaS3 Support",
    "AWS S3 Assistance",
    "Cloud Storage Help",
    "S3 Management Queries",
    "Amazon S3 SaaS Support",
    "Customer Support NebulaS3",
    "Cloud Storage Solutions",
  ],
  openGraph: {
    title: "Contact NebulaS3 - AWS S3 Support & Queries",
    description:
      "Have questions or need support for NebulaS3? Contact our team for assistance with AWS S3 management and cloud storage solutions.",
    url: "https://nebulas3.vercel.app/contact",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact NebulaS3 - AWS S3 Management Support",
      },
    ],
  },
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return children;
}
