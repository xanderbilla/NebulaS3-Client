"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = object;

export default function Page({}: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-[calc(100vh-6rem)] p-8 pb-20 gap-8 pt-20 sm:p-20">
      <div
        className="flex items-center gap-2 text-sm text-white dark:text-black hover:text-gray-200 dark:hover:text-gray-600 transition-colors duration-200 cursor-pointer group w-fit bg-gray-800 dark:bg-gray-100 rounded-full px-4 py-2"
        onClick={handleBack}
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Home
      </div>

      <main className="flex flex-col gap-8 max-w-4xl mx-auto">
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
