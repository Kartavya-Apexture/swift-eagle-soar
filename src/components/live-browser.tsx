"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

export function LiveBrowser() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-muted/40 h-full">
      <div className="relative w-full max-w-4xl h-full flex flex-col">
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground">LIVE</span>
          </div>
        </div>
        <div
          className={cn(
            "w-full bg-black rounded-lg shadow-2xl overflow-hidden flex-1 flex flex-col"
          )}
        >
          <div className="w-full h-8 bg-muted flex-shrink-0 flex items-center px-3 gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
          </div>
          <div className="w-full h-10 bg-muted/50 flex-shrink-0 flex items-center px-3 border-b border-t border-black/20">
            <div className="flex items-center gap-2 w-full bg-background/50 rounded-md px-3 py-1 text-sm">
              <Lock className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                https://www.google.com
              </span>
            </div>
          </div>
          {/* Placeholder for video stream */}
          <div className="w-full h-full flex items-center justify-center bg-grid text-muted-foreground">
            <p>Live Browser Stream</p>
          </div>
        </div>
      </div>
    </div>
  )
}