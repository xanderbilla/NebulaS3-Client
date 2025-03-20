"use client";

import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme-mode/ModeToggle";
import HealthCheck from "@/components/HealthCheck";
import CustomButton from "@/components/ui/custom-button";
import LogoutIcon from "@/components/icons/LogoutIcon";
import { useState, useEffect } from "react";

interface NavActionsProps {
  onLogout: () => void;
  onMenuClick: () => void;
}

export default function NavActions({ onLogout, onMenuClick }: NavActionsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full bg-sidebar-accent/50 animate-pulse">
          <div className="h-5 w-5" />
        </div>
        <div className="hidden md:block h-10 w-24 bg-sidebar-accent/50 animate-pulse rounded-md" />
        <div className="h-10 w-24 bg-sidebar-accent/50 animate-pulse rounded-md" />
        <div className="p-2 rounded-full bg-sidebar-accent/50 animate-pulse md:hidden">
          <div className="h-5 w-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <ModeToggle />{" "}
      <HealthCheck
        compact
        className="py-2 hidden md:block bg-white/10 dark:bg-black/10 backdrop-blur-sm border-white/5 dark:border-white/5"
      />
      <CustomButton title="Logout" onClick={onLogout} icon={<LogoutIcon />} />{" "}
      <button
        onClick={onMenuClick}
        className="p-2 glass-hover rounded-full md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 glass-text" />
      </button>
    </div>
  );
}
