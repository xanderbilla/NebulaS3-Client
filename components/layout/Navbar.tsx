import React from "react";
import { ModeToggle } from "@/components/theme-mode/ModeToggle";
import Logo from "@/components/Logo";
import DesktopMenu from "@/components/custom-ui/navbar/DesktopMenu";
import MobileMenu from "@/components/custom-ui/navbar/MobileMenu";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white/40 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <DesktopMenu />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
export function Navbar() { return <nav>Navbar</nav> }
