import { Metadata } from "next";
import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const metadata:Metadata = {
  title: "Login to NebulaS3 - Secure AWS S3 Access",
  description:
    "Access your NebulaS3 account securely. Log in to manage your AWS S3 buckets with advanced features and seamless authentication.",
  keywords: [
    "NebulaS3 Login",
    "AWS S3 Login",
    "Secure S3 Access",
    "Cloud Storage Authentication",
    "Amazon S3 Management",
    "S3 SaaS Platform",
    "S3 Dashboard Login",
    "AWS Cloud Storage",
  ],
  openGraph: {
    title: "Login to NebulaS3 - Secure AWS S3 Access",
    description:
      "Sign in to your NebulaS3 account and securely manage AWS S3 buckets with role-based authentication.",
    url: "https://nebulas3.vercel.app/login",
    type: "website",
    images: [
      {
        url: "https://nebulas3.vercel.app/images/login-og.jpg",
        width: 1200,
        height: 630,
        alt: "Login to NebulaS3 - Secure AWS S3 Access",
      },
    ],
  },
};


export default function LoginLayout({ children }: LoginLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
