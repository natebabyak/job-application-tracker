"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "../../components/dashboard/sidebar/sidebar";
import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import { DashboardCharts } from "@/components/dashboard/charts/charts";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <DashboardSidebar session={session} />
      <SidebarInset>
        <SidebarTrigger />
        <DashboardCharts applications={[]} />
      </SidebarInset>
    </SidebarProvider>
  );
}
