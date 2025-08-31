import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/auth";
import DashboardSidebar from "../../components/dashboard/sidebar";
import { Metadata } from "next";
import DashboardTable from "@/components/dashboard/table";
import { columns } from "./columns";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Apt",
};

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/");

  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is undefined");

  const userId = session.user?.id;
  if (!userId) throw new Error("User ID is undefined");

  const response = await fetch(`${process.env.BACKEND_URL}/applications/me`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "X-User-Id": userId,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch applications");

  const applications = await response.json();

  return (
    <SidebarProvider>
      <DashboardSidebar session={session} />
      <SidebarInset>
        <div className="flex items-center gap-2 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent side="right">Toggle sidebar</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" />
        </div>
        <Separator />
        <DashboardTable columns={columns} data={applications} />
      </SidebarInset>
    </SidebarProvider>
  );
}
