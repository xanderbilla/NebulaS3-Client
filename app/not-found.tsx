import React from 'react'
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/footer';
type Props = object;

export default function NotFound({}: Props) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <span className="flex items-center gap-2 text-6xl font-bold tracking-tight">
                404 - Page Not Found
            </span>
            <div className="text-sm text-center sm:text-left max-w-xl">
                The requested page couldn&apos;t be found. Please check the URL or navigate back home.
            </div>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Link
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                    href="/"
                >
                    <ArrowLeft className="size-4" />
                    Return Home
                </Link>
            </div>
        </main>
        <Footer/>
    </div>
  )
}