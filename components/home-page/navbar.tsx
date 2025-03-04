import { GalleryVerticalEnd, Menu, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type Props = object;

export default function Navbar({}: Props) {
  return (
    <nav className="absolute top-0 left-0 w-full z-10">
      <div className="flex p-6 gap-4 md:p-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 px-4 pt-6">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <span className="font-medium">NebulaS3</span>
              </div>
              <ul className="flex flex-col space-y-3 px-4">
                <li>
                  <Link
                    href="/about"
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors gap-2"
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                    <SquareArrowOutUpRight className="size-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex gap-2 justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NebulaS3
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 text-sm font-medium">
          <li>
            <Link
              href="/about"
              className="underline-offset-4 hover:underline transition-all duration-200 px-2 py-1 rounded-md flex items-center"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="underline-offset-4 hover:underline transition-all duration-200 px-2 py-1 rounded-md flex items-center gap-1"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
              <SquareArrowOutUpRight className="size-4" />
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="underline-offset-4 hover:underline transition-all duration-200 px-2 py-1 rounded-md flex items-center"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
