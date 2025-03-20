"use client";

export default function SlideNavLinks() {
  return (
    <nav className="flex flex-col gap-4 px-8 py-4 flex-1 glass-card-content">
      {" "}
      <a
        href="/dashboard"
        className="glass-text glass-hover font-medium rounded-md py-2 px-4 transition-all duration-300 text-base sm:text-lg"
      >
        Dashboard
      </a>{" "}
      <a
        href="/buckets"
        className="glass-text glass-hover font-medium rounded-md py-2 px-4 transition-all duration-300 text-base sm:text-lg"
      >
        Buckets
      </a>{" "}
      <a
        href="/about"
        className="glass-text glass-hover font-medium rounded-md py-2 px-4 transition-all duration-300 text-base sm:text-lg"
      >
        About
      </a>{" "}
      <a
        href="/docs"
        className="glass-text glass-hover font-medium rounded-md py-2 px-4 transition-all duration-300 text-base sm:text-lg"
      >
        Docs
      </a>{" "}
      <a
        href="/contact"
        className="glass-text glass-hover font-medium rounded-md py-2 px-4 transition-all duration-300 text-base sm:text-lg"
      >
        Contact
      </a>
    </nav>
  );
}
