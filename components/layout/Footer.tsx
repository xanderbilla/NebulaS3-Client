import Link from "next/link";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 dark:border-white/5 bg-white/40 dark:bg-black/30 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-black/90 dark:text-white/90">
              © {year} NebulaS3 by{" "}
              <Link
                href="https://xanderbilla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4 opacity-70 hover:opacity-100 font-medium transition-all"
              >
                @xanderbilla
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-black/80 dark:text-white/80">
            <Link
              href="/about"
              className="hover:opacity-100 opacity-70 transition-all hover:bg-white/30 dark:hover:bg-white/10 px-2 py-1 rounded"
            >
              About
            </Link>
            <Link
              href="/docs"
              className="hover:opacity-100 opacity-70 transition-all hover:bg-white/30 dark:hover:bg-white/10 px-2 py-1 rounded"
            >
              Documentation
            </Link>
            <Link
              href="/contact"
              className="hover:opacity-100 opacity-70 transition-all hover:bg-white/30 dark:hover:bg-white/10 px-2 py-1 rounded"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
