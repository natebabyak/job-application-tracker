"use client";

import { Application } from "@/app/dashboard/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  applications: {
    label: "Applications",
  },
} satisfies ChartConfig;

export function ApplicationsByStatusChart({
  applications,
}: {
  applications: Application[];
}) {
  const counter: Record<string, number> = {};

  for (const { company } of applications) {
    counter[company] = (counter[company] || 0) + 1;
  }

  const entries = Object.entries(counter);

  entries.sort((a, b) => b[1] - a[1]);

  if (entries.length > 10) {
    let sum = 0;

    for (let i = 9; i < entries.length; i++) {
      sum += entries[i][1];
    }

    entries[9] = ["Other", sum];
  }

  const chartData = [
    entries.slice(0, 10).map((entry) => {
      return {
        company: entry[0],
        applications: entry[1],
      };
    }),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications by Company</CardTitle>
        <CardDescription>description</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="applications" nameKey="company" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
