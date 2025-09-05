"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export const description = "An interactive bar chart";

const chartConfig = {
  applications: {
    label: "Applications",
  },
  thirty: {
    label: "30 Days",
    color: "var(--chart-1)",
  },
  sixty: {
    label: "60 Days",
    color: "var(--chart-1)",
  },
  ninety: {
    label: "90 Days",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DashboardApplicationsBySubmittedOnChart({
  chartData,
}: {
  chartData: { date: string; applications: number }[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("thirty");

  const total = React.useMemo(() => {
    const sum = (arr: typeof chartData) =>
      arr.reduce((acc, curr) => acc + (curr.applications ?? 0), 0);

    return {
      thirty: sum(chartData.slice(-30)),
      sixty: sum(chartData.slice(-60)),
      ninety: sum(chartData),
    };
  }, [chartData]);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Submitted On</CardTitle>
          <CardDescription>
            Your applications group by submission date
          </CardDescription>
        </div>
        <div className="flex">
          {["thirty", "sixty", "ninety"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={
              activeChart === "thirty"
                ? chartData.slice(-30)
                : activeChart === "sixty"
                  ? chartData.slice(-60)
                  : chartData
            }
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              domain={[
                0,
                Math.max(...chartData.map((datum) => datum.applications)),
              ]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              hide={true}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="applications"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="applications" fill={`var(--chart-1)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
