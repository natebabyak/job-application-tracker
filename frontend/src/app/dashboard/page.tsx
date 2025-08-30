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
import DashboardSidebar from "./components/sidebar";
import { Metadata } from "next";
import DashboardTable from "./components/table";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Dashboard - Apt",
};

export default async function Dashboard() {
  const session = await auth();

  const data = await fetch(`${process.env.API_URL}/applications/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.id}`,
    },
  });
  const applications = await data.json();

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
        <div></div>
      </SidebarInset>
    </SidebarProvider>
  );
}
