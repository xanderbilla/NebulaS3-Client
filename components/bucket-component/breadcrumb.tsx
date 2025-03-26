import React from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

export default function Breadcrumb({
  currentPath,
  setCurrentPath,
}: BreadcrumbProps) {
  const pathSegments = currentPath.split("/").filter(Boolean);

  return (
    <div className="mb-4 flex items-center gap-2 text-sm overflow-x-auto pb-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrentPath("")}
        className="hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
      >
        <FolderOpen className="h-4 w-4 mr-1" />
        Root
      </Button>
      {pathSegments.map((segment, index) => {
        const path = pathSegments.slice(0, index + 1).join("/") + "/";
        const isLast = index === pathSegments.length - 1;

        return (
          <div
            key={segment}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPath(path)}
              className={`hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isLast
                  ? "font-medium"
                  : "text-gray-500 dark:text-gray-400 font-light"
              }`}
            >
              {segment}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
