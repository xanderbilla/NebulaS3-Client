import Link from "next/link";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Card, CardContent } from "@/components/ui/card";

interface FileData {
  name: string;
  itemCount?: number;
  size?: string;
  extension?: string;
}

interface FileProps {
  type: "document" | "compressed" | "image" | "audio" | "video" | "folder" | "unknown";
  data: FileData;
}

export default function Files({ type, data }: FileProps) {
  const getIconProperties = () => {
    switch (type) {
      case "document":
        return {
          color: "text-blue-500 dark:text-blue-400",
          path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        };
      case "compressed":
        return {
          color: "text-green-500 dark:text-green-400",
          path: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M10 12h4",
        };
      case "image":
        return {
          color: "text-purple-500 dark:text-purple-400",
          path: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
        };
      case "audio":
        return {
          color: "text-red-500 dark:text-red-400",
          path: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
        };
      case "video":
        return {
          color: "text-yellow-500 dark:text-yellow-400",
          path: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
        };
      case "folder":
        return {
          color: "text-orange-500 dark:text-orange-400",
          path: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        };
    }
  };

  const icon = getIconProperties();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-2 sm:p-4 flex flex-col justify-between h-32 w-28 sm:h-40 sm:w-36">
            <div className="text-center">
              <svg
                className={`w-12 h-12 sm:w-16 sm:h-16 ${icon?.color} flex items-center justify-center mx-auto`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d={icon?.path}
                />
              </svg>
            </div>
            <div className="text-center mt-auto">
              <div className="group relative overflow-hidden">
                <Link
                  href="#"
                  className={`font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap ${
                    data.name.length > 13 ? "group-hover:animate-marquee" : ""
                  } inline-block`}
                >
                  {data.name}
                </Link>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {(data.extension ?? "").toUpperCase()}{" "}
                {type === "folder"
                  ? `${data.itemCount} items`
                  : `• ${data.size}`}
              </p>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 dark:bg-gray-800 dark:border-gray-700">
        <ContextMenuItem
          inset
          className="dark:text-gray-100 dark:focus:bg-gray-700"
        >
          Open
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="dark:text-gray-100 dark:focus:bg-gray-700"
        >
          Download
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="dark:text-gray-100 dark:focus:bg-gray-700"
        >
          Share
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="dark:bg-gray-700" />
        <ContextMenuItem
          inset
          className="dark:text-gray-100 dark:focus:bg-gray-700"
        >
          Copy URL
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="dark:text-gray-100 dark:focus:bg-gray-700"
        >
          Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="dark:bg-gray-700" />
        <ContextMenuItem
          inset
          className="text-red-600 dark:text-red-400 dark:focus:bg-gray-700"
        >
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
