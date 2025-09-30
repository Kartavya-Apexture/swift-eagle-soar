"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { name: "Agent 1", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Agent 2", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Agent 3", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Agent 4", total: Math.floor(Math.random() * 5000) + 1000 },
]

export function OverviewChart() {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Tasks completed by each agent this month.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar
              dataKey="total"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}