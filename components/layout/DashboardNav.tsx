"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SlideNav from "@/components/custom-ui/SlideNav/SlideNav";
import NavLinks from "@/components/custom-ui/dashboard/NavLinks";
import NavActions from "@/components/custom-ui/dashboard/NavActions";

export default function DashboardNav() {
  const router = useRouter();
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const pathname = usePathname();
  const title = pathname.split("/").pop()?.replace(/-/g, " ");

  const capitalizeTitle = (str: string | undefined) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogout = () => {
    // Clear cookies
    document.cookie =
      "sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "accessKey=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  return (
    <div className="opacity-100 sticky top-0 z-10 bg-white/40 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-40">
          <button
            onClick={() => router.back()}
            className="p-2 glass-hover rounded-full"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 glass-text" />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold hidden md:block glass-text">
            {capitalizeTitle(title)}
          </h1>
          <NavLinks />
        </div>
        <NavActions
          onLogout={handleLogout}
          onMenuClick={() => setIsSlideOpen(true)}
        />
      </div>
      <SlideNav isOpen={isSlideOpen} setIsOpen={setIsSlideOpen} />
    </div>
  );
}
