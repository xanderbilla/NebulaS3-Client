"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ReactNode } from "react";

export interface ActionItem {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
  triggerClassName?: string;
  contentClassName?: string;
  align?: "center" | "start" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export default function ActionMenu({
  items,
  triggerClassName = "",
  contentClassName = "",
  align = "end",
  side = "bottom",
}: ActionMenuProps) {
  // Separate danger items
  const standardItems = items.filter((item) => !item.danger);
  const dangerItems = items.filter((item) => item.danger);
  const hasDangerItems = dangerItems.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-8 w-8 p-0 glass-hover ${triggerClassName}`}
        >
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4 glass-text opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={`w-40 bg-black/30 backdrop-blur-xl border-[0.5px] border-white/10 shadow-xl ${contentClassName}`}
      >
        {standardItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={`flex items-center gap-2 cursor-pointer text-sm px-3 py-2 text-white/80 focus:bg-white/10 focus:text-white ${
              item.className || ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}

        {hasDangerItems && standardItems.length > 0 && (
          <DropdownMenuSeparator className="bg-white/10" />
        )}

        {dangerItems.map((item, index) => (
          <DropdownMenuItem
            key={`danger-${index}`}
            onClick={item.onClick}
            className={`flex items-center gap-2 cursor-pointer text-sm px-3 py-2 text-red-400 focus:bg-white/10 focus:text-red-300 ${
              item.className || ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
