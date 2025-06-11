"use client";

import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme-mode/ModeToggle";
import CustomButton from "@/components/ui/custom-button";
import LogoutIcon from "@/components/icons/LogoutIcon";

interface NavActionsProps {
  readonly onLogout: () => void;
  readonly onMenuClick: () => void;
}

export default function NavActions({ onLogout, onMenuClick }: NavActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <ModeToggle />{" "}
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
