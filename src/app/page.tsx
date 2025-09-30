import { StatCard } from "@/components/stat-card"
import { Users, Bot, Megaphone, Target } from "lucide-react"

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
    </div>
  )
}