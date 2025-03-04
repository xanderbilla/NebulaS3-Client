"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { usePathname } from "next/navigation";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path: string, index: number) => {
          const fullPath = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          return (
            <React.Fragment key={fullPath}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={fullPath}>
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const DashboardLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
