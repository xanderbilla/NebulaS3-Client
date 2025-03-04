"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    loading?: boolean;
    items?: {
      title: string;
      url: string;
      loading?: boolean;
    }[];
  }[];
}) {
  const path = usePathname().split("/")[3];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items && item.items.length > 0 ? (
              <Collapsible
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <div>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.loading ? undefined : item.title}
                      isActive={item.isActive}
                    >
                      {item.icon && (
                        <item.icon
                          className={item.loading ? "animate-pulse" : ""}
                        />
                      )}
                      <span className={item.loading ? "animate-pulse" : ""}>
                        {item.title}
                      </span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={path === subItem.url.split("/")[3]}
                          >
                            <Link href={subItem.url}>
                              <span
                                className={
                                  subItem.loading ? "animate-pulse" : ""
                                }
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                asChild
                tooltip={item.loading ? undefined : item.title}
              >
                <Link href={item.url}>
                  {item.icon && (
                    <item.icon
                      className={item.loading ? "animate-pulse" : ""}
                    />
                  )}
                  <span className={item.loading ? "animate-pulse" : ""}>
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
