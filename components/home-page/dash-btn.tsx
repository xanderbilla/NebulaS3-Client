"use client";

import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = object;

export default function DashboardBtn({}: Props) {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    setIsLogin(document.cookie.includes("sessionToken"));
  }, []);
  return (
    <Link
      className="rounded-full transition-colors flex items-center justify-center text-white gap-2 hover:opacity-90 text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600"
      href={isLogin ? "/dashboard" : "/login"}
      rel="noopener noreferrer"
    >
      <User className="size-4" />
      {isLogin ? "Dashboard" : "Login to your account"}
    </Link>
  );
}
