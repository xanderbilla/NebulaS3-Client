import {
  GalleryVerticalEnd,
  Menu,
  SquareArrowOutUpRight,
  Home,
  Info,
  Mail,
  Github,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-mode/ModeToggle";

export default function MobileMenu() {
  const menuItems = [
    { icon: <Home className="size-4" />, label: "Home", href: "/" },
    { icon: <Info className="size-4" />, label: "About", href: "/about" },
    {
      icon: <SquareArrowOutUpRight className="size-4" />,
      label: "Docs",
      href: "/",
      external: true,
    },
    { icon: <Mail className="size-4" />, label: "Contact", href: "/contact" },
    {
      icon: <Github className="size-4" />,
      label: "GitHub",
      href: "https://github.com",
      external: true,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] p-0 overflow-hidden border-none backdrop-blur-2xl backdrop-saturate-150 bg-white/40 dark:bg-black/40 shadow-xl"
      >
        {/* Header with logo and theme toggle */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-black/90 dark:text-white/90">
              NebulaS3
            </span>
          </div>
          <ModeToggle />
        </div>

        {/* Menu items with animated hover effects */}
        <div className="mt-2 px-2">
          <div className="py-3 px-2 text-xs font-medium uppercase text-black/50 dark:text-white/50">
            Navigation
          </div>
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-black/80 dark:text-white/80 hover:bg-white/60 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200 group"
                >
                  <span className="flex items-center justify-center text-black/70 dark:text-white/70 group-hover:text-primary dark:group-hover:text-primary">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {item.external && (
                    <span className="ml-auto text-black/40 dark:text-white/40 group-hover:text-primary/70 dark:group-hover:text-primary/70">
                      <SquareArrowOutUpRight className="size-3" />
                    </span>
                  )}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-md text-xs text-center text-black/60 dark:text-white/60">
          © 2025 NebulaS3. All rights reserved.
        </div>
      </SheetContent>
    </Sheet>
  );
}
