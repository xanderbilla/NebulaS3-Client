import Link from "next/link";
import React from "react";

type Props = object;

export default function Footer({}: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div className="flex items-center gap-4 text-sm">
        <span className="text-base dark:text-gray-200">
          © {year} NebulaS3 by{" "}
          <Link
            href="https://xanderbilla.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:underline-offset-4 text-gray-500 dark:text-gray-400 font-medium dark:hover:text-gray-300"
          >
            @xanderbilla
          </Link>
        </span>
      </div>
    </footer>
  );
}
