
"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", value: 275, fill: "var(--color-chrome)" },
  { browser: "safari", value: 200, fill: "var(--color-safari)" },
  { browser: "firefox", value: 187, fill: "var(--color-firefox)" },
  { browser: "edge", value: 173, fill: "var(--color-edge)" },
  { browser: "other", value: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  value: {
    label: "Value",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function DoughnutChartCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Doughnut Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="browser"
              innerRadius={60}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
             <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
