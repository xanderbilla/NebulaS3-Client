import { Book } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { NoticeBanner } from "@/components/notice-banner";

const DashboardBtn = dynamic(() => import("@/components/home-page/dash-btn"));
const Footer = dynamic(() => import("@/components/footer"));
const Navbar = dynamic(() => import("@/components/home-page/navbar"));
const HealthCheck = dynamic(() => import("@/components/health-check"));
const Logo = dynamic(() => import("@/components/pg-logo"));

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 dark:bg-black dark:text-white">
      <Navbar />
      <NoticeBanner />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Logo />
        <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] max-w-xl dark:text-gray-300">
          S3 Advance SaaS is a modern application that transforms how users
          interact with Amazon S3, offering a sophisticated web interface with
          enhanced capabilities.
        </div>
        <HealthCheck />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <DashboardBtn />
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4 sm:min-w-36"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Book className="size-4" />
            Documentation
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
