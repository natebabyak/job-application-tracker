import { columns } from "./columns";
import { getServerSession } from "next-auth";
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
import { DashboardSidebar } from "./sidebar/sidebar";
import { DashboardCharts } from "./charts/charts";
import { DashboardTable } from "./table/table";

export default async function Dashboard() {
  const session = await getServerSession();

  const data = await fetch(`${process.env.FASTAPI_URL}/applications/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const applications = await data.json();

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
        <DashboardCharts applications={applications} />
        <DashboardTable columns={columns} data={applications} />
      </SidebarInset>
    </SidebarProvider>
  );
}
