import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Nebula S3",
  description: "The requested page couldn't be found. Please check the URL or navigate back to the Nebula S3 homepage.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full p-8 pb-20 gap-16 sm:p-20">
        <BackgroundShape variant="404" />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <span className="flex items-center gap-2 text-6xl font-bold tracking-tight">
            404 - Page Not Found
          </span>
          <div className="text-sm text-center sm:text-left max-w-xl">
            The requested page couldn&apos;t be found. Please check the URL or
            navigate back home.
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
