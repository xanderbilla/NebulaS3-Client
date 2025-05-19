"use client";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import HealthCheck from "@/components/HealthCheck";
import SlideNavCloseButton from "./SlideNavCloseButton";
import SlideNavLinks from "./SlideNavLinks";

export default function SlideNavPanel({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-full w-[300px] glass-sidenav z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex justify-end p-4">
        <SlideNavCloseButton onClick={() => setIsOpen(false)} />
      </div>{" "}
      {/* Logo */}
      <div className="flex flex-col items-center py-4">
        <Logo size={40} className="mb-2 text-2xl glass-text" />
      </div>
      <SlideNavLinks />{" "}
      <div className="px-8 pb-6 mt-auto">
        <HealthCheck compact className="py-3 rounded-lg p-3" />
      </div>
    </div>
  );
}
