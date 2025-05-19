import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="hidden md:flex items-center gap-4 ml-4">
      <Link
        href="/dashboard"
        className="glass-text glass-hover px-3 py-1 rounded-md transition text-sm sm:text-base font-medium"
      >
        Home
      </Link>
      <Link
        href="/buckets"
        className="glass-text glass-hover px-3 py-1 rounded-md transition text-sm sm:text-base font-medium"
      >
        Buckets
      </Link>
    </div>
  );
}
