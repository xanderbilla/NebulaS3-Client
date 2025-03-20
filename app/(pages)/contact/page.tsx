"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
        <CustomButton variant="link" title="Previous Page" onClick={handleBack} icon={<ArrowLeft className="size-4" />} />
      </div>

      <main className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Contact Us
        </h1>

        <div className="space-y-6">
          <p className="text-lg">
            Have questions or need support? We&apos;re here to help. Reach out
            to us through any of these channels:
          </p>

          <div className="space-y-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Email Support</h2>
              <Link href="mailto:vikas99blr@gmail.com">
                mail.vikas99blr@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
