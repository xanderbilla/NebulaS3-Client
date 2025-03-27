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
import dynamic from "next/dynamic";
import { s3Service } from "@/services/s3.service";
import Cookies from "js-cookie";

const MediaPreview = dynamic(() => import("./media-preview"));

interface FileData {
  readonly name: string;
  readonly itemCount?: number;
  readonly size?: string;
  readonly extension?: string;
  readonly key?: string;
}

interface FileProps {
  readonly type:
    | "document"
    | "compressed"
    | "image"
    | "audio"
    | "video"
    | "folder"
    | "unknown";
  readonly data: FileData;
  readonly onClick?: () => void;
  readonly icon?: React.ElementType;
  readonly bucketName?: string;
}

export default function Files({
  type,
  data,
  onClick,
  icon: Icon,
  bucketName,
}: FileProps) {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const getIconColor = () => {
    return "text-gray-700 dark:text-gray-300";
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

  const handleClick = async () => {
    if (type === "folder" && onClick) {
      onClick();
      return;
    }

    if ((type === "image" || type === "video") && bucketName && data.key) {
      try {
        const sessionToken = Cookies.get("sessionToken");
        if (!sessionToken) {
          throw new Error("No session token found. Please log in again.");
        }

        console.log("Fetching presigned URL for:", {
          bucketName,
          objectKey: data.key,
          type,
          hasSessionToken: !!sessionToken,
        });

        const url = await s3Service.getPresignedUrl(bucketName, data.key);

        if (!url) {
          throw new Error("No URL received from presigned URL request");
        }

        setPreviewUrl(url);
        setIsPreviewOpen(true);
        setError(null);
      } catch (error) {
        console.error("Error getting presigned URL:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load preview"
        );
      }
    } else {
      console.log("Click conditions not met:", {
        type,
        bucketName,
        hasKey: !!data.key,
        data,
      });
    }
  };

  const IconComponent = Icon || getDefaultIcon();
  const iconColor = getIconColor();

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Card
            className="dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-900/50 group h-full"
            onClick={handleClick}
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

      {previewUrl && isPreviewOpen && (
        <MediaPreview
          onClose={() => setIsPreviewOpen(false)}
          title={data.name}
          mediaUrl={previewUrl}
          type={type}
        />
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </>
  );
}
