"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function LiveBrowser() {
  return (
    <div className="flex flex-col bg-muted/40 h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live Browser</h3>
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-medium text-foreground">LIVE</span>
        </div>
      </div>
      <div
        className={cn(
          "w-full bg-black rounded-lg shadow-lg overflow-hidden flex flex-col aspect-square"
        )}
      >
        <div className="w-full h-8 bg-muted flex-shrink-0 flex items-center px-3 gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
        </div>
        <div className="w-full h-full flex items-center justify-center bg-grid text-muted-foreground">
          <p className="text-sm">Live Browser Stream</p>
        </div>
      </div>
    </div>
  )
}