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
import { ChevronRightIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

interface DashboardPieChartProps {
  chartData: [];
  chartConfig: ChartConfig;
  dataKey: string;
  nameKey: string;
}

export default function DashboardPieChart(
  dashboardPieChartProps: DashboardPieChartProps,
) {
  const { chartData, chartConfig, dataKey, nameKey } = dashboardPieChartProps;

  return (
    <Card className="from-primary/15 to-card bg-gradient-to-t">
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
            <Pie data={chartData} dataKey={dataKey} nameKey={nameKey} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        Learn more
        <ChevronRightIcon />
      </CardFooter>
    </Card>
  );
}
