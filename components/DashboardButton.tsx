"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Simplified component with more efficient hook usage
export default function DashboardButton() {
  const [isLogin, setIsLogin] = useState(false);
  
  // Run once on mount
  useEffect(() => {
    setIsLogin(document.cookie.includes("sessionToken"));
  }, []);
  
  return (
    <Link
      className="rounded-full flex items-center justify-center gap-2 text-white bg-black/40 hover:bg-black/60 dark:bg-white/10 dark:hover:bg-white/20 border border-white/20 dark:border-white/30 backdrop-blur-lg px-4 py-2 text-sm font-medium"
      href={isLogin ? "/dashboard" : "/auth/login"}
    >
      <User className="size-4" />
      {isLogin ? "Dashboard" : "Login"}
    </Link>
  );
}
