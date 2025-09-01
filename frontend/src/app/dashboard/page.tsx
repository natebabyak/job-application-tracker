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
import { redirect } from "next/navigation";
import Sidebar from "./sidebar";
import ApplicationsBySubmittedOnChart from "./applications-by-submitted-on-chart";
import PieChart from "./pie-chart";
import Table from "./table";
import {
  Application,
  ApplicationStatus,
  applicationStatuses,
} from "./constants";
import { ChartConfig } from "@/components/ui/chart";
import { getApiKey, getUserId } from "./utils";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Dashboard - Apt",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  const response = await fetch(`${process.env.BACKEND_URL}/applications/me`, {
    method: "GET",
    headers: {
      "X-Api-Key": getApiKey(),
      "X-User-Id": getUserId(session),
    },
  });

  const applications: Application[] = await response.json();

  const counts = {
    positions: {} as Record<string, number>,
    companies: {} as Record<string, number>,
    statuses: {} as Record<ApplicationStatus, number>,
  };

  for (const { position, company, status } of applications) {
    counts.positions[position] = (counts.positions[position] || 0) + 1;
    counts.companies[company] = (counts.companies[company] || 0) + 1;
    counts.statuses[status] = (counts.statuses[status] || 0) + 1;
  }

  return (
    <SidebarProvider>
      <Sidebar session={session} />
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
        <div className="grid gap-4 p-8">
          <div className="grid grid-cols-3 gap-8">
            <PieChart
              title="Applications by Status"
              chartData={Object.entries(counts.statuses).map((s) => {
                return { status: s[0], applications: s[1] };
              })}
              chartConfig={
                {
                  applications: { label: "Applications" },
                  ...Object.fromEntries(
                    applicationStatuses.map((s, i) => [
                      s,
                      {
                        label: s[0].toUpperCase() + s.slice(1),
                        color: `var(--chart-${i})`,
                      },
                    ]),
                  ),
                } satisfies ChartConfig
              }
              dataKey="applications"
              nameKey="status"
            />
            <PieChart
              title="Applications by Status"
              chartData={Object.entries(counts.statuses).map((s) => {
                return { status: s[0], applications: s[1] };
              })}
              chartConfig={
                {
                  applications: { label: "Applications" },
                  ...Object.fromEntries(
                    applicationStatuses.map((s, i) => [
                      s,
                      {
                        label: s[0].toUpperCase() + s.slice(1),
                        color: `var(--chart-${i})`,
                      },
                    ]),
                  ),
                } satisfies ChartConfig
              }
              dataKey="applications"
              nameKey="status"
            />
            <PieChart
              title="Applications by Status"
              chartData={Object.entries(counts.statuses).map((s) => {
                return { status: s[0], applications: s[1] };
              })}
              chartConfig={
                {
                  applications: { label: "Applications" },
                  ...Object.fromEntries(
                    applicationStatuses.map((s, i) => [
                      s,
                      {
                        label: s[0].toUpperCase() + s.slice(1),
                        color: `var(--chart-${i})`,
                      },
                    ]),
                  ),
                } satisfies ChartConfig
              }
              dataKey="applications"
              nameKey="status"
            />
          </div>
          <ApplicationsBySubmittedOnChart />
          <Table columns={columns} data={applications} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
