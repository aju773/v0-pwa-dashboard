"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search, Bell } from "lucide-react"

interface TopbarProps {
  sidebarCollapsed: boolean
}

export function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md transition-all duration-300",
        sidebarCollapsed ? "left-20" : "left-64"
      )}
    >
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks, team members, or projects..."
          className="h-10 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Date/Time Display */}
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-foreground">{formatTime(currentTime)}</p>
          <p className="text-xs text-muted-foreground">{formatDate(currentTime)}</p>
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-accent"
        >
          <Bell className="size-5 text-muted-foreground" />
          {/* Red Unread Dot */}
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
