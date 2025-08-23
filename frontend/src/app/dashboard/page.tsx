"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "../../components/dashboard/sidebar/sidebar";
import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";

export default function Dashboard() {
  // const FASTAPI_URL = process.env.FASTAPI_URL

  // const allApplications = fetch(`${FASTAPI_URL}/applications/${session.user.id}`)

  const { data: session } = useSession();

  if (!session) {
    redirect("/", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={session.user} />
      <SidebarInset>
        <SidebarTrigger />
        <h1>Dashboard</h1>
      </SidebarInset>
    </SidebarProvider>
  );
}
