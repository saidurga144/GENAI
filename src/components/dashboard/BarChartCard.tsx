
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", electronics: 75, fashion: 40, foods: 70 },
  { month: "February", electronics: 65, fashion: 45, foods: 65 },
  { month: "March", electronics: 85, fashion: 40, foods: 60 },
  { month: "April", electronics: 80, fashion: 20, foods: 50 },
  { month: "May", electronics: 55, fashion: 85, foods: 55 },
  { month: "June", electronics: 50, fashion: 25, foods: 70 },
  { month: "July", electronics: 40, fashion: 90, foods: 75 },
];


export function BarChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px] w-full">
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="electronics" fill="hsl(var(--chart-1))" name="Electronics" />
                <Bar dataKey="fashion" fill="hsl(var(--chart-2))" name="Fashion" />
                <Bar dataKey="foods" fill="hsl(var(--chart-3))" name="Foods" />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
