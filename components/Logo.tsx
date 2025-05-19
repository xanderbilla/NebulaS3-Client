import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
  readonly className?: string;
  readonly size?: number; // pixel size for icon box
  readonly hideText?: boolean;
}

export default function Logo({
  className = "",
  size = 24,
  hideText = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx("flex items-center gap-2 font-medium", className)}
    >
      <div
        className={clsx(
          "flex items-center justify-center rounded-md bg-primary text-primary-foreground"
          // Use inline style for dynamic size
        )}
        style={{ height: size, width: size }}
      >
        <GalleryVerticalEnd className="w-2/3 h-2/3" />
      </div>
      {!hideText && <span>NebulaS3</span>}
    </Link>
  );
}
