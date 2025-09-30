import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentActivity() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          A log of the most recent agent activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>A1</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Agent 1 completed a task.
              </p>
              <p className="text-sm text-muted-foreground">
                Searched for "best vegan restaurants".
              </p>
            </div>
            <div className="ml-auto font-medium text-green-600 dark:text-green-500">
              Success
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>A2</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Agent 2 started a new campaign.
              </p>
              <p className="text-sm text-muted-foreground">
                "Summer Sale 2024" campaign is now live.
              </p>
            </div>
            <div className="ml-auto font-medium text-blue-600 dark:text-blue-500">
              Running
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>A3</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Agent 3 encountered an error.
              </p>
              <p className="text-sm text-muted-foreground">
                Failed to navigate to the specified URL.
              </p>
            </div>
            <div className="ml-auto font-medium text-destructive">Error</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>A4</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Agent 4 extracted data.
              </p>
              <p className="text-sm text-muted-foreground">
                Extracted 150 products from the target site.
              </p>
            </div>
            <div className="ml-auto font-medium text-green-600 dark:text-green-500">
              Success
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}