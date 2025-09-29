"use client"

import * as React from "react"
import {
  ChevronLeft,
  Home,
  Settings,
  MessageSquare,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Dashboard", icon: LayoutGrid },
    { name: "Chat", icon: MessageSquare },
    { name: "Settings", icon: Settings },
  ]

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative h-full bg-background border-r transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "w-[64px]" : "w-[280px]"
        )}
      >
        <div
          className={cn(
            "flex items-center p-4 border-b h-16",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold">Agent Mode</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>
        <nav className="flex-grow px-2 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </TooltipProvider>
  )
}