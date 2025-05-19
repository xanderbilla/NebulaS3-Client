import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function DesktopMenu() {
  return (
    <ul className="hidden md:flex gap-2 text-xs sm:text-sm font-medium">
      <li>
        {" "}
        <Link
          href="/about"
          className="glass-text glass-hover px-3 py-2 rounded-md flex items-center"
        >
          About
        </Link>
      </li>
      <li>
        {" "}
        <Link
          className="glass-text glass-hover px-3 py-2 rounded-md flex items-center gap-1"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
          <SquareArrowOutUpRight className="size-4" />
        </Link>
      </li>
      <li>
        {" "}
        <Link
          href="/contact"
          className="glass-text glass-hover px-3 py-2 rounded-md flex items-center"
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}
