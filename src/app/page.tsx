"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"
import { StatCard } from "@/components/stat-card"
import { Users, Bot, Megaphone, Target } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const agentPerformanceData = [
  { name: "Agent A", tasks: 400 },
  { name: "Agent B", tasks: 300 },
  { name: "Agent C", tasks: 200 },
  { name: "Agent D", tasks: 278 },
]

const campaignData = [
  { month: "January", campaigns: 2 },
  { month: "February", campaigns: 3 },
  { month: "March", campaigns: 2 },
  { month: "April", campaigns: 4 },
  { month: "May", campaigns: 3 },
  { month: "June", campaigns: 5 },
]

const recentTasks = [
  {
    id: "task_1",
    agent: "Agent A",
    task: "Summarize Q2 earnings report",
    status: "Completed",
    date: "2024-06-28",
  },
  {
    id: "task_2",
    agent: "Agent B",
    task: "Generate leads for new campaign",
    status: "Completed",
    date: "2024-06-28",
  },
  {
    id: "task_3",
    agent: "Agent C",
    task: "Analyze competitor website",
    status: "In Progress",
    date: "2024-06-28",
  },
  {
    id: "task_4",
    agent: "Agent D",
    task: "Draft social media posts",
    status: "Completed",
    date: "2024-06-27",
  },
  {
    id: "task_5",
    agent: "Agent A",
    task: "Research market trends",
    status: "Failed",
    date: "2024-06-27",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Agents"
          value="4"
          icon={Bot}
          description="All configured agents"
        />
        <StatCard
          title="Active Agents"
          value="2"
          icon={Users}
          description="Agents currently running tasks"
        />
        <StatCard
          title="Live Campaigns"
          value="3"
          icon={Megaphone}
          description="Ongoing marketing campaigns"
        />
        <StatCard
          title="Tasks Completed"
          value="1,234"
          icon={Target}
          description="In the last 24 hours"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Tasks completed by each agent.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart
                accessibilityLayer
                data={agentPerformanceData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="tasks"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Campaigns Overview</CardTitle>
            <CardDescription>
              Active campaigns over the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={campaignData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  type="monotone"
                  dataKey="campaigns"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>
            A list of the most recent tasks performed by agents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.agent}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.status === "Completed"
                          ? "default"
                          : task.status === "In Progress"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}