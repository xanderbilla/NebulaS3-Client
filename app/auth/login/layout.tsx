import { Metadata } from "next";
import React from "react";

interface LoginLayoutProps {
  readonly children: React.ReactNode;
}

// Streamlined metadata to reduce bundle size
export const metadata: Metadata = {
  title: "Login to NebulaS3",
  description: "Access your NebulaS3 account securely.",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen backdrop-blur-sm backdrop-saturate-150">
      {children}
    </div>
  );
}
