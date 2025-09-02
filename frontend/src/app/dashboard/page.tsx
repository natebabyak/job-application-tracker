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
import { columns } from "./columns";
import jwt from "jsonwebtoken";

export const metadata: Metadata = {
  title: "Dashboard - Apt",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  const token = jwt.sign({ sub: session.user?.id }, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "1m",
  });

  const response = await fetch(`${process.env.BACKEND_URL}/applications/me`, {
    headers: { Authorization: `Bearer ${token}` },
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
              chartData={Object.entries(counts.statuses).map((status) => {
                return { status: status[0], applications: status[1] };
              })}
              chartConfig={
                {
                  applications: { label: "Applications" },
                  ...Object.fromEntries(
                    applicationStatuses.map((applicationStatus, index) => [
                      applicationStatus,
                      {
                        label:
                          applicationStatus[0].toUpperCase() +
                          applicationStatus.slice(1),
                        color: `var(--chart-${index})`,
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
              chartData={Object.entries(counts.statuses).map((status) => {
                return { status: status[0], applications: status[1] };
              })}
              chartConfig={
                {
                  applications: { label: "Applications" },
                  ...Object.fromEntries(
                    applicationStatuses.map((applicationStatus, index) => [
                      applicationStatus,
                      {
                        label:
                          applicationStatus[0].toUpperCase() +
                          applicationStatus.slice(1),
                        color: `var(--chart-${index})`,
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
              chartData={Object.entries(counts.statuses).map((status) => {
                return { status: status[0], applications: status[1] };
              })}
              chartConfig={
                {
                  applications: { label: "Applications" },
                  ...Object.fromEntries(
                    applicationStatuses.map((applicationStatus, index) => [
                      applicationStatus,
                      {
                        label:
                          applicationStatus[0].toUpperCase() +
                          applicationStatus.slice(1),
                        color: `var(--chart-${index})`,
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
