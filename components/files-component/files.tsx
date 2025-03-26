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
import {
  FileText,
  FileArchive,
  FileImage,
  FileAudio,
  FileVideo,
  Folder,
  FileQuestion,
} from "lucide-react";

interface FileData {
  name: string;
  itemCount?: number;
  size?: string;
  extension?: string;
}

interface FileProps {
  type:
    | "document"
    | "compressed"
    | "image"
    | "audio"
    | "video"
    | "folder"
    | "unknown";
  data: FileData;
  onClick?: () => void;
  icon?: React.ElementType;
}

export default function Files({ type, data, onClick, icon: Icon }: FileProps) {
  const getIconColor = () => {
    switch (type) {
      case "document":
        return "text-gray-700 dark:text-gray-300";
      case "compressed":
        return "text-gray-700 dark:text-gray-300";
      case "image":
        return "text-gray-700 dark:text-gray-300";
      case "audio":
        return "text-gray-700 dark:text-gray-300";
      case "video":
        return "text-gray-700 dark:text-gray-300";
      case "folder":
        return "text-gray-700 dark:text-gray-300";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case "document":
        return FileText;
      case "compressed":
        return FileArchive;
      case "image":
        return FileImage;
      case "audio":
        return FileAudio;
      case "video":
        return FileVideo;
      case "folder":
        return Folder;
      default:
        return FileQuestion;
    }
  };

  const IconComponent = Icon || getDefaultIcon();
  const iconColor = getIconColor();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className="dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-900/50 group h-full"
          onClick={onClick}
        >
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="text-center flex-1 flex items-center justify-center">
              <IconComponent
                className={`w-14 h-14 ${iconColor} mx-auto transition-transform duration-200 group-hover:scale-110`}
              />
            </div>
            <div className="text-center">
              <div className="group relative overflow-hidden">
                <span
                  className={`font-medium text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap ${
                    data.name.length > 13 ? "group-hover:animate-marquee" : ""
                  } inline-block`}
                >
                  {data.name}
                </span>
              </div>
              {data.size && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {data.size}
                </p>
              )}
              {data.itemCount !== undefined && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {data.itemCount} items
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Download
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Share
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-red-600 dark:text-red-400">
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
