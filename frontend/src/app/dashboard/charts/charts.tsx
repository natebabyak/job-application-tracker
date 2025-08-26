import { Application } from "@/app/dashboard/columns";
import { ApplicationsByCompanyChart } from "./applications-by-company-chart";
import { ApplicationsByStatusChart } from "./applications-by-status-chart";
import { ApplicationsByPositionChart } from "./applications-by-position-chart";
import { ApplicationsBySubmittedOnChart } from "./applications-by-submitted-on-chart";

export function DashboardCharts({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <div className="grid gap-4 4-8">
      <div className="grid gap-4 grid-cols-3">
        <ApplicationsByStatusChart applications={applications} />
        <ApplicationsByCompanyChart applications={applications} />
        <ApplicationsByPositionChart applications={applications} />
      </div>
      <ApplicationsBySubmittedOnChart applications={applications} />
    </div>
  );
}
