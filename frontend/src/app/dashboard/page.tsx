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
import jwt from "jsonwebtoken";
import { DashboardApplicationsBySubmittedOnChart } from "./applications-by-submitted-on-chart";
import { ApplicationStatus, ApplicationWithId } from "@/lib/constants";
import { DashboardTable } from "./table";
import { columns } from "./columns";
import { DashboardPieChart } from "./pie-chart";
import { DashboardSidebar } from "./sidebar";

export const metadata: Metadata = {
  title: "Dashboard - Apt",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  const token = jwt.sign(
    { email: session.user?.email },
    process.env.JWT_SECRET!,
    { algorithm: "HS256", expiresIn: "1m" },
  );

  const response = await fetch(`${process.env.BACKEND_URL}/applications/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const applications = ((await response.json()) as ApplicationWithId[]) ?? [];

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

  const sortedCounts = {
    positions: Object.entries(counts.positions).sort((a, b) => b[1] - a[1]),
    companies: Object.entries(counts.companies).sort((a, b) => b[1] - a[1]),
    statuses: Object.entries(counts.statuses).sort((a, b) => b[1] - a[1]),
  };

  if (sortedCounts.positions.length > 5) {
    let sum = 0;

    for (let i = 10; i < sortedCounts.positions.length; i++) {
      sum += sortedCounts.positions[i][1];
    }

    sortedCounts.positions[5] = ["Other", sum];
  }

  if (sortedCounts.companies.length > 5) {
    let sum = 0;

    for (let i = 10; i < sortedCounts.companies.length; i++) {
      sum += sortedCounts.companies[i][1];
    }

    sortedCounts.companies[5] = ["Other", sum];
  }

  const slicedCounts = {
    positions: Object.fromEntries(sortedCounts.positions.slice(0, 6)),
    companies: Object.fromEntries(sortedCounts.companies.slice(0, 6)),
    statuses: Object.fromEntries(sortedCounts.statuses),
  };

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
          <span className="text-muted-foreground font-medium">Dashboard</span>
        </div>
        <Separator />
        <div className="grid gap-8 p-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <DashboardPieChart title="position" data={slicedCounts.positions} />
            <DashboardPieChart title="company" data={slicedCounts.companies} />
            <DashboardPieChart title="status" data={slicedCounts.statuses} />
          </div>
          <DashboardApplicationsBySubmittedOnChart />
          <DashboardTable columns={columns} data={applications} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
