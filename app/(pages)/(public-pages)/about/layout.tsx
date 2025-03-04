import { Metadata } from "next";
import React from "react";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "About NebulaS3 - Secure & Advanced AWS S3 Management",
  description:
    "Learn more about NebulaS3, an advanced SaaS platform for secure Amazon S3 management using AWS STS authentication, role-based access, and real-time bucket operations.",
  keywords: [
    "NebulaS3",
    "AWS S3 Management",
    "Amazon S3 SaaS",
    "AWS STS Authentication",
    "Secure S3 Access",
    "S3 Bucket Management",
    "Cloud Storage Security",
    "Role-Based Access Control",
    "AWS SDK Integration",
  ],
  openGraph: {
    title: "NebulaS3 - Advanced Amazon S3 Management Platform",
    description:
      "NebulaS3 offers secure and efficient AWS S3 management with role-based authentication, temporary credentials, and real-time bucket operations.",
    url: "https://nebulas3.vercel.app/about",
    type: "website",
    images: [
      {
        url: "https://miro.medium.com/v2/resize:fit:800/1*kiR4fwOJnlHP2bxnYrm1Xg.jpeg",
        width: 1200,
        height: 630,
        alt: "NebulaS3 - AWS S3 Management",
      },
    ],
  },
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <>{children}</>;
}
