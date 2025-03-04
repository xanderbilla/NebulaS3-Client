"use client";

import * as React from "react";
import { BookOpen, GalleryVerticalEnd, PaintBucket } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Bucket } from "@/types/bucket";
import HealthCheck from "./health-check";
import useBuckets from "@/hooks/useBuckets";
import { NavSupport } from "./nav-support";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { key, ...restProps } = props;
  const { buckets, isLoading, isError } = useBuckets();

  const bucketItems =
    buckets?.map((bucket: Bucket) => ({
      title: bucket.bucketName,
      url: `/dashboard/buckets/${bucket.bucketName}`,
    })) || [];

  const data = {
    user: {
      name: "User",
      email: "user@email.com",
      avatar: "/avatar.jpg",
    },
    teams: [
      {
        name: "NebulaS3",
        logo: GalleryVerticalEnd,
        plan: "Storage",
      },
    ],
    navMain: [
      {
        title: "Buckets",
        loading: isLoading,
        error: isError,
        url: "/dashboard/buckets",
        icon: PaintBucket,
        isActive: true,
        items: isLoading ? [] : isError ? [] : bucketItems,
      },
    ],
    support: [
      {
        name: "Documentation",
        url: "/docs",
        icon: BookOpen,
        isActive: false,
      },
    ],
  };

  return (
    <Sidebar key={key} collapsible="icon" {...restProps}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-transparent dark:bg-transparent flex flex-col items-start justify-between">
        <NavMain items={data.navMain} />
        <NavSupport support={data.support} />
      </SidebarContent>
      <HealthCheck className="bg-transparent dark:bg-transparent" />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
