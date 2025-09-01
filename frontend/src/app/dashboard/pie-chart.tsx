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
  title: string;
  description?: string;
  chartData: Record<string, string | number>[];
  chartConfig: ChartConfig;
  dataKey: string;
  nameKey: string;
}

export default function DashboardPieChart({
  title,
  description,
  chartData,
  chartConfig,
  dataKey,
  nameKey,
}: DashboardPieChartProps) {
  return (
    <Card className="from-primary/15 to-card bg-gradient-to-t">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
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
