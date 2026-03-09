"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Calendar, AlertTriangle, UserCheck } from "lucide-react"

interface TopbarProps {
  sidebarCollapsed: boolean
}

interface Notification {
  id: string
  title: string
  description: string
  time: string
  priority: "normal" | "high"
  icon: React.ElementType
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Leave Request",
    description: "John Smith requested annual leave for Dec 20-24",
    time: "10 min ago",
    priority: "normal",
    icon: Calendar,
    read: false,
  },
  {
    id: "2",
    title: "Urgent: Critical Assignment",
    description: "You were assigned a critical incident during your scheduled leave",
    time: "25 min ago",
    priority: "high",
    icon: AlertTriangle,
    read: false,
  },
  {
    id: "3",
    title: "Attendance Updated",
    description: "Maria Garcia clocked in at 8:45 AM",
    time: "1 hour ago",
    priority: "normal",
    icon: UserCheck,
    read: true,
  },
]

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

  const unreadCount = notifications.filter((n) => !n.read).length

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

        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-accent"
            >
              <Bell className="size-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 size-2 rounded-full bg-[oklch(0.65_0.22_330)] ring-2 ring-background" />
              )}
              <span className="sr-only">Notifications ({unreadCount} unread)</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
              <span className="text-base font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {unreadCount} new
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="m-0" />
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 px-4 py-3 focus:bg-accent",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                      notification.priority === "high"
                        ? "bg-[oklch(0.65_0.22_330)]/10 text-[oklch(0.65_0.22_330)]"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <notification.icon className="size-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p
                      className={cn(
                        "text-sm leading-tight",
                        notification.priority === "high"
                          ? "font-semibold text-[oklch(0.65_0.22_330)]"
                          : "font-medium text-foreground"
                      )}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs leading-snug text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="m-0" />
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-center rounded-lg text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
