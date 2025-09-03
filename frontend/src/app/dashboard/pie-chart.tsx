"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Pie, PieChart } from "recharts";

interface DashboardPieChartProps {
  title: "position" | "company" | "status";
  data: Record<string, number>;
}

export function DashboardPieChart({ title, data }: DashboardPieChartProps) {
  const chartData = Object.entries(data).map((value, index) => ({
    [title]: value[0],
    applications: value[1],
    fill: `color-mix(in srgb, var(--chart-1) ${100 - 10 * index}%, white)`,
  }));

  const chartConfig = Object.fromEntries(
    Object.entries(data).map((value, index) => [
      value[0],
      {
        label: value[0][0].toUpperCase() + value[0].slice(1),
        color: `color-mix(in srgb, var(--chart-1) ${100 - 10 * index}%, white)`,
      },
    ]),
  ) satisfies ChartConfig;

  return (
    <Card className="dark:from-primary/15 from-primary/5 to-card bg-gradient-to-t">
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>Your applications grouped by {title}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="applications" nameKey={title} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>One insight will go here</CardFooter>
    </Card>
  );
}
