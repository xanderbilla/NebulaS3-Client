"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/custom-button";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-[calc(100vh-6rem)] p-8 pb-20 gap-8 pt-20 sm:p-20">
      <div className="max-w-7xl mx-auto w-full">
        <CustomButton
          title="Previous Page"
          variant="link"
          onClick={handleBack}
          icon={<ArrowLeft className="size-4" />}
        />
      </div>

      <main className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          About NebulaS3
        </h1>

        <div className="space-y-6 text-lg">
          <p>
            Welcome to our advanced storage solution built on the foundation of
            S3. I&apos;ve taken the reliable features you love from S3 and
            enhanced them with modern capabilities that today&apos;s
            applications and user demand.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Features:</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                ✓ All standard S3 functionalities
              </li>
              <li className="flex items-center gap-2">
                ✓ Real-time data processing
              </li>
              <li className="flex items-center gap-2 text-zinc-500">
                + More features coming soon...
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
