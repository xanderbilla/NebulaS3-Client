"use client";

import React from "react";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/custom-button";
import BackgroundShape from "@/components/custom-ui/home/BackgroundShape";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

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
          <CustomButton title="Back to Home" onClick={handleBack} />
        </div>
      </main>
    </div>
    <Footer />
</div>
  );
}
