import { GalleryVerticalEnd } from "lucide-react";
import React from "react";

type Props = object;

export default function Logo({}: Props) {
  return (
    <span className="flex items-center gap-2 text-6xl font-bold tracking-tight">
      <GalleryVerticalEnd className="size-12" />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 dark:from-blue-500 dark:to-green-400">
        NebulaS3
      </span>
    </span>
  );
}
