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
import { Metadata } from "next";
import { Application, columns } from "./columns";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./sidebar";
import { DashboardTable } from "./table";
import { DashboardPieChart } from "./pie-chart";
import { DashboardApplicationsBySubmittedOnChart } from "./applications-by-submitted-on-chart";

export const metadata: Metadata = {
  title: "Dashboard - Apt",
};

function getApiKey() {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is undefined");
  return apiKey;
}

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  function getUserId() {
    const userId = session?.user?.id;
    if (!userId) throw new Error("User ID is undefined");
    return userId;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/applications/me`, {
    method: "GET",
    headers: {
      "X-Api-Key": getApiKey(),
      "X-User-Id": getUserId(),
    },
  });

  const applications: Application[] = await response.json();

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
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <DashboardPieChart />
            <DashboardPieChart />
            <DashboardPieChart />
          </div>
          <DashboardApplicationsBySubmittedOnChart />
          <DashboardTable columns={columns} data={applications} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
