"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import { DashboardCharts } from "@/components/dashboard/charts/charts";
import { DashboardTable } from "@/components/dashboard/table/table";
import { Separator } from "@/components/ui/separator";
import { DashboardSidebar } from "@/components/dashboard/sidebar/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <DashboardSidebar session={session} />
      <SidebarInset>
        <div className="flex p-2 gap-2 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent side="right">Toggle sidebar</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" />
        </div>
        <Separator />
        <DashboardCharts applications={[]} />
        <DashboardTable columns={columns} data={[]} />
      </SidebarInset>
    </SidebarProvider>
  );
}
